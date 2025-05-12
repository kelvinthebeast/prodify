const productRoutes = require("./products.route");
const homeRoutes = require("./home.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const searchRoutes = require("./search.route")
const cartRoutes = require("./cart.route")
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");

module.exports = (app) => {
  app.use(userMiddleware.infoUser);
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartId)
  app.use("/products", productRoutes);
  app.use("/", homeRoutes);
  app.use("/search", searchRoutes);
  app.use("/cart", cartRoutes);
  app.use("/checkout", checkoutRoutes);

  app.use("/user", userRoutes);
} 