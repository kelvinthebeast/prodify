const express = require('express');
const app = express();
const port = 6868;
const route = require("./routes/client/index.route");
require("dotenv").config();
app.use(express.static("public"));

console.log(process.env.PORT); // → 6868

// Routes
route(app);



app.set("views","./views");
app.set("view engine", "pug");



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});