import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signUp } from "../../actions/auth";

const SendMail = () => {
  const location = useLocation();

  const [otps, setOtp] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const dataForm = location.state;

  const { otp } = useSelector((state) => state.auth);

  const submitOke = () => {
    if (otps.length > 4) {
      console.log("false!!!!!!!");
    } else if (otps === otp) {
      console.log("true");
      dispatch(signUp(dataForm, navigate));
    }
  };

  // const sendAgain = () =>{
  //   dispatch
  // }

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
      <Typography variant="h5">code sended for your mail!</Typography>
      <form>
        <TextField
          id="outlined-basic"
          name="otp"
          label="Outlined"
          variant="outlined"
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button variant="contained" onClick={submitOke}>
          Oke
        </Button>
        <Button variant="contained">send again</Button>
      </form>
    </div>
  );
};

export default SendMail;
