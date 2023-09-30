import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  userType: "",
  token: "",
  name: "",
  phoneNumber: "",
  _id: "",
  country: "",
  city: "",
  street: "",
  located:false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action) {
      const {
        email,
        token,
        name,
        phoneNumber,
        _id,
        userType,
        located,
      } = action.payload;
      state.email = email;
      state.token = token;
      state.name = name;
      state.phoneNumber = phoneNumber;
      state._id = _id;
      state.userType = userType;
      state.located=located
    },
    setAddressData(state, action) {
      const { city, country, street } = action.payload;
      state.city = city;
      state.country = country;
      state.street = street;
    },
  },
});

export const { setAuthData, setAddressData } = authSlice.actions; 

export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
