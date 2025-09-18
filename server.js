const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const TASKS_FILE = './tasks.json';

function readTasks() {
    if (!fs.existsSync(TASKS_FILE)) return [];
    return JSON.parse(fs.readFileSync(TASKS_FILE));
}

function writeTasks(tasks) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

app.get('/api/tasks', (req, res) => {
    res.json(readTasks());
});

app.post('/api/tasks', (req, res) => {
    const tasks = readTasks();
    tasks.push(req.body);
    writeTasks(tasks);
    res.json({ success: true });
});

app.delete('/api/tasks/:id', (req, res) => {
    let tasks = readTasks();
    tasks = tasks.filter(t => t.id !== req.params.id);
    writeTasks(tasks);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});