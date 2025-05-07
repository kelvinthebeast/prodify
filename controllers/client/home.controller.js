
// const ProductCategory = require('../../models/product-category.model')
// const createTreeHelper = require('../../helpers/createTree')

module.exports.index = async (req, res) => { 
  // const productsCategory = await ProductCategory.find({
  //   deleted: false
  // })

  // const newProductsCategory = createTreeHelper.tree({productsCategory})
  res.render("client/pages/home/index", { pageTitle: "Home" });
}

module.exports.create = (req, res) => {
  res.send("Create page (new)");
}