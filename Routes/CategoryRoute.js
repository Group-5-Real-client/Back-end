import express from "express";
import Controller from "../Controllers/CategoryController.js";
import imageHandle from "../middleware/imageHandle.js";
import verifyToken, { verifyAdmin } from "../middleware/auth.js";
const router = express.Router();

router.get("/", Controller.getAll);
router.get("/:id", Controller.get);
router.post(
    "/",
    verifyToken,
    verifyAdmin,
    imageHandle,
    Controller.addCategories
);
router.put(
    "/:id",
    verifyToken,
    verifyAdmin,
    imageHandle,
    Controller.updateCategories
);
router.delete("/:id", verifyToken, verifyAdmin, Controller.deleteCategories);

export default router;

// import express from "express";
// const router = express.Router();
// import CategoriesController from "../controllers/CategoriesController";

// router.get("/", CategoriesController.getAll);
// router.get("/:id", CategoriesController.get);
// router.post("/", CategoriesController.addCategories);
// router.patch("/:id", CategoriesController.updateCategories);
// router.delete("/:id", CategoriesController.deleteCategories);

// export default router;
