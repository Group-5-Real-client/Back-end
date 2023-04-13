import mongoose from "mongoose";
const { Schema, model } = mongoose;

const aboutUsSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
    },
    {
        collection: "aboutUs",
        timestamps: true,
    }
);

const AboutUs = model("AboutUs", aboutUsSchema);
export default AboutUs;
