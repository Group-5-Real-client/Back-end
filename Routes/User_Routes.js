import express from 'express';
import Controller from '../Controllers/User_Controller.js';
const router = express.Router();


router.post('/register',Controller.post)
router.post('/login',Controller.login)


export default router;