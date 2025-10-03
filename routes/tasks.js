const express = require("express");
const router = express.Router();
let tasks = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
];

router.get("/", (req, res) => {
  let result = [...tasks];
  if (req.query.completed)
    result = result.filter(
      (t) => t.completed.toString() === req.query.completed
    );
  if (req.query.sort === "asc") result.sort((a, b) => a.id - b.id);
  if (req.query.sort === "desc") result.sort((a, b) => b.id - a.id);

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);

  res.json({
    meta: { total: result.length, page, limit },
    data: paginated,
  });
});

router.post("/", (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const task = tasks.find((t) => t.id == req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  Object.assign(task, req.body);
  res.json(task);
});

router.delete("/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  tasks.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
