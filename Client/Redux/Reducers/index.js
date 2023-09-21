import { SET_USER_INFO } from "../Types";

const initialState = {
  name: "",
  email: "",
  token: "",
  userType:0,
  phoneNumber: "",
  id: "",
};

const userReducer = (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case SET_USER_INFO:
      console.log("SET_USER_INFO Action:", action);
      console.log("Previous State:", state);

      nextState = {
        ...state,
        ...action.payload,
      };

      console.log("Next State:", nextState);

      return nextState;

    default:
      return state;
  }
};

export default userReducer;
