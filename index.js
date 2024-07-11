const express = require("express");
require('dotenv').config();

// import DB Connction
const { connectMongoDB } = require("./app/config/mongo");

// Importing Middlewares
const { logReqRes } = require("./app/middlewares/loggersMiddleware");
const { checkForAuthentication, restrictTo } = require("./app/middlewares/authMiddleware");

// Importing Routes
const userRouter = require("./app/routes/userRoutes");
const publicRouter = require("./app/routes/publicRoutes");
const permissionRouter = require("./app/routes/permissionRoutes");
const roleRouter = require("./app/routes/roleRoutes");

// app Configuration
const app = express();
const port = process.env.PORT || 8000;

// DB connection
const db_name = process.env.DATABASE_NAME || "MyDB";
const db_url = process.env.MONGO_DB_URL;
connectMongoDB(db_url,db_name);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(checkForAuthentication);
app.use(logReqRes("log"));

// Routes
app.use("/user",  userRouter);
app.use("/public", publicRouter);
app.use("/permissions", permissionRouter);
app.use("/roles", roleRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
