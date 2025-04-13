const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Products page (new)");
});

module.exports = router;