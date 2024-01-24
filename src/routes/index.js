const userRouter = require("./userRoutes");
const productRouter = require("./productRoutes");
const reviewsRouter = require("./reviewRoters");

function route(app) {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/review", reviewsRouter);
}

module.exports = route;
