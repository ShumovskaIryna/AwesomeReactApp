import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/todoListSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";

const NewTodoItem = () => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addTodo({ title }));
    setTitle("");
  }

  return (
    <Container>
      <InputGroup>
        <Form.Control
          id="formInput"
          className="form-control"
          name="name"
          value={title}
          onChange={(e) => handleChange(e)}
          required
        />
        <Button variant="dark" type="submit" onClick={(e) => handleSubmit(e)}>
          Add
        </Button>
      </InputGroup>
    </Container>
  );
};

export default NewTodoItem;
