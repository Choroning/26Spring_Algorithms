# Week 6 Lab — Dynamic Programming

> **Last Modified:** 2026-04-09

> **Prerequisites**: Week 6 Lecture — dynamic programming, optimal substructure, overlapping subproblems. Python 3 installed. Understanding of recursion and basic algorithm analysis.
>
> **Learning Objectives**:
> 1. Compare naive recursion, memoization, and tabulation through the Fibonacci problem
> 2. Build a 2D DP table for LCS and recover the actual subsequence via backtracking
> 3. Implement the 0-1 Knapsack problem with DP and trace selected items
> 4. Experience how LCS-based diff is applied in a real web application

---

## Table of Contents

- [1. Overview](#1-overview)
- [2. Type A — Algorithm Implementation](#2-type-a--algorithm-implementation)
  - [2.1 A-1: Fibonacci Comparison](#21-a-1-fibonacci-comparison)
    - [2.1.1 Problem](#211-problem)
    - [2.1.2 Three Approaches](#212-three-approaches)
    - [2.1.3 Performance Results](#213-performance-results)
  - [2.2 A-2: LCS + DP Table Visualization](#22-a-2-lcs--dp-table-visualization)
    - [2.2.1 Problem](#221-problem)
    - [2.2.2 DP Table](#222-dp-table)
    - [2.2.3 Solution Code](#223-solution-code)
    - [2.2.4 Backtracking Visualization](#224-backtracking-visualization)
  - [2.3 A-3: 0-1 Knapsack + Backtracking](#23-a-3-0-1-knapsack--backtracking)
    - [2.3.1 Problem](#231-problem)
    - [2.3.2 DP Table & Backtracking](#232-dp-table--backtracking)
    - [2.3.3 Solution Code](#233-solution-code)
- [3. Type B — Web Code Analysis](#3-type-b--web-code-analysis)
  - [3.1 B-1: Text Diff Viewer](#31-b-1-text-diff-viewer)
    - [3.1.1 Setup](#311-setup)
    - [3.1.2 How Diff Works](#312-how-diff-works)
- [Summary](#summary)
- [Self-Check Questions](#self-check-questions)

---

<br>

## 1. Overview

### Today's Goals

- Understand and implement the core DP patterns: **memoization** and **tabulation**
- Build a 2D DP table for **LCS** and recover the actual subsequence via backtracking
- Implement the **0-1 Knapsack** problem with DP and trace selected items through backtracking
- Analyze how **LCS-based diff** is used in a real web application

### Lab Structure

| Section | Topic | Time |
|:--------|:------|:-----|
| **A-1** | Fibonacci Comparison | 10 min |
| **A-2** | LCS + DP Table Visualization | 15 min |
| **A-3** | 0-1 Knapsack + Backtracking | 10 min |
| **B-1** | Text Diff Viewer | 15 min |

### How to Run

Skeleton files (with `TODO` comments) are in `examples/skeletons/`, and reference solutions are in `examples/solutions/`.

```bash
# Run skeleton (implement the TODOs first)
python examples/skeletons/a1_fibonacci.py

# Run reference solution
python examples/solutions/a1_fibonacci.py
```

No external packages are required (standard library only). Flask is needed only for B-1.

---

<br>

## 2. Type A — Algorithm Implementation

### 2.1 A-1: Fibonacci Comparison

Compare three approaches to computing Fibonacci numbers and observe how DP eliminates redundant computation.

#### 2.1.1 Problem

**Goal**: Compare three approaches to computing Fibonacci numbers.

```
Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

F(0) = 0
F(1) = 1
F(n) = F(n-1) + F(n-2)   for n >= 2
```

**Why is naive recursion so slow?**

```
                    F(5)
                   /    \
               F(4)      F(3)
              /    \     /    \
          F(3)   F(2)  F(2)  F(1)
         /   \   / \   / \
       F(2) F(1) ...  ...
       / \
     F(1) F(0)

Overlapping subproblems!  F(3) computed 2 times, F(2) computed 3 times...
Total calls for F(n): O(2^n)
```

#### 2.1.2 Three Approaches

```python
# 1. Naive recursion: O(2^n) — exponentially slow
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

# 2. Memoization (top-down): O(n) — cache results
def fib_memo(n, memo=None):
    if memo is None: memo = {}
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

# 3. Tabulation (bottom-up): O(n) — fill table iteratively
def fib_tab(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]
```

Run: `python examples/solutions/a1_fibonacci.py`

#### 2.1.3 Performance Results

```
  N   |     Naive      |     Memo       |  Tabulation
------+--------------+----------------+----------------
  10  |   0.000005s  |   0.000003s    |   0.000002s
  20  |   0.001200s  |   0.000004s    |   0.000002s
  30  |   0.150000s  |   0.000005s    |   0.000003s
  35  |   1.800000s  |   0.000005s    |   0.000003s
  40  |   too slow   |   0.000006s    |   0.000003s
```

*(Approximate — your results will vary)*

**Key comparison:**

| Approach | Time | Space | Direction |
|:---------|:-----|:------|:----------|
| Naive recursion | O(2^n) | O(n) stack | — |
| Memoization | O(n) | O(n) cache + stack | Top-down |
| Tabulation | O(n) | O(n) table | Bottom-up |

**Memoization** = recursion + caching. **Tabulation** = iterative table-filling.
Both eliminate overlapping subproblems. Tabulation avoids recursion overhead.

---

<br>

### 2.2 A-2: LCS + DP Table Visualization

#### 2.2.1 Problem

**Problem**: Find the Longest Common Subsequence of two strings.

A **subsequence** preserves order but not necessarily contiguity.

```
X = "ABCBDAB"
Y = "BDCAB"

Common subsequences: "B", "AB", "BD", "BCB", "BCAB", ...
Longest: "BCAB" (length 4)

X: A B C B D A B
       ^   ^   ^ ^
Y: B D C A B
   ^   ^ ^ ^
```

**Recurrence:**

```
If X[i] == Y[j]:   dp[i][j] = dp[i-1][j-1] + 1   (match!)
If X[i] != Y[j]:   dp[i][j] = max(dp[i-1][j], dp[i][j-1])
```

**Time**: O(m × n) &nbsp;&nbsp; **Space**: O(m × n)

#### 2.2.2 DP Table

```
X = "ABCBDAB",  Y = "BDCAB"

          ""   B    D    C    A    B
          0    1    2    3    4    5
    ----------------------------------
 "" 0 |   0    0    0    0    0    0
  A 1 |   0    0    0    0   [1]   1
  B 2 |   0   [1]   1    1    1    2
  C 3 |   0    1    1   [2]   2    2
  B 4 |   0    1    1    2    2   [3]
  D 5 |   0    1   (2)   2    2    3
  A 6 |   0    1    2    2   (3)   3
  B 7 |   0    1    2    2    3   [4]

  [n] = match (diagonal move, included in LCS)
  (n) = backtrack path
```

**LCS = "BCAB"** (length 4)

#### 2.2.3 Solution Code

```python
def build_lcs_table(x, y):
    """
    Build the LCS DP table.

    dp[i][j] = length of LCS of X[0..i-1] and Y[0..j-1]
    Time complexity: O(m * n)
    Space complexity: O(m * n)
    """
    m, n = len(x), len(y)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if x[i - 1] == y[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp

def backtrack_lcs(dp, x, y):
    """
    Recover the actual LCS string by backtracking through the DP table.
    Start at dp[m][n] and trace back to dp[0][0].
    """
    lcs = []
    i, j = len(x), len(y)
    while i > 0 and j > 0:
        if x[i - 1] == y[j - 1]:
            lcs.append(x[i - 1])
            i -= 1; j -= 1          # diagonal
        elif dp[i - 1][j] >= dp[i][j - 1]:
            i -= 1                   # up
        else:
            j -= 1                   # left
    return "".join(reversed(lcs))
```

Run: `python examples/solutions/a2_lcs.py`

#### 2.2.4 Backtracking Visualization

```
Start at dp[7][5] = 4, trace back to dp[0][0]:

  (7,5): X[7]='B' == Y[5]='B' -> diagonal (MATCH: 'B')
  (6,4): X[6]='A' == Y[4]='A' -> diagonal (MATCH: 'A')
  (5,3): X[5]='D' != Y[3]='C' -> up  (dp[4][3]=2 >= dp[5][2]=2)
  (4,4): was (5,3)->up->(4,3)
         X[4]='B' != Y[3]='C' -> left... (continuing trace)
  ...eventually:
  (3,3): X[3]='C' == Y[3]='C' -> diagonal (MATCH: 'C')
  (2,1): X[2]='B' == Y[1]='B' -> diagonal (MATCH: 'B')

Collected (reversed): B -> C -> A -> B = "BCAB"
```

**Applications of LCS:**

- **git diff** — comparing file versions line by line
- **DNA sequence alignment** — comparing genetic sequences
- **Edit distance** — minimum edits to transform one string into another

---

<br>

### 2.3 A-3: 0-1 Knapsack + Backtracking

#### 2.3.1 Problem

**Problem**: Select items to maximize value without exceeding capacity. Items **cannot be split** (take it or leave it).

```
Capacity: 50

Item       Value   Weight
--------------------------
Laptop      60      10
Camera     100      20
Painting   120      30
Book        40       5
```

**Recurrence:**

```
dp[i][j] = maximum value using first i items with capacity j

If weight_i > j:   dp[i][j] = dp[i-1][j]          (can't take item i)
Otherwise:         dp[i][j] = max(
                       dp[i-1][j],                  (skip item i)
                       dp[i-1][j - weight_i] + v_i  (take item i)
                   )
```

Which items should we pick?

#### 2.3.2 DP Table & Backtracking

```
          Capacity ->  0   5  10  15  20  25  30  35  40  45  50
          ---------------------------------------------------------
(none)  0 |            0   0   0   0   0   0   0   0   0   0   0
Laptop  1 |            0   0  60  60  60  60  60  60  60  60  60
Camera  2 |            0   0  60  60 100 100 160 160 160 160 160
Paint.  3 |            0   0  60  60 100 100 160 160 180 180 220
Book    4 |            0  40  60 100 100 140 140 200 200 220 220

Answer: dp[4][50] = 220

Backtrack from dp[4][50]:
  dp[4][50]=220 != dp[3][50]=220 -> skip Book?
  Wait: dp[4][50]=220 == dp[3][50]=220 -> skip Book
  dp[3][50]=220 != dp[2][50]=160 -> TAKE Painting (j: 50->20)
  dp[2][20]=100 != dp[1][20]=60  -> TAKE Camera   (j: 20->0)
  dp[1][0]=0 == dp[0][0]=0      -> skip Laptop

Selected: Camera (100, 20kg) + Painting (120, 30kg) = 220
```

#### 2.3.3 Solution Code

```python
def knapsack_01(capacity, items):
    """
    Solve the 0-1 knapsack problem using DP.

    items: list of (value, weight, name)
    Returns: max value, selected items.

    Time complexity: O(n * W)
    Space complexity: O(n * W)   (W = capacity)
    """
    n = len(items)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        v, w, _ = items[i - 1]
        for j in range(capacity + 1):
            dp[i][j] = dp[i - 1][j]           # skip
            if w <= j and dp[i - 1][j - w] + v > dp[i][j]:
                dp[i][j] = dp[i - 1][j - w] + v  # take

    # Backtrack to find selected items
    selected = []
    j = capacity
    for i in range(n, 0, -1):
        if dp[i][j] != dp[i - 1][j]:
            selected.append(items[i - 1])
            j -= items[i - 1][1]               # subtract weight

    return dp[n][capacity], list(reversed(selected))
```

Run: `python examples/solutions/a3_knapsack.py`

**Time**: O(n × W) &nbsp;&nbsp; **Space**: O(n × W) &nbsp;&nbsp; (W = capacity)

---

<br>

## 3. Type B — Web Code Analysis

### 3.1 B-1: Text Diff Viewer

#### 3.1.1 Setup

Install dependencies first: `pip install flask`. Then run the Flask app:

```bash
cd examples/solutions/b1_web_diff
python app.py
```

Enter two texts and the app highlights the differences based on **LCS**.

```
  Text A: "The quick brown fox"
  Text B: "The slow brown dog"

  Diff output:
    "The "
    [-quick-] [+slow+]
    " brown "
    [-fox-] [+dog+]
```

This is the same principle behind **GitHub's diff feature**.

#### 3.1.2 How Diff Works

```
1. Split texts into tokens (words or lines)
2. Compute LCS of the two token sequences
3. Tokens in LCS      -> unchanged (white)
   Tokens only in A   -> deleted   (red)
   Tokens only in B   -> inserted  (green)

  Text A tokens: [The, quick, brown, fox]
  Text B tokens: [The, slow,  brown, dog]

  LCS: [The, brown]

  Alignment:
    The    The      <- same (LCS)
    quick  ---      <- deleted
    ---    slow     <- inserted
    brown  brown    <- same (LCS)
    fox    ---      <- deleted
    ---    dog      <- inserted
```

**Experiment:**

- Try short sentences with a few word changes
- Try longer paragraphs — observe how LCS captures the common structure
- Think about why this is O(m × n) where m, n are the token counts

---

<br>

## Summary

### What We Learned Today

- **Fibonacci**: Naive O(2^n) vs memoization/tabulation O(n) — eliminating overlapping subproblems
- **LCS**: 2D DP table + backtracking to recover the actual subsequence
- **0-1 Knapsack**: DP table construction + backtracking to find selected items
- **Text Diff**: LCS applied to a real web application (like GitHub diff)

### The DP Recipe

```
1. Define the subproblem   — what does dp[i][j] represent?
2. Write the recurrence    — how does dp[i][j] relate to smaller subproblems?
3. Identify base cases     — dp[0][...] = ?, dp[...][0] = ?
4. Determine fill order    — usually left-to-right, top-to-bottom
5. Backtrack if needed     — recover the actual solution, not just the value
```

### Next Week

**Week 07**: Midterm Exam Preparation — review everything from Weeks 02–06!

---

<br>

## Self-Check Questions

1. Why does naive recursion for Fibonacci have O(2^n) time complexity? Draw the recursion tree for F(5) and count how many times F(2) is computed.
2. In the LCS problem, what is the role of the backtracking step? Why can't we determine the actual subsequence from just the final value dp[m][n]?
3. For the 0-1 Knapsack example, why is the Book (value 40, weight 5) not selected even though it has the best value/weight ratio (8.0/kg)?
4. How does the text diff viewer use LCS? Explain why this approach is O(m × n) and what happens when texts are very long.
5. Compare memoization and tabulation: when would you prefer one over the other? Consider stack depth, ease of implementation, and cache efficiency.
6. In the DP recipe, why does fill order matter? What would happen if you tried to fill the LCS table from bottom-right to top-left?
