const Account = require("../../models/account.model")
const Role = require("../../models/role.model")
const systemConfig = require("../../config/system");



module.exports.requireAuth = async(req, res, next) => {
  // if no have token return to login page
  // else
    // 1. find user
    // 2. if not exist user redirect login 
    // 3. else next()
    // ps: give user and role became local because all route need to login to go to next step
    if(!req.cookies.userLoginToken) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`)

      } else {
          const user = await Account.findOne({token: req.cookies.userLoginToken});
          const role = await Role.findOne({_id: user.role_id}).select('title permissions')
          // console.log('user', user)
          if(!user) {
              res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
          }
          else {
              res.locals.user = user
              res.locals.role = role
              next();
          }
      }
           
}

