import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers';

const rootReducer = {
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
