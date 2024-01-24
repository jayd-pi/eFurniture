const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 9000;
const dotenv = require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const dbConnect = require("./config/dbConnect");

const routes = require("./routes");
const router = express.Router();

dbConnect();
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());

routes(app);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
