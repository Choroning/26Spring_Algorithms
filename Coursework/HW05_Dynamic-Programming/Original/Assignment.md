# HW5 Assignment Handout — Plagiarism Checker

[Repository Guide](../../../README.md) | [English](Assignment.md) | [한국어](Assignment.ko.md)

> **Last Updated:** 2026-11-16

This is the week 6 take-home assignment (Week 06 Assignment) of Algorithms. Its topic is dynamic programming: build a plagiarism checker web app that compares two documents and calculates their similarity with the LCS (Longest Common Subsequence) algorithm. It connects to the [Week 6 Lecture](../../../Lecture-Notes/Week06_Dynamic-Programming/Concepts_Lecture.md).

- **Weight:** 1% of the total grade
- **Deadline:** Monday before the next theory class, 11:59 PM
- **Submission:** Submit the source code (`.zip`) and the report (`.pdf`) to the LMS

> **Caution:** The LMS may experience issues near the deadline. Submit by **Sunday** at the latest to avoid problems. Late submissions due to system errors **will not be excused**, and meeting the deadline is the student's responsibility.

---

<br>

## Problem. Plagiarism Checker Web App

Build a **plagiarism checker** web app that compares two documents and calculates their similarity using the **Longest Common Subsequence (LCS)** algorithm (dynamic programming).

- **Backend:** Python (FastAPI or Flask)
- **Frontend:** HTML, CSS, JavaScript

### 1. LCS-Based Similarity Analysis

Implement the **LCS algorithm** using dynamic programming:

- Build the **DP table** for the two input texts.
- **Backtrack** to find the LCS.
- Calculate the **similarity score** as `LCS length / max(len(A), len(B)) * 100%`.
- Generate a **diff view** that marks each part as matched, added, or removed.

### 2. Web Interface

- Provide two **text areas** for inputting Document A and Document B.
- Provide a **"Check"** button to run the plagiarism analysis.
- Display:
  - the **similarity score** (percentage),
  - the **LCS length** and the actual LCS string, and
  - a **colored diff view:** matched (gray), removed (red), added (green).

### 3. API Endpoints

| Method | Endpoint | Description |
|:-----|:-----|:-----|
| `POST` | `/check` | Compare two texts and return the similarity score and diff |
| `GET` | `/` | Serve the frontend page |

*Table 1. The API endpoints to implement*

---

<br>

## Deliverables

### 1. Source Code (`.zip`)

```text
week06_assignment/
├── app.py              # Backend
├── static/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── requirements.txt
```

*Figure 1. Directory layout of the source code to submit*

### 2. Report (`.pdf` only, max 2 pages, font size 11pt+)

- A **screenshot** of the plagiarism checker comparing two sample texts
- A **DP table** for a short example (e.g., "ALGORITHM" vs "ALTRUISTIC")
- **Analysis:** Explain the time and space complexity of LCS. How does this relate to tools like `git diff` or Turnitin?

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
