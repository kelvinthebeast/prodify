const Role = require("../../models/role.model");
 
 
 const systemConfig = require("../../config/system");
 module.exports.index = async (req, res) => {
 
     let find = {
         deleted: false
     }
 
     const records = await Role.find(find);
     res.render("admin/pages/roles/index", {
 
         pageTitle: "Danh mục quyền",
         records: records
 
     });
    // res.send("OKE")
 }
 
 
 // GET admin/pages/roles/create
 
 
 module.exports.create = async (req, res) => {
 
     
     res.render("admin/pages/roles/create", {
 
         pageTitle: "Create roles",
      
 
     });
 }
 
 // Post admin/pages/roles/create
 module.exports.createPost = async (req, res) => {
 
    
    
 
     const record = new Role(req.body);
 
     await record.save();
 
     res.redirect(`${systemConfig.prefixAdmin}/roles`);
 }

// edit page role
module.exports.getEditPage = async (req, res) => {


    const id = req.params.id
    const roleRecord = await Role.findOne({_id: id, deleted: false})

    res.render("admin/pages/roles/edit", {
        data: roleRecord,
        pageTitle: roleRecord.title
    })
}

// [PATCH] update role /admin/roles/edit/:id 

module.exports.updateEditPage = async (req, res) => {
    
    const id = req.params.id
    try {
        await Role.updateOne(
            {
                _id: id
            },req.body
        )
        req.flash("success", "Update role(s) successfully")
        res.redirect("/admin/roles")
    } catch (error) {
        req.flash("error", 'Update failed')
        res.redirect("/admin/roles")
        
        
    }
}


/**
 * delete roles
 * [PATCH] /admin/roles/delete/:id
 * 
 */

module.exports.deleteRole = async (req, res) => {
    const id = req.params.id
    try {
        await Role.updateOne(
            {
                _id: id
            }, { deleted: true, deletedAt: new Date() }
        )
        req.flash("success", "Delete role(s) successfully")
        res.redirect("/admin/roles")
    } catch (error) {
        req.flash("error", 'Delete failed')
        res.redirect("/admin/roles")
        
        
    }

}