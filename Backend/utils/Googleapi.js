const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");

dotenv.config();

const clientid = process.env.GOOGLE_CLIENT_ID;
const clientsecret = process.env.GOOGLE_CLIENT_SECRET;

exports.oauth2client = new OAuth2Client(clientid, clientsecret, "postmessage");
