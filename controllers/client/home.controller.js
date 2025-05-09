
// const ProductCategory = require('../../models/product-category.model')
// const createTreeHelper = require('../../helpers/createTree')
const productsHelper = require("../../helpers/product");
module.exports.index = async (req, res) => { 
  const products = await Product.find({
    deleted: false,
    featured: "1",
    status: 'active'
  }).sort({position: "desc"});

  const newProducts = productsHelper.priceNewProducts(products);
  console.log(products)
  res.render("client/pages/home/index", { pageTitle: "Home", products: newProducts });
}

module.exports.create = (req, res) => {
  res.send("Create page (new)");
}