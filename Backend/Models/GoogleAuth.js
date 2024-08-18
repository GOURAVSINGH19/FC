const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const googleauth = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  picture: {
    type: String,
  },
});

module.exports = mongoose.model("Googleauthuser", googleauth);
