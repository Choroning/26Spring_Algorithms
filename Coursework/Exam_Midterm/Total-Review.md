# Midterm Comprehensive Review

[Repository Guide](../../README.md) | [English](Total-Review.md) | [한국어](Total-Review.ko.md)

> **Last Updated:** 2026-10-20

---

## Table of Contents

- [1. What Is an Algorithm?](#1-what-is-an-algorithm)
  - [1.1 The Questions to Answer](#11-the-questions-to-answer)
  - [1.2 Definition of an Algorithm](#12-definition-of-an-algorithm)
  - [1.3 Euclidean GCD: The Oldest Algorithm](#13-euclidean-gcd-the-oldest-algorithm)
  - [1.4 Classical Problems and the $\log_2 n$ Motif](#14-classical-problems-and-the-log_2-n-motif)
    - [1.4.1 Binary Search](#141-binary-search)
    - [1.4.2 Poisoned Wine and Binary Encoding](#142-poisoned-wine-and-binary-encoding)
    - [1.4.3 Counterfeit Coin (1,024 Coins)](#143-counterfeit-coin-1024-coins)
  - [1.5 Euler Circuits and Graphs](#15-euler-circuits-and-graphs)
  - [1.6 Wrap-Up](#16-wrap-up)
- [2. Complexity Analysis: Big-O, Recurrences, and the Master Theorem](#2-complexity-analysis-big-o-recurrences-and-the-master-theorem)
  - [2.1 Why Analyze Complexity?](#21-why-analyze-complexity)
    - [2.1.1 The RAM Model](#211-the-ram-model)
    - [2.1.2 Four Types of Complexity Analysis](#212-four-types-of-complexity-analysis)
  - [2.2 Asymptotic Notation](#22-asymptotic-notation)
    - [2.2.1 Big-O: Asymptotic Upper Bound](#221-big-o-asymptotic-upper-bound)
    - [2.2.2 Big-Omega: Asymptotic Lower Bound](#222-big-omega-asymptotic-lower-bound)
    - [2.2.3 Theta: Tight Bound](#223-theta-tight-bound)
    - [2.2.4 Complexity Hierarchy](#224-complexity-hierarchy)
  - [2.3 Recurrences and Recursive Analysis](#23-recurrences-and-recursive-analysis)
    - [2.3.1 Method 1: Repeated Substitution](#231-method-1-repeated-substitution)
    - [2.3.2 Method 2: Guess and Prove by Induction](#232-method-2-guess-and-prove-by-induction)
    - [2.3.3 Method 3: The Master Theorem](#233-method-3-the-master-theorem)
  - [2.4 Six Algorithm Design Techniques](#24-six-algorithm-design-techniques)
  - [2.5 Wrap-Up](#25-wrap-up)
- [3. Data Structures and Basic Sorting](#3-data-structures-and-basic-sorting)
  - [3.1 Core Data Structures](#31-core-data-structures)
    - [3.1.1 Array vs Linked List](#311-array-vs-linked-list)
    - [3.1.2 Stack: LIFO](#312-stack-lifo)
    - [3.1.3 Queue: FIFO](#313-queue-fifo)
    - [3.1.4 Heap: Priority Queue](#314-heap-priority-queue)
  - [3.2 Basic Sorting: $\Theta(n^2)$](#32-basic-sorting-thetan2)
    - [3.2.1 Selection Sort](#321-selection-sort)
    - [3.2.2 Bubble Sort](#322-bubble-sort)
    - [3.2.3 Insertion Sort](#323-insertion-sort)
  - [3.3 Advanced Sorting: $\Theta(n \log n)$](#33-advanced-sorting-thetan-log-n)
    - [3.3.1 Merge Sort](#331-merge-sort)
    - [3.3.2 Quick Sort](#332-quick-sort)
    - [3.3.3 Heap Sort](#333-heap-sort)
    - [3.3.4 Comparison of the Three Sorts](#334-comparison-of-the-three-sorts)
  - [3.4 Lower Bound for Comparison-Based Sorting](#34-lower-bound-for-comparison-based-sorting)
  - [3.5 Linear-Time Sorting: Bypassing the Comparison Lower Bound](#35-linear-time-sorting-bypassing-the-comparison-lower-bound)
    - [3.5.1 Counting Sort](#351-counting-sort)
    - [3.5.2 Radix Sort](#352-radix-sort)
  - [3.6 Wrap-Up](#36-wrap-up)
- [4. Divide and Conquer](#4-divide-and-conquer)
  - [4.1 The Divide-and-Conquer Paradigm](#41-the-divide-and-conquer-paradigm)
  - [4.2 Catalog of Representative Algorithms](#42-catalog-of-representative-algorithms)
  - [4.3 The Selection Problem](#43-the-selection-problem)
    - [4.3.1 Randomized Select: Expected $\Theta(n)$](#431-randomized-select-expected-thetan)
    - [4.3.2 Median of Medians: Worst-Case $\Theta(n)$](#432-median-of-medians-worst-case-thetan)
  - [4.4 Closest Pair of Points](#44-closest-pair-of-points)
  - [4.5 When Divide and Conquer Fails](#45-when-divide-and-conquer-fails)
  - [4.6 Wrap-Up](#46-wrap-up)
- [5. Greedy Algorithms](#5-greedy-algorithms)
  - [5.1 The Greedy Paradigm](#51-the-greedy-paradigm)
  - [5.2 Two Conditions Required for Correctness](#52-two-conditions-required-for-correctness)
  - [5.3 Cases Where Greedy Fails](#53-cases-where-greedy-fails)
  - [5.4 Catalog of Greedy Algorithms](#54-catalog-of-greedy-algorithms)
    - [5.4.1 Coin Change (Standard Currency)](#541-coin-change-standard-currency)
    - [5.4.2 Fractional Knapsack](#542-fractional-knapsack)
    - [5.4.3 Activity Selection](#543-activity-selection)
    - [5.4.4 Job Scheduling (Not to Be Confused with Activity Selection)](#544-job-scheduling-not-to-be-confused-with-activity-selection)
    - [5.4.5 Huffman Coding: Optimal Prefix Codes](#545-huffman-coding-optimal-prefix-codes)
  - [5.5 Minimum Spanning Tree (MST)](#55-minimum-spanning-tree-mst)
    - [5.5.1 Kruskal: Edge-Centric](#551-kruskal-edge-centric)
    - [5.5.2 Prim: Vertex-Centric](#552-prim-vertex-centric)
    - [5.5.3 Comparing Kruskal and Prim](#553-comparing-kruskal-and-prim)
  - [5.6 Dijkstra: Shortest Paths](#56-dijkstra-shortest-paths)
  - [5.7 Wrap-Up](#57-wrap-up)
- [6. Dynamic Programming](#6-dynamic-programming)
  - [6.1 The Essence of DP](#61-the-essence-of-dp)
  - [6.2 Two Required Conditions](#62-two-required-conditions)
  - [6.3 Two Implementation Strategies](#63-two-implementation-strategies)
    - [6.3.1 Memoization: Top-Down](#631-memoization-top-down)
    - [6.3.2 Tabulation: Bottom-Up](#632-tabulation-bottom-up)
    - [6.3.3 Comparison](#633-comparison)
  - [6.4 The Six-Step DP Recipe](#64-the-six-step-dp-recipe)
  - [6.5 Catalog of Representative DP Problems](#65-catalog-of-representative-dp-problems)
    - [6.5.1 Fibonacci: Warm-Up](#651-fibonacci-warm-up)
    - [6.5.2 Longest Common Subsequence (LCS)](#652-longest-common-subsequence-lcs)
    - [6.5.3 Edit Distance (Levenshtein)](#653-edit-distance-levenshtein)
    - [6.5.4 0-1 Knapsack](#654-0-1-knapsack)
    - [6.5.5 Coin Change (Minimum Number of Coins)](#655-coin-change-minimum-number-of-coins)
    - [6.5.6 Floyd-Warshall: All-Pairs Shortest Paths](#656-floyd-warshall-all-pairs-shortest-paths)
    - [6.5.7 Matrix Path (Maximum Sum)](#657-matrix-path-maximum-sum)
  - [6.6 Overview of DP Problems](#66-overview-of-dp-problems)
  - [6.7 Wrap-Up](#67-wrap-up)
- [7. Midterm Review: Synthesis](#7-midterm-review-synthesis)
  - [7.1 The Thread Running Through the Semester](#71-the-thread-running-through-the-semester)
  - [7.2 Complexity Cheat Sheet](#72-complexity-cheat-sheet)
    - [7.2.1 Complexity Hierarchy](#721-complexity-hierarchy)
    - [7.2.2 Complete Sorting Table](#722-complete-sorting-table)
    - [7.2.3 Master Theorem Quick Reference](#723-master-theorem-quick-reference)
    - [7.2.4 Recurrence Catalog](#724-recurrence-catalog)
  - [7.3 Collection of DP Recurrences](#73-collection-of-dp-recurrences)
  - [7.4 Common Mistakes and How to Prevent Them](#74-common-mistakes-and-how-to-prevent-them)
- [8. The Big Picture: How the Three Paradigms Relate](#8-the-big-picture-how-the-three-paradigms-relate)
  - [8.1 Comparing the Three Paradigms](#81-comparing-the-three-paradigms)
  - [8.2 Decision Flowchart](#82-decision-flowchart)
  - [8.3 Same Problem, Different Paradigms](#83-same-problem-different-paradigms)
  - [8.4 Seven Key Connections](#84-seven-key-connections)
    - [Connection 1: The Unity of Recursive Thinking](#connection-1-the-unity-of-recursive-thinking)
    - [Connection 2: Divide and Conquer and Logarithmic Complexity](#connection-2-divide-and-conquer-and-logarithmic-complexity)
    - [Connection 3: The Switch from Greedy to DP](#connection-3-the-switch-from-greedy-to-dp)
    - [Connection 4: The Hierarchy of the Comparison Lower Bound and Linear Sorting](#connection-4-the-hierarchy-of-the-comparison-lower-bound-and-linear-sorting)
    - [Connection 5: Prim ↔ Dijkstra ↔ Huffman](#connection-5-prim--dijkstra--huffman)
    - [Connection 6: From the Limits of Divide and Conquer to DP](#connection-6-from-the-limits-of-divide-and-conquer-to-dp)
    - [Connection 7: Complexity Analysis Connects Everything](#connection-7-complexity-analysis-connects-everything)
  - [8.5 Advanced Tips for Writing Answers](#85-advanced-tips-for-writing-answers)
    - [Pattern 1: Start with "Why"](#pattern-1-start-with-why)
    - [Pattern 2: Trade-Offs](#pattern-2-trade-offs)
    - [Pattern 3: Connecting Concepts](#pattern-3-connecting-concepts)
    - [Pattern 4: Mentioning Limitations](#pattern-4-mentioning-limitations)
    - [Pattern 5: Real-World Examples](#pattern-5-real-world-examples)
- [9. Last-Minute Exam Checklist](#9-last-minute-exam-checklist)
  - [9.0 Weekly Core Cheat Sheet](#90-weekly-core-cheat-sheet)
    - [Five Exam Tips](#five-exam-tips)
  - [9.1 Common Mistakes](#91-common-mistakes)
  - [9.2 Examples of Exam Question Types](#92-examples-of-exam-question-types)
    - [Example 1: Complexity Analysis (Applying the Master Theorem)](#example-1-complexity-analysis-applying-the-master-theorem)
    - [Example 2: Greedy vs DP (Coin Change)](#example-2-greedy-vs-dp-coin-change)
    - [Example 3: DP](#example-3-dp)
  - [9.3 Ten Paradigm Identification Exercises](#93-ten-paradigm-identification-exercises)
    - [Problems 1-5](#problems-1-5)
    - [Problems 6-10](#problems-6-10)
    - [Paradigm Decision Flowchart](#paradigm-decision-flowchart)
  - [9.4 Five Review Problems](#94-five-review-problems)
    - [Review 1: Complexity Analysis](#review-1-complexity-analysis)
    - [Review 2: Merge Sort](#review-2-merge-sort)
    - [Review 3: Finding the Maximum with Divide and Conquer](#review-3-finding-the-maximum-with-divide-and-conquer)
    - [Review 4: Activity Selection](#review-4-activity-selection)
    - [Review 5: Climbing Stairs DP](#review-5-climbing-stairs-dp)
  - [9.5 Thirty Self-Check Questions](#95-thirty-self-check-questions)
    - [Week 1 Foundations](#week-1-foundations)
    - [Week 2 Complexity](#week-2-complexity)
    - [Week 3 Data Structures and Sorting](#week-3-data-structures-and-sorting)
    - [Week 4 Divide and Conquer](#week-4-divide-and-conquer)
    - [Week 5 Greedy](#week-5-greedy)
    - [Week 6 DP](#week-6-dp)
  - [9.6 Calculation Practice](#96-calculation-practice)
    - [Master Theorem](#master-theorem)
    - [LCS](#lcs)
    - [0-1 Knapsack](#0-1-knapsack)
    - [Big-O Proof](#big-o-proof)
  - [9.7 Pseudocode Check](#97-pseudocode-check)
    - [Binary Search](#binary-search)
    - [Merge Sort](#merge-sort)
    - [Filling the LCS Table](#filling-the-lcs-table)
    - [Filling the 0-1 Knapsack Table](#filling-the-0-1-knapsack-table)
    - [Dijkstra](#dijkstra)
  - [9.8 Exam-Day Strategy](#98-exam-day-strategy)
    - [Time Allocation (for a 1-Hour Exam)](#time-allocation-for-a-1-hour-exam)
    - [Six-Element Answer Template](#six-element-answer-template)
    - [Checkpoints: Commonly Missed Items](#checkpoints-commonly-missed-items)
- [Closing Remarks](#closing-remarks)

---

<br>

## 1. What Is an Algorithm?

### 1.1 The Questions to Answer

There are countless ways to solve a problem. Given two methods for the same problem, one must judge objectively **which one is better and why**. This requires the following three things.

1. A precise definition of what an algorithm is.
2. A measurable criterion that fixes what "efficient" means.
3. Familiarity with the design patterns that appear repeatedly.

These three points are the core of Week 1, and the later weeks build more complex algorithms on this foundation.

### 1.2 Definition of an Algorithm

An **algorithm** is a systematic problem-solving procedure that takes an input and produces the desired output through a finite number of steps.

```text
┌─────────┐      ┌────────────────┐      ┌──────────┐
│  Input  │ ───→ │   Algorithm    │ ───→ │  Output  │
│(Problem)│      │ (finite steps) │      │ (Result) │
└─────────┘      └────────────────┘      └──────────┘
```

*Figure 1. Relationship among input, algorithm, and output*

An algorithm must satisfy the following five properties.

| Property | Meaning | Failure Example |
|---|---|---|
| Correctness | It produces the correct output for every valid input. | It returns a wrong answer. |
| Executability | Every step can be executed mechanically. | It contains a non-executable step such as "ask an oracle". |
| Finiteness | It always terminates in a finite amount of time. | An infinite loop occurs. |
| Efficiency | It uses time and space appropriately. | It consumes infeasible resources, such as exponential time. |
| Unambiguity | It is described without ambiguity. | It uses a vague description such as "handle it as appropriate". |

*Table 1. Five properties an algorithm must satisfy, with failure examples*

When an exam question asks whether a given description is an algorithm, judge it against these five properties.

Niklaus Wirth's law "Algorithm + Data Structure = Program" summarizes this relationship. If the algorithm decides what to do, the data structure decides how to store the data, and the two cannot be separated. For example, only sequential search is possible in an unsorted dictionary, whereas binary search is possible in a sorted one.

### 1.3 Euclidean GCD: The Oldest Algorithm

**Background:** The Euclidean GCD was devised around 300 BCE, so it was known 2,300 years before computers appeared.

**Key identity:**

$$ \gcd(a, b) = \gcd(b, a \bmod b), \quad \gcd(a, 0) = a $$

**Why it holds:** Let $a = q \cdot b + r$ ($r = a \bmod b$). Then the set of common divisors of $(a, b)$ is identical to that of $(b, r)$. Therefore the two pairs also have the same greatest common divisor.

**Implementation:**

```python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
```

**Explanation:** Each iteration updates $(a, b) \to (b, a \bmod b)$. The identity $\gcd(a,b) = \gcd(b, a \bmod b)$ preserves the GCD value. Since $b$ strictly decreases at every step, it must reach $b=0$, and the $a$ at that moment is the final GCD. Swapping the values of two variables at once with simultaneous tuple assignment (`a, b = b, a % b`) is a Python idiom.

**Trace of gcd(48, 18):**

| Step | a | b | a mod b |
|---|---|---|---|
| 1 | 48 | 18 | 12 |
| 2 | 18 | 12 | 6 |
| 3 | 12 | 6 | 0 |
| 4 | 6 | 0 | → return 6 |

*Table 2. Step-by-step trace of gcd(48, 18)*

**Complexity:** The worst case is $O(\log \min(a, b))$. The worst case occurs for a pair of consecutive Fibonacci numbers.

It can also be implemented with recursion, and it is the prototype of **recursive thinking**, which reduces a problem to a smaller one. This way of thinking leads to divide and conquer in Week 4.

### 1.4 Classical Problems and the $\log_2 n$ Motif

The classical problems of Week 1 all show, from different angles, the same idea: **halving the problem yields $\log n$ performance**.

| Problem | Strategy | Worst Case | Key Idea |
|---|---|---|---|
| Finding the maximum | Sequential scan | $O(n)$ | Every element must be seen at least once |
| Binary search | Divide and conquer | $O(\log n)$ | Compare with the middle value of a sorted array and discard half |
| Coin change (standard) | Greedy | $O(k)$ | Choose the largest denomination first |
| Euler circuit | Graph traversal | $O(V+E)$ | Exists when every vertex has even degree |
| Maze (connected walls) | Right-hand rule | $O(\text{size})$ | A physical version of DFS |
| Counterfeit coin (1,024 coins) | Split in half | **10 weighings** | $\log_2 1024 = 10$ |
| Poisoned wine (n jars) | Binary encoding | $\lceil \log_2 n \rceil$ servants | Each servant = 1 bit of information |

*Table 3. Strategies, worst-case complexities, and key ideas of the Week 1 classical problems*

#### 1.4.1 Binary Search

**Precondition:** The array **must be sorted**.

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:                # [Caution] equality is required!
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

**Explanation:** It maintains the invariant that `[left, right]` is the closed interval not yet examined. Each iteration compares the middle value `arr[mid]` with `target` and **halves** the closed interval. If they are equal, it returns the index; if the target is larger, it discards the left half (`left = mid + 1`); if smaller, it discards the right half (`right = mid - 1`). When `left > right`, the remaining interval is empty, so it returns -1. The complexity is $\Theta(\log n)$.

**If the equality in `left <= right` is omitted,** the case where only one element remains in the interval (`left == right`) is not checked, and an existing key is missed. The equality includes the step that checks a single element.

**Comparison:** With one million elements, sequential search needs up to 1,000,000 comparisons in the worst case, whereas binary search needs only about 20 ($\log_2 10^6 \approx 20$).

#### 1.4.2 Poisoned Wine and Binary Encoding

**Problem:** One of $n$ jars contains poison. The poison takes effect after one week. The poisoned jar must be found within one week while minimizing the number of servants who taste the wine.

**Strategy:** Assign each jar a binary ID from $0$ to $n-1$. Servant $i$ drinks from every jar whose bit $i$ is $1$.

**Example with 4 jars:**

| Jar | Binary | Servant A (bit 1) | Servant B (bit 0) |
|---|---|---|---|
| 0 | 00 | - | - |
| 1 | 01 | - | ✓ |
| 2 | 10 | ✓ | - |
| 3 | 11 | ✓ | ✓ |

*Table 4. Binary IDs of 4 jars and which servant tastes each jar*

**Interpreting the result:** For example, if A dies and B survives, jar 2, which corresponds to binary 10, is poisoned.

**Generalization:** $n$ jars require $\lceil \log_2 n \rceil$ servants, and each servant provides 1 bit of information. The key proposition of information theory, that distinguishing $n$ cases requires at least $\log_2 n$ bits, is the same principle that makes binary search $\log n$.

#### 1.4.3 Counterfeit Coin (1,024 Coins)

**Problem:** Using a balance scale, find the one counterfeit coin (slightly lighter) among 1,024 coins while minimizing the number of weighings.

| Approach | Description | Worst-Case Count |
|---|---|---|
| Compare one by one | Brute force | 1,023 |
| Compare in pairs | A slightly improved method | 512 |
| Split in half | Divide and conquer | 10 |

*Table 5. Worst-case number of weighings for each approach to finding the counterfeit coin*

**Divide-and-conquer solution:** Start with 512 vs 512, choose the lighter side, and keep halving: 256 vs 256, 128 vs 128, and so on. Since $\log_2 1024 = 10$, exactly 10 weighings suffice. This idea underlies merge sort and binary search in Week 4.

### 1.5 Euler Circuits and Graphs

An **Euler path** is a path that traverses every edge exactly once, and an **Euler circuit** is an Euler path that returns to its starting point.

**Theorem:**
- An Euler **circuit** exists only if every vertex has even degree.
- An Euler **path** (not necessarily a circuit) exists only if there are exactly 0 or 2 vertices of odd degree.

**Intuition:** In a circuit, every time you enter a vertex you must leave it, so the number of incoming and outgoing edges at each vertex must be equal, and hence the degree is even.

**Avoiding bridges:** A bridge is an edge whose removal disconnects the graph. Crossing a bridge too early traps you on the other side, making it impossible to traverse all remaining edges.

### 1.6 Wrap-Up

The big picture of Week 1 is as follows. An algorithm is a systematic procedure that satisfies five properties: correctness, executability, finiteness, efficiency, and unambiguity. The Euclidean GCD is the prototype of recursive thinking, which reduces a problem to a smaller one. The $\log_2 n$ motif shared by binary search, the counterfeit coin problem, and the poisoned wine problem shows that halving is the key to efficiency, and this recursive splitting idea extends to divide and conquer in Week 4.

---

<br>

## 2. Complexity Analysis: Big-O, Recurrences, and the Master Theorem

### 2.1 Why Analyze Complexity?

Given two algorithms for the same problem, one needs a way to compare which one is faster independently of hardware. Running time (in seconds) depends on hardware, but the number of basic operations is an intrinsic property of the algorithm, so the operation count is expressed as a function of the input size $n$.

For sufficiently large $n$, an $O(n \log n)$ algorithm running on a laptop is faster than an $O(n^2)$ algorithm running on a supercomputer. Hardware only reduces the constant factor, whereas the algorithm changes the order of the complexity itself.

#### 2.1.1 The RAM Model

The **RAM (Random Access Machine)** is the standard computational model for theoretical analysis. Each basic operation (assignment, comparison, arithmetic, array access) counts as one time unit, and memory access time is assumed to be constant regardless of the address. Basic operations include the four arithmetic operations, comparison, assignment, array indexing, and pointer dereferencing.

#### 2.1.2 Four Types of Complexity Analysis

| Type | Meaning | Typical Use |
|---|---|---|
| Worst-case | Guarantees an upper bound that no input can exceed. | The most commonly used type. |
| Average-case | Expresses the expected time under a probability distribution. | Practical, but complicated to compute. |
| Best-case | The case that runs fastest. | Not used as a basis for comparing algorithms. |
| Amortized | Analyzes the average over a sequence of operations. | Used for operations such as expanding a dynamic array. |

*Table 6. Four types of complexity analysis and where each is used*

The worst case is used most often because it guarantees performance. The promise that this algorithm never exceeds $n^2$ on any input is exactly what worst-case analysis provides.

### 2.2 Asymptotic Notation

The exact operation count (e.g., $T(n) = 3n^2 + 100n + 5000$) depends on implementation details, but when $n$ is large enough, only the highest-order term matters. Asymptotic notation is the tool that expresses this observation rigorously.

#### 2.2.1 Big-O: Asymptotic Upper Bound

**Definition:**

$$ O(g(n)) = \{ f(n) \mid \exists c > 0, n_0 \geq 0 \text{ s.t. } \forall n \geq n_0, f(n) \leq c \cdot g(n) \} $$

Intuitively, it means that $f$ does not grow faster than $g$, ignoring constant factors.

**Recipe for polynomial proofs:** For $f(n) = a_k n^k + \cdots + a_0$, choosing $c = |a_k| + |a_{k-1}| + \cdots + |a_0|$ and $n_0 = 1$ gives $f(n) \leq c \cdot n^k$ for all $n \geq 1$.

**Example:** $2n^2 - 8n + 3 = O(n^2)$ is proved with $c = 13$ and $n_0 = 1$. Indeed, $|2n^2 - 8n + 3| \leq 2n^2 + 8n + 3 \leq 13 n^2$ holds for all $n \geq 1$.

#### 2.2.2 Big-Omega: Asymptotic Lower Bound

$$ \Omega(g(n)) = \{ f(n) \mid \exists c > 0, n_0 \geq 0 \text{ s.t. } \forall n \geq n_0, f(n) \geq c \cdot g(n) \} $$

Intuitively, it means that $f$ does not grow slower than $g$.

#### 2.2.3 Theta: Tight Bound

$$ \Theta(g(n)) = O(g(n)) \cap \Omega(g(n)) $$

It means that $f$ and $g$ grow at the same rate, apart from constant factors.

**Distinguishing the three notations:**
- $O(n^2)$ means at most on the order of $n^2$.
- $\Omega(n^2)$ means at least on the order of $n^2$.
- $\Theta(n^2)$ means exactly on the order of $n^2$.

**Write tight bounds:** $n \log n = O(n^2)$ is true but so loose that it is useless. Write $O(n \log n)$ or $\Theta(n \log n)$ instead to convey information.

#### 2.2.4 Complexity Hierarchy

$$ O(1) \subset O(\log n) \subset O(\sqrt{n}) \subset O(n) \subset O(n \log n) \subset O(n^2) \subset O(n^3) \subset O(2^n) \subset O(n!) $$

**Growth by input size (to get a feel):**

| n | $\log n$ | $n$ | $n \log n$ | $n^2$ | $2^n$ |
|---|---|---|---|---|---|
| 10 | 3.3 | 10 | 33 | 100 | 1,024 |
| 100 | 6.6 | 100 | 664 | $10^4$ | $10^{30}$ |
| $10^6$ | 20 | $10^6$ | $2 \cdot 10^7$ | $10^{12}$ | - |

*Table 7. Growth of each function by input size*

**Sorting one billion elements** (on a PC performing $10^8$ operations per second):
- An $O(n^2)$ algorithm takes about 300 years, which is infeasible.
- An $O(n \log n)$ algorithm finishes in about 5 minutes.

This is why Week 3 abandons the $O(n^2)$ sorts (selection, bubble, insertion) in favor of the $O(n \log n)$ sorts (merge, quick, heap).

### 2.3 Recurrences and Recursive Analysis

A **recurrence relation** is an equation that expresses the value of a function in terms of its values on smaller inputs.

**Examples:** The following are typical recurrences.
- $T(n) = T(n-1) + c$ has the factorial form.
- $T(n) = 2T(n/2) + n$ is the recurrence of merge sort.
- $T(n) = T(n/2) + 1$ is the recurrence of binary search.

Solving a recurrence means expressing it in closed form, for example as $T(n) = \Theta(n \log n)$.

#### 2.3.1 Method 1: Repeated Substitution

Expand the recurrence step by step, find the pattern, and generalize.

Assume $T(n) = 2T(n/2) + n$, $T(1) = 1$, $n = 2^k$:

$$
\begin{aligned}
T(n) &= 2T(n/2) + n \\
 &= 2(2T(n/4) + n/2) + n = 4T(n/4) + 2n \\
 &= 8T(n/8) + 3n \\
 &\vdots \\
 &= 2^k T(n/2^k) + kn
\end{aligned}
$$

Since $2^k = n$, $k = \log_2 n$:

$$ T(n) = n \cdot T(1) + n \log_2 n = \Theta(n \log n) $$

#### 2.3.2 Method 2: Guess and Prove by Induction

Proof that $T(n) = O(n \log n)$ for $T(n) = 2T(n/2) + n$:

**Base case:** $T(2) = 4$. If $c \geq 2$, then $4 \leq 2c \cdot \log 2 = 2c$ holds.

**Inductive hypothesis:** $T(n/2) \leq c(n/2) \log(n/2)$.

**Inductive step:**
$$
\begin{aligned}
T(n) &= 2T(n/2) + n \\
 &\leq 2 \cdot c(n/2) \log(n/2) + n \\
 &= cn(\log n - \log 2) + n \\
 &= cn \log n - cn + n \\
 &\leq cn \log n \quad (c \geq 1)
\end{aligned}
$$

**Common mistake:** When a leftover term remains in the inductive step, as in $cn \log n + 1$, do not dismiss it on the grounds that it is Big-O anyway. Instead, **strengthen** the guess to $cn \log n - d$ to leave room for absorbing the leftover term.

#### 2.3.3 Method 3: The Master Theorem

**Form:** $T(n) = a \cdot T(n/b) + f(n)$ ($a \geq 1$, $b > 1$)

**Comparison function:** $h(n) = n^{\log_b a}$ (the leaf cost of the recursion tree)

**Three cases:**

| Case | Condition | Result | Meaning |
|---|---|---|---|
| **1** | $f(n) = O(n^{\log_b a - \varepsilon})$ for some $\varepsilon > 0$ | $T(n) = \Theta(n^{\log_b a})$ | Leaf cost dominates |
| **2** | $f(n) = \Theta(n^{\log_b a})$ | $T(n) = \Theta(n^{\log_b a} \log n)$ | Costs balanced across levels |
| **3** | $f(n) = \Omega(n^{\log_b a + \varepsilon})$ + regularity condition | $T(n) = \Theta(f(n))$ | Root cost dominates |

*Table 8. The three cases of the Master Theorem*

**Regularity condition (Case 3):** $a f(n/b) \leq c f(n)$ must hold for some $c < 1$. This means that the cost per level of the recursion tree decreases geometrically.

**Catalog of key examples:**

| Recurrence | $a, b$ | $n^{\log_b a}$ | $f(n)$ | Case | Result |
|---|---|---|---|---|---|
| $T(n) = 2T(n/2) + n$ | 2, 2 | $n$ | $n$ | 2 | $\Theta(n \log n)$ |
| $T(n) = T(n/2) + 1$ | 1, 2 | $1$ | $1$ | 2 | $\Theta(\log n)$ |
| $T(n) = 2T(n/2) + 1$ | 2, 2 | $n$ | $1$ | 1 | $\Theta(n)$ |
| $T(n) = 4T(n/2) + n$ | 4, 2 | $n^2$ | $n$ | 1 | $\Theta(n^2)$ |
| $T(n) = 4T(n/2) + n^2$ | 4, 2 | $n^2$ | $n^2$ | 2 | $\Theta(n^2 \log n)$ |
| $T(n) = 3T(n/4) + n^2$ | 3, 4 | $n^{0.79}$ | $n^2$ | 3 | $\Theta(n^2)$ |

*Table 9. Examples of applying the Master Theorem*

**When the Master Theorem cannot be used:**
- $T(n) = T(n-1) + \Theta(n)$ becomes $\Theta(n^2)$ by repeated substitution.
- $T(n) = T(n-1) + T(n-2) + 1$ becomes $\Theta(\phi^n)$ by solving the characteristic polynomial.
- $T(n) = T(n/5) + T(7n/10) + n$ becomes $\Theta(n)$ by induction and a geometric series.

The Master Theorem is the key tool for analyzing the divide-and-conquer algorithms of Week 4.

### 2.4 Six Algorithm Design Techniques

| Technique | English Name | Key Idea | Representative Examples |
|---|---|---|---|
| Divide and conquer | Divide and Conquer | Divide, conquer, and combine. | Merge sort, quick sort, binary search |
| Greedy algorithm | Greedy | Choose the local optimum at each step. | Dijkstra, Huffman, MST |
| Dynamic programming | Dynamic Programming | Store subproblem results and reuse them. | LCS, knapsack, edit distance |
| Approximation algorithm | Approximation | Find approximate solutions to NP-hard problems. | TSP approximation |
| Backtracking | Backtracking | Add pruning to exhaustive search. | N-Queen |
| Branch and bound | Branch and Bound | Add bounds to backtracking to reduce the search. | Exact TSP |

*Table 10. Six techniques of algorithm design*

Of these, the three core techniques this course focuses on are divide and conquer (Week 4), greedy (Week 5), and dynamic programming (Week 6).

### 2.5 Wrap-Up

The big picture of Week 2 is as follows. To compare algorithms independently of hardware, the operation count is expressed as a function of the input $n$; Big-O is an upper bound, $\Omega$ a lower bound, and $\Theta$ a tight bound. Recurrences are the tool for analyzing recursive algorithms, and the Master Theorem is the standard tool for solving divide-and-conquer recurrences. Algorithm design converges on three core paradigms: divide and conquer, greedy, and DP.

---

<br>

## 3. Data Structures and Basic Sorting

### 3.1 Core Data Structures

#### 3.1.1 Array vs Linked List

| Operation | Array | Linked List |
|---|---|---|
| **Index access** | **O(1)** | O(n) |
| **Insertion/deletion in the middle** | O(n) | **O(1)** (if the position is known) |
| **Memory** | Contiguous (cache-friendly) | Scattered (pointer overhead) |
| **Resizing** | Amortized O(1) with a dynamic array | Naturally flexible |

*Table 11. Operation-by-operation comparison of arrays and linked lists*

#### 3.1.2 Stack: LIFO

**LIFO (Last In, First Out)** describes a data structure in which the most recently inserted element comes out first.

```text
    ┌─────┐
    │  C  │ ← top (push / pop)
    ├─────┤
    │  B  │
    ├─────┤
    │  A  │ ← bottom
    └─────┘
```

*Figure 2. Top and bottom of a stack*

**Operations:** `push`, `pop`, `peek`, and `isEmpty` are all $O(1)$.

**Practical uses:** The function call stack, bracket matching (`({[]})`), Undo (Ctrl+Z) in editors, DFS implementation, and expression evaluation (infix → postfix conversion).

#### 3.1.3 Queue: FIFO

**FIFO (First In, First Out)** describes a data structure in which the earliest inserted element comes out first.

```text
dequeue ←── [ A | B | C | D ] ←── enqueue
            front        rear
```

*Figure 3. Front and rear of a queue and the enqueue and dequeue directions*

**Practical uses:** Breadth-first search (BFS), printer queues, CPU scheduling, and message queues (Kafka, RabbitMQ).

#### 3.1.4 Heap: Priority Queue

A heap is a **complete binary tree** that satisfies the **heap property**.

- In a **max-heap**, each parent key is greater than or equal to its child keys, and the maximum is at the root.
- In a **min-heap**, each parent key is less than or equal to its child keys, and the minimum is at the root.

**Array representation (1-indexed):**
- The left child of node $i$ is $A[2i]$.
- The right child of node $i$ is $A[2i+1]$.
- The parent of node $i$ is $A[\lfloor i/2 \rfloor]$.

**Operation complexity:**
- `insert(x)` and `extractMin/Max` are each $O(\log n)$.
- `getMin/Max` is $O(1)$.
- `buildHeap` is $O(n)$. Intuitively it seems to be $O(n \log n)$, but a tight analysis that accounts for most nodes having small height and thus small heapify cost (leaves need no heapify at all) reduces it to $O(n)$.

**Practical uses:** It is the foundation of priority queues, heap sort, Dijkstra's algorithm, and Huffman coding.

### 3.2 Basic Sorting: $\Theta(n^2)$

All three sorts in this section follow the recurrence $T(n) = T(n-1) + \Theta(n) = \Theta(n^2)$, because the problem size shrinks by only 1 at each step.

#### 3.2.1 Selection Sort

In each round, this sort finds the maximum (or minimum) of the remaining part and sends it to its correct position.

```text
selectionSort(A[], n):
    for last = n downto 2:
        k = index of the maximum in A[1..last]
        swap A[k] ↔ A[last]
```

**Characteristics:** The best, average, and worst cases are all $\Theta(n^2)$ regardless of input order, and the number of swaps is at most $n-1$. It is an unstable sort and uses only $O(1)$ extra memory (in-place sort).

#### 3.2.2 Bubble Sort

This sort compares two adjacent elements and swaps them if they are out of order. Large elements are pushed toward the end like rising bubbles.

```text
bubbleSort(A[], n):
    for last = n downto 2:
        for i = 1 to last-1:
            if A[i] > A[i+1]:
                swap A[i] ↔ A[i+1]
```

**Optimization:** With a `swapped` flag, if no swap occurs during a pass, the array is already sorted, so the algorithm terminates early. This achieves $\Theta(n)$ in the best case.

**Characteristics:** The worst and average cases are $\Theta(n^2)$, and the optimized best case is $\Theta(n)$. Since it swaps only when `A[i] > A[i+1]`, it is a stable sort, and it is in place.

#### 3.2.3 Insertion Sort

Like sorting the cards in your hand during a card game, this sort inserts each new element into its correct position in the already sorted part.

```text
insertionSort(A[], n):
    for i = 2 to n:
        key = A[i]
        j = i - 1
        while j ≥ 1 and A[j] > key:
            A[j+1] = A[j]       # shift right
            j = j - 1
        A[j+1] = key            # insert at the correct position
```

**Example:** For `[29, 10, 14, 37, 13]`, it proceeds as follows.
1. Inserting `10` gives `[10, 29 | 14, 37, 13]`.
2. Inserting `14` gives `[10, 14, 29 | 37, 13]`.
3. Inserting `37` gives `[10, 14, 29, 37 | 13]`.
4. Inserting `13` gives `[10, 13, 14, 29, 37]`.

**Complexity:**

| Case | Number of Comparisons | Result |
|---|---|---|
| Worst (reverse-sorted input) | $n(n-1)/2$ | $\Theta(n^2)$ |
| Average | $n(n-1)/4$ | $\Theta(n^2)$ |
| Best (already sorted input) | $n-1$ | $\Theta(n)$ |

*Table 12. Number of comparisons of insertion sort in each case*

**Characteristics:** It is both stable and in place. It is very fast in practice on small, nearly sorted data, so it serves as the internal base case of practical sorts such as Timsort.

### 3.3 Advanced Sorting: $\Theta(n \log n)$

All three algorithms follow the recurrence $T(n) = 2T(n/2) + \Theta(n) = \Theta(n \log n)$, and their common structure is splitting the problem in half.

#### 3.3.1 Merge Sort

**Divide-and-conquer strategy:** Split the array in half, sort each half recursively, and then merge the two sorted subarrays.

```text
mergeSort(A, p, r):
    if p < r:
        q = ⌊(p+r)/2⌋
        mergeSort(A, p, q)
        mergeSort(A, q+1, r)
        merge(A, p, q, r)
```

**Merge procedure:** Compare the heads of the two sorted subarrays, copy the smaller one to the result array, and advance the corresponding pointer; the total cost is $O(n)$.

**Example:** For the array `[31, 3, 65, 73, 8, 11, 20, 29, 48, 15]`, it proceeds as follows.

```text
Divide:
[31, 3, 65, 73, 8]    [11, 20, 29, 48, 15]
   ↓ recurse          ↓ recurse
[3, 8, 31, 65, 73]    [11, 15, 20, 29, 48]
        ↓ merge
[3, 8, 11, 15, 20, 29, 31, 48, 65, 73]
```

*Figure 4. Splitting, recursive sorting, and merging in merge sort*

**Characteristics:** Performance is guaranteed at $\Theta(n \log n)$ in the worst, average, and best cases, and it is a stable sort. It needs an $O(n)$ auxiliary array for merging, and because it accesses the array sequentially, it has good cache efficiency and suits disk-based external sorting well.

#### 3.3.2 Quick Sort

Quick sort is an inverted form of divide and conquer: the split (partition) is the hard part, while the merge step is trivial.

```text
quickSort(A, p, r):
    if p < r:
        q = partition(A, p, r)
        quickSort(A, p, q-1)
        quickSort(A, q+1, r)

partition(A, p, r):         # Lomuto partition
    pivot = A[r]
    i = p - 1
    for j = p to r-1:
        if A[j] ≤ pivot:
            i = i + 1
            swap A[i] ↔ A[j]
    swap A[i+1] ↔ A[r]
    return i + 1
```

**Partition invariant:** The following three conditions hold during the partition loop.
- Every element of $A[p \ldots i]$ is at most the pivot.
- Every element of $A[i+1 \ldots j-1]$ is greater than the pivot.
- $A[j \ldots r-1]$ is the region not yet examined.

**Complexity:**

| Case | Split Shape | Complexity |
|---|---|---|
| Worst | 0 : n-1 (bad pivot on sorted input) | $\Theta(n^2)$ |
| Average | Random pivot | $\Theta(n \log n)$ |
| Best | Perfect middle split | $\Theta(n \log n)$ |

*Table 13. Complexity of quick sort by split shape*

**Why even a 1:9 imbalance gives $\Theta(n \log n)$:** The recursion depth is $\log_{10/9} n = O(\log n)$, so only the base of the logarithm changes, and the work per level is $\Theta(n)$, so the total cost is $\Theta(n \log n)$.

**Avoiding the worst case:**
- **Random pivot:** Choose a random index, swap it with the last element, and then partition.
- **Median-of-3:** Use the median of the first, middle, and last elements as the pivot.
- **Introsort:** Switch to heap sort when the recursion depth exceeds a certain level (used by `std::sort` in the C++ STL).

**Characteristics:** It is unstable but in place, and it needs a recursion stack of about $O(\log n)$. Because it accesses the array sequentially, it is cache-friendly and is regarded as the fastest general-purpose sort in practice.

#### 3.3.3 Heap Sort

This sort turns the whole array into a max-heap with `buildHeap` and then repeatedly moves the root (the maximum) to the end.

```text
heapSort(A, n):
    buildHeap(A, n)              # O(n)
    for i = n downto 2:
        swap A[1] ↔ A[i]
        heapify(A, 1, i-1)       # O(log i)
```

**Explanation:** First, turn the whole array into a max-heap. Then swap the root (the maximum) to the end of the array to add it to the finalized region, and restore the heap property of the heap that has shrunk by one (`1..i-1`) with `heapify`. Repeating this places the large values one after another from the end toward the front, completing an array in ascending order. It works in place without extra memory.

**Why buildHeap is $O(n)$:** The $n/2$ leaf nodes need no heapify, there are $\approx n/2^{h+1}$ internal nodes of height $h$, and each heapify costs $O(h)$. Summing all of these gives $\sum_{h=1}^{\log n} \frac{n}{2^{h+1}} \cdot h = O(n)$, which is smaller than intuition suggests.

**Characteristics:** It guarantees $\Theta(n \log n)$ even in the worst case and is an in-place sort that uses only $O(1)$ space. However, it is unstable and has poor cache efficiency because it moves along the tree structure.

#### 3.3.4 Comparison of the Three Sorts

| Property | Merge Sort | Quick Sort | Heap Sort |
|---|---|---|---|
| Worst | $\Theta(n \log n)$ | **$\Theta(n^2)$** | $\Theta(n \log n)$ |
| Average | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ |
| Space | **$O(n)$** | $O(\log n)$ | **$O(1)$** |
| Stable | **Yes** | No | No |
| Cache | Good | **Very good** | Poor |
| Practical speed | Fast | **Fastest** | Moderate |

*Table 14. Properties of merge sort, quick sort, and heap sort*

**Selection guide:**
- If stability is required, use merge sort.
- If memory is constrained and a worst-case guarantee is needed, use heap sort.
- If the fastest sort is needed in general, use quick sort with a random pivot.

### 3.4 Lower Bound for Comparison-Based Sorting

**Theorem:** Any comparison-based sort needs $\Omega(n \log n)$ comparisons in the worst case.

**Proof sketch (decision tree model):**
- There must be $n!$ leaves corresponding to the $n!$ possible permutations.
- A binary decision tree of height $h$ has at most $2^h$ leaves.
- Therefore $h \geq \log_2(n!) = \Theta(n \log n)$ (by Stirling's approximation).

A sort that uses only comparisons can never break this lower bound. Counting sort and radix sort use additional information, such as the range of values or the digits, instead of comparisons, so they can bypass this lower bound.

### 3.5 Linear-Time Sorting: Bypassing the Comparison Lower Bound

#### 3.5.1 Counting Sort

When values lie in the range $[0, k]$, sorting takes $\Theta(n + k)$ time.

```text
countingSort(A, n, k):
    C[0..k] = 0
    for j = 1 to n: C[A[j]] += 1      # occurrence count
    for i = 1 to k: C[i] += C[i-1]    # prefix sum
    for j = n downto 1:               # reverse traversal (stability)
        B[C[A[j]]] = A[j]
        C[A[j]] -= 1
```

**Explanation:** (1) After counting how many times each value $v$ occurs, (2) converting the counts to prefix sums makes `C[v]` the **total number of elements at most $v$**, that is, the last position of value $v$ in the output array. (3) It traverses the input **from back to front**, places each element at `B[C[A[j]]]`, and decrements `C` by one. Sorting is completed only with information about the range of integer values, without comparisons, giving $\Theta(n+k)$.

**Why reverse traversal guarantees stability:** Among elements with the same value, the one that came later is placed later in the result array, so the input order is preserved. Traversing from the front reverses that order and makes the sort unstable.

#### 3.5.2 Radix Sort

This method repeats a stable sort (usually counting sort) digit by digit and must proceed **from the least significant digit (LSD) to the most significant digit (MSD)**.

```text
radixSort(A, d):
    for digit = 1 to d:
        A = stable_sort_by_digit(A, digit)
```

**Explanation:** It sorts $d$-digit integer keys **from the least significant digit to the most significant digit**. Each per-digit sort uses a **stable sort** (usually counting sort). The key insight is that the order established by the lower digits is preserved thanks to stability, so after sorting by a higher digit, the lower digits are already sorted. As a result, the final array is sorted on all digits.

Proceeding in LSD order is what lets the order from the previous digits survive, thanks to the stable sort.

**Complexity:** $\Theta(d(n+k))$, which becomes $\Theta(n)$ when $d$ and $k$ are constants.

### 3.6 Wrap-Up

The big picture of Week 3 is as follows. Data structures (arrays, linked lists, stacks, queues, heaps) are the tools that algorithms use. Sorts divide into $\Theta(n^2)$ basic sorts, $\Theta(n \log n)$ advanced sorts, and $\Theta(n)$ linear-time sorts. The comparison-based lower bound $\Omega(n \log n)$ is proved with the decision tree model, and counting sort and radix sort break this bound by avoiding comparisons. The worst, average, and best complexities of each sort, along with stability and whether it is in place, are frequent exam topics.

---

<br>

## 4. Divide and Conquer

### 4.1 The Divide-and-Conquer Paradigm

**Three steps:**
1. **Divide:** Split the problem into smaller subproblems.
2. **Conquer:** Solve each subproblem recursively.
3. **Combine:** Merge the subsolutions into a solution of the original problem.

**Required condition:** The subproblems must be independent of each other. If the subproblems overlap, DP must be used instead of divide and conquer.

**Typical recurrence:** It has the form $T(n) = a T(n/b) + f(n)$ and is solved with the Master Theorem.

### 4.2 Catalog of Representative Algorithms

| Algorithm | Divide | Conquer | Combine | Recurrence | Time |
|---|---|---|---|---|---|
| **Merge sort** | Split in half | Sort each half | Merge | $2T(n/2) + \Theta(n)$ | $\Theta(n \log n)$ |
| **Binary search** | Compare with middle | Recurse on **one side only** | Trivial | $T(n/2) + O(1)$ | $\Theta(\log n)$ |
| **Quick sort** (average) | Partition | Recurse on both sides | Trivial | $2T(n/2) + \Theta(n)$ | $\Theta(n \log n)$ |
| **Quick sort** (worst) | Unbalanced | - | - | $T(n-1) + \Theta(n)$ | $\Theta(n^2)$ |
| **Randomized select** | Partition | **One side only** | Trivial | $T(3n/4) + \Theta(n)$ | Average $\Theta(n)$ |
| **Median of medians** | Groups of 5 | Both | Partition | $T(n/5) + T(7n/10) + \Theta(n)$ | Worst $\Theta(n)$ |
| **Closest pair** | Split by x | Each half | Strip | $2T(n/2) + O(n \log n)$ | $O(n \log^2 n)$ |

*Table 15. Steps, recurrences, and time complexities of representative divide-and-conquer algorithms*

### 4.3 The Selection Problem

**Problem definition:** Find the $i$-th smallest element of an unsorted array. The question is whether this can be done without sorting the whole array ($O(n \log n)$).

#### 4.3.1 Randomized Select: Expected $\Theta(n)$

```text
select(A, p, r, i):
    if p == r: return A[p]
    q = partition(A, p, r)           # partition from quick sort
    k = q - p + 1
    if i == k: return A[q]
    elif i < k: return select(A, p, q-1, i)
    else:       return select(A, q+1, r, i-k)
```

**Explanation:** It reuses quick sort's `partition` to place the pivot in its final position and finds its rank $k$ (which smallest element the pivot is within A[p..r]). If $i = k$, the pivot is the answer. If $i < k$, the desired element is in the **left part**, so it recurses only on the left. If $i > k$, it recurses only on the right, but since $k$ elements (the left part and the pivot) have already been skipped, it adjusts the rank to look for to $i - k$. Because it never recurses on both sides, it runs in linear time on average.

Unlike quick sort, it makes a recursive call on only one side rather than both, so it is much faster on average.

**Analysis:** On average the problem size shrinks to at most $3n/4$, so the following holds.

$$ T(n) \leq T(3n/4) + \Theta(n) $$

Expanding it as a geometric series gives

$$ T(n) \leq cn + c \cdot \frac{3n}{4} + c \cdot \left(\frac{3}{4}\right)^2 n + \cdots = 4cn = \Theta(n) $$

as the result.

#### 4.3.2 Median of Medians: Worst-Case $\Theta(n)$

**Idea:** A method that always guarantees a balanced pivot.

1. Divide the elements into groups of 5, forming $\lceil n/5 \rceil$ groups.
2. Find the median of each group.
3. Recursively find the median $M$ of those medians.
4. Partition with $M$ as the pivot.
5. Recurse on the desired side.

**Guarantee:** At least $3n/10$ elements are at most $M$ and at least $3n/10$ are at least $M$, so the recursive size is at most $7n/10$.

**Recurrence:** $T(n) = T(n/5) + T(7n/10) + \Theta(n)$, and since $1/5 + 7/10 = 9/10 < 1$, the geometric series converges to $\Theta(n)$.

**Why groups of 5:** With groups of 3, $1/3 + 2/3 = 1$, which does not converge. 5 is the smallest group size that guarantees convergence.

### 4.4 Closest Pair of Points

**Problem definition:** Among $n$ points in the plane, find the two points with the smallest distance.

**Brute force:** Checking every pair takes $O(n^2)$. Is there a better way?

**Divide-and-conquer strategy:**
1. Sort the points by x-coordinate (preprocessing in $O(n \log n)$).
2. Split into left and right around the median x.
3. Recurse on each half to obtain $d_L, d_R$.
4. Set $d = \min(d_L, d_R)$.
5. Form a strip of the points within $d$ of the dividing line, and check whether any pair spanning the two halves is closer than $d$.

**Geometric property of the strip:** A $d \times 2d$ rectangle contains at most 8 points that are at least $d$ apart from each other. Therefore, after sorting the strip by y-coordinate, each point needs to check at most 7 neighbors in the y direction, so the strip check costs $O(n)$.

**Complexity:** The recurrence $T(n) = 2T(n/2) + O(n \log n)$ gives $O(n \log^2 n)$, and an optimization that preserves the strip's sorted order reduces it to $O(n \log n)$.

### 4.5 When Divide and Conquer Fails

Implementing Fibonacci with naive recursion looks as follows.

```python
def fib(n):
    if n <= 2: return 1
    return fib(n-1) + fib(n-2)
```

The recurrence is $T(n) = T(n-1) + T(n-2) + O(1)$, whose solution $O(\phi^n) \approx O(1.618^n)$ is exponential time.

**Cause:** The cause lies in overlapping subproblems, where the same subproblem is computed again and again. For example, $F(3)$ recurs all over the tree.

**Solution:** Such problems are solved with DP (Week 6).

**Distinguishing divide and conquer from DP:**
- If the subproblems are **independent**, use divide and conquer.
- If the subproblems **overlap**, DP must be used.

### 4.6 Wrap-Up

The big picture of Week 4 is as follows. Divide and conquer is the paradigm that recursively solves independent subproblems and combines the results. Representative algorithms include merge sort ($\Theta(n \log n)$), binary search ($\Theta(\log n)$), quick sort (average $\Theta(n \log n)$), randomized select ($\Theta(n)$), median of medians (worst-case $\Theta(n)$), and closest pair ($O(n \log^2 n)$). Problems with overlapping subproblems, such as Fibonacci, are solved with DP.

---

<br>

## 5. Greedy Algorithms

### 5.1 The Greedy Paradigm

A greedy algorithm makes, at each step, the choice that looks best right now (the local optimum). It never undoes a choice once made and does not backtrack.

```text
Greedy(C):
    S = {}
    while C is not empty and S is incomplete:
        x = the most promising element of C
        C = C - {x}
        if S ∪ {x} is feasible:
            S = S ∪ {x}
    return S
```

**Explanation:** This is the general greedy framework. It takes elements $x$ one at a time from the candidate set $C$, **choosing the one that looks best by some criterion (e.g., value/weight, finish time, edge weight)**, and adds it to the solution set $S$. **It never undoes a choice already made (no backtracking)**. The feasibility check avoids violating constraints (e.g., creating a cycle, exceeding capacity). For this simple loop to guarantee an optimal solution, the problem must satisfy the **greedy-choice property** and **optimal substructure**.

### 5.2 Two Conditions Required for Correctness

For a greedy algorithm to guarantee an optimal solution, both of the following conditions must hold.

1. **Greedy-choice property:** Some optimal solution includes the greedy choice. The standard technique for proving this is the exchange argument: show that replacing a non-greedy choice in an optimal solution with the greedy choice preserves optimality.
2. **Optimal substructure:** After making the greedy choice, the optimal solution of the remaining subproblem becomes part of the overall optimal solution.

**Practical principle:** Try greedy first, and switch to DP if a counterexample appears.

### 5.3 Cases Where Greedy Fails

| Problem | Greedy Choice | Result | Optimal Solution |
|---|---|---|---|
| Coins {1, 3, 4}, amount 6 | 4 + 1 + 1 = 3 coins | Fails | 3 + 3 = 2 coins |
| Coins {16, 10, 5, 1}, amount 20 | 16 + 1 + 1 + 1 + 1 = 5 coins | Fails | 10 + 10 = 2 coins |
| 0-1 knapsack (sorted by value/weight) | Choose the highest ratio first | Wasted capacity | DP required |
| Maximum path sum in a binary tree | Move to the larger child | Reaches only a local optimum | Misses the global optimum |

*Table 16. Cases where a greedy algorithm fails to produce an optimal solution*

For standard currencies such as the Korean won (500, 100, 50, 10), each denomination is a multiple of the next smaller one, so greedy is optimal; for non-standard denomination sets, always suspect a counterexample.

### 5.4 Catalog of Greedy Algorithms

#### 5.4.1 Coin Change (Standard Currency)

The simple rule is to choose the largest denomination first, and for a standard currency it obtains the optimal solution in $O(k)$ time.

#### 5.4.2 Fractional Knapsack

The knapsack problem in which items can be divided has an optimal greedy solution.

**Strategy:** Sort the items in descending order of value per unit weight ($v_i/w_i$) and put them into the knapsack in that order.

```text
FractionalKnapsack(items, C):
    compute v/w of each item, sort in descending order
    remaining capacity w = C
    for each item x (in sorted order):
        if w ≥ x.weight: take all of it
        else: take the fraction that fits the remaining capacity
```

**Example:** With capacity 40 and the items platinum (10kg, \$60), gold (15kg, \$75), silver (25kg, \$10), and tin (20kg, \$2), the ratios are 6, 5, 0.4, and 0.1.

| Order | Item | Action | Cumulative Value |
|---|---|---|---|
| 1 | Platinum (10kg) | Take all of it | \$60 |
| 2 | Gold (15kg) | Take all of it | \$135 |
| 3 | Silver (25kg) | Take only 0.6 to fill the remaining capacity | \$141 |

*Table 17. Greedy selection steps for a fractional knapsack of capacity 40*

**Time complexity:** The sorting step dominates, giving $O(n \log n)$.

When items cannot be divided, as in the 0-1 knapsack, greedy fails and DP must be used.

#### 5.4.3 Activity Selection

**Problem definition:** Select the maximum number of mutually non-overlapping activities on one machine.

**Greedy strategy:** Select activities starting from the one with the earliest finish time (EFT).

```text
ActivitySelection(jobs):
    sort by finish time in ascending order
    selected = {first activity}
    last_finish = finish time of the first activity
    for each remaining j:
        if j.start ≥ last_finish:
            selected += {j}
            last_finish = j.finish
    return selected
```

**Explanation:** After sorting by finish time, it traverses the activities and selects only those whose **start time is at or after** the finish time of the last selected activity (`last_finish`). Each time it selects one, it updates `last_finish`. Sorting in $O(n \log n)$ plus a linear scan in $O(n)$ gives $O(n \log n)$. It is concise because it checks each activity only once.

**Why EFT:** Choosing the activity that finishes earliest leaves the most time for the remaining activities.

**Exchange argument proof:** Compare an optimal solution $O$ with the greedy solution $G$. The first activity $g_1$ of $G$ finishes earliest among all activities, so $\text{finish}(g_1) \leq \text{finish}(o_1)$. By induction, one can show that $G$ selects at least as many activities as $O$.

#### 5.4.4 Job Scheduling (Not to Be Confused with Activity Selection)

**Problem definition:** Perform all jobs while minimizing the number of machines used.

**Greedy strategy:** Assign jobs starting from the one with the earliest start time (EST).

**Distinguishing it from activity selection:**

| Aspect | Job Scheduling | Activity Selection |
|---|---|---|
| Goal | Minimize the number of machines | Maximize the number of activities |
| Greedy criterion | EST (start time) | EFT (finish time) |

*Table 18. Goals and greedy criteria of job scheduling and activity selection*

#### 5.4.5 Huffman Coding: Optimal Prefix Codes

**Problem definition:** Compress a file by assigning variable-length binary codes based on character frequencies.

**Prefix property:** No code is a prefix of another code. Thanks to this property, decoding is possible without separators.

**Algorithm outline:** Repeatedly merge the two lowest-frequency nodes from a min-heap keyed by frequency.

```text
Huffman(C):
    Q = min-heap keyed by frequency (leaf = each character)
    while |Q| ≥ 2:
        A = extract-min(Q)
        B = extract-min(Q)
        N = new node with freq = A.freq + B.freq
        N.left = A, N.right = B
        insert(Q, N)
    return the root of Q
```

**Explanation:** From a min-heap whose leaf nodes are the characters, it extracts the **two lowest-frequency nodes**, makes a new internal node with their combined frequency, and puts it back into the heap. Nodes merged early (the lower-frequency ones) sit deep in the tree and get long codes, while the rest get short codes. After $n-1$ repetitions, a binary tree with a single root is complete. The sequence of 0s and 1s on the root→leaf path is each character's **prefix code**. The complexity is $O(n \log n)$ because the $O(\log n)$ heap operations are performed $n$ times.

**Example:** With character frequencies A:450, T:90, G:120, C:270, the tree is built as follows.

1. Merge T(90) and G(120), the two lowest frequencies, into a new node of frequency 210.
2. Merge the next lowest, 210 and C(270), into a node of frequency 480.
3. Finally, merge A(450) and 480 to complete the root of frequency 930.

**Assigned codes:**
- A is `0` (1 bit)
- C is `10` (2 bits)
- T is `110` (3 bits)
- G is `111` (3 bits)

**Bit count:** $450 \cdot 1 + 270 \cdot 2 + 90 \cdot 3 + 120 \cdot 3 = 1{,}620$ bits. Storing the text in 8-bit ASCII would have required $930 \cdot 8 = 7{,}440$ bits, so the compression ratio is about 21.8%.

**Complexity:** It performs $n-1$ extracts and inserts on the heap, so it is $O(n \log n)$.

**Proof of optimality:** It is proved with an exchange argument. The key point is that even in an optimal tree, the two lowest-frequency characters must be sibling leaves sharing the same parent.

### 5.5 Minimum Spanning Tree (MST)

**Problem definition:** In a connected weighted graph, find the tree ($n-1$ edges) with the minimum total weight that connects all vertices.

#### 5.5.1 Kruskal: Edge-Centric

```text
KruskalMST(G):
    sort edges by weight in ascending order
    T = {}
    initialize Union-Find
    for each edge (u, v) (ascending):
        if find(u) ≠ find(v):          # no cycle
            T += {(u, v)}
            union(u, v)
    return T
```

**Explanation:** This is an edge-centric approach. After sorting all edges by weight in ascending order, it examines them in order and **adds an edge to the tree if it does not create a cycle**. The cycle check uses Union-Find's `find` to see whether the two endpoints already belong to the same connected component. When an edge is added, `union` merges the two components. Selecting $n-1$ edges completes the MST. It is a process in which **small forests gradually merge** into one tree.

**Data structure:** It uses Union-Find, which handles cycle detection in nearly constant time, $O(\alpha(n))$.

**Complexity:** Sorting dominates, giving $O(m \log m)$.

**Best suited for:** Sparse graphs with few edges.

#### 5.5.2 Prim: Vertex-Centric

```text
PrimMST(G, s):
    D[v] = ∞ for all v; D[s] = 0
    T = {s}
    while |T| < n:
        u = vertex outside T with the minimum D[u]
        T += {u}
        for each neighbor v of u (v ∉ T):
            if weight(u,v) < D[v]:
                D[v] = weight(u,v)
                parent[v] = u
    return the MST edges
```

**Explanation:** This is a vertex-centric approach. Starting from the start vertex $s$, it **grows a single tree**. For each vertex $v$, it maintains $D[v]$, the minimum weight of an edge connecting the current tree to $v$. In each iteration, it adds to the tree the vertex $u$ with the minimum $D$ among the vertices not yet in the tree, and lowers the $D$ values of $u$'s neighbors where possible. It repeats until every vertex is in the tree.

**Data structure:** It uses a priority queue.

**Complexity:** $O(n^2)$ with an array-based implementation and $O(m \log n)$ with a binary heap.

**Best suited for:** Dense graphs with many edges.

#### 5.5.3 Comparing Kruskal and Prim

| Aspect | Kruskal | Prim |
|---|---|---|
| Approach | Edge-centric | Vertex-centric |
| Data structure | Union-Find | Priority queue |
| Complexity | $O(m \log m)$ | $O(n^2)$ or $O(m \log n)$ |
| Suitable graph | Sparse | Dense |
| Construction | Several forests merge into a tree | One tree grows gradually |

*Table 19. Comparison of Kruskal's and Prim's algorithms*

### 5.6 Dijkstra: Shortest Paths

**Problem definition:** Find the shortest paths from a source vertex $s$ to all other vertices. The edge weights must be non-negative.

**Algorithm:**
```text
Dijkstra(G, s):
    D[v] = ∞; D[s] = 0; S = {}
    while S ≠ V:
        u = vertex outside S with the minimum D[u]
        S += {u}
        for each neighbor v of u (v ∉ S):        # edge relaxation (Relax)
            if D[u] + w(u,v) < D[v]:
                D[v] = D[u] + w(u,v)
                parent[v] = u
```

**Explanation:** It maintains the shortest distances $D[\cdot]$ from $s$, and at each step **finalizes the vertex $u$ with the minimum $D$ among the vertices not yet finalized** (adding it to the set $S$). It then performs **edge relaxation** on each neighbor $v$ of $u$, updating $D[v]$ if the path through $u$ is shorter than the current $D[v]$. Thanks to the non-negative weight assumption, the greedy invariant holds: the $D$ value of a vertex added to $S$ never changes afterward.

**Greedy invariant:** If $u \in S$, then $D[u]$ is the true shortest distance from $s$ to $u$.

**Why it fails with negative edges:** Dijkstra assumes that a finalized $D[u]$ never changes afterward. With negative edges, however, a shorter path may be discovered later, breaking this assumption. In that case, the Bellman-Ford algorithm ($O(VE)$) must be used.

**Similarity to Prim's algorithm:**

| Aspect | Prim | Dijkstra |
|---|---|---|
| Invariant | $T$ is the set of vertices included in the MST. | $S$ is the set of vertices whose shortest distance is finalized. |
| Meaning of $D[v]$ | The minimum weight of an edge connecting $v$ to the current tree. | The shortest distance from the source $s$. |
| Operation pattern | Extract minimum → extend tree → update neighbors | Extract minimum → finalize distance → relax edges |

*Table 20. Invariants and operation patterns of Prim's and Dijkstra's algorithms*

They are structurally almost identical; the only difference is what updating the neighbors means.

### 5.7 Wrap-Up

The big picture of Week 5 is as follows. A greedy algorithm chooses the local optimum at each step. Correctness requires both the greedy-choice property (proved with an exchange argument) and optimal substructure. Representative algorithms are activity selection (EFT), the fractional knapsack (value/weight ratio), Huffman coding (merging the lowest frequencies), the MST algorithms of Kruskal and Prim, and Dijkstra's shortest paths. Coin change (arbitrary denominations) and the 0-1 knapsack, where greedy fails, must be solved with DP.

---

<br>

## 6. Dynamic Programming

### 6.1 The Essence of DP

Dynamic programming (DP) is a technique that reduces exponential recursion to polynomial time by solving each overlapping subproblem only once, storing the result, and reusing it.

The term "programming" refers not to computer programming but to mathematical tabulation (tabular optimization); Richard Bellman introduced the term in the 1950s.

### 6.2 Two Required Conditions

1. **Optimal substructure:** The overall optimal solution consists of optimal solutions to subproblems.
2. **Overlapping subproblems:** The same subproblem is computed repeatedly in the recursive structure.

Comparing these two conditions with those of the other paradigms gives the following.
- Divide and conquer needs only optimal substructure, and its subproblems must be independent.
- Greedy needs both optimal substructure and the greedy-choice property.
- DP is used when optimal substructure and overlapping subproblems are both present.

### 6.3 Two Implementation Strategies

#### 6.3.1 Memoization: Top-Down

This approach combines recursive calls with a cache, and the call structure naturally explores the subproblems in the shape of a DAG.

```python
def fib_memo(n, memo=None):
    if memo is None: memo = {}
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]
```

**Explanation:** It keeps the recursive structure and adds a **cache (the dictionary `memo`)**. Each call to `fib_memo(k)` first looks up the cache: if the value is there, it returns immediately; otherwise it computes the value recursively and stores it. As a result, each value of $k$ is computed **exactly once**, reducing $O(2^n) \to O(n)$.

**Advantages:** It computes only the subproblems that are actually needed, and the implementation is intuitive.

**Disadvantages:** It has recursive call stack overhead and may hit the depth limit.

#### 6.3.2 Tabulation: Bottom-Up

This approach fills the table in order with a loop, starting from the base cases.

```python
def fib_tab(n):
    if n <= 1: return n
    dp = [0] * (n+1)
    dp[1] = 1
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

**Explanation:** Without recursion, it fills $dp[i]$ in order with **a loop from 0 to $n$**. Each $dp[i]$ refers only to the already computed $dp[i-1]$ and $dp[i-2]$, so filling the table in dependency order is sufficient. There is no stack overhead, and sequential array access maximizes cache efficiency.

**Advantages:** There is no recursion overhead, sequential array access gives good cache efficiency, and it runs fast in practice.

**Disadvantages:** It must compute every subproblem, and the computation order must be determined explicitly.

#### 6.3.3 Comparison

| | Memoization | Tabulation |
|---|---|---|
| Direction | Top-down (large → small) | Bottom-up (small → large) |
| Implementation | Recursion + cache | Loop |
| Subproblems | Only those needed (lazy) | All computed |
| Overhead | Recursion stack, lookups | Tight loop |
| In practice | Easier | Faster |

*Table 21. Comparison of memoization and tabulation*

### 6.4 The Six-Step DP Recipe

Approach every DP problem with the following six steps.

1. **Define the subproblem:** Decide exactly what `dp[i, j, ...]` means.
2. **Write the recurrence:** Decide how to express the subproblem in terms of smaller subproblems.
3. **Identify the base cases:** Decide the boundary values at which the recursion ends trivially.
4. **Determine the computation order:** Decide the order of solving subproblems so that dependencies are satisfied.
5. **Extract the answer:** Identify which cell of the table stores the final answer.
6. **(Optional) Backtrack:** If the actual solution, not just its value, must be recovered, design the backtracking path.

### 6.5 Catalog of Representative DP Problems

#### 6.5.1 Fibonacci: Warm-Up

**Subproblem:** $f[i]$ is the $i$-th Fibonacci number.

**Recurrence:** $f[i] = f[i-1] + f[i-2]$, with base cases $f[0] = 0$ and $f[1] = 1$.

**Complexity:** $O(n)$ time and $O(n)$ space. Keeping only two variables reduces the space to $O(1)$.

**Measured comparison ($n = 30$):**

| Method | Time |
|---|---|
| Naive recursion | About 150 ms, $O(2^n)$ |
| Memoization | About 0.005 ms, $O(n)$ |
| Tabulation | About 0.003 ms, $O(n)$ |

*Table 22. Running time of each Fibonacci implementation for $n = 30$*

#### 6.5.2 Longest Common Subsequence (LCS)

**Problem definition:** Find the longest common subsequence of two strings $X$ and $Y$.

**Subsequence vs substring:** A subsequence need not be contiguous. For example, the LCS of `"ABCBDAB"` and `"BDCABA"` is `"BCAB"` (length 4).

**Subproblem:** $c[i][j]$ is the length of the LCS of $X[1..i]$ and $Y[1..j]$.

**Recurrence:**
$$
c[i,j] = \begin{cases}
0 & i = 0 \text{ or } j = 0 \\
c[i-1, j-1] + 1 & X[i] = Y[j] \\
\max(c[i-1, j], c[i, j-1]) & X[i] \neq Y[j]
\end{cases}
$$

**Example:** The DP table for $X$ = `ABCBDAB` and $Y$ = `BDCAB` is as follows.

```text
      ""  B  D  C  A  B
  ""   0  0  0  0  0  0
  A    0  0  0  0  1  1
  B    0  1  1  1  1  2
  C    0  1  1  2  2  2
  B    0  1  1  2  2  3
  D    0  1  2  2  2  3
  A    0  1  2  2  3  3
  B    0  1  2  2  3  4
```

*Figure 5. LCS DP table for `ABCBDAB` and `BDCAB`*

**How to read the table:** Rows represent prefixes of $X$ (`A`, `AB`, `ABC`, and so on), and columns represent prefixes of $Y$ (`B`, `BD`, and so on). Each cell is the LCS length of the two corresponding prefixes. Row 0 and column 0 correspond to the empty string, so their values are 0. Interior cells are filled by referring to the upper-left, left, and upper cells according to the recurrence, and the bottom-right corner cell is the final answer.

**Answer:** $c[7][5] = 4$, and one LCS is `BCAB`.

**Backtracking:** Starting from $c[m][n]$, move diagonally and include the character when the characters match; otherwise, move toward the larger value (up or left).

**Complexity:** Both time and space are $O(mn)$.

**Applications:** Git diff, DNA sequence alignment, and variants of the edit distance problem.

#### 6.5.3 Edit Distance (Levenshtein)

**Problem definition:** Find the minimum number of operations to transform string $X$ into $Y$. The allowed operations are insertion, deletion, and substitution, each with cost 1.

**Subproblem:** $E[i][j]$ is the minimum number of operations to turn $X[1..i]$ into $Y[1..j]$.

**Recurrence:**
$$
E[i,j] = \begin{cases}
j & i = 0 \quad (\text{insert j}) \\
i & j = 0 \quad (\text{delete i}) \\
E[i-1, j-1] & X[i] = Y[j] \\
1 + \min(E[i-1, j], E[i, j-1], E[i-1, j-1]) & \text{else}
\end{cases}
$$

- $E[i-1, j] + 1$ denotes a deletion.
- $E[i, j-1] + 1$ denotes an insertion.
- $E[i-1, j-1] + 1$ denotes a substitution.

**Example:** The edit distance from `kitten` to `sitting` can be found with the following table.

```text
      ""  s  i  t  t  i  n  g
  ""   0  1  2  3  4  5  6  7
  k    1  1  2  3  4  5  6  7
  i    2  2  1  2  3  4  5  6
  t    3  3  2  1  2  3  4  5
  t    4  4  3  2  1  2  3  4
  e    5  5  4  3  2  2  3  4
  n    6  6  5  4  3  3  2  3
```

*Figure 6. Edit distance DP table for turning `kitten` into `sitting`*

**How to read the table:** Rows represent prefixes of $X$ (= `kitten`), and columns represent prefixes of $Y$ (= `sitting`). Each cell is the edit distance between the two prefixes. The value $j$ in row 0 means the $j$ insertions needed to turn the empty string into $Y[1..j]$, and the value $i$ in column 0 means the $i$ deletions needed to turn $X[1..i]$ into the empty string. An interior cell copies the diagonal value when the characters are equal; otherwise it adds 1 to the minimum of its upper, left, and diagonal neighbors.

**Answer:** $E[6][7] = 3$, and the operations are: substitute s for k, substitute i for e, and insert g at the end.

**Complexity:** Both time and space are $O(mn)$.

#### 6.5.4 0-1 Knapsack

**Problem definition:** Given $n$ items (each with weight $w_i$ and value $v_i$) and a knapsack capacity $C$, maximize the total value under the condition that items cannot be divided.

**Subproblem:** $K[i, w]$ is the maximum value when considering items $1..i$ with capacity $w$.

**Recurrence:**
$$
K[i, w] = \begin{cases}
0 & i = 0 \text{ or } w = 0 \\
K[i-1, w] & w_i > w \\
\max(K[i-1, w], K[i-1, w - w_i] + v_i) & \text{else}
\end{cases}
$$

**Decision:** For each item, decide whether to include it in the knapsack or exclude it.

**Example:** With items (weight, value) $(2, 12), (1, 10), (3, 20), (2, 15)$ and capacity $C = 5$, the DP table is as follows.

```text
      0   1   2   3   4   5
 0    0   0   0   0   0   0
 1    0   0  12  12  12  12
 2    0  10  12  22  22  22
 3    0  10  12  22  30  32
 4    0  10  15  25  30  37
```

*Figure 7. DP table of a 0-1 knapsack with capacity 5*

**How to read the table:** Row $i$ means that only items $1..i$ are considered, and column $w$ is the current knapsack capacity. Each cell is the maximum value obtainable under those conditions. Row 0 and column 0 are base cases (no items or zero capacity), so their value is 0. An interior cell takes the larger of $K[i-1][w]$, the value without item $i$, and $v_i + K[i-1][w - w_i]$, the value with it. For example, $K[3][4] = \max(K[2][4] = 22,\; 20 + K[2][4-3] = 20 + 10 = 30) = 30$.

**Answer:** $K[4][5] = 37$.

**Backtracking:** If $K[i][w] \neq K[i-1][w]$, item $i$ was taken, so add it to the selected set and reduce $w$ to $w - w_i$.

**Complexity:** $O(nC)$, which is called pseudopolynomial time. It is polynomial in the numeric value $C$ but exponential in its bit length $\log C$.

**Space optimization:** Since the recurrence refers only to the previous row $i-1$, the table can be reduced to a 1D array. In that case, however, $w$ must be updated from right to left (in reverse order) so that the same item is not used more than once.

**Why greedy fails:** Taking items in descending order of value/weight ratio can leave capacity unused while the next item no longer fits. DP explores all partial solutions, so it handles such cases correctly.

#### 6.5.5 Coin Change (Minimum Number of Coins)

**Problem definition:** Given coin denominations $d_1, \ldots, d_k$ and an amount $n$, find the minimum number of coins that make $n$.

**Subproblem:** $C[j]$ is the minimum number of coins that make the amount $j$.

**Recurrence:** $C[j] = \min_{d_i \leq j} \{ C[j - d_i] + 1 \}$, with $C[0] = 0$.

**Example:** With denominations $\{1, 3, 4\}$ and amount 6, the DP table is as follows.

| $j$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| $C[j]$ | 0 | 1 | 2 | 1 | 1 | 2 | **2** |

*Table 23. Minimum number of coins for each amount with denominations {1, 3, 4}*

**Comparison with greedy:** Greedy chooses 4 + 1 + 1 = 3 coins, but DP finds the optimal solution 3 + 3 = 2 coins.

**Complexity:** $O(nk)$.

#### 6.5.6 Floyd-Warshall: All-Pairs Shortest Paths

**Problem definition:** Given a weighted directed graph, find the shortest distance between every pair of vertices.

**Subproblem:** $d[i, j, k]$ is the shortest distance among paths from $i$ to $j$ that use only $\{1, \ldots, k\}$ as intermediate vertices.

**Recurrence:** $d[i, j, k] = \min(d[i, j, k-1],\; d[i, k, k-1] + d[k, j, k-1])$.

**Implementation** (without a 3D array, to save space):
```text
FloydWarshall(W, n):
    D = W                            # copy the adjacency matrix
    for k = 1 to n:                  # [Caution] k must be outermost!
        for i = 1 to n:
            for j = 1 to n:
                D[i,j] = min(D[i,j], D[i,k] + D[k,j])
    return D
```

**Explanation:** $D$ is a 2D array that stores the all-pairs shortest distances when the set of intermediate vertices is $\{1..k\}$. Increasing $k$ one at a time, it checks for every $(i, j)$ whether the path through $k$ is shorter and updates accordingly. The reason overwriting the same 2D array $D$ instead of using a 3D array still gives the correct answer is that, during the $k$-th update, $D[i][k]$ and $D[k][j]$ keep the same values even if they are updated in the current iteration (passing through a vertex to reach itself is meaningless).

**Loop order:** $k$ must be the outermost loop. Because $k$ expands the set of allowed intermediate vertices, changing the order gives a wrong answer.

**Complexity:** $O(n^3)$ time and $O(n^2)$ space.

**Negative edges:** Negative edges are allowed as long as there is no negative cycle. A negative cycle can be detected by a diagonal entry $D[i][i] < 0$.

#### 6.5.7 Matrix Path (Maximum Sum)

**Subproblem:** $c[i, j]$ is the maximum cumulative sum from $(1,1)$ to $(i,j)$, moving only right or down.

**Recurrence:** $c[i, j] = m[i, j] + \max(c[i-1, j], c[i, j-1])$.

**Complexity:** Both time and space are $O(n^2)$.

### 6.6 Overview of DP Problems

| Problem | Subproblem | Recurrence | Time | Space |
|---|---|---|---|---|
| Fibonacci | $f[i]$ | $f[i-1] + f[i-2]$ | $O(n)$ | $O(1)$ |
| Matrix path | $c[i,j]$ | $m[i,j] + \max(c[i-1,j], c[i,j-1])$ | $O(n^2)$ | $O(n^2)$ |
| LCS | $c[i,j]$ | Branch on match/mismatch | $O(mn)$ | $O(mn)$ |
| Edit distance | $E[i,j]$ | min of insert, delete, substitute | $O(mn)$ | $O(mn)$ |
| 0-1 knapsack | $K[i,w]$ | max of include/exclude | $O(nC)$ | $O(nC)$ |
| Coins (minimum) | $C[j]$ | $\min(C[j-d_i]+1)$ | $O(nk)$ | $O(n)$ |
| Floyd-Warshall | $d[i,j,k]$ | With/without intermediate vertex $k$ | $O(n^3)$ | $O(n^2)$ |

*Table 24. Subproblems, recurrences, and complexities of representative DP problems*

### 6.7 Wrap-Up

**Big picture:** DP is a technique that uses optimal substructure and overlapping subproblems to reduce exponential-time recursion to polynomial time. The standard six-step recipe is: define the subproblem, derive the recurrence, set the base cases, determine the computation order, extract the answer, and backtrack. Master the seven classic problems: Fibonacci, matrix path, LCS, edit distance, 0-1 knapsack, coin change, and Floyd-Warshall.

---

<br>

## 7. Midterm Review: Synthesis

### 7.1 The Thread Running Through the Semester

```text
  Problem solving
     ↕
  Divide and conquer ←→ Recursive thinking ←→ Recurrences
     ↕
  Paradigm choice (Greedy / DP / D&C)
```

*Figure 8. The flow of concepts running through the whole semester*

Every algorithm shares **recursive thinking** that goes from a large problem → smaller problems → a combination. The differences between paradigms arise from whether the subproblems are independent and from the details of how the subproblems are defined.

### 7.2 Complexity Cheat Sheet

#### 7.2.1 Complexity Hierarchy

$$ O(1) \subset O(\log n) \subset O(\sqrt{n}) \subset O(n) \subset O(n \log n) \subset O(n^2) \subset O(n^3) \subset O(2^n) \subset O(n!) $$

#### 7.2.2 Complete Sorting Table

| Algorithm | Worst | Average | Best | Space | Stable | In Place |
|---|---|---|---|---|---|---|
| Selection | $\Theta(n^2)$ | $\Theta(n^2)$ | $\Theta(n^2)$ | $O(1)$ | ✗ | ✓ |
| Bubble | $\Theta(n^2)$ | $\Theta(n^2)$ | $\Theta(n)$ | $O(1)$ | ✓ | ✓ |
| Insertion | $\Theta(n^2)$ | $\Theta(n^2)$ | $\Theta(n)$ | $O(1)$ | ✓ | ✓ |
| Merge | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $O(n)$ | ✓ | ✗ |
| Quick | $\Theta(n^2)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $O(\log n)$ | ✗ | ✓ |
| Heap | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $O(1)$ | ✗ | ✓ |
| Counting | $\Theta(n+k)$ | $\Theta(n+k)$ | $\Theta(n+k)$ | $O(k)$ | ✓ | ✗ |
| Radix | $\Theta(d(n+k))$ | $\Theta(d(n+k))$ | $\Theta(d(n+k))$ | $O(n+k)$ | ✓ | ✗ |

*Table 25. Complexity, space, stability, and in-place property of each sorting algorithm*

#### 7.2.3 Master Theorem Quick Reference

$T(n) = a T(n/b) + f(n)$, $h = n^{\log_b a}$:

| $f$ vs $h$ | Result |
|---|---|
| $f = O(h/n^\varepsilon)$ | $\Theta(h)$ (Case 1) |
| $f = \Theta(h)$ | $\Theta(h \log n)$ (Case 2) |
| $f = \Omega(h \cdot n^\varepsilon)$ + regularity | $\Theta(f)$ (Case 3) |

*Table 26. Results of the Master Theorem by comparing $f$ with $h$*

#### 7.2.4 Recurrence Catalog

| Recurrence | Solution | Example |
|---|---|---|
| $T(n) = T(n/2) + 1$ | $\Theta(\log n)$ | Binary search |
| $T(n) = T(n-1) + 1$ | $\Theta(n)$ | Factorial |
| $T(n) = 2T(n/2) + n$ | $\Theta(n \log n)$ | Merge sort |
| $T(n) = 2T(n/2) + 1$ | $\Theta(n)$ | - |
| $T(n) = T(n-1) + n$ | $\Theta(n^2)$ | Insertion sort, quick sort worst case |
| $T(n) = 2T(n-1) + 1$ | $\Theta(2^n)$ | Tower of Hanoi |
| $T(n) = T(n-1) + T(n-2) + 1$ | $\Theta(\phi^n)$ | Naive recursive Fibonacci |

*Table 27. Common recurrences and their solutions*

### 7.3 Collection of DP Recurrences

- **LCS:** $c[i-1, j-1] + 1$ on a match, $\max(c[i-1, j], c[i, j-1])$ on a mismatch
- **Edit distance:** $E[i-1, j-1]$ on a match, $1 + \min$(three directions) on a mismatch
- **0-1 knapsack:** $\max(K[i-1, w], v_i + K[i-1, w - w_i])$
- **Matrix path:** $m[i,j] + \max(c[i-1,j], c[i,j-1])$
- **Coin change:** $1 + \min_{d_i \leq j} C[j - d_i]$
- **Floyd-Warshall:** $\min(d[i,j], d[i,k] + d[k,j])$ (k in the outer loop)

### 7.4 Common Mistakes and How to Prevent Them

| Mistake | Prevention |
|---|---|
| Confusing O vs Ω vs Θ | Memorize the definitions; distinguish one-sided from two-sided bounds |
| Loose Big-O | Always be tight (use Θ when needed) |
| Claiming greedy without proof | Search for a counterexample → if none, use an exchange argument |
| Wrong DP base case | Verify n=0,1,2 by hand |
| Off-by-one in the DP table | State 0-index vs 1-index explicitly |
| Fractional vs 0-1 knapsack | Divisible = greedy, indivisible = DP |
| Quick sort on sorted input | Random or median-of-3 pivot |
| Floyd-Warshall loop order | **k must be outermost** |
| Dijkstra + negative edges | Replace with Bellman-Ford |
| Induction: $cn+1 \leq cn$? | Strengthen the guess: $cn - d$ |
| Omitting merge sort's space | State the $O(n)$ auxiliary array explicitly |

*Table 28. Common mistakes and how to prevent them*

---

<br>

## 8. The Big Picture: How the Three Paradigms Relate

### 8.1 Comparing the Three Paradigms

| Aspect | Divide and Conquer | Greedy | DP |
|---|---|---|---|
| **Subproblems** | Independent (tree) | N/A | **Overlapping** (DAG) |
| **Approach** | Divide → conquer → combine | Choose the local optimum | Store and reuse subproblem results |
| **Direction** | Recursive (top-down) | Sequential | Bottom-up or memoization |
| **Optimality guarantee** | Problem-dependent | Requires the greedy-choice property | ✓ (optimal substructure) |
| **Time** | Typically $O(n \log n)$ | $O(n \log n)$ / $O(n)$ | $O(n^2)$ / $O(n^3)$ |
| **Space** | $O(\log n)$ stack | $O(1)$ ~ $O(n)$ | $O(n)$ ~ $O(n^2)$ |
| **Representative** | Merge, quick, binary search | Dijkstra, Huffman, MST | LCS, edit distance, knapsack, FW |

*Table 29. Aspect-by-aspect comparison of divide and conquer, greedy, and DP*

### 8.2 Decision Flowchart

```text
Does the problem ask for an optimal value?
├── No → D&C (sorting, searching, k-th element, etc.)
└── Yes
    ├── Can a safe greedy choice be proved?
    │   └── Yes → Greedy
    └── No
        ├── Do subproblems overlap?
        │   └── Yes → DP
        └── No → D&C
```

*Figure 9. Flowchart for choosing a paradigm from the properties of a problem*

### 8.3 Same Problem, Different Paradigms

| Problem | Greedy | DP | D&C |
|---|---|---|---|
| Coin change (standard) | ✓ | ✓ | - |
| Coin change (arbitrary) | ✗ | ✓ | - |
| Fractional knapsack | ✓ | ✓ | - |
| 0-1 knapsack | ✗ | ✓ | - |
| Shortest path (weights ≥ 0) | ✓ Dijkstra | ✓ | - |
| Shortest path (negative weights allowed) | - | ✓ Bellman-Ford, FW | - |
| Sorting | - | - | ✓ |
| k-th element | - | - | ✓ Select |
| MST | ✓ | - | - |
| LCS / edit distance | ✗ | ✓ | - |

*Table 30. Paradigms applicable to each problem*

### 8.4 Seven Key Connections

#### Connection 1: The Unity of Recursive Thinking
The Euclidean GCD (Week 1), merge sort (Week 4), and DP (Week 6) all share the structure of reducing a problem to smaller problems. Recursion is the basso continuo that runs through the whole course.

#### Connection 2: Divide and Conquer and Logarithmic Complexity
Binary search (Week 1), the counterfeit coin problem (Week 1), and merge sort (Week 4) all split the problem in half, and the total complexity is determined by $\log n$ levels × $O(n)$ or $O(1)$ per level.

#### Connection 3: The Switch from Greedy to DP
For coin change with arbitrary denominations and for the 0-1 knapsack, greedy fails, so one must switch to DP. This switch teaches the lesson of **moving from recognizing a counterexample to a generalized solution**.

#### Connection 4: The Hierarchy of the Comparison Lower Bound and Linear Sorting
The comparison-based $\Omega(n \log n)$ lower bound is a **limitation of the comparison model**. Changing the model to use information about digits or value ranges breaks this bound and makes $O(n)$ possible, which is what justifies counting sort and radix sort.

#### Connection 5: Prim ↔ Dijkstra ↔ Huffman
All three algorithms share the common pattern **extract minimum → finalize → update neighbors**. In other words, they stand on the same skeleton: a greedy framework based on a priority queue.

#### Connection 6: From the Limits of Divide and Conquer to DP
Divide and conquer handles independent subproblems, and DP handles overlapping ones. The $O(2^n)$ cost of naive recursive Fibonacci is a stark example of this boundary.

#### Connection 7: Complexity Analysis Connects Everything
Big-O, recurrences, and the Master Theorem (Week 2) are the tools for analyzing every algorithm from Week 3 through Week 7. Without the language of complexity, one cannot explain why one algorithm is better than another.

### 8.5 Advanced Tips for Writing Answers

#### Pattern 1: Start with "Why"

✗ "LCS is solved with DP."

✓ "LCS has two choices, depending on whether $X[i] = Y[j]$, and the same subproblem $(i', j')$ appears repeatedly along multiple paths. That is why solving it with DP reduces the cost from exponential to $O(mn)$."

#### Pattern 2: Trade-Offs

✗ "Quick sort is fast."

✓ "Quick sort averages $\Theta(n \log n)$, the same as merge sort, but it risks a worst case of $\Theta(n^2)$. A random pivot avoids this. Because it is an in-place sort, it is memory-efficient and is the most widely used sort in practice."

#### Pattern 3: Connecting Concepts

✗ "Prim finds an MST."

✓ "Prim is structurally identical to Dijkstra: both repeat extracting the minimum and updating neighbors. The only difference is the meaning of $D[v]$, which is the minimum edge to the tree in Prim and the shortest distance from $s$ in Dijkstra."

#### Pattern 4: Mentioning Limitations

✗ "Dijkstra finds shortest paths."

✓ "Dijkstra works only with **non-negative edges**. With negative edges, a finalized $D[u]$ may later become smaller, which breaks the greedy invariant. In that case, Bellman-Ford ($O(VE)$) must be used."

#### Pattern 5: Real-World Examples

✗ "LCS is O(mn)."

✓ "LCS underlies Git diff and is also used for DNA sequence alignment. It finds the common lines of two files and marks changes, additions, and deletions. If $O(mn)$ is too large, optimizations such as the Myers algorithm achieve $O((m+n)D)$ ($D$ = edit distance)."

---

<br>

## 9. Last-Minute Exam Checklist

### 9.0 Weekly Core Cheat Sheet

This table collects, week by week, the core information that must be found fastest during the exam.

| Week | Topic | Core Algorithms | Complexity |
|---|---|---|---|
| Week 2 | Complexity | Big-O, loop analysis | - |
| Week 3 | Sorting | Merge sort, quick sort, heap sort | $O(n \log n)$ |
| Week 4 | Divide and conquer | Binary search, closest pair, selection | $O(\log n)$, $O(n \log n)$, $O(n)$ |
| Week 5 | Greedy | Activity selection, Huffman, fractional knapsack, MST, Dijkstra | $O(n \log n)$ |
| Week 6 | DP | Fibonacci, LCS, 0-1 knapsack, edit distance, Floyd-Warshall | $O(n)$, $O(mn)$, $O(nW)$, $O(n^3)$ |

*Table 31. Topics, core algorithms, and complexities by week*

#### Five Exam Tips

```text
1. Complexity: notice the i *= 2 (log n) vs i += 1 (n) pattern
2. Sorting:    memorize each sort's time/space complexity AND stability
3. D&C:        write the recurrence first → apply the Master Theorem
4. Greedy:     explain "why" the greedy-choice property holds
5. DP:         subproblem definition → recurrence → base case → fill order
```

### 9.1 Common Mistakes

| Mistake | How to Avoid It |
|---|---|
| Confusing O, Ω, Θ | O = upper bound, Ω = lower bound, Θ = tight two-sided bound |
| Applying the Master Theorem when f(n) is not polynomial | Check the regularity condition; if it fails, use another method |
| Claiming greedy is optimal without proof | **Always look for a counterexample first** |
| Wrong base case in a DP recurrence | Verify by tracing small inputs (n=1, 2, 3) |
| Off-by-one errors in a DP table | **State explicitly** whether it is 0-indexed or 1-indexed |
| Confusing fractional vs 0-1 knapsack | Fractional = greedy, 0-1 = DP |
| Overlooking quick sort's worst case ($n^2$) | Avoid it with a random pivot or median-of-3 |

*Table 32. Common exam mistakes and how to avoid them*

### 9.2 Examples of Exam Question Types

The following are **three representative exam question types**.

#### Example 1: Complexity Analysis (Applying the Master Theorem)

**Problem:** Find the time complexity of the following recurrence with the Master Theorem.

$$ T(n) = 4T(n/2) + n $$

**Solution:**
- $a = 4$, $b = 2$, $f(n) = n$
- $n^{\log_b a} = n^{\log_2 4} = n^2$
- Compare $f(n) = n$ vs $n^2$
- $f(n) = O(n^{2-\varepsilon})$ ($\varepsilon = 1$) → **Case 1**
- **Answer:** $T(n) = \Theta(n^2)$.

#### Example 2: Greedy vs DP (Coin Change)

**Problem:** With denominations $\{1, 3, 4\}$ and an amount of 6 cents, find the way to make the amount with the fewest coins using greedy and DP, and compare the results.

**Greedy solution:**
- 4 (remaining: 2), 1 (remaining: 1), 1 (remaining: 0)
- Result: $\{4, 1, 1\}$ = **3 coins**

**DP solution:**

| j | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| C(j) | 0 | 1 | 2 | 1 | 1 | 2 | **2** |

*Table 33. DP table filled up to amount 6 with denominations {1, 3, 4}*

- $C(6) = 1 + \min(C(5), C(3), C(2)) = 1 + \min(2, 1, 2) = 2$
- Result: $\{3, 3\}$ = **2 coins**

**Conclusion:** Greedy finds 3 coins and DP finds 2, so greedy is not optimal for these denominations.

#### Example 3: DP

**Problem:** Find the LCS of $X$ = `ABCB` and $Y$ = `BDCAB` with a DP table.

**Table:**

| | "" | B | D | C | A | B |
|---|---|---|---|---|---|---|
| "" | 0 | 0 | 0 | 0 | 0 | 0 |
| A | 0 | 0 | 0 | 0 | **1** | 1 |
| B | 0 | **1** | 1 | 1 | 1 | **2** |
| C | 0 | 1 | 1 | **2** | 2 | 2 |
| B | 0 | 1 | 1 | 2 | 2 | **3** |

*Table 34. LCS DP table for `ABCB` and `BDCAB`*

**Answer:** The LCS length is 3, and one LCS is `BCB`.

**Backtracking:** When the characters match, move diagonally and include the character; otherwise, move to whichever of the two neighbors has the larger value.

### 9.3 Ten Paradigm Identification Exercises

These problems come from Week 7 Lab Exercise 2 and train the ability to decide which paradigm to use for a problem on the exam.

#### Problems 1-5

| # | Problem | Paradigm | Reason |
|---|---|---|---|
| 1 | Two Sum (n ≤ 100) | **Brute force** | $n^2 = 10{,}000$, so $O(n^2)$ is acceptable |
| 2 | Maximum subarray sum | **DP** (Kadane) or D&C | `dp[i] = max(a[i], dp[i-1]+a[i])` |
| 3 | Closest pair of points ($n \leq 10^5$) | **Divide and conquer** | Split by x, recurse on each half, check the strip. $O(n \log n)$ |
| 4 | Coin change {1, 5, 7, 10} | **DP** | Non-standard denominations, so greedy fails |
| 5 | Activity selection | **Greedy** | Sort by finish time ascending; EFT optimality is proved |

*Table 35. Paradigm identification exercises 1-5 and the paradigm for each*

**Problem 4:**
```text
Coins {1, 5, 7, 10}, amount 14

Greedy: 10 + 1 + 1 + 1 + 1 = 5 coins
DP:     7 + 7             = 2 coins  ← optimal!
```

#### Problems 6-10

| # | Problem | Paradigm | Reason |
|---|---|---|---|
| 6 | Permutation in String | **Brute force** (sliding window) | Check every window of length `len(s1)` |
| 7 | Longest increasing subsequence (LIS) | **DP** | `dp[i]` = length of the LIS ending at index i |
| 8 | Multiplying large numbers | **Divide and conquer** (Karatsuba) | Split the digits, 3 multiplications. $O(n^{1.585})$ |
| 9 | Minimum number of meeting rooms | **Greedy** | Event sweep: start +1, end -1, track the maximum |
| 10 | Edit distance | **DP** | A 2D table similar to LCS. `dp[i][j]` = minimum operations for the prefixes |

*Table 36. Paradigm identification exercises 6-10 and the paradigm for each*

#### Paradigm Decision Flowchart

```text
             Read the problem
                     │
                     ▼
     Small constraints (n ≤ hundreds)?
                   ╱    ╲
               Yes        No
                 │         │
                 ▼         ▼
            Brute force  Split into independent subproblems?
                           ╱         ╲
                        Yes           No
                         │             │
                         ▼             ▼
                Divide and conquer  Local optimum = global optimum?
                                   ╱        ╲
                                Yes          No
                                 │            │
                                 ▼            ▼
                              Greedy     Overlapping subproblems +
                                         optimal substructure?
                                              │
                                              ▼
                                             DP
```

*Figure 10. Flowchart for choosing a paradigm from the problem's conditions*

**Rule of thumb:** Try greedy first, and switch to DP if a counterexample is found.

### 9.4 Five Review Problems

These problems come from Week 7 Lab Exercise 3 and review the core concepts of each week.

#### Review 1: Complexity Analysis

**Problem:** Find the time complexity of the following function and the result of `mystery(16)`.

```python
def mystery(n):
    count = 0
    i = 1
    while i < n:        # outer loop
        j = 0
        while j < n:    # inner loop
            count += 1
            j += 1
        i *= 2           # key: i doubles each time
    return count
```

**Solution:**
```text
Outer loop: i = 1, 2, 4, 8, ..., until i ≥ n
            i doubles → O(log n) iterations
Inner loop: j = 0, 1, ..., n-1
            O(n) iterations per outer iteration
Total: O(n) × O(log n) = O(n log n)
```

**Trace of `mystery(16)`:**
```text
i = 1:   j over 0..15  → 16 times
i = 2:   j over 0..15  → 16 times
i = 4:   j over 0..15  → 16 times
i = 8:   j over 0..15  → 16 times
i = 16:  while condition fails, exit

count = 16 × 4 = 64
```

**Answer:** (a) $O(n \log n)$, (b) 64.

**Key point:** The `i *= 2` pattern repeats $\log n$ times and the `i += 1` pattern repeats $n$ times; these patterns appear frequently on exams.

#### Review 2: Merge Sort

**Problem:** Implement merge sort and count the number of merge operations.

```python
def merge_sort(arr):
    """Return (sorted array, merge count)."""
    if len(arr) <= 1:
        return arr[:], 0

    mid = len(arr) // 2
    left, lc = merge_sort(arr[:mid])
    right, rc = merge_sort(arr[mid:])

    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:      # <= (stability)
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j]); j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])

    return merged, lc + rc + 1
```

**Explanation:** It splits the array into two parts at the midpoint and calls itself recursively. It merges the two returned sorted subarrays with **two pointers**, adding the smaller of `left[i]` and `right[j]` to the result and advancing that pointer. The remaining elements are appended at the end with `extend`. The merge count is the sum of the left and right merge counts plus **1 for the current merge**. It uses `<=` for stability (the left element goes first when values are equal).

**Example:** The input `[38, 27, 43, 3, 9, 82, 10]` is sorted into `[3, 9, 10, 27, 38, 43, 82]`, and the merge count is 6, equal to the number of internal nodes of the recursion tree, $n-1$.

#### Review 3: Finding the Maximum with Divide and Conquer

**Problem:** Find the maximum of an array with divide and conquer and count the comparisons.

```python
def find_max_dc(arr):
    """Return (maximum, comparison count)."""
    comparisons = [0]

    def helper(a, lo, hi):
        if lo == hi:
            return a[lo]
        mid = (lo + hi) // 2
        left_max = helper(a, lo, mid)
        right_max = helper(a, mid + 1, hi)
        comparisons[0] += 1
        return left_max if left_max >= right_max else right_max

    return helper(arr, 0, len(arr) - 1), comparisons[0]
```

**Explanation:** It splits the array in half, recursively finds the maximum of the left and right halves, and returns the larger of the two with **one comparison**. The base case is a single element (`lo == hi`). The recurrence $T(n) = 2T(n/2) + 1$ falls under Case 1 of the Master Theorem ($f(n)=1$, $n^{\log_2 2}=n$), giving $\Theta(n)$. The number of comparisons is the number of internal nodes of the recursion tree, $n - 1$, which is exactly the minimum.

**Example:** The maximum of `[3, 7, 2, 9, 1, 8, 4, 6, 5]` is 9, and the total number of comparisons is 8, equal to $n - 1$, which is optimal.

**Recurrence:** $T(n) = 2T(n/2) + 1$, whose solution is $O(n)$.

**Takeaway:** The $n - 1$ comparisons equal those of a sequential scan. Divide and conquer is not necessarily faster, and finding the maximum is inherently $\Theta(n)$.

#### Review 4: Activity Selection

**Problem:** From a list of (start, end) lectures, select the **maximum number** of lectures that fit in one lecture room.

```python
def activity_selection(lectures):
    """Return (count, list of selected indices)."""
    indexed = [(end, start, i) for i, (start, end) in enumerate(lectures)]
    indexed.sort()                  # sort by finish time (EFT)

    selected = []
    last_end = -1
    for end, start, idx in indexed:
        if start >= last_end:
            selected.append(idx)
            last_end = end
    return len(selected), selected
```

**Explanation:** It converts each lecture into an `(end, start, original index)` tuple and **sorts by finish time** (Python sorts tuples by their first element). While traversing, it selects a lecture if its start is at least the previous `last_end` and updates `last_end` to the current finish time. The greedy choice of the lecture that ends earliest is optimal because it leaves the most time for the remaining lectures (exchange argument).

**Example:** For the lecture list `[(1,3),(2,5),(3,6),(5,7),(6,8),(8,10),(9,11)]`, the selected lectures are (1,3) → (3,6) → (6,8) → (8,10), 4 in total. A lecture that starts exactly when the previous one ends does not overlap it (`start >= last_end`).

**Key point:** It is a greedy algorithm based on EFT (Earliest Finish Time), and its time complexity is $O(n \log n)$, dominated by sorting.

#### Review 5: Climbing Stairs DP

**Problem:** There are $n$ stairs, and stair $i$ costs `cost[i]`. You climb 1 or 2 stairs at a time, starting from stair 0 or 1. Find the **minimum cost** to reach the top.

```python
def min_cost_climbing(cost):
    n = len(cost)
    if n <= 1:
        return cost[0] if n == 1 else 0

    prev2 = cost[0]        # dp[0]
    prev1 = cost[1]        # dp[1]

    for i in range(2, n):
        current = cost[i] + min(prev1, prev2)
        prev2, prev1 = prev1, current

    return min(prev1, prev2)    # to the top from the last or second-to-last stair
```

**Explanation:** $dp[i]$ is the cumulative minimum cost to arrive at stair $i$. The recurrence is $dp[i] = \text{cost}[i] + \min(dp[i-1], dp[i-2])$, choosing whichever of one stair back and two stairs back is cheaper. The top is reached by one more step from the last stair $n-1$ or the one before it, $n-2$, so the answer is $\min(dp[n-1], dp[n-2])$. **$O(1)$ space optimization:** Since the recurrence needs only the two previous values, it keeps just two variables (`prev1`, `prev2`) instead of an array.

**Examples:**
- The minimum cost for `[10, 15, 20]` is 15.
- The minimum cost for `[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]` is 6.

**Recurrence:** `dp[i] = cost[i] + min(dp[i-1], dp[i-2])`.

**Complexity:** $O(n)$ time and $O(1)$ space (keeping two variables is enough).

**Generalization:** Even in 2D DP, if the recurrence refers only to the previous row or the previous column, the space can be reduced to a 1D array.

### 9.5 Thirty Self-Check Questions

#### Week 1 Foundations
1. What are the five properties of an algorithm?
2. What is the basis for the correctness of the Euclidean GCD algorithm?
3. Why is the equality in `left <= right` needed in binary search?
4. Why are $\log_2 n$ servants enough in the poisoned wine problem?

#### Week 2 Complexity
5. What is the difference between Big-O, Ω, and Θ?
6. What is the RAM model?
7. What are the condition and result of each of Cases 1, 2, and 3 of the Master Theorem?
8. How do you prove $T(n) = 2T(n/2) + n$ by induction?

#### Week 3 Data Structures and Sorting
9. What are the per-operation complexities of arrays vs linked lists?
10. Name three practical uses each for LIFO stacks and FIFO queues.
11. What are the parent and child indices in the array representation of a heap?
12. Under what condition is insertion sort's best case $\Theta(n)$?
13. What worst-case scenario makes quick sort $\Theta(n^2)$?
14. Why is buildHeap $O(n)$?
15. How is the $\Omega(n \log n)$ lower bound for comparison-based sorting proved?
16. Why does counting sort need reverse traversal?
17. Why does radix sort use LSD order?

#### Week 4 Divide and Conquer
18. What are the three steps of divide and conquer?
19. Why is merge sort $\Theta(n \log n)$ even in the worst case?
20. What is the outline of the proof that randomized select is $\Theta(n)$ on average?
21. Why does median of medians use groups of 5?
22. Why are 7 neighbors enough in the strip check of the closest pair algorithm?

#### Week 5 Greedy
23. What is the difference between the greedy-choice property and optimal substructure?
24. What is the difference between activity selection (EFT) and job scheduling (EST)?
25. What is the outline of the proof of optimality of Huffman coding?
26. How do the data structures of Kruskal and Prim differ?
27. Why does Dijkstra fail with negative edges?

#### Week 6 DP
28. What are the two required conditions of DP?
29. What is the difference between memoization and tabulation?
30. Why does greedy fail and DP succeed on the 0-1 knapsack?

### 9.6 Calculation Practice

#### Master Theorem
The solution of $T(n) = 7T(n/2) + n^2$ is found as follows.
- Since $a = 7$ and $b = 2$, $n^{\log_2 7} \approx n^{2.81}$.
- Since $f(n) = n^2 = O(n^{2.81 - \varepsilon})$, it falls under Case 1.
- Therefore $T(n) = \Theta(n^{\log_2 7})$.

#### LCS
The LCS of $X$ = `ABCB` and $Y$ = `BDCAB` can be found by filling the table: $c[4][5] = 3$, and the LCS is `BCB`.

#### 0-1 Knapsack
For items $(w, v) = (2,12), (1,10), (3,20), (2,15)$ and capacity $C = 5$, the maximum value is $K[4][5] = 37$ in the table, with items 4, 2, and 1 selected for a total weight of 5kg.

#### Big-O Proof
$5n^3 + 2n^2 + 7 = O(n^3)$ is proved as follows.
- Set $c = 14$ and $n_0 = 1$.
- For all $n \geq 1$, $5n^3 + 2n^2 + 7 \leq 5n^3 + 2n^3 + 7n^3 = 14n^3$ holds.

### 9.7 Pseudocode Check

#### Binary Search
```text
left, right = 0, n-1
while left <= right:
    mid = (left + right) // 2
    if A[mid] == key: return mid
    elif A[mid] < key: left = mid + 1
    else: right = mid - 1
return -1
```

#### Merge Sort
```text
mergeSort(A, p, r):
    if p < r:
        q = (p+r)//2
        mergeSort(A, p, q)
        mergeSort(A, q+1, r)
        merge(A, p, q, r)
```

#### Filling the LCS Table
```text
for i = 1 to m:
    for j = 1 to n:
        if X[i] == Y[j]: c[i][j] = c[i-1][j-1] + 1
        else: c[i][j] = max(c[i-1][j], c[i][j-1])
```

#### Filling the 0-1 Knapsack Table
```text
for i = 1 to n:
    for w = 0 to C:
        if w[i] > w: K[i][w] = K[i-1][w]
        else: K[i][w] = max(K[i-1][w], v[i] + K[i-1][w-w[i]])
```

#### Dijkstra
```text
D[s] = 0; D[v] = inf for v ≠ s; S = {}
while S ≠ V:
    u = argmin D[v] for v ∉ S
    S = S ∪ {u}
    for v in neighbors(u):
        if v ∉ S and D[u] + w(u,v) < D[v]:
            D[v] = D[u] + w(u,v)
```

### 9.8 Exam-Day Strategy

#### Time Allocation (for a 1-Hour Exam)
- 0-3 min: Skim the whole exam
- 3-50 min: Write answers (calculations first, explanations later)
- 50-55 min: Review (especially fork/base cases/boundaries)
- 55-60 min: Buffer

#### Six-Element Answer Template
```text
[Definition, 1 sentence] + [Why it is needed, 1 sentence]
+ [Mechanism, 2-4 sentences]
+ [Concrete example/pseudocode/table]
+ [Limitations/trade-offs]
+ [Connections to other concepts]
```

#### Checkpoints: Commonly Missed Items
- [ ] State $c$ and $n_0$ in a Big-O proof
- [ ] State the DP base cases (row 0 and column 0)
- [ ] Dijkstra cannot be used with negative edges
- [ ] Quick sort worst case = sorted input + last-element pivot
- [ ] Comparison-based lower bound $\Omega(n \log n)$
- [ ] In Floyd-Warshall, k is the outermost loop
- [ ] Watch the arrow directions when backtracking

---

<br>

## Closing Remarks

This document covers the **why, mechanisms, examples, and connections** so that the material of Weeks 1-7 can be understood from the beginning. If, while studying, you wonder why a concept appears where it does, rereading **the big picture in Section 8** will make the structure clear.

The key to an answer that shows deep understanding is not rote memorization but internalizing **why a concept exists, which other concepts it interlocks with, and what trade-offs it carries**.
