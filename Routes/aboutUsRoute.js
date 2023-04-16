import express from "express";
import aboutUsControllers from "../Controllers/aboutUsController.js";
import imageHandle from "../middleware/imageHandle.js";
import verifyToken, { verifyAdmin } from "../middleware/auth.js";
const router = express.Router();

router.get("/", aboutUsControllers.getAllAboutUs);
router.get("/:id", aboutUsControllers.getAboutUsById);
router.post(
    "/",
    verifyToken,
    verifyAdmin,
    imageHandle,
    aboutUsControllers.addAboutUs
);
router.put(
    "/:id",
    verifyToken,
    verifyAdmin,
    imageHandle,
    aboutUsControllers.editAboutUs
);
router.delete(
    "/:id",
    verifyToken,
    verifyAdmin,
    aboutUsControllers.deleteAboutUs
);

export default router;
