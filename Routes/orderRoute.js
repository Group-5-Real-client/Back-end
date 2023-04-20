import express from "express";
import orderController from "../Controllers/orderController.js";
import verifyToken from "../middleware/auth.js";
const router = express.Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", verifyToken, orderController.addOrder);
router.put("/edit/:id", verifyToken, orderController.editOrder);
router.delete("/delete/:id", verifyToken, orderController.deleteOrder);

export default router;
