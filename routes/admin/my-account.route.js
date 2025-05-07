const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/my-account.controller");
const multer  = require('multer');

const multerStorage = require("../../helpers/multerStorage")
const upload = multer({ storage: multerStorage()})
router.get("/", controller.index);


router.get("/edit", controller.edit);


router.patch("/edit",
    upload.single("avatar"),
    // uploadCloud.upload,
    controller.editPatch);

module.exports = router;