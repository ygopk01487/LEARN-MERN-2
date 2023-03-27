const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
  email: { type: String, require: true },
  otp: { type: String },
  createAt: { type: Date },
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
