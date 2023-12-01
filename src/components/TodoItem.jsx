import React, { useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../redux/slices/todoListSlice";

const TodoItem = (props) => {
  const [isChecked, setChecked] = useState(props.todoItem.checked);
  const [isDisabled, setDisabled] = useState(true);
  const [title, setTitle] = useState(props.todoItem.title);

  const dispatch = useDispatch();

  const handleRemove = (todoItem) => {
    dispatch(deleteTodo(todoItem.id));
  };

  const handleCheck = (todoItem) => {
    dispatch(
      updateTodo({
        ...todoItem,
        checked: !isChecked,
      })
    );
    setChecked((prevChecked) => !prevChecked);
  };
  function handleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }
  const handleUpdate = (todoItem) => {
    dispatch(
      updateTodo({
        ...todoItem,
        title: title,
      })
    );
  };

  return (
    <>
      <tr className="fw-normal">
        <th className="align-middle">
          <div className="checkbox">
            <input
              type="checkbox"
              id={props.todoItem.id}
              checked={isChecked}
              onChange={() => handleCheck(props.todoItem)}
            />
            <label htmlFor={props.todoItem.id}>
              <input
                type="text"
                id={props.todoItem.id}
                value={title}
                onChange={(e) => handleChange(e)}
                disabled={isDisabled}
              />
              {!isDisabled ? (
                <button onClick={() => handleUpdate(props.todoItem)}>
                  Save
                </button>
              ) : (
                <></>
              )}
            </label>
          </div>
        </th>
        <td className="align-middle">
          <FaPen
            role="delete_button"
            className="fas fa-trash-alt fa-lg text-info"
            onClick={() => setDisabled((isDisabled) => !isDisabled)}
          />
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
