const express = require('express');
var methodOverride = require('method-override')
const bodyParser = require('body-parser')
var flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express();
const port = 6868;
const route = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");
require("dotenv").config();
app.use(express.static(`${__dirname}/public`));
const mongoose = require("mongoose");
const database = require("./config/database");
console.log(process.env.PORT); // → 6868

// Multer upload photo
const multer  = require('multer')
const cloudinary = require("cloudinary")
const upload = multer({ dest: '.public/uploads/' })

// setup cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY, 
  api_secret: process.env.CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
});
// End cloudinary

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
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



app.set("views",`${__dirname}/views`);
app.set("view engine", "pug");





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});