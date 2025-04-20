const express = require('express');
var methodOverride = require('method-override')
const bodyParser = require('body-parser')
const app = express();
const port = 6868;
const route = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");
require("dotenv").config();
app.use(express.static("public"));
const mongoose = require("mongoose");
const database = require("./config/database");
console.log(process.env.PORT); // → 6868


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
const systemConfig = require("./config/system");
// Connect database

database.connectDb();
// Routes
route(app);
adminRoute(app);

// locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;



app.set("views","./views");
app.set("view engine", "pug");



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});