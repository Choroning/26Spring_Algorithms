# Week 5 Lecture — Greedy Algorithms

[Repository Guide](../../README.md) | [English](Concepts_Lecture.md) | [한국어](Concepts_Lecture.ko.md)

> **Last Updated:** 2026-10-20
>
> Introduction to Algorithms, Cormen, Leiserson, Rivest, and Stein, Ch 16, 21, 23, 24

> **Learning Objectives:**
> 1. State the greedy paradigm and the two conditions for greedy correctness (greedy-choice property, optimal substructure), and identify when greedy works and when it fails with concrete counterexamples
> 2. Solve the fractional knapsack problem using the greedy approach and explain why it fails for 0-1 knapsack
> 3. Apply the activity selection algorithm (earliest finish time) and the job scheduling algorithm (earliest start time)
> 4. Construct a Huffman tree from character frequencies and compute the compression ratio
> 5. Execute Kruskal's and Prim's MST algorithms and Dijkstra's shortest path algorithm with edge relaxation, and explain how the two MST algorithms differ and why Dijkstra's algorithm fails with negative weights
> 6. Compare greedy algorithms with dynamic programming and decide which approach to use for a given problem

---

## Table of Contents

- [1. Greedy Algorithm Fundamentals](#1-greedy-algorithm-fundamentals)
  - [1.1 What is a Greedy Algorithm?](#11-what-is-a-greedy-algorithm)
  - [1.2 Key Properties for Greedy Correctness](#12-key-properties-for-greedy-correctness)
  - [1.3 When Greedy Fails: Binary Tree Path Sum](#13-when-greedy-fails-binary-tree-path-sum)
  - [1.4 When Greedy Fails: Non-Standard Coin Change](#14-when-greedy-fails-non-standard-coin-change)
  - [1.5 Greedy in the Real World](#15-greedy-in-the-real-world)
- [2. Coin Change](#2-coin-change)
  - [2.1 Coin Change: Greedy Algorithm](#21-coin-change-greedy-algorithm)
- [3. Fractional Knapsack](#3-fractional-knapsack)
  - [3.1 Fractional Knapsack: Problem Definition](#31-fractional-knapsack-problem-definition)
  - [3.2 Fractional Knapsack: Algorithm](#32-fractional-knapsack-algorithm)
  - [3.3 Fractional Knapsack: Worked Example](#33-fractional-knapsack-worked-example)
  - [3.4 0-1 vs Fractional Knapsack: Why Greedy Fails for 0-1](#34-0-1-vs-fractional-knapsack-why-greedy-fails-for-0-1)
- [4. Job Scheduling](#4-job-scheduling)
  - [4.1 Job Scheduling: Algorithm](#41-job-scheduling-algorithm)
  - [4.2 Job Scheduling: Worked Example](#42-job-scheduling-worked-example)
- [5. Activity Selection](#5-activity-selection)
  - [5.1 Activity Selection: Algorithm](#51-activity-selection-algorithm)
  - [5.2 Activity Selection: Worked Example](#52-activity-selection-worked-example)
- [6. Huffman Coding](#6-huffman-coding)
  - [6.1 Huffman Coding: Concept](#61-huffman-coding-concept)
  - [6.2 Huffman Coding: Algorithm](#62-huffman-coding-algorithm)
  - [6.3 Huffman Coding: Worked Example](#63-huffman-coding-worked-example)
  - [6.4 Huffman Coding: Compression Ratio](#64-huffman-coding-compression-ratio)
- [7. Minimum Spanning Tree (MST)](#7-minimum-spanning-tree-mst)
  - [7.1 MST: Problem Definition](#71-mst-problem-definition)
  - [7.2 Kruskal's MST Algorithm](#72-kruskals-mst-algorithm)
  - [7.3 Prim's MST Algorithm](#73-prims-mst-algorithm)
  - [7.4 Kruskal vs Prim: Visual Comparison](#74-kruskal-vs-prim-visual-comparison)
- [8. Dijkstra's Shortest Path Algorithm](#8-dijkstras-shortest-path-algorithm)
  - [8.1 Dijkstra: Algorithm](#81-dijkstra-algorithm)
  - [8.2 Dijkstra: Edge Relaxation](#82-dijkstra-edge-relaxation)
  - [8.3 Dijkstra: Execution Trace](#83-dijkstra-execution-trace)
- [9. Greedy vs Dynamic Programming](#9-greedy-vs-dynamic-programming)
- [Summary](#summary)
- [Self-Check Questions](#self-check-questions)

---

<br>

## 1. Greedy Algorithm Fundamentals

### 1.1 What is a Greedy Algorithm?

A type of algorithm for solving **optimization problems**.

- **Optimization problem**: A problem of finding the best (maximum or minimum) solution among all feasible solutions.
- At each step, make the **locally optimal choice**, the one that looks best *right now*.
- Once a choice is made, it is **never reconsidered** (no backtracking).

**Generic Greedy Structure:**

```text
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

> **Key Point:** The essence of a greedy algorithm is that it always picks the option that looks best at the moment, without considering the future consequences. This makes greedy algorithms simple and fast, but they only produce optimal results when the problem has the right structural properties.

> **Definition:** A **feasible solution** satisfies all the problem's constraints (but may not be complete yet). A **complete solution** is one that cannot be extended further and represents a full answer to the problem.

### 1.2 Key Properties for Greedy Correctness

For a greedy algorithm to produce an **optimal** solution, two properties must hold:

**1. Greedy-Choice Property**
- A globally optimal solution can be reached by making locally optimal (greedy) choices.
- We can prove that at least one optimal solution includes the greedy choice.

**2. Optimal Substructure**
- An optimal solution to the problem contains optimal solutions to its subproblems.
- After making a greedy choice, the remaining subproblem has the same structure.

> **Note:** **Greedy vs Dynamic Programming.** Both require optimal substructure. But DP considers *all* subproblems (bottom-up), while Greedy makes *one* choice and moves forward (top-down, no revisiting).

### 1.3 When Greedy Fails: Binary Tree Path Sum

**Binary Tree Maximum Path Sum:**

```text
             10
          /      \
      36           15
     /  \         /  \
    3    18     35    2
   / \   / \   / \   / \
  30 45 55 50 32 67 38 33
```

*Figure 1. Binary tree maximum path sum example in which greedy misses the optimal path*

- **Greedy**: At each node, go to the child with the larger value
  - Path: 10 -> 36 -> 18 -> 55 = **119**
- **Optimal**: 10 -> 15 -> 35 -> 67 = **127**

The greedy choice at the root (36 > 15) locks us out of the best path.

> **Key Point:** This example illustrates the fundamental weakness of greedy: a locally optimal choice (picking 36 over 15) can prevent us from reaching the globally optimal solution. Without the greedy-choice property, greedy algorithms may produce suboptimal results.

### 1.4 When Greedy Fails: Non-Standard Coin Change

Standard denominations (500, 100, 50, 10, 1 won):
- Each denomination is a **multiple** of the next smaller one.
- Greedy always gives an **optimal** result.

Non-standard denominations (e.g., add 160-won coin):
- Make 200 won: Greedy picks 160 + 10 + 10 + 10 + 10 = **5 coins**
- Optimal: 100 + 100 = **2 coins**

> **Key Point:** Greedy always gives an optimal solution for coin change only when the denominations have a special structure, and a system in which each denomination is a multiple of the next smaller one is the typical case. For arbitrary denominations, use **Dynamic Programming**.

### 1.5 Greedy in the Real World

| Algorithm | Real-World Application |
|-----------|----------------------|
| **Coin Change** | ATM cash dispensers, vending machine change |
| **Fractional Knapsack** | Investment portfolio allocation, cargo loading (oil, grain) |
| **Activity Selection** | Conference room booking, TV broadcast scheduling, CPU task scheduling |
| **Huffman Coding** | ZIP/GZIP compression, JPEG image encoding, MP3 audio |
| **Kruskal's / Prim's MST** | Fiber optic network design, road construction planning, circuit wiring |
| **Dijkstra's** | GPS navigation (Google Maps, Naver Map), network routing (OSPF protocol) |

*Table 1. Real-world applications of greedy algorithms*

> **Note:** Every time a phone finds a route, a file gets compressed, or a network cable is laid, a greedy algorithm is likely at work.

---

<br>

## 2. Coin Change

### 2.1 Coin Change: Greedy Algorithm

**Problem**: Given denominations (500, 100, 50, 10, 1), find the minimum number of coins for amount W.

```text
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

**Time complexity**: O(k) if the count of each denomination is computed by division (quotient and remainder), where k is the number of denomination types (constant in practice). If coins are subtracted one at a time as in the pseudocode above, the number of iterations also grows with the number of coins returned.

> **Note:** The greedy strategy here is straightforward: always use the largest denomination possible. This works because each Korean won denomination is a multiple of the next smaller one, ensuring that choosing a larger coin never blocks a better solution.

---

<br>

## 3. Fractional Knapsack

### 3.1 Fractional Knapsack: Problem Definition

**Problem definition:**
- There are n items, each with weight $w_i$ and value $v_i$.
- The knapsack capacity is C.
- **Fractional**: Items can be divided, so any fraction of an item can be taken.
- **Goal**: Maximize the total value in the knapsack.

**Greedy idea:**
1. Compute **value per unit weight** ($v_i / w_i$) for each item.
2. Sort items by value-per-weight in **decreasing** order.
3. Take items greedily: whole items if they fit, a fraction otherwise.

> **Note:** In **0-1 knapsack**, items cannot be divided (take it or leave it), so it requires **DP** or backtracking.
> In **fractional knapsack**, items can be divided, so it is solved optimally by **greedy**.

### 3.2 Fractional Knapsack: Algorithm

```text
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

> **Key Point:** The greedy-choice property holds because the item with the highest value-per-weight ratio contributes the most value per unit of capacity used. Taking as much of it as possible first is always part of an optimal solution.

### 3.3 Fractional Knapsack: Worked Example

**Knapsack capacity = 40 kg**

| Item | Weight | Value | Value/Weight |
|------|--------|-------|-------------|
| Platinum | 10 kg | 60 | **6** |
| Gold | 15 kg | 75 | **5** |
| Silver | 25 kg | 10 | 0.4 |
| Tin | 20 kg | 2 | 0.1 |

*Table 2. Weight, value, and value per weight of each item in the fractional knapsack example*

| Step | Action | w | v |
|------|--------|---|---|
| 1 | Take all Platinum (10 kg) | 10 | 60 |
| 2 | Take all Gold (15 kg) | 25 | 135 |
| 3 | Silver: take 15/25 = 0.6 | 40 | **141** |

*Table 3. Greedy selection steps in the fractional knapsack example*

### 3.4 0-1 vs Fractional Knapsack: Why Greedy Fails for 0-1

**Items (CLRS Figure 16.2), knapsack capacity = 50 lbs:**

| Item | Weight | Value | Value/Weight |
|------|--------|-------|-------------|
| Item 1 | 10 lbs | $60 | 6 $/lb |
| Item 2 | 20 lbs | $100 | 5 $/lb |
| Item 3 | 30 lbs | $120 | 4 $/lb |

*Table 4. Items used to compare 0-1 and fractional knapsack*

**Same items, same knapsack (50 lbs), different results:**

| | 0-1 Knapsack | Fractional Knapsack |
|---|---|---|
| **Constraint** | Take it or leave it | Can take fractions |
| **Greedy choice** | Item 1 (best $/lb) | Item 1 (best $/lb) |
| **Greedy result** | $60 + $100 = **$160** | $60 + $100 + $80 = **$240** |
| **Optimal** | Item 2 + 3 = **$220** | Same as greedy = **$240** |

*Table 5. Results for 0-1 and fractional knapsack on the same items*

- **(b) 0-1**: Greedy picks item 1 first (6 $/lb), which leaves 20 lbs of capacity unused, so the result is suboptimal.
- **(c) Fractional**: Greedy fills the remaining space with 2/3 of item 3, which is **optimal**.

The textbook's Figure 16.2 shows three cases: (a) the items with their weights and values, (b) the possible selections for the 0-1 knapsack (the optimum is items 2 and 3), and (c) the greedy result for the fractional knapsack.

![Figure 2. Selection results for 0-1 and fractional knapsack](../../images/Week05_ch16_p14.png)

*Figure 2. Selection results for 0-1 and fractional knapsack*

> **Key Point:** In 0-1 knapsack, greedy can waste capacity. The cost of the unfilled space makes greedy suboptimal, so **DP** should be used for 0-1 knapsack.

---

<br>

## 4. Job Scheduling

### 4.1 Job Scheduling: Algorithm

**Problem**: Assign n jobs (each with start time and finish time) to the **minimum number of machines** such that no two jobs on the same machine overlap.

**Greedy strategy**: **Earliest Start Time First**

```text
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

> **Key Point:** Among 4 strategies (earliest start, earliest finish, shortest first, longest first), only **earliest start time first** guarantees an optimal solution for the machine-minimization variant.

**Why other strategies fail (counterexample):** Consider Earliest Finish Time First for machine minimization with jobs [1,10], [2,3], [4,5], [6,7]. EFT sorts by finish time and assigns [2,3], [4,5], [6,7] to one machine and [1,10] to a second machine, using 2 machines. However, EST processes [1,10] first (on Machine 1), then [2,3] starts a new Machine 2 (since Machine 1 is busy until 10), [4,5] goes to Machine 2 (free at 3), and [6,7] goes to Machine 2 (free at 5), again using 2 machines. In this case both give the same result, but EFT does not guarantee the minimum number of machines in general because it does not account for how long jobs occupy a machine. For example, with jobs [0,1], [0,2], [1,4], [2,3], if EFT assigns each job to the earliest-created free machine, [0,1] goes to Machine 1, [0,2] to Machine 2, and [2,3] to Machine 1, and then [1,4] overlaps jobs on both machines and needs Machine 3. EST assigns [0,1] and [1,4] to Machine 1 and [0,2] and [2,3] to Machine 2, so 2 machines suffice.

### 4.2 Job Scheduling: Worked Example

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

*Table 6. Machine assignment at each step of the job scheduling example*

**Result**: 3 machines. **Time complexity**: O(n log n) + O(mn), where m = number of machines.

---

<br>

## 5. Activity Selection

The job scheduling problem in Section 4 minimized the number of machines needed for all jobs. Activity selection flips the question: given just one machine, it maximizes the number of jobs that fit. This closely related problem requires a different greedy strategy.

### 5.1 Activity Selection: Algorithm

**Problem**: One machine (room), maximize the **number of non-overlapping jobs**.

**Greedy strategy**: **Earliest Finish Time First**

```text
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

![Figure 3. Operation of the activity selection algorithm](../../images/Week05_ch16_p07.png)

*Figure 3. Operation of the activity selection algorithm*

> **Key Point:** Selecting the activity that finishes earliest leaves as much remaining time as possible for subsequent activities. This is the greedy-choice property: choosing the earliest-finishing compatible activity always belongs to some optimal solution.

### 5.2 Activity Selection: Worked Example

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

*Table 7. Activities sorted by finish time*

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

*Table 8. Selection at each iteration of earliest finish time first*

**Result**: {a1, a4}, that is, 2 non-overlapping activities, which is the maximum possible.

---

<br>

## 6. Huffman Coding

### 6.1 Huffman Coding: Concept

**Problem**: Compress a file by assigning **variable-length binary codes** to characters.

**Key ideas:**
- Frequent characters get **shorter** codes
- Rare characters get **longer** codes
- Codes satisfy the **prefix property**: no code is a prefix of another
  - e.g., if 'a' = `101`, no other code starts with `101`, and `1` and `10` are not codes

**Advantage of prefix property:**
- No separator needed between codes
- Unambiguous decoding by reading bits left to right

> **Note:** Huffman coding builds a **binary tree** based on character frequencies. Each leaf is a character. Left edges = 0, right edges = 1. The path from root to leaf gives the code.

![Figure 4. Trees for fixed-length and variable-length codes](../../images/Week05_ch16_p17.png)

*Figure 4. Trees for fixed-length and variable-length codes*

### 6.2 Huffman Coding: Algorithm

```text
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

> **[Data Structures]** A min-priority queue is usually implemented as a binary min-heap, which is built from n elements in O(n) time and performs insert and extract-min in O(log n) time each. Each of the n-1 merges in Huffman coding performs two extract-min operations and one insert, so these heap costs set the total O(n log n), and Prim's algorithm in Section 7.3 and Dijkstra's algorithm in Section 8.1 run in O(m log n) with a binary heap for the same reason: n extract-min operations and at most m key updates each take O(log n) time.

> **Key Point:** The greedy choice is to always merge the two nodes with the lowest frequencies first. This ensures that the least frequent characters end up deepest in the tree (longest codes), while the most frequent characters stay near the root (shortest codes).

### 6.3 Huffman Coding: Worked Example

**Character frequencies**: A: 450, T: 90, G: 120, C: 270

**Step-by-step tree construction:**

```text
Step 1: Q = [T:90, G:120, C:270, A:450]
        Merge T(90) + G(120) -> node(210)

Step 2: Q = [210, C:270, A:450]
        Merge 210 + C(270) -> node(480)

Step 3: Q = [A:450, 480]
        Merge A(450) + 480 -> node(930)
```

**Resulting tree and codes:**

```text
        930
       /   \
     A:450  480          A  = 0    (1 bit)
           /   \         C  = 10   (2 bits)
        210   C:270      T  = 110  (3 bits)
       /   \             G  = 111  (3 bits)
     T:90  G:120
```

*Figure 5. Huffman tree and the code for each character*

![Figure 6. Construction steps of a Huffman tree](../../images/Week05_ch16_p19.png)

*Figure 6. Construction steps of a Huffman tree*

> **Note:** In Figure 5, 210 is drawn as the left child of 480, and the pseudocode in Section 6.2 also places the lower-frequency 210 on the left. Applying the left edge = 0 rule as drawn gives C = `11`, T = `100`, G = `101`. The codes above (C = `10`, T = `110`, G = `111`) correspond to swapping the two children of 480 so that C is on the left; either way, each character's code length and the compression result are the same.

### 6.4 Huffman Coding: Compression Ratio

Using the codes: A = `0`, C = `10`, T = `110`, G = `111`

**Compressed file size:**

| Char | Freq | Code Length | Bits Used |
|------|------|------------|-----------|
| A | 450 | 1 | 450 |
| C | 270 | 2 | 540 |
| T | 90 | 3 | 270 |
| G | 120 | 3 | 360 |
| **Total** | **930** | | **1,620 bits** |

*Table 9. Frequency, code length, and bits used for each character*

**Original (8-bit ASCII)**: 930 * 8 = 7,440 bits

**Compression ratio**: 1,620 / 7,440 = **21.8%** (about 1/5 of the original size)

**Encoding and decoding example**: Encode the string "GATTACA".
- G=`111`, A=`0`, T=`110`, T=`110`, A=`0`, C=`10`, A=`0`
- Encoded: `11101101100100`

Decode `11101101100100` step by step (read left to right using the tree):
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

### 7.1 MST: Problem Definition

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
| **Strategy** | Add cheapest edge that does not form a cycle | Grow tree from a start vertex, always adding the cheapest connecting edge |
| **Data structure** | Union-Find (disjoint sets) | Priority queue / array D |
| **Complexity** | O(m log m) | $O(n^2)$ or O(m log n) with heap |
| **Best for** | Sparse graphs | Dense graphs |

*Table 10. Comparison of Kruskal's and Prim's algorithms*

In the textbook's Figure 23.1, the shaded edges are the MST edges, and the total weight is 37.

![Figure 7. Example of a minimum spanning tree](../../images/Week05_ch23_p02.jpg)

*Figure 7. Example of a minimum spanning tree*

### 7.2 Kruskal's MST Algorithm

```text
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
- `Find(u)` and `Find(v)`: if they return the same set, adding edge (u,v) creates a cycle.
- `Union(u,v)`: merges the two sets when the edge is added.
- With union-by-rank and path compression together: nearly O(1) per operation.

Union-Find (disjoint sets) is a data structure that tracks which vertices belong to the same connected component. `Find(u)` returns the representative of the set containing u, and `Union(u,v)` merges the sets containing u and v. Path compression flattens the tree structure during a search, and union-by-rank always attaches the shorter tree under the taller one to keep the trees balanced. Using both techniques together makes Find nearly O(1).

**Time complexity**: O(m log m), dominated by sorting edges.

In the textbook's Figure 23.4, Kruskal's algorithm processes edges in weight order, and the shaded edges belong to the growing forest.

![Figure 8. Execution of Kruskal's algorithm](../../images/Week05_ch23_p09.jpg)

*Figure 8. Execution of Kruskal's algorithm*

> **Key Point:** Kruskal's algorithm is edge-centric. It processes all edges globally from cheapest to most expensive, adding each one to the MST unless it would create a cycle. The Union-Find data structure makes cycle detection nearly constant time.

### 7.3 Prim's MST Algorithm

```text
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

**Time complexity**: $O(n^2)$ with array, O(m log n) with binary heap

In the textbook's Figure 23.5, Prim's algorithm grows one tree from vertex a; black vertices are in the tree, and shaded edges are MST edges.

![Figure 9. Execution of Prim's algorithm](../../images/Week05_ch23_p12.jpg)

*Figure 9. Execution of Prim's algorithm*

> **Key Point:** Prim's algorithm is vertex-centric. It maintains a set of vertices already in the MST and always adds the vertex that can be connected to the tree with the cheapest edge. This is structurally very similar to Dijkstra's shortest path algorithm.

### 7.4 Kruskal vs Prim: Visual Comparison

**Kruskal's** (edge-centric, merges forests):

```text
Step 1:  a--b  c  d  e  f     (add cheapest edge)
Step 2:  a--b  c--d  e  f     (add next cheapest)
Step 3:  a--b--c--d  e  f     (forests merge)
  ...    one tree gradually forms
```

*Figure 10. Forest merging in Kruskal's algorithm*

**Prim's** (vertex-centric, grows one tree):

```text
Step 1:  [c]                   (start from c)
Step 2:  [c--b]                (nearest vertex to tree)
Step 3:  [c--b--f]             (nearest vertex to tree)
  ...    tree grows outward
```

*Figure 11. Tree growth in Prim's algorithm*

Both produce the same MST (if edge weights are unique), but the construction order differs.

---

<br>

## 8. Dijkstra's Shortest Path Algorithm

### 8.1 Dijkstra: Algorithm

**Problem**: Find shortest paths from source vertex s to all other vertices in a weighted graph (non-negative weights).

Consider finding the shortest driving distance from one city to every other city. We start by knowing the distances to the immediate neighboring cities. We then finalize the closest city (its distance cannot improve) and update the distances from it to its neighbors. Repeating this process of always finalizing the closest unfinalized city finds all shortest paths.

```text
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

**Time complexity**: $O(n^2)$ with array, O(m log n) with binary min-heap

> **Note:** Dijkstra's algorithm does not guarantee a correct result when there are **negative** edge weights. For that case, use **Bellman-Ford** (O(nm)), covered in Week 12.

With negative edges, a vertex that has already been finalized may later become reachable by a shorter path through a negative edge, which breaks the greedy invariant that the distance of the vertex with the minimum D value is optimal.

### 8.2 Dijkstra: Edge Relaxation

**Edge relaxation** is the core operation (lines 6-8):

```text
        s -----> ... -----> vmin -----> w
        |         D[vmin]        wt     |
        |                               |
        +---------> ... ------------->  w
                     D[w] (current)
```

*Figure 12. Edge relaxation: the path through vmin versus the current path*

- If `D[vmin] + weight(vmin, w) < D[w]`, then going through vmin is a **shorter path** to w.
- Update: `D[w] = D[vmin] + weight(vmin, w)`

**Why it works**: When vmin is selected (minimum D value among unfinalized), its shortest distance is **guaranteed correct**: no future path through unfinalized vertices can be shorter (because all edge weights are non-negative).

The textbook's Figure 24.3 shows the two cases of edge relaxation: in (a) the d value decreases, and in (b) it does not change.

![Figure 13. Two cases of edge relaxation](../../images/Week05_ch24_p07.jpg)

*Figure 13. Two cases of edge relaxation*

> **Key Point:** Edge relaxation is the fundamental building block of shortest-path algorithms. It checks whether going through a newly finalized vertex provides a shorter path to its neighbors. Dijkstra's greedy-choice property ensures that once a vertex is finalized, its distance value is optimal.

### 8.3 Dijkstra: Execution Trace

The textbook's Figure 24.6 shows the execution of Dijkstra's algorithm step by step.

![Figure 14. Execution of Dijkstra's algorithm](../../images/Week05_ch24_p17.jpg)

*Figure 14. Execution of Dijkstra's algorithm*

- Source *s* is the leftmost vertex. **Black** vertices are finalized (in S), and **white** vertices are in the priority queue Q.
- **(a)** Initial state -> **(b)** s finalized -> **(c)** y finalized -> ... -> **(f)** all finalized.
- At each step, the vertex with minimum d value is extracted and its neighbors are relaxed.

**Observation**: Dijkstra's is structurally very similar to Prim's MST: both grow a set by selecting the minimum-cost vertex at each step. The key difference is what "cost" means: Prim uses edge weight to the tree, Dijkstra uses total distance from the source.

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
| **Coin Change** | O(k), but may fail | O(nk), always optimal (n is the amount) |
| **Knapsack** | Fractional: optimal | 0-1: optimal |
| **Shortest Path** | Dijkstra (non-negative) | Bellman-Ford (any weights, no negative cycles) |

*Table 11. Comparison of greedy and dynamic programming*

> **Note:** **Rule of Thumb.** Try greedy first. If you can prove the greedy-choice property, use it. Otherwise, fall back to DP.

> **Note:** DP is usually described as bottom-up (tabulation), but it can also be implemented top-down (memoization). Greedy is called top-down in the sense that it makes a choice first and then solves the remaining subproblem.

---

<br>

## Summary

| Concept | Key Summary |
|:-----|:-----|
| Greedy algorithm | Makes a locally optimal choice at each step in the hope of reaching a global optimum. |
| Two conditions for greedy correctness | The **greedy-choice property** and **optimal substructure** must hold. |
| Coin change (greedy) | Finds the minimum number of coins in O(k) for k denominations and is optimal only when the denominations have a structure that suits greedy, as the won coins do. |
| Fractional knapsack | Finds the maximum value of divisible items in O(n log n) and is always optimal. |
| Job scheduling (EST) | Finds the minimum number of machines in O(n log n) + O(mn) and is always optimal. |
| Activity selection (EFT) | Finds the maximum number of activities on one machine in O(n log n) and is always optimal. |
| Huffman coding | Finds an optimal prefix code in O(n log n) and is always optimal. |
| Kruskal's MST | Finds a minimum spanning tree in O(m log m) and is always optimal. |
| Prim's MST | Finds a minimum spanning tree in $O(n^2)$ with an array or O(m log n) with a binary heap and is always optimal. |
| Dijkstra's algorithm | Finds shortest paths in $O(n^2)$ with an array or O(m log n) with a binary heap and is optimal for non-negative weights. |
| When greedy fails | When greedy fails, as in 0-1 knapsack or non-standard coins, **dynamic programming** is used instead. |
| Greedy fundamental algorithms | Many fundamental algorithms, such as Kruskal, Prim, Dijkstra, and Huffman, are greedy and provably optimal. |

---

<br>

## Self-Check Questions

1. **Greedy-Choice Property:** In your own words, what does the greedy-choice property mean? Give an example of a problem where it holds and one where it does not.

   <details>
   <summary>Answer</summary>

   The **greedy-choice property** means a globally optimal solution can be built by choosing the **locally optimal option** at each step, without looking ahead or reconsidering. At least one optimal solution must contain the greedy choice. **Example where it holds:** In Fractional Knapsack, taking as much as possible of the item with the highest value per weight is part of an optimum. **Example where it fails:** In the binary-tree maximum-path-sum problem, choosing the larger child (36 rather than 15) can exclude the truly optimal path through the smaller child.

   </details>

2. **Coin Change:** Prove (informally) that the greedy algorithm is optimal for denominations {1, 5, 10, 25}. Then show that adding a 12-cent coin breaks the greedy approach for making 15 cents.

   <details>
   <summary>Answer</summary>

   For {1, 5, 10, 25}, the number of small coins in an optimal solution is bounded. Five 1s can be replaced by one 5, two 5s by one 10, three 10s by a 25 and a 5, and two 10s with a 5 by one 25, each with fewer coins, so an optimal solution uses at most four 1s, at most one 5, and at most two 10s, and never two 10s together with a 5. The coins below 25 then sum to at most 24, so an optimal solution also uses as many 25s as greedy does, and applying the same argument to the remaining amount shows that the optimal solution equals the greedy one. **With a 12-cent coin** making 15: greedy picks **12 + 1 + 1 + 1 = 4 coins**, but the optimum is **10 + 5 = 2 coins**. The 12-coin destroys the divisor structure, so the greedy-choice property fails.

   </details>

3. **Fractional vs 0-1 Knapsack:** Given items (weight, value): A(10, 60), B(20, 100), C(30, 120) and capacity 50: solve both the fractional and 0-1 versions. Why do the answers differ?

   <details>
   <summary>Answer</summary>

   Ratios are 6, 5, 4 $/lb. **Fractional**: take A (10 lb, $60), B (20 lb, $100), then 2/3 of C (20 lb, $80) → **$240**. **0-1**: greedy gets A + B = **$160** wasting 20 lb of capacity; the true 0-1 optimum is B + C = **$220**. The answers differ because in **0-1** you cannot fill the leftover capacity with a fraction of a low-ratio item, so a high-ratio item can actually be a *trap* that strands capacity, which is exactly where the greedy-choice property breaks.

   </details>

4. **Activity Selection:** Given activities with (start, finish): (1,3), (2,5), (4,7), (1,8), (5,9), (8,10), apply the earliest-finish-time algorithm. How many activities are selected?

   <details>
   <summary>Answer</summary>

   Sorted by finish time: (1,3), (2,5), (4,7), (1,8), (5,9), (8,10). Pick (1,3) → `last_finish = 3`. Skip (2,5) since 2 < 3. Pick (4,7) since 4 ≥ 3 → `last_finish = 7`. Skip (1,8), (5,9) since 1, 5 < 7. Pick (8,10) since 8 ≥ 7 → `last_finish = 10`. **Selected: {(1,3), (4,7), (8,10)}, 3 activities.** Choosing the earliest-finishing compatible activity at each step maximizes the remaining time available for subsequent picks.

   </details>

5. **Huffman Coding:** Build a Huffman tree for characters with frequencies: E=40, A=30, B=15, C=10, D=5. What code is assigned to each character? What is the average bits per character?

   <details>
   <summary>Answer</summary>

   Merge order: D(5)+C(10)=15; then B(15)+15=30; then A(30)+30=60; then E(40)+60=100. Reading left=0, right=1 from the root: **E = `0`, A = `10`, B = `110`, C = `1111`, D = `1110`** (1, 2, 3, 4, 4 bits respectively). Total bits = 40×1 + 30×2 + 15×3 + 10×4 + 5×4 = 40+60+45+40+20 = **205 bits over 100 characters → 2.05 bits/char average**, far below the 8-bit ASCII baseline.

   </details>

6. **Kruskal vs Prim:** For a graph with 6 vertices and 9 edges, trace both algorithms. Do they produce the same MST? Under what condition might they produce different MSTs?

   <details>
   <summary>Answer</summary>

   Both are correct greedy MST algorithms and produce a tree of **identical total weight**. When **all edge weights are distinct**, the MST is **unique**, so Kruskal and Prim produce the *exact same* edge set even though the construction order differs (Kruskal merges a forest globally; Prim grows one tree from a start vertex). With **tied edge weights**, multiple MSTs may exist; both algorithms still find a minimum-weight one, but tie-breaking (and Prim's start vertex) can select different edges.

   </details>

7. **Dijkstra's:** Given a graph with a negative edge, construct a specific example where Dijkstra produces a wrong answer. Then explain the greedy invariant that is violated.

   <details>
   <summary>Answer</summary>

   Use vertices A, B, C with edges A→B = 1, A→C = 2, C→B = -2, and source A. Dijkstra finalizes A, then B because `D[B] = 1 < D[C] = 2`. When C is later processed, the path A→C→B has cost 0, which is better than B's finalized distance 1. Dijkstra cannot revise B after finalization, so it returns a wrong result. This violates the invariant that the smallest tentative distance is final; negative weights break the monotonicity that supports it.

   </details>

8. **Greedy vs DP Decision:** For each problem, decide greedy or DP and explain: (a) minimum coins for arbitrary denominations, (b) shortest path with non-negative weights, (c) longest common subsequence, (d) fractional knapsack.

   <details>
   <summary>Answer</summary>

   **(a) DP:** Arbitrary denominations can break the divisor structure. For amount 6 with coins `{1, 3, 4}`, greedy uses 4 + 1 + 1, which is 3 coins, while the optimum 3 + 3 uses 2 coins; use `dp[i] = min(dp[i-c] + 1)`. **(b) Greedy:** Dijkstra's algorithm works because non-negative weights preserve the invariant that a finalized distance is optimal. **(c) DP:** LCS has overlapping subproblems and no reliable local choice, since a character match may or may not belong to an LCS. The standard `dp[i][j]` table takes O(mn) space. **(d) Greedy:** Sort by value per weight. Since fractions are allowed, each unit of capacity can be assigned at the best available rate.

   </details>
