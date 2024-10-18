import React, { useState, useEffect } from "react";
import axios from "axios";
import "../component/css/main.css";

export default function Pending() {
  const [tasks, setTasks] = useState([]); // State for storing tasks
  const [loading, setLoading] = useState(true); // Loading state to handle API calls

  // Function to fetch pending tasks
  const fetchPendingTasks = async () => {
    try {
      const { data } = await axios.get(
        "https://todos-backend-production-6961.up.railway.app/pending"
      );
      setTasks(data); // Update tasks state with fetched data
    } catch (error) {
      console.error("Error fetching pending tasks:", error);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchPendingTasks();
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
      fetchPendingTasks(); // Refresh the tasks after marking as complete
    } catch (error) {
      console.error("Error marking task as complete:", error);
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
      fetchPendingTasks(); // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Refresh the task list
  const handleRefresh = () => {
    setLoading(true);
    fetchPendingTasks();
  };

  if (loading) {
    return <div>Loading tasks...</div>; // Display loading until data is fetched
  }

  return (
    <div id="ma">
      <button id="refresh" onClick={handleRefresh}>
        ⟳
      </button>
      <p id="count">Total tasks: {tasks.length}</p>

      {tasks.length === 0 ? (
        <p>No pending tasks found.</p>
      ) : (
        tasks.map((task, index) => (
          <div key={index} className="listing">
            <button
              className="combut"
              onClick={() => handleComplete(task.task)}
            >
              {task.complete === "complete" ? "✔" : ""}
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
