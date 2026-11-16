# HW3 Assignment Handout — Closest Pair of Points Visualizer

[Repository Guide](../../../README.md) | [English](Assignment.md) | [한국어](Assignment.ko.md)

> **Last Updated:** 2026-11-16

This is the week 4 take-home assignment (Week 04 Assignment) of Algorithms. Its topic is divide and conquer: build a web app that compares two approaches for finding the closest pair among points in a 2D plane and visualizes the result on a canvas. It connects to the [Week 4 Lecture](../../../Lecture-Notes/Week04_Divide-and-Conquer-Algorithms/Concepts_Lecture.md).

- **Weight:** 1% of the total grade
- **Deadline:** Monday before the next theory class, 11:59 PM
- **Submission:** Submit the source code (`.zip`) and the report (`.pdf`) to the LMS

> **Caution:** The LMS may experience issues near the deadline. Submit by **Sunday** at the latest to avoid problems. Late submissions due to system errors **will not be excused**, and meeting the deadline is the student's responsibility.

---

<br>

## Problem. Closest Pair of Points Web App

Build a **closest pair of points** web app that compares the **brute force** approach with the **divide and conquer** algorithm and visualizes the result on a 2D canvas.

- **Backend:** Python (FastAPI or Flask)
- **Frontend:** HTML, CSS, JavaScript (Canvas)

### 1. Closest Pair Algorithms

Implement **two approaches** to find the closest pair among n points in a 2D plane:

| Approach | Method | Complexity |
|:-----|:-----|:-----|
| Brute Force | Check all n(n−1)/2 pairs | O(n²) |
| Divide and Conquer | Split by x-coordinate, recurse, check the strip | O(n log² n) |

*Table 1. The two approaches to implement*

**D&C strategy:**

1. Sort the points by x-coordinate.
2. Split them into LEFT and RIGHT halves.
3. Recursively find the closest pair in each half, and call that distance d.
4. Check the strip (the points within distance d of the dividing line).
5. Return the overall closest pair.

### 2. Web Interface

- Provide a **"Generate Random"** button to scatter n random points (the user chooses n).
- Clicking **"Find Closest Pair"** runs both algorithms.
- Display on a **2D canvas**:
  - all points plotted as dots, and
  - the **closest pair** highlighted and connected with a line.
- Show the **execution time** of both brute force and D&C, plus the **speedup ratio**.

### 3. API Endpoints

| Method | Endpoint | Description |
|:-----|:-----|:-----|
| `POST` | `/closest-pair` | Find the closest pair using both methods and return the results and timing |
| `POST` | `/generate` | Generate n random 2D points |
| `GET` | `/` | Serve the frontend page |

*Table 2. The API endpoints to implement*

---

<br>

## Deliverables

### 1. Source Code (`.zip`)

```text
week04_assignment/
├── app.py              # Backend
├── static/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── requirements.txt
```

*Figure 1. Directory layout of the source code to submit*

### 2. Report (`.pdf` only, max 2 pages, font size 11pt+)

- A **screenshot** of the web app showing the closest pair highlighted on the canvas
- A **performance table** comparing brute force and D&C at point counts 100, 1,000, and 5,000
- **Analysis:** Explain how the divide and conquer approach reduces the problem from O(n²) to O(n log² n). Why is checking only the strip sufficient?

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
