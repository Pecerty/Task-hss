let tasks = JSON.parse(localStorage.getItem("tasks") || "null");
const backup = [
  {"titolo":"Pulire cucina","assegnatoA":"Mary","data":"2025-09-19","priorità":"Alta","note":"","completato":false},
  {"titolo":"Controllare caldaia","assegnatoA":"Manutentore","data":"2025-09-20","priorità":"Media","note":"","completato":false},
  {"titolo":"Check-in ospite","assegnatoA":"Giovanni","data":"2025-09-21","priorità":"Bassa","note":"","completato":true}
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
  const filtered = tasks.filter((task) => {
    if (currentPage === "index") return true;
    const nome = task.assegnatoA.toLowerCase();
    if (currentPage === "giovanni" || currentPage === "cristina") return nome === currentPage || nome === "vittoria";
    if (currentPage === "peppe") return nome === "peppe" || nome === "vittoria" || nome === "manutentore";
    if (currentPage === "edoardo") return nome === "edoardo" || nome === "manutentore";
    return nome === currentPage;
  });

  filtered.forEach((task, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p class="${task.completato ? "completed" : ""}">
        <strong>${task.titolo}</strong> - ${task.data} - ${task.priorità}<br>
        <em>${task.note || ""}</em><br>
        <small>Assegnato a: ${task.assegnatoA}</small><br>
        <button onclick="toggleCompletato(${index})">✔ Fatto</button>
        <button onclick="modificaTask(${index})">✏️ Modifica</button>
      </p>`;
    container.appendChild(div);
  });
}

function toggleCompletato(index) {
  tasks[index].completato = !tasks[index].completato;
  saveTasks();
  renderTasks();
}

function aggiungiTask(e) {
  e.preventDefault();
  const titolo = document.getElementById("titolo").value;
  const data = document.getElementById("data").value;
  const priorità = document.getElementById("priorita").value;
  const assegnatoA = document.getElementById("assegnatoA").value;
  const note = document.getElementById("note").value;
  tasks.push({ titolo, data, priorità, assegnatoA, note, completato: false });
  saveTasks();
  document.getElementById("task-form").reset();
  renderTasks();
}

function modificaTask(index) {
  const task = tasks[index];
  document.getElementById("titolo").value = task.titolo;
  document.getElementById("data").value = task.data;
  document.getElementById("priorita").value = task.priorità;
  document.getElementById("assegnatoA").value = task.assegnatoA;
  document.getElementById("note").value = task.note;
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.createElement("form");
  form.id = "task-form";
  form.innerHTML = `
    <h3>➕ Nuovo / Modifica Task</h3>
    <input type="text" id="titolo" placeholder="Titolo" required>
    <input type="date" id="data" required>
    <select id="priorita">
      <option>Alta</option><option>Media</option><option>Bassa</option>
    </select>
    <input type="text" id="note" placeholder="Note (es. fare ricevuta)">
    <select id="assegnatoA">
      <option>Mary</option><option>Giovanni</option><option>Peppe</option>
      <option>Cristina</option><option>Edoardo</option>
      <option>Manutentore</option><option>Vittoria</option>
    </select>
    <button type="submit">Salva Task</button><hr>`;
  form.addEventListener("submit", aggiungiTask);
  document.body.insertBefore(form, document.body.querySelector("main"));
  renderTasks();
});
