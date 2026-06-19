# Week 14 Lecture — Approximation Algorithms

> **Last Updated:** 2026-06-19
>
> Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms (CLRS) Ch 35 (Approximation Algorithms)

> **Prerequisites**: Week 13: NP-Completeness — every problem this week (TSP, Vertex Cover, Bin Packing, Job Scheduling, Clustering) is NP-Complete, which is *why* we turn to approximation instead of an exact polynomial algorithm. The **indirect-optimal technique** from Week 13 is the engine behind every ratio proof. Week 5: Greedy algorithms — all five approximation algorithms are greedy with a *proof of approximation ratio* bolted on. Week 11: Graphs and MST — the TSP approximation uses MST (Kruskal/Prim) directly as a subroutine and a DFS traversal (Week 11) to build the tour. Week 12: Shortest path — used for comparison. Basic discrete-math vocabulary: set, pigeonhole principle, triangle inequality.
>
> **Learning Objectives**:
> 1. State, among the **three things** one can give up when facing an NP-Complete problem (polynomial time / all inputs / optimality), which one an approximation algorithm gives up
> 2. Define the **approximation ratio** and explain the chicken-and-egg problem: computing it requires the optimal value we cannot find
> 3. Apply the **indirect-optimal technique** — the universal proof template of sandwiching a computable lower/upper bound on OPT — to minimization and maximization problems
> 4. Execute the MST-based 2-approximation for **TSP** (MST → DFS traversal → remove duplicates), show where the triangle inequality is needed, and prove $\rho < 2$
> 5. Execute the maximal-matching 2-approximation for **Vertex Cover** and show the ratio is **exactly** 2 (tight)
> 6. Execute the four **Bin Packing** heuristics (First / Next / Best / Worst Fit) and prove $\rho \leq 2$ via the "at most one bin less than half full" argument
> 7. Execute the earliest-finishing-machine greedy for **Job Scheduling** and prove $\rho \leq 2$ via two lower bounds (volume, per-job)
> 8. Execute the farthest-first traversal for **k-Clustering** and prove $\rho \leq 2$ via the virtual $(k+1)$-th center and pigeonhole
> 9. Compare the **time complexity** and **indirect-optimal bound** of all five algorithms in a summary table

---

## Table of Contents

- [1. Approximation Algorithms — Foundations](#1-approximation-algorithms--foundations)
  - [1.1 Why Approximation Algorithms?](#11-why-approximation-algorithms)
  - [1.2 Approximation Ratio](#12-approximation-ratio)
  - [1.3 The Indirect-Optimal Technique](#13-the-indirect-optimal-technique)
- [2. TSP — MST-Based 2-Approximation](#2-tsp--mst-based-2-approximation)
  - [2.1 Problem and the Metric Assumption](#21-problem-and-the-metric-assumption)
  - [2.2 MST-Based Approach — Intuition](#22-mst-based-approach--intuition)
  - [2.3 Algorithm](#23-algorithm)
  - [2.4 Worked Example](#24-worked-example)
  - [2.5 Approximation-Ratio Proof](#25-approximation-ratio-proof)
  - [2.6 Complexity](#26-complexity)
- [3. Vertex Cover — Maximal-Matching 2-Approximation](#3-vertex-cover--maximal-matching-2-approximation)
  - [3.1 Problem](#31-problem)
  - [3.2 Maximal-Matching Approach](#32-maximal-matching-approach)
  - [3.3 Algorithm and Worked Example](#33-algorithm-and-worked-example)
  - [3.4 Ratio Proof and Tightness](#34-ratio-proof-and-tightness)
- [4. Bin Packing — Four Greedy Heuristics](#4-bin-packing--four-greedy-heuristics)
  - [4.1 Problem](#41-problem)
  - [4.2 First Fit / Next Fit / Best Fit / Worst Fit](#42-first-fit--next-fit--best-fit--worst-fit)
  - [4.3 Worked Example](#43-worked-example)
  - [4.4 Algorithm and Complexity](#44-algorithm-and-complexity)
  - [4.5 Approximation-Ratio Proof](#45-approximation-ratio-proof)
- [5. Job Scheduling — Earliest-Finishing-Machine 2-Approximation](#5-job-scheduling--earliest-finishing-machine-2-approximation)
  - [5.1 Problem](#51-problem)
  - [5.2 Algorithm and Worked Example](#52-algorithm-and-worked-example)
  - [5.3 Approximation-Ratio Proof](#53-approximation-ratio-proof)
  - [5.4 Complexity](#54-complexity)
- [6. k-Clustering — Farthest-First 2-Approximation](#6-k-clustering--farthest-first-2-approximation)
  - [6.1 Problem](#61-problem)
  - [6.2 Algorithm and Worked Example](#62-algorithm-and-worked-example)
  - [6.3 Approximation-Ratio Proof](#63-approximation-ratio-proof)
  - [6.4 Complexity and Practical Considerations](#64-complexity-and-practical-considerations)
- [7. Approximation Algorithms — Summary Table](#7-approximation-algorithms--summary-table)
- [Summary](#summary)
- [Self-Check Questions](#self-check-questions)

---

<br>

## 1. Approximation Algorithms — Foundations

### 1.1 Why Approximation Algorithms?

NP-Complete problems appear *everywhere* in the real world — routing, scheduling, packing, covering, clustering — yet no polynomial-time algorithm has ever been found for any of them (and, as Week 13 showed, if even one were solved, all of them would be). So what do we actually do in practice?

To deal with an NP-Complete problem we must **give up one** of the following three:

1. Finding a solution **in polynomial time**.
2. Finding a solution **for all inputs**.
3. Finding the **optimal** solution.

**Approximation algorithms give up (3)** — they find a *near*-optimal solution in polynomial time, with a **provable quality guarantee**.

| Strategy                  | Gives up                  | Characteristics                                    |
|---------------------------|---------------------------|----------------------------------------------------|
| **Approximation algorithm** | (3) optimality          | Polynomial time + provable ratio guarantee         |
| **Heuristic**             | (3) optimality            | Polynomial time but *no provable guarantee*        |
| **Exact exponential alg.**| (1) polynomial time       | Optimal but practical only for small inputs        |
| **Randomized algorithm**  | (2) all inputs (probabilistically) | Fast and correct with high probability    |

> **The crux of approximation algorithms:** they produce not merely a "plausible" solution but one whose *closeness to optimal* is mathematically guaranteed, in polynomial time. That guarantee is the **approximation ratio**.

### 1.2 Approximation Ratio

An approximation algorithm always comes with an **approximation ratio** $\rho$ — a measure of how close the approximate solution is to the optimum.

$$
\rho = \frac{\text{Approximate Solution Value (APX)}}{\text{Optimal Solution Value (OPT)}}
$$

(For maximization problems we invert the ratio so that $\rho \geq 1$ always.)

- The closer $\rho$ is to **$1.0$**, the higher the accuracy.
- $\rho = 2.0$ = a solution **within twice** the optimum — the "**2-approximation**" that all five algorithms this week achieve.
- **The catch:** computing $\rho$ requires OPT, which is exactly the value we *cannot* find (it is NP-Complete!). A clever workaround is needed.

### 1.3 The Indirect-Optimal Technique

The key idea for sidestepping the chicken-and-egg problem: instead of computing OPT itself, find an **easily computable bound on OPT** and prove the ratio against *that*.

**Minimization problems** (TSP, Vertex Cover, Bin Packing, Job Scheduling, Clustering — all of this week):

- Find a computable value $L$ with $\text{OPT} \geq L$ (a **lower bound** on OPT).
- Show the algorithm's output satisfies $\text{APX} \leq c \cdot L$.
- Then $\text{APX} \leq c \cdot L \leq c \cdot \text{OPT}$, i.e. approximation ratio $c$.

**Maximization problems:**

- Find a computable value $U$ with $\text{OPT} \leq U$ (an **upper bound** on OPT).
- Show the algorithm's output satisfies $\text{APX} \geq U / c$.
- Then $\text{APX} \geq U / c \geq \text{OPT} / c$.

> **Why it works:** we never *compute* OPT. We merely sandwich it between two quantities we can control — a computable bound $L$ and the algorithm's output APX. Every 2-approximation proof this week follows exactly this template; the only difference is *which $L$ we plug in* (MST weight, matching size, volume bound, average load, virtual $(k+1)$-th center distance).

---

<br>

## 2. TSP — MST-Based 2-Approximation

### 2.1 Problem and the Metric Assumption

**Traveling Salesman Problem (TSP).** A salesperson starts from a city, visits every other city exactly once, and returns to the start. **Goal:** minimize the total travel distance.

**Metric TSP** assumptions (these are what make a 2-approximation possible):

- **Symmetry:** $d(A, B) = d(B, A)$.
- **Triangle inequality:** $d(A, B) \leq d(A, C) + d(C, B)$ — "a detour is never shorter than the direct route."

Both hold for Euclidean distances and many real-world cost models.

> **Why the metric assumption is essential:** general TSP without the triangle inequality cannot be approximated to *any* constant factor unless $P = NP$ (provable by a HAM-CYCLE reduction). The triangle inequality is precisely the property guaranteeing that "a shortcut is always safe," which underpins Step 2 of the proof below.

### 2.2 MST-Based Approach — Intuition

To design a polynomial-time approximation, the standard move is to find a related problem whose efficient algorithm is *already known*. The **Minimum Spanning Tree (MST)** shares key properties with TSP:

- MST connects **all vertices** (as TSP visits all cities).
- MST minimizes **total edge weight** (related to minimizing tour length).

So we borrow the MST (Week 11) and traverse it to construct an approximate tour.

### 2.3 Algorithm

**Approx_MST_TSP** (input: $n$ cities with pairwise distances / output: a tour visiting each city once and returning to the start)

```
1. Compute the MST of the input graph (Kruskal's or Prim's).
2. Starting from any city, perform a DFS traversal of the MST, recording
   the visit order. (Each tree edge is used twice — once forward, once back.)
3. Remove duplicate cities from the visit order — keep only the first
   occurrence of each city, then append the starting city at the end.
4. Return the resulting tour.
```

Step 3 is the **shortcut** step — whenever the DFS passes through an already-visited vertex, it "jumps" directly to the next unvisited vertex. The triangle inequality guarantees each shortcut is no longer than the path it replaces.

### 2.4 Worked Example

Consider 8 cities $A, B, C, D, E, F, G, H$.

**Step 1 — Build the MST.** Apply Kruskal's / Prim's to obtain the tree edges connecting all 8 vertices.

```
Original graph (partial)            MST (Kruskal/Prim result)

A --- B --- C                          A
|   / |   / |                         / \
D --- E --- F          ═══>           G   ...
|         / |                        / \
G ------ H  |                        E   D
                                        / \
                                       H   F …
```

**Step 2 — DFS traversal** (starting from $A$, each edge twice):

$$
A \to G \to E \to G \to D \to H \to C \to H \to D \to F \to B \to F \to D \to G \to A
$$

The total length of this traversal = $2M$ (where $M$ = total MST weight), because each of the $n - 1$ tree edges is used exactly **twice** (forward and back).

**Step 3 — Remove duplicates (shortcut).** Skip already-visited cities:

$$
A \to G \to E \to \cancel{G} \to D \to H \to C \to \cancel{H} \to \cancel{D} \to F \to B \to \cancel{F} \to \cancel{D} \to \cancel{G} \to A
$$

**Resulting tour:** $A \to G \to E \to D \to H \to C \to F \to B \to A$.

By the triangle inequality, each shortcut is no longer than the path it replaces, so the resulting tour length $\leq 2M$.

### 2.5 Approximation-Ratio Proof

**Claim:** Approx_MST_TSP has approximation ratio $< 2.0$.

Let $M$ = total MST weight, $\text{OPT}$ = optimal TSP tour length, $\text{APX}$ = approximate tour length.

**Step 1 — $\text{OPT} > M$.**
The optimal tour visits all vertices and returns to start. Removing *any one edge* from that tour leaves a spanning tree (all vertices touched, connected, $|V| - 1$ edges). Since $M$ is the *minimum* spanning-tree weight, $M \leq (\text{tour} - \text{one edge})$. With positive edge weights, $(\text{tour} - \text{one edge}) < \text{OPT}$, hence $M < \text{OPT}$.

**Step 2 — $\text{APX} \leq 2M$.**
The DFS traversal has length exactly $2M$. Each shortcut in Step 3 replaces a sub-path "$x \to y \to z$" of the traversal with the direct edge "$x \to z$", and by the triangle inequality $d(x, z) \leq d(x, y) + d(y, z)$ this can only *decrease* the length.

**Combining:**

$$
\text{APX} \leq 2M < 2 \cdot \text{OPT}
\implies \frac{\text{APX}}{\text{OPT}} < 2.0. \qquad \blacksquare
$$

### 2.6 Complexity

| Step | Operation                  | Complexity    |
|------|----------------------------|---------------|
| 1    | Build MST (Kruskal's)      | $O(m \log m)$ |
| 1    | Build MST (Prim's)         | $O(n^2)$      |
| 2    | DFS traversal              | $O(n)$        |
| 3    | Remove duplicates          | $O(n)$        |

**Overall:** dominated by MST construction → $O(m \log m)$ with Kruskal's (m = edges) or $O(n^2)$ with Prim's (n = cities).

---

<br>

## 3. Vertex Cover — Maximal-Matching 2-Approximation

### 3.1 Problem

**Vertex Cover** of $G = (V, E)$: a subset $S \subseteq V$ such that every edge has at least one endpoint in $S$. **Goal:** find the minimum-size vertex cover.

**Real-world analogy:** placing the minimum number of CCTV cameras at intersections (vertices) so that every corridor (edge) is monitored.

**Example (triangle graph {1, 2, 3}):**
- $\{1, 2, 3\}, \{1, 2\}, \{1, 3\}, \{2, 3\}$ are all vertex covers.
- If one vertex touches all edges, that single vertex is the minimum cover.
- $\{2\}$ alone fails because edge $(1,3)$ is uncovered.

### 3.2 Maximal-Matching Approach

**Key insight:** instead of an expensive set-cover-style reduction, use a **maximal matching**.

- **Matching:** a set of edges sharing no endpoints.
- **Maximal matching:** a matching to which no further edge can be added (a greedy stopping point).
  - Not the same as a *maximum* matching (the largest possible).
  - A maximal matching can be found greedily in polynomial time.

**Idea:** select edges greedily (only when neither endpoint is already used), then take all endpoints of the selected edges as the vertex cover.

### 3.3 Algorithm and Worked Example

**Approx_Matching_VC** (input: graph $G = (V, E)$ / output: a vertex cover)

```
1. Find a maximal matching M in G:
   - M ← ∅
   - for each edge (u, v) ∈ E:
       if neither u nor v is an endpoint of any edge already in M,
       add (u, v) to M.
2. Return the set of all endpoints of edges in M.
```

**Worked example.**

```
9-vertex graph:
   1 --- 2 --- 3
   |   / |   / |
   4 --- 5 --- 6
   |   / |   / |
   7 --- 8 --- 9
```

Suppose the greedy maximal matching $M$ selects 6 edges. The algorithm returns $2 \times 6 = 12$ endpoints. If the optimal vertex cover is 7:

$$
\rho = \frac{12}{7} \approx 1.71 \quad (\text{well within the guaranteed } 2.0).
$$

### 3.4 Ratio Proof and Tightness

**Claim:** Approx_Matching_VC has approximation ratio $\leq 2.0$.

Let $|M|$ = number of edges in the maximal matching, $\text{OPT}$ = size of the optimal vertex cover.

**Step 1 — $\text{OPT} \geq |M|$.**
Any vertex cover must include at least one endpoint of each matching edge (otherwise that edge is uncovered). Since matching edges share no endpoints, distinct matching edges require *distinct* vertices — so at least $|M|$ vertices.

**Step 2 — $\text{APX} = 2|M|$.**
The algorithm returns both endpoints of every matching edge — exactly $2|M|$ vertices, all distinct (matching edges share no endpoints).

**Combining:**

$$
\frac{\text{APX}}{\text{OPT}} = \frac{2|M|}{\text{OPT}} \leq \frac{2|M|}{|M|} = 2.0. \qquad \blacksquare
$$

> **The ratio is tight (exactly 2):** if the graph consists of $k$ disjoint edges (a perfect matching of size $k$ with no shared endpoints), the optimal cover takes one endpoint per edge → size $k$, but the algorithm returns $2k$ endpoints → $\rho = 2k/k = 2.0$ **exactly**. So this algorithm cannot be pushed below 2. (Aside: obtaining a $(2-\epsilon)$-approximation for any constant $\epsilon > 0$ is conjectured NP-Hard under the Unique Games Conjecture.)

**Complexity.** For each edge, check whether its endpoints are already used → $O(n)$ per edge × $m$ edges → **$O(nm)$**.

---

<br>

## 4. Bin Packing — Four Greedy Heuristics

### 4.1 Problem

**Bin Packing Problem.** Given $n$ items of sizes $s_1, s_2, \dots, s_n$ (each $\leq C$) and bins of capacity $C$, pack all items into the **fewest number of bins**.

This is an NP-hard optimization problem with rich applications: memory allocation, container loading, disk partitioning, virtual-machine packing.

### 4.2 First Fit / Next Fit / Best Fit / Worst Fit

| Method            | Strategy                                                              |
|-------------------|-----------------------------------------------------------------------|
| **First Fit (FF)** | Scan bins from the first; place the item in the **first bin** with enough room. |
| **Next Fit (NF)**  | Check only the **most recently used bin**; if it fits, place it there, else open a new bin. |
| **Best Fit (BF)**  | Place the item in the fitting bin that leaves the **least remaining space**. |
| **Worst Fit (WF)** | Place the item in the fitting bin that leaves the **most remaining space**. |

For all four methods, if no existing bin has room, **open a new bin**.

### 4.3 Worked Example

$C = 10$, items $= [7, 5, 6, 4, 2, 3, 7, 5]$ (in arrival order).

| Method       | Bin Contents                           | Bins Used |
|--------------|----------------------------------------|-----------|
| First Fit    | {7,2}, {5,4}, {6,3}, {7}, {5}          | 5         |
| Next Fit     | {7}, {5}, {6,4}, {2,3}, {7}, {5}       | 6         |
| Best Fit     | {7,2}, {5,3}, {6,4}, {7}, {5}          | 5         |
| Worst Fit    | {7,3}, {5,4}, {6,2}, {7}, {5}          | 5         |
| **Optimal**  | {7,3}, {5,5}, {6,4}, {7,2}             | **4**     |

> All four heuristics use 5 bins while the optimum is 4 — ratio $5/4 = 1.25$, well within the guaranteed 2.0. Next Fit is worst because it looks only at the previous bin and misses the leftover space in earlier bins.

### 4.4 Algorithm and Complexity

```
Approx_BinPacking(items s_1, …, s_n, capacity C):
    B = 0
    for i = 1 to n:
        if a bin with enough room exists (per the chosen strategy):
            place item i in that bin
        else:
            open a new bin, place item i in it, B = B + 1
    return B
```

| Method     | Per-item work        | Total    |
|------------|----------------------|----------|
| First Fit  | Scan all bins, $O(n)$ | $O(n^2)$ |
| Best Fit   | Scan all bins, $O(n)$ | $O(n^2)$ |
| Worst Fit  | Scan all bins, $O(n)$ | $O(n^2)$ |
| Next Fit   | Check one bin, $O(1)$ | $O(n)$   |

### 4.5 Approximation-Ratio Proof

**Claim (FF / BF / WF):** First Fit, Best Fit, and Worst Fit all achieve $\rho \leq 2.0$.

**Key observation.** At termination, at most **one** bin can be **less than half full**.
*Why:* if two bins were each $<C/2$ full, their contents would fit into a single bin, contradicting the "fill existing bins first" greedy strategy of FF/BF/WF.

**Proof.** Let $\text{OPT}'$ = number of bins used by the algorithm, $\text{OPT}$ = optimal. At least $\text{OPT}' - 1$ bins are *more* than half full, so:

$$
\sum s_i > (\text{OPT}' - 1) \cdot \frac{C}{2}.
$$

Trivially the optimum also needs at least $\sum s_i / C$ bins by volume alone, so $\text{OPT} \geq \sum s_i / C$. Combining:

$$
\text{OPT} \geq \frac{\sum s_i}{C} > \frac{\text{OPT}' - 1}{2}
\implies 2 \cdot \text{OPT} > \text{OPT}' - 1
\implies 2 \cdot \text{OPT} \geq \text{OPT}'. \qquad \blacksquare
$$

**Claim (NF):** Next Fit also achieves $\rho \leq 2.0$ via a slightly different argument.

**Key observation.** Under Next Fit, the combined contents of any *two consecutive* bins exceed $C$. *Why:* if the second bin's contents fit in the first, Next Fit would not have opened the second.

**Proof.** Group consecutive bins into pairs: (bin 1, bin 2), (bin 3, bin 4), …. There are at least $\text{OPT}'/2$ pairs, each with total $> C$:

$$
\sum s_i > \frac{\text{OPT}'}{2} \cdot C
\implies \text{OPT} \geq \frac{\sum s_i}{C} > \frac{\text{OPT}'}{2}
\implies 2 \cdot \text{OPT} > \text{OPT}'. \qquad \blacksquare
$$

> **In practice:** sorting items in *decreasing* size first (First Fit Decreasing, Best Fit Decreasing) yields a much better asymptotic ratio near $\frac{11}{9}\,\text{OPT} + O(1)$ — large items are placed first and small items act as filler for the leftover gaps.

---

<br>

## 5. Job Scheduling — Earliest-Finishing-Machine 2-Approximation

### 5.1 Problem

**Job Scheduling Problem.**
- $n$ jobs with processing times $t_1, t_2, \dots, t_n$.
- $m$ identical machines $M_1, \dots, M_m$.
- Each job runs on exactly one machine without interruption; each machine processes one job at a time.

**Goal:** assign jobs to machines to minimize the **makespan** — the time at which the last job finishes.

### 5.2 Algorithm and Worked Example

**Algorithm.** Always assign the next job to the machine that finishes earliest (smallest current load):

```
Approx_JobScheduling(times t_1, …, t_n, m machines):
    for j = 1 to m:
        L[j] = 0                       // current finishing time of machine j
    for i = 1 to n:
        min = 1
        for j = 2 to m:                // find the earliest-finishing machine
            if L[j] < L[min]:
                min = j
        assign job i to machine M_min
        L[min] = L[min] + t_i
    return max(L[1], …, L[m])
```

**Worked example.** Jobs $t = [5, 2, 4, 3, 4, 7, 9, 2, 4, 1]$, $m = 4$ machines.

| Job | $t_i$ | Assigned to | Loads after      |
|-----|-------|-------------|-------------------|
| 1   | 5     | M1          | [5, 0, 0, 0]      |
| 2   | 2     | M2          | [5, 2, 0, 0]      |
| 3   | 4     | M3          | [5, 2, 4, 0]      |
| 4   | 3     | M4          | [5, 2, 4, 3]      |
| 5   | 4     | M2          | [5, 6, 4, 3]      |
| 6   | 7     | M4          | [5, 6, 4, 10]     |
| 7   | 9     | M3          | [5, 6, 13, 10]    |
| 8   | 2     | M1          | [7, 6, 13, 10]    |
| 9   | 4     | M2          | [7, 10, 13, 10]   |
| 10  | 1     | M1          | [8, 10, 13, 10]   |

**Makespan (APX) = 13** (M3).

### 5.3 Approximation-Ratio Proof

**Claim:** Approx_JobScheduling has approximation ratio $\leq 2.0$.

Let the job that determines the makespan (the last to finish) be job $i$, starting at time $T$. Then $\text{APX} = T + t_i$.

**Two lower bounds on OPT:**

1. **Volume bound:** $\text{OPT} \geq \dfrac{\sum_j t_j}{m}$ — even with perfect load balancing, some machine must run at least the average.
2. **Per-job bound:** $\text{OPT} \geq t_i$ — any schedule must also process job $i$ somewhere, taking $t_i$ time.

**Proof.** Job $i$ was placed on the earliest-finishing machine at placement time, so its start time $T$ is at most the average of all machine finishing times at that moment, which is at most the overall average (since job $i$ was not yet assigned):

$$
T \leq \frac{\sum_{j \neq i} t_j}{m} \leq \frac{\sum_j t_j}{m} \leq \text{OPT}.
$$

Combining with $t_i \leq \text{OPT}$:

$$
\text{APX} = T + t_i \leq \text{OPT} + \text{OPT} = 2 \cdot \text{OPT}. \qquad \blacksquare
$$

> **In practice:** **Longest Processing Time first (LPT)** — sorting jobs by decreasing $t_i$ before the same greedy assignment — achieves a $\frac{4}{3}$-approximation and performs much better empirically, because placing big jobs first lets small jobs fine-tune the load at the end.

### 5.4 Complexity

For each of $n$ jobs, find the minimum among $m$ machine loads ($O(m)$), plus one final maximum ($O(m)$):

$$
n \cdot O(m) + O(m) = \mathbf{O(nm)}.
$$

---

<br>

## 6. k-Clustering — Farthest-First 2-Approximation

### 6.1 Problem

**k-Clustering Problem.** Given $n$ points in a 2D plane (or any metric space) and an integer $k$, partition the points into **$k$ groups**, each with a designated **center** point. **Goal:** minimize the **maximum cluster diameter** (the diameter of the largest cluster).

**Applications:** recommendation systems, data mining, VLSI design, parallel processing, web search, pattern recognition, gene analysis, social-network analysis, and more.

### 6.2 Algorithm and Worked Example

**Farthest-First Traversal (greedy).** Select centers one at a time, each time choosing the point **farthest from all existing centers** as the next center.

```
Approx_k_Clusters(points x_0, …, x_{n-1}, k > 1):
    C[1] = x_r                            // random first center
    for j = 2 to k:
        for each non-center point x_i:
            D[i] = min distance from x_i to any existing center
        C[j] = the point x_i with the largest D[i]  (x_i not already a center)
    assign each non-center point to its nearest center
    return centers C and cluster assignments
```

**Intuition:** spreading centers far apart guarantees that every cluster covers a small area.

**Worked example, $k = 4$:**

- **Step 1:** pick an arbitrary point as $C_1$.
- **Step 2:** compute $D[i]$ for all non-center points; the farthest from $C_1$ becomes $C_2$.
- **Step 3:** recompute $D[i] = \min(d(x_i, C_1), d(x_i, C_2))$ for each point. For example, if $D[1]=18, D[2]=19, D[3]=20, D[4]=17$ (others < 20), the largest $D[3]=20$ point becomes $C_3$.
- **Step 4:** recompute $D[i] = \min(d(x_i, C_1), d(x_i, C_2), d(x_i, C_3))$; the largest becomes $C_4$.
- **Step 5:** assign each non-center point to its nearest center.

### 6.3 Approximation-Ratio Proof

**Claim:** Approx_k_Clusters has approximation ratio $\leq 2.0$.

**Setup.** After choosing $k$ centers, imagine selecting one more — a **virtual $(k+1)$-th center** $C_{k+1}$ — using the same farthest-first rule. Let $d$ = the distance from $C_{k+1}$ to its nearest existing center.

**Step 1 — $\text{OPT} \geq d$.**
We now have $k + 1$ "center" points that must be split into $k$ optimal groups. By the **pigeonhole principle**, at least one optimal group contains two of these $k+1$ points. The diameter of that group is at least the distance between its two centers, which is $\geq d$ (by the farthest-first construction, the minimum pairwise distance among the $k+1$ centers is $d$). Hence $\text{OPT} \geq d$.

**Step 2 — $\text{APX} \leq 2d$.**
Since $C_{k+1}$ is the farthest point from any existing center, **every** other point is within distance $d$ of its nearest center. So each cluster has radius $\leq d$, and diameter $\leq 2d$.

**Combining:**

$$
2 \cdot \text{OPT} \geq 2d \geq \text{APX}
\implies \frac{\text{APX}}{\text{OPT}} \leq 2.0. \qquad \blacksquare
$$

### 6.4 Complexity and Practical Considerations

**Complexity.**

| Component                          | Analysis        |
|------------------------------------|-----------------|
| Inner loop (each point to centers) | $O(kn)$         |
| Find max $D[i]$                    | $O(n)$          |
| Outer loop ($k-1$ iterations)     | $\times (k-1)$  |
| Final assignment                   | $O(kn)$         |

$$
(k-1)\,(O(kn) + O(n)) + O(kn) = \mathbf{O(k^2 n)}.
$$

**Practical considerations.**
- **Random first center:** since $C_1$ is random, results vary between runs → run several times and take the best.
- **Outlier sensitivity:** noise/outliers distort center selection → preprocess to remove outliers.
- **Legacy:** this algorithm is closely related to the **k-center problem** and is also known as **Gonzalez's algorithm** (1985). It inspired the **k-means++** initialization used in modern k-means.

---

<br>

## 7. Approximation Algorithms — Summary Table

| Problem                    | Indirect-Optimal Bound                                  | Ratio              | Time                        |
|----------------------------|--------------------------------------------------------|--------------------|-----------------------------|
| **TSP** (Metric)           | $M$ = MST weight ($\text{OPT} > M$)                    | $< 2.0$            | $O(n^2)$ or $O(m \log m)$   |
| **Vertex Cover**           | $|M|$ = maximal-matching size ($\text{OPT} \geq |M|$)  | $\leq 2.0$ (tight) | $O(nm)$                     |
| **Bin Packing (FF/BF/WF)** | $\sum s_i / C$ ($\text{OPT} \geq \sum s_i / C$)        | $\leq 2.0$         | $O(n^2)$                    |
| **Bin Packing (NF)**       | $\sum s_i / C$                                         | $\leq 2.0$         | $O(n)$                      |
| **Job Scheduling**         | $\sum t_i / m$ and $\max t_i$                          | $\leq 2.0$         | $O(nm)$                     |
| **k-Clustering**           | virtual $(k+1)$-th center distance $d$                 | $\leq 2.0$         | $O(k^2 n)$                  |

All five problems achieve a **2-approximation** — a solution at most twice the optimum, in polynomial time. The common proof technique is the **indirect-optimal**: find a computable bound on OPT and sandwich it between the algorithm's output and OPT.

---

<br>

## Summary

| Concept                  | Definition                                                              |
|--------------------------|-------------------------------------------------------------------------|
| **Approximation algorithm** | An algorithm that gives up optimality for polynomial time + a provable quality guarantee |
| **Approximation ratio** $\rho$ | $\text{APX} / \text{OPT}$; closer to $1.0$ is better, $2.0$ = 2-approximation |
| **Indirect optimal**     | A proof template that sandwiches OPT between a computable bound and APX  |
| **2-approximation**      | Guarantees at most twice the optimum — all five algorithms this week     |

**Key takeaways:**

1. Of the three things one can give up against an NP-Complete problem (polynomial time / all inputs / optimality), an **approximation algorithm gives up optimality** while keeping a *provable* guarantee (heuristics have no guarantee).
2. The **approximation ratio** is the gold standard of quality, and the **indirect-optimal technique** is the universal proof template — sandwich OPT between a computable bound and the algorithm's output.
3. The five canonical algorithms — TSP (MST), Vertex Cover (maximal matching), Bin Packing (FF/NF/BF/WF), Job Scheduling (earliest-finishing machine), Clustering (farthest-first) — all earn a **factor-2 guarantee** through a simple greedy plus a clean proof.
4. The proofs differ only in *which bound $L$ is plugged in*: MST weight, matching size, volume bound, average load / per-job bound, virtual $(k+1)$-th center distance.
5. Vertex Cover's ratio of 2 is **tight** — a graph of disjoint edges produces exactly twice the optimum.
6. Like TSP's triangle inequality, each proof rests on one decisive assumption/observation that makes the algorithm safe (TSP: triangle inequality, Bin Packing: at most one less-than-half-full bin, Job Scheduling: two lower bounds, Clustering: pigeonhole).

> "If you cannot solve it exactly, approximate it — and prove the quality of the approximation."

---

<br>

## Self-Check Questions

1. **The three give-ups:** What are the three things one can give up when facing an NP-Complete problem, and which does an approximation algorithm give up? How does it differ from a heuristic?

   > **Answer:** The three are (1) polynomial time, (2) all inputs, (3) optimality. An **approximation algorithm gives up (3) optimality** while keeping a *provable* guarantee (the approximation ratio) that the solution is within a fixed factor of optimal. A heuristic also gives up (3) but *without a provable guarantee* — it may work well in practice yet offers no mathematical bound on worst-case quality. This presence/absence of a provable guarantee is the decisive difference between an approximation algorithm and a heuristic.

2. **Why indirect optimal:** Why does the "$\text{APX} \leq 2 \cdot \text{OPT}$" proof not compare APX to OPT directly, and how does the indirect bound $L$ act as a substitute?

   > **Answer:** OPT is what we cannot compute — the whole point of approximation is to *avoid* computing it. So the proof sandwiches OPT between two quantities we *can* control: (1) a polynomial-time computable bound $L$ that we can prove satisfies $L \leq \text{OPT}$; and (2) the algorithm's output APX, for which we can prove $\text{APX} \leq c \cdot L$. Combining gives $\text{APX} \leq c \cdot L \leq c \cdot \text{OPT}$ — without ever computing OPT. Every 2-approximation proof in §2–§6 plugs in a different $L$ (MST weight, matching size, volume bound, average load, virtual $(k+1)$-th center distance).

3. **TSP triangle inequality:** Where exactly is the triangle inequality used in the Approx_MST_TSP proof? What breaks without it?

   > **Answer:** The triangle inequality is used in **algorithm Step 3** (shortcut) and **proof Step 2** ($\text{APX} \leq 2M$). When replacing a sub-path "$x \to y \to z$" of the DFS traversal with the direct edge "$x \to z$", we need $d(x, z) \leq d(x, y) + d(y, z)$ — otherwise a shortcut could be *longer* than the path it replaces, breaking the $\text{APX} \leq 2M$ bound. **Without it:** general TSP cannot be approximated to any constant factor unless $P = NP$ (a HAM-CYCLE reduction constructs arbitrarily bad gaps). Metric TSP is the "nice" case where the triangle inequality makes shortcutting safe.

4. **TSP's $\text{OPT} > M$ step:** Explain why the optimal TSP tour length exceeds the MST weight.

   > **Answer:** The optimal tour is a cycle visiting all $n$ vertices and returning to the start. Removing *any one edge* from that cycle leaves a spanning tree connecting all vertices (connectivity preserved, $n-1$ edges). Since the MST is the *minimum* spanning tree, its weight $M$ is at most that spanning tree's (= tour − one edge): $M \leq \text{OPT} - (\text{removed edge}) < \text{OPT}$ (assuming positive edge weights). Hence $M < \text{OPT}$. This provides the lower bound $L = M$ for the TSP proof.

5. **Vertex Cover tightness:** Give an input where the maximal-matching algorithm returns *exactly* twice the optimum, and explain what this means.

   > **Answer:** A graph consisting of $k$ disjoint edges — a perfect matching of size $k$ with no shared endpoints. The optimal vertex cover takes one endpoint per edge → size $k$. But the algorithm selects all $k$ edges into the maximal matching and returns $2k$ endpoints → $\rho = 2k/k = 2.0$ **exactly**. Meaning: this algorithm's 2-approximation guarantee is **tight**, so this approach can never be improved below 2. Beating 2 requires a fundamentally different approach.

6. **Bin Packing key observation:** Justify the "at most one bin less than half full" observation in the FF/BF/WF proof of $\rho \leq 2$.

   > **Answer:** Suppose two bins $B_1, B_2$ are both less than half full ($<C/2$). Then their combined contents are $< C/2 + C/2 = C$, so they would fit in a single bin. But FF/BF/WF always try to place an item into an existing bin before opening a new one, so the items of the later-opened bin could not have fit into the earlier bin — contradiction. Hence at most one bin is less than half full. Consequently at least $\text{OPT}'-1$ bins are more than half full, giving $\sum s_i > (\text{OPT}'-1)\cdot C/2$; combined with $\text{OPT} \geq \sum s_i/C$ this yields $2\,\text{OPT} \geq \text{OPT}'$.

7. **Why Next Fit is worse:** In the §4.3 example Next Fit uses 6 bins vs 5 for the others. Explain by the algorithm's behavior.

   > **Answer:** Next Fit checks only the **most recently opened bin** and opens a new bin the moment an item doesn't fit — it never looks back at earlier bins even if they have room. In the example, when processing the 6 it looks only at the previous bin {5} (6 doesn't fit) and opens a new bin, never reusing the remaining space of 3 in the {7} bin. First/Best/Worst Fit instead scan *all* open bins and reuse earlier leftover space. The trade-off: Next Fit is $O(1)$ per item → $O(n)$ overall (faster), while the others are $O(n^2)$.

8. **Job Scheduling's two bounds:** Why does the makespan proof need *both* lower bounds on OPT? Why is one insufficient?

   > **Answer:** With the last job $i$ starting at time $T$ and taking $t_i$, $\text{APX} = T + t_i$. (1) The **volume bound** $\text{OPT} \geq \sum t_j/m$ gives $T \leq \text{OPT}$ (greedy placed $i$ on the emptiest machine, so $T$ is below the average). (2) The **per-job bound** $\text{OPT} \geq t_i$ gives $t_i \leq \text{OPT}$. Both are needed for $\text{APX} = T + t_i \leq \text{OPT} + \text{OPT} = 2\,\text{OPT}$. **One alone is insufficient:** the volume bound cannot handle a single huge $t_i$ (one job dominates the makespan); the per-job bound cannot handle many small jobs accumulating into a large $T$. Both scenarios must be blocked for the 2-approximation to hold.

9. **Clustering pigeonhole:** Detail the pigeonhole step of the $\text{OPT} \geq d$ argument with $k = 3$ and 4 (virtual-included) centers.

   > **Answer:** The chosen $k=3$ centers $C_1, C_2, C_3$ plus the virtual $C_4$ make 4 "center" points. The optimal solution partitions all points into 3 clusters. By **pigeonhole**, distributing 4 items into 3 bins forces at least one bin to hold $\geq 2$ items — i.e. some optimal cluster contains at least 2 of $\{C_1, C_2, C_3, C_4\}$. The diameter of that cluster is at least the distance between its two centers, which is $\geq d$ (the minimum pairwise distance among the four centers, by the farthest-first construction). Hence the maximum cluster diameter $\geq d$, i.e. $\text{OPT} \geq d$. (Combined with Step 2's $\text{APX} \leq 2d$, $\rho \leq 2$.)

10. **Ratio vs complexity trade-off:** All five algorithms achieve $\rho \leq 2$, yet complexities range from $O(n)$ (Next Fit) to $O(k^2 n)$ (Clustering). What drives the complexity difference at the same ratio?

    > **Answer:** The ratio guarantee (2) comes from the *proof structure* (indirect optimal), while complexity comes from *how many candidates the algorithm inspects per step*. **Next Fit** $O(n)$: checks one bin. **First/Best/Worst Fit** $O(n^2)$: scans all bins per item. **TSP** $O(n^2)$ or $O(m\log m)$: dominated by MST construction. **Vertex Cover / Job Scheduling** $O(nm)$: a linear check per edge/job. **Clustering** $O(k^2 n)$: outer loop $k-1$ times × inner $O(kn)$. Key point: a greedy that examines more global information (all bins, all machines, all centers) usually yields better *practical* solutions but the same *worst-case* guarantee of 2 — the ratio is a worst-case bound, not average performance.

11. **Approximation vs exact:** 0-1 Knapsack "solves" in $O(nC)$ DP — why is it still a target for approximation/heuristics? (Week 13 connection)

    > **Answer:** The $O(nC)$ DP is **pseudo-polynomial** — polynomial in the *value* of the capacity $C$ but exponential in the input *bit-length* ($\log C$ bits). For instances like $C \approx 2^{100}$ it is impractical, and the NP-Completeness proof constructs exactly such exponentially large $C$. So for general large $C$ the exact DP fails and we turn to approximation algorithms (e.g. an FPTAS) or heuristics. This ties directly to the Week 13 point that "polynomial time" means polynomial in the *encoding length*, not the *value*.

12. **Greedy improvement pattern:** What improvement idea do Bin Packing's FFD (First Fit Decreasing) and Job Scheduling's LPT (Longest Processing Time) share?

    > **Answer:** Both **process the large items/jobs first** and let the small ones act as filler for the leftover gaps at the end. In a random/arbitrary order, small items occupy resources early, forcing later large items into their own nearly empty bin/machine. Sorting in *decreasing* order places big items first (when there is plenty of room), then lets small items precisely fill the remaining space. As a result FFD achieves $\frac{11}{9}\,\text{OPT}+O(1)$ and LPT a $\frac{4}{3}$-approximation, beating the 2-approximation of plain FF/greedy. General lesson: in many greedy approximations, handling the "chunky" items first lets small items serve as load fine-tuning, dramatically improving packing/scheduling efficiency.
