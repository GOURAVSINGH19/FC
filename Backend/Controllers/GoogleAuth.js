const { oauth2client } = require("../utils/Googleapi");
const GoogleAuth = require("../Models/GoogleAuth");
const generateToken = require("../utils/generateToken");
const axios = require("axios");


module.exports.Googleauth = async (req, res) => {
  try {
    const { code } = req.query;
    const googleres = await oauth2client.getToken(code);
    console.log(googleres)
    oauth2client.setCredentials(googleres.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${googleres.tokens.access_token}`
    );
    const { email, name, picture } = userRes.data;
    let user = await GoogleAuth.findOne({ email });
    if (!user) {
      user = await GoogleAuth.create({
        name,
        email,
        picture,
      });
    }
    const token = generateToken(user);
    res.cookie("token", token);
    res.status(200).json({
      message: "Google authentication successful",
    });
  } catch (e) {
    console.log(e);
    throw new Error("Google authentication failed");
  }
};