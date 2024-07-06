const { getUser } = require("../service/authService");

function checkForAuthentication(req, res, next) {
  const authorizationHeaderValue = req.headers["authorization"];
  req.user = null;

  if (
    !authorizationHeaderValue ||
    !authorizationHeaderValue.startsWith("Bearer ")
  ) {
    return next();
  }

  const token = authorizationHeaderValue.split("Bearer ")[1];
  try {
    const user = getUser(token);
    if (!user) {
      return res.json({ msg: "You must be logged in" });
    }
    req.user = user;
    return next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ msg: "Invalid token" });
  }
}

function restrictTo(roles) {
  return function (req, res, next) {

    if (!req.user) {
      return res.json({ msg: "You must be logged in" });
    }

    if (!roles.includes(req.user.role)) {
      return res.json({ msg: "You are not allowed to access this" });
    }
    return next();
  };
}

function restrictToSelf() {
  return function (req, res, next) {
    if (!req.user) {
      return res.json({ msg: "You must be logged in" });
    }

    if (req.user.role === 'admin') {
      return next();
    }

    if (req.user.id == req.params.userId) {
      return next();
    }

    return res.json({ msg: "You are not allowed to update this user's data" });
  };
}


module.exports = {
  checkForAuthentication,
  restrictTo,
  restrictToSelf
};
