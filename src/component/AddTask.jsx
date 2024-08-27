import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackButton } from "../Icons/Back-Button.svg";

const AddTask = () => {
  const navigate = useNavigate();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleTitleChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters, numbers, and spaces
    const isValid = /^[a-zA-Z0-9\s]*$/.test(value);
    if (isValid) {
      setTaskTitle(value);
    }
  };

  const clearData = () => {
    setTaskDescription("");
    setTaskTitle("");
    navigate("/");
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  function formatDate(date) {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options)
      .format(date)
      .replace(",", "");
  }

  const addTask = () => {
    // Generate a unique ID for the task
    const generateUniqueId = () =>
      `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const today = new Date();
    const newTask = {
      id: generateUniqueId(), // Unique ID
      title: taskTitle,
      description: taskDescription,
      completed: false,
      status: "In Progress",
      date: formatDate(today),
    };

    // Retrieve existing tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    navigate("/");
  };

  const turnBack = () => {
    navigate("/");
  };

  return (
    <div className="mainContainer">
      <div
        className="header"
        style={{ display: "flex", alignItems: "center", paddingLeft: "5px" }}
      >
        <BackButton
          alt="back-icon"
          onClick={turnBack}
          style={{ cursor: "pointer", width: "14px" }}
        />
        <p style={{ textAlign: "center" }}>Add Task</p>
      </div>
      <div className="AddParent-container">
        <input
          className="searchBar"
          placeholder="Enter the title"
          value={taskTitle}
          onChange={handleTitleChange}
        />
        <textarea
          cols={"7"}
          rows={"5"}
          placeholder="Enter the description"
          value={taskDescription}
          onChange={handleDescriptionChange}
        />
        <div className="btn-container">
          <button className="cancel-btn" onClick={clearData}>
            Cancel
          </button>
          <button
            className="add-btn"
            onClick={addTask}
            disabled={taskTitle?.length === 0 && taskDescription?.length === 0}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
