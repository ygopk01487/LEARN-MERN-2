import { Button, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetPassword, sendMail } from "../../actions/auth";

const ForgetPassword = () => {
  const [isPass, setIsPass] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isSend, setIsSend] = useState(true);

  const [dataForget, setDataForget] = useState(true);

  const [isOTP, setIsOTP] = useState("");

  const [formDataForget, setFormDataForget] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = formDataForget;

  const { otp } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPass();
    if (!dataForget && password === confirmPassword) {
      alert("oke!");
      dispatch(forgetPassword(formDataForget));
      navigate("/auth");
    }
  };

  const setPass = () => {
    if (isPass) {
      setIsPass(false);
      setIsSend(false);
      dispatch(sendMail(email));
    } else if (!isPass && isOTP === otp) {
      setIsSend(true);
      setDataForget(false);
    }
  };

  const onChangeForget = (e) => {
    setFormDataForget({ ...formDataForget, [e.target.name]: e.target.value });
  };

  const sendOTPAgain = () => {
    dispatch(sendMail(email));
  };

  return (
    <div
      className="full"
      style={{
        margin: "o auto",
        width: "35%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">
        {!isSend && "code sended for your mail!"}
      </Typography>
      <form onSubmit={handleSubmit}>
        {isPass && (
          <>
            <TextField
              id="outlined-basic"
              name="email"
              label="Email"
              onChange={onChangeForget}
              variant="outlined"
              required
            />
          </>
        )}
        {!isSend && (
          <>
            <TextField
              id="outlined-basic"
              name="otp"
              label="code otp"
              variant="outlined"
              onChange={(e) => setIsOTP(e.target.value)}
              required
            />
          </>
        )}

        {!dataForget && (
          <>
            <TextField
              id="outlined-basic"
              name="password"
              label="Password"
              variant="outlined"
              onChange={onChangeForget}
              required
            />
            <TextField
              id="outlined-basic"
              name="confirmPassword"
              label="Confirm password"
              variant="outlined"
              onChange={onChangeForget}
              required
            />
          </>
        )}
        <Button variant="contained" type="submit">
          Oke
        </Button>
        {!isSend && (
          <>
            <Button variant="contained" onClick={sendOTPAgain}>
              send again
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgetPassword;
