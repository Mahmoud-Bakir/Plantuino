import { SET_USER_INFO, SET_PRODUCTS } from './types';

const initialState = {
  email: '',
  token: '',
  name: '',
  phoneNumber: '',
  id: '',
  products: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
