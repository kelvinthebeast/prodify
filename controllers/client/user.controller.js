
const User = require("../../models/user.model")
const md5 = require("md5");
const generateHelper = require("../../helpers/generate");
const ForgotPassword = require("../../models/forgot-password.model");

const sendMailHelper = require("../../helpers/sendMail");
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
  const otp = generateHelper.generateRandomNumber(6);
  const objectForgotPassword = {
    email: email, 
    otp: otp,
    expiresAt: Date.now()

  }

  const newForgotPassword = new ForgotPassword(objectForgotPassword);
  await newForgotPassword.save();
  // console.log(newForgotPassword);

  // exist email, send otp through mail
  const subject = "Xác nhận mã OTP";
  const html = `
  <h2>Xin chào ${user.fullName}</h2>
  <p>Đây là mã OTP của bạn: ${otp}</p>
  <p>Vui lòng không chia sẻ mã OTP này với bất kỳ ai khác.</p>
  <p>Thời gian hiệu lực của mã OTP là 5 phút.</p>`

  await sendMailHelper.sendMail(email, subject, html);
  req.flash("success", "Mã OTP đã được gửi đến email của bạn");
  res.redirect(`/user/password/otp?email=${email}`);

}


// [get] /user/password/otp 
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;

    res.render("client/pages/user/otp-password", {
        pageTitle: "Xác nhận mã OTP",
        email: email
    })
}


// [post] /user/password/otp 
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;


    const result = await ForgotPassword.findOne({ email: email, otp: otp });



    if (!result) {
        req.flash("error", "OTP wrong!");
        return res.redirect(`/user/password/otp?email=${email}`);
    }

    // add token user
    const user = await User.findOne({email: email});


    res.cookie("userToken", user.tokenUser); 
    // vì sao có bước này, vì khi qua bước đổi mật khẩu ngta có thể sẽ f12 và 
    // sửa email khác lúc đó email đó bị sửa mk thì sao, nên là lấy tokenUser cái duy nhất trên máy check là an toàn nhất
    res.redirect("/user/password/reset");
}



module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password.pug", {
        pageTitle: "Đặt lại mật khẩu"
    });
}

// [post] /user/password/reset 
module.exports.resetPasswordPost = async (req, res) => {

    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const tokenUser = req.cookies.tokenUser;

    await User.updateOne({tokenUser: tokenUser}, {
        password: md5(password)
    })
    req.flash("success","Resset password successfully");
    res.redirect("/");
  
}