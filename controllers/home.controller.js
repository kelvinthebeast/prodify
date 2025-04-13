module.exports.index = (req, res) => { 
  res.render("client/pages/home/index", { pageTitle: "Home" });
}

module.exports.create = (req, res) => {
  res.send("Create page (new)");
}