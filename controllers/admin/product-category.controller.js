const ProductCategory = require("../../models/product-category.model");
 const systemConfig = require("../../config/system");
 // [GET] admin/products-catogory
 module.exports.index = async (req, res) => {
 
    
     let find = {
         deleted: false
     }
     const records = await ProductCategory.find(find);
 
     res.render("admin/pages/products-category/index", {
 
         pageTitle: "product category pages",
         records: records
         
     })
     
 };
 
 // [GET] admin/products-catogory/create
 module.exports.create = (req, res) => {
 
     res.render("admin/pages/products-category/create", {
         pageTitle: "Product category create pages"
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