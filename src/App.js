import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './component/TaskList';
import AddTask from './component/AddTask';
import EditTask from './component/EditTask';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<TaskList />} />

          {/* Route for adding a task */}
          <Route path="/addTask" element={<AddTask />} />

          {/* Route for editing a task */}
          <Route path="/editTask" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
