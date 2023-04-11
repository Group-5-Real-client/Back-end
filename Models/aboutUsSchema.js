import mongoose from "mongoose";

const aboutUsSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const AboutUs = mongoose.model("AboutUs", aboutUsSchema);

module.exports = AboutUs;
