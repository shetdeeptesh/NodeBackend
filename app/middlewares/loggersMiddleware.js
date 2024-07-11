const fs = require("fs");
const dateFormater = require("../helpers/dateFormatter")

function logReqRes(filename) {
  return (req, res, next) => {
    if (req.path === "/favicon.ico") {
      return next();
    }
    fs.appendFile(
      "app/serverlogs/" + filename+"_"+dateFormater.getFormattedDate()+".log",
      `${dateFormater.getFormattedDate('dd MM yyyy, HH:mm:ss')}, ${req.ip}, ${req.method}, ${req.path}\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = { logReqRes };
