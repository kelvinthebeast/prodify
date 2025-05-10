const productRoutes = require("./products.route");
const homeRoutes = require("./home.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const searchRoutes = require("./search.route")
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use("/products", productRoutes);
  app.use("/", homeRoutes);
  app.use("/search", searchRoutes);
  
} 