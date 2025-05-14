const express = require("express");
const router = express.Router();
const userController = require("../../controllers/client/user.controller");

const validate = require("../../validates/client/user.validate");
// manage user at  client side
router.get("/register", userController.register);


router.post("/register", userController.registerPost);

router.get("/login", userController.login);

router.post("/login", userController.loginPost);

router.get("/logout", userController.logout);

router.get("/password/forgot", userController.forgotPassword);

router.post("/password/forgot", userController.forgotPasswordPost);


router.get("/password/otp",userController.otpPassword);


router.post("/password/otp",userController.otpPasswordPost);


router.get("/password/reset", userController.resetPassword);

router.post("/password/reset",validate.resetPasswordPost, userController.resetPasswordPost);

module.exports = router;