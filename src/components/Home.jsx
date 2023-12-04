import React from "react";
import TodoItemForm from "./TodoItemForm";
import TodoList from "./TodoList";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

const Home = () => {
  return (
    <Container
      fluid="sm"
      style={{
        backgroundColor: "#b9ccff7c",
      }}
    >
      <Stack gap={3}>
        <h2 className="d-flex justify-content-center mt-3">Todo List</h2>
        <TodoItemForm />
        <TodoList />
      </Stack>
    </Container>
  );
};

export default Home;
