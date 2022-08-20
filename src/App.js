import { useEffect, useState } from "react";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import NavBar from "./components/NavBar";
import ForgotPassword from "./components/ForgotPassword";
import { AuthProvider } from "./components/Auth";
import { Routes, Route } from "react-router-dom";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import ProtectedRoute from "./components/ProtectedRoute";
import "react-bootstrap";
import UserProfile from "./components/UserProfile";

function App() {
  useEffect(() => {
    onSnapshot(collection(getFirestore(), "tasks"), (snapshot) => {
      let currSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setTaskList(currSnap);
    });
  });

  const [taskList, setTaskList] = useState([]);

  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Tasks tasks={taskList} />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        ></Route>

        <Route exact path="/login" element={<LogIn />}></Route>

        <Route
          exact
          path="/newtask"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          exact
          path="/edit-task/:taskId"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          exact
          path="/user"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        ></Route>

        <Route exact path="/signup" element={<SignUp />}></Route>

        <Route
          exact
          path="/forgot-password"
          element={<ForgotPassword />}
        ></Route>
      </Routes>
    </AuthProvider>
  );
}
export default App;
