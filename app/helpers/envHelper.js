const fs = require("fs");
const path = require("path");

async function updateEnv(variableName, variableValue, environmentLocation = "", overwrite = true) {
  // Determine the .env file location
  const envLocation = environmentLocation !== "" ? environmentLocation : __dirname;
  const envFilePath = path.join(envLocation, ".env");

  let envContent = "";

  // Read the current .env file if it exists
  if (fs.existsSync(envFilePath)) {
    envContent = fs.readFileSync(envFilePath, "utf-8");
  }

  // Split the content by lines and update the variable if it exists, or add it if it doesn't
  let lines = envContent.split("\n");
  let variableExists = false;

  lines = lines.map(line => {
    if (line.startsWith(`${variableName}=`)) {
      variableExists = true;
      if (overwrite || line.split('=')[1].trim() === '') {
        return `${variableName}=${variableValue}`;
      }
    }
    return line;
  });

  if (!variableExists) {
    lines.push(`${variableName}=${variableValue}`);
  }

  // Join the lines back and write the updated content to the .env file
  const newEnvContent = lines.join("\n");
  fs.writeFileSync(envFilePath, newEnvContent);

//   console.log(`${variableName} updated in ${envFilePath}`);
}

module.exports = { updateEnv };
