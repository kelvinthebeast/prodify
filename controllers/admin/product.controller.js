const Product = require("../../models/product.model");

/**
 * [GET] /admin/products
 * @description Render the product management page
 * @param {*} req 
 * @param {*} res 
 */


module.exports.index = async (req, res) => { 

  const filterStatus =  [
    {
      name: "All",
      status:"",
      class: "",

    }, {
      name:"Active",
      status:"active",
      class: "",
    },
    {
      name: "Inactive",
      status: "inactive",
      class: "",
    }
  ]

  if (req.query.status) {
    const statusIndexOfObject = filterStatus.findIndex((item)=> item.status == req.query.status)
    filterStatus[statusIndexOfObject].class = "active";
  } else {
    const statusIndexOfObject = filterStatus.findIndex((item)=> item.status == "")
    filterStatus[statusIndexOfObject].class = "active";
  }
  const find = {
    deleted: false
  }
  // Check if the user is searching for a product by status
  // If so, add the status to the find object
  if (req.query.status) {
    find.status = req.query.status;
  }

  let keyword = "";
  if (req.query.keyword) {
    keyword = req.query.keyword;
    const regex = new RegExp(req.query.keyword, "i"); // i for case insensitive
    

    find.title = regex;
  }

  
  const products = await Product.find(find);
  res.render("admin/pages/products/index", {
     pageTitle: "Product",
     products: products,
     filterStatus: filterStatus,
     keyword: keyword
    });
}

module.exports.create = (req, res) => {
  res.send("Create page (new)");
}