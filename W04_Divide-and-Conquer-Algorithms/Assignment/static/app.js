const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btnGenerate = document.getElementById("btnGenerate");
const btnFind = document.getElementById("btnFind");
const numInput = document.getElementById("numPoints");
const resultsDiv = document.getElementById("results");

let points = [];

// ---------- Drawing helpers ----------

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPoints(pts) {
  ctx.fillStyle = "#4a90d9";
  for (const [x, y] of pts) {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawClosestPair(pair) {
  const [p1, p2] = pair;

  // Line
  ctx.strokeStyle = "#e05d44";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(p1[0], p1[1]);
  ctx.lineTo(p2[0], p2[1]);
  ctx.stroke();

  // Highlighted points
  ctx.fillStyle = "#e05d44";
  for (const p of pair) {
    ctx.beginPath();
    ctx.arc(p[0], p[1], 6, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ---------- API calls ----------

async function generatePoints() {
  const n = parseInt(numInput.value, 10) || 50;
  const res = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  });
  const data = await res.json();
  points = data.points;

  clearCanvas();
  drawPoints(points);
  btnFind.disabled = false;
  resultsDiv.classList.add("hidden");
}

async function findClosestPair() {
  if (points.length < 2) return;

  btnFind.disabled = true;
  btnGenerate.disabled = true;

  const res = await fetch("/closest-pair", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ points }),
  });
  const data = await res.json();

  // Redraw
  clearCanvas();
  drawPoints(points);
  drawClosestPair(data.dc.pair);

  // Show results
  document.getElementById("bfDist").textContent = data.bruteforce.distance.toFixed(4);
  document.getElementById("bfTime").textContent = data.bruteforce.time_ms.toFixed(4);
  document.getElementById("dcDist").textContent = data.dc.distance.toFixed(4);
  document.getElementById("dcTime").textContent = data.dc.time_ms.toFixed(4);
  document.getElementById("speedup").textContent = data.speedup + "x";
  resultsDiv.classList.remove("hidden");

  btnFind.disabled = false;
  btnGenerate.disabled = false;
}

// ---------- Events ----------

btnGenerate.addEventListener("click", generatePoints);
btnFind.addEventListener("click", findClosestPair);
