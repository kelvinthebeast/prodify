module.exports.postCreateProductPageValidate = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Please enter title!")
    res.redirect(req.headers.referer);
    return;
  } 
  // console.log("OKEE VALIDATE")
  next()
}