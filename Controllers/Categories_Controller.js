import Model from '../Models/Categories_Models.js';
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();



// get all the categories
export const getAll = async (req, res, next) => {
  try {
    const response = await Model.find({});
    res.status(200).send({ success: true, response });
  } catch (err) {
    return next(err);
  }
};


// get a category by id
export const get = async (req, res, next) => {
  let id = req.params.id;
  try {
    const response = await Model.find({ _id: id });
    res.status(200).send({success: true, response ,
      imagePath: `http://localhost:${process.env.PORT}/uploads/${response.image}`, 
    
    });
    if (!response) {
      res.status(404).send({ message: "not found" });
    }
  } catch (err) {
    return next(err);
  }
};



// create a new category
export const addCategories = async (req, res, next) => {
  const form = new Model({
    name: req.body.name,
    description: req.body.description,
    image: req.file.image,
  });

    img.save((err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
  });
  try {
    await form.validate();
    await form.save();
    res.status(200).send({ success: true });
  } catch (err) {
    return next(err);
  }
};

// update a category by _id
export const updateCategories = async (req, res, next) => {
  let { id } = req.params;
  let { name , description} = req.body;
  // let body = {name , description};
  try {
    const response = await Model.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    if (!response) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.status(200).send({ message: 'Category updated successfully', success: true, response });
  } catch (err) {
    console.log(err);
  }
};

// delete a category by id
export const deleteCategories = async (req, res, next) => {
  let id = req.params.id;
  try {
    const response = await Model.findOneAndDelete({ _id: id });
    
    fs.unlinkSync(`uploads/${response.image}`, (err) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });

    if (!response) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.status(200).send({ message: 'Category deleted successfully' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const Controller = {
    getAll , get , addCategories , updateCategories , deleteCategories
}

export default Controller