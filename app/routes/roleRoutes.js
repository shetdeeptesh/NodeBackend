const express = require("express");

const router = express.Router();

const {
  handleCreateNewRole,
  handleGetAllRoles,
  handleGetRolesById,
  handleUpdateRolesById,
  handleDeleteRolesById,
} = require("../controllers/roleController");

// routes starts with "localhost/user/"
router.post("/create", handleCreateNewRole);
router.get("/all", handleGetAllRoles);
router.get("/:id", handleGetRolesById);
router.patch("/:id", handleUpdateRolesById);
router.delete("/:id", handleDeleteRolesById);

module.exports = router;
