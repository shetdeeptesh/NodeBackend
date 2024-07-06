const jwt = require("jsonwebtoken");
const secret = "secret";

function setUser(user) {
  const payload = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, secret);
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secret);
}

module.exports = { setUser, getUser };
