import productController from "../Models/productModel.js";
import fs from "fs";

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
    try {
        const newProduct = new productController({
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            name: req.body.name,
            // adminUsername: req.admin.username,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ status: 404, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await productController.findByIdAndDelete(
            req.params.id
        );
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        fs.unlinkSync(`${product.image}`, (err) => {
            if (err) throw err;
            console.log(`Sucessfully deleted image ${product.image}`);
        });
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, err: err.message });
    }
};

export const editProduct = async (req, res) => {
    const { name, description, image, price } = req.body;
    try {
        let updatedProduct = await productController.findByIdAndUpdate(
            req.params.id
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (updatedProduct.image) {
            fs.unlinkSync(`${updatedProduct.image}`);
        }
        updatedProduct.name = name;
        updatedProduct.description = description;
        updatedProduct.price = price;
        updatedProduct.image = image;
        await updatedProduct.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(404).json({ status: 404, message: error.message });
    }
};
