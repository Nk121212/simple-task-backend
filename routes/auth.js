const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123") {
    return res.json({ token: "mock-jwt-token" });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

module.exports = router;
