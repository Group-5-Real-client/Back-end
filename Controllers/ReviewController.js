import Model from '../Models/ReviewModel.js';

// Controller function to get a rating by ID

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


// Controller function to get all ratings
export const getAll = async (req, res, next) => {
  try {
    const response = await Model.find({});
    res.status(200).send({ success: true, response });
  } catch (err) {
    return next(err);
  }
};

// Controller function to create a new rating

// ======= 1st function to add Rating ======== //

// export const addRating = async (req, res, next) => {
//   const { rating, message, user_id, product_id } = req.body;

//   try {
//     const newRating = new Model({ rating, message, user_id, product_id });
//     await newRating.save();

//     res.status(201).json({ rating: newRating });
//   } catch (err) {
//     console.error('Error creating rating:', err);
//     return next(err);
//   }
// };
//==============================
// Controller function to create a new rating
export const addRating = async (req, res, next) => {
  const { rating, message } = req.body;
  const { user_id, product_id } = req.params; // Get user ID and product ID from request params

  try {
    const newRating = new Model({ rating, message, user_id, product_id });
    await newRating.save();

    res.status(201).json({ rating: newRating });
  } catch (err) {
    console.error('Error creating rating:', err);
    return next(err);
  }
};

//===============================
        
// ==== 2nd add Rating function =====  //
// export const addRating = async (req, res, next) => {
//   const rating = new Model({
//     rating: req.body.rating,
//     message: req.body.message,
//     // product_id: product_id,
//     // user_id: user_id
//   });

//   try {
//     await rating.save();
//     res.status(200).send({ success: true });
//   } catch (err) {
//     return next(err);
//   }
// };



// Controller function to delete a rating by ID
export const deleteRating = async (req, res, next) => {
  try {
    const rating = await Model.findByIdAndDelete(req.params.id);

    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    res.status(200).json({ message: 'Rating deleted successfully' });
  } catch (err) {
    console.error('Error deleting rating by ID:', err);
    return next(err);
  }
};




// Controller function to update a rating by ID
export const updateRating = async (req, res, next) => {
  const { id } = req.params;
  const { rating, message, user_id, product_id } = req.body; // Destructure req.body to get the fields

  try {
    const response = await Model.findOneAndUpdate(
      { _id: id },
      { rating, message, user_id, product_id }, // Update the fields in the request body
      { new: true }
    );

    if (!response) {
      return res.status(404).send({ message: 'Rating not found' });
    }
    res.status(200).send({ message: 'Rating updated successfully', success: true, response });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Error updating rating' }); // Update with appropriate error response
  }
};




const Controller = {
    getAll , get , addRating , updateRating , deleteRating
}
export default Controller


