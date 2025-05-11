const Cart = require("../../models/cart.model");

const Product = require("../../models/product.model");

const productsHelper = require("../../helpers/products");

//[get] /cart/
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({_id: cartId});

    if(cart.products.length > 0) {

        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfo = await Product.findOne({_id: productId}).select("title thumbnail slug price discountPercentage");
            

            productInfo.priceNew = productsHelper.priceNew(productInfo);

            item.productInfo = productInfo;
            item.totalPrice = productInfo.priceNew * item.quantity
        }

        cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);



    }
    // console.log(cart)
    res.render("client/pages/cart/index.pug", {
        pageTitle: "Cart Page",
        cartDetail: cart
    })
}


  
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


module.exports.delete = async (req, res) => {


  const productId = req.params.productId;
  const cartId = req.cookies.cartId;
  
    await Cart.updateOne({
      _id: cartId
    }, {
      $pull: {
        products: {
          product_id: productId
        }
      }
    })
    
    req.flash("success", "Product removed from cart successfully~");
    res.redirect(req.headers.referer || "/products");
  }
  

// [GET] /cart/update/:productId/:quantity
module.exports.update = async (req, res) => {

  const productId = req.params.productId;
  const quantity = parseInt(req.params.quantity);
  const cartId = req.cookies.cartId;

  await Cart.findOneAndUpdate(
        { _id: cartId, "products.product_id": productId },
        {
          $set: {
            "products.$.quantity": quantity
          }
        }
      );
  req.flash("success", "Cart updated quantity successfully~");
  res.redirect(req.headers.referer || "/products");
}