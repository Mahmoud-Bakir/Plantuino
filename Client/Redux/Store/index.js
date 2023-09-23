import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import plantReducer from "./plantSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    plant: plantReducer,
  },
});

export default store;
