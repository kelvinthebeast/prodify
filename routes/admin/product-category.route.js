const express = require("express");
const multer  = require('multer');

const multerStorage = require("../../helpers/multerStorage")
const upload = multer({ storage: multerStorage()})
const validate = require("../../validates/admin/product-category.validate");
 

 
const router = express.Router();
const productCategoryController = require("../../controllers/admin/product-category.controller");

router.get(`/`, productCategoryController.index);
router.get(`/create`, productCategoryController.create);
router.post(
    "/create",
    upload.single("thumbnail"),
    // uploadCloud.upload,
    validate.createPost,
    productCategoryController.createPost
);

module.exports = router;