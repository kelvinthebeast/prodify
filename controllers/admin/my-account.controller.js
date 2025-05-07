const systemConfig = require("../../config/system");
const md5 = require("md5");
const Account = require('../../models/account.model');

// [GET] admin/my-account

module.exports.index = (req, res) => {
    res.render("admin/pages/my-account/index", {
        pageTitle: "My account"
    })
}

// [GET] admin/my-account/edit
module.exports.edit  = (req, res) => {

    res.render("admin/pages/my-account/edit", {
        pageTitle: "Edit page"
    })
}


// PATCH /admin/my-account/edit 
module.exports.editPatch = async (req, res) => {
    const id = res.locals.user.id;
    const emailExists = await Account.findOne({_id: {$ne: id}, email: req.body.email, deleted: false});
    // check email exists
    if (emailExists) {
        req.flash('error', `Email ${req.body.email} existed`);
        req.flash("error","Please enter a valid email");
    }
    else {
        if (req.body.password) {
            req.body.password = md5(req.body.password);
        } else {
            delete req.body.password;
        } // if have password return else del password
        if (req.file) {
          req.body.avatar = `/uploads/${req.file.filename}`
        }
        await Account.updateOne({ _id: id }, req.body)

        req.flash("success", "Account updated successfully");
    }

    

    res.redirect(req.headers.referer);
}