const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;

  let newProducts = [];


  if (keyword) {


    const regex = new RegExp(keyword, "i");
    const products = await Product.find({
      deleted: false,
      status: 'active',
      title: regex
    })

    newProducts = products.map((item) => {
      item.priceNew = (item.price - (item.price * item.discountPercentage) / 100).toFixed(0);
      return item;
    });

    
  }
  res.render("client/pages/products/index", {
    pageTitle: "Products",
    products: newProducts,
   
  })
}