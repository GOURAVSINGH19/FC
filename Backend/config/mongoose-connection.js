const mongoose = require("mongoose");
const config = require("config");

const dbug = require("debug")("development:mongoose")

mongoose
  .connect(`${config.get("MONGODB_URI")}/FC`)
  .then(function () {
    dbug("Connected");
  })
  .catch(function (err) {
    dbug("Failed to connect",err);
  });

module.exports = mongoose.connection;
