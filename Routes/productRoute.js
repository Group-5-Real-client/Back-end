import express from "express";
import {
    deleteProduct,
    editProduct,
    getProductById,
    getAllProducts,
    addProduct,
} from "../Controllers/productController.js";
import imageHandle from "../middleware/imageHandle.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", imageHandle, addProduct);
router.put("/edit/:id", imageHandle, editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
