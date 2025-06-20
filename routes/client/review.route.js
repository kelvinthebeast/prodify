const express = require("express");
const router = express.Router();
const reviewController = require("../../controllers/client/review.controller")
router.get("/:id", reviewController.index);


router.get("/:id/create", reviewController.create);



module.exports = router;