import express from "express";
import {
    deleteProduct,
    editProduct,
    getProductById,
    getAllProducts,
    addProduct,
} from "../Controllers/productController.js";
import imageHandle from "../middleware/imageHandle.js";
import verifyToken, { verifyAdmin } from "../middleware/auth.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", verifyToken, verifyAdmin, imageHandle, addProduct);
router.put("/edit/:id", verifyToken, verifyAdmin, imageHandle, editProduct);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteProduct);

export default router;
