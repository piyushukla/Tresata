import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AddButtonIcon } from "../Icons/Add-Button.svg";
import CollapsibleList from "./CollapsibleList";

const TaskList = () => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);
  const [filterList, setFilterList] = useState({
    Pending: [],
    "In Progress": [],
    Completed: [],
  });

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTaskList(tasks);

    // Categorize tasks based on status
    const categorizeTasks = (tasks) => {
      const result = {
        Pending: [],
        "In Progress": [],
        Completed: [],
      };
      tasks.forEach((task) => {
        if (task.status in result) {
          result[task.status].push(task);
        }
      });
      return result;
    };

    setFilterList(categorizeTasks(tasks));
  }, []);

  const handleAddButtonClick = () => {
    navigate("/addTask");
  };

  const handleSearch = (value) => {
    if (!value) {
      // If empty, return the original categorized list
      setFilterList({
        Pending: taskList.filter(task => task.status === 'Pending'),
        'In Progress': taskList.filter(task => task.status === 'In Progress'),
        Completed: taskList.filter(task => task.status === 'Completed'),
      });
      return;
    }
  
    // Convert the search value to lowercase for case-insensitive comparison
    const searchValue = value.toLowerCase();
  
    // Filter tasks based on the search value
    const filteredTasks = taskList.filter(task =>
      task.title.toLowerCase().includes(searchValue)
    );
  
    // Re-categorize filtered tasks
    const categorizedFilteredTasks = categorizeTasks(filteredTasks);
  
    // Update filterList with the categorized filtered tasks
    setFilterList(categorizedFilteredTasks);
  };

  const categorizeTasks = (tasks) => {
    const result = {
      Pending: [],
      'In Progress': [],
      Completed: []
    };
    tasks.forEach(task => {
      if (task.status in result) {
        result[task.status].push(task);
      }
    });
    return result;
  };

  const deleteTodo = (id,list) => {
    const updatedTasks = taskList.filter(task => task.id !== id);
    
    // Update state
    setTaskList(updatedTasks);
    setFilterList(categorizeTasks(updatedTasks));
    
    // Update local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  return (
    <div className="mainContainer">
      <div className="header">
        <p>TO-DO APP</p>
      </div>
      <div className="list-container">
        <input
          className="searchBar"
          placeholder="Search To-Do"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        {taskList?.length === 0 ? (
          <p>No list Available </p>
        ) : (
          <>
            <CollapsibleList
              list={filterList["In Progress"]}
              deleteTodo={(id) => {
                deleteTodo(id,filterList["In Progress"]);
              }}
              status={'In Progress'}
            />
           <CollapsibleList
              list={filterList?.Pending}
              deleteTodo={(id) => {
                deleteTodo(id);
              }}
              status={'Pending'}
            />
                <CollapsibleList
                list={filterList?.Completed}
                deleteTodo={(id) => {
                  deleteTodo(id);
                }}
                status={'Completed'}
              />
          
          </>
        )}
      </div>
      <AddButtonIcon
        alt="Add-icon"
        className="addIcon"
        onClick={handleAddButtonClick}
      />
    </div>
  );
};
export default TaskList;
