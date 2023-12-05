import React, { useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../redux/slices/todoListSlice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const TodoItem = (props) => {
  const [isChecked, setChecked] = useState(props.todoItem.checked); //for checkbox
  const [isDisabled, setDisabled] = useState(true); // for pen icon (editing input || just read)
  const [title, setTitle] = useState(props.todoItem.title); // for input
  const dispatch = useDispatch();

  // Delete todo item
  const handleRemove = (todoItem) => {
    dispatch(deleteTodo(todoItem.id));
  };
  // Update for checkbox (todoitem.checked)
  const handleCheck = (todoItem) => {
    dispatch(
      updateTodo({
        ...todoItem,
        checked: !isChecked,
      })
    );
    setChecked((prevChecked) => !prevChecked);
  };
  // Listener on input value
  function handleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }
  // Update for input value (todoitem.title)
  const handleUpdate = (todoItem) => {
    dispatch(
      updateTodo({
        ...todoItem,
        title: title,
      })
    );
  };

  return (
    <Row className="d-flex justify-content-between">
      {/* Checkbox */}
      <Col xs={1} md={1}>
        <div
          id={props.todoItem.id}
          checked={isChecked}
          onClick={() => handleCheck(props.todoItem)}
          className={`checkbox ${isChecked ? "checked" : ""}`}
        ></div>
      </Col>
      {/* Input Group (isDisabled just for reading || !isDisabled for editing) */}
      <Col xs={8} md={9}>
        <InputGroup>
          <Col xs={10} sm={11}>
            <Form.Control
              aria-describedby="basic-addon2"
              type="text"
              id={props.todoItem.id}
              value={title}
              onChange={(e) => handleChange(e)}
              disabled={isDisabled}
              style={{
                borderStyle: `${isDisabled ? "none" : "initial"}`,
                backgroundColor: "#b9ccff57",
                color: "black",
              }}
            />
          </Col>
          {!isDisabled ? (
            <Col xs={2} sm={1}>
              <Button
                variant="outline-dark"
                onClick={() => handleUpdate(props.todoItem)}
                size="sm"
              >
                Save
              </Button>
            </Col>
          ) : (
            <></>
          )}
        </InputGroup>
      </Col>
      {/* Edit */}
      <Col xs={1} md={1}>
        <FaPen
          role="update_button"
          className="fas fa-edit fa-lg me-2"
          onClick={() => setDisabled((isDisabled) => !isDisabled)}
        />
      </Col>
      {/* Delete */}
      <Col xs={1} md={1}>
        <FaTrash
          role="delete_button"
          className="fas fa-trash-alt fa-lg"
          onClick={() => handleRemove(props.todoItem)}
        />
      </Col>
    </Row>
  );
};
export default TodoItem;
