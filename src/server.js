const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 8000
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');


dbConnect();
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());


app.listen(port, ()=>{
    console.log(`App listening on port http://localhost:${port}`);
})