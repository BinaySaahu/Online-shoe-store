const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  Products: [
    {
      ProductId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      Size:{
        type: String,
        required:true
      },
      Quantity:{
        type: Number,
        required:true
      }
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
});

const orderList = new mongoose.model("order", OrderSchema);

module.exports = orderList;
