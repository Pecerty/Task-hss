
let tasks = JSON.parse(localStorage.getItem("tasks") || "null");
const backup = [
  {
    "titolo": "Pulire cucina",
    "assegnatoA": "Mary",
    "data": "2025-09-19",
    "priorit\u00e0": "Alta",
    "completato": false
  },
  {
    "titolo": "Controllare caldaia",
    "assegnatoA": "Manutentore",
    "data": "2025-09-20",
    "priorit\u00e0": "Media",
    "completato": false
  },
  {
    "titolo": "Check-in ospite",
    "assegnatoA": "Giovanni",
    "data": "2025-09-21",
    "priorit\u00e0": "Bassa",
    "completato": true
  },
  {
    "titolo": "Colazione Mafalda",
    "assegnatoA": "Cristina",
    "data": "2025-09-22",
    "priorit\u00e0": "Alta",
    "completato": false
  },
  {
    "titolo": "Riordinare documenti",
    "assegnatoA": "Vittoria",
    "data": "2025-09-23",
    "priorit\u00e0": "Media",
    "completato": false
  }
];

if (!tasks) {
    tasks = backup;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function restoreFromBackup() {
    tasks = backup;
    saveTasks();
    location.reload();
}

function renderTasks() {
    const container = document.getElementById("task-list");
    container.innerHTML = "";
    const filtered = tasks.filter(task => {
        if (currentPage === "index") return true;
        const nome = task.assegnatoA.toLowerCase();
        if (currentPage === "giovanni" || currentPage === "cristina") {
            return nome === currentPage || nome === "vittoria";
        }
        if (currentPage === "peppe") {
            return nome === "peppe" || nome === "vittoria" || nome === "manutentore";
        }
        if (currentPage === "edoardo") {
            return nome === "edoardo" || nome === "manutentore";
        }
        return nome === currentPage;
    });

    filtered.forEach((task, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p class="${task.completato ? 'completed' : ''}">
                <strong>${task.titolo}</strong> - ${task.data} - ${task.priorità}
                <br><small>Assegnato a: ${task.assegnatoA}</small>
                <br><button onclick="toggleCompletato(${index})">✔ Fatto</button>
            </p>
        `;
        container.appendChild(div);
    });
}

function toggleCompletato(index) {
    tasks[index].completato = !tasks[index].completato;
    saveTasks();
    renderTasks();
}

renderTasks();
