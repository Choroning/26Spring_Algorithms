"""
@file    app.py
@brief   FastAPI product search server for complexity analysis lab
@author  Cheolwon Park
@date    2026-03-18
"""

import time
import random
import os

from fastapi import FastAPI, Query
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

# ---------------------------------------------------------------------------
# Product Data Generation
# ---------------------------------------------------------------------------

CATEGORIES = {
    "Electronics": (50, 2000),
    "Books": (5, 80),
    "Clothing": (10, 300),
    "Home & Kitchen": (15, 500),
    "Sports": (20, 400),
    "Food & Beverages": (3, 50),
    "Toys": (10, 150),
    "Office Supplies": (5, 100),
}

BASE_NAMES = {
    "Electronics": [
        "Laptop", "Wireless Mouse", "Bluetooth Speaker", "USB-C Hub",
        "Mechanical Keyboard", "Monitor Stand", "Webcam", "Headphones",
        "Smartwatch", "Tablet", "Power Bank", "HDMI Cable",
    ],
    "Books": [
        "Python Guide", "Algorithm Textbook", "Data Science Handbook",
        "Machine Learning Intro", "Web Development 101", "AI Ethics",
        "Database Systems", "Operating Systems", "Network Programming",
        "Computer Architecture", "Software Engineering", "Discrete Math",
    ],
    "Clothing": [
        "T-Shirt", "Hoodie", "Jeans", "Sneakers",
        "Jacket", "Cap", "Socks", "Backpack",
        "Sunglasses", "Belt", "Scarf", "Gloves",
    ],
    "Home & Kitchen": [
        "Coffee Maker", "Blender", "Toaster", "Cutting Board",
        "Frying Pan", "Knife Set", "Water Bottle", "Dish Rack",
        "Candle", "Towel Set", "Storage Box", "Apron",
    ],
    "Sports": [
        "Yoga Mat", "Dumbbell", "Running Shoes", "Jump Rope",
        "Resistance Band", "Gym Bag", "Water Bottle", "Fitness Tracker",
        "Tennis Racket", "Basketball", "Cycling Gloves", "Swim Goggles",
    ],
    "Food & Beverages": [
        "Organic Coffee", "Green Tea", "Protein Bar", "Granola",
        "Dark Chocolate", "Olive Oil", "Honey", "Trail Mix",
        "Almond Milk", "Energy Drink", "Dried Fruit", "Peanut Butter",
    ],
    "Toys": [
        "Building Blocks", "Puzzle Set", "Action Figure", "Board Game",
        "Stuffed Animal", "RC Car", "Art Kit", "Card Game",
        "Drone", "Robot Kit", "Science Kit", "Magic Set",
    ],
    "Office Supplies": [
        "Notebook", "Ballpoint Pen", "Desk Lamp", "Sticky Notes",
        "Stapler", "File Folder", "Whiteboard", "Marker Set",
        "Paper Clips", "Tape Dispenser", "Scissors", "Calculator",
    ],
}

ADJECTIVES = [
    "Premium", "Compact", "Pro", "Ultra", "Classic",
    "Deluxe", "Essential", "Advanced", "Budget", "Portable",
    "Modern", "Eco", "Smart", "Mini", "Elite",
]


def generate_products(target_count: int = 1050, duplicate_count: int = 50) -> list[dict]:
    """Generate product data with intentional duplicates."""
    random.seed(42)
    products: list[dict] = []
    product_id = 1

    # Phase 1 — generate unique products
    for category, (min_price, max_price) in CATEGORIES.items():
        names = BASE_NAMES[category]
        for base_name in names:
            for adj in ADJECTIVES:
                full_name = f"{adj} {base_name}"
                products.append({
                    "id": product_id,
                    "name": full_name,
                    "category": category,
                    "price": round(random.uniform(min_price, max_price), 2),
                })
                product_id += 1

    # Trim to target size (minus room for duplicates)
    if len(products) > target_count - duplicate_count:
        products = products[: target_count - duplicate_count]

    # Phase 2 — insert deliberate duplicates (same name, different id/price)
    for _ in range(duplicate_count):
        original = random.choice(products[: len(products) // 2])
        products.append({
            "id": product_id,
            "name": original["name"],           # same name → duplicate
            "category": original["category"],
            "price": round(original["price"] * random.uniform(0.8, 1.2), 2),
        })
        product_id += 1

    # Shuffle and reassign sequential IDs
    random.shuffle(products)
    for idx, p in enumerate(products):
        p["id"] = idx + 1

    return products


# Build data structures at startup
products_list: list[dict] = generate_products()
products_by_id: dict[int, dict] = {p["id"]: p for p in products_list}

# ---------------------------------------------------------------------------
# FastAPI Application
# ---------------------------------------------------------------------------

app = FastAPI(title="Mini Shopping Mall")


@app.get("/")
def serve_index():
    """Serve the frontend page."""
    html_path = os.path.join(os.path.dirname(__file__), "static", "index.html")
    return FileResponse(html_path)


@app.get("/search/id")
def search_by_id(id: int = Query(..., description="Product ID")):
    """O(1) lookup by product ID using dict."""
    start = time.perf_counter()
    result = products_by_id.get(id)
    elapsed_ms = (time.perf_counter() - start) * 1000

    if result:
        return {
            "results": [result],
            "elapsed_ms": round(elapsed_ms, 4),
            "algorithm": "O(1)",
            "count": 1,
        }
    return {
        "results": [],
        "elapsed_ms": round(elapsed_ms, 4),
        "algorithm": "O(1)",
        "count": 0,
    }


@app.get("/search/name")
def search_by_name(q: str = Query(..., description="Search keyword")):
    """O(n) linear scan — search products by name substring."""
    start = time.perf_counter()
    q_lower = q.lower()
    results = []
    for product in products_list:
        if q_lower in product["name"].lower():
            results.append(product)
    elapsed_ms = (time.perf_counter() - start) * 1000

    return {
        "results": results,
        "elapsed_ms": round(elapsed_ms, 4),
        "algorithm": "O(n)",
        "count": len(results),
    }


@app.get("/search/duplicates")
def find_duplicates():
    """O(n^2) duplicate detection using nested loops."""
    start = time.perf_counter()
    duplicates = []
    seen_ids: set[int] = set()
    n = len(products_list)
    comparisons = 0

    for i in range(n):
        for j in range(i + 1, n):
            comparisons += 1
            if products_list[i]["name"] == products_list[j]["name"]:
                if products_list[i]["id"] not in seen_ids:
                    duplicates.append(products_list[i])
                    seen_ids.add(products_list[i]["id"])
                if products_list[j]["id"] not in seen_ids:
                    duplicates.append(products_list[j])
                    seen_ids.add(products_list[j]["id"])

    elapsed_ms = (time.perf_counter() - start) * 1000

    return {
        "results": duplicates,
        "elapsed_ms": round(elapsed_ms, 4),
        "algorithm": "O(n\u00b2)",
        "count": len(duplicates),
        "comparisons": comparisons,
    }


# Mount static files AFTER route definitions
app.mount("/static", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "static")), name="static")

# ---------------------------------------------------------------------------
# Run with: python app.py
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
