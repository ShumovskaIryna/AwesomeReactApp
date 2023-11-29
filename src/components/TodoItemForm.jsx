import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/todoListSlice";

const NewTodoItem = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addTodo({ name }));
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
          value={name}
          onChange={(e) => handleChange(e)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default NewTodoItem;
