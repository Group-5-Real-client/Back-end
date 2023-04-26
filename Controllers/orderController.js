import Order from "../Models/orderModel.js";

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        console.log(orders);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new order
const addOrder = async (req, res) => {
    const { totalprice, Product, User, date, status, address } = req.body;
    const newOrder = new Order({
        totalprice,
        Product,
        User,
        date,
        status,
        address,
    });

    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Edit an order
const editOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        const { totalprice, Product, User, date, status, address } = req.body;
        if (totalprice) order.totalprice = totalprice;
        if (Product) order.Product = Product;
        if (User) order.User = User;
        if (date) order.date = date;
        if (status) order.status = status;
        if (address) order.address = address;
        const savedOrder = await order.save();
        res.json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        await order.deleteOne();
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const orderController = {
    getAllOrders,
    getOrderById,
    addOrder,
    editOrder,
    deleteOrder,
};
export default orderController;
