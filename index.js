const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("MileApp Recruitment Backend");
});
app.use("/login", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Mock API running on port ${PORT}`));
