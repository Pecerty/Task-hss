let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
function saveTasks() { localStorage.setItem("tasks", JSON.stringify(tasks)); }
function restoreFromBackup() { location.reload(); }
function renderTasks() {
  const container = document.getElementById("task-list");
  container.innerHTML = "";
  tasks.forEach((t, i) => {
    if (currentPage === "index" || t.assegnatoA.toLowerCase() === currentPage || 
       (currentPage === "giovanni" && t.assegnatoA === "Vittoria") ||
       (currentPage === "cristina" && t.assegnatoA === "Vittoria") ||
       (currentPage === "peppe" && (t.assegnatoA === "Vittoria" || t.assegnatoA === "Manutentore")) ||
       (currentPage === "edoardo" && t.assegnatoA === "Manutentore")) {
      const div = document.createElement("div");
      div.innerHTML = `<p class="${t.completato ? 'completed' : ''}">
        <strong>${t.titolo}</strong> - ${t.data} - ${t.priorità}<br>
        <em>${t.note}</em><br>
        <small>${t.assegnatoA}</small><br>
        <button onclick="complete(${i})">✔</button>
        <button onclick="edit(${i})">✏️</button>
        <button onclick="archive(${i})">🗃️</button></p>`;
      container.appendChild(div);
    }
  });
}
function complete(i) { tasks[i].completato = !tasks[i].completato; saveTasks(); renderTasks(); }
function edit(i) {
  const t = tasks[i];
  document.getElementById("titolo").value = t.titolo;
  document.getElementById("data").value = t.data;
  document.getElementById("priorita").value = t.priorità;
  document.getElementById("assegnatoA").value = t.assegnatoA;
  document.getElementById("note").value = t.note;
  tasks.splice(i, 1); saveTasks(); renderTasks();
}
function archive(i) {
  let a = JSON.parse(localStorage.getItem("archivio") || "[]");
  a.push(tasks[i]);
  localStorage.setItem("archivio", JSON.stringify(a));
  tasks.splice(i, 1); saveTasks(); renderTasks();
}
document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("task-form")) {
    const form = document.createElement("form");
    form.id = "task-form";
    form.innerHTML = `
      <input id="titolo" placeholder="Titolo" required>
      <input type="date" id="data">
      <select id="priorita"><option>Alta</option><option>Media</option><option>Bassa</option></select>
      <input id="note" placeholder="Note">
      <select id="assegnatoA"><option>Mary</option><option>Giovanni</option><option>Peppe</option><option>Cristina</option><option>Edoardo</option><option>Manutentore</option><option>Vittoria</option></select>
      <button type="submit">Salva</button><hr>`;
    form.onsubmit = e => {
      e.preventDefault();
      tasks.push({ titolo: titolo.value, data: data.value, priorità: priorita.value, note: note.value, assegnatoA: assegnatoA.value, completato: false });
      saveTasks(); form.reset(); renderTasks();
    };
    document.body.insertBefore(form, document.body.querySelector("main"));
  }
  renderTasks();
});
