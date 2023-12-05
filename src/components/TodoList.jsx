import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../redux/slices/todoListSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const TodoList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const todosPerPage = parseInt(queryParams.get("limit")) || 7;
  const [currentPage, setCurrentPage] = useState(
    parseInt(queryParams.get("page")) || 1
  );

  // Fetch Todo List with pagination
  useEffect(() => {
    dispatch(fetchTodos({ limit: todosPerPage, offset: currentPage }));
  }, [dispatch, currentPage, todosPerPage]);

  const { todoList, totalCount, isLoading, error } = useSelector(
    (state) => state.todo
  );

  if (isLoading) {
    return "loading...";
  }

  if (error) {
    return error;
  }
  const totalPages = Math.ceil(totalCount / todosPerPage);

  // Set Pages and set Query params for pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    params.set("limit", todosPerPage);
    navigate(`/?${params.toString()}`);
  };

  return (
    <Container>
      {/* TodoList */}
      <Stack gap={3}>
        {todoList.map((el) => (
          <TodoItem key={el.id} todoItem={el} />
        ))}
      </Stack>

      {/* Pagination buttons */}
      {totalCount > todosPerPage && (
        <ListGroup
          className="d-flex justify-content-center mt-3 mb-3"
          horizontal
        >
          <Button
            variant="outline-dark"
            className="d-flex m-1"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            1
          </Button>
          <Button
            variant="outline-dark"
            className="d-flex m-1"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FaArrowLeft />
          </Button>
          <Button variant="dark" className="d-flex m-1">
            {currentPage}
          </Button>
          <Button
            variant="outline-dark"
            className="d-flex m-1"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <FaArrowRight />
          </Button>
          <Button
            variant="outline-dark"
            className="d-flex m-1"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            {totalPages}
          </Button>
        </ListGroup>
      )}
    </Container>
  );
};

export default TodoList;
