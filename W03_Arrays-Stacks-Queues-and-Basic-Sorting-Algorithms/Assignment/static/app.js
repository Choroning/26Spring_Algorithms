// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let currentPlaylist = [];

const CRITERIA_NAMES = {
    title: "Title",
    artist: "Artist",
    duration: "Duration",
    play_count: "Play Count",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatDuration(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
}

function formatNumber(n) {
    return n.toLocaleString();
}

function showLoading(visible) {
    document.getElementById("loading-overlay").style.display = visible
        ? "flex"
        : "none";
}

function setButtonsDisabled(disabled) {
    document.querySelectorAll(".btn").forEach((b) => (b.disabled = disabled));
}

// ---------------------------------------------------------------------------
// Render playlist table
// ---------------------------------------------------------------------------
function renderPlaylist(playlist) {
    const tbody = document.querySelector("#playlist-table tbody");
    if (playlist.length === 0) {
        tbody.innerHTML =
            '<tr><td colspan="5" class="empty-msg">Generate a playlist to get started</td></tr>';
        document.getElementById("playlist-size").textContent =
            "No playlist generated";
        return;
    }

    const limit = Math.min(playlist.length, 500);
    let html = "";
    for (let i = 0; i < limit; i++) {
        const s = playlist[i];
        html += `<tr>
            <td>${i + 1}</td>
            <td>${escapeHtml(s.title)}</td>
            <td>${escapeHtml(s.artist)}</td>
            <td>${formatDuration(s.duration)}</td>
            <td>${formatNumber(s.play_count)}</td>
        </tr>`;
    }
    tbody.innerHTML = html;

    let sizeText = `${formatNumber(playlist.length)} songs`;
    if (playlist.length > limit) {
        sizeText += ` (showing first ${limit})`;
    }
    document.getElementById("playlist-size").textContent = sizeText;
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

// ---------------------------------------------------------------------------
// Display sort results
// ---------------------------------------------------------------------------
function displaySortResults(algorithm, criterion, data) {
    const NAMES = {
        selection: "Selection Sort",
        insertion: "Insertion Sort",
        merge: "Merge Sort",
        bubble: "Bubble Sort",
        quick: "Quick Sort",
        heap: "Heap Sort",
    };
    const container = document.getElementById("sort-results");
    container.style.display = "block";
    container.innerHTML = `
        <h3>Sort Results — by ${CRITERIA_NAMES[criterion] || criterion}</h3>
        <div class="metrics">
            <div class="metric">
                <span class="label">Algorithm</span>
                <span class="value" style="font-size:16px">${NAMES[algorithm] || algorithm}</span>
            </div>
            <div class="metric">
                <span class="label">Comparisons</span>
                <span class="value">${formatNumber(data.comparisons)}</span>
            </div>
            <div class="metric">
                <span class="label">Swaps / Moves</span>
                <span class="value">${formatNumber(data.swaps)}</span>
            </div>
            <div class="metric">
                <span class="label">Time</span>
                <span class="value">${data.time_ms.toFixed(4)} ms</span>
            </div>
        </div>`;
}

// ---------------------------------------------------------------------------
// Display comparison table
// ---------------------------------------------------------------------------
function displayComparisonTable(results, criterion, count) {
    const container = document.getElementById("comparison-results");
    container.style.display = "block";

    const NAMES = {
        selection: "Selection Sort",
        insertion: "Insertion Sort",
        merge: "Merge Sort",
        bubble: "Bubble Sort",
        quick: "Quick Sort",
        heap: "Heap Sort",
    };

    const entries = Object.entries(results);

    const minComp = Math.min(...entries.map(([, r]) => r.comparisons));
    const minSwap = Math.min(...entries.map(([, r]) => r.swaps));
    const minTime = Math.min(...entries.map(([, r]) => r.time_ms));

    let rows = "";
    for (const [algo, data] of entries) {
        rows += `<tr>
            <td>${NAMES[algo] || algo}</td>
            <td class="${data.comparisons === minComp ? "best" : ""}">${formatNumber(data.comparisons)}</td>
            <td class="${data.swaps === minSwap ? "best" : ""}">${formatNumber(data.swaps)}</td>
            <td class="${data.time_ms === minTime ? "best" : ""}">${data.time_ms.toFixed(4)}</td>
        </tr>`;
    }

    container.innerHTML = `
        <h3>Algorithm Comparison — ${formatNumber(count)} songs by ${CRITERIA_NAMES[criterion] || criterion}</h3>
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Algorithm</th>
                    <th>Comparisons</th>
                    <th>Swaps / Moves</th>
                    <th>Time (ms)</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>`;
}

// ---------------------------------------------------------------------------
// Clear results
// ---------------------------------------------------------------------------
function clearResults() {
    document.getElementById("sort-results").style.display = "none";
    document.getElementById("comparison-results").style.display = "none";
}

// ---------------------------------------------------------------------------
// API calls
// ---------------------------------------------------------------------------
async function generatePlaylist() {
    const count =
        parseInt(document.getElementById("playlist-count").value) || 100;
    setButtonsDisabled(true);
    showLoading(true);

    try {
        const res = await fetch("/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ count }),
        });
        const data = await res.json();
        currentPlaylist = data.playlist;
        renderPlaylist(currentPlaylist);
        clearResults();
    } catch (err) {
        alert("Failed to generate playlist: " + err.message);
    } finally {
        setButtonsDisabled(false);
        showLoading(false);
    }
}

async function sortPlaylist() {
    if (currentPlaylist.length === 0) {
        alert("Generate a playlist first!");
        return;
    }

    const algorithm = document.getElementById("algorithm-select").value;
    const criterion = document.getElementById("criterion-select").value;

    setButtonsDisabled(true);
    showLoading(true);

    try {
        const res = await fetch("/sort", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                playlist: currentPlaylist,
                algorithm,
                criterion,
            }),
        });
        const data = await res.json();
        renderPlaylist(data.sorted);
        document.getElementById("playlist-size").textContent +=
            ` — sorted by ${CRITERIA_NAMES[criterion]}`;
        displaySortResults(algorithm, criterion, data);
    } catch (err) {
        alert("Sort failed: " + err.message);
    } finally {
        setButtonsDisabled(false);
        showLoading(false);
    }
}

async function compareAll() {
    if (currentPlaylist.length === 0) {
        alert("Generate a playlist first!");
        return;
    }

    const criterion = document.getElementById("criterion-select").value;

    setButtonsDisabled(true);
    showLoading(true);

    try {
        const res = await fetch("/compare", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ playlist: currentPlaylist, criterion }),
        });
        const data = await res.json();
        displayComparisonTable(data.results, criterion, currentPlaylist.length);
    } catch (err) {
        alert("Comparison failed: " + err.message);
    } finally {
        setButtonsDisabled(false);
        showLoading(false);
    }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("btn-generate")
        .addEventListener("click", generatePlaylist);
    document
        .getElementById("btn-sort")
        .addEventListener("click", sortPlaylist);
    document
        .getElementById("btn-compare")
        .addEventListener("click", compareAll);
});
