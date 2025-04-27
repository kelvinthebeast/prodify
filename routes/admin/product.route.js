const express = require("express");
const router = express.Router();
const multer  = require('multer')
const multerStorage = require("../../helpers/multerStorage")
const upload = multer({ storage: multerStorage()})
const productController = require("../../controllers/admin/product.controller")
const productValidate = require("../../validates/admin/product.validate")
router.get("/", productController.index);
router.patch("/change-status/:status/:id", productController.changeStatus);
router.patch("/change-multi", productController.changeMultiStatus);

router.patch("/delete/:id", productController.deleteOneProduct);


router.get("/create", productController.getCreateProductPage)

router.post("/create", 
  upload.single("thumbnail"),
  productValidate.postCreateProductPageValidate,
  productController.postCreateProductPage)



router.get("/edit/:id", productController.updateProduct)

router.patch("/edit/:id", 
  upload.single("thumbnail"),
  // productValidate.postCreateProductPageValidate,
  productController.patchUpdateProduct)



module.exports = router;