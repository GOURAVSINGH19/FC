const { generateToken } = require("../utils/generateToken");
const userModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendMail } = require("../utils/Sendemail");
module.exports.register = async function (req, res) {
  try {
    let { firstname, lastname, email, password, confirmPassword } = req.body;
    let user = await userModel.findOne({ email });

    if (user) {
      return res
        .status(503)
        .send("you don't have permission to create a new user");
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err);
        else {
          let user = await userModel.create({
            email,
            password: hash,
            confirmPassword: hash,
            firstname: firstname,
            lastname: lastname,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          sendMail(user.email,"Welcome to Our website",`Hi, ${firstname} Thank you for registering`)
          res.send("created");
        }
      });
    });
  } catch (err) {
    res(500).send(err);
  }
};

module.exports.login = async function (req, res) {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });

  if (!user) {
    return res.send("User not found");
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.status(200).send({ data: token, message: "login" });
    } else {
      res.status(404).send("error");
    }
  });
};

module.exports.logout = async function (req, res) {
  res.clearCookie("token");
  res.send("User logged out");
};

module.exports.Forgetpassword = async function (req, res) {
  const { email} = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found");
  }
  const resetToken =  crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; 
  await user.save();

  await sendMail(email,"Reset your Password", resetToken);
  res.status(200).send('Password reset email sent');
  
};

module.exports.resetPassword = async function (req, res) {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        return res.status(400).send("Token expired or invalid");
      } else {
        bcrypt.hash(password, 10).then((hash) => {
          userModel.findByIdAndUpdate(
            { _id: id },
            {
              password: hash,
            }
          );
        });
      }
      res.send("Password reset successfully");
    });
  } catch (err) {
    res.send("password not changed: " + err.message);
  }
};
