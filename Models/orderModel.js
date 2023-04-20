// import { Schema, model } from "mongoose";

// const orderSchema = Schema(
//   {
//     totalprice: {
//       type: Number,
//       required: true,
//     },
//     product: {
//         type: Schema.Types.ObjectId,
//         ref: 'Product',
//     },
//     user_id: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//     },
//     date: {
//         type: Date,
//         required:true,

//       },
//       status: {
//         type: string,
//         required: true,
//         enum: ['pending', 'shipped', 'delivered'],
//       default: 'pending',
//       },
//       address: {
//         type: string,
//         required: true,
//       },
//   },
//   {
//     collection: "Order",
//   }
// );
// orderSchema.pre(['find', 'findOne'], function () {
//     this.populate(['Product','User'])
// });
// const Model = model("order", orderSchema);

// export default Model;