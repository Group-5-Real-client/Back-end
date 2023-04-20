import express from "express";
import orderController from "../Controllers/orderController.js";
const router = express.Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.addOrder);
router.put("/edit/:id", orderController.editOrder);
router.delete("/delete/:id", orderController.deleteOrder);

export default router;
