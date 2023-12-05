import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import LocalStorage from '../../storage/LocalStorage';
import TodoApi from '../../api/Todo'
const initialState = {
  todoList: [],
  isLoading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (params) => {
    const res = await TodoApi.getTodosList(params);
    const { 'x-total-count': totalCount } = res.headers;
    const data = await res.data

    return {data, headers: { totalCount }};
  }
);

export const addTodo = createAsyncThunk(
  'todo/createTodo',
  async (newTodo, { getState, dispatch }) => {
    try {
      const res = await TodoApi.addTodoItem(newTodo)
      if (res.error) {
        console.error(res.error);
      } else {
        dispatch(todoSlice.actions.addTodo(res.data));
        return getState().todo.todoList;
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id, { getState, dispatch }) => {
    const state = getState();
    const res = await TodoApi.deleteTodoItem(id)

    if (res.error) {
      console.error(res.error);
    } else {
      const removedTodo = state.todo.todoList.find((todo) => todo.id === id);
      dispatch(todoSlice.actions.deleteTodo(removedTodo));
      return getState().todo.todoList;
    }
  }
);
export const updateTodo = createAsyncThunk(
  'todo/updateTodos',
  async ({ id, title, checked }, { getState, dispatch }) => {
    try {
      const res = await TodoApi.updateTodoItem({
        id,
        title,
        checked,
      });

      if (res.error) {
        console.error(res.error);
      } else {
        const updatedTodo = res.data;
        dispatch(todoSlice.actions.updateTodo(updatedTodo));
        return getState().todo.todoList;
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.unshift(action.payload);
      state.todoList.pop();
      LocalStorage.createKeyWithData('todos', state.todoList);
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter((todo) => todo.id !== action.payload.id);
      LocalStorage.createKeyWithData('todos', state.todoList);
    },
    updateTodo: (state, action) => {
      const { id, title, checked } = action.payload;
      const updatedTodoIndex = state.todoList.findIndex((todo) => todo.id === id);

      if (updatedTodoIndex !== -1) {
        state.todoList[updatedTodoIndex] = { id, title, checked };
        LocalStorage.createKeyWithData('todos', state.todoList);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false
      console.log(action.payload)
      state.todoList = action.payload.data
      state.totalCount = action.payload.headers.totalCount
    })
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(addTodo.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.isLoading = false
      state.todoList = action.payload
    })
    builder.addCase(addTodo.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(deleteTodo.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todoList = action.payload
    })
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(updateTodo.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todoList = action.payload
    })
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
});

export default todoSlice.reducer;