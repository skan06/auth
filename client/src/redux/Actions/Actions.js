import { FAILED, LOAD, SIGNUP,SIGNIN, LOGOUT } from "../ActionTypes/ActionTypes";
import axios from "axios";

export const signup = (newUser) => async (dispatch) => {
  dispatch({ type: LOAD });
  try {
    let result = await axios.post("/api/user/signup", newUser);
    dispatch({ type: SIGNUP, payload: result.data });
  } catch (error) {
    dispatch({ type: FAILED, payload: error.response.data.errors });
  }
};
export const signin = (user) => async (dispatch) => {
  dispatch({ type: LOAD });
  try {
    let result = await axios.post("/api/user/signin", user);
    dispatch({ type: SIGNIN, payload: result.data });
  } catch (error) {
    dispatch({ type: FAILED, payload: error.response.data.errors });
  }
};
export const logout =()=>{
    return {type:LOGOUT}
}

