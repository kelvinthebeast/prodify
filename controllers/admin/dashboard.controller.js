const ProductCategory = require("../../models/product-category.model");
module.exports.index = (req, res) => { 
  res.render("admin/pages/dashboard/index", { pageTitle: "Dashboard" });
}

module.exports.dashboard = async (req, res) => {
    const statistic = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        account: {
            total: 0,
            inactive: 0,
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0,
        },
    };

    statistic.categoryProduct.total = await ProductCategory.countDocuments({deleted: false});
    statistic.categoryProduct.active = await ProductCategory.countDocuments({deleted: false, status: true});
    statistic.categoryProduct.inactive = await ProductCategory.countDocuments({deleted: false, status: false});
    res.render("admin/pages/dashboard/index.pug", {
        
        pageTitle: "Trang chủ",
        statistic: statistic

    });

}

module.exports.create = (req, res) => {
  res.send("Create page (new)");
}