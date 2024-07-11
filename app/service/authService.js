const jwt = require("../helpers/jwtHelper");

function setUser(user) {
  const payload = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  return jwt.sign(payload);
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token);
}

module.exports = { setUser, getUser };
