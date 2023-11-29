import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialValue = {
  todoList: [
    {
      id: 123,
      name: 'Buy Coffee',
    },
    {
      id: 124,
      name: 'Do Test Task',
    }
  ],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      action.payload.id = uuidv4();
      state.todoList.unshift(action.payload);
    },
    deleteTodo: (state, action) => {
      const todoList = state.todoList;
      if (todoList) {
        todoList.forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            todoList.splice(index, 1);
          }
        });
      }
    },
  },
});

export const { addTodo, deleteTodo } =
  todoSlice.actions;
export default todoSlice.reducer;