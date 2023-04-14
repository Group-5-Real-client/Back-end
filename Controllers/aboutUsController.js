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
        console.log(req.body)
        const newPoster = new AboutUs({
          image: req.body.image,
          description: req.body.description
        });
        await newPoster.save().then((response) => {
            if (response){
            res.send({
              status: 200,
              message: "about saved successfuly",
              response,
            });}
          });
      } catch (err) {
        return res.status(403).send({ status: 403, err:err.message });
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
        aboutUs.description = description;
        aboutUs.image = image;
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
