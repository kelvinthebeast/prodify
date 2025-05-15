const User = require("../../models/user.model");
module.exports.requireAuth = async (req, res, next) => {

    if (!req.cookies.userToken) {
        res.redirect(`/`)
    } else {
        const user = await User.findOne({ tokenUser: req.cookies.userToken }).select("-password");
        // console.log(user)
        if (!user) {
            res.redirect(`/`)
        }
        else {

            res.locals.user = user;

            next();
        }
    }

}