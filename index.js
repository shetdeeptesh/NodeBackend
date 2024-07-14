const express = require("express");
const { setConfig } = require("./app/config/enviroment");
const { config } = require("dotenv");

// loading and setting configuration
setConfig(__dirname);
config();

// app Configuration
const app = express();
const port = process.env.PORT;

// import DB Connction
const { connectMongoDB } = require("./app/config/mongo");

// DB connection
const db_name = process.env.DATABASE_NAME;
const db_url = process.env.MONGO_DB_URL;
connectMongoDB(db_url, db_name);

// Importing Routes
const userRouter = require("./app/routes/userRoutes");
const publicRouter = require("./app/routes/publicRoutes");
const permissionRouter = require("./app/routes/permissionRoutes");
const roleRouter = require("./app/routes/roleRoutes");

// Importing Middlewares
const { logReqRes } = require("./app/middlewares/loggersMiddleware");
const { checkForAuthentication } = require("./app/middlewares/authMiddleware");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(checkForAuthentication);
app.use(logReqRes("serverLogs"));

// Routes
app.use("/user", userRouter);
app.use("/public", publicRouter);
app.use("/permissions", permissionRouter);
app.use("/roles", roleRouter);

// console.error("Error during initialization:", err);

app.listen(port, () => console.log(`Server running on port ${port}`));
