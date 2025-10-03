const serverless = require("@vercel/node");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("../routes/auth");
const taskRoutes = require("../routes/tasks");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Simple Task Backend (Vercel)");
});
app.use("/login", authRoutes);
app.use("/tasks", taskRoutes);

module.exports = serverless(app);
