import Model from "../Models/ReviewModel.js";

// Controller function to get a rating by ID

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Model.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get all ratings
const getAllReviewsById = async (req, res) => {
    try {
        const review = await Model.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json(review);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller function to create a new rating
const addRating = async (req, res) => {
    const { rating, message, User, Product } = req.body;
    const newRating = new Model({
        rating,
        message,
        User,
        Product,
    });

    try {
        const savedRating = await newRating.save();
        res.status(201).json(savedRating);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to delete a rating by ID
const deleteRating = async (req, res) => {
    try {
        const review = await Model.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        await review.deleteOne();
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller function to update a rating by ID
const updateRating = async (req, res) => {
    try {
        const review = await Model.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        const { rating, message, User, Product } = req.body;
        if (rating) review.rating = rating;
        if (message) review.message = message;
        if (User) review.User = User;
        if (Product) review.Product = Product;
        const savedReview = await review.save();
        res.json(savedReview);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const reviewController = {
    getAllReviewsById,
    getAllReviews,
    addRating,
    updateRating,
    deleteRating,
};
export default reviewController;
