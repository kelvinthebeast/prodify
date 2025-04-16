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

  // let keyword = "";
  // if (req.query.keyword) {
  //   keyword = req.query.keyword;
  //   const regex = new RegExp(req.query.keyword, "i"); // i for case insensitive
    

  //   find.title = regex;
  // }

  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  const products = await Product.find(find);
  res.render("admin/pages/products/index", {
     pageTitle: "Product",
     products: products,
     filterStatus: filterStatus,
     keyword: objectSearch.keyword
    });
}

module.exports.create = (req, res) => {
  res.send("Create page (new)");
}