import express from 'express';
import Controller from '../Controllers/ContactUs_Controller.js';
const router = express.Router();



router.get('/',Controller.getAll)
router.get('/:id',Controller.get)
router.post("/",Controller.post)
router.delete("/:id",Controller.delete)



export default router