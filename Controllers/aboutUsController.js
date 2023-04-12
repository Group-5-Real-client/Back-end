import AboutUs from "../Models/aboutUsSchema.js";

// GET all aboutUs
const getAllAboutUs = async (req, res) => {
    try {
        const aboutUs = await AboutUs.find();
        res.json(aboutUs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
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
        res.status(500).json({ message: "Server Error" });
    }
};

// ADD aboutUs
const addAboutUs = async (req, res) => {
    try {
        const { description } = req.body;

        const addNewAboutUs = await AboutUs.create({
            description,
        });

        if (!addNewAboutUs) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).send({
            success: true,
            message: "Add Successfully",
            data: addNewAboutUs,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};

// EDIT aboutUs
const editAboutUs = async (req, res) => {
    const { description, file } = req.body;
    try {
        let aboutUs = await AboutUs.findById(req.params.id);
        if (!aboutUs) {
            return res.status(404).json({ message: "About Us not found" });
        }
        aboutUs.description = description;
        aboutUs.file = file;
        await aboutUs.save();
        res.json(aboutUs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

const aboutUsControllers = {
    getAllAboutUs,
    getAboutUsById,
    addAboutUs,
    editAboutUs,
};
export default aboutUsControllers;
