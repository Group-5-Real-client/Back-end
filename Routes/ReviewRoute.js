import express from "express";
import reviewController from "../Controllers/ReviewController.js";
import verifyToken, { verifyAdmin } from "../middleware/auth.js";
const router = express.Router();

router.get("/:id", reviewController.getAllReviewsById);
router.get("/", reviewController.getAllReviews);
router.post("/", verifyToken, reviewController.addRating);
router.put("/:id", verifyToken, reviewController.updateRating);
router.delete("/:id", verifyToken, verifyAdmin, reviewController.deleteRating);

export default router;
