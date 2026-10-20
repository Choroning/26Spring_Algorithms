# Week 12 Lecture — Graph Algorithms II

[Repository Guide](../../README.md) | [English](Concepts_Lecture.md) | [한국어](Concepts_Lecture.ko.md)

> **Last Updated:** 2026-10-20
>
> Introduction to Algorithms, Cormen, Leiserson, Rivest, and Stein, Ch 22, 24, 25

> **Learning Objectives:**
> 1. State the **shortest-path problem** on weighted (di)graphs, explain when it is well-defined (no negative-weight cycle reachable from the source), and prove and apply **optimal substructure** of shortest paths
> 2. Define **relaxation** of an edge and recognize it as the core operation shared by every shortest-path algorithm, then execute **Dijkstra's algorithm** on a graph with non-negative weights, justify the greedy choice, and analyze the running time with a binary heap as $O(E \log V)$
> 3. Construct a small example where Dijkstra **fails on negative edges** and explain *why* the greedy invariant breaks; execute **Bellman-Ford**, derive its $|V|-1$ iteration bound from the path-length argument, use Phase 2 to **detect negative-weight cycles**, and re-derive it as a **dynamic program** indexed by at most $k$ edges
> 4. Execute **Floyd-Warshall** using the node-based recurrence $d_{ij}^{(k)} = \min\{d_{ij}^{(k-1)}, d_{ik}^{(k-1)} + d_{kj}^{(k-1)}\}$, reconstruct paths from the predecessor matrix, and state the alternative **edge-based formulation** and its connection to matrix multiplication
> 5. Solve shortest paths on a **DAG** in $\Theta(V + E)$ via topological order, and choose the right shortest-path algorithm given graph properties (DAG? negative weights? all pairs?)
> 6. Define **strongly connected components (SCCs)** and execute **Kosaraju's two-pass DFS algorithm** in $\Theta(V + E)$

---

## Table of Contents

- [1. Shortest Paths: Foundations](#1-shortest-paths-foundations)
  - [1.1 Problem Definition](#11-problem-definition)
  - [1.2 Optimal Substructure](#12-optimal-substructure)
  - [1.3 Relaxation](#13-relaxation)
- [2. Single-Source Shortest Paths](#2-single-source-shortest-paths)
  - [2.1 Dijkstra: Idea](#21-dijkstra-idea)
  - [2.2 Dijkstra: Pseudocode and Complexity](#22-dijkstra-pseudocode-and-complexity)
  - [2.3 Dijkstra: Step-by-Step Example](#23-dijkstra-step-by-step-example)
  - [2.4 Why Dijkstra Fails with Negative Weights](#24-why-dijkstra-fails-with-negative-weights)
  - [2.5 Bellman-Ford: Pseudocode](#25-bellman-ford-pseudocode)
  - [2.6 Bellman-Ford: Step-by-Step Example](#26-bellman-ford-step-by-step-example)
  - [2.7 Bellman-Ford as Dynamic Programming](#27-bellman-ford-as-dynamic-programming)
  - [2.8 Dijkstra vs Bellman-Ford](#28-dijkstra-vs-bellman-ford)
- [3. All-Pairs Shortest Paths: Floyd-Warshall](#3-all-pairs-shortest-paths-floyd-warshall)
  - [3.1 Motivation](#31-motivation)
  - [3.2 Input Matrix](#32-input-matrix)
  - [3.3 Node-Based Recurrence](#33-node-based-recurrence)
  - [3.4 Pseudocode and Complexity](#34-pseudocode-and-complexity)
  - [3.5 Worked Example: k = 0, 1, 2, 3](#35-worked-example-k--0-1-2-3)
  - [3.6 Final Distance Matrix and Path Reconstruction](#36-final-distance-matrix-and-path-reconstruction)
  - [3.7 Predecessor Matrix](#37-predecessor-matrix)
  - [3.8 Edge-Based Formulation](#38-edge-based-formulation)
- [4. DAG Shortest Paths](#4-dag-shortest-paths)
  - [4.1 Algorithm](#41-algorithm)
  - [4.2 Worked Example](#42-worked-example)
- [5. Shortest-Path Algorithms: Big Picture](#5-shortest-path-algorithms-big-picture)
- [6. Strongly Connected Components](#6-strongly-connected-components)
  - [6.1 Definition](#61-definition)
  - [6.2 Kosaraju's Algorithm: Pseudocode](#62-kosarajus-algorithm-pseudocode)
  - [6.3 Kosaraju: Worked Example](#63-kosaraju-worked-example)
  - [6.4 Why Kosaraju Works](#64-why-kosaraju-works)
- [Summary](#summary)
- [Self-Check Questions](#self-check-questions)

---

<br>

## 1. Shortest Paths: Foundations

### 1.1 Problem Definition

- **Setting:** a weighted directed graph $G = (V, E)$ with a weight function $w : E \to \mathbb{R}$.
  - An undirected edge $(u, v)$ is modeled as the two directed edges $(u, v)$ and $(v, u)$ with the same weight.
- The **shortest path** from $u$ to $v$ is a path with **minimum total edge weight** among all $u \to v$ paths.
- **Well-definedness:** whenever a **negative-weight cycle is reachable from the source**, shortest paths to the vertices reachable through that cycle are *undefined*, because the cost can be driven to $-\infty$ by traversing the cycle repeatedly.

<br>

**Two flavors of problem:**

| Category | Problem | Algorithms |
|----------|---------|-----------|
| **Single-source** | Shortest paths from one source $r$ to every other vertex | Dijkstra, Bellman-Ford, DAG-ShortestPath |
| **All-pairs** | Shortest paths between **every** ordered pair of vertices | Floyd-Warshall (and Dijkstra from each vertex as a baseline) |

*Table 1. Classification into single-source and all-pairs problems*

> **Note:** **Why the shortest path is the right abstraction.** It captures GPS routing, network packet routing, currency arbitrage detection, project scheduling, and dozens more. The choice of algorithm depends entirely on *which assumption you can make about the weights*, such as non-negative, mixed signs, or no cycles at all.

### 1.2 Optimal Substructure

> **Key Point:** **Subpaths of shortest paths are themselves shortest paths.**

```text
Source ──[5]──> Intermediate ──[3]──> Goal
         ↑                       ↑
     shortest                 shortest
     to here                  from here
```

*Figure 1. Prefix and suffix of a shortest path*

If the shortest path $S \to G$ goes through an intermediate vertex $M$ with total cost $5 + 3 = 8$, then:

- the prefix $S \to M$ (cost 5) is itself the shortest $S \to M$ path, and
- the suffix $M \to G$ (cost 3) is itself the shortest $M \to G$ path.

**Proof (cut-and-paste):** if a shorter $S \to M$ path existed, splicing it in front of the $M \to G$ suffix would yield a shorter $S \to G$ path, contradicting optimality of the original.

This property is the reason **dynamic programming** (Bellman-Ford, Floyd-Warshall) and **greedy** (Dijkstra) approaches both work: the answer for a long path decomposes cleanly into answers for shorter sub-paths.

### 1.3 Relaxation

**Relaxation** is the operation that updates the current best-known distance estimate when a shorter path is discovered.

![Figure 2. Distance estimates before and after relaxation](../../images/Week12_ch24_p07.png)

*Figure 2. Distance estimates before and after relaxation*

```text
RELAX(u, v, w):
    if d[u] + w(u, v) < d[v] then
        d[v]    ← d[u] + w(u, v)
        prev[v] ← u
```

- **Before RELAX:** $d[v]$ is some upper bound on the true shortest distance.
- **After RELAX:** either the bound stayed the same, or it tightened to use the path $\dots \to u \to v$.

```text
   (a) Successful relaxation                  (b) No change
     d[u]=5  --(2)-->  d[v]=9                   d[u]=5  --(2)-->  d[v]=6
     becomes d[v] = 5+2 = 7                     5+2 = 7 ≥ 6  →  no update
```

*Figure 3. Relaxation that updates the distance and relaxation with no change*

> **Key Point:** **Every shortest-path algorithm covered here is just a different schedule of RELAX calls.** Dijkstra relaxes outgoing edges of the just-finalized vertex; Bellman-Ford relaxes *every* edge $|V|-1$ times; Floyd-Warshall relaxes through one allowed intermediate vertex per outer iteration. The invariant maintained is always the same: $d[v]$ is an upper bound that is never below the true distance.

---

<br>

## 2. Single-Source Shortest Paths

### 2.1 Dijkstra: Idea

- **Greedy** strategy: at each step, pick the unvisited vertex $u$ with the smallest current estimate $d[u]$ and *finalize* it.
- Maintain a set $S$ of vertices whose shortest distances are already known to be optimal.
- **Requirement:** all edge weights $w(u, v) \geq 0$.
  - Reason: extending a path can **never decrease** its total weight, so once we extract the minimum-$d$ vertex from $V \setminus S$, no future relaxation can lower $d[u]$.

> **Key Point:** When Dijkstra extracts $u$ from the priority queue, the invariant that $d[u]$ equals the true shortest distance from $r$ to $u$ is provably true, exactly because every path that has not yet been finalized must leave $S$ through a vertex with $d$-value $\geq d[u]$, and adding non-negative edges can never make the value smaller.

### 2.2 Dijkstra: Pseudocode and Complexity

```text
Dijkstra(G, r):
    S ← ∅
    for each u in V:
        d[u] ← ∞
    d[r] ← 0

    while S ≠ V:                          // n iterations
        u ← extractMin(V - S, d)          // vertex with smallest d
        S ← S ∪ {u}
        for each v in Adj(u):             // relax neighbors
            if v in (V - S) and d[u] + w(u, v) < d[v]:
                d[v]    ← d[u] + w(u, v)
                prev[v] ← u
```

**Running time with a binary min-heap (priority queue):**
- Each vertex is extracted exactly once, so $|V|$ extractions, each $O(\log V)$, give $O(V \log V)$.
- Each edge triggers at most one **decrease-key**, the heap operation that lowers a vertex's stored key (its $d$-value) after a successful relaxation and re-sifts it toward the root to restore the heap order, so $|E|$ updates, each $O(\log V)$, give $O(E \log V)$.
- **Total: $O((V + E) \log V) = O(E \log V)$** for connected graphs where $E \geq V - 1$.

> **[Data Structures]** A priority queue is an abstract data type that supports extracting the element with the smallest key and changing a key, and a binary min-heap implements it as a complete binary tree so that both operations take $O(\log n)$ time, the height of the tree. Dijkstra puts the vertices in the heap and calls extractMin $|V|$ times and decrease-key at most $|E|$ times, so the cost of these two heap operations is the $\log V$ factor in its running time.

(With a Fibonacci heap the bound improves to $O(E + V \log V)$, which is better for dense graphs in theory.)

### 2.3 Dijkstra: Step-by-Step Example

The **graph** has 5 vertices $s, t, x, y, z$, and all weights are non-negative. Edge list:

```text
  s --10--> t        t --1--> x        y --9--> x        z --7--> s
  s -- 5--> y        t --2--> y        y --2--> z        z --6--> x
                     y --3--> t        x --4--> z
```

i.e. $s \to t\,(10)$, $s \to y\,(5)$, $t \to x\,(1)$, $t \to y\,(2)$, $y \to t\,(3)$, $y \to x\,(9)$, $y \to z\,(2)$, $z \to s\,(7)$, $z \to x\,(6)$, $x \to z\,(4)$ (Fig. 24.6 of the textbook).

Source $s$. In each row, the **bolded** $d$-value identifies the vertex to be extracted from the priority queue in the next iteration, that is, the unvisited vertex with the smallest $d$-value.

| Step | Extracted | $d[s]$ | $d[t]$ | $d[x]$ | $d[y]$ | $d[z]$ |
|------|-----------|--------|--------|--------|--------|--------|
| Init | -         | **0**  | ∞      | ∞      | ∞      | ∞      |
| (b)  | $s$       | 0      | 10     | ∞      | **5**  | ∞      |
| (c)  | $y$       | 0      | 8      | 14     | 5      | **7**  |
| (d)  | $z$       | 0      | **8**  | 13     | 5      | 7      |
| (e)  | $t$       | 0      | 8      | **9**  | 5      | 7      |
| (f)  | $x$       | 0      | 8      | 9      | 5      | 7      |

*Table 2. Distance estimates per iteration of Dijkstra's algorithm from source $s$*

The `prev[]` array records each vertex's predecessor on the shortest-path tree, allowing the actual path to be reconstructed by walking backwards from any destination.

![Figure 4. Step-by-step execution of Dijkstra's algorithm](../../images/Week12_ch24_p17.png)

*Figure 4. Step-by-step execution of Dijkstra's algorithm*

### 2.4 Why Dijkstra Fails with Negative Weights

```text
    A ───(1)───> B ──(-2)──> C
    │                        ^
    └────────(0)─────────────┘
```

*Figure 5. Counterexample graph with a negative edge on which Dijkstra's algorithm fails*

The edges are $A \to B$ (weight 1), $A \to C$ (weight 0), and $B \to C$ (weight $-2$), and the source is $A$.

- Init: $d[A] = 0$, $d[B] = \infty$, $d[C] = \infty$.
- Extract $A$ ($d = 0$): relax $A \to B$ → $d[B] = 1$; relax $A \to C$ → $d[C] = 0$.
- Extract $C$ ($d = 0$) and **finalize** it: $C$ has no outgoing edges.
- Extract $B$ ($d = 1$): relaxing $B \to C$ gives $1 + (-2) = -1 < 0$, but $C$ is already finalized.
- Dijkstra outputs $d[C] = 0$, whereas the true shortest path is $A \to B \to C$ with cost $1 + (-2) = \mathbf{-1}$.

The greedy invariant that extracting the minimum makes the distance final depends on the assumption that **adding more edges can never decrease cost**. A negative weight violates this: a *longer* path (more edges) can end up *cheaper*. This is exactly why Bellman-Ford is needed when weights may be negative.

### 2.5 Bellman-Ford: Pseudocode

```text
BellmanFord(G, r):
    for each u in V:
        d[u] ← ∞
    d[r] ← 0

    for i ← 1 to |V| - 1:                 // Phase 1: relax |V|-1 times
        for each edge (u, v) in E:
            if d[u] + w(u, v) < d[v]:
                d[v]    ← d[u] + w(u, v)
                prev[v] ← u

    for each edge (u, v) in E:             // Phase 2: detect negative cycle
        if d[u] + w(u, v) < d[v]:
            output "No solution (negative cycle)"
```

**Key ideas:**
- **Negative weights are allowed**: edges can decrease distance estimates.
- If no negative cycle is reachable from the source, every shortest path is found after $|V| - 1$ full passes. *Why $|V| - 1$?* Any simple shortest path uses at most $|V| - 1$ edges; one pass through all edges propagates correctness one edge further along every path, so $|V| - 1$ passes suffice.
- **Phase 2** sweeps every edge one more time. If anything is still tightening, some path can keep getting shorter, which can only happen if a **negative-weight cycle is reachable** from the source.

**Running time: $\Theta(|V| \cdot |E|)$**, from $|V| - 1$ outer iterations × $|E|$ edge relaxations.

### 2.6 Bellman-Ford: Step-by-Step Example

The **graph** has 5 vertices $s, t, x, y, z$ and some negative edges, and the source is $s$. Edge list:

```text
  s --6--> t        t -- 5--> x        x --(-2)--> t        z --7--> x
  s --7--> y        t -- 8--> y        y --(-3)--> x        z --2--> s
                    t --(-4)-> z        y -- 9 --> z
```

i.e. $s \to t\,(6)$, $s \to y\,(7)$, $t \to x\,(5)$, $t \to y\,(8)$, $t \to z\,(-4)$, $x \to t\,(-2)$, $y \to x\,(-3)$, $y \to z\,(9)$, $z \to x\,(7)$, $z \to s\,(2)$ (Fig. 24.4 of the textbook).

The trace below relaxes the edges in one fixed order reused every pass, $(x,t), (t,x), (t,y), (t,z), (y,x), (y,z), (s,t), (s,y), (z,x), (z,s)$:

| Pass    | $d[s]$ | $d[t]$ | $d[x]$ | $d[y]$ | $d[z]$ |
|---------|--------|--------|--------|--------|--------|
| Init    | **0**  | ∞      | ∞      | ∞      | ∞      |
| (b) i=1 | 0      | 6      | ∞      | 7      | ∞      |
| (c) i=2 | 0      | 6      | 4      | 7      | 2      |
| (d) i=3 | 0      | 2      | 4      | 7      | -2     |
| (e) i=4 | 0      | 2      | 4      | 7      | -2     |

*Table 3. Distance estimates per pass of the Bellman-Ford algorithm from source $s$*

After Phase 2 no value tightens further, so there is **no negative cycle**. The recorded `prev[]` defines the shortest-path tree. Final distances are independent of the relaxation order; only the per-pass progression depends on it.

![Figure 6. Pass-by-pass progress of the Bellman-Ford algorithm](../../images/Week12_ch24_p10.png)

*Figure 6. Pass-by-pass progress of the Bellman-Ford algorithm*

### 2.7 Bellman-Ford as Dynamic Programming

Define
$$d_t^{\,k} = \text{shortest distance from source } r \text{ to } t \text{ using at most } k \text{ edges}.$$

**Base case:**
- $d_r^{\,0} = 0$
- $d_t^{\,0} = \infty$ for all $t \neq r$

**Recurrence:** to reach $v$ in at most $k$ edges, either use $\leq k-1$ edges directly, or take a $\leq k-1$-edge path to some predecessor $u$ and then traverse $(u, v)$:

$$d_v^{\,k} = \min\Bigl\{\, d_v^{\,k-1},\; \min_{(u, v) \in E} \bigl\{\, d_u^{\,k-1} + w(u, v) \,\bigr\} \Bigr\}$$

```text
       u1 --w1--> v     d_v^k = min { d_v^{k-1},
       u2 --w2--> v                    d_{u1}^{k-1} + w1,
       u3 --w3--> v                    d_{u2}^{k-1} + w2,
       u4 --w4--> v                    d_{u3}^{k-1} + w3,
                                       d_{u4}^{k-1} + w4 }
```

*Figure 7. Edges entering vertex $v$ and the Bellman-Ford recurrence*

**Goal:** $d_t^{\,|V|-1}$ for all vertices $t$ (since a simple shortest path uses at most $|V| - 1$ edges).

Bellman-Ford's outer loop is exactly the iteration over $k$; each inner pass over $E$ is the bulk computation of the recurrence for one value of $k$. The detection of a negative cycle corresponds to the recurrence still decreasing past $k = |V| - 1$, which is impossible without a cycle that contributes negative weight every lap.

### 2.8 Dijkstra vs Bellman-Ford

| Property                  | Dijkstra            | Bellman-Ford           |
|---------------------------|---------------------|------------------------|
| **Negative weights**      | Not allowed         | Allowed                |
| **Negative-cycle detect** | No                  | Yes                    |
| **Strategy**              | Greedy              | Dynamic Programming    |
| **Time complexity**       | $O(E \log V)$       | $\Theta(V \cdot E)$    |
| **Data structure**        | Priority queue (min-heap) | Simple edge list |
| **When to use**           | Non-negative weights | Negative weights possible / cycle detection needed |

*Table 4. Comparison of Dijkstra's and Bellman-Ford algorithms*

---

<br>

## 3. All-Pairs Shortest Paths: Floyd-Warshall

### 3.1 Motivation

**Problem:** compute the shortest path between **every** ordered pair of vertices.

- **Dijkstra from each vertex:** $O(V \cdot E \log V)$, which is fine for sparse non-negative graphs.
- **Floyd-Warshall:** $\Theta(V^3)$; it is simpler, handles negative weights (provided there is no negative cycle), and uses an adjacency matrix.

**Applications:** road atlases (precompute all city-to-city distances), navigation, network routing, transitive-closure computations.

|                    | Dijkstra (single-source) | Floyd-Warshall (all-pairs) |
|--------------------|--------------------------|----------------------------|
| **Computes**       | one source → all vertices | every vertex → every vertex |
| **Input**          | adjacency list           | adjacency matrix           |
| **Negative edges** | not allowed              | allowed (no neg. cycle)    |

*Table 5. Comparison of Dijkstra's and Floyd-Warshall algorithms*

### 3.2 Input Matrix

Floyd-Warshall takes an **adjacency matrix** $W$ where:
- $W[i][j] = w(i, j)$ if the edge exists,
- $W[i][j] = \infty$ if no direct edge,
- $W[i][i] = 0$.

**Example** (from the textbook):

|       | 1   | 2   | 3   | 4   | 5   |
|-------|-----|-----|-----|-----|-----|
| **1** | 0   | 3   | 8   | ∞   | -4  |
| **2** | ∞   | 0   | ∞   | 1   | 7   |
| **3** | ∞   | 4   | 0   | ∞   | ∞   |
| **4** | 2   | ∞   | -5  | 0   | ∞   |
| **5** | ∞   | ∞   | ∞   | 6   | 0   |

*Table 6. Input adjacency matrix $W$ for the Floyd-Warshall example*

### 3.3 Node-Based Recurrence

Define
$$d_{ij}^{\,(k)} = \text{shortest distance from } i \text{ to } j \text{ using only intermediate vertices in } \{v_1, v_2, \dots, v_k\}.$$

```text
        i ────[intermediates from {1,…,k-1}]────> j        (option A: don't use k)
                          OR
        i ────> k ────> j                                  (option B: use k once)
         (d_{ik}^{(k-1)})  (d_{kj}^{(k-1)})
```

*Figure 8. Path that avoids vertex $k$ and path that uses $k$ once*

**Recurrence:**

$$
d_{ij}^{\,(0)} = w_{ij}, \qquad
d_{ij}^{\,(k)} = \min\bigl\{\, d_{ij}^{\,(k-1)},\; d_{ik}^{\,(k-1)} + d_{kj}^{\,(k-1)} \,\bigr\} \quad (k \geq 1)
$$

Two choices at each step:
1. **Do not use vertex $k$** as an intermediate: keep $d_{ij}^{\,(k-1)}$.
2. **Use vertex $k$** as an intermediate exactly once: $d_{ik}^{\,(k-1)} + d_{kj}^{\,(k-1)}$.

Take the minimum.

> **Note:** **Why at most once.** When there are no negative cycles, loops can only add cost or leave it unchanged, so some shortest path is always a simple path in which no vertex appears more than once. So the moment we consider vertex $k$, it is enough to either include it once or exclude it entirely.

### 3.4 Pseudocode and Complexity

```text
FloydWarshall(G):
    // Initialize D^(0)
    for i ← 1 to n:
        for j ← 1 to n:
            d_ij^(0) ← w_ij

    // Main computation
    for k ← 1 to n:                       // intermediate set {1,…,k}
        for i ← 1 to n:                   // source vertex
            for j ← 1 to n:               // destination vertex
                d_ij^(k) ← min { d_ij^(k-1), d_ik^(k-1) + d_kj^(k-1) }
```

**Time: $\Theta(V^3)$.**
- Total subproblems: $\Theta(V^3)$ (three nested loops over $n$).
- Each subproblem: $\Theta(1)$ work (one min, one addition).

In practice the two matrices $D^{(k-1)}$ and $D^{(k)}$ can be collapsed into a single *in-place* matrix because the read pattern guarantees correctness (see the note in Section 3.5).

### 3.5 Worked Example: k = 0, 1, 2, 3

**$D^{(0)} = W$** (direct edges only, no intermediate vertices):

|       | 1   | 2   | 3   | 4   | 5   |
|-------|-----|-----|-----|-----|-----|
| **1** | 0   | 3   | 8   | ∞   | -4  |
| **2** | ∞   | 0   | ∞   | 1   | 7   |
| **3** | ∞   | 4   | 0   | ∞   | ∞   |
| **4** | 2   | ∞   | -5  | 0   | ∞   |
| **5** | ∞   | ∞   | ∞   | 6   | 0   |

*Table 7. Distance matrix $D^{(0)}$ with no intermediate vertices*

**$D^{(1)}$: allow vertex 1 as an intermediate.** $d_{ij}^{(1)} = \min\{d_{ij}^{(0)},\, d_{i1}^{(0)} + d_{1j}^{(0)}\}$.

- $d_{42}^{(1)} = \min\{d_{42}^{(0)},\, d_{41}^{(0)} + d_{12}^{(0)}\} = \min\{\infty,\, 2 + 3\} = \mathbf{5}$
- $d_{45}^{(1)} = \min\{d_{45}^{(0)},\, d_{41}^{(0)} + d_{15}^{(0)}\} = \min\{\infty,\, 2 + (-4)\} = \mathbf{-2}$

|       | 1   | 2     | 3   | 4   | 5      |
|-------|-----|-------|-----|-----|--------|
| **1** | 0   | 3     | 8   | ∞   | -4     |
| **2** | ∞   | 0     | ∞   | 1   | 7      |
| **3** | ∞   | 4     | 0   | ∞   | ∞      |
| **4** | 2   | **5** | -5  | 0   | **-2** |
| **5** | ∞   | ∞     | ∞   | 6   | 0      |

*Table 8. Distance matrix $D^{(1)}$ with vertex 1 allowed as an intermediate*

**$D^{(2)}$: allow {1, 2} as intermediates.** $d_{ij}^{(2)} = \min\{d_{ij}^{(1)},\, d_{i2}^{(1)} + d_{2j}^{(1)}\}$.

- $d_{14}^{(2)} = \min\{\infty,\, 3 + 1\} = \mathbf{4}$
- $d_{34}^{(2)} = \min\{\infty,\, 4 + 1\} = \mathbf{5}$

|       | 1   | 2   | 3   | 4     | 5      |
|-------|-----|-----|-----|-------|--------|
| **1** | 0   | 3   | 8   | **4** | -4     |
| **2** | ∞   | 0   | ∞   | 1     | 7      |
| **3** | ∞   | 4   | 0   | **5** | **11** |
| **4** | 2   | 5   | -5  | 0     | -2     |
| **5** | ∞   | ∞   | ∞   | 6     | 0      |

*Table 9. Distance matrix $D^{(2)}$ with {1, 2} allowed as intermediates*

**$D^{(3)}$: allow {1, 2, 3} as intermediates.** $d_{ij}^{(3)} = \min\{d_{ij}^{(2)},\, d_{i3}^{(2)} + d_{3j}^{(2)}\}$.

- $d_{42}^{(3)} = \min\{5,\, (-5) + 4\} = \mathbf{-1}$

|       | 1   | 2      | 3   | 4   | 5   |
|-------|-----|--------|-----|-----|-----|
| **1** | 0   | 3      | 8   | 4   | -4  |
| **2** | ∞   | 0      | ∞   | 1   | 7   |
| **3** | ∞   | 4      | 0   | 5   | 11  |
| **4** | 2   | **-1** | -5  | 0   | -2  |
| **5** | ∞   | ∞      | ∞   | 6   | 0   |

*Table 10. Distance matrix $D^{(3)}$ with {1, 2, 3} allowed as intermediates*

> **Note:** **In-place computation is safe.** As noted in Section 3.4, at iteration $k$ the only entries read are $d_{ik}$ and $d_{kj}$, those in row $k$ and column $k$. But $d_{kk}^{(k)} = d_{kk}^{(k-1)} = 0$ (no negative cycle), so $d_{ik}^{(k)} = d_{ik}^{(k-1)}$ and $d_{kj}^{(k)} = d_{kj}^{(k-1)}$: row $k$ and column $k$ are *unchanged* by the $k$-th pass. Overwriting $d_{ij}$ in place therefore reads the same values whether or not it has already been updated in the same pass, so a single matrix suffices. Re-running the $D^{(0)} \to D^{(5)}$ example with one in-place array reproduces the matrix in Section 3.6 exactly.

### 3.6 Final Distance Matrix and Path Reconstruction

After computing $D^{(4)}$ and $D^{(5)}$, the **all-pairs shortest distances** are:

|       | 1   | 2   | 3   | 4   | 5   |
|-------|-----|-----|-----|-----|-----|
| **1** | 0   | 1   | -3  | 2   | -4  |
| **2** | 3   | 0   | -4  | 1   | -1  |
| **3** | 7   | 4   | 0   | 5   | 3   |
| **4** | 2   | -1  | -5  | 0   | -2  |
| **5** | 8   | 5   | 1   | 6   | 0   |

*Table 11. Final distance matrix $D^{(5)}$ with all-pairs shortest distances*

**Path reconstruction example:** reconstruct the shortest path $1 \to 2$, whose cost is 1.

Trace the predecessor matrix backwards:
- The path is $1 \to 5 \to 4 \to 3 \to 2$, with total weight $(-4) + 6 + (-5) + 4 = 1$. ✓

### 3.7 Predecessor Matrix

A **predecessor matrix** $\Pi^{(k)}$ is maintained alongside $D^{(k)}$:

- $\pi_{ij}^{(k)}$ is the predecessor of $j$ on the shortest path from $i$ to $j$ using intermediates from $\{1, \dots, k\}$.

**Base case ($k = 0$):**

```text
π_{ij}^(0) = i      if i ≠ j and w_{ij} < ∞
π_{ij}^(0) = NIL    if i = j or w_{ij} = ∞
```

**Recurrence ($k \geq 1$):**

```text
π_{ij}^(k) = π_{ij}^(k-1)        if d_{ij}^(k-1) ≤ d_{ik}^(k-1) + d_{kj}^(k-1)
π_{ij}^(k) = π_{kj}^(k-1)        otherwise   (path was improved via k)
```

To reconstruct the path from $i$ to $j$, start at $j$, follow predecessors backwards until you reach $i$, then reverse.

### 3.8 Edge-Based Formulation

An alternative formulation indexes by **number of edges allowed** instead of vertex set:

Define $\ell_{ij}^{\,(m)}$ as the shortest distance from $i$ to $j$ using **at most $m$ edges**.

**Recurrence:**

$$
\ell_{ij}^{\,(m)} = \min_{1 \leq k \leq n} \bigl\{\, \ell_{ik}^{\,(m-1)} + w_{kj} \,\bigr\}
$$

This is structurally identical to **matrix multiplication**, with the operations changed as follows:
- addition replaces multiplication: $\ell_{ik} + w_{kj}$
- minimum replaces addition.

We write this **min-plus (tropical) product** as $\boxtimes$: for matrices $A, B$,
$$(A \boxtimes B)_{ij} = \min_{1 \leq k \leq n} \bigl\{\, A_{ik} + B_{kj} \,\bigr\}.$$
It is exactly ordinary matrix multiplication with $(+, \times)$ replaced by $(\min, +)$. The recurrence above is then simply $L^{(m)} = L^{(m-1)} \boxtimes W$.

**Computation:** $L^{(1)} = W$, $L^{(2)} = L^{(1)} \boxtimes W$, $\dots$, $L^{(n-1)}$ is the final answer (any simple shortest path uses at most $n - 1$ edges).

**Time:** $\Theta(n^4)$ naïvely, or $\Theta(n^3 \log n)$ with **repeated squaring** (since the operation is associative, $L^{(2k)} = L^{(k)} \boxtimes L^{(k)}$).

> **Note:** **Why have two formulations.** The node-based formulation gives the clean $\Theta(V^3)$ bound of Floyd-Warshall directly. The edge-based min-plus matrix multiplication view exposes the structural link to fast matrix multiplication and is the entry point for theoretically faster algorithms. Strassen-like techniques cannot be applied directly on the tropical semiring, which has no subtraction, so they are used by embedding the min-plus product into an ordinary matrix product when the weights are small integers.

---

<br>

## 4. DAG Shortest Paths

### 4.1 Algorithm

For **directed acyclic graphs** (DAGs), even with negative edge weights, shortest paths can be computed in **linear time**.

```text
DAG-ShortestPath(G, r):
    for each u in V:
        d[u] ← ∞
    d[r] ← 0

    Topologically sort the vertices of G

    for each u in V (in topological order):
        for each v in Adj(u):
            if d[u] + w(u, v) < d[v]:
                d[v]    ← d[u] + w(u, v)
                prev[v] ← u
```

**Time: $\Theta(V + E)$.**
- Topological sort: $\Theta(V + E)$ (Week 11).
- Single pass over edges: $\Theta(V + E)$. Each edge is relaxed exactly once, because for every edge $(u, v)$, $u$ is processed before $v$ in topological order.

**Why it works:** in a DAG, by the time we process $u$ in topological order, every path ending at $u$ has been fully explored, so $d[u]$ is already correct, and one outgoing relaxation per edge is enough. On general graphs, cycles break this order, which is why the same trick fails there.

This is **much faster than Dijkstra ($O(E \log V)$) and Bellman-Ford ($\Theta(VE)$)** when the graph is a DAG, e.g., for PERT charts, dependency networks, and one-shot decision diagrams.

### 4.2 Worked Example

The **DAG** has 6 vertices, and every edge points forward in the topological order $v_0, v_1, v_4, v_2, v_3, v_5$. Edge list:

```text
  v0 --(-5)--> v1        v1 --2--> v2        v2 --4--> v5
  v0 --(-4)--> v4        v1 --5--> v3        v3 --(-1)--> v5
                         v4 --6--> v2
```

i.e. $v_0 \to v_1\,(-5)$, $v_0 \to v_4\,(-4)$, $v_1 \to v_2\,(2)$, $v_1 \to v_3\,(5)$, $v_2 \to v_5\,(4)$, $v_3 \to v_5\,(-1)$, $v_4 \to v_2\,(6)$.

Source $= v_0$, processed in topological order $v_0, v_1, v_4, v_2, v_3, v_5$:

| Step | Process | $d[v_0]$ | $d[v_1]$ | $d[v_2]$ | $d[v_3]$ | $d[v_4]$ | $d[v_5]$ |
|------|---------|----------|----------|----------|----------|----------|----------|
| Init | -       | **0**    | ∞        | ∞        | ∞        | ∞        | ∞        |
| (a)  | $v_0$   | 0        | **-5**   | ∞        | ∞        | **-4**   | ∞        |
| (b)  | $v_1$   | 0        | -5       | **-3**   | **0**    | -4       | ∞        |
| (c)  | $v_4$   | 0        | -5       | -3       | 0        | -4       | ∞        |
| (d)  | $v_2$   | 0        | -5       | -3       | 0        | -4       | **1**    |
| (e)  | $v_3$   | 0        | -5       | -3       | 0        | -4       | **-1**   |
| (f)  | $v_5$   | 0        | -5       | -3       | 0        | -4       | -1       |

*Table 12. Distance estimates per step of DAG shortest paths in topological order*

Each vertex is processed exactly once; every outgoing edge is relaxed exactly once. The bolded $d$-values mark each relaxation that improved a distance. At step (c), relaxing $v_4 \to v_2$ gives $-4 + 6 = 2 > -3$, so $d[v_2]$ does not change. Note that $d[v_5]$ is first set to $1$ via $v_2 \to v_5$ at step (d), then improved to $-1$ via $v_3 \to v_5$ at step (e); the topological order guarantees both contributors ($v_2, v_3$) are processed before $v_5$.

The next figure shows a different graph: the constraint graph the textbook uses to solve a system of difference constraints as a shortest-path problem. It has cycles, so it is not a DAG, and the value inside each vertex is its shortest distance from $v_0$.

![Figure 9. Constraint graph of a system of difference constraints with shortest distances from the source](../../images/Week12_ch24_p25.png)

*Figure 9. Constraint graph of a system of difference constraints with shortest distances from the source*

---

<br>

## 5. Shortest-Path Algorithms: Big Picture

| Algorithm           | Problem              | Neg. weights | Time                 | Technique         |
|---------------------|----------------------|--------------|----------------------|-------------------|
| **Dijkstra**        | single-source        | No           | $O(E \log V)$        | Greedy            |
| **Bellman-Ford**    | single-source        | Yes          | $\Theta(V \cdot E)$  | Dynamic Programming |
| **DAG-ShortestPath**| single-source (DAG)  | Yes          | $\Theta(V + E)$      | Topological order |
| **Floyd-Warshall**  | all-pairs            | Yes          | $\Theta(V^3)$        | Dynamic Programming |

*Table 13. Problem type, negative-weight support, time, and technique of shortest-path algorithms*

**Decision flow:**
1. **Is the graph a DAG?** Use DAG-ShortestPath (linear time, accepts negative weights).
2. **Are all weights non-negative?** Use Dijkstra (efficient single-source).
3. **Can weights be negative?** Use Bellman-Ford (also detects negative cycles).
4. **Do you need all pairs?** Use Floyd-Warshall if the graph is dense or weights may be negative; otherwise run Dijkstra $|V|$ times.

---

<br>

## 6. Strongly Connected Components

### 6.1 Definition

- A directed graph is **strongly connected** if for every ordered pair of vertices $(u, v)$ there exists a path $u \to v$ **and** a path $v \to u$.
- A **Strongly Connected Component (SCC)** of a directed graph $G$ is a **maximal** subgraph that is strongly connected; adding any other vertex loses strong connectivity.

```text
Example:
    1 --> 2 --> 3 --> 4
    ^     |     ^     |
    |     v     |     v
    6 <-- 5     8 <-- 7
          |           |
          v           v
          9 --> 10    (dead end)

SCCs: {1, 2, 5, 6}, {3, 4, 7, 8}, {9}, {10}
```

*Figure 10. Directed graph made up of four strongly connected components*

Every directed graph condenses into a DAG whose nodes are its SCCs. This fact is tremendously useful for analyzing call graphs, dependency tangles, and dataflow systems.

### 6.2 Kosaraju's Algorithm: Pseudocode

```text
StronglyConnectedComponents(G):

1. Run DFS on G and compute finish times f[v] for every vertex v.
   (Recall from Week 11: f[v] is the time at which DFS finishes exploring v,
    i.e., when v is colored black after all its descendants are done.)

2. Construct G^R (reverse every edge in G).

3. Run DFS on G^R, but process vertices in DECREASING order of f[v]
   (start from the vertex that finished LAST in step 1).

4. Each DFS tree formed in step 3 is one strongly connected component.
```

**Time: $\Theta(V + E)$.**
- Step 1 (DFS on $G$): $\Theta(V + E)$.
- Step 2 (build reversed graph): $\Theta(V + E)$.
- Step 3 (DFS on $G^R$ in finish-time order): $\Theta(V + E)$.

The algorithm needs only two DFS passes and one edge reversal.

### 6.3 Kosaraju: Worked Example

**Step 1:** DFS on $G$, recording finish times.

```text
Graph G (three cycles joined by ONE-WAY bridges, a clean condensation DAG):

  Component A {1,2,3,4}:   1 --> 2 --> 3 --> 4 --> 1   (a directed 4-cycle)
  Component B {5,6,7,8}:   5 --> 6 --> 7 --> 8 --> 5   (a directed 4-cycle)
  Component C {9,10}:      9 <--> 10                    (a 2-cycle: 9->10, 10->9)

  Bridges (one-directional, NO return path):
       3 --> 5    (A → B)
       7 --> 9    (B → C)
```

*Figure 11. Graph made of three cycles joined by one-way bridges*

These bridges go *only* A → B → C, so no vertex in B or C can return to A, and none in C can return to B. The condensation is the DAG $A \to B \to C$, giving exactly three SCCs.

DFS starting at vertex 1 (visiting neighbors in ascending order) produces the finish-time order:
$$f[4]=1,\; f[8]=2,\; f[10]=3,\; f[9]=4,\; f[7]=5,\; f[6]=6,\; f[5]=7,\; f[3]=8,\; f[2]=9,\; f[1]=10.$$

The DFS path is $1 \to 2 \to 3 \to 4$ ($4 \to 1$ is a back edge, so 4 finishes first), then $3 \to 5 \to 6 \to 7 \to 8$ (back edge $8 \to 5$), then $7 \to 9 \to 10$ (back edge $10 \to 9$). Vertices in component A finish *last* because the bridges keep the recursion descending into B and C before unwinding back up through A.

**Step 2:** reverse all edges to obtain $G^R$ (the bridges become $5 \to 3$ and $9 \to 7$).

**Step 3:** DFS on $G^R$ in **decreasing** finish-time order, i.e., processing roots $1, 2, 3, 5, 6, 7, 9, 10, 8, 4$.

- Start DFS from vertex **1** ($f=10$) in $G^R$: it reaches $\{1, 4, 3, 2\}$, giving **SCC 1**. In $G^R$, $1 \to 4 \to 3 \to 2 \to 1$, and the reversed bridge $5 \to 3$ points *into* this set, not out, so DFS cannot escape.
- The next unvisited root by decreasing $f$ is **5** ($f=7$): it reaches $\{5, 8, 7, 6\}$, giving **SCC 2**. The reversed bridge $9 \to 7$ points into this set.
- The next unvisited root is **9** ($f=4$): it reaches $\{9, 10\}$, giving **SCC 3**.

**Result: 3 SCCs** = $\{1, 2, 3, 4\}$, $\{5, 6, 7, 8\}$, $\{9, 10\}$.

### 6.4 Why Kosaraju Works

**Key invariant:** if $u$ and $v$ are in the same SCC, then
- a path $u \to v$ in $G$ implies a path $v \to u$ in $G^R$, and
- a path $v \to u$ in $G$ implies a path $u \to v$ in $G^R$.

So $u$ and $v$ are in the **same SCC of $G^R$** as well: reversing edges does not break SCCs.

**Why finish-time order is the right schedule:**
- The vertex with the **largest** finish time in DFS($G$) belongs to a *source SCC* of the SCC-DAG, an SCC with no incoming edges from any other SCC.
- Running DFS from that vertex in $G^R$ reaches *only* the source SCC, because every edge that would leave it in $G$ now points *into* it in $G^R$ (and DFS from this vertex cannot get back out).
- After peeling off that SCC, the next-largest unprocessed finish time identifies the next source SCC of the *remaining* SCC-DAG, and so on.

This is the textbook **two-pass DFS** trick, a beautifully economical use of DFS finish times for a globally meaningful task.

NP-completeness and approximation algorithms are covered in Week 13.

---

<br>

## Summary

| Concept | Key Summary |
|---------|-------------|
| Shortest-path foundations | Shortest paths have optimal substructure, and relaxation is the universal core operation of every shortest-path algorithm. |
| Dijkstra | It is a greedy algorithm for non-negative weights only and runs in $O(E \log V)$ with a binary heap. |
| Why Dijkstra fails on negative weights | With a negative edge, a longer path can be cheaper, so the greedy rule of finalizing on extraction breaks. |
| Bellman-Ford | It is a DP that allows negative weights, runs in $\Theta(VE)$, and detects negative cycles in Phase 2. |
| Bellman-Ford as DP | Its recurrence is $d_v^k = \min\{d_v^{k-1}, \min_{(u,v)\in E} (d_u^{k-1} + w(u,v))\}$, and the outer loop is over $k$. |
| Floyd-Warshall (node-based) | It computes $d_{ij}^{(k)} = \min\{d_{ij}^{(k-1)},\, d_{ik}^{(k-1)} + d_{kj}^{(k-1)}\}$ in $\Theta(V^3)$. |
| Predecessor matrix | It is built alongside $D^{(k)}$ for path reconstruction. |
| Edge-based formulation | $\ell^{(m)}_{ij} = \min_k (\ell^{(m-1)}_{ik} + w_{kj})$ is min-plus matrix multiplication and takes $\Theta(n^3 \log n)$ with repeated squaring. |
| DAG shortest paths | A topological order plus one relaxation pass gives $\Theta(V + E)$. |
| Strongly connected components | Kosaraju's algorithm runs DFS on $G$, reverses the edges, and runs DFS on $G^R$ in decreasing $f[v]$, all in $\Theta(V + E)$. |
| Universality of relaxation | Relaxation is the universal basic operation: all four shortest-path algorithms are different schedules of RELAX calls. |
| When greedy works | Greedy works only with non-negative weights; otherwise switch to DP (Bellman-Ford, Floyd-Warshall) or exploit special structure (DAG). |
| Checking for a DAG | DAG-ShortestPath is the cheapest option when the graph has no cycles, so a topological-sort check first is almost always worthwhile. |
| Two formulations of Floyd-Warshall | The node-based and edge-based (matrix-multiplication) formulations give the same answer; the node-based view gives the clean $\Theta(V^3)$ bound, and the edge-based view connects to a beautiful algebraic structure. |
| Role of SCCs | SCCs reduce a directed graph to a DAG, so once the SCCs are known, many questions about reachability, circularity, or consistency become trivial DAG queries. |
| Two lenses on directed graphs | Shortest paths and SCCs are the two lenses through which a directed graph becomes structured enough to reason about. |

---

<br>

## Self-Check Questions

1. **Well-definedness:** Why are shortest paths undefined in the presence of a negative-weight cycle reachable from the source? Give a 3-vertex example.

   <details>
   <summary>Answer</summary>

   A negative-weight cycle can be traversed any number of times. Each lap *decreases* the total cost by the (negative) sum of cycle weights, so the infimum of path costs is $-\infty$ and no actual path attains it. **Example:** consider vertices $A, B, C$ with the three edges $A \to B$ (1), $B \to C$ (-3), $C \to B$ (1). The cycle $B \to C \to B$ has weight $-2$. From $A$, the path $A, B, C, B, C, B, \dots$ has unbounded-below cost.

   </details>

2. **Optimal substructure proof:** Prove rigorously that any subpath of a shortest path is itself a shortest path.

   <details>
   <summary>Answer</summary>

   Let $P = v_0 \to v_1 \to \dots \to v_k$ be a shortest $v_0 \to v_k$ path of cost $w(P)$. Pick any sub-segment $P_{ij} = v_i \to \dots \to v_j$. Suppose for contradiction there is a strictly shorter path $Q$ from $v_i$ to $v_j$ with $w(Q) < w(P_{ij})$. Then $P' = v_0 \to \dots \to v_i \overset{Q}{\to} v_j \to \dots \to v_k$ has cost $w(P) - w(P_{ij}) + w(Q) < w(P)$, contradicting optimality of $P$. So $w(Q) \geq w(P_{ij})$, i.e., $P_{ij}$ is itself shortest. This is the standard **cut-and-paste argument**.

   </details>

3. **Dijkstra trace:** Run Dijkstra on the graph from Section 2.3 starting at $t$ instead of $s$. Report the final $d$-values and the order of extraction.

   <details>
   <summary>Answer</summary>

   The edge set is the same as in Section 2.3: $s \to t$ (10), $s \to y$ (5), $t \to x$ (1), $t \to y$ (2), $y \to t$ (3), $y \to x$ (9), $y \to z$ (2), $z \to s$ (7), $z \to x$ (6), $x \to z$ (4). From $t$: init $d[t]=0$, others $\infty$. Extract $t$ → relax $x:1$, $y:2$. Extract $x$ ($d=1$) → relax $z: 1+4=5$. Extract $y$ ($d=2$) → relax $z: \min(5, 2+2)=4$, $x: \min(1, 2+9)=1$. Extract $z$ ($d=4$) → relax $s: 4+7=11$, $x: \min(1, 4+6)=1$. Extract $s$ ($d=11$) → check $y: \min(2, 11+5)=2$. Final: $d[t]=0, d[x]=1, d[y]=2, d[z]=4, d[s]=11$. Order: $t, x, y, z, s$.

   </details>

4. **Failure on negatives:** Construct a 4-vertex graph with exactly one negative edge on which Dijkstra produces a wrong answer. Show the exact step where the invariant breaks.

   <details>
   <summary>Answer</summary>

   Vertices $\{A, B, C, D\}$, edges $A \to B$ (2), $A \to C$ (4), $B \to D$ (1), $C \to D$ ($-2$). Source $A$. Init $d[A]=0$; extract $A$ → $d[B]=2, d[C]=4$. Extract $B$ ($d=2$) → $d[D] = 3$. Extract $D$ ($d=3$, **finalized**) → no outgoing edges. Extract $C$ ($d=4$) → relax $C \to D$: $4 + (-2) = 2 < 3$, but $D$ is already finalized. Dijkstra reports $d[D] = 3$, while the true shortest path is $A \to C \to D$ with cost $2$. **The invariant breaks** at the step that extracts $D$: the greedy claim that no future relaxation can lower $d[D]$ requires that all unexplored paths to $D$ cost at least $d[D]$. With the negative edge $C \to D$, the path $A \to C \to D$ later turns out cheaper.

   </details>

5. **Why $|V|-1$ iterations?** Prove that Bellman-Ford correctly computes all shortest distances after $|V|-1$ iterations, but not always after $|V|-2$.

   <details>
   <summary>Answer</summary>

   Any simple shortest path has at most $|V| - 1$ edges. **Induction claim:** after $i$ iterations, $d[v]$ is at most the cost of any shortest path from $r$ to $v$ that uses **at most $i$ edges**. Base case $i = 0$: $d[r] = 0$ and $d[v] = \infty$ for $v \neq r$, which is correct (no path has 0 edges to anywhere except $r$). Inductive step: in iteration $i$, the relaxation of edge $(u, v)$ for the predecessor $u$ on the $\leq i$-edge shortest path uses $d[u] \leq $ optimal $(\leq i-1)$-edge distance to $u$, and so $d[v]$ updates to a valid $\leq i$-edge bound. After $|V| - 1$ iterations every simple path is fully relaxed. **Not after $|V| - 2$:** consider the linear chain $v_0 \to v_1 \to \dots \to v_{n-1}$ with all weights 1, and an edge ordering that always relaxes the *last* edge first; then exactly $|V| - 1$ iterations are needed.

   </details>

6. **Bellman-Ford as DP:** Re-derive the algorithm from the recurrence $d_v^k = \min\{d_v^{k-1}, \min_{(u,v) \in E} (d_u^{k-1} + w(u, v))\}$. Show why iterating $k$ from 1 to $|V| - 1$ and relaxing every edge implements this.

   <details>
   <summary>Answer</summary>

   Maintain a single $d[\cdot]$ array (size $|V|$). At iteration $k$, before the inner sweep, $d[u]$ holds the optimal distance using at most $k - 1$ edges. The inner sweep over all edges performs the min update for every potential predecessor $u$ of every $v$, exactly evaluating $d_v^k = \min\{d_v^{k-1}, \min_{(u,v)} (d_u^{k-1} + w(u, v))\}$; leaving $d[v]$ unchanged when no update happens is the $d_v^{k-1}$ term. Within one sweep, $d[u]$ may already have been updated to its $k$-th value, which can only *improve* the bound and never violates correctness, because we are taking a min. So after iteration $k$, $d[\cdot]$ is correct for paths of at most $k$ edges. After $|V| - 1$ iterations it is correct overall.

   </details>

7. **Floyd-Warshall trace:** Continue the Section 3.5 example, compute $D^{(4)}$ and $D^{(5)}$, and verify the final matrix in Section 3.6.

   <details>
   <summary>Answer</summary>

   **$D^{(4)}$**: allow $\{1,2,3,4\}$. Use the recurrence with $k = 4$. Notable updates: $d_{13}^{(4)} = \min(8, 4 + (-5)) = -1$. $d_{15}^{(4)} = \min(-4, 4 + (-2)) = -4$ (no change). $d_{25}^{(4)} = \min(7, 1 + (-2)) = -1$. $d_{35}^{(4)} = \min(11, 5 + (-2)) = 3$. $d_{21}^{(4)} = \min(\infty, 1 + 2) = 3$. $d_{23}^{(4)} = \min(\infty, 1 + (-5)) = -4$. $d_{31}^{(4)} = \min(\infty, 5 + 2) = 7$. $d_{33}^{(4)} = \min(0, 5 + (-5)) = 0$ (no change). $d_{51}^{(4)} = \min(\infty, 6 + 2) = 8$. $d_{52}^{(4)} = \min(\infty, 6 + (-1)) = 5$. $d_{53}^{(4)} = \min(\infty, 6 + (-5)) = 1$. **$D^{(5)}$**: allow $\{1,2,3,4,5\}$. Notable updates: $d_{12}^{(5)} = \min(3, -4 + 5) = 1$, $d_{13}^{(5)} = \min(-1, -4 + 1) = -3$, $d_{14}^{(5)} = \min(4, -4 + 6) = 2$. The final matrix matches Section 3.6. ✓

   </details>

8. **Edge-based formulation:** Show why $L^{(2k)} = L^{(k)} \boxtimes L^{(k)}$ in the min-plus semiring, and conclude the $\Theta(n^3 \log n)$ bound via repeated squaring.

   <details>
   <summary>Answer</summary>

   $\ell_{ij}^{(2k)}$ is the cost of a shortest $i \to j$ path with at most $2k$ edges. Any such path decomposes as a prefix of length $\leq k$ from $i$ to some intermediate $m$, plus a suffix of length $\leq k$ from $m$ to $j$. So $\ell_{ij}^{(2k)} = \min_m (\ell_{im}^{(k)} + \ell_{mj}^{(k)})$, which is exactly $L^{(k)} \boxtimes L^{(k)}$. Since $L^{(n-1)}$ is the answer and $n - 1 \leq 2^{\lceil \log_2(n-1) \rceil}$, we need only $\lceil \log_2(n-1) \rceil$ squarings. Each squaring is $\Theta(n^3)$ (triple loop), giving **$\Theta(n^3 \log n)$** total.

   </details>

9. **DAG advantage:** On a DAG with $V = 10^6$ and $E = 5 \cdot 10^6$ and negative edges, which algorithm should you use and what is the speedup over Bellman-Ford?

   <details>
   <summary>Answer</summary>

   Use **DAG-ShortestPath**: topological sort + linear-time relaxation = $\Theta(V + E) = 6 \cdot 10^6$ operations. **Bellman-Ford** runs in $\Theta(VE) = 5 \cdot 10^{12}$ operations, about $10^6$ times slower. The speedup factor is $VE/(V+E) \approx 8.3 \cdot 10^5$, roughly on the order of $|V|$, which is the whole point of exploiting the DAG structure. Dijkstra is *not* an option because of negative edges.

   </details>

10. **Kosaraju trace:** Run Kosaraju on the directed graph with edges $\{(1,2), (2,3), (3,1), (3,4), (4,5), (5,4)\}$. Report the SCCs and the finish times that drive the second pass.

    <details>
    <summary>Answer</summary>

    Run DFS on $G$ from vertex 1. The traversal visits 1 → 2 → 3 → 1 (back edge), then 4 → 5 → 4 (back edge). Finish times are $f(5)=1$, $f(4)=2$, $f(3)=3$, $f(2)=4$, and $f(1)=5$. Reverse all edges to form $G^R = \{(2,1), (3,2), (1,3), (4,3), (5,4), (4,5)\}$. Then run DFS on $G^R$ in decreasing finish-time order. Starting from 1 reaches $\{1,2,3\}$, the first SCC. The next unprocessed vertex is 4, and its search reaches $\{4,5\}$, the second SCC.

    </details>

11. **Why finish-time ordering?** Why does Kosaraju require *decreasing* finish-time order in step 3? What would go wrong with arbitrary order, or with *increasing* finish-time order?

    <details>
    <summary>Answer</summary>

    The vertex with the **largest** $f[\cdot]$ in DFS($G$) belongs to a **source SCC** of the SCC-DAG (no incoming SCC edges). In $G^R$, that SCC becomes a *sink*: DFS from this vertex in $G^R$ cannot escape its SCC, so it discovers exactly that SCC. **Arbitrary order:** the first DFS in $G^R$ might start in a non-source SCC and walk into another SCC via a still-present cross-SCC edge in $G^R$, merging them incorrectly. **Increasing order:** nothing guarantees which SCC holds the vertex with the smallest finish time (in the Section 6.3 example, vertex 4 with $f[4]=1$ lies in the source SCC A). If that vertex lies in a sink SCC of $G$, which is a *source* SCC in $G^R$, DFS can walk into other SCCs via $G^R$ edges and again merge them. Only decreasing $f$ guarantees that each DFS starts in a current source SCC of $G$ (a sink SCC of $G^R$) and peels off SCCs one at a time.

    </details>

12. **Algorithm choice:** For each scenario, state the best algorithm and justify in one sentence.

    | Scenario | Best algorithm |
    |----------|----------------|
    | (a) GPS routing, road weights are travel times (non-negative) | ? |
    | (b) Currency-exchange graph, edges weighted by $-\log(\text{rate})$, detect arbitrage cycle | ? |
    | (c) Precompute all city-to-city distances in a country atlas | ? |
    | (d) Build-system dependency graph, compute earliest finish time | ? |

    <details>
    <summary>Answer</summary>

    **(a) Dijkstra:** Use for a single source with non-negative weights; it runs in $O(E \log V)$. **(b) Bellman-Ford:** Use when negative weights may occur; its Phase 2 detects negative-weight cycles such as arbitrage opportunities. **(c) Floyd-Warshall:** Use for all-pairs queries. Its $\Theta(V^3)$ cost is reasonable for a country with thousands of cities, and the matrix can be precomputed once. **(d) DAG-ShortestPath:** For task dependencies, use its longest-path variant on the acyclic graph, which runs in $\Theta(V + E)$.

    </details>
