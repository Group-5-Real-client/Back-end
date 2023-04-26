import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reviewSchema = new Schema(
    {
        rating: {
            type: Number,
            min: [1, "Rating must be at least 1"], // Minimum value allowed for rating
            max: [5, "Rating must be at most 5"], // Maximum value allowed for rating
            required: [true, "Rating is required"], // Required field with error message
        },
        message: {
            type: String,
            required: true,
        },
        User: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        Product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    },
    {
        timestamps: true,
        collection: "reviews",
    }
);

reviewSchema.pre(["find", "findOne"], function () {
    this.populate({ path: "User", select: "username" }).populate("Product");
});

const Review = model("Review", reviewSchema);
export default Review;
