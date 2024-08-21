const express = require("express")
const {
  login,
  register,
  logout,
  resetPassword,
  Forgetpassword,
} = require("../Controllers/Authcontroll");
const router = express.Router();
// const cors = require("cors");

// // Use environment variables or a configuration file to manage allowed origins dynamically
// const corsOptions = {
//   credentials: true,
//   origin: "http://localhost:5173",
// };

// router.use(cors(corsOptions));

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forget-password", Forgetpassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
