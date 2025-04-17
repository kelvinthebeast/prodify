const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
/**
 * [GET] /admin/products
 * @description Render the product management page
 * @param {*} req 
 * @param {*} res 
 */


module.exports.index = async (req, res) => { 
  const filterStatus = filterStatusHelper(req.query);
  const find = {
    deleted: false
  }
  // Check if the user is searching for a product by status
  // If so, add the status to the find object
  if (req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  // Pagination
  const objectPagination = {
    currentPage: parseInt(req.query.page) || 1,
    limitItems: 4
  }
  objectPagination.skipItems = (objectPagination.currentPage - 1) * objectPagination.limitItems;

  const countProduct = await Product.countDocuments(find);
  const totalPage = Math.ceil(countProduct / objectPagination.limitItems);
  objectPagination.totalPage = totalPage;
  // ENd pagination
  const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skipItems).sort({ createdAt: -1 });
  res.render("admin/pages/products/index", {
     pageTitle: "Product",
     products: products,
     filterStatus: filterStatus,
     keyword: objectSearch.keyword,
     pagination: objectPagination
    });
}

module.exports.create = (req, res) => {
  res.send("Create page (new)");
}