const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models/users");
const { generateOTP } = require("../sendMails/generateOTP");
const { sendMails } = require("../sendMails/sendMails");
const OTP = require("../models/otp");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "user doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const signUp = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(404).json({ message: "user already exist." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password don't match." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await users.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = await jwt.sign(
      { email: result.email, id: result._id },
      "test",
      { expiresIn: "1h" }
    );

    // sendMails({ email });

    res.status(200).json({ result: result, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const sendMailsOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(402).json({ message: "email not found" });
  }
  try {
    //clear any old record
    const existingEmail = await OTP.findOne({ email });
    if (existingEmail) {
      await OTP.deleteOne({ email });
    }

    //generate pin
    const generatedOTP = await generateOTP();

    //send mail
    await sendMails({ email, generatedOTP });

    //hash OTP
    const hashOTP = await bcrypt.hash(generatedOTP, 10);

    const newOTP = new OTP({
      email,
      otp: hashOTP,
      createAt: new Date().toISOString(),
    });

    await newOTP.save();

    res.status(200).json({ OTP: generatedOTP, message: "successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

//update password
const updatePassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  console.log(email);
  console.log(password);
  try {
    const checkEmail = await users.findOne({ email });

    if (!checkEmail) {
      res.status(404).json({ message: "email not found!" });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    console.log(hashPassword);

    const updateNewPassword = await users.findByIdAndUpdate(
      checkEmail._id,
      {
        password: hashPassword,
      },
      {
        new: true,
      }
    );
    console.log(updateNewPassword);
    res
      .status(200)
      .json({ userUpdatePassword: updateNewPassword, message: "oke baby" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { signIn, signUp, sendMailsOTP, updatePassword };
