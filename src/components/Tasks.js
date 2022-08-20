import Task from "./Task";
import { Link } from "react-router-dom";
import {
  collection,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { useAuth } from "./Auth";
import Button from "./Button";

const Tasks = ({ tasks }) => {
  const { currUser } = useAuth();

  const onDelete = async (id) => {
    await deleteDoc(doc(getFirestore(), "tasks", id));
  };
  const onComplete = async (id) => {
    const docRef = doc(getFirestore(), "tasks", id);
    const payload = {
      status: "Done",
    };
    await updateDoc(docRef, payload);
  };
  const onProgress = async (id) => {
    const docRef = doc(getFirestore(), "tasks", id);
    const payload = {
      status: "InProgress",
    };
    await updateDoc(docRef, payload);
  };
  return (
    <div className="container">
       <Link to="../newtask"><button className="btn btn-dark btn-lg">Add new task</button></Link>
      {tasks
        .filter((task) => task.user == currUser.email)
        .map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onDone={onComplete}
            onProgress={onProgress}
          />
        ))}
    </div>
  );
};

export default Tasks;
