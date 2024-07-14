const crypto = require("crypto");

function generateSecureRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

module.exports = { generateSecureRandomString };
