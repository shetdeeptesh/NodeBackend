const { updateEnv } = require("../helpers/envHelper");
const { generateSecureRandomString } = require("../helpers/crytoHelper");
const { config } = require("dotenv");

function setConfig(dir) {
  // Setting environment
  updateEnv("DATABASE_NAME", "MyDB", dir, false);
  updateEnv("DATABASE_USER", "dockeruser", dir, false);
  updateEnv("DATABASE_PASSWORD", "shet123", dir, false);
  updateEnv("DATABASE_HOST", "localhost", dir, false);
  updateEnv("DATABASE_PORT", "27017", dir, false);
  config();

  // Generate MongoDB connection URL
  const MONGO_DB_URL = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`;

  updateEnv("MONGO_DB_URL", MONGO_DB_URL, dir, false);
  updateEnv("SECRET_KEY", generateSecureRandomString(16), dir, false);
  updateEnv("JWT_EXPIRES", "7d", dir, false);
  updateEnv("PORT", "8000", dir, false);
  updateEnv("ROOT_DIR", dir, dir);
  config();
}

module.exports = { setConfig };
