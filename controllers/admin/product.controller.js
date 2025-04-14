const Product = require("../../models/product.model");

/**
 * [GET] /admin/products
 * @description Render the product management page
 * @param {*} req 
 * @param {*} res 
 */


module.exports.index = async (req, res) => { 
  const products = await Product.find({ deleted: false });
  console.log(products);
  res.render("admin/pages/products/index", {
     pageTitle: "Product",
     products: products});
}

module.exports.create = (req, res) => {
  res.send("Create page (new)");
}