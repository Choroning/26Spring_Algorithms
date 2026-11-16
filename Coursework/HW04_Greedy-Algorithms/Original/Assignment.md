# HW4 Assignment Handout — Classroom Reservation System

[Repository Guide](../../../README.md) | [English](Assignment.md) | [한국어](Assignment.ko.md)

> **Last Updated:** 2026-11-16

This is the week 5 take-home assignment (Week 05 Assignment) of Algorithms. Its topic is greedy algorithms: build a classroom reservation web app that uses the greedy activity selection algorithm to schedule the maximum number of non-overlapping events in a room. It connects to the [Week 5 Lecture](../../../Lecture-Notes/Week05_Greedy-Algorithms/Concepts_Lecture.md).

- **Weight:** 1% of the total grade
- **Deadline:** Monday before the next theory class, 11:59 PM
- **Submission:** Submit the source code (`.zip`) and the report (`.pdf`) to the LMS

> **Caution:** The LMS may experience issues near the deadline. Submit by **Sunday** at the latest to avoid problems. Late submissions due to system errors **will not be excused**, and meeting the deadline is the student's responsibility.

---

<br>

## Problem. Classroom Reservation Web App

Build a **classroom reservation system** web app that uses the **greedy activity selection** algorithm to schedule the maximum number of non-overlapping events in a room.

- **Backend:** Python (FastAPI or Flask)
- **Frontend:** HTML, CSS, JavaScript

### 1. Greedy Activity Selection

Implement the **activity selection algorithm**:

- Input: a list of reservation requests, each with a **start time** and an **end time**.
- Sort by **finish time**.
- Greedily select non-overlapping events.
- Output: the **maximum set** of reservations that can be accommodated

### 2. Web Interface

- The user can **add reservations** by entering an event name and start and end times.
- Provide a **"Generate Random"** button for sample data (e.g., 15 random events).
- Clicking **"Schedule"** runs the greedy algorithm.
- Display:
  - a **timeline visualization** of all requests (gray) and the selected events (highlighted),
  - the **number of selected** events versus the total requests, and
  - a **step-by-step trace** of the greedy selection order.

### 3. API Endpoints

| Method | Endpoint | Description |
|:-----|:-----|:-----|
| `POST` | `/schedule` | Run activity selection and return the selected events |
| `POST` | `/generate` | Generate random reservation requests |
| `GET` | `/` | Serve the frontend page |

*Table 1. The API endpoints to implement*

---

<br>

## Deliverables

### 1. Source Code (`.zip`)

```text
week05_assignment/
├── app.py              # Backend
├── static/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── requirements.txt
```

*Figure 1. Directory layout of the source code to submit*

### 2. Report (`.pdf` only, max 2 pages, font size 11pt+)

- A **screenshot** of the reservation system with a sample input (10+ events)
- A **step-by-step trace** of the greedy selection on your sample input
- **Analysis:** Why does sorting by finish time guarantee the optimal solution? Could sorting by start time or duration work instead?

---

<br>

## Grading Criteria

| Criterion | Weight |
|:-----|-----:|
| The web app runs and works correctly | 20% |
| The algorithm requirements are fully implemented | 40% |
| Report (2 pages max, font size 11+) | 40% |

*Table 2. Grading criteria and weights*

> **Caution:** Assignment content may appear on **written exams**. If there is a significant discrepancy between your assignment results and your exam performance, a **grade penalty** may apply.

Submit to the LMS before the deadline.

---

<br>

After working on the assignment yourself, see the [assignment explanation](../Assignment-Explanation.md) for the solution and results and the [code walkthrough](../Code-Walkthrough.md) for the complete code.
