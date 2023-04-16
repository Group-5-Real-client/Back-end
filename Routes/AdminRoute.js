import express from "express";
const router = express.Router();
import controller from "../Controllers/AdminController.js";
import verifyToken, { verifyAdmin, verifySuper } from "../middleware/auth.js";

router.get("/", verifyToken, verifyAdmin, verifySuper, controller.getAll);
router.get("/:id", verifyToken, verifyAdmin, verifySuper, controller.get);
router.post(
    "/register",
    verifyToken,
    verifyAdmin,
    verifySuper,
    controller.Register
);
router.post("/login", controller.login);
router.post("/logout", controller.logOut);
router.patch("/:id", verifyToken, verifyAdmin, verifySuper, controller.edit);
router.delete(
    "/:id",
    verifyToken,
    verifyAdmin,
    verifySuper,
    controller.deleteadmin
);

export default router;
