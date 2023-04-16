import mongoose from 'mongoose';
const {Schema, model} = mongoose;


const reviewSchema = new Schema(
    {
        
        rating: {
            type: Number,
            min: [1, 'Rating must be at least 1'], // Minimum value allowed for rating
            max: [5, 'Rating must be at most 5'], // Maximum value allowed for rating
            required: [true, 'Rating is required'], // Required field with error message
        },
        message: {
            type: String,
            required: true,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    },


    {
        timestamps: true,
        collection: "review",
    }
);

    reviewSchema.pre(["find", "findOne", "save", "create"], function () {

        this.populate(["user_id" , "product_id"]);

    });

    const Review = model('Review', reviewSchema);
    export default Review;




