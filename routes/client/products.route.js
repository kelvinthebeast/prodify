const express = require("express");
const router = express.Router();
const productController = require("../../controllers/client/product.controller")
router.get("/", productController.index);


router.get("/detail/:slugProduct", productController.getDetailPage)

router.get("/:slugCategory", productController.category)
module.exports = router;