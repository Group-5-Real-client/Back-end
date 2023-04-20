import productController from "../Models/productModel.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await productController.find().populate("category");
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ status: 404, message: error.message });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productController
            .findById(id)
            .populate("category");
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ status: 404, message: error.message });
    }
};

export const addProduct = async (req, res) => {
    const product = req.body;
    const newProduct = new productController(product);
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ status: 404, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await productController.findByIdAndRemove(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(404).json({ status: 404, message: error.message });
    }
};

export const editProduct = async (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    try {
        await productController.findByIdAndUpdate(id, updatedProduct, {
            new: true,
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(404).json({ status: 404, message: error.message });
    }
};
