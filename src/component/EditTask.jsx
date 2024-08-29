import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as BackButton } from "../Icons/Back-Button.svg";
import { ReactComponent as UpIcon } from "../Icons/upIcon.svg";
import { ReactComponent as DownIcon } from "../Icons/downIcon.svg";

const EditTask = ({value}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const taskData = location;
  const [taskTitle, setTaskTitle] = useState(taskData?.state?.title);
  const [taskDescription, setTaskDescription] = useState(taskData?.state?.description)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(taskData?.state?.status);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters, numbers, and spaces
    const isValid = /^[a-zA-Z0-9\s]*$/.test(value);
    if (isValid) {
      setTaskTitle(value);
    }
  };
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const options = [
    { label: "Pending", color: "#C4C4C4" },
    { label: "In Progress", color: "#F4C542" },
    { label: "Completed", color: "#4CAF50" },
  ];

  const clearData = () => {
    setTaskDescription("");
    setTaskTitle("");
    navigate("/");
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

 

  const updateTask = () => {
   
    if (!taskTitle || !taskDescription) {
      setErrorMessage("All fields are mandatory");
      return; // Prevent further execution if fields are empty
    }
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const updatedTasks = tasks.map(task => 
        task.id === taskData.state.id 
          ? { ...task, title: taskTitle, description: taskDescription, status: selectedOption } 
          : task
      );      
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
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
        <p style={{ textAlign: "center" }}>Edit Task</p>
      </div>
      {errorMessage && <p className="error-msg" style={{ color: "red" }}>{errorMessage}</p>}
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
        <div className="dropdown">
          <div className="dropdown-header" onClick={toggleDropdown}>
            <span
              className="status-dot"
              style={{
                backgroundColor: options.find(
                  (option) => option.label === selectedOption
                ).color,
              }}
            ></span>
            {selectedOption}
            {isOpen ? <UpIcon /> : <DownIcon /> }
          </div>
          {isOpen && (
            <ul className="dropdown-list">
              {options.map((option) => (
                <li
                  key={option.label}
                  className="dropdown-list-item"
                  onClick={() => handleOptionClick(option.label)}
                >
                  <span
                    className="status-dot"
                    style={{ backgroundColor: option.color }}
                  ></span>
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="btn-container">
          <button className="cancel-btn" onClick={clearData}>
            Cancel
          </button>
          <button
            className="add-btn"
            onClick={updateTask}
            disabled={taskTitle?.length === 0 && taskDescription?.length === 0}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
