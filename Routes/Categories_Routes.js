import express from 'express';
import Controller from '../Controllers/Categories_Controller.js';
import imageHandle from '../middleware/imageHandle.js'
const router = express.Router();



router.get('/',Controller.getAll)
router.get('/:id',Controller.get)
router.post("/",imageHandle, Controller.addCategories)
router.patch("/:id",Controller.updateCategories)
router.delete("/:id",Controller.deleteCategories)



export default router



// import express from "express";
// const router = express.Router();
// import CategoriesController from "../controllers/CategoriesController";

// router.get("/", CategoriesController.getAll);
// router.get("/:id", CategoriesController.get);
// router.post("/", CategoriesController.addCategories);
// router.patch("/:id", CategoriesController.updateCategories);
// router.delete("/:id", CategoriesController.deleteCategories);

// export default router;
