const Product = require("../../models/product.model");
const Review = require("../../models/review.model");

module.exports.index = async (req, res) => {

  const productId = req.params.id
  
  const product = await Product.findOne({
    _id: productId
  })
  res.render("client/pages/review/index", {
    pageTitle: "Reviews",
    product: product
  })
}


module.exports.create = async (req, res) => {
  const productId = req.params.id
  
  const product = await Product.findOne({
    _id: productId
  })

  res.render("client/pages/review/create", {
    pageTitle: "Create Review",
    product: product
  });
}