const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
  const products = await Product.find({ deleted: false });
  const newProducts = products.map((product)=> {
    product.priceNew = (product.price * (100 - product.discountPercentage)/100).toFixed(0);
    return product;
  })
  res.render("client/pages/products/index", {
     pageTitle: "Products",
     products: newProducts
    });
}