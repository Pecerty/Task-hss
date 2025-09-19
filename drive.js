
// Simulazione backup su Google Drive
function backupToDrive() {
  const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tasks_backup.json";
  a.click();
  URL.revokeObjectURL(url);
  alert("Backup salvato come file .json (simulazione Drive).");
}
