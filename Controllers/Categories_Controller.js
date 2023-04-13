import Model from '../Models/Categories_Models.js';

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
    res.status(200).send({ success: true, response });
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
    "name": req.body.name,
    "description": req.body.description
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
  const { id } = req.params;
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