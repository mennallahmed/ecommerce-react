const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
  { 
    userId: {type: String, required: true},
    products: [
      {
        productId: {type: String},
        quantity: {type: Number, default: 1}
      }
    ],

  },
  {timestamps: true} //create createdAt and updatedAt 
);

module.exports = mongoose.model("Cart", CartSchema);