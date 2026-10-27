# Week 6 Lab — Dynamic Programming

[Repository Guide](../../README.md) | [English](Concepts_Lab.md) | [한국어](Concepts_Lab.ko.md)

> **Last Updated:** 2026-10-27

> **Learning Objectives:**
> 1. Compare naive recursion, memoization, and tabulation through the Fibonacci problem
> 2. Build a 2D DP table for LCS and recover the actual subsequence via traceback
> 3. Implement the 0-1 Knapsack problem with DP and trace selected items
> 4. Experience how LCS-based diff is applied in a real web application

---

## Table of Contents

- [1. Overview](#1-overview)
  - [1.1 Lab Goals](#11-lab-goals)
  - [1.2 Lab Structure](#12-lab-structure)
  - [1.3 Environment](#13-environment)
- [2. Type A: Algorithm Implementation](#2-type-a-algorithm-implementation)
  - [2.1 A-1: Fibonacci Comparison](#21-a-1-fibonacci-comparison)
    - [2.1.1 Problem](#211-problem)
    - [2.1.2 Three Approaches](#212-three-approaches)
    - [2.1.3 Performance Results](#213-performance-results)
  - [2.2 A-2: LCS and DP Table Visualization](#22-a-2-lcs-and-dp-table-visualization)
    - [2.2.1 Problem](#221-problem)
    - [2.2.2 DP Table](#222-dp-table)
    - [2.2.3 Solution Code](#223-solution-code)
    - [2.2.4 Traceback Visualization](#224-traceback-visualization)
  - [2.3 A-3: 0-1 Knapsack and Traceback](#23-a-3-0-1-knapsack-and-traceback)
    - [2.3.1 Problem](#231-problem)
    - [2.3.2 DP Table and Traceback](#232-dp-table-and-traceback)
    - [2.3.3 Solution Code](#233-solution-code)
- [3. Type B: Web Code Analysis](#3-type-b-web-code-analysis)
  - [3.1 B-1: Text Diff Viewer](#31-b-1-text-diff-viewer)
    - [3.1.1 Setup](#311-setup)
    - [3.1.2 How Diff Works](#312-how-diff-works)
- [4. The DP Recipe](#4-the-dp-recipe)
- [Summary](#summary)
- [Self-Check Questions](#self-check-questions)

---

<br>

## 1. Overview

### 1.1 Lab Goals

- Understand and implement the core DP patterns, **memoization** and **tabulation**.
- Build a 2D DP table for **LCS** and recover the actual subsequence via traceback.
- Implement the **0-1 Knapsack** problem with DP and trace selected items through traceback.
- Analyze how **LCS-based diff** is used in a real web application.

### 1.2 Lab Structure

| Section | Topic |
|:--------|:------|
| **A-1** | Fibonacci Comparison |
| **A-2** | LCS and DP Table Visualization |
| **A-3** | 0-1 Knapsack and Traceback |
| **B-1** | Text Diff Viewer |

*Table 1. Topic of each lab section*

### 1.3 Environment

The Type A code uses only the standard library, so no external packages are required; Flask is needed only for B-1.

---

<br>

## 2. Type A: Algorithm Implementation

### 2.1 A-1: Fibonacci Comparison

Compare three approaches to computing Fibonacci numbers and observe how DP eliminates redundant computation.

#### 2.1.1 Problem

**Goal:** Compute the same Fibonacci numbers in three ways and compare their measured running times.

```text
Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

F(0) = 0
F(1) = 1
F(n) = F(n-1) + F(n-2)   for n >= 2
```

**Why is naive recursion so slow?**

```text
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

*Figure 1. Call tree of naive recursion computing F(5)*

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

#### 2.1.3 Performance Results

```text
  N   |    Naive     |     Memo       |  Tabulation
------+--------------+----------------+----------------
  10  |   0.000005s  |   0.000003s    |   0.000002s
  20  |   0.001200s  |   0.000004s    |   0.000002s
  30  |   0.150000s  |   0.000005s    |   0.000003s
  35  |   1.800000s  |   0.000005s    |   0.000003s
  40  |   too slow   |   0.000006s    |   0.000003s
```

The measurements are approximate and vary with the execution environment.

**Key comparison:**

| Approach | Time | Space | Direction |
|:---------|:-----|:------|:----------|
| Naive recursion | $O(2^n)$ | O(n) stack | N/A |
| Memoization | O(n) | O(n) cache + stack | Top-down |
| Tabulation | O(n) | O(n) table | Bottom-up |

*Table 2. Time, space, and direction of the three Fibonacci approaches*

**Memoization** is recursion plus caching, and **tabulation** is iterative table filling.
Both eliminate overlapping subproblems, and tabulation also avoids recursion overhead.

---

<br>

### 2.2 A-2: LCS and DP Table Visualization

#### 2.2.1 Problem

**Problem:** Find the **longest common subsequence (LCS)** of two strings.

A **subsequence** preserves order but not necessarily contiguity.

```text
X = "ABCBDAB"
Y = "BDCAB"

Common subsequences: "B", "AB", "BD", "BCB", "BCAB", ...
Longest: "BCAB" (length 4)

X: A B C B D A B
     ^ ^     ^ ^
Y: B D C A B
   ^   ^ ^ ^
```

*Figure 2. Common subsequences of X and Y with the positions of LCS characters marked*

**Recurrence:**

```text
If X[i] == Y[j]:   dp[i][j] = dp[i-1][j-1] + 1   (match!)
If X[i] != Y[j]:   dp[i][j] = max(dp[i-1][j], dp[i][j-1])
```

**Time:** O(m × n), **Space:** O(m × n)

#### 2.2.2 DP Table

```text
X = "ABCBDAB",  Y = "BDCAB"

          ""   B    D    C    A    B
          0    1    2    3    4    5
    ----------------------------------
 "" 0 |   0    0    0    0    0    0
  A 1 |   0    0    0    0    1    1
  B 2 |   0   [1]  (1)   1    1    2
  C 3 |   0    1    1   [2]   2    2
  B 4 |   0    1    1   (2)   2    3
  D 5 |   0    1    2   (2)   2    3
  A 6 |   0    1    2    2   [3]   3
  B 7 |   0    1    2    2    3   [4]

  [n] = match (diagonal move, included in LCS)
  (n) = traceback path
```

*Figure 3. LCS DP table for X = ABCBDAB and Y = BDCAB*

**LCS = `BCAB`** (length 4)

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

#### 2.2.4 Traceback Visualization

```text
Start at dp[7][5] = 4, trace back to dp[0][0]:

  (7,5): X[7]='B' == Y[5]='B' -> diagonal (MATCH: 'B')
  (6,4): X[6]='A' == Y[4]='A' -> diagonal (MATCH: 'A')
  (5,3): X[5]='D' != Y[3]='C' -> up  (dp[4][3]=2 >= dp[5][2]=2)
  (4,3): X[4]='B' != Y[3]='C' -> up  (dp[3][3]=2 >= dp[4][2]=1)
  (3,3): X[3]='C' == Y[3]='C' -> diagonal (MATCH: 'C')
  (2,2): X[2]='B' != Y[2]='D' -> left (dp[1][2]=0 < dp[2][1]=1)
  (2,1): X[2]='B' == Y[1]='B' -> diagonal (MATCH: 'B')

Collected (reversed): B -> C -> A -> B = "BCAB"
```

**Applications of LCS:**

- **git diff:** compares file versions line by line.
- **DNA sequence alignment:** compares genetic sequences.
- **Edit distance:** finds the minimum number of edits to transform one string into another.

---

<br>

### 2.3 A-3: 0-1 Knapsack and Traceback

#### 2.3.1 Problem

**Problem:** Select items to maximize value without exceeding capacity. Items **cannot be split**, so each is either taken whole or left.

```text
Capacity: 50

Item       Value   Weight
--------------------------
Laptop      60      10
Camera     100      20
Painting   120      30
Book        40       5
```

**Recurrence:**

```text
dp[i][j] = maximum value using first i items with capacity j

If weight_i > j:   dp[i][j] = dp[i-1][j]          (can't take item i)
Otherwise:         dp[i][j] = max(
                       dp[i-1][j],                  (skip item i)
                       dp[i-1][j - weight_i] + v_i  (take item i)
                   )
```

Which items should we pick?

#### 2.3.2 DP Table and Traceback

```text
          Capacity ->  0   5  10  15  20  25  30  35  40  45  50
          ---------------------------------------------------------
(none)  0 |            0   0   0   0   0   0   0   0   0   0   0
Laptop  1 |            0   0  60  60  60  60  60  60  60  60  60
Camera  2 |            0   0  60  60 100 100 160 160 160 160 160
Paint.  3 |            0   0  60  60 100 100 160 160 180 180 220
Book    4 |            0  40  60 100 100 140 160 200 200 220 220

Answer: dp[4][50] = 220

Trace back from dp[4][50]:
  dp[4][50]=220 == dp[3][50]=220 -> skip Book
  dp[3][50]=220 != dp[2][50]=160 -> TAKE Painting (j: 50->20)
  dp[2][20]=100 != dp[1][20]=60  -> TAKE Camera   (j: 20->0)
  dp[1][0]=0 == dp[0][0]=0      -> skip Laptop

Selected: Camera (100, 20kg) + Painting (120, 30kg) = 220
```

*Figure 4. DP table and traceback for the 0-1 knapsack example with capacity 50*

> **Note:** **Another optimal solution.** Laptop + Painting + Book (weight 45, value 220) is another optimal solution with the same maximum value. The code in Section 2.3.3 skips an item when dp[i][j] = dp[i-1][j], so it picks Camera + Painting.

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

**Time:** O(n × W), **Space:** O(n × W) (W = capacity)

---

<br>

## 3. Type B: Web Code Analysis

### 3.1 B-1: Text Diff Viewer

#### 3.1.1 Setup

Install dependencies first with `pip install flask`, then run the Flask app.

Enter two texts and the app highlights the differences based on **LCS**.

```text
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

```text
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

*Figure 5. Processing steps and token alignment of LCS-based diff*

**Experiment:**

- Try short sentences with a few word changes.
- Try longer paragraphs and observe how LCS captures the common structure.
- Consider why this approach is O(m × n), where m and n are the token counts.

---

<br>

## 4. The DP Recipe

Design a DP algorithm in the following five steps.

```text
1. Define the subproblem   — what does dp[i][j] represent?
2. Write the recurrence    — how does dp[i][j] relate to smaller subproblems?
3. Identify base cases     — dp[0][...] = ?, dp[...][0] = ?
4. Determine fill order    — usually left-to-right, top-to-bottom
5. Trace back if needed    — recover the actual solution, not just the value
```

---

<br>

## Summary

| Concept | Key Summary |
|---------|-------------|
| Fibonacci | Naive recursion takes $O(2^n)$, while memoization and tabulation eliminate overlapping subproblems and compute in O(n). |
| LCS | A 2D DP table is filled and then traceback recovers the actual subsequence. |
| 0-1 Knapsack | The DP table is built and traceback finds the selected items. |
| Text Diff | It applies LCS to a real web application and works on the same principle as GitHub diff. |
| DP recipe | A DP is designed by defining the subproblem, writing the recurrence, identifying base cases, determining the fill order, and tracing back when needed. |

---

<br>

## Self-Check Questions

1. Why does naive recursion for Fibonacci have $O(2^n)$ time complexity? Draw the recursion tree for F(5) and count how many times F(2) is computed.

   <details>
   <summary>Answer</summary>

   Each call branches into two recursive calls and the recursion depth is at most $n$, so the call tree has at most about $2^n$ nodes. The tree is not balanced, because the right branch is shorter, so the exact number of calls grows as $\Theta(\phi^n)$ with $\phi \approx 1.618$. The same subproblem is recomputed across many branches: in `F(5)` the call tree has `F(5) → F(4), F(3)`; `F(4) → F(3), F(2)`; both copies of `F(3) → F(2), F(1)`. Counting all leaves under those branches, **F(2) is computed 3 times** (and F(1) 5 times, F(0) 3 times). The redundancy grows exponentially with $n$, which gives the $O(2^n)$ bound.

   </details>

2. In the LCS problem, what is the role of the traceback step? Why is the final value dp[m][n] alone not enough to determine the actual subsequence?

   <details>
   <summary>Answer</summary>

   The DP table stores only the **length** of the LCS at each cell, not which characters were chosen. Many different subsequences can produce the same length, so `dp[m][n] = 4` tells us the LCS is 4 characters but not *which* 4. **Traceback** walks the table from `dp[m][n]` back to `dp[0][0]`, replaying the decision at each cell: on a match (`X[i] == Y[j]`) it emits the character and moves diagonally; otherwise it steps in the direction of the larger neighbor. Each step is $O(1)$, so reconstruction adds only $O(m+n)$ to the algorithm.

   </details>

3. For the 0-1 Knapsack example, why is the Book (value 40, weight 5) not selected even though it has the best value/weight ratio (8.0/kg)?

   <details>
   <summary>Answer</summary>

   **0-1 Knapsack is not solved by greedy ratio selection** because items are indivisible. Taking items in ratio order picks Book (8.0/kg), Laptop (6.0/kg), and Camera (5.0/kg), reaching only value 200 at weight 35, and Painting no longer fits. Camera (100, 20) + Painting (120, 30) fills the bag exactly to 50 with value **220**. Another optimal solution, Laptop + Painting + Book (weight 45), also reaches 220, so the Book is not excluded from every optimum. The traceback in Section 2.3.3 sees dp[4][50] = dp[3][50] = 220, meaning the maximum is reachable without the Book, and skips it. DP compares all subset combinations implicitly, so it recognizes that the **combined value of an item combination** beats the ratio-first choice.

   </details>

4. How does the text diff viewer use LCS? Explain why this approach is O(m × n) and what happens when texts are very long.

   <details>
   <summary>Answer</summary>

   The two texts are tokenized (by word or line), and **LCS over the token sequences** identifies the longest aligned common run. Tokens inside the LCS are unchanged, tokens only in A are **deletions**, tokens only in B are **insertions**. Building the LCS table is $O(m \times n)$ because every cell is filled in $O(1)$ time. For very long texts this becomes problematic: a 10,000-line vs 10,000-line diff requires $10^8$ cells and as much memory. Production tools (like `git diff`) use **Myers' diff algorithm** ($O((m+n)D)$ where $D$ is edit distance) and Hunt-McIlroy-style optimizations to do much better in practice.

   </details>

5. Compare memoization and tabulation: when would you prefer one over the other? Consider stack depth, ease of implementation, and cache efficiency.

   <details>
   <summary>Answer</summary>

   **Memoization** is easier to write, since you add a cache check to the natural recursive definition, and it only solves subproblems actually reached, which helps when the state space is sparse. Its downsides are **recursion overhead** and **stack depth** limits (Python defaults to about 1000 frames; deep DP recurrences exceed the limit without `sys.setrecursionlimit`). **Tabulation** iterates in dependency order, avoiding recursion entirely; it has lower constant factors, better **cache locality** (sequential memory access), and can be space-optimized to $O(1)$ rows. Prefer memoization for sparsely needed states or complex recurrences; prefer tabulation when performance matters and most states are needed.

   </details>

6. In the DP recipe, why does fill order matter? What would happen if you tried to fill the LCS table from bottom-right to top-left?

   <details>
   <summary>Answer</summary>

   Fill order must respect the **dependency direction** of the recurrence: every cell needs its inputs already computed. The LCS recurrence reads `dp[i-1][j-1]`, `dp[i-1][j]`, and `dp[i][j-1]`, so filling left-to-right and top-to-bottom guarantees those are ready. Reversing to **bottom-right → top-left** reads cells that have not yet been computed; they still hold initialization values (0), producing garbage. To go in reverse, you would need to redefine `dp[i][j]` as the LCS of the *suffixes* `X[i..m]` and `Y[j..n]` with the dependencies flipped accordingly.

   </details>
