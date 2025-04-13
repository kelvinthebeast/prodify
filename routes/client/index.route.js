const productRoutes = require("./products.route");
const homeRoutes = require("./home.route");
module.exports = (app) => {
  app.use("/products", productRoutes);
  app.use("/", homeRoutes);
  
} 