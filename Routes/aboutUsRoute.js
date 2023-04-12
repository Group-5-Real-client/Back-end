import express from "express";
const router = express.Router();
const {
    getAllAboutUs,
    getAboutUsById,
    addAboutUs,
    editAboutUs,
} = require("./aboutUsController");

// Define routes for controllers
router.get("/", getAllAboutUs);
router.get("/:id", getAboutUsById);
router.post("/", addAboutUs);
router.put("/:id", editAboutUs);

module.exports = router;
