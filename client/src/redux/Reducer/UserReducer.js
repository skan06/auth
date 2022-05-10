import {
  FAILED,
  LOAD,
  LOGOUT,
  SIGNIN,
  SIGNUP,
} from "../ActionTypes/ActionTypes";

const initialstate = {
  load: false,
  error: [],
  user: {},
  isAuth: false,
};
export const userReducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    case LOAD:
      return {
        ...state,
        load: true,
      };
    case SIGNUP:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: payload.user,
        load: false,
        isAuth: true,
      };
    case SIGNIN:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: payload.user,
        load: false,
        isAuth: true,
      };
    case FAILED:
      return {
        ...state,
        load: false,
        isAuth: false,
        error: payload,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        user: {},
        load: false,
        error: [],
        isAuth: false,
      };

    default:
      return state;
  }
};
