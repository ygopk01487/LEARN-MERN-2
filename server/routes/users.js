const express = require("express");
const {
  signIn,
  signUp,
  sendMailsOTP,
  updatePassword,
} = require("../controllers/users");

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/sendMailOTP", sendMailsOTP);
router.post("/updatePassword", updatePassword);

module.exports = router;
