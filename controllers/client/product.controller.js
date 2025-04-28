const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
  const products = await Product.find({ deleted: false }).sort({ position: "desc" });
  const newProducts = products.map((product)=> {
    product.priceNew = (product.price * (100 - product.discountPercentage)/100).toFixed(0);
    return product;
  })
  res.render("client/pages/products/index", {
     pageTitle: "Products",
     products: newProducts
    });
}

module.exports.getDetailPage = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.findOne({
      deleted: false,
      status: "active",
      // slug: slug
    })

    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product
    })
  } catch (error) {
    req.flash("error", "Cannot updated~")
    res.redirect("/products")
  }
}