const btnAdd = document.getElementById("btnAdd");
const btnGenerate = document.getElementById("btnGenerate");
const btnSchedule = document.getElementById("btnSchedule");
const btnClear = document.getElementById("btnClear");
const summaryEl = document.getElementById("summary");
const timelineEl = document.getElementById("timeline");
const traceSection = document.getElementById("traceSection");
const traceBody = document.querySelector("#traceTable tbody");

let activities = [];

// ---------- Helpers ----------

function refreshTimeline(selectedNames) {
  selectedNames = selectedNames || [];
  timelineEl.innerHTML = "";

  if (activities.length === 0) return;

  const minStart = 8;
  const maxEnd = 24;
  const range = maxEnd - minStart;

  // Sort by start for display
  const sorted = [...activities].sort((a, b) => a.start - b.start || a.end - b.end);

  for (const act of sorted) {
    const row = document.createElement("div");
    row.className = "timeline-row";

    const bar = document.createElement("div");
    const leftPct = ((act.start - minStart) / range) * 100;
    const widthPct = ((act.end - act.start) / range) * 100;
    bar.className =
      "timeline-bar " + (selectedNames.includes(act.name) ? "selected" : "rejected");
    bar.style.left = leftPct + "%";
    bar.style.width = Math.max(widthPct, 2) + "%";
    bar.textContent = `${act.name} [${act.start}-${act.end}]`;

    row.appendChild(bar);
    timelineEl.appendChild(row);
  }

  // Axis
  const axis = document.createElement("div");
  axis.className = "timeline-axis";
  const steps = Math.min(range, 12);
  for (let i = 0; i <= steps; i++) {
    const span = document.createElement("span");
    span.textContent = Math.round(minStart + (range * i) / steps);
    axis.appendChild(span);
  }
  timelineEl.appendChild(axis);
}

function updateButtons() {
  btnSchedule.disabled = activities.length === 0;
}

// ---------- Add ----------

btnAdd.addEventListener("click", () => {
  const name = document.getElementById("eventName").value.trim() || `Event_${activities.length + 1}`;
  const start = parseInt(document.getElementById("eventStart").value, 10);
  const end = parseInt(document.getElementById("eventEnd").value, 10);
  if (isNaN(start) || isNaN(end) || end <= start) {
    alert("Enter valid start / end times (end > start).");
    return;
  }
  activities.push({ name, start, end });
  document.getElementById("eventName").value = "";
  document.getElementById("eventStart").value = "";
  document.getElementById("eventEnd").value = "";
  refreshTimeline();
  traceSection.classList.add("hidden");
  summaryEl.textContent = `${activities.length} event(s) added`;
  updateButtons();
});

// ---------- Generate ----------

btnGenerate.addEventListener("click", async () => {
  const n = parseInt(document.getElementById("numEvents").value, 10) || 15;
  const res = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  });
  const data = await res.json();
  activities = data.activities;
  refreshTimeline();
  traceSection.classList.add("hidden");
  summaryEl.textContent = `${activities.length} event(s) generated`;
  updateButtons();
});

// ---------- Schedule ----------

btnSchedule.addEventListener("click", async () => {
  if (activities.length === 0) return;

  const res = await fetch("/schedule", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ activities }),
  });
  const data = await res.json();

  const selectedNames = data.selected.map((a) => a.name);
  refreshTimeline(selectedNames);

  summaryEl.textContent = `Selected ${data.selected_count} / ${data.total} events`;

  // Build trace table
  traceBody.innerHTML = "";
  data.trace.forEach((t, i) => {
    const tr = document.createElement("tr");
    tr.className = t.action === "select" ? "row-select" : "row-reject";
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${t.activity.name}</td>
      <td>[${t.activity.start}, ${t.activity.end})</td>
      <td><strong>${t.action.toUpperCase()}</strong></td>
      <td>${t.reason}</td>
    `;
    traceBody.appendChild(tr);
  });
  traceSection.classList.remove("hidden");
});

// ---------- Clear ----------

btnClear.addEventListener("click", () => {
  activities = [];
  refreshTimeline();
  traceSection.classList.add("hidden");
  summaryEl.textContent = "";
  updateButtons();
});
