const textA = document.getElementById("textA");
const textB = document.getElementById("textB");
const lenA = document.getElementById("lenA");
const lenB = document.getElementById("lenB");
const btnCheck = document.getElementById("btnCheck");
const btnSample = document.getElementById("btnSample");
const btnClear = document.getElementById("btnClear");
const resultsEl = document.getElementById("results");
const similarityEl = document.getElementById("similarity");
const lcsLengthEl = document.getElementById("lcsLength");
const lcsStringEl = document.getElementById("lcsString");
const diffViewEl = document.getElementById("diffView");

function updateCounts() {
  lenA.textContent = `${textA.value.length} chars`;
  lenB.textContent = `${textB.value.length} chars`;
}

textA.addEventListener("input", updateCounts);
textB.addEventListener("input", updateCounts);

btnCheck.addEventListener("click", async () => {
  const a = textA.value;
  const b = textB.value;
  if (!a && !b) {
    alert("Please enter text in at least one document.");
    return;
  }

  const res = await fetch("/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text_a: a, text_b: b }),
  });
  const data = await res.json();

  similarityEl.textContent = `${data.similarity.toFixed(2)}%`;
  lcsLengthEl.textContent = `${data.lcs_length} / ${Math.max(data.len_a, data.len_b)}`;
  lcsStringEl.textContent = data.lcs_string || "—";

  // Build diff view
  diffViewEl.innerHTML = "";
  for (const item of data.diff) {
    const span = document.createElement("span");
    span.className = `diff-char ${item.status}`;
    // Preserve whitespace visibility
    span.textContent = item.char;
    diffViewEl.appendChild(span);
  }

  resultsEl.classList.remove("hidden");
});

btnSample.addEventListener("click", () => {
  textA.value =
    "Dynamic programming solves complex problems by breaking them into overlapping subproblems and storing results.";
  textB.value =
    "Dynamic programming tackles hard problems by splitting them into overlapping subproblems and caching results.";
  updateCounts();
});

btnClear.addEventListener("click", () => {
  textA.value = "";
  textB.value = "";
  updateCounts();
  resultsEl.classList.add("hidden");
});

updateCounts();
