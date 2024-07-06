const express = require("express");
const router = express.Router();
const {
  handleUserLogin,
  handleCreateNewUser,
} = require("../controllers/userController");

// Routes for public users
router.post("/login", handleUserLogin);
router.post("/signup", handleCreateNewUser);
// router.post("/forgot-password", handleForgotPassword);

module.exports = router;
