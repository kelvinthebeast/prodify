const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const systemConfig = require("../../config/system")
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
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

  // sort
  let sort = {}
  if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;


  } else {
    // default
      sort.position = "desc";
  }
  // End sort
  // ENd pagination
  const products = await Product.find(find)
                                .limit(objectPagination.limitItems)
                                .skip(objectPagination.skipItems)
                                .sort(sort);
  res.render("admin/pages/products/index", {
    pageTitle: "Product",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
}
/**
 * [PATCH] /admin/products/change-status/:status/:id
 * @description Change the status of a product when click
 * @param {*} req 
 * @param {*} res 
 */
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Change status successfully!");
  res.redirect(req.headers.referer);


}

/**
 * [PATCH] /admin/products/change-multi
 * @description Change the status of multiple products when click
 * @param {*} req 
 * @param {*} res 
 */
module.exports.changeMultiStatus = async (req, res) => {
  // console.log("changeMultiStatus: ", req.body);
  const type = req.body.type;
  const ids = req.body.ids.split(",").map(id => id.trim());

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Change ${ids.length} status(s) successfully!`);
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `Change ${ids.length} status(s) successfully!`);
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } }, {
        deleted: true,
        deletedAt: new Date()
      });
      req.flash("success", `Delete ${ids.length} status(s) successfully!`);
      break;
    case "change-position":
      // console.log("change-position: ", req.body.ids); // id-position
      for (const item of ids) {
        // console.log("item: ", item.split("-")); // id-position
        const [id, position] = item.split("-");
        let positionNumber = parseInt(position);


        await Product.updateOne({ _id: id }, { position: positionNumber });
        req.flash("success", `Change position ${ids.length} status(s) successfully!`);
      }


      break;
    default:
      break;
  }
  res.redirect(req.headers.referer);

}
/**
 * [Patch] or [Delete] /admin/products/delete_?method=patch
 * when click button delete it gets id and update field deleted: true (soft delete)
 * @param {*} req 
 * @param {*} res 
 */
module.exports.deleteOneProduct = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, {
    deleted: true,
    deletedAt: new Date()
  });
  req.flash("success", `delete product successfully!`);
  res.redirect(req.headers.referer);

}
/**
 * @description create new product 
 * [Get] /admin/products/create
 * @param {*} req 
 * @param {*} res 
 */

module.exports.getCreateProductPage =  async (req, res) => {
  let find = {
    deleted: false
  }

  const category = await ProductCategory.find(find)
  const newCategory = createTreeHelper.tree(category)
  res.render("admin/pages/products/create", {
    category: newCategory
  })

}
/**
 * @description handle when post data from form to server
 * add new product using `new Product(req.body)`
 * @param {*} req 
 * @param {*} res 
 * [post] /admin/products/create
 */

module.exports.postCreateProductPage = async (req, res) => {

  
  
  req.body.price = parseInt(req.body.price) || 0
  req.body.discountPercentage = parseInt(req.body.discountPercentage) || 0

  req.body.stock = parseInt(req.body.stock) || 0

  if (!req.body.position) {
    const countPosition = await Product.countDocuments();
    req.body.position = countPosition + 1;
    
  } else {
    req.body.position = parseInt(req.body.position)
  }
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`
  }

  const newProduct = new Product(req.body);
  await newProduct.save()
  req.flash("success", "Add product successfully!")
  res.redirect(`${systemConfig.prefixAdmin}/products`)
  // console.log(req.body)
 
}
// [GET] /admin/products/edit/:id
module.exports.updateProduct = async (req, res) => {
  const id = req.params.id
  const product = await Product.findOne({
    deleted: false,
    _id: id
  })
  const categories = await ProductCategory.find({  deleted: false })
  
  const newCategories = createTreeHelper.tree(categories)
  
  res.render("admin/pages/products/edit", {
    product: product,
    category: newCategories
  })
  
}

module.exports.patchUpdateProduct = async (req, res) => {
  if (!req.body.title || req.body.title.trim() === '') {
    req.flash("error", "Please provide a title!");
    return res.redirect(`${systemConfig.prefixAdmin}/products/create`);
}
  req.body.price = parseInt(req.body.price) || 0
  req.body.discountPercentage = parseInt(req.body.discountPercentage) || 0

  req.body.stock = parseInt(req.body.stock) || 0

 
  req.body.position = parseInt(req.body.position)
  
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  } 
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    req.flash('success',"Update product successfully!")
    res.redirect(req.headers.referer);
    
  } catch (error) {
    req.flash("error","Update failed")
    res.redirect(`${systemConfig.prefixAdmin}/products`)
    
    
  }
  
  
  
}
/**
 * [Get] /admin/products/detail/:id
 * @param {*} req 
 * @param {*} res 
 */
module.exports.getDetailPage = async (req, res) => {
  const id = req.params.id;
  console.log(id, "id")
  const product = await Product.findOne({
    deleted: false,
    _id: id
  })
  
  
  res.render("admin/pages/products/detail",{
    pageTitle: product.title,
    product: product
  })
}
