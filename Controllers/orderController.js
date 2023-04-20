// import orderModel from "../Models/order.js";

// export const getAllOrders = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const allOrders = await orderModel.find()
//       .populate('product')
//       .populate('user_id')
//       .skip(startIndex)
//       .limit(limit);
//     const totalCount = await orderModel.countDocuments();

//     const pagination = {};
//     if (endIndex < totalCount) {
//       pagination.next = {
//         page: page + 1,
//         limit: limit
//       };
//     }
//     if (startIndex > 0) {
//       pagination.prev = {
//         page: page - 1,
//         limit: limit
//       };
//     }

//     res.status(200).json({ message: allOrders, pagination });
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// };

// export const getOrderById = async (req, res) => {
//   try {
//     const order = await orderModel.findById(req.params.id)
//       .populate('product')
//       .populate('user_id');
//     res.status(200).json({ message: order });
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// };

// export const addOrder = async (req, res, next) => {
//   try {
//     const newOrder = new orderModel(req.body);
//     await newOrder.save();
//     res.status(200).json("Order has been added successfully");
//   } catch (err) {
//     next(err);
//   }
// };

// export const editOrder = async (req, res) => {
//   try {
//     const updateOrder = await orderModel.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updateOrder);
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// };

// export const deleteOrder = async (req, res) => {
//   try {
//     await orderModel.findByIdAndDelete(req.params.id);
//     res.status(200).json("Order deleted successfully");
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// };
