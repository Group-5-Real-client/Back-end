import express from 'express';
const router = express.Router();
import controller from '../Controllers/Admin_Controller.js'
import VerifyToken from '../middleware/auth.js'
router.get('/',VerifyToken,controller.getAll);
router.get('/:id',VerifyToken,controller.get);
router.post('/register',controller.post);
router.post('/login',controller.login);
router.patch('/:id',VerifyToken,controller.patch);
router.delete('/:id',VerifyToken,controller.delete);

export default router;
