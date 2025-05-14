
module.exports.registerPost = (req, res, next)=> {
    if(!req.body.fullName) {
        req.flash('error',"Please enter your full name");
        res.redirect('back');

        return;
    }

    if(!req.body.email) {
        req.flash('error',"Please enter your email");
        res.redirect('back');
    }
    
    if(!req.body.password) {
        req.flash('error',"Please enter your password");
        res.redirect('back');
    }
    next();
}


module.exports.loginPost = (req, res, next)=> {
    
    if(!req.body.email) {
        req.flash('error',"Please enter your email");
        res.redirect('back');
        return;
    }
    
    if(!req.body.password) {
        req.flash('error',"Wrong password");
        res.redirect('back');
        return;
    }
    next();
}

module.exports.resetPasswordPost = (req, res, next) => {
    if(!req.body.password) {
      req.flash("error", 'Vui lòng nhập mật khẩu!');
      res.redirect(req.headers.referer);
      return;
    }
  
    if(!req.body.confirmPassword) {
      req.flash("error", 'Vui lòng xác nhận mật khẩu!');
      res.redirect(req.headers.referer);
      return;
    }
  
    if(req.body.password != req.body.confirmPassword) {
      req.flash("error", 'Mật khẩu không khớp!');
      res.redirect(req.headers.referer);
      return;
    }
  
    next();
  }