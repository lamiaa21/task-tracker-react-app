import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  getDoc,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Auth";
import { Container } from "react-bootstrap";

const AddTask = () => {
  const { currUser } = useAuth();
  const navigate = useNavigate();
  const [currTask, setCurrTask] = useState("");
  const params = useParams();
  const taskId = params.taskId;
  const [formState, setFormState] = useState("");

  const formik = useFormik({
    initialValues: {
      text: currTask.text,
      date: currTask.date,
      status: currTask.status,
    },
    onSubmit: async (values) => {
      console.log(values.text);
      if (taskId) {
        onEdit({ text: values.text, date: values.date, status: values.status });
      } else {
        onAdd({ text: values.text, date: values.date, status: values.status });
      }
      navigate("/");
    },
  });

  const onEdit = async (newTask) => {
    const docRef = doc(getFirestore(), "tasks", taskId);
    const payload = {
      text: newTask.text,
      date: newTask.date,
      status: newTask.status,
    };
    await updateDoc(docRef, payload);
  };

  const onAdd = async (newTask) => {
    const collRef = collection(getFirestore(), "tasks");
    const payload = {
      text: newTask.text,
      date: newTask.date,
      status: newTask.status,
      user: currUser.email,
    };
    console.log("attempting to add", payload);
    await addDoc(collRef, payload);
  };

  const getData = async () => {
    const docRef = doc(getFirestore(), "tasks", taskId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    }
  };

  useEffect(() => {
    console.log("formState is ", taskId ? "edit" : "add");

    if (taskId) {
      setCurrTask(getData());
      if (currTask) {
        console.log("current task: ", currTask);
      }
    }
  }, []);

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "450px" }}>
          <form
            className="mb-3"
            initialValues={{
              text: currTask.text,
              date: currTask.date,
              status: currTask.status,
            }}
            onSubmit={formik.handleSubmit}
          >
            {taskId ? (
              <h2 className="text-center mb-4">Edit task </h2>
            ) : (
              <h2 className="text-center mb-4">Add new task </h2>
            )}
            <div className="form-control">
              <label className="form-label">Task</label>
              <input
                className="form-control"
                type="text"
                name="text"
                onChange={formik.handleChange}
                value={formik.values.text}
                required
              />
            </div>
            <div className="form-control">
              <label className="form-label">Day & Time</label>
              <input
                className="form-control"
                name="date"
                type="datetime-local"
                onChange={formik.handleChange}
                value={formik.values.date}
                required
              />
            </div>
            <div className="form-control form-control-check">
              <label>Task status</label>
              <select
                className="form-select"
                name="status"
                onChange={formik.handleChange}
                value={formik.values.status}
              >
                <option selected value="">
                  Select Value
                </option>
                <option value="ToDo">To do</option>
                <option value="InProgress">In progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="d-grid gap-2">
              <input
                className="btn btn-dark btn-lg submit"
                type="submit"
                value={taskId ? "Update Task" : "Add Task"}
              />
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default AddTask;
