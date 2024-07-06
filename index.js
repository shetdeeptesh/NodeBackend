const express = require("express");

// import DB Connction
const { connectMongoDB } = require("./app/config/mongo");

// Importing Middlewares
const { logReqRes } = require("./app/middlewares/loggersMiddleware");
const { checkForAuthentication, restrictTo } = require("./app/middlewares/authMiddleware");

// Importing Routes
const userRouter = require("./app/routes/userRoutes");
const publicRouter = require("./app/routes/publicRoutes");

// app Configuration
const app = express();
const port = 8000;

// DB connection
connectMongoDB("mongodb://dockeruser:shet123@localhost:27017","MyDB");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(checkForAuthentication);
app.use(logReqRes("serverlogs.txt"));


// Routes
app.use("/user",  userRouter);
app.use("/public", publicRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
