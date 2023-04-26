import mongoose from "mongoose";
const { Schema, model } = mongoose;
import validator from "validator";

const formSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Please enter an email"],
            validate: [validator.isEmail, "Please enter a valid email"],
        },
        message: {
            type: String,
            required: true,
        },
        Date: {
            type: Date,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },

        User: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        collection: "forms",
        timestamps: true,
    }
);
formSchema.pre(["find", "findone"], function () {
    this.populate("User");
});

const form = model("form", formSchema);
export default form;
