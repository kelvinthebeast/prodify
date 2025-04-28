const express = require("express");
const router = express.Router();
const productController = require("../../controllers/client/product.controller")
router.get("/", productController.index);


router.get("/:slug", productController.getDetailPage)
module.exports = router;