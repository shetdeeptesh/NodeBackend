const express = require("express");

const router = express.Router();

const {
  handleGetAllCompanies,
  handleGetCompanyById,
  handleUpdateCompanyById,
  handleDeleteCompanyById,
  handleCreateNewCompany,
} = require("../controllers/companyController");

// routes starts with "localhost/company/"
router.get("/all", handleGetAllCompanies);
router.post("/create", handleCreateNewCompany);
router.get("/:id", handleGetCompanyById);
router.patch("/:id", handleUpdateCompanyById);
router.delete("/:id", handleDeleteCompanyById);

module.exports = router;
