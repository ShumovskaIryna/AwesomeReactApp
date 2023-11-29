import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../redux/slices/todoListSlice";

const TodoItem = (props) => {
  const dispatch = useDispatch();

  const handleRemove = (todoItem) => {
    dispatch(deleteTodo(todoItem));
  };

  return (
    <>
      <tr className="fw-normal">
        <th className="align-middle">
          <div className="checkbox">
            <label htmlFor={props.todoItem}>
              <span className="ms-2">{props.todoItem.name}</span>
            </label>
          </div>
        </th>
        <td className="align-middle">
          <FaTrash
            role="delete_button"
            className="fas fa-trash-alt fa-lg text-warning"
            onClick={() => handleRemove(props.todoItem)}
          />
        </td>
      </tr>
    </>
  );
};
export default TodoItem;
