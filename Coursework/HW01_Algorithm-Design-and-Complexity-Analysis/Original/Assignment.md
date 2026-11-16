# HW1 Assignment Handout — Mini Shopping Mall Product Search

[Repository Guide](../../../README.md) | [English](Assignment.md) | [한국어](Assignment.ko.md)

> **Last Updated:** 2026-11-16

This is the week 2 take-home assignment (Week 02 Assignment) of Algorithms. Its topic is algorithm complexity analysis: build a mini shopping mall web app where users can search for products, and compare the performance of search methods with different time complexities. It connects to the [Week 2 Lecture](../../../Lecture-Notes/Week02_Algorithm-Design-and-Complexity-Analysis/Concepts_Lecture.md).

- **Weight:** 1% of the total grade
- **Deadline:** Monday before the next theory class, 11:59 PM
- **Submission:** Submit the source code (`.zip`) and the report (`.pdf`) to the LMS

> **Caution:** The LMS may experience issues near the deadline. Submit by **Sunday** at the latest to avoid problems. Late submissions due to system errors **will not be excused**, and meeting the deadline is the student's responsibility.

---

<br>

## Problem. Mini Shopping Mall Product Search Web App

Build a **mini shopping mall** web app where users can search for products. Implement three different search approaches and compare their performance, then use **Locust** to see how algorithm choice affects the service under real user load.

- **Backend:** Python (FastAPI or Flask)
- **Frontend:** HTML, CSS, JavaScript
- **Load testing:** Locust

### 1. Product Data and Search Algorithms

Load a product list (1,000+ items with id, name, category, price) and implement **3 search methods**:

| Search method | How it works | Complexity |
|:-----|:-----|:-----|
| ID Lookup | `dict[product_id]` | O(1) |
| Name Search | Scan all products sequentially | O(n) |
| Duplicate Detection | Find products with the same name (nested loops) | O(n²) |

*Table 1. The three search methods to implement*

### 2. Web Interface

- Provide a **search bar** to search products by name or ID.
- Provide a **"Find Duplicates"** button to detect duplicate product names.
- Display results as a **product card list** with name, price, and category.
- Show the **execution time** (ms) of each search.

### 3. API Endpoints

| Method | Endpoint | Description |
|:-----|:-----|:-----|
| `GET` | `/search/id?id=123` | O(1) lookup by product ID |
| `GET` | `/search/name?q=keyword` | O(n) linear name search |
| `GET` | `/search/duplicates` | O(n²) duplicate detection |
| `GET` | `/` | Serve the frontend page |

*Table 2. The API endpoints to implement*

### 4. Load Testing with Locust

Write a `locustfile.py` that simulates concurrent users calling each search endpoint.

```python
from locust import HttpUser, task

class ShopUser(HttpUser):
    @task
    def search_by_id(self):
        self.client.get("/search/id?id=42")

    @task
    def search_by_name(self):
        self.client.get("/search/name?q=laptop")

    @task
    def find_duplicates(self):
        self.client.get("/search/duplicates")
```

Run it with `locust -f locustfile.py --host=http://localhost:8000`.

### 5. What to Observe in the Load Test

Open the Locust web UI at `http://localhost:8089`.

- Start with **10 users** and ramp up to **50 users**.
- Observe the **response time** and **throughput** of each endpoint.

As concurrent users increase, the following changes appear.

- The O(1) ID lookup stays fast and stable.
- The O(n) name search slows slightly.
- **The O(n²) duplicate detection shows response time spikes, and requests queue up.**

> **Key Point:** This is why algorithm choice matters in real web services.

---

<br>

## Deliverables

### 1. Source Code (`.zip`)

```text
week02_assignment/
├── app.py              # Backend (FastAPI or Flask)
├── locustfile.py       # Locust load test
├── static/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── requirements.txt    # Include locust
```

*Figure 1. Directory layout of the source code to submit*

### 2. Report (`.pdf` only, max 2 pages, font size 11pt+)

- A **screenshot** of the shopping mall search results
- **Locust results:** response time charts for 10, 30, and 50 concurrent users
- **Analysis:** Why does O(n²) degrade under load? Relate it to Big-O and its real-world impact.

---

<br>

## Grading Criteria

| Criterion | Weight |
|:-----|-----:|
| The web app runs and works correctly | 20% |
| The algorithm requirements are fully implemented | 40% |
| Report (2 pages max, font size 11+) | 40% |

*Table 3. Grading criteria and weights*

> **Caution:** Assignment content may appear on **written exams**. If there is a significant discrepancy between your assignment results and your exam performance, a **grade penalty** may apply.

Submit to the LMS before the deadline.

---

<br>

After working on the assignment yourself, see the [assignment explanation](../Assignment-Explanation.md) for the solution and results and the [code walkthrough](../Code-Walkthrough.md) for the complete code.
