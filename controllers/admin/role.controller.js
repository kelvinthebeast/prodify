const Role = require("../../models/role.model");
 
 
 const systemConfig = require("../../config/system");
 module.exports.index = async (req, res) => {
 
    //  let find = {
    //      deleted: false
    //  }
 
    //  const records = await Role.find(find);
    //  res.render("admin/pages/roles/index", {
 
    //      pageTitle: "Danh mục quyền",
    //      records: records
 
    //  });
    res.send("OKE")
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