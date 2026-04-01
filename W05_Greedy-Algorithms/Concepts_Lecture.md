# W05 Lecture — Greedy Algorithms

> **Last Modified:** 2026-03-31
>
> **Prerequisites**: Week 2: Asymptotic notation and complexity analysis. Week 3: Sorting algorithms (used as subroutines in greedy algorithms). Week 4: Divide and conquer paradigm (for comparison with greedy). Basic graph theory: vertices, edges, weighted graphs, trees, cycles (for MST and Dijkstra sections).
>
> **Learning Objectives**:
> 1. Define the greedy paradigm and state the two conditions for greedy correctness (greedy-choice property, optimal substructure)
> 2. Identify when greedy works and when it fails, with concrete counterexamples
> 3. Solve the fractional knapsack problem using the greedy approach and explain why it fails for 0-1 knapsack
> 4. Apply the activity selection algorithm (earliest finish time) and the job scheduling algorithm (earliest start time)
> 5. Construct a Huffman tree from character frequencies and compute the compression ratio
> 6. Execute Kruskal's and Prim's MST algorithms and explain their differences
> 7. Execute Dijkstra's shortest path algorithm using edge relaxation and explain why it fails with negative weights
> 8. Compare greedy algorithms with dynamic programming and decide which approach to use for a given problem

---

## Table of Contents

- [1. Greedy Algorithm Fundamentals](#1-greedy-algorithm-fundamentals)
  - [1.1 What is a Greedy Algorithm?](#11-what-is-a-greedy-algorithm)
  - [1.2 Key Properties for Greedy Correctness](#12-key-properties-for-greedy-correctness)
  - [1.3 When Greedy Fails — Binary Tree Path Sum](#13-when-greedy-fails--binary-tree-path-sum)
  - [1.4 When Greedy Fails — Non-Standard Coin Change](#14-when-greedy-fails--non-standard-coin-change)
  - [1.5 Greedy in the Real World](#15-greedy-in-the-real-world)
- [2. Coin Change](#2-coin-change)
  - [2.1 Coin Change — Greedy Algorithm](#21-coin-change--greedy-algorithm)
- [3. Fractional Knapsack](#3-fractional-knapsack)
  - [3.1 Fractional Knapsack — Problem Definition](#31-fractional-knapsack--problem-definition)
  - [3.2 Fractional Knapsack — Algorithm](#32-fractional-knapsack--algorithm)
  - [3.3 Fractional Knapsack — Worked Example](#33-fractional-knapsack--worked-example)
  - [3.4 0-1 vs Fractional Knapsack — Why Greedy Fails for 0-1](#34-0-1-vs-fractional-knapsack--why-greedy-fails-for-0-1)
- [4. Job Scheduling](#4-job-scheduling)
  - [4.1 Job Scheduling — Algorithm](#41-job-scheduling--algorithm)
  - [4.2 Job Scheduling — Worked Example](#42-job-scheduling--worked-example)
- [5. Activity Selection](#5-activity-selection)
  - [5.1 Activity Selection — Algorithm](#51-activity-selection--algorithm)
- [6. Huffman Coding](#6-huffman-coding)
  - [6.1 Huffman Coding — Concept](#61-huffman-coding--concept)
  - [6.2 Huffman Coding — Algorithm](#62-huffman-coding--algorithm)
  - [6.3 Huffman Coding — Worked Example](#63-huffman-coding--worked-example)
  - [6.4 Huffman Coding — Compression Ratio](#64-huffman-coding--compression-ratio)
- [7. Minimum Spanning Tree (MST)](#7-minimum-spanning-tree-mst)
  - [7.1 MST — Problem Definition](#71-mst--problem-definition)
  - [7.2 Kruskal's MST Algorithm](#72-kruskals-mst-algorithm)
  - [7.3 Prim's MST Algorithm](#73-prims-mst-algorithm)
  - [7.4 Kruskal vs Prim — Visual Comparison](#74-kruskal-vs-prim--visual-comparison)
- [8. Dijkstra's Shortest Path Algorithm](#8-dijkstras-shortest-path-algorithm)
  - [8.1 Dijkstra's — Algorithm](#81-dijkstras--algorithm)
  - [8.2 Dijkstra's — Edge Relaxation](#82-dijkstras--edge-relaxation)
  - [8.3 Dijkstra's — Execution Trace](#83-dijkstras--execution-trace)
- [9. Greedy vs Dynamic Programming](#9-greedy-vs-dynamic-programming)
- [Summary](#summary)

---

<br>

## 1. Greedy Algorithm Fundamentals

### 1.1 What is a Greedy Algorithm?

A type of algorithm for solving **optimization problems**.

- **Optimization problem**: Find the best (maximum or minimum) solution among all feasible solutions
- At each step, make the **locally optimal choice** — the one that looks best *right now*
- Once a choice is made, it is **never reconsidered** (no backtracking)

**Generic Greedy Structure:**

```
Greedy(C):                          // C = set of all candidates
    S <- {}
    while C != {} and S is not a complete solution:
        x <- the best-looking element in C
        C <- C - {x}
        if S ∪ {x} is feasible:
            S <- S ∪ {x}
    if S is a complete solution: return S
    else: return "no solution"
```

> **Key Idea:** The essence of a greedy algorithm is that it always picks the option that looks best at the moment, without considering the future consequences. This makes greedy algorithms simple and fast, but they only produce optimal results when the problem has the right structural properties.

**Terminology:** A *feasible* solution satisfies all the problem's constraints (but may not be complete yet). A *complete* solution is one that cannot be extended further and represents a full answer to the problem.

### 1.2 Key Properties for Greedy Correctness

For a greedy algorithm to produce an **optimal** solution, two properties must hold:

**1. Greedy-Choice Property**
- A globally optimal solution can be reached by making locally optimal (greedy) choices
- We can prove that at least one optimal solution includes the greedy choice

**2. Optimal Substructure**
- An optimal solution to the problem contains optimal solutions to its subproblems
- After making a greedy choice, the remaining subproblem has the same structure

> **Greedy vs Dynamic Programming:** Both require optimal substructure. But DP considers *all* subproblems (bottom-up), while Greedy makes *one* choice and moves forward (top-down, no revisiting).

### 1.3 When Greedy Fails — Binary Tree Path Sum

**Binary Tree Maximum Path Sum:**

```
           10
         /    \
       36      15
      /  \    /  \
    3   18  35    2
   / \ / \ / \  / \
  30 45 55 50 32 67 38 33
```

- **Greedy**: At each node, go to the child with the larger value
  - Path: 10 -> 36 -> 18 -> 55 = **119**
- **Optimal**: 10 -> 15 -> 35 -> 67 = **127**

The greedy choice at the root (36 > 15) locks us out of the best path.

> **Key Idea:** This example illustrates the fundamental weakness of greedy: a locally optimal choice (picking 36 over 15) can prevent us from reaching the globally optimal solution. Without the greedy-choice property, greedy algorithms may produce suboptimal results.

### 1.4 When Greedy Fails — Non-Standard Coin Change

Standard denominations (500, 100, 50, 10, 1 won):
- Each denomination is a **multiple** of the next smaller one
- Greedy always gives an **optimal** result

Non-standard denominations (e.g., add 160-won coin):
- Make 200 won: Greedy picks 160 + 10 + 10 + 10 + 10 = **5 coins**
- Optimal: 100 + 100 = **2 coins**

> **Key Insight:** Greedy works for coin change only when denominations have a special structure (each is a multiple of the next smaller). For arbitrary denominations, use **Dynamic Programming**.

### 1.5 Greedy in the Real World

| Algorithm | Real-World Application |
|-----------|----------------------|
| **Coin Change** | ATM cash dispensers, vending machine change |
| **Fractional Knapsack** | Investment portfolio allocation, cargo loading (oil, grain) |
| **Activity Selection** | Conference room booking, TV broadcast scheduling, CPU task scheduling |
| **Huffman Coding** | ZIP/GZIP compression, JPEG image encoding, MP3 audio |
| **Kruskal's / Prim's MST** | Fiber optic network design, road construction planning, circuit wiring |
| **Dijkstra's** | GPS navigation (Google Maps, Naver Map), network routing (OSPF protocol) |

> Every time your phone finds a route, your file gets compressed, or a network cable is laid — a greedy algorithm is likely at work.

---

<br>

## 2. Coin Change

### 2.1 Coin Change — Greedy Algorithm

**Problem**: Given denominations (500, 100, 50, 10, 1), find the minimum number of coins for amount W.

```
CoinChange(W):
    change = W
    n500 = n100 = n50 = n10 = n1 = 0
    while change >= 500: change -= 500; n500++
    while change >= 100: change -= 100; n100++
    while change >= 50:  change -= 50;  n50++
    while change >= 10:  change -= 10;  n10++
    while change >= 1:   change -= 1;   n1++
    return n500 + n100 + n50 + n10 + n1
```

**Example**: W = 760
- 500-won: 1 coin (remaining 260)
- 100-won: 2 coins (remaining 60)
- 50-won: 1 coin (remaining 10)
- 10-won: 1 coin (remaining 0)
- **Total: 5 coins** (optimal for standard denominations)

**Time complexity**: O(n) where n = number of denomination types (constant in practice)

> **Note:** The greedy strategy here is straightforward: always use the largest denomination possible. This works because each Korean won denomination is a multiple of the next smaller one, ensuring that choosing a larger coin never blocks a better solution.

---

<br>

## 3. Fractional Knapsack

### 3.1 Fractional Knapsack — Problem Definition

**Problem definition:**
- n items, each with weight $w_i$ and value $v_i$
- Knapsack capacity C
- **Fractional**: items can be divided — take any fraction of an item
- **Goal**: Maximize total value in the knapsack

**Greedy idea:**
1. Compute **value per unit weight** ($v_i / w_i$) for each item
2. Sort items by value-per-weight in **decreasing** order
3. Take items greedily — whole items if they fit, fractional otherwise

> **0-1 Knapsack**: Items cannot be divided (take it or leave it) — requires **DP** or backtracking.
> **Fractional Knapsack**: Items can be divided — solved optimally by **Greedy**.

### 3.2 Fractional Knapsack — Algorithm

```
FractionalKnapsack(items, C):
    Input:  n items (each with weight, value), capacity C
    Output: list L of items in knapsack, total value v

    1. Compute value-per-weight for each item
    2. Sort items by value-per-weight in decreasing order -> S
    3. L = {}, w = 0, v = 0
    4. for each item x in S (in sorted order):
    5.     if w + x.weight <= C:
    6.         add x entirely to L
    7.         w += x.weight; v += x.value
    8.     else:
    9.         fraction = (C - w) / x.weight
    10.        add fraction of x to L
    11.        v += fraction * x.value
    12.        break
    13. return L, v
```

> **Key Idea:** The greedy-choice property holds because the item with the highest value-per-weight ratio contributes the most value per unit of capacity used. Taking as much of it as possible first is always part of an optimal solution.

### 3.3 Fractional Knapsack — Worked Example

**Knapsack capacity = 40 kg**

| Item | Weight | Value | Value/Weight |
|------|--------|-------|-------------|
| Platinum | 10 kg | 60 | **6** |
| Gold | 15 kg | 75 | **5** |
| Silver | 25 kg | 10 | 0.4 |
| Tin | 20 kg | 2 | 0.1 |

| Step | Action | w | v |
|------|--------|---|---|
| 1 | Take all Platinum (10 kg) | 10 | 60 |
| 2 | Take all Gold (15 kg) | 25 | 135 |
| 3 | Silver: take 15/25 = 0.6 | 40 | **141** |

![Fractional knapsack (CLRS)](../images/ch16_p014_003.png)

### 3.4 0-1 vs Fractional Knapsack — Why Greedy Fails for 0-1

**Items (CLRS Figure 16.2) — Knapsack capacity = 50 lbs:**

| Item | Weight | Value | Value/Weight |
|------|--------|-------|-------------|
| Item 1 | 10 lbs | $60 | 6 $/lb |
| Item 2 | 20 lbs | $100 | 5 $/lb |
| Item 3 | 30 lbs | $120 | 4 $/lb |

**Same items, same knapsack (50 lbs) — different results:**

| | 0-1 Knapsack | Fractional Knapsack |
|---|---|---|
| **Constraint** | Take it or leave it | Can take fractions |
| **Greedy choice** | Item 1 (best $/lb) | Item 1 (best $/lb) |
| **Greedy result** | $60 + $100 = **$160** | $60 + $100 + $80 = **$240** |
| **Optimal** | Item 2 + 3 = **$220** | Same as greedy = **$240** |

- **(b) 0-1**: Greedy picks item 1 first (6 $/lb), but this wastes 20 lbs of capacity -> suboptimal
- **(c) Fractional**: Greedy fills remaining space with 2/3 of item 3 -> **optimal**

*The figure above (CLRS Figure 16.2) shows all three scenarios: (a) items with weights and values, (b) 0-1 knapsack greedy result, (c) fractional knapsack greedy result.*

> **Key Insight:** In 0-1 knapsack, greedy can waste capacity. The "empty space cost" makes greedy suboptimal. Use **DP** for 0-1 knapsack.

---

<br>

## 4. Job Scheduling

### 4.1 Job Scheduling — Algorithm

**Problem**: Assign n jobs (each with start time and finish time) to the **minimum number of machines** such that no two jobs on the same machine overlap.

**Greedy strategy**: **Earliest Start Time First**

```
JobScheduling(jobs):
    Input:  n jobs, each with [start, finish]
    Output: assignment of jobs to machines

    1. Sort jobs by start time -> L
    2. while L is not empty:
    3.     take job t with earliest start time from L
    4.     if some existing machine is free at time t.start:
    5.         assign t to that machine
    6.     else:
    7.         create a new machine and assign t
    8.     remove t from L
    9. return machine assignments
```

> Among 4 strategies (earliest start, earliest finish, shortest first, longest first), only **earliest start time first** guarantees an optimal solution for the machine-minimization variant.

**Why other strategies fail (counterexample):** Consider Earliest Finish Time First for machine minimization with jobs [1,10], [2,3], [4,5], [6,7]. EFT sorts by finish time and assigns [2,3], [4,5], [6,7] to one machine and [1,10] to a second machine — 2 machines. However, EST processes [1,10] first (on Machine 1), then [2,3] starts a new Machine 2 (since Machine 1 is busy until 10), [4,5] goes to Machine 2 (free at 3), and [6,7] goes to Machine 2 (free at 5) — still 2 machines. In this case both give the same result, but EFT does not guarantee the minimum number of machines in general because it does not account for how long jobs occupy a machine.

### 4.2 Job Scheduling — Worked Example

**Jobs**: t1=[7,8], t2=[3,7], t3=[1,5], t4=[5,9], t5=[0,2], t6=[6,8], t7=[1,6]

**Sorted by start time**: [0,2], [1,6], [1,5], [3,7], [5,9], [6,8], [7,8]

| Step | Job | Assignment | Machines |
|------|-----|-----------|----------|
| 1 | [0,2] | Machine 1 | M1: [0,2] |
| 2 | [1,6] | Machine 2 (M1 busy until 2) | M1: [0,2], M2: [1,6] |
| 3 | [1,5] | Machine 3 (M1,M2 busy) | +M3: [1,5] |
| 4 | [3,7] | Machine 1 (free at 2) | M1: [0,2],[3,7] |
| 5 | [5,9] | Machine 3 (free at 5) | M3: [1,5],[5,9] |
| 6 | [6,8] | Machine 2 (free at 6) | M2: [1,6],[6,8] |
| 7 | [7,8] | Machine 1 (free at 7) | M1: [0,2],[3,7],[7,8] |

**Result**: 3 machines. **Time complexity**: O(n log n) + O(mn), where m = number of machines.

---

<br>

## 5. Activity Selection

The previous problem (Job Scheduling) minimized the number of machines needed for all jobs. Now we flip the question: given just ONE machine, how do we maximize the number of jobs that fit? This closely related problem requires a different greedy strategy.

### 5.1 Activity Selection — Algorithm

**Problem**: One machine (room), maximize the **number of non-overlapping jobs**.

**Greedy strategy**: **Earliest Finish Time First**

```
ActivitySelection(jobs):
    Sort jobs by finish time
    selected = {first job}
    last_finish = first job's finish time
    for each remaining job j:
        if j.start >= last_finish:
            selected = selected ∪ {j}
            last_finish = j.finish
    return selected
```

- Among the three strategies (shortest job, earliest start, earliest finish), only **earliest finish time first** guarantees optimal for the single-machine variant.
- **Time complexity**: O(n log n)

![Activity selection (CLRS)](../images/ch16_p007_001.png)

> **Key Idea:** Selecting the activity that finishes earliest leaves as much remaining time as possible for subsequent activities. This is the greedy-choice property: choosing the earliest-finishing compatible activity always belongs to some optimal solution.

### 5.2 Activity Selection — Worked Example

**Activities (already sorted by finish time):**

| Activity | Start | Finish |
|----------|-------|--------|
| a1 | 1 | 4 |
| a2 | 3 | 5 |
| a3 | 0 | 6 |
| a4 | 5 | 7 |
| a5 | 3 | 9 |
| a6 | 5 | 9 |
| a7 | 6 | 10 |

**Greedy selection (Earliest Finish Time First):**

| Iteration | Consider | Condition | Action | Selected | last_finish |
|-----------|----------|-----------|--------|----------|-------------|
| 1 | a1 [1,4) | (first activity) | Select | {a1} | 4 |
| 2 | a2 [3,5) | start 3 < 4 | Skip | {a1} | 4 |
| 3 | a3 [0,6) | start 0 < 4 | Skip | {a1} | 4 |
| 4 | a4 [5,7) | start 5 >= 4 | Select | {a1, a4} | 7 |
| 5 | a5 [3,9) | start 3 < 7 | Skip | {a1, a4} | 7 |
| 6 | a6 [5,9) | start 5 < 7 | Skip | {a1, a4} | 7 |
| 7 | a7 [6,10) | start 6 < 7 | Skip | {a1, a4} | 7 |

**Result**: {a1, a4} — 2 non-overlapping activities selected (maximum possible).

---

<br>

## 6. Huffman Coding

### 6.1 Huffman Coding — Concept

**Problem**: Compress a file by assigning **variable-length binary codes** to characters.

**Key ideas:**
- Frequent characters get **shorter** codes
- Rare characters get **longer** codes
- Codes satisfy the **prefix property**: no code is a prefix of another
  - e.g., if 'a' = `101`, no other code starts with `101`, and `1` and `10` are not codes

**Advantage of prefix property:**
- No separator needed between codes
- Unambiguous decoding by reading bits left to right

> Huffman coding builds a **binary tree** based on character frequencies. Each leaf is a character. Left edges = 0, right edges = 1. The path from root to leaf gives the code.

![Huffman tree: fixed vs variable length codes](../images/ch16_p017_004.png)

### 6.2 Huffman Coding — Algorithm

```
HuffmanCoding(characters, frequencies):
    Input:  n characters with their frequencies
    Output: Huffman tree

    1. Create a leaf node for each character, storing its frequency
    2. Build a min-priority queue Q from all nodes (by frequency)
    3. while |Q| >= 2:
    4.     A = extract-min(Q)      // lowest frequency
    5.     B = extract-min(Q)      // second lowest
    6.     create new node N
    7.     N.left = A, N.right = B
    8.     N.freq = A.freq + B.freq
    9.     insert N into Q
    10. return root of Q           // root of Huffman tree
```

**Time complexity**: O(n log n)
- Building heap: O(n)
- Loop runs (n-1) times, each iteration: 2 extract-min + 1 insert = O(log n)
- Total: O(n) + (n-1) * O(log n) = **O(n log n)**

> **Key Idea:** The greedy choice is to always merge the two nodes with the lowest frequencies first. This ensures that the least frequent characters end up deepest in the tree (longest codes), while the most frequent characters stay near the root (shortest codes).

### 6.3 Huffman Coding — Worked Example

**Character frequencies**: A: 450, T: 90, G: 120, C: 270

**Step-by-step tree construction:**

```
Step 1: Q = [T:90, G:120, C:270, A:450]
        Merge T(90) + G(120) -> node(210)

Step 2: Q = [210, C:270, A:450]
        Merge 210 + C(270) -> node(480)

Step 3: Q = [A:450, 480]
        Merge A(450) + 480 -> node(930)
```

**Resulting tree and codes:**

```
        930
       /   \
     A:450  480          A  = 0    (1 bit)
           /   \         C  = 10   (2 bits)
        210   C:270      T  = 110  (3 bits)
       /   \             G  = 111  (3 bits)
     T:90  G:120
```

![Huffman tree construction steps](../images/ch16_p019_005.png)

### 6.4 Huffman Coding — Compression Ratio

Using the codes: A = `0`, C = `10`, T = `110`, G = `111`

**Compressed file size:**

| Char | Freq | Code Length | Bits Used |
|------|------|------------|-----------|
| A | 450 | 1 | 450 |
| C | 270 | 2 | 540 |
| T | 90 | 3 | 270 |
| G | 120 | 3 | 360 |
| **Total** | **930** | | **1,620 bits** |

**Original (8-bit ASCII)**: 930 * 8 = 7,440 bits

**Compression ratio**: 1,620 / 7,440 = **21.8%** (compressed to ~1/5 of original!)

**Decoding example**: Encode the string "GATTACA":
- G=`111`, A=`0`, T=`110`, T=`110`, A=`0`, C=`10`, A=`0`
- Encoded: `1110110110010`

Decode `1110110110010` step by step (read left to right using the tree):
- `1` -> `11` -> `111` = **G**
- `0` = **A**
- `1` -> `11` -> `110` = **T**
- `1` -> `11` -> `110` = **T**
- `0` = **A**
- `1` -> `10` = **C**
- `0` = **A**
- Result: **GATTACA**

> **Note:** Huffman coding is provably optimal among all prefix codes. No other prefix code can achieve a smaller expected code length for the given character frequencies.

---

<br>

## 7. Minimum Spanning Tree (MST)

### 7.1 MST — Problem Definition

**Problem**: Given a weighted, connected graph G = (V, E), find a tree T that:
- Connects **all** vertices (spanning)
- Has **minimum** total edge weight

**Properties of a spanning tree:**
- Exactly **n - 1** edges (where n = |V|)
- No cycles
- Adding any edge creates exactly one cycle

**Two classic greedy algorithms:**

| | Kruskal's | Prim's |
|---|-----------|--------|
| **Strategy** | Add cheapest edge that doesn't form a cycle | Grow tree from a start vertex, always adding the cheapest connecting edge |
| **Data structure** | Union-Find (disjoint sets) | Priority queue / array D |
| **Complexity** | O(m log m) | O(n^2) or O(m log n) with heap |
| **Best for** | Sparse graphs | Dense graphs |

![MST example (CLRS Figure 23.1)](../images/ch23_p002_011.jpg)

*CLRS Figure 23.1 — MST edges shaded. Total weight = 37*

### 7.2 Kruskal's MST Algorithm

```
KruskalMST(G):
    Input:  weighted graph G = (V, E), |V| = n, |E| = m
    Output: MST T

    1. Sort all edges by weight in ascending order -> L
    2. T = {}
    3. while |T| < n - 1:
    4.     e = next smallest edge from L
    5.     if adding e to T does not create a cycle:
    6.         T = T ∪ {e}
    7.     else:
    8.         discard e
    9. return T
```

**Cycle detection**: Use **Union-Find** data structure
- `Find(u)` and `Find(v)`: if same set, adding edge (u,v) creates a cycle
- `Union(u,v)`: merge two sets when edge is added
- With union-by-rank + path compression: nearly O(1) per operation

**Time complexity**: O(m log m) — dominated by sorting edges

![Kruskal execution (CLRS Figure 23.4)](../images/ch23_p009_105.jpg)

*CLRS Figure 23.4 — Kruskal processes edges in weight order; shaded edges belong to the growing forest*

> **Key Idea:** Kruskal's algorithm is edge-centric. It processes all edges globally from cheapest to most expensive, adding each one to the MST unless it would create a cycle. The Union-Find data structure makes cycle detection nearly constant time.

### 7.3 Prim's MST Algorithm

```
PrimMST(G):
    Input:  weighted graph G = (V, E), |V| = n, |E| = m
    Output: MST T

    1. Pick arbitrary start vertex p; D[p] = 0
    2. for each vertex v != p:
    3.     if edge (p, v) exists: D[v] = weight(p, v)
    4.     else: D[v] = infinity
    5. T = {p}
    6. while |T| < n:
    7.     vmin = vertex not in T with minimum D[v]
    8.     add vmin and edge (u, vmin) to T    // u is in T
    9.     for each vertex w not in T:
    10.        if weight(vmin, w) < D[w]:
    11.            D[w] = weight(vmin, w)       // update
    12. return T
```

**Key difference from Kruskal**: Prim grows **one tree** from a starting vertex; Kruskal merges **multiple trees** (forest).

**Time complexity**: O(n^2) with array, O(m log n) with binary heap

![Prim execution (CLRS Figure 23.5)](../images/ch23_p012_128.jpg)

*CLRS Figure 23.5 — Prim grows one tree from vertex a; black vertices are in the tree, shaded edges are MST edges*

> **Key Idea:** Prim's algorithm is vertex-centric. It maintains a set of vertices already in the MST and always adds the vertex that can be connected to the tree with the cheapest edge. This is structurally very similar to Dijkstra's shortest path algorithm.

### 7.4 Kruskal vs Prim — Visual Comparison

**Kruskal's** (edge-centric — merges forests):

```
Step 1:  a--b  c  d  e  f     (add cheapest edge)
Step 2:  a--b  c--d  e  f     (add next cheapest)
Step 3:  a--b--c--d  e  f     (forests merge)
  ...    one tree gradually forms
```

**Prim's** (vertex-centric — grows one tree):

```
Step 1:  [c]                   (start from c)
Step 2:  [c--b]                (nearest vertex to tree)
Step 3:  [c--b--f]             (nearest vertex to tree)
  ...    tree grows outward
```

Both produce the same MST (if edge weights are unique), but the construction order differs.

---

<br>

## 8. Dijkstra's Shortest Path Algorithm

### 8.1 Dijkstra's — Algorithm

**Problem**: Find shortest paths from source vertex s to all other vertices in a weighted graph (non-negative weights).

```
Dijkstra(G, s):
    Input:  weighted graph G = (V, E), source vertex s
    Output: array D where D[v] = shortest distance from s to v

    1. D[v] = infinity for all v; D[s] = 0
    2. S = {}                       // set of finalized vertices
    3. while S != V:
    4.     vmin = vertex not in S with minimum D[v]
    5.     add vmin to S            // finalize vmin
    6.     for each neighbor w of vmin not in S:
    7.         if D[vmin] + weight(vmin, w) < D[w]:
    8.             D[w] = D[vmin] + weight(vmin, w)  // edge relaxation
    9. return D
```

**Time complexity**: O(n^2) with array, O(m log n) with binary min-heap

> **Note:** Dijkstra's does NOT work with **negative** edge weights. For that, use **Bellman-Ford** (O(VE)).

### 8.2 Dijkstra's — Edge Relaxation

**Edge relaxation** is the core operation (lines 6-8):

```
        s -----> ... -----> vmin -----> w
        |         D[vmin]        wt     |
        |                               |
        +---------> ... ------------->  w
                     D[w] (current)
```

- If `D[vmin] + weight(vmin, w) < D[w]`, then going through vmin is a **shorter path** to w
- Update: `D[w] = D[vmin] + weight(vmin, w)`

**Why it works**: When vmin is selected (minimum D value among unfinalized), its shortest distance is **guaranteed correct** — no future path through unfinalized vertices can be shorter (because all edge weights are non-negative).

![Edge relaxation (CLRS Figure 24.3)](../images/ch24_p007_068.jpg)

*CLRS Figure 24.3 — (a) d decreases (b) no change*

> **Key Idea:** Edge relaxation is the fundamental building block of shortest-path algorithms. It checks whether going through a newly finalized vertex provides a shorter path to its neighbors. Dijkstra's greedy-choice property ensures that once a vertex is finalized, its distance value is optimal.

### 8.3 Dijkstra's — Execution Trace

![Dijkstra execution (CLRS Figure 24.6)](../images/ch24_p017_197.jpg)

- Source *s* is the leftmost vertex. **Black** = finalized (in S), **white** = in priority queue Q.
- **(a)** Initial state -> **(b)** s finalized -> **(c)** y finalized -> ... -> **(f)** all finalized.
- At each step, the vertex with minimum d value is extracted and its neighbors are relaxed.

**Observation**: Dijkstra's is structurally very similar to Prim's MST — both grow a set by selecting the minimum-cost vertex at each step. The key difference is what "cost" means: Prim uses edge weight to the tree, Dijkstra uses total distance from the source.

---

<br>

## 9. Greedy vs Dynamic Programming

| | Greedy | Dynamic Programming |
|---|--------|-------------------|
| **Choice** | Make the locally best choice *now* | Consider *all* subproblems |
| **Direction** | Top-down (make choice, then solve subproblem) | Bottom-up (solve all subproblems, then combine) |
| **Revisiting** | Never reconsider a choice | Stores and reuses all subproblem solutions |
| **Correctness** | Only if greedy-choice property holds | Always correct if optimal substructure holds |
| **Speed** | Typically faster | Typically slower (but more general) |
| **Coin Change** | O(k), but may fail | O(nk), always optimal |
| **Knapsack** | Fractional: optimal | 0-1: optimal |
| **Shortest Path** | Dijkstra (non-negative) | Bellman-Ford (any weights) |

> **Rule of thumb:** Try greedy first. If you can prove the greedy-choice property, use it. Otherwise, fall back to DP.

---

<br>

## Summary

| Algorithm | Problem | Time Complexity | Optimal? |
|-----------|---------|----------------|----------|
| Coin Change (Greedy) | Min coins | O(k) for k denominations | Only for standard denominations |
| Fractional Knapsack | Max value (divisible) | **O(n log n)** | Yes (always) |
| Job Scheduling (EST) | Min machines | O(n log n) + O(mn) | Yes (always) |
| Activity Selection (EFT) | Max activities, 1 machine | **O(n log n)** | Yes (always) |
| Huffman Coding | Optimal prefix code | **O(n log n)** | Yes (always) |
| Kruskal's MST | Min spanning tree | **O(m log m)** | Yes (always) |
| Prim's MST | Min spanning tree | **O(n^2)** / O(m log n) | Yes (always) |
| Dijkstra's | Shortest paths | **O(n^2)** / O(m log n) | Yes (non-negative weights) |

**Key Takeaways:**
- Greedy algorithms make locally optimal choices at each step, hoping to find a global optimum
- Two conditions for correctness: **greedy-choice property** and **optimal substructure**
- When greedy fails (0-1 knapsack, non-standard coins), use **Dynamic Programming** instead
- Many fundamental algorithms (Kruskal, Prim, Dijkstra, Huffman) are greedy and provably optimal

---

<br>

## Self-Check Questions

1. **Greedy-Choice Property:** In your own words, what does the greedy-choice property mean? Give an example of a problem where it holds and one where it doesn't.
2. **Coin Change:** Prove (informally) that the greedy algorithm is optimal for denominations {1, 5, 10, 25}. Then show that adding a 12-cent coin breaks the greedy approach for making 15 cents.
3. **Fractional vs 0-1 Knapsack:** Given items (weight, value): A(10, 60), B(20, 100), C(30, 120) and capacity 50: solve both the fractional and 0-1 versions. Why do the answers differ?
4. **Activity Selection:** Given activities with (start, finish): (1,3), (2,5), (4,7), (1,8), (5,9), (8,10), apply the earliest-finish-time algorithm. How many activities are selected?
5. **Huffman Coding:** Build a Huffman tree for characters with frequencies: E=40, A=30, B=15, C=10, D=5. What code is assigned to each character? What is the average bits per character?
6. **Kruskal vs Prim:** For a graph with 6 vertices and 9 edges, trace both algorithms. Do they produce the same MST? Under what condition might they produce different MSTs?
7. **Dijkstra's:** Given a graph with a negative edge, construct a specific example where Dijkstra produces a wrong answer. Then explain the greedy invariant that is violated.
8. **Greedy vs DP Decision:** For each problem, decide greedy or DP and explain: (a) minimum coins for arbitrary denominations, (b) shortest path with non-negative weights, (c) longest common subsequence, (d) fractional knapsack.
