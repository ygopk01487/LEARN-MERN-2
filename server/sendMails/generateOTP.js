const generateOTP = async () => {
  console.log("hello!!!");
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    return otp;
  } catch (error) {
    console.log(err);
  }
};

module.exports = { generateOTP };
