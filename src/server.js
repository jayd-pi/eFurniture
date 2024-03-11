const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 9000;
const dotenv = require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const dbConnect = require("./config/dbConnect");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const ui = require("./routes");
const couponRouter = require("./routes/couponRoutes");

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", "src/views");

dbConnect();
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/coupon", couponRouter);
app.use("/", ui);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
