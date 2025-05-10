
const productsHelper = require("../../helpers/products");
const Product = require("../../models/product.model")
module.exports.index = async (req, res) => {

  const products = await Product.find({
    deleted: false,
    featured: "1",
    status: 'active'
  })

  const productsHaveNewPrice = productsHelper.priceNewProducts(products);


  const latestProducts = await Product.find({
    deleted: false,
    status: 'active'
  }).sort({ position: 'desc' }).limit(4);
  // console.log("productHaveNewPrice" , productsHaveNewPrice);
  res.render('client/pages/home/index', {
    pageTitle: "Home",
    products: productsHaveNewPrice,
    latestProducts: latestProducts
  })
}

module.exports.create = (req, res) => {
  res.send("Create page (new)");
}