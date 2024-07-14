const fs = require("fs");
const path = require("path");
const { checkDirectoryExistence } = require("../helpers/folderHelper");
const { getFormattedDate } = require("../helpers/dateFormatter");

const location = process.env.ROOT_DIR;

function logReqRes(filename) {
  return (req, res, next) => {
    if (req.path === "/favicon.ico") {
      return next();
    }
    const generatedFileName = filename + "_" + getFormattedDate() + ".log";
    const newPath = path.join(location, "output", "logs", 'req', generatedFileName);

    checkDirectoryExistence(newPath);

    fs.appendFile(
      newPath,
      `${getFormattedDate("dd MM yyyy, HH:mm:ss")}, ${req.ip}, ${req.method}, ${
        req.path
      }\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = { logReqRes };
