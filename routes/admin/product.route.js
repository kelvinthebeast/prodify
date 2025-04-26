const express = require("express");
const router = express.Router();
const productController = require("../../controllers/admin/product.controller")
router.get("/", productController.index);
router.patch("/change-status/:status/:id", productController.changeStatus);
router.patch("/change-multi", productController.changeMultiStatus);

router.patch("/delete/:id", productController.deleteOneProduct);


router.get("/create", productController.getCreateProductPage)

router.post("/create", productController.postCreateProductPage)
module.exports = router;