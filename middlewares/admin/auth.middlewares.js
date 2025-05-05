const Account = require("../../models/account.model")
const systemConfig = require("../../config/system");



module.exports.requireAuth = async(req, res, next) => {
  // if no have token return to login page
  // else
    // 1. find user
    // 2. if not exist user redirect login 
    // 3. else next()
    if(!req.cookies.userLoginToken) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`)

      } else {
          const user = await Account.findOne({token: req.cookies.userLoginToken});
          
          // console.log('user', user)
          if(!user) {
              res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
          }
          else {
              next();
          }
      }
           
}

