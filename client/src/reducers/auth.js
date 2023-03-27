import { AUTH, LOGOUT, SEND_OTP } from "../constants/constansTypes";

const authReducer = (state = { authData: null }, action) => {
  const { type, data } = action;
  switch (type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...data }));
      return { ...state, authData: data };
    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    case SEND_OTP:
      return {
        otp: data,
      };
    default:
      return state;
  }
};

export default authReducer;
