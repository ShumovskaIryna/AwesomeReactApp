import { v4 as uuidv4 } from 'uuid';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  todoList: [],
  isLoading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async () => {
    const res = await axios('http://localhost:3000/todos')

    await new Promise((res) => {
      setTimeout(res, 3000);
    })

    const data = await res.data
    return data
  }
)

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
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
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false
      state.todoList = action.payload
    })
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
});

export const { getTodo, addTodo, deleteTodo } =
  todoSlice.actions;
export default todoSlice.reducer;