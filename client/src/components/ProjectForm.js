import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/projects', { name });
      setName('');
      alert('Project added successfully!');
    } catch (err) {
      console.error('Error adding project:', err);
    }
  };

  return (
    <div className="container">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
