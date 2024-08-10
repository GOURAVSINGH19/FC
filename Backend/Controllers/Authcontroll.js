const { generateToken } = require("../utils/generateToken");
const userModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
module.exports.register = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;
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
            fullname,
            email,
            password: hash,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          res.send("you can login");
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
    console.log("User not found");
    return res.send("User not found");
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      console.log("User found and password matched");
      let token = generateToken(user);
      res.cookie("token", token);
      res.send("you can login");
    } else {
      res.status(404).send("error");
    }
  });
};

module.exports.logout = async function (req, res) {
  res.clearCookie("token", "");
  res.redirect("/");
};
