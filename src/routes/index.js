const userRouter = require("./userRoutes");
const productRouter = require("./productRoutes");
const reviewsRouter = require("./reviewRoters");
const transactionRouter = require("./transactionRoutes");

function route(app) {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/review", reviewsRouter);
  app.use("/api/v1/transaction", transactionRouter);
}

module.exports = route;
