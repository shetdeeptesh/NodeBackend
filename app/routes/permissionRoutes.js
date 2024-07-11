const express = require("express");

const router = express.Router();

const {
  handleCreateNewPermission,
  handleGetAllPermissions,
  handleGetPermissionsById,
  handleUpdatePermissionsById,
  handleDeletePermissionsById,
} = require("../controllers/permissionController");

// routes starts with "localhost/permissions/"
router.post("/create", handleCreateNewPermission);
router.get("/all", handleGetAllPermissions);
router.get("/:id", handleGetPermissionsById);
router.patch("/:id", handleUpdatePermissionsById);
router.delete("/:id", handleDeletePermissionsById);

module.exports = router;
