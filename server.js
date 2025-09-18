const express = require("express");
const fs = require("fs");
const app = express();
const file = "tasks.json";

app.use(express.json());
app.use(express.static("public"));

app.get("/api/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(file));
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(file));
  tasks.push(req.body);
  fs.writeFileSync(file, JSON.stringify(tasks, null, 2));
  res.json({ ok: true });
});

app.post("/api/overwrite", (req, res) => {
  fs.writeFileSync(file, JSON.stringify(req.body, null, 2));
  res.json({ ok: true });
});

app.listen(3000, () => console.log("Server attivo su http://localhost:3000"));