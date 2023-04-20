import { Schema, model } from "mongoose";

const productSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: [
            {
                type: Schema.Types.ObjectId,
                ref: "Category",
            },
        ],
        image: {
            type: String,
            required: true,
        },
        adminUsername: {
            type: String,
            required: true,
        },
    },
    {
        collection: "Products",
        timestamps: true,
    }
);
productSchema.pre(["find", "findOne"], function () {
    this.populate(["category"]);
});
const Model = model("Product", productSchema);

export default Model;
