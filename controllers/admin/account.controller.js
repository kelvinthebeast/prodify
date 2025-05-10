const Account = require('../../models/account.model');
const Role = require('../../models/role.model');

const systemConfig = require("../../config/system");
const md5 = require('md5');
// [GET] Admin/accounts
module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }

    const records = await Account.find(find).select("-password -token");
    
    // for (const record of records) {
    //     const role = await Role.findOne({
    //         _id: record.role_id,
    //         deleted: false
    //     });
    //     record.role = role; 

    // }
    await Promise.all(records.map(async record => {
      const role = await Role.findOne({ _id: record.role_id, deleted: false });
      record.role = role;
  }));
    res.render("admin/pages/accounts/index", {

        pageTitle: "account list",
        records: records

    });
}
// [GET] admin/accounts/create
module.exports.create = async (req, res) => {

    let find = {
        deleted: false
    }

    const roles = await Role.find(find);
    res.render("admin/pages/accounts/create", {

        pageTitle: "Create account",
        roles: roles

    });
}


// [POST] accounts/create 
module.exports.createPost = async (req, res) => { 
  // check email exist
  const emailExists = await Account.findOne({ email: req.body.email, deleted: false });
  // check email
  if (emailExists) {
      req.flash('error', `Email ${req.body.email} existed`);
      return res.redirect('/admin/accounts/create');
  } else {
      req.body.password = md5(req.body.password);
      // Gắn tên file ảnh vào req.body.avatar
      if (req.file) {
        req.body.avatar = `/uploads/${req.file.filename}`;
      }

      
      const record = new Account(req.body);
      await record.save();
      res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }

}


// [GET] admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
 
  let find = {
      _id: req.params.id,
      deleted: false
  }
  try {
      const data = await Account.findOne(find)
      const roles = await Role.find({ deleted: false });
      res.render("admin/pages/accounts/edit", {

          pageTitle: "Edit account",
          roles: roles,
          data: data
      });
  } catch (error) {
    console.log(error)
    req.flash("error", "Can not updated")
    res.redirect('/admin/accounts')
  }


}

// [PATCH] admin/accounts/edit/:id 
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;                        // tìm tất cả trừ id này
  const emailExists = await Account.findOne({_id: {$ne: id}, email: req.body.email, deleted: false});
  // check email
  if (emailExists) {
      req.flash('error', `Email ${req.body.email} đã tồn tại`);
      req.flash("error","Please enter a valid email");
  }
  else {
      if (req.body.password) {
          req.body.password = md5(req.body.password);
      } else {
          delete req.body.password;
      } // if have password return else del password


      if (req.file) {
        req.body.avatar = `/uploads/${req.file.filename}`;
      }
      await Account.updateOne({ _id: id }, req.body)

      req.flash("success", "Password updated successfully");
  }


  res.redirect('/admin/accounts');
}

// Get /accounts/detail/:id
module.exports.getDetailPage = async (req, res) => {

  const id = req.params.id

  try {
    const account = await Account.findOne({_id: id, deleted: false})
    const role = await Role.findOne({_id: account.role_id})
    account.role = role
    res.render("admin/pages/accounts/detail", {
      pageTitle: account.fullName,
      account: account,
      
    })
  } catch (error) {
    console.log(error)
    req.flash("error", 'Can not access this page')
    res.redirect("/admin/accounts")
  }

  
}


module.exports.deleteAccount = async (req, res) => {
  const id = req.params.id
  const account = await Account.findOne({_id: id, deleted: false})
  const role = await Role.findOne({_id: account.role_id})
  account.role = role
  try {
    await Account.updateOne({_id: id}, {deleted: true})
    req.flash("success", 'Delete account successfully!')
    res.redirect(req.headers.referer)
  } catch (error) {
    req.flash("error", 'Delete account failed!')
    res.redirect(req.headers.referer)
  }


}