const { compareSync } = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const saltRounds = 10;

function hashPassword(password) {
  const hashedPW = bcrypt.hashSync(password, saltRounds);
  return hashedPW;
}

function comparePassword(hashedPW, UserPassword) {
  return compareSync(UserPassword, hashedPW);
}

module.exports = { hashPassword, comparePassword };
