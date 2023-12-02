import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../redux/slices/todoListSlice";
import { useLocation, useNavigate } from "react-router-dom";

const TodoList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const todosPerPage = parseInt(queryParams.get("limit")) || 7;
  const [currentPage, setCurrentPage] = useState(
    parseInt(queryParams.get("page")) || 1
  );

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    params.set("limit", todosPerPage);
    navigate(`/?${params.toString()}`);
  };

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
      {/* Pagination buttons */}
      {totalCount > todosPerPage && (
        <nav className="mt-3" aria-label="Page navigation">
          <ul className="pagination">
            <button
              className="page-link"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(1)}
            >
              1
            </button>
            <button
              className="page-link"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              {"<="}
            </button>
            <button className={`page-item ${currentPage ? "active" : ""}`}>
              {currentPage}
            </button>
            <button
              className="page-link"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {"=>"}
            </button>
            <button
              className="page-link"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              {totalPages}
            </button>
          </ul>
        </nav>
      )}
    </>
  );
};

export default TodoList;
