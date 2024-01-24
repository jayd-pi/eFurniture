const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 9000
const dotenv = require('dotenv').config();
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const dbConnect = require('./config/dbConnect');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');

dbConnect.connectdbConnect;
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

app.use(notFound);
app.use(errorHandler);
app.listen(port, ()=>{
    console.log(`App listening on port http://localhost:${port}`);
})