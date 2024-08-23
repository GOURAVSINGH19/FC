const nodemailer = require("nodemailer");

const PASSWORD_RESET_REQUEST_TEMPLATE = require("../multitrap/EmailTemplate");

const sendMail = async (email, text, resetToken) => {
  console.log(resetToken);
  const transpoter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    port: 465,
    html: PASSWORD_RESET_REQUEST_TEMPLATE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
  const mailoptions = {
    from: {
      name: "Company",
      address: process.env.EMAIL,
    },
    to: email,
    html: ` <p>You requested a password reset</p>
    <p>Click <a href="${resetToken}">here</a> to reset your password</p>`,
    subject: text,
    text: resetToken,
  };

  await transpoter.sendMail(mailoptions, (err) => {
    if (err) console.log(err);
    else console.log("Email sent successfully");
  });
};

module.exports = sendMail;