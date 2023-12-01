import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../redux/slices/todoListSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 7;

  useEffect(() => {
    dispatch(fetchTodos({ limit: todosPerPage, offset: currentPage }));
  }, [dispatch, currentPage]);

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
  /**
   * Go to the previous page of the paginated list
   */
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };
  /**
   * Go to the next page of the paginated list
   */
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
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
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button
              className="page-link"
              disabled={currentPage === 1}
              onClick={() => previousPage()}
            >
              {"<="}
            </button>
            <button className={`page-item ${currentPage ? "active" : ""}`}>
              {currentPage}
            </button>
            <button
              className="page-link"
              disabled={currentPage === totalPages}
              onClick={() => nextPage()}
            >
              {"=>"}
            </button>
            <button
              className="page-link"
              onClick={() => setCurrentPage(totalPages)}
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
