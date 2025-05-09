const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const productsHelper = require("../../helpers/products");
const productsCategoryHelper = require("../../helpers/products-category");
module.exports.index = async (req, res) => {
  const products = await Product.find({ deleted: false }).sort({ position: "desc" });
  const newProducts = productsHelper.priceNewProducts(products);
  
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
      slug: slug
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

module.exports.category = async (req, res) => {
  
  const category = await ProductCategory.findOne({
    deleted: false,
    slug: req.params.slugCategory, 
    
  })

  const listSubCategory = await productsCategoryHelper.getSubCategory(category.id);
  const listSubCategoryId = listSubCategory.map((item) => item.id);


  const products = await Product.find({
    product_category_id: { $in:  [category.id, ...listSubCategoryId] },
    deleted: false
  }).sort({ position: "desc" })

  const newProducts = productsHelper.priceNewProducts(products);

  

  res.render('client/pages/products/index', {
    pageTitle: category.title,
    products: newProducts
  })
  
}