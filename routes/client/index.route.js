const productRoutes = require("./products.route");
const homeRoutes = require("./home.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const searchRoutes = require("./search.route")
const cartRoutes = require("./cart.route")
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");
const reviewRoutes = require("./review.route");

const settingMiddleware = require("../../middlewares/client/setting.middleware");
module.exports = (app) => {
  app.use(settingMiddleware.settingGeneral);
  app.use(userMiddleware.infoUser);
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartId)
  app.use("/products", productRoutes);
  app.use("/search", searchRoutes);
  app.use("/cart", cartRoutes);
  app.use("/checkout", checkoutRoutes);
  app.use("/reviews", reviewRoutes);
  app.use("/user", userRoutes);
  app.use("/", homeRoutes);

} 