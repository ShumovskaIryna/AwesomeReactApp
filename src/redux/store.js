import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../redux/slices/todoListSlice';

import { combineReducers } from "redux";

const reducer = combineReducers({
  todo: todoReducer,
});
export const store = configureStore({reducer});
export default store;
