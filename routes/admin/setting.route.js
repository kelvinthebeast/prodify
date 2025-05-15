const express = require("express");
const router = express.Router();
const multer = require("multer");



const multerStorage = require("../../helpers/multerStorage")
const upload = multer({ storage: multerStorage()})
const controller = require("../../controllers/admin/setting.controller");
router.get("/general", controller.general);
router.patch(
    "/general",
    upload.single("logo"),
    // uploadCloud.upload,
    controller.generalPatch
);

module.exports = router;