const Cart = require("../../models/cart.model");

// module.exports.addPost = async (req, res) => {

//   const productId = req.params.productId;
//   const cartId = req.cookies.cartId;
//   const quantity = req.body.quantity || 1;

//   const cartObject = {
//     productId: productId,
//     quantity: quantity
//   }

//   // check if this product is already in the cart
//   const cart = await Cart.findOne({ _id: cartId });
//   const existProductCart = cart.products.find((item) => item.product_id == productId);


//   if (existProductCart) {

//     const newQuantity = parseInt(existProductCart.quantity) + parseInt(quantity);
//     await Cart.findOneAndUpdate(
//       { _id: cartId, "products.product_id": productId },
//       {
//         $set: {
//           "products.$.quantity": newQuantity
//         }
//       },
//       { new: true }
//     )
//   } else {
//     try {
//     await Cart.findOneAndUpdate(
//       { _id: cartId },
//       {
//         $addToSet: {
//           products: cartObject
//         }
//       },
//       { new: true }
//     )
//     req.flash("success", "Added to cart successfully~")
//     res.redirect(req.headers.referer);
//   } catch (error) {
//     req.flash("error", "Cannot updated~")
//     res.redirect("/products")
    
//   }
//   }
  
// }

module.exports.addPost = async (req, res) => {
  const productId = req.params.productId;
  const cartId = req.cookies.cartId;
  const quantity = parseInt(req.body.quantity || 1); // Ensure quantity is an integer

  const cartObject = {
    product_id: productId, // Use consistent key name
    quantity: quantity
  };

  try {
    const cart = await Cart.findOne({ _id: cartId });

    if (!cart) {
      req.flash("error", "Invalid cart.");
      return res.redirect(req.headers.referer || "/products"); // Handle invalid cartId
    }

    const existProductCart = cart.products.find((item) => item.product_id === productId); // Use strict equality

    if (existProductCart) {
      const newQuantity = parseInt(existProductCart.quantity) + quantity;
      await Cart.findOneAndUpdate(
        { _id: cartId, "products.product_id": productId },
        {
          $set: {
            "products.$.quantity": newQuantity
          }
        }
      );
      req.flash("success", "Cart updated successfully~"); // Add flash message for update
    } else {
      const updateOperation = {
        $addToSet: {
          products: cartObject // Assuming you want to avoid duplicates based on product_id
        }
        // If you want to allow duplicates, use $push instead:
        // $push: { products: cartObject }
      };
      await Cart.findOneAndUpdate(
        { _id: cartId },
        updateOperation
      );
      req.flash("success", "Added to cart successfully~");
    }
    res.redirect(req.headers.referer || "/products"); // Provide a fallback redirect
  } catch (error) {
    console.error("Error adding/updating cart:", error); // Log the error for debugging
    req.flash("error", "Failed to update cart.");
    res.redirect("/products");
  }
};