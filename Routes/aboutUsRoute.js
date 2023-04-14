import express from "express";
import aboutUsControllers from "../Controllers/aboutUsController.js";
import imageHandle from "../middleware/imageHandle.js";
const router = express.Router();

router.get("/", aboutUsControllers.getAllAboutUs);
router.get("/:id", aboutUsControllers.getAboutUsById);
router.post("/", imageHandle, aboutUsControllers.addAboutUs);
router.put("/:id", aboutUsControllers.editAboutUs);
router.delete("/:id", aboutUsControllers.deleteAboutUs);

export default router;
