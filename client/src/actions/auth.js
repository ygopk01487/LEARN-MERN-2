import { AUTH, SEND_OTP } from "../constants/constansTypes";
import * as api from "../api/index";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const sendMail = (emailOTP) => async (dispatch) => {
  try {
    const { data } = await api.sendMails(emailOTP);
    dispatch({ type: SEND_OTP, data: data.OTP });
  } catch (error) {
    console.log(error);
  }
};

export const forgetPassword = (formDataForget) => async (dispatch) => {
  try {
    await api.updatePassword(formDataForget);
  } catch (error) {
    console.log(error);
  }
};
