const express = require("express");
const router = express.Router();
const multer  = require('multer');
// const upload = multer();
// const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const multerStorage = require("../../helpers/multerStorage")
const upload = multer({ storage: multerStorage()})
const validate = require("../../validates/admin/account.validate");
const accountController = require('../../controllers/admin/account.controller')


router.get("/", accountController.index);

router.get("/create", accountController.create);

router.post("/create", 
    upload.single("avatar"),
    // uploadCloud.upload,
    validate.createPost,  
    accountController.createPost);

router.get("/edit/:id",accountController.edit);

router.patch("/edit/:id",
    upload.single("avatar"),
    // uploadCloud.upload,
    validate.editPatch,
    accountController.editPatch);



router.get("/detail/:id", accountController.getDetailPage)


// xoa 

router.patch("/delete/:id", accountController.deleteAccount)

    
module.exports = router;