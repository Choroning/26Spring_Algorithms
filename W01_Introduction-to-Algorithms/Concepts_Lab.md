# Week 1 Lab — Coding Agents

> **Last Updated:** 2026-03-21

---

## Table of Contents

- [1. Lab Overview](#1-lab-overview)
- [2. What Is a Coding Agent?](#2-what-is-a-coding-agent)
  - [2.1 Available Agents](#21-available-agents)
- [3. Task 1 — Install a Coding Agent](#3-task-1--install-a-coding-agent)
- [4. Task 2 — File Organization](#4-task-2--file-organization)
- [5. Task 3 — GitHub Repository Documentation](#5-task-3--github-repository-documentation)
- [6. Task 4 — The Ralph Technique](#6-task-4--the-ralph-technique)
  - [6.1 What Is the Ralph Technique?](#61-what-is-the-ralph-technique)
  - [6.2 Ralphton Hackathon — A Real-World Example](#62-ralphton-hackathon--a-real-world-example)
  - [6.3 Ralph Practice](#63-ralph-practice)
- [7. Task 5 — Build a Sorting Benchmark](#7-task-5--build-a-sorting-benchmark)
  - [7.1 What to Observe](#71-what-to-observe)
- [Summary](#summary)
- [Appendix](#appendix)

---

<br>

## 1. Lab Overview

- **Goal**: Install AI-based coding agents and apply them to real development tasks
- **Duration**: ~50 minutes
- **Submission**: None — this is an exploratory lab
- These tools will be used **throughout the semester** in labs and assignments

**Lab Flow:**

| Order | Task | Description |
|:------|:-----|:------------|
| 1 | Task 1 | Install an agent |
| 2 | Task 2 | File organization |
| 3 | Task 3 | Repository documentation |
| 4 | Task 4 | RALPH technique |
| 5 | Task 5 | Sorting benchmark |

---

<br>

## 2. What Is a Coding Agent?

An AI-based CLI tool that generates code by **understanding context**.

**Workflow:**

```
Read            →  Plan            →  Act             →  Verify
Files & Context    Decide what       Edit & Execute     Check results
                   to do
                         ← Iterate →
```

- Can read the file system, execute commands, and edit autonomously
- Useful for: scaffolding, refactoring, documentation, debugging

> **Example:** *"Create a Python sorting benchmark with timing utilities"* → The agent checks the directory, writes files, and verifies tests pass.

> **Key Point:** Coding agents are AI tools that have advanced rapidly in recent times. What distinguishes them from conversational AI like ChatGPT is their ability to **directly access the file system** and **execute commands**. That is, instead of copying and pasting code, the agent reads and modifies files directly.

> **Note:** A concrete example of how it works: when you ask the agent to "write a bubble_sort function," (1) Read: it examines the project's existing file structure and code, (2) Plan: it decides to add the function to sorting.py, (3) Act: it directly edits the file to write the code, (4) Verify: it runs the written code to check for errors. The key difference from ChatGPT's web interface is that the agent modifies files **directly** without any copy-paste.

### 2.1 Available Agents

| Agent | Price | Developer | Features |
|:------|:------|:----------|:---------|
| **Gemini CLI** | Free (1,000/day) | Google | Good default choice |
| **Claude Code** | Paid | Anthropic | Powerful multi-file reasoning |
| **Codex CLI** | Paid | OpenAI | Open-source CLI |

Others: **OpenCode** (open-source harness — supports all models including open-source LLMs)

> **Note:** If you have no particular preference, **Gemini CLI** is recommended — it is free and easy to set up.

---

<br>

## 3. Task 1 — Install a Coding Agent

Refer to the official documentation and install at least one coding agent.

**Installation Commands:**

```bash
npm install -g @google/gemini-cli          # Gemini CLI (Free)
npm install -g @anthropic-ai/claude-code    # Claude Code (Paid)
```

**Verify Installation:**

```bash
gemini --version    # or: claude --version
```

**Checklist:**

- Does the CLI run without errors?
- Can you authenticate? (Gemini uses a Google account, Claude uses an Anthropic account)
- Confirm a response with a simple prompt: `"What is 2 + 2?"`

> **Note:** `npm` is Node.js's package manager. To run the commands above, Node.js must be installed first. The `-g` flag stands for "global," meaning it installs system-wide so the command can be used from anywhere.

---

<br>

## 4. Task 2 — File Organization

Use the agent to **organize files** in a messy directory.

**Example Prompt:**

```
"Organize the files in my ~/Downloads folder into subfolders by file type
 (images, documents, code, etc.). Show me the plan before executing."
```

**What to Observe:**

- Does the agent **ask for confirmation** before moving files?
- Does it create a reasonable folder structure?
- How does it handle edge cases (e.g., files without extensions)?

**Discussion:**

- What would have happened if you hadn't said *"show me the plan first"*?
- How can you give more specific instructions when the results are not satisfactory?

---

<br>

## 5. Task 3 — GitHub Repository Documentation

Use the agent to **generate a README.md** for an existing codebase.

**Choose a Target Repository:**

- Your own project or a public repository:
  - `https://github.com/code-yeongyu/oh-my-opencode`

**Example Prompt:**

```
"Read this codebase and generate a comprehensive README.md that includes
 an architecture overview, setup instructions, and usage examples."
```

**Evaluate the Output:**

- Does the README **accurately** describe the project?
- Are the setup instructions correct and complete?
- Is anything missing? (License, contribution guide, screenshots)

> **Note:** Save this README — you will improve it in the next Task.

---

<br>

## 6. Task 4 — The Ralph Technique

### 6.1 What Is the Ralph Technique?

A **bash script loop** created by Geoffrey Huntley, named after **Ralph Wiggum** from *The Simpsons*. It automates AI coding agents by running them **repeatedly** until a task is completed.

![Ralph Wiggum](../images/ralph-wiggum.jpg)

**How It Works:**

- **Infinite loop** — Uses `while true` to keep running the agent until the goal is achieved
- **Fresh context** — Each iteration starts with a clean state, preventing the AI from getting stuck
- **File-based memory** — The agent reads and writes to the file system (git, progress files) instead of conversation history
- **Deploy code while you sleep** — Autonomously tests and applies changes overnight

> **Key Point:** The core idea of the Ralph technique is "even if an AI agent cannot get it perfect on the first try, it keeps improving with iteration." In each iteration, the agent (1) reads the current state from the file system, (2) determines what is lacking, and (3) makes corrections. Since it uses the file system as "memory" instead of conversation history, it can continue from previous progress even in a brand-new session.

> **Note:** The basic bash script form of the Ralph loop:
> ```bash
> while true; do
>   gemini "Read PROGRESS.md, pick one incomplete item, and implement it"
>   git add -A && git commit -m "auto: progress update"
> done
> ```
> The key points are (1) `while true` for infinite iteration, (2) in each iteration the agent reads the file system (PROGRESS.md) to assess the current state, and (3) results are saved via git so subsequent iterations can continue from where the previous one left off.

### 6.2 Ralphton Hackathon — A Real-World Example

At Korea's first **Ralphton** hackathon, 13 elite teams had AI agents **code autonomously overnight**, then reviewed the results the next morning.

![OpenClaw Lobster](../images/openclaw-lobster.png)

| Metric | Value | Description |
|:-------|:------|:------------|
| Lines of Code | **100K** | Total code generated overnight |
| Test Code Ratio | **70%** | Tests as automatic verification criteria |
| Reasoning Loops | **133** | Number of agent iteration cycles |

**The Evolution of Engineering:**

```
Prompt Engineering → Context Engineering → Harness Engineering
  (What to say)        (What to provide)     (How to verify)
```

> *Source: [Korea's First Ralphton Review — Brian Jang](https://briandwjang.substack.com/p/8d3)*

> **Note:** The notable statistic here is "70% is test code." When AI agents work autonomously, test code serves as the "verification criteria." If tests pass, the code is deemed correct; if they fail, the agent iterates on fixes. This is the essence of "harness engineering" — **building a structure where the AI can verify its own output**.

> **Note:** To summarize the difference between the three stages:
> - **Prompt Engineering**: "What to say" — the art of writing good questions/instructions.
> - **Context Engineering**: "What to provide" — the art of providing the agent with appropriate files, documents, and examples to establish context.
> - **Harness Engineering**: "How to verify" — the art of designing automatic verification structures (tests, rubrics, etc.) so the AI can judge its own results.

### 6.3 Ralph Practice

Use the Ralph technique to **iteratively improve** the README from Task 3.

**Example Workflow:**

```
You:    "Create a rubric for evaluating high-quality open-source READMEs."
Agent:  Returns 8 criteria (description, installation, usage, architecture, ...)

You:    "Evaluate the README you wrote against this rubric. Score each criterion."
Agent:  Score 6/8 — Deficient: architecture diagram, contribution guide

You:    "Fix all failing criteria. Keep going until all criteria are met."
Agent:  Iterates autonomously — updates README, re-evaluates, fixes again...

Result: 8/8 — All criteria met.
```

**Key Insight — This IS the Ralph Loop:**

- Each iteration: the agent evaluates -> finds issues -> fixes -> re-evaluates
- You set the **goals and criteria**, and the agent iterates until complete
- Same principle as the bash loop — **continuous iteration** is more effective than a one-shot prompt

---

<br>

## 7. Task 5 — Build a Sorting Benchmark

Use the agent to create a **multi-file sorting benchmark** — a preview of the semester project.

**Example Prompt:**

```
"Create a Python sorting benchmark comparing bubble sort, merge sort,
 and Python's built-in sort. Include timing utilities and a results table,
 and organize the code into separate modules."
```

**Expected Output:**

| File | Role |
|:-----|:-----|
| `sorting.py` | Sorting algorithms |
| `timer.py` | Timing utilities |
| `benchmark.py` | Main runner |
| `README.md` | Documentation |

> **[Data Structures]** Recall the sorting algorithms covered in Data Structures.
> - **Bubble Sort**: Compares and swaps adjacent elements. O(n^2). Simplest to implement but slowest.
> - **Merge Sort**: Divides the array in half, sorts each half, then merges. O(n log n). A classic example of divide and conquer.
> - **Python's built-in sort**: Uses the Timsort algorithm, a hybrid of merge sort and insertion sort. O(n log n). Fastest in practice.

### 7.1 What to Observe

A perfect benchmark is not the goal — the **process** is what matters.

**Observe how the agent:**

- Breaks a complex problem into multiple files
- Explains the role of each component
- Handles errors when given feedback
- Iterates on build failures (if any)

**Follow-up Prompts to Try:**

- *"Visualize the results as a bar chart"*
- *"Explain the time complexity of each sorting algorithm"*
- *"The benchmark crashes on large N — fix it"*

---

<br>

## Summary

| Concept | Key Takeaway |
|:--------|:-------------|
| Coding Agents | AI-based CLI tools that directly access the file system to read, execute, and modify code |
| Workflow | Read -> Plan -> Act -> Verify -> Iterate |
| Agent Selection | Gemini CLI (free, recommended), Claude Code (paid, multi-file reasoning), Codex CLI (paid, open-source) |
| Task 1: Installation | Install with `npm install -g`; Node.js required; verify with authentication and a simple prompt |
| Task 2: File Organization | Delegate real tasks to the agent; requesting a plan before execution is key |
| Task 3: Documentation | Generate README.md with the agent, then personally evaluate for accuracy and completeness |
| Task 4: Ralph Technique | Run the agent in a bash loop; maintain state via file-based memory; continuous iteration is more effective than a one-shot approach |
| Ralphton Hackathon | 13 teams, 100K lines of code, 70% test code; the core of harness engineering is building a structure where AI can verify its own output |
| Evolution of Engineering | Prompt Engineering -> Context Engineering -> Harness Engineering |
| Task 5: Sorting Benchmark | Multi-file project; Bubble Sort O(n^2), Merge Sort O(n log n), Python built-in sort (Timsort) O(n log n) |
| Core Lesson | Coding agents are merely tools — understanding the output remains **the user's responsibility** |

---

<br>

## Appendix

### Assignments & Team Project

**Weekly Assignments (Weeks 2-6):**

- **Weeks 2-6**, assignments are given each week
- Each assignment: Build a **web application** applying the algorithms learned that week
- Goal: Experience how algorithms improve real software performance

**Team Project (Final Exam, Weeks 9-13):**

- Teams of 3-4 build a **web application** applying **all algorithms** covered in class
- Deliverables: **Working web app** + **Report** + **Presentation**
- Agents are the primary development tool throughout the process

> Using coding agents to their fullest extent is encouraged — they are essential for both assignments and the final project.

### Next Session

- **Week 2 Lab**: Complexity Analysis Lab (O(n^2) vs O(n) comparison)

---
