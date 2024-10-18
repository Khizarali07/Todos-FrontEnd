import axios from "axios";
import { useState, useEffect } from "react";
import "./css/main.css";
import del from "./images/delete icon.png";

export default function Main() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks when the component mounts
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(
        "https://todos-backend-production-6961.up.railway.app/tasks"
      );
      setTasks(data); // Store tasks in state
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); // Stop loading when tasks are fetched
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  // Function to handle task completion
  const completeTask = async (task) => {
    try {
      await axios.post(
        "https://todos-backend-production-6961.up.railway.app/complete",
        {
          complete: "complete",
          task: task.task,
        }
      );
      // Update UI without reloading the page
      setTasks(
        tasks.map((t) =>
          t.task === task.task ? { ...t, complete: "complete" } : t
        )
      );
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  // Function to handle task deletion
  const deleteTask = async (date) => {
    try {
      await axios.post(
        "https://todos-backend-production-6961.up.railway.app/delete",
        { date }
      );
      // Remove task from UI without reloading
      setTasks(tasks.filter((task) => task.date !== date));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to refresh the task list
  const refresh = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://todos-backend-production-6961.up.railway.app/tasks"
      );
      setTasks(data);
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div id="ma">
      <button id="refresh" onClick={refresh}>
        ⟳
      </button>
      <p id="count">Total tasks: {tasks.length}</p>

      {tasks.map((task, index) => (
        <div className="listing" key={index}>
          <button
            className="combut"
            onClick={() => completeTask(task)}
            dangerouslySetInnerHTML={{
              __html: task.complete === "complete" ? "&#10004;" : "",
            }}
          />
          <p className="ts">{task.task}</p>
          <p className="da">{task.date}</p>
          <button className="delbut" onClick={() => deleteTask(task.date)}>
            {window.screen.width <= 599 ? (
              <img src={del} alt="Delete" className="delimg" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
