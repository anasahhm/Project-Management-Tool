import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ projectId }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/projects/${projectId}/tasks`, { name });
      setName('');
      alert('Task added successfully!');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <div className="container">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Task Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
