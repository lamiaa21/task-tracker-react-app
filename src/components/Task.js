import { useState } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import {GrInProgress} from 'react-icons/gr';
import { Link } from "react-router-dom";

const Task = ({ task, onDelete, onDone, onProgress }) => {
  return (
    <div
      className={`task ${
        task.status === "Done"
          ? "Done"
          : task.status === "InProgress"
          ? "InProgress"
          : ""
      }`}
    >
      <h3>
        {task.text}
        <FaTimes
          title="delete task"
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
        <Link to={`/edit-task/${task.id}`}>
          <FaEdit title="edit task" style={{ color: "blue", cursor: "pointer" }} />
        </Link>
        <GrInProgress title="In progress"
        style={{color: 'yellow', cursor: "pointer"}}
        onClick={() => onProgress(task.id)}
        />
        <a title="Complete Task" onClick={() => onDone(task.id)}>
          &#9989;
        </a>
      </h3>
      <p>{task.date}</p>
    </div>
  );
};

export default Task;
