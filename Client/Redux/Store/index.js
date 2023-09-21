import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Reducers/index.js';

const rootReducer = {
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
