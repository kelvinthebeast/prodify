module.exports.index = (req, res) => { 
  res.render("admin/pages/dashboard/index", { pageTitle: "Dashboard" });
}

module.exports.create = (req, res) => {
  res.send("Create page (new)");
}