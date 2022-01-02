import { createSlice } from '@reduxjs/toolkit';

import todoSerivce from '../services/todo.service';
import { setError } from './error';

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (item) => item.id !== action.payload.id
      );
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
    taskCreated(state, action) {
      console.log(action);
      state.entities.push(action.payload);
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const {
  update,
  remove,
  received,
  taskRequested,
  taskRequestFailed,
  taskCreated,
} = actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const content = await todoSerivce.getTodos();
    dispatch(received(content));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const createTask = () => async (dispatch) => {
  const newTask = {
    title: 'delectus aut autem',
    completed: false,
  };
  try {
    const content = await todoSerivce.createTodo(newTask);
    dispatch(taskCreated(content));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }));
};

export const titleChanged = (id) => {
  return update({ id, title: `New title for ${id}` });
};

export const taskDeleted = (id) => {
  return remove({ id });
};

export const getTaskState = () => (state) => state.task;

export default taskReducer;
