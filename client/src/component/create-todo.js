import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = { title, description, date: date.toISOString() };
    setIsPending(true);

    fetch("http://localhost:3000/to-do/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then(() => {
        setIsPending(false);
        history.push("/");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        setIsPending(false);
      });
  };

  return (
    <div>
      <h2 className="head">
        <center>Add a new Task</center>
      </h2>

      <div className="create-container">
        <form className="create-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              name="name"
              placeholder="What is your task?"
              className="task-input"
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-group">
            <DatePicker
              placeholderText="Select Date"
              className="date-picker"
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="input-group">
            <textarea
              rows="4"
              cols="50"
              name="subject"
              placeholder="Please enter the description"
              className="description-input"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-group">
            {!isPending ? (
              <button className="add-button">Add Task</button>
            ) : (
              <button className="add-button" disabled>
                Adding Task...
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
