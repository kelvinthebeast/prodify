const { default: mongoose, model } = require("mongoose");

const cartSchema = new mongoose.Schema({

    title: String,
    products: [{
        product_id: String,
        quantity: Number
    }],

}, {
    timestamps: true  
})
const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;