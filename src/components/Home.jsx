import React from "react";
import TodoItemForm from "./TodoItemForm";
import TodoList from "./TodoList";

const Home = () => {
  return (
    <div>
      <section>
        <h2>Todo List</h2>
        <TodoItemForm />
        <TodoList />
      </section>
    </div>
  );
};

export default Home;
