import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`);
        setTasks(response.data.tasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, [projectId]);

  return (
    <div className="container">
      <h3>Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task._id}>{task.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
