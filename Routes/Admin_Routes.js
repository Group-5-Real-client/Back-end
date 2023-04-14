import express from "express";
const router = express.Router();
import controller from "../Controllers/Admin_Controller.js";
import VerifyToken from "../middleware/auth.js";
router.get("/", VerifyToken, controller.getAll);
router.get("/:id", VerifyToken, controller.get);
router.post("/register", VerifyToken, controller.Register);
router.post("/login", controller.login);
router.post("/logout", controller.logOut);
router.patch("/:id", VerifyToken, controller.edit);
router.delete("/:id", VerifyToken, controller.deleteadmin);

export default router;
