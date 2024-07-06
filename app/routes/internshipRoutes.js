const express = require("express");

const router = express.Router();

const {
  handleGetAllInternships,
  handleGetInternshipById,
  handleDeleteInternshipById,
  handleCreateNewInternship,
  handleUpdateInternshipById,
} = require("../controllers/internshipController");

// routes starts with "localhost/company/"
router.get("/all", handleGetAllInternships);
router.post("/create", handleCreateNewInternship);
router.get("/:id", handleGetInternshipById);
router.patch("/:id", handleUpdateInternshipById);
router.delete("/:id", handleDeleteInternshipById);

module.exports = router;
