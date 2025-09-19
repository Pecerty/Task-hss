
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function restoreFromBackup() {
    fetch("backup.json")
        .then(res => res.json())
        .then(data => {
            tasks = data;
            saveTasks();
            location.reload();
        });
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
            <p class="\${task.completato ? 'completed' : ''}">
                <strong>\${task.titolo}</strong> - \${task.data} - \${task.priorità} 
                <br><small>Assegnato a: \${task.assegnatoA}</small>
                <br><button onclick="toggleCompletato(\${index})">✔ Fatto</button>
            </p>
        `;
        container.appendChild(div);
    });
}

function toggleCompletato(index) {
    const task = tasks[index];
    task.completato = !task.completato;
    saveTasks();
    renderTasks();
}

renderTasks();
