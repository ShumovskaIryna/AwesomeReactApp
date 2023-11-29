import React from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

const TodoList = () => {
  const todoList = useSelector((state) => state.todo.todoList);

  return (
    <>
      <table className="table mb-0">
        <thead>
          {todoList.length ? (
            <tr>
              <th scope="col">Task</th>
              <th scope="col"></th>
            </tr>
          ) : (
            <tr>
              <th scope="col">Your List is empty</th>
            </tr>
          )}
        </thead>
        <tbody>
          {todoList.map((el) => (
            <TodoItem key={el.id} todoItem={el} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;
