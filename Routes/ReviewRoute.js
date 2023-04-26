import express from "express";
import reviewController from "../Controllers/ReviewController.js";
const router = express.Router();

router.get("/:id", reviewController.getAllReviewsById);
router.get("/", reviewController.getAllReviews);
router.post("/", reviewController.addRating);
router.put("/:id", reviewController.updateRating);
router.delete("/:id", reviewController.deleteRating);

export default router;
