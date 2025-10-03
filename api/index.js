const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("../routes/auth");
const taskRoutes = require("../routes/tasks");

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Vue dev server
  "https://simple-task-frontend-zeta.vercel.app", // ganti dengan domain deploy Vue kamu
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // untuk request non-browser (Postman, curl, dll)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Simple Task Backend (Vercel)");
});

app.use("/login", authRoutes);
app.use("/tasks", taskRoutes);

// ✅ ekspor langsung Express app, bukan server listen()
module.exports = app;
