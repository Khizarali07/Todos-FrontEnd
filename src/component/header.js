import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./css/header.css";

export default function Header({ onTaskAdded }) {
  // Pass down a prop for updating the task list
  const [task, settask] = useState("");
  const [date, setdate] = useState("");
  const complete = "uncomplete";
  const navigate = useNavigate();

  const handlesubmit = async (evt) => {
    evt.preventDefault();

    try {
      // Send task data to the server
      await axios.post(
        "https://todos-backend-production-6961.up.railway.app/task",
        {
          task,
          date,
          complete,
        }
      );

      // Clear input fields
      settask("");
      setdate("");

      // Optionally, navigate to the home page
      navigate("/");

      // Update task list by calling the parent component's function
      if (onTaskAdded) {
        onTaskAdded(); // Trigger the task update
      }

      // Update link styles
      updateLinkStyles(0);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateLinkStyles = (activeIndex) => {
    let links = document.getElementsByClassName("link");
    for (let i = 0; i < links.length; i++) {
      links[i].style.color = i === activeIndex ? "black" : "blue";
      links[i].style.textDecorationLine =
        i === activeIndex ? "solid 10px underline" : "none";
    }
  };

  return (
    <>
      <h1 id="heading">To-Do List</h1>

      <form onSubmit={handlesubmit} id="form">
        <input
          type="text"
          placeholder="Type your Task"
          id="text"
          value={task}
          onChange={(evt) => settask(evt.target.value)}
          required
        />
        <input
          type="date"
          id="date"
          value={date}
          onChange={(evt) => setdate(evt.target.value)}
          required
        />
        <button type="submit" id="add">
          Add
        </button>
      </form>

      <div id="links">
        <Link to="/" className="link def" onClick={() => updateLinkStyles(0)}>
          All
        </Link>
        <Link to="pending" className="link" onClick={() => updateLinkStyles(1)}>
          Pending
        </Link>
        <Link
          to="complete"
          className="link"
          onClick={() => updateLinkStyles(2)}
        >
          Complete
        </Link>
      </div>
    </>
  );
}
