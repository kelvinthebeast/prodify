
const User = require("../../models/user.model")
const md5 = require("md5");
const generateHelper = require("../../helpers/generate");
const ForgotPassword = require("../../models/forgot-password.model");
module.exports.register = async (req, res) => {


  res.render("client/pages/user/register", {
    pageTitle: "Register"
    
  })


}

module.exports.registerPost = async (req, res) => {

  
  const existEmail = await User.findOne({ email: req.body.email});

  // if have email make warning
  // else create new user
  if (existEmail) {
    req.flash("error", "Email already exists");
    return res.redirect("/user/register");
  }
  const newUser = new User(req.body);
  newUser.password = md5(req.body.password);
  await newUser.save();

  res.cookie("userToken", newUser.tokenUser);
  req.flash("success", "Register successfully");
  
  res.redirect("/");
}


// [get] /user/login 
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Login"
  })
}

// [post] /user/login

module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false
  })

  if (!user) {
    req.flash("error", "Email not existing");
    res.redirect(`/user/login`)
    return
  }
  if (md5(password) != user.password) {
    req.flash("error", "Wrong password!!!!");
    res.redirect(`/user/login`);
    return;
  }

  if (user.status == "inactive") {
    req.flash("error", "Your account is blocked")
  }

  res.cookie("userToken", user.tokenUser) 
  res.redirect(`/`)

}

// / [get] /user/logout
module.exports.logout = async (req, res) => {

  res.clearCookie('userToken')
  res.redirect("/user/login")
}



// / [get] /user/password/forgot 
module.exports.forgotPassword = (req, res) => {

    res.render("client/pages/forgot-password/forgot-password.pug", {
        pageTitle: "Quên mật khẩu"
    });
};


// / [post] /user/password/forgot

module.exports.forgotPasswordPost = async (req, res) => {

  const email = req.body.email;
  const user = await User.findOne({
    email: email,
    deleted: false
  })

  if (!user) {
    req.flash("error", "Email not existing");
    res.redirect(`/user/password/forgot`)
    return;
  }
  const otp = generateHelper.generateRandomString(8);
  const objectForgotPassword = {
    email: email, 
    otp: otp,
    expiredAt: Date.now()

  }

  const newForgotPassword = new ForgotPassword(objectForgotPassword);
  await newForgotPassword.save();
  console.log(newForgotPassword);
  res.send("OKE FORGOT PASSWORDS");

}