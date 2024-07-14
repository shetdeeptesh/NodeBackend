const fs = require("fs");
const path = require("path");

function checkDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  checkDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

module.exports = { checkDirectoryExistence };
