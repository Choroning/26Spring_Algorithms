// ===== DOM References =====
const searchInput = document.getElementById("searchInput");
const searchIdBtn = document.getElementById("searchIdBtn");
const searchNameBtn = document.getElementById("searchNameBtn");
const findDuplicatesBtn = document.getElementById("findDuplicatesBtn");
const performanceBar = document.getElementById("performanceBar");
const algoLabel = document.getElementById("algoLabel");
const timeLabel = document.getElementById("timeLabel");
const countLabel = document.getElementById("countLabel");
const resultsGrid = document.getElementById("resultsGrid");
const loading = document.getElementById("loading");
const emptyState = document.getElementById("emptyState");

// ===== Event Listeners =====
searchIdBtn.addEventListener("click", searchById);
searchNameBtn.addEventListener("click", searchByName);
findDuplicatesBtn.addEventListener("click", findDuplicates);

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const value = searchInput.value.trim();
        if (/^\d+$/.test(value)) {
            searchById();
        } else {
            searchByName();
        }
    }
});

// ===== API Calls =====
async function searchById() {
    const id = searchInput.value.trim();
    if (!id) return;
    await fetchAndDisplay(`/search/id?id=${encodeURIComponent(id)}`);
}

async function searchByName() {
    const q = searchInput.value.trim();
    if (!q) return;
    await fetchAndDisplay(`/search/name?q=${encodeURIComponent(q)}`);
}

async function findDuplicates() {
    await fetchAndDisplay("/search/duplicates");
}

async function fetchAndDisplay(url) {
    showLoading(true);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();
        displayResults(data);
    } catch (err) {
        showLoading(false);
        resultsGrid.innerHTML = "";
        performanceBar.classList.remove("visible");
        emptyState.classList.remove("hidden");
        emptyState.querySelector("p").textContent = "Error: " + err.message;
    }
}

// ===== Display =====
function showLoading(visible) {
    loading.classList.toggle("visible", visible);
    if (visible) {
        resultsGrid.innerHTML = "";
        performanceBar.classList.remove("visible");
        emptyState.classList.add("hidden");
    }
}

function displayResults(data) {
    showLoading(false);

    // Update performance bar
    algoLabel.textContent = data.algorithm;
    timeLabel.textContent = data.elapsed_ms.toFixed(4) + " ms";
    countLabel.textContent = data.count;
    performanceBar.classList.add("visible");

    // Render product cards
    resultsGrid.innerHTML = "";

    if (data.results.length === 0) {
        emptyState.classList.remove("hidden");
        emptyState.querySelector("p").textContent = "No products found.";
        return;
    }

    emptyState.classList.add("hidden");

    data.results.forEach((product) => {
        resultsGrid.appendChild(createProductCard(product));
    });
}

function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
        <div class="card-id">ID: ${product.id}</div>
        <div class="card-name">${escapeHtml(product.name)}</div>
        <span class="card-category">${escapeHtml(product.category)}</span>
        <div class="card-price">$${product.price.toFixed(2)}</div>
    `;

    return card;
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
