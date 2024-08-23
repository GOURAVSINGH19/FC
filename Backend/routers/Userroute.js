const express = require("express");
const {
  login,
  register,
  logout,
  resetPassword,
  forgotPassword,
} = require("../Controllers/Authcontroll");
const db = require("../config/mongoose-connection");

const router = express.Router();
const cors = require("cors");

const corsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
};

router.use(cors(corsOptions));

router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forget-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
