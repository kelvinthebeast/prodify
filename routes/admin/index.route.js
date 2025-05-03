const systemConfig = require("../../config/system")
const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./role.route");
// const dashboardController = require("../../controllers/admin/dashboard.controller")
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  
  app.use(PATH_ADMIN+`/dashboard`, dashboardRoutes);
  app.use(PATH_ADMIN+`/products`, productRoutes);
  app.use(PATH_ADMIN + `/products-category`, productCategoryRoutes)
  app.use(PATH_ADMIN + `/roles`, roleRoutes)
  
} 