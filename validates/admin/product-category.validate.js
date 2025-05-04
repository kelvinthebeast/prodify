module.exports.createPost = (req, res, next)=> {
  if(!req.body.title) {
      req.flash('error',"Please enter title of product");
      res.redirect('back');
      return;
  }
  next();
}