# Week 6 Lecture — Dynamic Programming

> **Last Modified:** 2026-04-07
>
> **Prerequisites**: Week 2: Asymptotic notation and complexity analysis. Week 4: Divide and conquer paradigm (for comparison with DP). Week 5: Greedy algorithms (for comparison with DP). Recursion and recursive thinking. Basic matrix operations.
>
> **Learning Objectives**:
> 1. Define dynamic programming and state its two required properties (optimal substructure, overlapping subproblems)
> 2. Distinguish DP from divide-and-conquer and explain when each is appropriate
> 3. Implement both top-down (memoization) and bottom-up (tabulation) DP strategies
> 4. Solve the Fibonacci, matrix path, LCS, 0-1 knapsack, coin change, Floyd-Warshall, and edit distance problems using DP
> 5. Formulate DP recurrences: define subproblems, identify base cases, and determine computation order
> 6. Analyze time and space complexity of DP algorithms
> 7. Compare DP with greedy algorithms and decide which approach to use for a given problem

---

## Table of Contents

- [1. Foundations of Dynamic Programming](#1-foundations-of-dynamic-programming)
  - [1.1 Recursive Solutions — Light and Shadow](#11-recursive-solutions--light-and-shadow)
  - [1.2 What is Dynamic Programming?](#12-what-is-dynamic-programming)
  - [1.3 DP vs Divide-and-Conquer](#13-dp-vs-divide-and-conquer)
  - [1.4 Two DP Implementation Strategies](#14-two-dp-implementation-strategies)
  - [1.5 Example — Fibonacci Numbers](#15-example--fibonacci-numbers)
  - [1.6 Fibonacci — Memoization vs Bottom-Up DP](#16-fibonacci--memoization-vs-bottom-up-dp)
  - [1.7 Example — Matrix Path Problem](#17-example--matrix-path-problem)
  - [1.8 Matrix Path — DP Table](#18-matrix-path--dp-table)
- [2. Classic DP Problems](#2-classic-dp-problems)
  - [2.1 LCS — Problem Definition](#21-lcs--problem-definition)
  - [2.2 LCS — Recurrence Relation](#22-lcs--recurrence-relation)
  - [2.3 LCS — Pseudocode](#23-lcs--pseudocode)
  - [2.4 LCS — Step-by-Step Example](#24-lcs--step-by-step-example)
  - [2.5 0-1 Knapsack Problem](#25-0-1-knapsack-problem)
  - [2.6 Knapsack — Recurrence](#26-knapsack--recurrence)
  - [2.7 Knapsack — Worked Example](#27-knapsack--worked-example)
  - [2.8 Coin Change Problem](#28-coin-change-problem)
  - [2.9 Coin Change — Algorithm and Example](#29-coin-change--algorithm-and-example)
  - [2.10 Floyd-Warshall — All-Pairs Shortest Paths](#210-floyd-warshall--all-pairs-shortest-paths)
  - [2.11 Floyd-Warshall — Algorithm](#211-floyd-warshall--algorithm)
  - [2.12 Floyd-Warshall — Example](#212-floyd-warshall--example)
  - [2.13 Edit Distance (Levenshtein Distance)](#213-edit-distance-levenshtein-distance)
  - [2.14 Edit Distance — Example](#214-edit-distance--example)
- [3. DP Problem-Solving Strategy](#3-dp-problem-solving-strategy)
- [Summary](#summary)

---

<br>

## 1. Foundations of Dynamic Programming

### 1.1 Recursive Solutions — Light and Shadow

**When recursion works well:**
- Subproblem inputs sum to at most the original input size
- Merge sort, quick sort, factorial, graph DFS

**When recursion is catastrophic:**
- Subproblem inputs sum to **more** than the original input
- Fibonacci numbers, matrix chain multiplication

> The key issue: **overlapping subproblems** cause exponential redundant computation.

### 1.2 What is Dynamic Programming?

**Dynamic Programming (DP)** avoids redundant computation by:

1. Solving **small subproblems** first
2. **Storing** (memorizing) their solutions
3. Using stored solutions to solve **larger subproblems**
4. Building up to the **original problem**

**Two requirements for DP:**

| Property | Description |
|----------|-------------|
| **Optimal Substructure** | Optimal solution contains optimal solutions to subproblems |
| **Overlapping Subproblems** | Recursive solution re-solves the same subproblems repeatedly |

> **Key Idea:** DP transforms an exponential recursive algorithm into a polynomial one by ensuring each subproblem is solved exactly once. The "programming" in dynamic programming refers to a tabular method, not computer programming.

### 1.3 DP vs Divide-and-Conquer

```
DaC                    DP
   A                    A
  / \                  / \
 B   C                B   C
/|   |\              /|\ /|\
D E   F G            D  E F  G
                       (shared!)
```

- **Divide-and-Conquer**: subproblems are **independent** — each is solved once
- **DP**: subproblems **overlap** — solve once, store, and reuse
- **DaC**: top-down | **DP**: bottom-up (small to large)

The recursive call tree in DaC is a **tree** (no repeated nodes), while in DP the subproblem dependencies form a **DAG** (directed acyclic graph) with shared nodes.

### 1.4 Two DP Implementation Strategies

**Top-Down: Memoization**
- Use recursion but cache results in a table
- Only solve subproblems that are actually needed

**Bottom-Up: Tabulation**
- Fill a table iteratively from smallest subproblems
- Systematic — solves all subproblems in order

```
Top-Down (Memoization)              Bottom-Up (Tabulation)
┌─────────────────────┐             ┌─────────────────────┐
│ fib(n):             │             │ f[1] = f[2] = 1     │
│   if memo[n] exists │             │ for i = 3 to n:     │
│     return memo[n]  │             │   f[i] = f[i-1]     │
│   memo[n] = fib(n-1)│             │        + f[i-2]     │
│            +fib(n-2)│             │ return f[n]          │
│   return memo[n]    │             │                     │
└─────────────────────┘             └─────────────────────┘
```

> **When to use which?** Memoization is easier to implement (just add caching to recursion) and avoids solving unnecessary subproblems. Tabulation avoids recursion overhead and is typically faster in practice. Most DP problems can be solved either way.

### 1.5 Example — Fibonacci Numbers

**Definition:** $f(n) = f(n-1) + f(n-2)$, with $f(1) = f(2) = 1$

**Naive recursion:**

```
fib(n):
    if n = 1 or n = 2: return 1
    return fib(n-1) + fib(n-2)
```

**Call tree for fib(7):** Enormous redundancy!

```
              fib(7)
            /        \
        fib(6)       fib(5)        <- fib(5) computed twice
        /    \        /   \
    fib(5) fib(4)  fib(4) fib(3)   <- fib(4) computed 3 times
     ...    ...     ...    ...      <- fib(3) computed 5 times!
```

**Time complexity:** $O(2^n)$ — exponential!

### 1.6 Fibonacci — Memoization vs Bottom-Up DP

**Memoization (Top-Down):**

```
f[1] = f[2] = 1; all others = 0

fib(n):
    if f[n] != 0: return f[n]
    f[n] = fib(n-1) + fib(n-2)
    return f[n]
```

**Bottom-Up DP (Tabulation):**

```
fibonacci(n):
    f[1] = f[2] = 1
    for i = 3 to n:
        f[i] = f[i-1] + f[i-2]
    return f[n]
```

| i   | 1 | 2 | 3 | 4 | 5  | 6  | 7  |
|-----|---|---|---|---|----|----|----|
| f[i]| 1 | 1 | 2 | 3 | 5  | 8  | 13 |

**Both achieve O(n) time** — from exponential to linear!

### 1.7 Example — Matrix Path Problem

**Problem:** Given an $n \times n$ matrix of positive integers, find the path from top-left $(1,1)$ to bottom-right $(n,n)$ that **maximizes** the sum of visited cells.

**Constraint:** Only move **right** or **down** (no left, up, or diagonal).

```
┌────┬────┬────┬────┐
│  6 │  7 │ 12 │  5 │
├────┼────┼────┼────┤
│  5 │  3 │ 11 │ 18 │
├────┼────┼────┼────┤
│  7 │ 17 │  3 │  3 │
├────┼────┼────┼────┤
│  8 │ 10 │ 14 │  9 │
└────┴────┴────┴────┘
```

**Recurrence:** $c[i, j] = m_{ij} + \max(c[i-1, j],\ c[i, j-1])$

Boundary: $c[i, 0] = c[0, j] = 0$

> **Optimal Substructure:** The best path to cell $(i,j)$ must arrive from either the cell above $(i-1,j)$ or the cell to the left $(i,j-1)$, whichever yields a higher cumulative sum.

### 1.8 Matrix Path — DP Table

```
matrixPath(n):
    for i = 0 to n: c[i, 0] = 0
    for j = 1 to n: c[0, j] = 0
    for i = 1 to n:
        for j = 1 to n:
            c[i, j] = m[i,j] + max(c[i-1, j], c[i, j-1])
    return c[n, n]
```

| c    |  0 |  1 |  2 |  3 |  4 |
|------|----|----|----|----|-----|
| **0**|  0 |  0 |  0 |  0 |  0 |
| **1**|  0 |  6 | 13 | 25 | 30 |
| **2**|  0 | 11 | 16 | 36 | 54 |
| **3**|  0 | 18 | 35 | 39 | 57 |
| **4**|  0 | 26 | 45 | 59 | **68** |

**Answer:** $c[4, 4] = 68$. **Time:** $O(n^2)$.

---

<br>

## 2. Classic DP Problems

### 2.1 LCS — Problem Definition

**Longest Common Subsequence (LCS)**

- A **subsequence** is obtained by deleting zero or more characters without changing the order of remaining characters
- A **common subsequence** of X and Y appears in both strings
- The **LCS** is the longest such common subsequence

**Example:**
- X = `ABCBDAB`, Y = `BDCABA`
- Common subsequence: `BCA` (length 3)
- **LCS**: `BCBA` (length **4**)

**Goal:** Find the **length** of the LCS (and optionally the sequence itself).

### 2.2 LCS — Recurrence Relation

Let $X_m = \langle x_1, x_2, \ldots, x_m \rangle$ and $Y_n = \langle y_1, y_2, \ldots, y_n \rangle$.

Define $c[i, j]$ = length of LCS of $X_i$ and $Y_j$.

$$
c[i, j] = \begin{cases}
0 & \text{if } i = 0 \text{ or } j = 0 \\
c[i-1, j-1] + 1 & \text{if } i,j > 0 \text{ and } x_i = y_j \\
\max(c[i-1, j],\ c[i, j-1]) & \text{if } i,j > 0 \text{ and } x_i \neq y_j
\end{cases}
$$

**Intuition:**
- If the last characters **match**: extend LCS of shorter prefixes by 1
- If they **don't match**: take the better result from dropping either character

### 2.3 LCS — Pseudocode

```
LCS(m, n):
    for i = 0 to m: C[i, 0] = 0    // empty Y
    for j = 0 to n: C[0, j] = 0    // empty X
    for i = 1 to m:
        for j = 1 to n:
            if x[i] = y[j]:
                C[i, j] = C[i-1, j-1] + 1
            else:
                C[i, j] = max(C[i-1, j], C[i, j-1])
    return C[m, n]
```

**Time:** $\Theta(mn)$ — fill an $m \times n$ table, each cell in $O(1)$.

**Space:** $\Theta(mn)$ for the table (can be optimized to $O(\min(m,n))$).

### 2.4 LCS — Step-by-Step Example

X = `ABCBDAB`, Y = `BDCABA`

| c |   | B | D | C | A | B | A |
|---|---|---|---|---|---|---|---|
|   | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **A** | 0 | 0 | 0 | 0 | **1** | 1 | 1 |
| **B** | 0 | **1** | 1 | 1 | 1 | **2** | 2 |
| **C** | 0 | 1 | 1 | **2** | 2 | 2 | 2 |
| **B** | 0 | 1 | 1 | 2 | 2 | **3** | 3 |
| **D** | 0 | 1 | **2** | 2 | 2 | 3 | 3 |
| **A** | 0 | 1 | 2 | 2 | **3** | 3 | **4** |
| **B** | 0 | 1 | 2 | 2 | 3 | **4** | 4 |

**LCS length = 4** (e.g., `BCBA`). Bold cells show where $x_i = y_j$ (diagonal + 1).

> **Traceback:** To recover the actual LCS (not just its length), trace back from $c[m,n]$: if $x_i = y_j$, include that character and move diagonally; otherwise, move in the direction of the larger value.

### 2.5 0-1 Knapsack Problem

**Problem:** Given $n$ items, each with weight $w_i$ and value $v_i$, and a knapsack of capacity $C$, maximize total value without exceeding capacity.

**Example:** Capacity $C = 10$ kg

| Item | Weight | Value |
|------|--------|-------|
| 1    | 5 kg   | 10    |
| 2    | 4 kg   | 40    |
| 3    | 6 kg   | 30    |
| 4    | 3 kg   | 50    |

**Subproblem:** $K[i, w]$ = max value considering items $1 \ldots i$ with capacity $w$.

**Answer:** $K[n, C]$

> **Why greedy fails for 0-1 knapsack:** The greedy approach (sort by value/weight ratio) does not work because items cannot be divided. Taking a high-ratio item might prevent taking a combination of items with higher total value.

### 2.6 Knapsack — Recurrence

For each item $i$ and capacity $w$:

$$
K[i, w] = \begin{cases}
0 & \text{if } i = 0 \text{ or } w = 0 \\
K[i-1, w] & \text{if } w_i > w \text{ (item too heavy)} \\
\max(K[i-1, w],\ K[i-1, w - w_i] + v_i) & \text{otherwise}
\end{cases}
$$

**Two choices for item $i$:**
- **Don't take it:** value = $K[i-1, w]$
- **Take it:** value = $K[i-1, w - w_i] + v_i$ (make room, add value)

```
Knapsack(n, C):
    for i = 0 to n: K[i, 0] = 0
    for w = 0 to C: K[0, w] = 0
    for i = 1 to n:
        for w = 1 to C:
            if w[i] > w: K[i,w] = K[i-1, w]
            else: K[i,w] = max(K[i-1,w], K[i-1,w-w[i]] + v[i])
    return K[n, C]
```

### 2.7 Knapsack — Worked Example

Items: (5kg, $10), (4kg, $40), (6kg, $30), (3kg, $50). Capacity = 10.

| K[i,w] | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|--------|---|---|---|---|---|---|---|---|---|---|-----|
| **0**  | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0   |
| **1** (5,10)| 0 | 0 | 0 | 0 | 0 | 10 | 10 | 10 | 10 | 10 | 10 |
| **2** (4,40)| 0 | 0 | 0 | 0 | 40 | 40 | 40 | 40 | 40 | 50 | 50 |
| **3** (6,30)| 0 | 0 | 0 | 0 | 40 | 40 | 40 | 40 | 40 | 50 | 70 |
| **4** (3,50)| 0 | 0 | 0 | 50 | 50 | 50 | 50 | 90 | 90 | 90 | **90** |

**Optimal value:** $K[4, 10] = 90$ (items 2 + 4: 4kg + 3kg = 7kg, $40 + $50 = $90).

**Time:** $O(nC)$ — pseudo-polynomial (depends on capacity value, not input size).

### 2.8 Coin Change Problem

**Problem:** Given coin denominations $d_1 > d_2 > \cdots > d_k = 1$ and amount $n$, find the **minimum number of coins** to make change for $n$.

**Greedy can fail!** Example: coins = {16, 10, 5, 1}, amount = 20.
- Greedy: 16 + 1 + 1 + 1 + 1 = **5 coins**
- Optimal: 10 + 10 = **2 coins**

**DP Recurrence:**

$$C[j] = \min_{d_i \leq j} \{ C[j - d_i] + 1 \}$$

Base case: $C[0] = 0$.

### 2.9 Coin Change — Algorithm and Example

```
DPCoinChange(n, d[1..k]):
    C[0] = 0
    for j = 1 to n: C[j] = infinity
    for j = 1 to n:
        for i = 1 to k:
            if d[i] <= j and C[j - d[i]] + 1 < C[j]:
                C[j] = C[j - d[i]] + 1
    return C[n]
```

**Example:** coins = {16, 10, 5, 1}, amount = 20

| j  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | ... | 16 | ... | 20 |
|----|---|---|---|---|---|---|---|---|---|---|----|----|----|----|-----|
| C[j]| 0 | 1 | 2 | 3 | 4 | 1 | 2 | 3 | 4 | 5 | 1  | ...| 1  | ...| **2** |

**Answer:** $C[20] = 2$ (two 10-coins). **Time:** $O(nk)$.

### 2.10 Floyd-Warshall — All-Pairs Shortest Paths

**Problem:** Find shortest paths between **all pairs** of vertices in a weighted directed graph.

**Key idea:** Incrementally allow intermediate vertices $\{1, 2, \ldots, k\}$.

**Recurrence:**

$$
d_{ij}^{(k)} = \min\left(d_{ij}^{(k-1)},\ d_{ik}^{(k-1)} + d_{kj}^{(k-1)}\right)
$$

- $d_{ij}^{(0)} = w_{ij}$ (direct edge weight, or $\infty$ if no edge)
- $d_{ii}^{(0)} = 0$

**Interpretation:** Is it shorter to go from $i$ to $j$ **through vertex $k$**, or without it?

### 2.11 Floyd-Warshall — Algorithm

```
FloydWarshall(W, n):
    // W[i,j] = edge weight (infinity if no edge)
    D = W                    // initialize D^(0)
    for k = 1 to n:          // add vertex k as intermediate
        for i = 1 to n:
            for j = 1 to n:
                D[i,j] = min(D[i,j], D[i,k] + D[k,j])
    return D
```

**Time:** $O(n^3)$ — three nested loops over $n$ vertices.

**Space:** $O(n^2)$ — the distance matrix.

**Note:** Each iteration $k$ considers all paths that may pass through vertices $\{1, 2, \ldots, k\}$ as intermediates.

### 2.12 Floyd-Warshall — Example

```
Initial D^(0):            After k=1,2,3,4: D^(4):
|   1   2   3   4         |   1   2   3   4
|-------------------      |-------------------
1|  0   3  inf  7         1|  0   3   5   6
2| inf  0   2  inf        2|  5   0   2   3
3|  5  inf  0   1         3|  3   6   0   1
4|  2  inf inf  0         4|  2   5   7   0
```

Each cell $D[i,j]$ now holds the shortest distance from $i$ to $j$.

### 2.13 Edit Distance (Levenshtein Distance)

**Problem:** Given two strings $X[1 \ldots m]$ and $Y[1 \ldots n]$, find the minimum number of single-character operations to transform $X$ into $Y$.

**Operations** (each costs 1):
- **Insert** a character
- **Delete** a character
- **Replace** a character

**DP Recurrence:**

$$
E[i,j] = \begin{cases}
j & \text{if } i = 0 \\
i & \text{if } j = 0 \\
E[i-1,j-1] & \text{if } X[i] = Y[j] \\
1 + \min(E[i-1,j],\ E[i,j-1],\ E[i-1,j-1]) & \text{otherwise}
\end{cases}
$$

- $E[i-1,j] + 1$: delete $X[i]$
- $E[i,j-1] + 1$: insert $Y[j]$
- $E[i-1,j-1] + 1$: replace $X[i]$ with $Y[j]$

> **Applications:** Edit distance is widely used in spell checking, DNA sequence alignment, diff tools, and natural language processing.

### 2.14 Edit Distance — Example

Transform "**kitten**" to "**sitting**" (m=6, n=7):

| E | $\varepsilon$ | s | i | t | t | i | n | g |
|---|---|---|---|---|---|---|---|---|
| $\varepsilon$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| **k** | 1 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| **i** | 2 | 2 | 1 | 2 | 3 | 4 | 5 | 6 |
| **t** | 3 | 3 | 2 | 1 | 2 | 3 | 4 | 5 |
| **t** | 4 | 4 | 3 | 2 | 1 | 2 | 3 | 4 |
| **e** | 5 | 5 | 4 | 3 | 2 | 2 | 3 | 4 |
| **n** | 6 | 6 | 5 | 4 | 3 | 3 | 2 | 3 |

**Answer:** $E[6,7] = 3$ — three operations:
1. **k** -> **s** (replace)
2. **e** -> **i** (replace)
3. insert **g** at end

**Time:** $O(mn)$ | **Space:** $O(mn)$, reducible to $O(\min(m,n))$

---

<br>

## 3. DP Problem-Solving Strategy

**Step-by-step approach to any DP problem:**

1. **Define the subproblem** — What does $OPT[i, j, \ldots]$ represent?
2. **Find the recurrence** — How does $OPT[\cdot]$ relate to smaller subproblems?
3. **Identify base cases** — What are the trivial/boundary values?
4. **Determine computation order** — Fill table bottom-up (small to large)
5. **Extract the answer** — Where in the table is the final solution?
6. (Optional) **Trace back** — Reconstruct the actual solution, not just its value

---

<br>

## Summary

| Problem | Subproblem | Recurrence | Time |
|---------|-----------|------------|------|
| Fibonacci | $f[i]$ | $f[i] = f[i-1] + f[i-2]$ | $O(n)$ |
| Matrix Path | $c[i,j]$ | $c[i,j] = m_{ij} + \max(c[i-1,j], c[i,j-1])$ | $O(n^2)$ |
| LCS | $c[i,j]$ | match: $c[i-1,j-1]+1$; else: $\max(c[i-1,j], c[i,j-1])$ | $O(mn)$ |
| 0-1 Knapsack | $K[i,w]$ | $\max(K[i-1,w], K[i-1,w-w_i]+v_i)$ | $O(nC)$ |
| Coin Change | $C[j]$ | $\min_{d_i \leq j}(C[j-d_i]+1)$ | $O(nk)$ |
| Floyd-Warshall | $d_{ij}^{(k)}$ | $\min(d_{ij}^{(k-1)}, d_{ik}^{(k-1)}+d_{kj}^{(k-1)})$ | $O(n^3)$ |
| Edit Distance | $E[i,j]$ | match: $E[i-1,j-1]$; else: $1+\min(E[i-1,j], E[i,j-1], E[i-1,j-1])$ | $O(mn)$ |

**Key Takeaways:**
- **DP** solves optimization problems by combining solutions to overlapping subproblems
- Requires **optimal substructure** and **overlapping subproblems**
- Subproblems have an **implicit order** — solve small ones first
- Two strategies: **memoization** (top-down) and **tabulation** (bottom-up)
- DP vs Greedy: DP considers **all** subproblem combinations; Greedy makes **one** local choice
- DP vs DaC: DP **reuses** subproblem solutions; DaC subproblems are **independent**

> "Those who cannot remember the past are condemned to repeat it."
> — George Santayana (and also Dynamic Programming)

---

<br>

## Self-Check Questions

1. **Optimal Substructure:** In your own words, explain what "optimal substructure" means. Give an example of a problem that has it and one that does not.
2. **Memoization vs Tabulation:** What are the trade-offs between top-down (memoization) and bottom-up (tabulation) DP? When might you prefer one over the other?
3. **Fibonacci:** Draw the call tree for `fib(6)` using naive recursion. How many times is `fib(3)` computed? Then show how memoization eliminates the redundancy.
4. **LCS:** Compute the LCS table for X = `ABCB` and Y = `BDCB`. What is the LCS length? Trace back to find the actual LCS.
5. **0-1 Knapsack:** Given items (weight, value): (2, 12), (1, 10), (3, 20), (2, 15) and capacity 5, fill the DP table. What is the optimal value and which items are selected?
6. **Coin Change:** With denominations {25, 10, 6, 1}, find the minimum coins for amount 30 using DP. Show why the greedy approach (largest coin first) gives a suboptimal answer.
7. **Floyd-Warshall:** Given a 4-vertex graph, trace through the algorithm for one iteration (k=2). Which cells change and why?
8. **Edit Distance:** Compute the edit distance between "sunday" and "saturday". Show the DP table and identify the three operations needed.
