# [Spring 2026] Algorithms

![Last Commit](https://img.shields.io/github/last-commit/Choroning/26Spring_Algorithms)
![Languages](https://img.shields.io/github/languages/top/Choroning/26Spring_Algorithms)

This repository organizes and stores sample Python code written for university lectures and assignments.

*Author: Cheolwon Park (Korea University Sejong, CSE) – Year 3 (Junior) as of 2026*
<br><br>

## 📑 Table of Contents

- [About This Repository](#about-this-repository)
- [Course Information](#course-information)
- [Prerequisites](#prerequisites)
- [Repository Structure](#repository-structure)
- [License](#license)

---


<br><a name="about-this-repository"></a>
## 📝 About This Repository

This repository contains bilingual study materials and code developed for a university-level Algorithms course, including:

- Bilingual Concepts notes (Korean `.ko.md` + English `.md`) for every lecture and lab session
- Assignment solutions with detailed explanation documents
- Weekly directory structure covering the full CLRS-based curriculum

> **🤖 AI-Assisted Development**
> This course encourages the use of AI agents.
> [Claude Code](https://claude.ai/download) and [Gemini CLI](https://github.com/google-gemini/gemini-cli) were used as coding assistants throughout the course.

<br><a name="course-information"></a>
## 📚 Course Information

- **Semester:** Spring 2026 (March - June)
- **Affiliation:** Korea University Sejong

| Course&nbsp;Code| Course            | Type          | Instructor      | Department                              |
|:----------:|:------------------|:-------------:|:---------------:|:----------------------------------------|
|`DCSS309-00`|ALGORITHM|Major Required|Prof. Unggi&nbsp;Lee|Department of Computer Science and Software Engineering|

### Course Overview

This course introduces the design, analysis, and implementation of algorithms. It covers algorithm correctness, asymptotic time and space complexity, and paradigms including divide and conquer, greedy methods, dynamic programming, and graph algorithms.

### Instructor and Research Lab

- **Instructor:** Prof. Unggi Lee, Department of Computer Science and Software Engineering
- **Research lab:** [LEAP Lab](https://codingchild2424.github.io/lab-website/), focusing on generative AI in education, pedagogical alignment, large language models, and knowledge tracing

### Schedule and Class Format

- **Credits:** 3
- **Meeting times:** Tuesday, periods 8–9; Thursday, period 7
- **Classroom:** Science and Technology Building 2, Room 310
- **Weekly format:** 1st period: quiz and lecture (part 1); 2nd period: lecture (part 2); 3rd period: lab

### Assessment

| Component | Weight |
|:----------|-------:|
| Assignments (quizzes 5%, homework 5%) | 10% |
| Midterm exam (written) | 30% |
| Final exam (project) | 30% |
| Final exam (written) | 30% |
| Attendance | 0% |

- Quizzes are held at the start of the first period in Weeks 3–7 and 9–13, cover the previous week's material, and may appear on written exams. Generative AI is prohibited during quizzes.
- There are five homework assignments in Weeks 2–6.
- Generative AI tools are permitted and encouraged for assignments when students explain their own reasoning and design choices.
- Written exams are handwritten and last one hour. The final project is a team project in Weeks 9–13.
- A grade is not awarded if a student misses more than one third of the total class hours.

### Course Roadmap

| Week | Topic | Week | Topic |
|:----:|:------|:----:|:------|
| 1 | Introduction to Algorithms | 9 | Search Trees |
| 2 | Algorithm Design and Complexity Analysis | 10 | Hash Tables and Set Data Structures |
| 3 | Arrays, Stacks, Queues, and Basic Sorting Algorithms | 11 | Graph Algorithms I |
| 4 | Divide and Conquer Algorithms | 12 | Graph Algorithms II |
| 5 | Greedy Algorithms | 13 | NP-Complete Problems and Approximation Algorithms |
| 6 | Dynamic Programming | 14 | Final Exam (Project) |
| 7 | Review and Problem Solving | 15 | Final Exam (Written) |
| 8 | Midterm Exam | 16 | Study Week |

### Learning Resources

- **Coding practice:** [Baekjoon](https://www.acmicpc.net/), [Programmers](https://programmers.co.kr/), [LeetCode](https://leetcode.com/), [Codeforces](https://codeforces.com/), [solved.ac](https://solved.ac/)
- **Algorithm visualizations:** [VisuAlgo](https://visualgo.net/) and [Data Structure Visualizations](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)

- **📖 References**

| Type | Contents |
|:----:|:---------|
|Textbook|"Introduction to Algorithms, 3rd Edition" by Cormen, Leiserson, Rivest, and Stein (CLRS)|
|Lecture Notes|[Instructor's Markdown notes and slides (GitHub)](https://github.com/codingchild2424/2026-lecture-algorithm)|

<br><a name="prerequisites"></a>
## ✅ Prerequisites

- Understanding of data structures and basic programming
- Python interpreter installed
- Familiarity with command-line tools

- **💻 Development Environment**

| Tool | Company |  OS  | Notes |
|:-----|:-------:|:----:|:------|
|Visual Studio Code|Microsoft|macOS|    |

<br><a name="repository-structure"></a>
## 🗂 Repository Structure

```plaintext
26Spring_Algorithms
├── W01_Introduction-to-Algorithms
│   ├── Lab-Materials
│   │   ├── Binary-Search.py
│   │   └── Coin-Change.py
│   ├── Concepts_Lab.ko.md
│   ├── Concepts_Lab.md
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W02_Algorithm-Design-and-Complexity-Analysis
│   ├── Assignment
│   │   ├── static
│   │   │   ├── app.js
│   │   │   ├── index.html
│   │   │   └── style.css
│   │   ├── app.py
│   │   ├── locustfile.py
│   │   └── requirements.txt
│   ├── Assignment-Report.pdf
│   ├── Concepts_Lab.ko.md
│   ├── Concepts_Lab.md
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W03_Arrays-Stacks-Queues-and-Basic-Sorting-Algorithms
│   ├── Assignment
│   │   ├── static
│   │   │   ├── app.js
│   │   │   ├── index.html
│   │   │   └── style.css
│   │   ├── app.py
│   │   └── requirements.txt
│   ├── Assignment-Report.pdf
│   ├── Concepts_Lab.ko.md
│   ├── Concepts_Lab.md
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W04_Divide-and-Conquer-Algorithms
│   ├── Assignment
│   │   ├── static
│   │   │   ├── app.js
│   │   │   ├── index.html
│   │   │   └── style.css
│   │   ├── app.py
│   │   └── requirements.txt
│   ├── Assignment-Report.pdf
│   ├── Concepts_Lab.ko.md
│   ├── Concepts_Lab.md
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W05_Greedy-Algorithms
│   ├── Assignment
│   │   ├── static
│   │   │   ├── app.js
│   │   │   ├── index.html
│   │   │   └── style.css
│   │   ├── app.py
│   │   └── requirements.txt
│   ├── Assignment-Report.pdf
│   ├── Concepts_Lab.ko.md
│   ├── Concepts_Lab.md
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W06_Dynamic-Programming
│   ├── Assignment
│   │   ├── static
│   │   │   ├── app.js
│   │   │   ├── index.html
│   │   │   └── style.css
│   │   ├── app.py
│   │   └── requirements.txt
│   ├── Assignment-Report.pdf
│   ├── Concepts_Lab.ko.md
│   ├── Concepts_Lab.md
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W07_Midterm-Review
│   ├── Concepts.ko.md
│   ├── Concepts.md
│   ├── Concepts_Detailed.ko.md
│   └── Concepts_Detailed.md
├── W09_Search-Trees
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W10_Hash-Tables-and-Set-Data-Structures
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W11_Graph-Algorithms-I
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W12_Graph-Algorithms-II
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W13_NP-Completeness-and-Approximation-Algorithms
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W14_Approximation-Algorithms
├── Preparation
│   ├── AL-Mid_SummarySheet.ko.md.pdf
│   ├── AL-Mid_Total.ko.md.pdf
│   ├── Mid_SummarySheet.ko.md
│   └── Mid_Total.ko.md
├── images
│   └── (lecture figure images)
├── LICENSE
├── README.ko.md
└── README.md
```

<br><a name="license"></a>
## 🤝 License

This repository is released under the [MIT License](LICENSE).

---
