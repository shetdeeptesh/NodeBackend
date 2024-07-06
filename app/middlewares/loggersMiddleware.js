const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    if (req.path === "/favicon.ico") {
      return next();
    }
    fs.appendFile(
      "app/serverlogs/" + filename,
      `\n${Date.now()}:${req.ip} ${req.method} : ${req.path}\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = { logReqRes };
