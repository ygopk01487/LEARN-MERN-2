const nodemailer = require("nodemailer");

const sendMails = ({ email, generatedOTP }) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "This code",
    text: "This my code",
    html: `<p style={{font-weight: "bold", font-size: "24px"}}>This code: ${generatedOTP}</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error in sending mail", err);
    } else {
      console.log("Mail send successfully");
    }
  });
};

module.exports = { sendMails };
