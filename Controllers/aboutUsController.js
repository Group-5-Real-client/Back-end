import AboutUs from "../Models/aboutUsSchema.js";
import fs from "fs";

// GET all aboutUs
const getAllAboutUs = async (req, res) => {
    try {
        const aboutUs = await AboutUs.find();
        res.json(aboutUs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, err: err.message });
    }
};

// GET aboutUs by id
const getAboutUsById = async (req, res) => {
    try {
        const aboutUs = await AboutUs.findById(req.params.id);
        if (!aboutUs) {
            return res.status(404).json({ message: "About Us not found" });
        }
        res.json(aboutUs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, err: err.message });
    }
};

// ADD aboutUs
const addAboutUs = async (req, res) => {
    try {
        const newPoster = new AboutUs({
            image: req.body.image,
            description: req.body.description,
            adminUsername: req.admin.username,
        });
        await newPoster.save().then((response) => {
            if (response) {
                res.send({
                    status: 200,
                    message: "about saved successfuly",
                    response,
                });
            }
        });
    } catch (err) {
        return res.status(500).send({ status: 500, err: err.message });
    }
};

// EDIT aboutUs
const editAboutUs = async (req, res) => {
    const { description, image } = req.body;
    try {
        let aboutUs = await AboutUs.findById(req.params.id);
        if (!aboutUs) {
            return res.status(404).json({ message: "About Us not found" });
        }
        if (aboutUs.image) {
            fs.unlinkSync(`${aboutUs.image}`);
        }
        aboutUs.description = description;
        aboutUs.image = image;
        await aboutUs.save();
        res.json(aboutUs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, err: err.message });
    }
};

// DELETE aboutUs
const deleteAboutUs = async (req, res) => {
    try {
        const aboutUs = await AboutUs.findByIdAndDelete(req.params.id);
        if (!aboutUs) {
            return res.status(404).json({ message: "About Us not found" });
        }
        fs.unlinkSync(`${aboutUs.image}`, (err) => {
            if (err) throw err;
            console.log(`Successfully deleted image ${aboutUs.image}`);
        });
        res.json({ message: "About Us deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, err: err.message });
    }
};

const aboutUsControllers = {
    getAllAboutUs,
    getAboutUsById,
    addAboutUs,
    editAboutUs,
    deleteAboutUs,
};
export default aboutUsControllers;
