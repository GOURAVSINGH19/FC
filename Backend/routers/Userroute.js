const express = require("express");
const {
  login,
  register,
  logout,
  resetPassword,
  Forgetpassword,
} = require("../Controllers/Authcontroll");
const router = express.Router();
const cors = require("cors");
const { Googleauth } = require("../Controllers/GoogleAuth");
const authSchema = require("../Middlewares/AuthValidation");
router.use(
  cors({
    Credential: true,
    origin: "http://localhost:5173",
  })
);

router.post("/register",authSchema, register);
router.post("/login",authSchema, login);
router.post("/logout", logout);
router.post("/forget-password", Forgetpassword);
router.post("/reset-password/:token", resetPassword);
router.post("/google", Googleauth);
module.exports = router;
