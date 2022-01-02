import { configureStore, combineReducers } from '@reduxjs/toolkit';
import errorReducer from './error';

import { logger } from './middleware/logger';
import taskReducer from './task';

const rootReducer = combineReducers({
  error: errorReducer,
  task: taskReducer,
});

const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export default createStore;