let tasks = JSON.parse(localStorage.getItem("tasks") || "null");
const backup = [{"titolo":"Pulire cucina","assegnatoA":"Mary","data":"2025-09-19","priorità":"Alta","note":"","completato":false}];
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
  const filtered = tasks.filter(t => {
    if (currentPage === "index") return true;
    const nome = t.assegnatoA.toLowerCase();
    if (currentPage === "giovanni" || currentPage === "cristina") return nome === currentPage || nome === "vittoria";
    if (currentPage === "peppe") return nome === "peppe" || nome === "vittoria" || nome === "manutentore";
    if (currentPage === "edoardo") return nome === "edoardo" || nome === "manutentore";
    return nome === currentPage;
  });
  filtered.forEach((task, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p class="${task.completato ? "completed" : ""}">
        <strong>${task.titolo}</strong> - ${task.data} - ${task.priorità}<br>
        <em>${task.note || ""}</em><br>
        <small>Assegnato a: ${task.assegnatoA}</small><br>
        <button onclick="toggleCompletato(${i})">✔ Fatto</button>
        <button onclick="modificaTask(${i})">✏️ Modifica</button>
        <button onclick="archiviaTask(${i})">🗃️ Archivia</button>
      </p>`;
    container.appendChild(div);
  });
}
function toggleCompletato(i) {
  tasks[i].completato = !tasks[i].completato;
  saveTasks();
  renderTasks();
}
function aggiungiTask(e) {
  e.preventDefault();
  const t = document.getElementById("titolo").value;
  const d = document.getElementById("data").value;
  const p = document.getElementById("priorita").value;
  const a = document.getElementById("assegnatoA").value;
  const n = document.getElementById("note").value;
  tasks.push({ titolo: t, data: d, priorità: p, assegnatoA: a, note: n, completato: false });
  saveTasks();
  document.getElementById("task-form").reset();
  renderTasks();
}
function modificaTask(i) {
  const t = tasks[i];
  document.getElementById("titolo").value = t.titolo;
  document.getElementById("data").value = t.data;
  document.getElementById("priorita").value = t.priorità;
  document.getElementById("assegnatoA").value = t.assegnatoA;
  document.getElementById("note").value = t.note;
  tasks.splice(i, 1);
  saveTasks();
  renderTasks();
}
function archiviaTask(i) {
  const arch = JSON.parse(localStorage.getItem("archivio") || "[]");
  arch.push(tasks[i]);
  localStorage.setItem("archivio", JSON.stringify(arch));
  tasks.splice(i, 1);
  saveTasks();
  renderTasks();
}
document.addEventListener("DOMContentLoaded", () => {
  const form = document.createElement("form");
  form.id = "task-form";
  form.innerHTML = `<h3>➕ Nuovo / Modifica Task</h3>
  <input type="text" id="titolo" placeholder="Titolo" required>
  <input type="date" id="data" required>
  <select id="priorita"><option>Alta</option><option>Media</option><option>Bassa</option></select>
  <input type="text" id="note" placeholder="Note (es. ricevuta)">
  <select id="assegnatoA"><option>Mary</option><option>Giovanni</option><option>Peppe</option><option>Cristina</option><option>Edoardo</option><option>Manutentore</option><option>Vittoria</option></select>
  <button type="submit">Salva Task</button><hr>`;
  form.addEventListener("submit", aggiungiTask);
  document.body.insertBefore(form, document.body.querySelector("main"));
  renderTasks();
});
