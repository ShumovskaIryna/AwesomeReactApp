import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/todoListSlice";

const NewTodoItem = () => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addTodo({ title }));
  }

  return (
    <>
      <form
        className="d-flex justify-content-center align-items-center mb-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="formInput"
          className="form-control"
          name="name"
          value={title}
          onChange={(e) => handleChange(e)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default NewTodoItem;
