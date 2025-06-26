const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const productsHelper = require("../../helpers/products");
const productsCategoryHelper = require("../../helpers/products-category");
const searchHelper = require("../../helpers/search")
module.exports.index = async (req, res) => {
  try {
    let find = {
      deleted: false,
      status: "active"
    };

    // Pagination
    const objectPagination = {
      currentPage: parseInt(req.query.page) || 1,
      limitItems: 6
    };

    // Object search
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
      find.title = objectSearch.regex;
    }

    // Đếm tổng số sản phẩm thỏa điều kiện tìm kiếm
    const countProduct = await Product.countDocuments(find);

    // Tính tổng số trang
    const totalPage = Math.ceil(countProduct / objectPagination.limitItems);
    objectPagination.totalPage = totalPage;

    // Tính số sản phẩm cần bỏ qua (skip)
    objectPagination.skipItems = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    // Lấy danh sách sản phẩm theo phân trang và điều kiện tìm kiếm
    const products = await Product.find(find)
      .sort({ position: "desc" })
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skipItems);

    // Xử lý giá sản phẩm (nếu có helper)
    const newProducts = productsHelper.priceNewProducts(products);

    // Render view
    res.render("client/pages/products/index", {
      pageTitle: "Products",
      products: newProducts,
      pagination: objectPagination,
      keyword: objectSearch.keyword,
    });
  } catch (error) {
    console.error("Error in products index:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getDetailPage = async (req, res) => {
  try {
    const slug = req.params.slugProduct;
    const product = await Product.findOne({
      deleted: false,
      status: "active",
      slug: slug
    })

    


    if (product.product_category_id) {
      const category = await ProductCategory.findOne({
        deleted: false,
        _id: product.product_category_id,
        status: "active"
      })

      product.category = category;
    }
    product.priceNew = productsHelper.priceNew(product);

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