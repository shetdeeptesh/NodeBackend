const fs = require("fs");
const path = require("path");

function saveData(filename, data, location = "") {
  const fileLocation = location != "" ? location : __dirname;
  const filePath = path.join(fileLocation, filename);
  var fileExtension = filename.split(".").pop();
  var dumpData;

  if (fileExtension.toLowerCase() == "json") {
    dumpData = JSON.stringify(data);
  }

  fs.writeFile(filePath, data, (err) => {
    if (err) throw err;
    console.log("Data saved in"+ filePath);
  });
}

function readData(filename, location = "") {
  const filePath = path.join(__dirname, filename);
}

module.exports = { saveData, readData };

// saveData("data.txt.json", '{"key": "value"}', "../../myFolder");
