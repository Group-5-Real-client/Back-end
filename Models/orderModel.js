import { Schema, model } from "mongoose";

const orderSchema = Schema(
    {
        totalprice: {
            type: Number,
            required: true,
        },
        Product: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        User: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["pending", "shipped", "delivered"],
            default: "pending",
        },
        address: {
            type: String,
            required: true,
        },
    },
    {
        collection: "Orders",
        timestamps: true,
    }
);

orderSchema.pre(["find", "findOne"], function () {
    this.populate(["Product", "User"]);
});

const Model = model("order", orderSchema);

export default Model;
