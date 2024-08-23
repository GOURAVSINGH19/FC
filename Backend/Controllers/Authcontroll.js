const { generateToken } = require("../utils/generateToken");
const userModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const UserModel = require("../Models/UserModel");
const sendEmail = require("../utils/Sendemail");
module.exports.register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  console.log(email);
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send("Email  already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal  server error");
  }
};

module.exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send("Invalid  credentials");
    }

    const token = generateToken(user);
    res.cookie("token", token);
    res.status(200).send("Login successful");
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logged out");
};

module.exports.forgotPassword = async (req, res) => {
  console.log(req.body);

  const { email } = req.body;
  console.log(email);
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const resetToken = generateToken(user);
    console.log(resetToken)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    sendEmail(email, "Password Reset", resetToken);
    await user.save();

    res.status(200).send("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).send("Invalid or expired token");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).send("Password   reset successfully");
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).send("Internal server error");
  }
};
