const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");

 // [GET] admin/products-catogory
 module.exports.index = async (req, res) => {
 
    
     let find = {
         deleted: false
     }
     const records = await ProductCategory.find(find);
     const newRecords = createTreeHelper.tree(records);
     res.render("admin/pages/products-category/index", {
 
         pageTitle: "product category pages",
         records: newRecords
         
     })
     
 };
 
 // [GET] admin/products-catogory/create
 module.exports.create =async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records);
     
 
     res.render("admin/pages/products-category/create", {
        pageTitle: "Product category create pages", 
        records: newRecords
         
     }
 )}
 
 
 

 
 // POST /admin/product-category/create
module.exports.createPost = async (req, res) => {
    try {
        // If `position` is empty, set it to the current count + 1
        if (req.body.position === "" || req.body.position === undefined) {
            const count = await ProductCategory.countDocuments();
            req.body.position = count + 1; // Increment count by 1
        } else {
            // Convert `position` to a number if provided
            req.body.position = parseInt(req.body.position, 10);
            if (isNaN(req.body.position)) {
                throw new Error('Position must be a valid number');
            }
        }
        if (req.file) {
            req.body.thumbnail = `/uploads/${req.file.filename}`
          }
        const record = new ProductCategory(req.body);
        await record.save();

        // Redirect to the products-category page
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    } catch (error) {
        console.error("Error creating product category:", error);
        res.status(400).json({ error: error.message });
    }
};

// GET product-category/detail/:id
module.exports.getDetailCategory = async (req, res) => {
    const id = req.params.id;
    const category = await ProductCategory.findOne({
        deleted: false,
        _id: id
    })
    res.render("admin/pages/products-category/detail", {
        pageTitle: category.title,
        category: category
    })
}

// get getEditCategoryPage
module.exports.getEditCategoryPage = async (req, res) => {
    const id = req.params.id
    const needEditCategory = await ProductCategory.findOne({
        deleted: false,
        _id: id
    })
    res.render(`admin/pages/products-category/edit`,{
        pageTitle: needEditCategory.title,
        category: needEditCategory
    })
}

// update category
module.exports.updateCategory = async (req, res) => {
      req.body.position = parseInt(req.body.position)
      
      if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
      } 
      try {
        await ProductCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
        req.flash('success',"Update category successfully!")
        res.redirect(req.headers.referer);
        
      } catch (error) {
        req.flash("error","Update failed")
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
        
        
      }
      
      
}

// deleteCategory
module.exports.deleteCategory = async (req, res) => {
    const id = req.params.id
    try {
        await ProductCategory.updateOne({
            _id: id
        }, {
            deleted: false
        })

        req.flash("success", "Deleted category successful")
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    } catch (error) {
        console.log(error)
        req.flash("error","Update failed")
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)

    }
}