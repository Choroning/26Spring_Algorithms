# Week 7 — Midterm Review: The Complete Study Guide

> **Last Updated:** 2026-04-14
>
> **Exam Info:** Week 8 Midterm | Handwritten, 1 hour | No digital devices | Covers Weeks 01–06 | CLRS Ch. 1–4, 6–10, 15, 16
>
> **Purpose:** Everything you need for the midterm — definitions, recurrences, algorithms, worked examples, common pitfalls, and a final checklist. Self-contained synthesis of W01–W06 lectures plus the W07 review.

---

## Table of Contents

- [0. Midterm at a Glance](#0-midterm-at-a-glance)
- [1. Foundations (W01)](#1-foundations-w01)
- [2. Complexity Analysis (W02)](#2-complexity-analysis-w02)
- [3. Data Structures and Sorting (W03)](#3-data-structures-and-sorting-w03)
- [4. Divide and Conquer (W04)](#4-divide-and-conquer-w04)
- [5. Greedy Algorithms (W05)](#5-greedy-algorithms-w05)
- [6. Dynamic Programming (W06)](#6-dynamic-programming-w06)
- [7. Paradigm Comparison](#7-paradigm-comparison)
- [8. Formula Cheat Sheet](#8-formula-cheat-sheet)
- [9. Practice Problems (Exam-Style)](#9-practice-problems-exam-style)
- [10. Common Pitfalls](#10-common-pitfalls)
- [11. Final Checklist](#11-final-checklist)

---

## 0. Midterm at a Glance

| Week | Topic | CLRS |
|------|-------|------|
| 01 | Introduction to Algorithms — log₂(n) theme | — |
| 02 | Algorithm Design, Complexity, Recurrences | Ch. 1–3 |
| 03 | Arrays/Stacks/Queues/Heaps, Sorting | Ch. 6–8, 10 |
| 04 | Divide and Conquer | Ch. 4, 9 |
| 05 | Greedy Algorithms | Ch. 16 |
| 06 | Dynamic Programming | Ch. 15 |

**Recurring thread of the course:**
```
Problem Solving ↔ Divide & Conquer ↔ Recursive Thinking ↔ Recurrence Relations
```

---

## 1. Foundations (W01)

### 1.1 Definition & Properties of an Algorithm

An **algorithm** is a systematic, step-by-step procedure that, given an input, produces the correct output after a finite number of steps.

| Property | Meaning |
|----------|---------|
| **Correctness** | Produces the correct output for every valid input |
| **Executability** | Each step is executable on a computer |
| **Finiteness** | Terminates within a finite number of steps |
| **Efficiency** | Uses as little time and space as possible |
| **Unambiguity** | Each step is precisely defined (no vague "handle appropriately") |

> **Algorithm + Data Structure = Program** — Niklaus Wirth

### 1.2 Representation

Natural language / **Pseudocode** (standard) / Flowchart. CLRS pseudocode is what you write on exams.

### 1.3 Euclidean GCD (the Oldest Known Algorithm, ~300 BCE)

**Key identity:** `gcd(a, b) = gcd(b, a mod b)`; base case `gcd(a, 0) = a`.

```python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
```

Worst-case iterations ≈ `log(min(a,b))` (not obvious — consecutive Fibonacci inputs are the worst case).

### 1.4 Classical Problems and the log₂(n) Theme

| Problem | Strategy | Worst Case (n inputs) |
|---------|----------|----------------------|
| Finding max | Sequential scan | `n − 1` comparisons, O(n) |
| Binary search (sorted) | Divide & Conquer | `log₂(n)` comparisons, O(log n) |
| Coin change (standard denominations) | Greedy (largest first) | O(k) where k = # of denominations |
| Euler circuit | DFS, avoid bridges | Graph must have 0 or 2 odd-degree vertices |
| Maze (connected walls) | Right-hand rule (DFS variant) | Always reaches exit |
| Counterfeit coin (1,024 coins) | Split pile in half | **10 weighings** (log₂ 1024) |
| Poisoned wine (n jars) | Binary encoding | `⌈log₂(n)⌉` servants |

> **The log₂(n) motif:** Halving the problem at each step gives logarithmic performance. Appears in binary search, the counterfeit coin problem, and the poisoned wine problem — and underlies every efficient D&C algorithm.

### 1.5 Euler Circuit Condition

An **Euler circuit** exists in a connected undirected graph iff **every vertex has even degree**. An **Euler path** (not necessarily a circuit) exists iff the graph has **exactly 0 or 2 odd-degree vertices**. Algorithmic rule of thumb: avoid crossing a **bridge** too early (an edge whose removal disconnects the graph).

### 1.6 Poisoned Wine — Binary Encoding

Assign jar `k` the binary ID of `k`. Servant `i` drinks from every jar whose bit `i` is 1. After one week, the pattern of dead servants = binary ID of the poisoned jar. Needs `⌈log₂(n)⌉` servants. Each servant = 1 bit of information; distinguishing `n` jars needs `log₂(n)` bits.

---

## 2. Complexity Analysis (W02)

### 2.1 Time Complexity Basics

`T(n)` = number of **elementary operations** (comparisons, assignments, arithmetic, array accesses) as a function of input size `n`, in the **RAM model** (each elementary op = 1 time unit).

### 2.2 Four Types of Analysis

| Type | Meaning |
|------|---------|
| **Worst-case** | Upper bound — the guarantee (most commonly used) |
| **Average-case** | Expected time under a probability distribution |
| **Best-case** | Fastest possible execution |
| **Amortized** | Average cost per operation over a *sequence* of operations |

### 2.3 Asymptotic Notation — Formal Definitions

| Notation | Set-theoretic definition |
|----------|--------------------------|
| **O(g(n))** | `{ f : ∃ c > 0, n₀ ≥ 0 s.t. ∀ n ≥ n₀, f(n) ≤ c·g(n) }` — upper bound |
| **Ω(g(n))** | `{ f : ∃ c > 0, n₀ ≥ 0 s.t. ∀ n ≥ n₀, f(n) ≥ c·g(n) }` — lower bound |
| **Θ(g(n))** | `O(g(n)) ∩ Ω(g(n))` — tight bound |

**Proof recipe for `f(n) = O(g(n))`:** For a polynomial `aₖnᵏ + ... + a₀`, use `c = |aₖ| + ... + |a₀|` and `n₀ = 1`. Example: `2n² − 8n + 3 ≤ 13n²` for `n ≥ 1`, so with `c = 13, n₀ = 1` we have `2n² − 8n + 3 = O(n²)`.

> **Rule:** Always write bounds as **tight** as possible. `n log n + 5n = O(n log n)`, not `O(n²)`.

### 2.4 Complexity Hierarchy

```
O(1) ⊂ O(log n) ⊂ O(n) ⊂ O(n log n) ⊂ O(n²) ⊂ O(n³) ⊂ O(2ⁿ) ⊂ O(n!)
```

| Class | Name | Example | Feel (n=10⁶) |
|-------|------|---------|---------------|
| O(1) | Constant | Array access | Instant |
| O(log n) | Logarithmic | Binary search | ~20 ops |
| O(n) | Linear | Linear scan | ~seconds |
| O(n log n) | Linearithmic | Merge/Heap sort | Practical ceiling |
| O(n²) | Quadratic | Bubble sort | Minutes–hours |
| O(n³) | Cubic | Floyd-Warshall | Feasible only for small n |
| O(2ⁿ) | Exponential | Naive recursive Fibonacci | Impossible past n ≈ 40 |

**Why log base doesn't matter in Big-O:** `logₐ n = (logᵦ n) / (logᵦ a)`, and `1/logᵦ a` is a constant. Constants are absorbed in O().

### 2.5 Recurrence Relations — Three Methods

**Method 1: Repeated substitution.** Expand the recurrence until you see a pattern, then substitute the base case.

Example: `T(n) = 2T(n/2) + n` with `T(1) = 1`. Assume `n = 2ᵏ`:
```
T(n) = 2T(n/2) + n
     = 4T(n/4) + 2n
     = 2ᵏ·T(n/2ᵏ) + k·n
     = n·T(1) + n·log₂ n
     = Θ(n log n)
```

**Method 2: Guess and verify (induction).** Guess a form, prove it by induction.

> **Pitfall:** The constant `c` in the inductive hypothesis must be **exactly the same** `c` in the conclusion. If you get `T(n) ≤ cn + 1`, that is **not** `≤ cn`. Fix by strengthening the guess to `cn − d` for an appropriate `d`.

**Method 3: Master Theorem.** For `T(n) = a·T(n/b) + f(n)` with `a ≥ 1, b > 1`, let `h(n) = n^(logᵦ a)`:

| Case | Condition | Result |
|------|-----------|--------|
| **Case 1** | `f(n) = O(n^(logᵦ a − ε))` for some `ε > 0` | `T(n) = Θ(n^(logᵦ a))` |
| **Case 2** | `f(n) = Θ(n^(logᵦ a))` | `T(n) = Θ(n^(logᵦ a) · log n)` |
| **Case 3** | `f(n) = Ω(n^(logᵦ a + ε))` for some `ε > 0`, **and** regularity: `a·f(n/b) ≤ c·f(n)` for some `c < 1` | `T(n) = Θ(f(n))` |

**Master Theorem recipe:** (1) Identify `a, b, f(n)`. (2) Compute `n^(logᵦ a)`. (3) Compare `f(n)` with `n^(logᵦ a)`. (4) Apply the matching case.

**Worked Master Theorem examples:**

| Recurrence | `a, b, n^(logᵦ a)` | `f(n)` | Case | Result |
|------------|-------------------|--------|------|--------|
| `T(n) = 2T(n/2) + n` | 2, 2, `n` | `n` | Case 2 | `Θ(n log n)` — Merge Sort |
| `T(n) = T(n/2) + 1` | 1, 2, `1` | `1` | Case 2 | `Θ(log n)` — Binary Search |
| `T(n) = 2T(n/2) + 1` | 2, 2, `n` | `1` | Case 1 | `Θ(n)` |
| `T(n) = 4T(n/2) + n` | 4, 2, `n²` | `n` | Case 1 | `Θ(n²)` |
| `T(n) = 4T(n/2) + n²` | 4, 2, `n²` | `n²` | Case 2 | `Θ(n² log n)` |
| `T(n) = 2T(n/4) + n` | 2, 4, `√n` | `n` | Case 3 | `Θ(n)` |
| `T(n) = 7T(n/2) + n²` | 7, 2, `n^log₂7 ≈ n^2.81` | `n²` | Case 1 | `Θ(n^log₂7)` — Strassen |
| `T(n) = 3T(n/4) + n²` | 3, 4, `n^log₄3 ≈ n^0.79` | `n²` | Case 3 | `Θ(n²)` |

> **Exam tip:** Case 3 requires the regularity check and is rarely tested. Focus on Case 1 vs Case 2 by comparing `f(n)` with `n^(logᵦ a)`.

**Not Master Theorem shape:** `T(n) = T(n−1) + Θ(n)` (unequal split by 1) → solve by substitution: `Θ(n²)`. Quick Sort worst case, insertion sort, factorial, Fibonacci-style recursions.

---

## 3. Data Structures and Sorting (W03)

### 3.1 Core Data Structures

| Structure | Order | Key ops | Cost | Application |
|-----------|-------|---------|------|-------------|
| **Array/List** | Index | Access O(1), Insert/Delete O(n) | Random access | Binary search, base of many algorithms |
| **Linked List** | Sequential | Access O(n), Insert/Delete O(1) (at known node) | Pointer-based | Dynamic sequences |
| **Stack** | **LIFO** | push, pop — O(1) | Last-in first-out | Function calls, bracket matching, DFS |
| **Queue** | **FIFO** | enqueue, dequeue — O(1) | First-in first-out | BFS, schedulers |
| **Heap** | Priority | insert, extract-min/max — O(log n) | Complete binary tree stored in array | Priority queue, heap sort, Dijkstra, Prim |

**Heap in array (1-indexed):** children of `A[i]` are `A[2i], A[2i+1]`; parent is `A[⌊i/2⌋]`. Heap property: Max-heap `key(parent) ≥ key(child)`; Min-heap reversed.

### 3.2 Sorting — The Complete Table

| Algorithm | Worst | Average | Best | Space | Stable? | Key note |
|-----------|-------|---------|------|-------|---------|----------|
| **Selection** | Θ(n²) | Θ(n²) | Θ(n²) | O(1) | No | Always same; min #swaps |
| **Bubble** | Θ(n²) | Θ(n²) | **Θ(n)** (optimized) | O(1) | Yes | Best Θ(n) only if `swapped` flag used |
| **Insertion** | Θ(n²) | Θ(n²) | **Θ(n)** | O(1) | Yes | Fastest for nearly-sorted input |
| **Merge** | Θ(n log n) | Θ(n log n) | Θ(n log n) | **O(n)** | Yes | Always guaranteed; stable |
| **Quick** | **Θ(n²)** | Θ(n log n) | Θ(n log n) | O(log n) | No | Fastest in practice (randomize!) |
| **Heap** | Θ(n log n) | Θ(n log n) | Θ(n log n) | O(1) | No | Guaranteed O(n log n), in-place |
| **Counting** | Θ(n + k) | Θ(n + k) | Θ(n + k) | O(k) | Yes | Requires small value range |
| **Radix** | Θ(d(n + k)) | Θ(d(n + k)) | Θ(d(n + k)) | O(n + k) | Yes | Θ(n) when d, k constant |

### 3.3 Comparison-Based Lower Bound

> **Theorem:** Any comparison-based sort needs Ω(n log n) comparisons in the worst case.

**Proof idea:** Decision-tree model. `n!` permutations → need leaves ≥ n!. Binary tree with `L` leaves has height ≥ `log₂ L`. By Stirling, `log₂(n!) = Θ(n log n)`.

Counting/Radix beat this bound by **not using comparisons** — they exploit structure in the keys (limited range, fixed digit count).

### 3.4 The Recursive Structure of Sorting

All three elementary sorts share: `T(n) = T(n − 1) + Θ(n) = Θ(n²)` — the problem size shrinks by only 1 per step.
Merge and Quick achieve `T(n) = 2T(n/2) + Θ(n) = Θ(n log n)` — splitting in half is the fundamental speedup.

### 3.5 Quick Sort Partition (last-element pivot)

```
PARTITION(A, p, r):
    pivot = A[r]
    i = p − 1
    for j = p to r − 1:
        if A[j] ≤ pivot:
            i = i + 1
            swap A[i], A[j]
    swap A[i+1], A[r]
    return i + 1
```

**Loop invariant:** `A[p..i] ≤ pivot`, `A[i+1..j−1] > pivot`, `A[j..r−1]` unexamined.

**Randomized variant:** pick a random index `r'` in `[p..r]`, swap `A[r'] ↔ A[r]`, then run partition. Avoids the `Θ(n²)` worst case on sorted input.

### 3.6 Heap Sort — Two Subroutines

- `buildHeap`: O(n) (not O(n log n) — tighter analysis, leaves need no work).
- `heapify(A, k, n)`: O(log n) — sift down.
- `heapSort`: `buildHeap` + `(n−1) × heapify` = **O(n log n) worst case**, in-place.

### 3.7 Counting Sort Key Insight

1. Count occurrences: `C[i]` = # of elements equal to `i`.
2. Cumulative sum: `C[i]` = # of elements ≤ `i`.
3. **Walk input right-to-left** (for stability): `B[C[A[j]]] = A[j]; C[A[j]]−−`.

### 3.8 Radix Sort

Sort from LSD to MSD using a **stable** sort (usually counting sort) per digit. Must be LSD→MSD so earlier digits' order is preserved in higher rounds. `T(n) = Θ(d · (n + k))`.

---

## 4. Divide and Conquer (W04)

### 4.1 The Three-Step Paradigm

```
DivideAndConquer(P):
    if P is small enough: solve directly    (base case)
    else:
        DIVIDE     P into subproblems P₁,...,Pₖ
        CONQUER    each Pᵢ recursively
        COMBINE    the sub-solutions into a solution to P
```

**Essential requirement:** subproblems are **independent** (no overlap). If they overlap → use DP instead.

**Typical recurrence shape:** `T(n) = a·T(n/b) + f(n)`.

### 4.2 D&C Algorithm Catalog

| Algorithm | Divide | Conquer | Combine | Recurrence | Time |
|-----------|--------|---------|---------|-----------|------|
| Merge Sort | split in half | sort each half | merge sorted halves | `2T(n/2) + Θ(n)` | Θ(n log n) |
| Binary Search | compare mid | recurse one half | trivial | `T(n/2) + O(1)` | Θ(log n) |
| Quick Sort (avg) | partition | recurse both sides | trivial | `2T(n/2) + Θ(n)` | Θ(n log n) |
| Quick Sort (worst) | unbalanced partition | — | — | `T(n−1) + Θ(n)` | Θ(n²) |
| Randomized Select | partition | recurse **one** side | trivial | `T(3n/4) + Θ(n)` (avg) | **Θ(n)** avg |
| Median-of-Medians Select | groups of 5 | recurse both | partition | `T(n/5) + T(7n/10) + Θ(n)` | **Θ(n)** worst |
| Closest Pair | split by x | recurse each half | strip check | `2T(n/2) + O(n log n)` | O(n log² n) |
| Strassen (not on exam) | 7 recursive 2×2 multiplies | | | `7T(n/2) + Θ(n²)` | Θ(n^log₂7) |

### 4.3 Selection Problem

**Problem:** Find the i-th smallest element in an unsorted array.

**Randomized Select** — partition by a pivot, recurse on only the side containing rank `i`:
```
SELECT(A, p, r, i):
    if p == r: return A[p]
    q = PARTITION(A, p, r)
    k = q − p + 1          # pivot rank within A[p..r]
    if i == k: return A[q]
    else if i < k: return SELECT(A, p, q−1, i)
    else:          return SELECT(A, q+1, r, i − k)
```
Average `Θ(n)`, worst `Θ(n²)`.

**Median-of-Medians** (worst-case linear):
1. Divide into groups of 5, find each group median.
2. Recursively compute median `M` of these medians.
3. Partition around `M`; recurse on the side with rank `i`.

**Why groups of 5?** At least `3n/10` elements are guaranteed `≤ M`, **and** at least `3n/10` elements are guaranteed `≥ M` (each as a separate bound). So the recursive call in step 3 is on at most `7n/10` elements. The recurrence `T(n) = T(n/5) + T(7n/10) + Θ(n)` gives linear time because `1/5 + 7/10 = 9/10 < 1`.

### 4.4 Closest Pair of Points (D&C)

1. Sort points by x-coordinate (once, O(n log n)).
2. Split at median x → left/right halves.
3. Recursively find `d_L`, `d_R`; let `d = min(d_L, d_R)`.
4. Check the **strip** of width `2d` around the dividing line, sorted by y.
5. For each strip point, only its **next 7 neighbors** by y can be closer than `d`.

**Why at most 7?** In a `2d × d` rectangle any two points are `≥ d` apart; at most 8 such points can exist, so each point checks 7 others.

`T(n) = 2T(n/2) + O(n log n) = O(n log² n)` (pre-sorting by y can improve to `O(n log n)`).

### 4.5 When D&C Fails — Overlapping Subproblems

Fibonacci via naive recursion has overlapping subproblems (same `f(k)` computed many times), leading to `O(2ⁿ)`. If subproblems overlap, use **DP** (store and reuse).

---

## 5. Greedy Algorithms (W05)

### 5.1 The Greedy Template

```
Greedy(C):
    S = {}
    while C ≠ ∅ and S is not complete:
        x = the best-looking element in C
        C = C − {x}
        if S ∪ {x} is feasible:
            S = S ∪ {x}
    return S
```

### 5.2 Two Conditions for Correctness

1. **Greedy-choice property** — Some optimal solution contains the greedy (locally best) choice.
2. **Optimal substructure** — After making the greedy choice, the remaining subproblem has the same structure, and an optimal solution to the whole contains an optimal solution to the subproblem.

> **Rule of thumb:** Try greedy first; if you can find a counterexample, switch to DP.

### 5.3 When Greedy Fails — Canonical Counterexamples

- **Non-standard coins** `{1, 3, 4}`, amount 6: greedy picks `4 + 1 + 1 = 3` coins; optimal is `3 + 3 = 2`.
- **Non-standard coins** `{16, 10, 5, 1}`, amount 20: greedy picks `16 + 1+1+1+1 = 5`; optimal is `10 + 10 = 2`.
- **0/1 knapsack by value/weight ratio**: greedy may waste capacity.
- **Binary tree maximum path sum**: locally best child can block the globally best path.

### 5.4 Greedy Algorithm Catalog

| Problem | Strategy | Correct? | Time |
|---------|----------|----------|------|
| Coin change (standard denominations) | Largest first | ✓ when denominations divide cleanly | O(k) |
| **Fractional knapsack** | Sort by value/weight, greedily take | ✓ always | O(n log n) |
| 0/1 knapsack | — | **✗ use DP** | — |
| **Job scheduling** (min # machines) | Earliest start time first | ✓ | O(n log n) + O(mn) |
| **Activity selection** (max # activities, 1 machine) | **Earliest finish time first** | ✓ | O(n log n) |
| **Huffman coding** | Repeatedly merge two lowest-freq nodes | ✓ optimal prefix code | O(n log n) |
| **Kruskal's MST** | Add cheapest edge that doesn't form a cycle | ✓ | O(m log m) |
| **Prim's MST** | Grow one tree: add cheapest crossing edge | ✓ | O(n²) array / O(m log n) heap |
| **Dijkstra's shortest paths** | Pick min-distance unfinalized vertex, relax neighbors | ✓ with non-negative weights | O(n²) / O(m log n) |
| Dijkstra with negative edges | — | **✗ use Bellman-Ford** | — |

### 5.5 Job Scheduling vs Activity Selection (careful!)

These are **different** problems with **different** strategies:

| | Job Scheduling | Activity Selection |
|--|----------------|-------------------|
| Goal | Use **minimum # of machines** to run **all** jobs | Pick **max # of jobs** that fit on **one** machine |
| Strategy | **Earliest Start Time** first | **Earliest Finish Time** first |

### 5.6 Huffman Coding

- Build a min-heap of character frequencies.
- While `|Q| ≥ 2`: extract two smallest, merge into a new node with summed frequency, reinsert.
- The final tree gives **prefix codes**: root-to-leaf path (left = 0, right = 1) = character's code.
- Produces an **optimal prefix code**: no other prefix code has a smaller expected length.

### 5.7 MST Algorithms — Kruskal vs Prim

| | Kruskal | Prim |
|--|---------|------|
| Perspective | Edge-centric (forest → tree) | Vertex-centric (one growing tree) |
| Data structure | **Union-Find** (for cycle detection) | Priority queue / distance array `D[v]` |
| Complexity | O(m log m) (dominated by sorting) | O(n²) with array / O(m log n) with heap |
| Best for | Sparse graphs | Dense graphs |

### 5.8 Dijkstra — Edge Relaxation

```
Dijkstra(G, s):
    D[v] = ∞ for all v;  D[s] = 0;  S = ∅
    while S ≠ V:
        vmin = vertex ∉ S with minimum D[v]
        S = S ∪ {vmin}
        for each neighbor w of vmin with w ∉ S:
            if D[vmin] + weight(vmin, w) < D[w]:     # RELAX
                D[w] = D[vmin] + weight(vmin, w)
```

**Greedy invariant:** once `vmin` is finalized, `D[vmin]` is its true shortest distance — valid only when all edge weights are **non-negative**.

---

## 6. Dynamic Programming (W06)

### 6.1 Definition and Two Required Properties

**DP** solves problems by:
1. Breaking them into **overlapping** subproblems.
2. Solving each subproblem **once** and storing the result.
3. Building up from **smaller** to **larger** subproblems.

**Required properties:**
- **Optimal substructure:** optimal solution contains optimal solutions to subproblems.
- **Overlapping subproblems:** same subproblems recur many times.

> "Programming" here means *tabulation* (filling a table) — a term from mathematical optimization, not from computer programming.

### 6.2 Memoization vs Tabulation

| | Memoization (top-down) | Tabulation (bottom-up) |
|--|------------------------|------------------------|
| Approach | Recursion + cache | Iterative table fill |
| Ease of coding | Often easier (add cache to recursion) | Needs explicit order |
| Subproblems solved | Only those actually needed (lazy) | **All** subproblems |
| Overhead | Recursion stack, cache lookups | Tight loops, cache-friendly |
| Typical winner | For sparse needs | For dense needs (faster in practice) |

### 6.3 The DP Recipe (6 steps)

1. **Define the subproblem** — what does `OPT[i, j, ...]` represent?
2. **Write the recurrence** — how does it relate to smaller subproblems?
3. **Identify base cases** — trivial/boundary values.
4. **Determine the computation order** — fill small → large so dependencies are ready.
5. **Extract the answer** — which cell holds the final value?
6. **(Optional) Traceback** — reconstruct the actual solution, not just its value.

### 6.4 Classic DP Problems — Full Table

| Problem | Subproblem | Recurrence | Base | Time | Space |
|---------|-----------|------------|------|------|-------|
| **Fibonacci** | `f[i]` | `f[i] = f[i−1] + f[i−2]` | `f[1]=f[2]=1` | O(n) | O(n) → O(1) |
| **Matrix Path** (max) | `c[i,j]` = best sum to `(i,j)` | `c[i,j] = m[i,j] + max(c[i−1,j], c[i,j−1])` | `c[i,0]=c[0,j]=0` | O(n²) | O(n²) → O(n) |
| **LCS** | `c[i,j]` = LCS of `X₁..ᵢ, Y₁..ⱼ` | match: `c[i−1,j−1]+1`; else: `max(c[i−1,j], c[i,j−1])` | `c[i,0]=c[0,j]=0` | O(mn) | O(mn) → O(min(m,n)) |
| **Edit Distance** | `E[i,j]` = edit dist of `X₁..ᵢ, Y₁..ⱼ` | match: `E[i−1,j−1]`; else: `1 + min(E[i−1,j], E[i,j−1], E[i−1,j−1])` | `E[i,0]=i, E[0,j]=j` | O(mn) | O(mn) |
| **0/1 Knapsack** | `K[i,w]` = max value using items 1..i, capacity w | `wᵢ > w`: `K[i−1,w]`; else: `max(K[i−1,w], K[i−1,w−wᵢ]+vᵢ)` | `K[0,w]=K[i,0]=0` | O(nC) | O(nC) |
| **Coin Change** (min coins) | `C[j]` = min coins for amount `j` | `C[j] = min over dᵢ ≤ j of {C[j−dᵢ] + 1}` | `C[0]=0` | O(nk) | O(n) |
| **Floyd-Warshall** | `d[i,j,k]` via vertices `{1..k}` | `min(d[i,j,k−1], d[i,k,k−1] + d[k,j,k−1])` | `d[i,j,0]=w(i,j)` | O(n³) | O(n²) |

### 6.5 Why 0/1 Knapsack Is O(nC) — "Pseudo-polynomial"

Input size is O(log C) bits for capacity, but the algorithm runs in O(C) = O(2^log C) of the encoding — exponential in the *bit length* of `C`. So 0/1 knapsack is **NP-hard** in the classical sense; the DP is only polynomial in the *numeric value*.

### 6.6 Floyd-Warshall — Critical Loop Order

```
FloydWarshall(W, n):
    D = W
    for k = 1 to n:          # ← OUTERMOST (this order is non-negotiable)
        for i = 1 to n:
            for j = 1 to n:
                D[i,j] = min(D[i,j], D[i,k] + D[k,j])
    return D
```

`k` **must** be the outermost loop. Each iteration of `k` extends "allowed intermediate vertices" from `{1..k−1}` to `{1..k}`. Swap the order → wrong results.

### 6.7 LCS Traceback

From `c[m, n]`:
- If `X[i] == Y[j]`: include that char, move diagonally to `(i−1, j−1)`.
- Else: move to the larger of `c[i−1, j]` and `c[i, j−1]`.

---

## 7. Paradigm Comparison

### 7.1 D&C vs Greedy vs DP — Side-by-Side

| Aspect | Divide & Conquer | Greedy | Dynamic Programming |
|--------|------------------|--------|----------------------|
| Approach | Split, recurse, combine | One locally-best choice at each step | Solve all subproblems, combine optimally |
| Subproblems | Independent (tree) | N/A (no recursion on subproblems) | **Overlapping** (DAG) |
| Guaranteed optimal? | Problem-dependent | Only with greedy-choice property | Yes (with optimal substructure) |
| Typical time | Often O(n log n) | Often O(n log n) or O(n) | Often O(n²) or O(n³) |
| Space | O(log n) stack | O(1) to O(n) | O(n) to O(n²) table |
| Typical use | Sorting, searching | Scheduling, MST, shortest paths | Sequence problems, knapsack, chain optimization |

### 7.2 Which Technique? — Decision Flow

```
Problem asks for an optimum (min/max)?
├── No  → D&C or brute force
└── Yes
    ├── Safe greedy choice provable? → Greedy (prove correctness!)
    └── No
        ├── Subproblems overlap?    → DP
        └── Independent subproblems → D&C
```

### 7.3 Same Problem, Different Paradigms

| Problem | Greedy | DP | D&C |
|---------|:------:|:--:|:---:|
| Coin change (standard) | ✓ | ✓ | — |
| Coin change (arbitrary) | ✗ | ✓ | — |
| Fractional knapsack | ✓ | ✓ | — |
| 0/1 knapsack | ✗ | ✓ | — |
| Shortest path (non-neg) | ✓ (Dijkstra) | ✓ (Bellman-Ford) | — |
| Shortest path (any) | — | ✓ (Floyd-Warshall / BF) | — |
| Sorting | — | — | ✓ (Merge/Quick) |
| i-th smallest | — | — | ✓ (Select) |
| MST | ✓ (Kruskal/Prim) | — | — |
| LCS / Edit distance | ✗ | ✓ | — |

---

## 8. Formula Cheat Sheet

**Sorting complexities:** memorize the full table in §3.2.

**Master Theorem:** `T(n) = a·T(n/b) + f(n)`; let `h = n^(logᵦ a)`.

| | `f(n)` vs `h` | Result |
|--|---------------|--------|
| Case 1 | `f(n) = O(h / n^ε)` | `Θ(h)` |
| Case 2 | `f(n) = Θ(h)` | `Θ(h · log n)` |
| Case 3 | `f(n) = Ω(h · n^ε)` + regularity | `Θ(f(n))` |

**Key recurrences to know by heart:**

| Recurrence | Solution | Example |
|------------|----------|---------|
| `T(n) = T(n/2) + Θ(1)` | `Θ(log n)` | Binary search |
| `T(n) = T(n−1) + Θ(1)` | `Θ(n)` | Factorial |
| `T(n) = 2T(n/2) + Θ(n)` | `Θ(n log n)` | Merge sort |
| `T(n) = 2T(n/2) + Θ(1)` | `Θ(n)` | — |
| `T(n) = T(n−1) + Θ(n)` | `Θ(n²)` | Quick sort worst, insertion sort |
| `T(n) = 2T(n−1) + Θ(1)` | `Θ(2ⁿ)` | Tower of Hanoi |
| `T(n) = T(n−1) + T(n−2) + Θ(1)` | `Θ(φⁿ)` ≈ O(1.618ⁿ) | Naive recursive Fibonacci |
| `T(n) = T(n/5) + T(7n/10) + Θ(n)` | `Θ(n)` | Median-of-medians |

**Key DP recurrences:**
- LCS: `c[i,j] = c[i−1,j−1] + 1` (match) / `max(c[i−1,j], c[i,j−1])` (mismatch)
- Edit Distance: `E[i,j] = E[i−1,j−1]` (match) / `1 + min(E[i−1,j], E[i,j−1], E[i−1,j−1])` (mismatch)
- 0/1 Knapsack: `K[i,w] = max(K[i−1,w], vᵢ + K[i−1, w−wᵢ])` (if `wᵢ ≤ w`)
- Matrix path (max): `c[i,j] = m[i,j] + max(c[i−1,j], c[i,j−1])`
- Coin change: `C[j] = min over dᵢ ≤ j of {C[j−dᵢ] + 1}`
- Floyd-Warshall: `d[i,j] = min(d[i,j], d[i,k] + d[k,j])` with `k` as outer loop

---

## 9. Practice Problems (Exam-Style)

### Problem 1 — Master Theorem

**Q:** Determine the complexity of `T(n) = 4T(n/2) + n`.

**A:** `a = 4, b = 2, f(n) = n, n^(logᵦ a) = n²`. Since `n = O(n^(2−1))`, **Case 1** → `T(n) = Θ(n²)`.

### Problem 2 — Big-O Proof

**Q:** Prove `5n³ + 2n² + 7 = O(n³)`.

**A:** With `c = 5 + 2 + 7 = 14` and `n₀ = 1`: for all `n ≥ 1`, `5n³ + 2n² + 7 ≤ 5n³ + 2n³ + 7n³ = 14n³ = c·n³`. ∎

### Problem 3 — Greedy vs DP (Coin Change)

**Q:** Coins `{1, 3, 4}`, amount 6. Compare greedy and DP.

**Greedy:** 4 + 1 + 1 = 3 coins.

**DP:**

| j     | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|-------|---|---|---|---|---|---|---|
| C[j]  | 0 | 1 | 2 | 1 | 1 | 2 | **2** |

`C[6] = min(C[5], C[3], C[2]) + 1 = min(2, 1, 2) + 1 = 2` → optimal is **{3, 3}** (2 coins).

### Problem 4 — LCS Fill and Traceback

**Q:** LCS of `X = "ABCB"`, `Y = "BDCAB"`.

|     |   | B | D | C | A | B |
|-----|---|---|---|---|---|---|
|     | 0 | 0 | 0 | 0 | 0 | 0 |
| A   | 0 | 0 | 0 | 0 | **1** | 1 |
| B   | 0 | **1** | 1 | 1 | 1 | **2** |
| C   | 0 | 1 | 1 | **2** | 2 | 2 |
| B   | 0 | 1 | 1 | 2 | 2 | **3** |

**Answer:** LCS length = **3**, e.g., `"BCB"`. Trace from bottom-right, going diagonal on matches.

### Problem 5 — 0/1 Knapsack Trace

**Q:** Items `(w,v) = (2,12), (1,10), (3,20), (2,15)`, capacity `C = 5`. Find `K[4,5]`.

| i \ w | 0 | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 (2,12) | 0 | 0 | 12 | 12 | 12 | 12 |
| 2 (1,10) | 0 | 10 | 12 | 22 | 22 | 22 |
| 3 (3,20) | 0 | 10 | 12 | 22 | 30 | 32 |
| 4 (2,15) | 0 | 10 | 15 | 25 | 30 | **37** |

**Answer:** `K[4,5] = 37`. Traceback: item 4 + item 2 + item 1 (weights 2+1+2 = 5, values 15+10+12 = 37).

### Problem 6 — Quick Sort Worst Case

**Q:** What input makes Quick Sort with last-element pivot run in `Θ(n²)`? How does randomized pivot avoid this?

**A:** Already-sorted (or reverse-sorted) input: every partition is `0 : (n−1)`, giving `T(n) = T(n−1) + Θ(n) = Θ(n²)`. Randomized pivot selects a uniform random index first; the probability of repeated worst-case partitions is negligible, restoring expected `Θ(n log n)`.

### Problem 7 — Dijkstra with Negative Edges

**Q:** Give a graph where Dijkstra's algorithm gives a wrong answer.

**A:** Directed edges: `s→a = 4, s→b = 2, a→b = −5`.
- Step 1: Finalize `s`. Relax: `D[a] = 4, D[b] = 2`.
- Step 2: Pick `b` (min = 2). Finalize `b`. (No outgoing edges from `b` to relax.)
- Step 3: Pick `a` (D = 4). Finalize `a`. Attempt to relax `a → b`: would give `D[b] = 4 − 5 = −1`, **but `b` is already finalized** → the update is ignored.

Dijkstra returns `D[b] = 2`. True shortest path: `s → a → b = 4 − 5 = −1`. The greedy invariant ("once finalized, the distance is optimal") breaks as soon as a negative edge from an unfinalized vertex can still improve an already-finalized vertex.

### Problem 8 — Activity Selection

**Q:** Activities `(s, f)`: `(1,3), (2,5), (4,7), (1,8), (5,9), (8,10)`. Apply earliest-finish-time.

Sorted by finish: `(1,3), (2,5), (4,7), (1,8), (5,9), (8,10)`.
- Pick `(1,3)` → `last = 3`
- `(2,5)`: `2 < 3` → skip
- `(4,7)`: `4 ≥ 3` → pick; `last = 7`
- `(1,8)`: `1 < 7` → skip
- `(5,9)`: `5 < 7` → skip
- `(8,10)`: `8 ≥ 7` → pick; `last = 10`

**Answer:** 3 activities — `{(1,3), (4,7), (8,10)}`.

---

## 10. Common Pitfalls

| Pitfall | How to avoid |
|---------|--------------|
| Confusing O / Ω / Θ | O = upper, Ω = lower, Θ = both tight |
| Writing a loose Big-O | Prefer O(n log n) to O(n²) when both hold |
| Master Theorem applied when `f(n)` isn't polynomial | Fall back to substitution / induction |
| Claiming greedy works without proof | Always try a counterexample first |
| Wrong DP base case | Test the recurrence on `n = 0, 1, 2` by hand |
| Off-by-one in DP tables | Declare explicitly whether 0-indexed or 1-indexed |
| Fractional vs 0/1 knapsack | Fractional = greedy; 0/1 = DP |
| Quick sort `Θ(n²)` on sorted input | Use randomized or median-of-three pivot |
| Floyd-Warshall wrong loop order | `k` must be outermost |
| Dijkstra with negative edges | Use Bellman-Ford instead |
| Greedy-choice property "by intuition" | Prove via exchange argument |
| Induction: `cn + 1 ≤ cn`?? | Strengthen hypothesis to `cn − d` |
| "Merge Sort is O(n log n)" (loose) | Say `Θ(n log n)` (tight) |
| Forgetting Merge Sort's O(n) space | Remember the auxiliary array |
| Counting Sort on unbounded keys | Requires `k = O(n)` for Θ(n) |

---

## 11. Final Checklist

- [ ] Can I state the four properties of an algorithm?
- [ ] Can I count elementary operations for iterative code?
- [ ] Can I prove `f(n) = O(g(n))` by finding `c` and `n₀`?
- [ ] Can I solve recurrences by substitution, induction, and Master Theorem?
- [ ] Can I apply Master Theorem Cases 1 and 2 fluently?
- [ ] Do I know the full sorting table (worst/avg/best/space/stable) by heart?
- [ ] Can I trace partition on a small array?
- [ ] Can I explain why comparison-based sorting is Ω(n log n)?
- [ ] Can I classify a new problem as D&C, Greedy, or DP?
- [ ] Do I know when greedy fails (and can I produce a counterexample)?
- [ ] Can I execute Kruskal, Prim, and Dijkstra on a small graph?
- [ ] Can I fill a DP table by hand for LCS, Edit Distance, and 0/1 Knapsack?
- [ ] Can I write the DP recurrence for a new problem?
- [ ] Do I know why Floyd-Warshall puts `k` as the outermost loop?
- [ ] Can I explain why 0/1 Knapsack is "pseudo-polynomial"?

> **If every box is ticked, you are ready for the midterm. Good luck!**

---
