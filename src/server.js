const express = require('express');


const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 9000
const dotenv = require('dotenv').config();
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const dbConnect = require('./config/dbConnect');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cookieSession = require("cookie-session");
const expressSession = require("express-session");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const serverHttps = require ('http-server')
const cors = require("cors");
const session = require('express-session')
const redis   = require("redis");
const client  = redis.createClient();



dbConnect();
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.set('trust proxy', 1);



app.use(
  cookieSession({ name: "session", keys: ["eFurniture"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`App listening on port http://localhost:${port}`);
})
