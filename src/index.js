import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getErrorState } from './store/error';

import configureStore from './store/store';
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTaskState,
  createTask,
} from './store/task';

const store = configureStore();

const App = () => {
  const { entities, isLoading } = useSelector(getTaskState());
  const { entities: error } = useSelector(getErrorState());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (id) => {
    dispatch(titleChanged(id));
  };

  const deleteTask = (id) => {
    dispatch(taskDeleted(id));
  };

  if (isLoading) {
    return <h1>{isLoading}</h1>;
  }
  if (error.length) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>App</h1>
      <ul>
        {entities.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button
              onClick={() => {
                dispatch(completeTask(el.id));
              }}
            >
              Complete
            </button>
            <button
              onClick={() => {
                changeTitle(el.id);
              }}
            >
              Change Title
            </button>
            <button
              onClick={() => {
                deleteTask(el.id);
              }}
            >
              Delete
            </button>
            <hr />
          </li>
        ))}
        <button
          onClick={() => {
            dispatch(createTask());
          }}
        >
          Create Task
        </button>
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
