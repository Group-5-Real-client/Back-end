import express from 'express';
import Controller from '../Controllers/ReviewController.js';
const router = express.Router();



router.get('/',Controller.getAll)
router.get('/:id',Controller.get)

// router.post("/:user_id",Controller.addRating)
router.post("/",Controller.addRating)
router.patch("/:id",Controller.updateRating)
router.delete("/:id",Controller.deleteRating)



export default router