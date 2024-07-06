const express = require("express");

const router = express.Router();

const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
} = require("../controllers/userController");

// routes starts with "localhost/user/"
router.get("/all", handleGetAllUsers);
router.get("/:id", handleGetUserById);
router.patch("/:id", handleUpdateUserById);
router.delete("/:id", handleDeleteUserById);

module.exports = router;
