const express = require("express");
const { login, test, register, logout } = require("../Controllers/Authcontroll");
const router = express.Router();
const cors = require("cors");

router.use(
    cors({
        Credential:true,
        origin:"http://localhost:5173"
    })
)

router.post("/register", register);
router.post("/login", login);
router.get("/logout",logout)

module.exports = router;
