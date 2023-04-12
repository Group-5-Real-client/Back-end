import express from "express";
import aboutUsControllers from "../Controllers/aboutUsController.js";
const router = express.Router();

router.get("/", aboutUsControllers.getAllAboutUs);
router.get("/:id", aboutUsControllers.getAboutUsById);
router.post("/", aboutUsControllers.addAboutUs);
router.put("/:id", aboutUsControllers.editAboutUs);

export default router;
