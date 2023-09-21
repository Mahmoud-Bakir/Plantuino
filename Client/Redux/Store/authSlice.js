import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  userType:"",
  token: '',
  name: '',
  phoneNumber: '',
  id: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action) {
      const { email, token, name, phoneNumber, id , userType } = action.payload;
      state.email = email;
      state.token = token;
      state.name = name;
      state.phoneNumber = phoneNumber;
      state.id = id;
      state.userType=userType
    },
  },
});

export const { setAuthData } = authSlice.actions;
export const selectAuthState = (state) => state.auth;
export default authSlice.reducer;
