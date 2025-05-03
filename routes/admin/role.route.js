const express = require("express");
const router = express.Router();

const roleController = require("../../controllers/admin/role.controller");


router.get("/", roleController.index);

router.get("/create", roleController.create);

router.post("/create", roleController.createPost);

module.exports = router;