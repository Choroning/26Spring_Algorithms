# HW2 Assignment Handout — Music Playlist Manager

[Repository Guide](../../../README.md) | [English](Assignment.md) | [한국어](Assignment.ko.md)

> **Last Updated:** 2026-11-16

This is the week 3 take-home assignment (Week 03 Assignment) of Algorithms. Its topic is sorting algorithms: build a music playlist manager web app that sorts songs by various criteria using several sorting algorithms, and compare sorting performance as the playlist grows. It connects to the [Week 3 Lecture](../../../Lecture-Notes/Week03_Arrays-Stacks-Queues-and-Basic-Sorting-Algorithms/Concepts_Lecture.md).

- **Weight:** 1% of the total grade
- **Deadline:** Monday before the next theory class, 11:59 PM
- **Submission:** Submit the source code (`.zip`) and the report (`.pdf`) to the LMS

> **Caution:** The LMS may experience issues near the deadline. Submit by **Sunday** at the latest to avoid problems. Late submissions due to system errors **will not be excused**, and meeting the deadline is the student's responsibility.

---

<br>

## Problem. Music Playlist Manager Web App

Build a **music playlist manager** web app that sorts songs by various criteria using different sorting algorithms. Compare sorting performance as the playlist grows.

- **Backend:** Python (FastAPI or Flask)
- **Frontend:** HTML, CSS, JavaScript

### 1. Sorting Algorithms

Implement at least **3 sorting algorithms**:

| Algorithm | Worst case |
|:-----|:-----|
| Selection Sort | O(n²) |
| Insertion Sort | O(n²) |
| Merge Sort | O(n log n) |

*Table 1. The three sorting algorithms to implement at minimum*

Each must sort a playlist by a user-chosen criterion: **title**, **artist**, **duration**, or **play count**.

### 2. Web Interface

- Display a **playlist table** with title, artist, duration, and play count.
- Provide a **"Generate Random"** button to create a playlist of N songs.
- Provide **dropdowns** to select the sort criterion and the sort algorithm.
- The **"Sort"** button shows the sorted result, comparisons, swaps, and execution time.
- The **"Compare All"** button runs all algorithms and shows a comparison table.

### 3. API Endpoints

| Method | Endpoint | Description |
|:-----|:-----|:-----|
| `POST` | `/sort` | Sort the playlist with the chosen algorithm and criterion |
| `POST` | `/compare` | Run all algorithms and return comparison data |
| `POST` | `/generate` | Generate a random playlist of N songs |
| `GET` | `/` | Serve the frontend page |

*Table 2. The API endpoints to implement*

---

<br>

## Deliverables

### 1. Source Code (`.zip`)

```text
week03_assignment/
├── app.py              # Backend
├── static/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── requirements.txt
```

*Figure 1. Directory layout of the source code to submit*

### 2. Report (`.pdf` only, max 2 pages, font size 11pt+)

- A **screenshot** of the playlist manager with sorting results
- A **comparison table** for N = 100, 1000, 5000 (comparisons, swaps, and time per algorithm)
- **Analysis:** Which algorithm was fastest? Why? When would O(n²) algorithms still be acceptable?

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
