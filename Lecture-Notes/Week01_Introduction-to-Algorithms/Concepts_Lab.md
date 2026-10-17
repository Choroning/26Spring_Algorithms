# Week 1 Lab — Coding Agents

[Repository Guide](../../README.md) | [English](Concepts_Lab.md) | [한국어](Concepts_Lab.ko.md)

> **Last Updated:** 2026-10-18

> **Learning Objectives:**
> 1. Install and run at least one AI coding agent (Gemini CLI, Claude Code, Codex CLI, or GitHub Copilot CLI)
> 2. Use a coding agent to automate file organization and documentation tasks
> 3. Apply the Ralph technique to iteratively improve AI-generated output
> 4. Build and run a simple sorting benchmark program

---

## Table of Contents

- [1. Lab Overview](#1-lab-overview)
- [2. What Is a Coding Agent?](#2-what-is-a-coding-agent)
  - [2.1 Available Agents](#21-available-agents)
- [3. Task 1: Install a Coding Agent](#3-task-1-install-a-coding-agent)
- [4. Task 2: File Organization](#4-task-2-file-organization)
- [5. Task 3: GitHub Repository Documentation](#5-task-3-github-repository-documentation)
- [6. Task 4: The Ralph Technique](#6-task-4-the-ralph-technique)
  - [6.1 What Is the Ralph Technique?](#61-what-is-the-ralph-technique)
  - [6.2 The Ralphton Hackathon](#62-the-ralphton-hackathon)
  - [6.3 Ralph Practice](#63-ralph-practice)
- [7. Task 5: Build a Sorting Benchmark](#7-task-5-build-a-sorting-benchmark)
  - [7.1 What to Observe](#71-what-to-observe)
- [8. Appendix](#8-appendix)
  - [8.1 Assignments and Term Project](#81-assignments-and-term-project)
  - [8.2 Connection to the Week 2 Lab](#82-connection-to-the-week-2-lab)
- [Summary](#summary)
- [Self-Check Questions](#self-check-questions)
- [References](#references)

---

<br>

## 1. Lab Overview

- **Goal:** Install AI-based coding agents and apply them to real development tasks.
- **Duration:** About 50 minutes.
- **Submission:** None; this is an exploratory lab.
- **Requirements:** A computer with a terminal (macOS Terminal, Windows PowerShell, or Linux shell), basic command-line usage such as navigating directories and running commands, and a GitHub account.
- These tools will be used **throughout the semester** in labs and assignments.

**Lab Flow:**

| Order | Task | Description |
|:------|:-----|:------------|
| 1 | Task 1 | Install an agent |
| 2 | Task 2 | File organization |
| 3 | Task 3 | Repository documentation |
| 4 | Task 4 | Ralph technique |
| 5 | Task 5 | Sorting benchmark |

*Table 1. The five tasks of the lab*

Why coding agents in an algorithms course? Understanding how to effectively use AI-powered coding tools is becoming an essential skill for software engineers. By learning to use these tools early, you can focus more on algorithmic thinking and problem-solving rather than syntax details.

---

<br>

## 2. What Is a Coding Agent?

A **coding agent** is an AI-based CLI tool that generates code by **understanding context**. A CLI (Command-Line Interface) is a text-based interface where you type commands instead of clicking buttons.

**Workflow:**

```text
Read            →  Plan            →  Act             →  Verify
Files & Context    Decide what       Edit & Execute     Check results
                   to do
                         ← Iterate →
```

*Figure 1. The read, plan, act, and verify loop of a coding agent*

- A coding agent can read the file system, execute commands, and edit autonomously.
- It is useful for scaffolding, refactoring, documentation, and debugging.

**Example:** When you ask "Create a Python sorting benchmark with timing utilities," the agent checks the directory, writes files, and verifies that tests pass.

> **Key Point:** Coding agents are AI tools that have advanced rapidly in recent times. What distinguishes them from conversational AI like ChatGPT is their ability to **directly access the file system** and **execute commands**. That is, instead of copying and pasting code, the agent reads and modifies files directly.

> **Note:** **A concrete example.** When you ask the agent to "write a bubble_sort function," (1) Read: it examines the project's existing file structure and code, (2) Plan: it decides to add the function to sorting.py, (3) Act: it directly edits the file to write the code, (4) Verify: it runs the written code to check for errors. The key difference from ChatGPT's web interface is that the agent modifies files **directly** without any copy-paste.

### 2.1 Available Agents

| Agent | Price | Developer | Features |
|:------|:------|:----------|:---------|
| **Gemini CLI** | Free (1,000/day) | Google | Good default choice |
| **Claude Code** | Paid | Anthropic | Powerful multi-file reasoning |
| **Codex CLI** | Paid | OpenAI | Open-source CLI |

*Table 2. Price, developer, and features of the main coding agents*

Another option is **OpenCode**, an open-source harness that can use models from many providers, including open-source LLMs.

> **Note:** If you have no particular preference, **Gemini CLI** is recommended because it is free and easy to set up.

---

<br>

## 3. Task 1: Install a Coding Agent

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

- Check that the CLI runs without errors.
- Check that you can authenticate (Gemini uses a Google account, Claude uses an Anthropic account).
- Confirm a response with a simple prompt: `"What is 2 + 2?"`

> **Note:** `npm` is Node.js's package manager. To run the commands above, Node.js must be installed first. The `-g` flag stands for "global," meaning it installs system-wide so the command can be used from anywhere.

> **Note:** Node.js is required for some coding agents. Install the LTS version from https://nodejs.org and verify the installation with `node --version` in your terminal.

---

<br>

## 4. Task 2: File Organization

Use the agent to **organize files** in a messy directory.

**Example Prompt:**

```text
"Organize the files in my ~/Downloads folder into subfolders by file type
 (images, documents, code, etc.). Show me the plan before executing."
```

**What to Observe:**

- Does the agent **ask for confirmation** before moving files?
- Does it create a reasonable folder structure?
- How does it handle edge cases such as files without extensions?

**Expected Output:**

```text
I'll organize your ~/Downloads folder. Here's my plan:

  images/    → .jpg, .png, .gif (12 files)
  documents/ → .pdf, .docx, .txt (8 files)
  code/      → .py, .js, .html (5 files)
  other/     → files with no extension (2 files)

Shall I proceed?
```

**Discussion:**

- What would have happened if you had not said "show me the plan first"?
- How can you give more specific instructions when the results are not satisfactory?

---

<br>

## 5. Task 3: GitHub Repository Documentation

Use the agent to **generate a README.md** for an existing codebase.

**Choose a Target Repository:**

- Use your own project or a public repository, for example:
  - `https://github.com/code-yeongyu/oh-my-opencode`

**Example Prompt:**

```text
"Read this codebase and generate a comprehensive README.md that includes
 an architecture overview, setup instructions, and usage examples."
```

**Evaluate the Output:**

- Does the README **accurately** describe the project?
- Are the setup instructions correct and complete?
- Is anything missing, such as a license, a contribution guide, or screenshots?

> **Note:** Save this README, because Task 4 improves it.

---

<br>

## 6. Task 4: The Ralph Technique

### 6.1 What Is the Ralph Technique?

The **Ralph technique** is a **bash script loop** created by Geoffrey Huntley, named after **Ralph Wiggum** from *The Simpsons*. It automates AI coding agents by running them **repeatedly** until a task is completed.

![Figure 2. Ralph Wiggum, the namesake of the Ralph technique](../../images/Week01_Ralph-Wiggum.jpg)

*Figure 2. Ralph Wiggum, the namesake of the Ralph technique*

**How It Works:**

- **Infinite loop:** Uses `while true` to keep running the agent until the goal is achieved.
- **Fresh context:** Each iteration starts with a clean state, preventing the AI from getting stuck.
- **File-based memory:** The agent reads and writes to the file system (git, progress files) instead of conversation history.
- **Deploy code while you sleep:** Autonomously tests and applies changes overnight.

> **Key Point:** The core idea of the Ralph technique is that even if an AI agent cannot get it perfect on the first try, it keeps improving with iteration. In each iteration, the agent (1) reads the current state from the file system, (2) determines what is lacking, and (3) makes corrections. Since it uses the file system as memory instead of conversation history, it can continue from previous progress even in a brand-new session.

> **Note:** **The basic bash script.** The basic form of the Ralph loop is as follows.
> ```bash
> while true; do
>   gemini "Read PROGRESS.md, pick one incomplete item, and implement it"
>   git add -A && git commit -m "auto: progress update"
> done
> ```
> The key points are (1) `while true` for infinite iteration, (2) in each iteration the agent reads the file system (PROGRESS.md) to assess the current state, and (3) results are saved via git so subsequent iterations can continue from where the previous one left off.

### 6.2 The Ralphton Hackathon

At Korea's first **Ralphton** hackathon, 13 participants set up their harnesses on the first day, had AI agents **code autonomously overnight**, and reviewed the results the next morning [1].

![Figure 3. OpenClaw logo](../../images/Week01_OpenClaw-Lobster.png)

*Figure 3. OpenClaw logo*

| Metric | Value | Description |
|:-------|:------|:------------|
| Lines of Code | **100K** | Total code the winning team had the agent write |
| Test Code Ratio | **70%** | Share of test code, the automatic verification criteria, about 70K of the winning team's 100K lines |
| Reasoning Loops | **133** | Rounds of Socratic questioning the winning team had an agent run to remove ambiguity from the PRD and spec |

*Table 3. Key metrics of the winning Ralphton team*

**The Evolution of Engineering:**

```text
Prompt Engineering → Context Engineering → Harness Engineering
  (What to say)        (What to provide)     (How to verify)
```

*Figure 4. The evolution from prompt to context to harness engineering*

> **Note:** The notable statistic here is that 70% of the code is test code. When AI agents work autonomously, test code serves as the verification criteria. If tests pass, the code is deemed correct; if they fail, the agent iterates on fixes. **Building a structure where the AI can verify its own output** is the essence of harness engineering.

> **Note:** The three stages differ as follows [1].
> - **Prompt Engineering:** Deals with what to say; the art of writing good questions and instructions.
> - **Context Engineering:** Deals with what to provide; the art of providing the agent with appropriate files, documents, and examples to establish context.
> - **Harness Engineering:** Deals with how to verify; the art of designing automatic verification structures, such as tests and rubrics, so the AI can judge its own results.

### 6.3 Ralph Practice

Use the Ralph technique to **iteratively improve** the README from Task 3.

**Example Workflow:**

```text
You:    "Create a rubric for evaluating high-quality open-source READMEs."
Agent:  Returns 8 criteria (description, installation, usage, architecture, ...)

You:    "Evaluate the README you wrote against this rubric. Score each criterion."
Agent:  Score 6/8 — Deficient: architecture diagram, contribution guide

You:    "Fix all failing criteria. Keep going until all criteria are met."
Agent:  Iterates autonomously — updates README, re-evaluates, fixes again...

Result: 8/8 — All criteria met.
```

**Key insight: this process is the Ralph loop.**

- In each iteration, the agent evaluates → finds issues → fixes → re-evaluates.
- You set the **goals and criteria**, and the agent iterates until complete.
- By the same principle as the bash loop, **continuous iteration** is more effective than a one-shot prompt.
- Stop iterating when the output meets your quality criteria or when successive iterations produce diminishing improvements. Typically 2-3 rounds are sufficient.

---

<br>

## 7. Task 5: Build a Sorting Benchmark

Use the agent to create a **multi-file sorting benchmark**. This task is a preview of the term project.

**Example Prompt:**

```text
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

*Table 4. Expected file layout of the sorting benchmark*

> **[Data Structures]** Recall the sorting algorithms covered in Data Structures.
> - **Bubble Sort:** Compares and swaps adjacent elements. O(n²). Simplest to implement but the slowest of the three.
> - **Merge Sort:** Divides the array in half, sorts each half, then merges. O(n log n). A classic example of divide and conquer.
> - **Python's built-in sort:** Uses the Timsort algorithm, a hybrid of merge sort and insertion sort. O(n log n). The fastest of the three in practice.

### 7.1 What to Observe

A perfect benchmark is not the goal; the **process** is what matters.

**Observe how the agent:**

- Breaks a complex problem into multiple files
- Explains the role of each component
- Handles errors when given feedback
- Iterates on build failures (if any)

**Follow-up Prompts to Try:**

- "Visualize the results as a bar chart"
- "Explain the time complexity of each sorting algorithm"
- "The benchmark crashes on large N. Fix it"

---

<br>

## 8. Appendix

### 8.1 Assignments and Term Project

**Weekly Assignments (Weeks 2-6):**

- In **Weeks 2-6**, an assignment is given each week.
- Each assignment builds a **web application** applying the algorithms learned that week.
- The goal is to experience how algorithms improve real software performance.

**Team-Based Term Project (Final Exam, Weeks 9-13):**

- Teams of 3-4 build a **web application** applying **all algorithms** covered in class.
- The deliverables are a **working web app**, a **report**, and a **presentation**.
- Agents are the primary development tool throughout the process.

> **Note:** Using coding agents to their fullest extent is encouraged, because they are essential for both the assignments and the term project.

### 8.2 Connection to the Week 2 Lab

The **Week 2 Lab** is a complexity analysis lab that compares an O(n²) solution with an O(n) solution.

---

<br>

## Summary

| Concept | Key Summary |
|:--------|:-------------|
| Coding Agents | They are AI-based CLI tools that directly access the file system to read, execute, and modify code. |
| Workflow | The agent repeats Read, Plan, Act, and Verify. |
| Agent Selection | You choose among Gemini CLI (free, recommended), Claude Code (paid, multi-file reasoning), and Codex CLI (paid, open-source). |
| Task 1: Installation | You install with `npm install -g`, which requires Node.js, and verify with authentication and a simple prompt. |
| Task 2: File Organization | You delegate a real task to the agent, and requesting a plan before execution is key. |
| Task 3: Documentation | You generate README.md with the agent, then personally evaluate it for accuracy and completeness. |
| Task 4: Ralph Technique | It runs the agent in a bash loop and maintains state via file-based memory, and continuous iteration is more effective than a one-shot prompt. |
| Ralphton Hackathon | The winning team had the agent write 100K lines of code, 70% of it test code, and the core of harness engineering is building a structure where AI can verify its own output. |
| Evolution of Engineering | It progressed from prompt engineering through context engineering to harness engineering. |
| Task 5: Sorting Benchmark | It is a multi-file project comparing Bubble Sort O(n²), Merge Sort O(n log n), and Python's built-in sort (Timsort) O(n log n). |
| Core Lesson | Coding agents are merely tools, and understanding the output remains **the user's responsibility**. |

---

<br>

## Self-Check Questions

1. What is the difference between a coding agent and a simple code autocomplete tool?

   <details>
   <summary>Answer</summary>

   A code autocomplete tool (e.g., classic IntelliSense) suggests the **next token or line** based on local context, and the developer still drives every action. A **coding agent** operates at a higher level. It can **read the file system**, **plan multi-step tasks**, **execute shell commands**, and **edit multiple files autonomously** in a Read → Plan → Act → Verify loop. Where autocomplete answers "what comes next?", an agent answers "achieve this goal." That is, it closes the loop between writing, running, and verifying code without copy-paste.

   </details>

2. In the Ralph technique, why is specificity in the follow-up prompt important? What happens if you just say "make it better"?

   <details>
   <summary>Answer</summary>

   The Ralph loop relies on the agent **comparing the current state against explicit criteria** at each iteration. A vague prompt like "make it better" gives the agent no rubric, so it drifts. It rewrites things that were already fine, oscillates between styles, or stops at a state it subjectively judges good enough. Specific prompts ("score against this 8-item rubric and fix every failing criterion") turn the loop into **harness engineering**. The agent can verify its own output and converge to a measurable target, the same principle behind the 133 question-and-answer loops run by the winning Ralphton team.

   </details>

3. After running the sorting benchmark, which algorithm was fastest for large inputs? Why?

   <details>
   <summary>Answer</summary>

   For large inputs, **Python's built-in `sorted()`** is fastest. It uses **Timsort**, a hybrid of merge sort and insertion sort with `O(n log n)` complexity. Implemented in optimized C, it also exploits sorted runs in real-world data. **Merge sort** has the same asymptotic complexity but runs in pure Python and allocates extra memory, so it is slower in practice. **Bubble sort** takes `O(n²)` time and becomes impractical at scale; for `n = 100,000`, it is roughly `n / log₂(n) ≈ 6,000×` slower than the `O(n log n)` algorithms.

   </details>

4. What does the `--dangerously-skip-permissions` flag do in Claude Code, and why should you be cautious with it?

   <details>
   <summary>Answer</summary>

   The flag bypasses Claude Code's **per-action confirmation prompts** for file edits, shell commands, and network calls, allowing the agent to act without asking. This helps in the Ralph loop or sandboxed CI, where prompts would block execution. It also removes the **human checkpoint** that can catch destructive actions such as `rm -rf`, force-pushes, or secret leaks. Use the flag only in an **isolated environment**, such as a container, an ephemeral VM, or a sandbox without production credentials, and never on a system where mistakes cannot be reverted.

   </details>

---

<br>

## References

1. 장동욱, "한국 최초 랄프톤 후기 : 하네스 엔지니어링 시대," *Substack*, Mar. 2026. https://briandwjang.substack.com/p/8d3
