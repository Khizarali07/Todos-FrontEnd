import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/main.css";

export default function Completes() {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [loading, setLoading] = useState(true); // Loading state to manage API calls

  // Function to fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(
        "https://todos-backend-production-6961.up.railway.app/completing"
      );
      setTasks(data); // Update tasks state with fetched data
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  // Handle task completion
  const handleComplete = async (taskName) => {
    try {
      await axios.post(
        "https://todos-backend-production-6961.up.railway.app/complete",
        {
          complete: "complete",
          task: taskName,
        }
      );
      fetchTasks(); // Refresh tasks after completing
    } catch (error) {
      console.error("Error marking task complete:", error);
    }
  };

  // Handle task deletion
  const handleDelete = async (taskDate) => {
    try {
      await axios.post(
        "https://todos-backend-production-6961.up.railway.app/delete",
        {
          date: taskDate,
        }
      );
      fetchTasks(); // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle refresh manually
  const handleRefresh = () => {
    setLoading(true);
    fetchTasks();
  };

  if (loading) {
    return <div>Loading tasks...</div>; // Show loading message until data is loaded
  }

  return (
    <div id="ma">
      <button id="refresh" onClick={handleRefresh}>
        ⟳
      </button>
      <p id="count">Total tasks: {tasks.length}</p>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task, index) => (
          <div key={index} className="listing">
            <button
              className="combut"
              onClick={() => handleComplete(task.task)}
            >
              {task.complete === "complete" ? "✔" : "Mark Complete"}
            </button>
            <p className="ts">{task.task}</p>
            <p className="da">{task.date}</p>
            <button className="delbut" onClick={() => handleDelete(task.date)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
