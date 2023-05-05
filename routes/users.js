const express = require('express');
const router = express.Router()

router.get("/Username", (req, res) => {
  res.send("Username route");
});

router.post("/profile", (req, res) => {
  console.log(req.body);
  res.send("profile page");
});

module.exports = router;