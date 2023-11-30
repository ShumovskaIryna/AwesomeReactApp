import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../redux/slices/todoListSlice";

const TodoList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const { todoList, isLoading, error } = useSelector((state) => state.todo);

  if (isLoading) {
    return "loading...";
  }

  if (error) {
    return error;
  }

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
