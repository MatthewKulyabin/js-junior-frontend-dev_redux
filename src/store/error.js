import { createSlice } from '@reduxjs/toolkit';

const initialState = { entities: [] };

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    set(state, action) {
      state.entities.push(action.payload);
    },
  },
});

const { actions, reducer: errorReducer } = errorSlice;

const { set } = actions;

export const setError = (message) => (dispatch) => {
  dispatch(set(message));
};

export const getErrorState = () => (state) => state.error;

export default errorReducer;
