const User = require("../../models/user.model")

module.exports.infoUser = (req, res, next) => {
    if(req.cookies.userToken) {
        const user = User.findOne({
            tokenUser: req.cookies.userToken,
            deleted: false,
            status: "active"
        }).select("-password");
        if(user) {
            res.locals.user = user;
        }
    }

    next();
}