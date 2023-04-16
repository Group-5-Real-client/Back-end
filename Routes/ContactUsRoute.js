import express from "express";
import Controller from "../Controllers/ContactUsController.js";
import verifyToken, { verifyAdmin } from "../middleware/auth.js";
const router = express.Router();

router.get("/", Controller.getAll);
router.get("/:id", Controller.get);
router.post("/", verifyToken, Controller.post);
router.delete("/:id", verifyToken, verifyAdmin, Controller.deleteform);

export default router;
