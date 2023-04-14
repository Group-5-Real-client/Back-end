import express from "express";
import Controller from "../Controllers/User_Controller.js";
const router = express.Router();

router.post("/register", Controller.Register);
router.post("/login", Controller.login);
router.post("/logout", Controller.logOut);

export default router;
