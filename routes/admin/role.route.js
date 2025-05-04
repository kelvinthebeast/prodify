const express = require("express");
const router = express.Router();

const roleController = require("../../controllers/admin/role.controller");


router.get("/", roleController.index);

router.get("/create", roleController.create);

router.post("/create", roleController.createPost);

router.get("/edit/:id", roleController.getEditPage)

router.patch("/edit/:id", roleController.updateEditPage)

router.patch("/delete/:id", roleController.deleteRole)


router.get("/permissions", roleController.getPermissions)

router.patch("/permissions", roleController.permissionsPatch);
module.exports = router;