# Week 11 Lecture — Graph Algorithms I

> **Last Updated:** 2026-05-13
>
> Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms (CLRS) Ch 20 (Elementary Graph Algorithms), Ch 21 (Minimum Spanning Trees)

> **Prerequisites**: Week 2: Asymptotic notation and complexity analysis (operation costs are reported in $O(V+E)$, $O(E \log V)$, etc.). Week 3: Arrays, stacks, queues (BFS uses a queue, DFS uses a stack or recursion). Week 5: Greedy algorithms (Prim's and Kruskal's are both greedy MSTs — revisited here in depth). Week 9: Trees (a spanning tree is a tree; MST proofs use tree properties). Basic discrete-math vocabulary: set, relation, ordered/unordered pair.
>
> **Learning Objectives**:
> 1. Define a graph $G = (V, E)$ and distinguish directed/undirected, weighted/unweighted variants
> 2. Compare **adjacency matrix**, **adjacency list**, and **adjacency array** representations on space and edge-lookup cost
> 3. Implement and trace **DFS** and **BFS**, and explain why both run in $\Theta(V + E)$
> 4. State and justify that **BFS** finds shortest **hop-count** paths in unweighted graphs
> 5. Define a Directed Acyclic Graph (DAG) and produce a **topological order** by either the in-degree-zero method or DFS finish-time method
> 6. Define a **Minimum Spanning Tree (MST)** and prove that any MST has exactly $|V|-1$ edges
> 7. Execute **Prim's** and **Kruskal's** algorithms, reason about the greedy choice that makes each correct, and analyze their running times
> 8. Choose the appropriate algorithm and representation given graph density and edge-list versus vertex-list access patterns

---

## Table of Contents

- [1. Graph Basics and Representations](#1-graph-basics-and-representations)
  - [1.1 What is a Graph?](#11-what-is-a-graph)
  - [1.2 Types of Graphs](#12-types-of-graphs)
  - [1.3 Adjacency Matrix](#13-adjacency-matrix)
  - [1.4 Adjacency Matrix — Directed and Weighted Examples](#14-adjacency-matrix--directed-and-weighted-examples)
  - [1.5 Adjacency Matrix — Analysis](#15-adjacency-matrix--analysis)
  - [1.6 Adjacency List](#16-adjacency-list)
  - [1.7 Adjacency List — Analysis](#17-adjacency-list--analysis)
  - [1.8 Adjacency Array](#18-adjacency-array)
  - [1.9 Representation Comparison](#19-representation-comparison)
- [2. Graph Traversal — BFS and DFS](#2-graph-traversal--bfs-and-dfs)
  - [2.1 Visiting All Vertices](#21-visiting-all-vertices)
  - [2.2 DFS — Algorithm](#22-dfs--algorithm)
  - [2.3 DFS — Step-by-Step Example](#23-dfs--step-by-step-example)
  - [2.4 DFS — Detailed Trace](#24-dfs--detailed-trace)
  - [2.5 BFS — Algorithm](#25-bfs--algorithm)
  - [2.6 BFS — Step-by-Step Example](#26-bfs--step-by-step-example)
  - [2.7 BFS Gives Shortest Hop-Count Paths](#27-bfs-gives-shortest-hop-count-paths)
  - [2.8 BFS vs DFS — Comparison](#28-bfs-vs-dfs--comparison)
- [3. Topological Sorting](#3-topological-sorting)
  - [3.1 Topological Sort — Definition](#31-topological-sort--definition)
  - [3.2 Algorithm 1 — In-Degree Method](#32-algorithm-1--in-degree-method)
  - [3.3 Algorithm 2 — DFS-Based Method](#33-algorithm-2--dfs-based-method)
  - [3.4 DFS Topological Sort — Example](#34-dfs-topological-sort--example)
- [4. Minimum Spanning Trees (MST)](#4-minimum-spanning-trees-mst)
  - [4.1 MST — Concept and Motivation](#41-mst--concept-and-motivation)
  - [4.2 Prim's Algorithm — Idea](#42-prims-algorithm--idea)
  - [4.3 Prim's Algorithm — Detailed Pseudocode](#43-prims-algorithm--detailed-pseudocode)
  - [4.4 Prim's Algorithm — Worked Example](#44-prims-algorithm--worked-example)
  - [4.5 Kruskal's Algorithm — Idea](#45-kruskals-algorithm--idea)
  - [4.6 Kruskal's Algorithm — Worked Example](#46-kruskals-algorithm--worked-example)
  - [4.7 Prim's vs Kruskal's](#47-prims-vs-kruskals)
- [Summary](#summary)
- [Self-Check Questions](#self-check-questions)

---

<br>

## 1. Graph Basics and Representations

### 1.1 What is a Graph?

A **graph** models relationships between objects using **vertices** and **edges**.

- $G = (V, E)$
  - $V$: set of **vertices** (nodes)
  - $E$: set of **edges** (connections)
- Two vertices connected by an edge are **adjacent**.

```
     1 --- 2
     |   / |
     |  /  |
     | /   |
     3 --- 4
```

**Applications:** social networks, road maps, circuit design, web hyperlinks, build dependencies, task scheduling, biological pathways, …

> **Why graphs are special:** unlike arrays or trees, a graph has no built-in "next" or "parent" — to talk about a graph algorithmically we first have to choose a *representation*. That choice (matrix vs list) drives the complexity of everything that follows.

### 1.2 Types of Graphs

| Type | Description | Example |
|------|-------------|---------|
| **Undirected** | Edges have no direction | Friendship network |
| **Directed (Digraph)** | Edges have direction (arrows) | Web hyperlinks, prerequisites |
| **Weighted** | Edges carry numerical weights | Road distances, costs |
| **Unweighted** | All edges are equal | Simple connectivity |

```
Undirected:          Directed:           Weighted:
  1 --- 2            1 --> 2             1 --5-- 2
  |     |            |     ^             |       |
  3 --- 4            v     |             3       7
                     3 --> 4             |       |
                                         3 --2-- 4
```

### 1.3 Adjacency Matrix

Use an $N \times N$ matrix where $N = |V|$:

- Entry $(i, j)$ = **1** if edge exists, **0** if not.
- For a **directed graph**, entry $(i, j)$ means edge from $i$ to $j$ — so the matrix is generally **asymmetric**.
- For a **weighted graph**, store the **weight** at $(i, j)$ instead of 1.

```
Graph:             Adjacency Matrix:
   1 --- 2              1  2  3  4
   |   / |          1 [ 0  1  1  0 ]
   |  /  |          2 [ 1  0  1  1 ]
   | /   |          3 [ 1  1  0  1 ]
   3 --- 4          4 [ 0  1  1  0 ]
```

### 1.4 Adjacency Matrix — Directed and Weighted Examples

**Directed graph** — the matrix loses symmetry:

```
Directed Graph:          Adjacency Matrix:
   1 --> 2                    1  2  3  4
   |     ^                1 [ 0  1  1  0 ]
   v     |                2 [ 0  0  0  0 ]
   3 --> 4                3 [ 0  0  0  1 ]
                          4 [ 0  1  0  0 ]
```

**Weighted graph** — the matrix carries weights (use $0$ or $\infty$ to mean "no edge", depending on convention):

```
Weighted Graph:          Adjacency Matrix:
   1 --5-- 2                  1   2   3   4
   |       |              1 [ 0   5   3   0 ]
   3       7              2 [ 5   0   0   7 ]
   |       |              3 [ 3   0   0   2 ]
   3 --2-- 4              4 [ 0   7   2   0 ]
```

### 1.5 Adjacency Matrix — Analysis

**Advantages:**
- Easy to understand and implement.
- **$O(1)$** time to test whether edge $(i, j)$ exists.

**Disadvantages:**
- Always **$O(N^2)$** space — even when very few edges exist.
- Initialization alone is $\Theta(N^2)$.
- Wasteful for **sparse** graphs.

**Example:** $10^6$ vertices with $2 \cdot 10^6$ edges
- Matrix holds $10^{12}$ entries, but only $2 \cdot 10^6$ are non-zero.

> **Best for:** **dense** graphs where most vertex pairs are connected — most matrix cells will be filled anyway.

### 1.6 Adjacency List

Use **$N$ linked lists** (one per vertex). The $i$-th list contains all vertices adjacent to vertex $i$. For weighted graphs, each list node also stores the edge weight.

```
Graph:                Adjacency List:
   1 --- 2            1: [2] -> [3]
   |   / |            2: [1] -> [3] -> [4]
   |  /  |            3: [1] -> [2] -> [4]
   | /   |            4: [2] -> [3]
   3 --- 4
```

**Weighted version** — store `(neighbor, weight)` pairs:

```
Weighted Graph:       Adjacency List (vertex, weight):
   1 --5-- 2          1: [(2,5)] -> [(3,3)]
   |       |          2: [(1,5)] -> [(4,7)]
   3       7          3: [(1,3)] -> [(4,2)]
   |       |          4: [(2,7)] -> [(3,2)]
   3 --2-- 4
```

### 1.7 Adjacency List — Analysis

**Advantages:**
- Space proportional to edges: **$O(V + E)$**.
- No wasted slots — ideal when edges are few.
- Efficient when iterating over the neighbors of a vertex.

**Disadvantages:**
- Edge-existence query $(i, j)$ costs $O(\deg(i))$, not $O(1)$.
- Pointer chasing can hurt cache performance on very dense graphs.

> **Best for:** **sparse** graphs where $E \ll V^2$ — which describes most real-world graphs (social networks, road maps, web links).

### 1.8 Adjacency Array

Replace the linked lists with **arrays** for each vertex, or pack them all into one **contiguous array** plus an index table.

```
Per-vertex arrays:        Packed array form:
   Vertex:  1    2    3    4
   Count:  [2]  [2]  [3]  [2]
                                A = [2,3 | 1,3,4 | 1,2,4 | 2,3]
   1: [2, 3]                    Index: [0, 2, 5, 8, 10]
   2: [1, 3, 4]
   3: [1, 2, 4]
   4: [2, 3]
```

**Advantages over linked-list adjacency:**
- No pointer overhead — better cache behavior.
- If neighbors are sorted, edge-existence becomes **$O(\log \deg)$** by binary search.
- Standard layout for *static* graphs in performance-critical settings (graph databases, GPU work).

### 1.9 Representation Comparison

| | Adjacency Matrix | Adjacency List | Adjacency Array |
|---|------------------|----------------|-----------------|
| **Space** | $O(V^2)$ | $O(V + E)$ | $O(V + E)$ |
| **Edge lookup** | $O(1)$ | $O(\deg)$ | $O(\log \deg)$ |
| **Iterate neighbors** | $O(V)$ | $O(\deg)$ | $O(\deg)$ |
| **Add edge** | $O(1)$ | $O(1)$ | $O(\deg)$ (rebuild) |
| **Best for** | Dense graphs | Sparse graphs | Sparse, static graphs |

> In practice, **adjacency lists** (or arrays) are the default because most real-world graphs are sparse. The matrix wins only when $E$ approaches $V^2$ or when constant-time edge queries dominate the workload.

---

<br>

## 2. Graph Traversal — BFS and DFS

### 2.1 Visiting All Vertices

There are two fundamental ways to systematically visit every vertex:

| | **BFS** (Breadth-First Search) | **DFS** (Depth-First Search) |
|---|--------------------------------|------------------------------|
| **Strategy** | Visit level by level | Go as deep as possible first |
| **Data structure** | Queue (FIFO) | Stack / recursion (LIFO) |
| **Time complexity** | $O(V + E)$ | $O(V + E)$ |

```
         1
        /|\
       2  3  4
      /|     |
     5  6    7

BFS from 1: 1 -> 2, 3, 4 -> 5, 6, 7
DFS from 1: 1 -> 2 -> 5 -> 6 -> 3 -> 4 -> 7
```

> BFS and DFS are the **foundation** of almost every graph algorithm. Connected components, cycle detection, topological sort, shortest hop paths, SCC decomposition — all are one of these two with a little extra bookkeeping.

### 2.2 DFS — Algorithm

```
DFS(G)
    for each v in V
        visited[v] <- NO
    for each v in V
        if visited[v] = NO then aDFS(v)

aDFS(v)
    visited[v] <- YES                    ... (A)
    for each x in L(v)                   ... (B)
        if visited[x] = NO then aDFS(x)  ... (C)
```

- **(A)** Mark $v$ visited — across all calls this happens $|V|$ times → **$O(V)$**.
- **(B)** Scan $v$'s adjacency list.
- **(C)** Recurse only if unvisited. Each edge is inspected at most twice (once from each endpoint in an undirected graph), so the total work across line (B)/(C) is **$O(E)$**.

**Total time: $O(V + E)$.**

> **Why "linear in $V+E$" is the right yardstick:** any algorithm that touches all vertices and edges at least once must pay $\Omega(V + E)$. DFS hits this lower bound, so it is asymptotically optimal for "look at every vertex".

### 2.3 DFS — Step-by-Step Example

```
Graph:                    Adjacency Lists:
   1 --- 2                1: [2, 3, 4, 6]
   |   / | \              2: [1, 3]
   |  /  |  6             3: [1, 2, 5]
   | /   |                4: [1, 6]
   3     5                5: [3, 6]
   |   /                  6: [1, 4, 5]
   4 - 6
```

```
DFS starting from vertex 1:
Step 1: Visit 1, go to neighbor 2
Step 2: Visit 2, go to neighbor 3
Step 3: Visit 3, go to neighbor 5
Step 4: Visit 5, go to neighbor 6
Step 5: Visit 6, go to neighbor 4
Step 6: Visit 4, backtrack

Traversal: 1 → 2 → 3 → 5 → 6 → 4
```

### 2.4 DFS — Detailed Trace

```
Call stack trace:

aDFS(1)                     visited: {1}
  aDFS(2)                   visited: {1,2}
    aDFS(3)                 visited: {1,2,3}
      aDFS(5)               visited: {1,2,3,5}
        aDFS(6)             visited: {1,2,3,5,6}
          aDFS(4)           visited: {1,2,3,5,6,4}
            neighbors: 1(visited), 6(visited)
            -> return
          -> return
        -> return
      -> return
    -> return
  -> return
```

Each vertex is visited **exactly once**, and each edge is examined **at most twice**.

### 2.5 BFS — Algorithm

```
BFS(G, s)
    for each v in V - {s}
        visited[v] <- NO
    visited[s] <- YES
    enqueue(Q, s)                       ... (A)
    while Q is not empty
        u <- dequeue(Q)                 ... (A)
        for each v in L(u)              ... (B)
            if visited[v] = NO then
                visited[v] <- YES
                enqueue(Q, v)
```

- **(A)** Each vertex enters and leaves the queue exactly once → **$O(V)$**.
- **(B)** Each adjacency list is scanned once → **$O(E)$**.

**Total time: $O(V + E)$.**

### 2.6 BFS — Step-by-Step Example

```
Graph:                    Adjacency Lists:
   1 --- 2                1: [2, 3, 4, 6]
   |   / | \              2: [1, 3]
   |  /  |  6             3: [1, 2, 5]
   | /   |                4: [1, 6]
   3     5                5: [3, 6]
   |   /                  6: [1, 4, 5]
   4 - 6
```

```
BFS starting from vertex 1:

Step 1: Dequeue 1.  Visit neighbors: 2, 3, 4, 6
        Queue: [2, 3, 4, 6]       Level 0: {1}

Step 2: Dequeue 2.  Neighbor 1 (visited), 3 (visited) → skip
        Queue: [3, 4, 6]          Level 1: {2, 3, 4, 6}

Step 3: Dequeue 3.  Neighbor 5 not visited → enqueue
        Queue: [4, 6, 5]

Step 4: Dequeue 4.  All neighbors visited → skip
        Queue: [6, 5]

Step 5: Dequeue 6.  All neighbors visited → skip
        Queue: [5]

Step 6: Dequeue 5.  All neighbors visited → skip
        Queue: []                 Level 2: {5}

Traversal order: 1 → 2 → 3 → 4 → 6 → 5
```

### 2.7 BFS Gives Shortest Hop-Count Paths

Starting from vertex 1, BFS naturally discovers vertices **level by level**:

```
Level 0: {1}           ← 0 hops from source
Level 1: {2, 3, 4, 6}  ← 1 hop from source
Level 2: {5}           ← 2 hops from source
```

> In an **unweighted** graph, BFS finds the **shortest path** (minimum number of edges) from the source to every reachable vertex.

**Proof sketch:** by induction on the level $\ell$. The first time we discover a vertex $v$, the parent is at level $\ell - 1$ and a shorter path would imply $v$ had been reached earlier — a contradiction. The "FIFO" discipline of the queue is exactly what enforces "level $\ell - 1$ before level $\ell$".

This shortest-path property does **not** generalize to weighted graphs — there, Dijkstra (Week 5 / Week 12) is needed.

### 2.8 BFS vs DFS — Comparison

| Property | BFS | DFS |
|----------|-----|-----|
| **Data structure** | Queue (FIFO) | Stack / Recursion (LIFO) |
| **Order** | Level by level | As deep as possible |
| **Shortest path** | Yes (unweighted) | No |
| **Memory** | $O(V)$ for the queue (worst-case width) | $O(V)$ for the recursion stack (worst-case depth) |
| **Time** | $O(V + E)$ | $O(V + E)$ |
| **Common uses** | Shortest hop path, level-order processing, web crawling within hop bound | Topological sort, cycle detection, SCC (Tarjan/Kosaraju), maze solving |

Both have the same asymptotic time, but they explore the graph in fundamentally different orders.

---

<br>

## 3. Topological Sorting

### 3.1 Topological Sort — Definition

**Precondition:** Directed Acyclic Graph (DAG) — no directed cycles.

**Definition:** arrange all vertices in a linear order such that for every directed edge $(x, y)$, vertex $x$ appears **before** vertex $y$.

- Multiple valid orderings may exist for the same DAG.
- A graph admits a topological order **if and only if** it is a DAG.

```
DAG:
   A --> B --> D
   |          ^
   v         /
   C -------

Topological orders:
   A, B, C, D    (valid)
   A, C, B, D    (valid)
```

> **Use cases:** course prerequisites, build systems (e.g., `make`, `ninja`), package managers, recipe steps, spreadsheet recomputation order.

### 3.2 Algorithm 1 — In-Degree Method

```
topologicalSort1(G)
    for i ← 1 to n
        Select a vertex u with no incoming edges (in-degree = 0)
        A[i] ← u
        Remove vertex u and all its outgoing edges from the graph
    // A[1..n] now contains the topological order
```

**Why it works:** if a vertex has in-degree 0, no other vertex must come before it — it is safe to place next. Removing it can only *reduce* in-degrees, so the property is maintained.

**Implementation tip:** keep an `in_degree[]` array and a queue of zero-in-degree vertices; the algorithm becomes BFS-like and runs in **$O(V + E)$** (sometimes called Kahn's algorithm).

```
Example (instant-ramen recipe):

Step (a): "Open packet" has in-degree 0 → select, remove its edges
Step (b): "Boil water" has in-degree 0 → select, remove edges
Step (c): "Add noodles" has in-degree 0 → select, remove edges
   …continue until all vertices are placed
```

### 3.3 Algorithm 2 — DFS-Based Method

```
topologicalSort2(G)
    for each v in V
        visited[v] ← NO
    for each v in V
        if visited[v] = NO then DFS-TS(v)

DFS-TS(v)
    visited[v] ← YES
    for each x in L(v)
        if visited[x] = NO then DFS-TS(x)
    Insert v at the FRONT of linked list R    // after visiting all children
```

- When DFS finishes a vertex (all descendants done), **prepend** it to the result list $R$.
- After the algorithm completes, $R$ is a topological order.

**Time complexity: $O(V + E)$** (same as DFS).

> **Why prepend on finish?** A vertex is "done" only when every descendant it can reach is already in $R$. Putting the just-finished vertex at the front guarantees that it precedes everything reachable from it — exactly the topological-order requirement.

### 3.4 DFS Topological Sort — Example

```
DAG:
   A --> B --> D
   |          ^
   v         /
   C -------

DFS-TS from A:
   Visit A → Visit B → Visit D
     D done  → R = [D]
     B done  → R = [B, D]
   Visit C
     D already visited → R = [C, B, D]
   A done    → R = [A, C, B, D]

Result: A → C → B → D ✓
```

Key insight: a vertex is added to the front **only after** every vertex reachable from it has already been recorded.

---

<br>

## 4. Minimum Spanning Trees (MST)

### 4.1 MST — Concept and Motivation

**Prerequisites:**
- **Connected** graph — a path exists between every pair of vertices.
- **Undirected**, **weighted** edges.

**Tree:**
- A connected graph with **no cycles**.
- A tree on $n$ vertices has **exactly $n - 1$ edges**.

**Spanning tree of $G$:**
- A subgraph that is a tree and contains **every** vertex of $G$, using only edges of $G$.

**Minimum Spanning Tree (MST):**
- A spanning tree with the **minimum total edge weight** among all spanning trees of $G$.

```
Problem: connect all cities with minimum road cost.

   Cities (vertices):       Goal: connect all cities using
     A --5-- B                    the FEWEST, CHEAPEST roads
     |\ /|                  
     | X  |                  MST = pick n-1 edges with minimum
     |/ \|                         total weight that keep
     C --3-- D                     the graph connected
```

> **Surprising fact:** MST is one of the few optimization problems where a **greedy** algorithm is provably optimal. The greedy choice is justified by the **cut property**: for any partition of $V$ into $(S, V \setminus S)$, the minimum-weight edge crossing the cut belongs to *some* MST. Prim's and Kruskal's are just two different ways to apply this property.

### 4.2 Prim's Algorithm — Idea

**Strategy:** grow the MST one vertex at a time, starting from a single root.

```
Prim(G, r)
    S ← empty set
    Mark vertex r as visited; add r to S
    while S ≠ V
        Find the minimum-weight edge (x, y) connecting
            S to V - S   (x ∈ S, y ∈ V - S)
        Mark y as visited; add y to S
```

- At each step, pick the **cheapest edge crossing the cut** $(S, V \setminus S)$ — the classic greedy move.
- Using a binary heap to extract the minimum: **$O(E \log V)$**.
- Using a Fibonacci heap: $O(E + V \log V)$ — better for dense graphs (theoretical).

### 4.3 Prim's Algorithm — Detailed Pseudocode

```
Prim(G, r)                            // G = (V, E), r = start vertex
    S ← empty
    for each u in V
        d[u] ← ∞                      // (1) initialize distances
    d[r] ← 0                          // (2) start vertex has distance 0
    while S ≠ V                       // (3) iterate |V| times
        u ← extractMin(V - S, d)      // (4) closest fringe vertex
        S ← S ∪ {u}                   // (5) add to MST set
        for each v in L(u)            // (6) relax neighbors
            if v in V - S and w(u, v) < d[v] then
                d[v] ← w(u, v)        // (7) update best connection
                tree[v] ← u           // remember parent in MST
```

- **extractMin** uses a heap → $O(\log V)$ per extraction, $V$ extractions total → $O(V \log V)$.
- **Relaxation** (line 7) — updates $d[v]$ if a cheaper edge from $S$ to $v$ is found. Across all neighbors over all iterations this is $O(E \log V)$ (each edge contributes at most one decrease-key).
- **Total: $O(E \log V)$.**

### 4.4 Prim's Algorithm — Worked Example

```
Weighted Graph:
         8
     A -------- B
     |\        /|
     | \5   9/  |
    3|  \  /   7|
     |   \/     |
     |   /\     |
     |  /  \    |
     | /  2 \   |
     C--------D
        |   /
       4|  /6
        | /
        E

Edges: (A,B,8) (A,C,3) (A,D,5) (B,D,9) (B,E,7) (C,D,2) (C,E,4) (D,E,6)
```

**Execution trace (start at A):**

```
Step 0: S={A}     d: A=0, B=∞, C=∞, D=∞, E=∞
        Relax from A: d[B]=8, d[C]=3, d[D]=5

Step 1: extractMin → C (d=3).  S={A, C}
        Relax from C: d[D] = min(5,2) = 2,  d[E] = 4
        MST edge: A—C  (weight 3)

Step 2: extractMin → D (d=2).  S={A, C, D}
        Relax from D: d[B] = min(8,9) = 8 (no change),  d[E] = min(4,6) = 4 (no change)
        MST edge: C—D  (weight 2)

Step 3: extractMin → E (d=4).  S={A, C, D, E}
        Relax from E: d[B] = min(8,7) = 7
        MST edge: C—E  (weight 4)

Step 4: extractMin → B (d=7).  S={A, C, D, E, B}
        MST edge: E—B  (weight 7)

MST total weight: 3 + 2 + 4 + 7 = 16
```

**Resulting MST:**

```
   MST (weight = 16):
     A         B
     |         |
     |3        |7
     |         |
     C         |
     |\        |
     | \2      |
     |  D      |
     |
    4|
     |
     E

MST edges: A-C(3), C-D(2), C-E(4), E-B(7)
```

### 4.5 Kruskal's Algorithm — Idea

**Strategy:** sort all edges by weight. Greedily add the next cheapest edge unless it would form a cycle.

```
Kruskal(G)
    T ← empty set                       // MST edges
    Create n singleton sets (one per vertex)
    Sort all edges Q by weight (ascending)
    while |T| < n - 1
        Remove minimum-weight edge (u, v) from Q
        if u and v are in DIFFERENT sets then
            Union the two sets
            T ← T ∪ {(u, v)}
```

- **Cycle detection** uses the **Union-Find (Disjoint Set)** data structure.
  - `Find(x)` — which component does $x$ belong to? — $O(\alpha(V))$ amortized with path compression.
  - `Union(x, y)` — merge two components — $O(\alpha(V))$ amortized with union-by-rank.
- Edge sorting: $O(E \log E) = O(E \log V)$ (since $E \leq V^2$).

**Total time: $O(E \log V)$.**

> **Union-Find primer:** maintain each component as a tree of parent-pointers; `Find` walks to the root, `Union` links one root under the other. Path compression flattens trees during `Find`; union-by-rank attaches the shorter tree under the taller. Together they give the near-linear inverse Ackermann factor $\alpha(V)$, which is $\leq 4$ for any conceivable $V$.

### 4.6 Kruskal's Algorithm — Worked Example

```
Edges sorted by weight:
   (C,D,2), (A,C,3), (C,E,4), (A,D,5), (D,E,6), (B,E,7), (A,B,8), (B,D,9)

Initial sets: {A}, {B}, {C}, {D}, {E}
```

```
Step 1: Edge (C,D,2) — C and D in different sets → ADD
        Sets: {A}, {B}, {C,D}, {E}        T = {(C,D)}

Step 2: Edge (A,C,3) — A and C in different sets → ADD
        Sets: {A,C,D}, {B}, {E}           T = {(C,D),(A,C)}

Step 3: Edge (C,E,4) — C and E in different sets → ADD
        Sets: {A,C,D,E}, {B}              T = {(C,D),(A,C),(C,E)}

Step 4: Edge (A,D,5) — A and D in SAME set → SKIP (would form a cycle)

Step 5: Edge (D,E,6) — D and E in SAME set → SKIP

Step 6: Edge (B,E,7) — B and E in different sets → ADD
        Sets: {A,B,C,D,E}                 T = {(C,D),(A,C),(C,E),(B,E)}
        |T| = 4 = n-1 → DONE

MST total weight: 2 + 3 + 4 + 7 = 16
```

```
MST (weight = 16):
   A         B
   |         |
  3|        7|
   |         |
   C---------E
   |       4
  2|
   |
   D
```

The MST is the **same** as Prim's result (when the MST is unique, both algorithms agree edge-by-edge; when edge weights tie, the two may produce *different but equally optimal* MSTs).

### 4.7 Prim's vs Kruskal's

| | Prim's | Kruskal's |
|---|--------|-----------|
| **Strategy** | Grow MST from one vertex | Pick cheapest edge globally |
| **Data structure** | Priority queue (heap) | Union-Find + sorted edges |
| **Time** | $O(E \log V)$ | $O(E \log V)$ |
| **Better when** | Dense graphs ($E$ close to $V^2$) | Sparse graphs ($E$ close to $V$) |
| **Approach** | Vertex-centric (extend the cut) | Edge-centric (scan global edge list) |
| **Parallelism** | Hard to parallelize | Easier (independent edge tests) |

Both are **greedy** algorithms that produce a **provably optimal** MST.

> **5주차와의 연결 (Week 5 callback):** Greedy algorithms are *correct* exactly when the greedy-choice property holds. For MST, the cut property *is* that justification — it is one of the rare optimization settings where the greedy heuristic happens to be a theorem.

---

<br>

## Summary

| Topic | Key Points |
|-------|------------|
| **Graph** | $G = (V, E)$; directed / undirected; weighted / unweighted |
| **Adjacency Matrix** | $O(V^2)$ space, $O(1)$ edge lookup; best for dense graphs |
| **Adjacency List** | $O(V + E)$ space, $O(\deg)$ lookup; best for sparse graphs |
| **DFS** | Recursive / stack-based; $O(V + E)$; goes deep first |
| **BFS** | Queue-based; $O(V + E)$; level-by-level; shortest hop-count paths |
| **Topological Sort** | DAG only; $O(V + E)$; in-degree method or DFS-finish method |
| **Prim's MST** | Grow from a vertex; extractMin with a heap; $O(E \log V)$ |
| **Kruskal's MST** | Sort edges + Union-Find; $O(E \log V)$ |

**Key Takeaways:**
- The **representation** decides the cost — matrix for dense, list/array for sparse.
- DFS and BFS are both $O(V + E)$ but differ in **order of discovery**; pick by what you need (depth vs level).
- **BFS = shortest path in unweighted graphs.** This is the cheapest shortest-path algorithm we have.
- **Topological sort exists iff the graph is a DAG.** Both algorithms run in $O(V + E)$.
- **MST is greedy-optimal** — both Prim and Kruskal exploit the cut property; they differ in which "cut" they look at.
- Prim's vs Kruskal's: same complexity, different bias — Prim's likes density, Kruskal's likes sparsity.

> "Graphs are how relationships become computable."

**Next week:** Shortest-path algorithms — Dijkstra, Bellman-Ford, Floyd-Warshall.

---

<br>

## Self-Check Questions

1. **Representation choice:** For a road network of $10^7$ intersections with average degree 4, which representation should you use and why? Estimate the space requirement for each.

   > **Answer:** Total edges $E \approx V \cdot \bar{d}/2 = 10^7 \cdot 4 / 2 = 2 \cdot 10^7$ — very **sparse** ($E \ll V^2$). **Adjacency matrix** needs $V^2 = 10^{14}$ entries (~100 TB) — completely infeasible. **Adjacency list/array** needs $O(V + E) = O(3 \cdot 10^7)$ entries (~250 MB with 8-byte pointers) — easily fits in memory. The right choice is an **adjacency list** (or packed adjacency array for cache friendliness); road networks are canonical sparse graphs.

2. **DFS vs BFS traces:** Given the graph from §2.3, run BFS and DFS starting at vertex 6. Report the visitation order for both.

   > **Answer:** Adjacency lists from §2.3: 1:[2,3,4,6], 2:[1,3], 3:[1,2,5], 4:[1,6], 5:[3,6], 6:[1,4,5]. **BFS from 6:** Queue starts with 6. Dequeue 6 → enqueue 1, 4, 5. Dequeue 1 → enqueue 2, 3. Dequeue 4 (neighbors visited). Dequeue 5 (visited). Dequeue 2, then 3. Order: **6 → 1 → 4 → 5 → 2 → 3**. **DFS from 6:** Visit 6 → recurse 1 → recurse 2 → recurse 3 → recurse 5 (5's only unvisited neighbor was through 6, already visited) → backtrack → 4. Order: **6 → 1 → 2 → 3 → 5 → 4**.

3. **BFS shortest path proof:** Prove that when BFS first dequeues vertex $v$, the recorded distance $d[v]$ equals the shortest hop distance from $s$ to $v$. Where exactly does the FIFO discipline enter the argument?

   > **Answer:** Induct on $d[v]$. **Base case** $d[s] = 0$ is trivially the shortest. **Inductive step:** Suppose all vertices at true distance $< \ell$ have been dequeued with the correct $d$-value. When BFS dequeues $u$ at distance $\ell - 1$ and visits neighbor $v$ (first discovery), it sets $d[v] = \ell$. Suppose for contradiction $v$ had a shorter true distance $\ell' < \ell$; then $v$'s actual BFS parent would have been at distance $\ell' - 1 < \ell - 1$ and would already have been dequeued before $u$ — contradicting "first discovery." The **FIFO discipline** is essential here: it guarantees that all vertices at distance $\ell - 1$ are dequeued *before* any at distance $\ell$, so no shorter path can sneak in late.

4. **DFS on a directed graph:** Apply DFS to the directed graph with edges $\{(A,B), (B,C), (C,A), (A,D)\}$ starting at $A$. Identify the back edge — what does its presence imply about the graph?

   > **Answer:** DFS from A: enter A → enter B → enter C → C's neighbor A is **on the DFS stack** (still in-progress, not yet finished) → this is a **back edge** $(C, A)$. After C returns, B returns, A then visits D. The back edge implies the directed graph contains a **cycle** $A \to B \to C \to A$. In general, a directed graph has a cycle **if and only if** DFS encounters at least one back edge — this is the basis of DFS-based cycle detection and means the graph is **not a DAG**, so no topological order exists.

5. **Topological sort:** Apply both topological-sort algorithms to the DAG with edges $\{(1,2), (1,3), (3,4), (2,4), (4,5)\}$. Show that every valid topological order respects all edge constraints.

   > **Answer:** **In-degree method:** initial in-degrees are 1:0, 2:1, 3:1, 4:2, 5:1. Pick 1 (in-deg 0), remove → 2:0, 3:0. Pick 2 → 4:1. Pick 3 → 4:0. Pick 4 → 5:0. Pick 5. Order: **1, 2, 3, 4, 5**. **DFS method** from 1: visit 1 → 2 → 4 → 5; 5 finishes, prepend → R=[5]; 4 finishes → R=[4,5]; 2 finishes → R=[2,4,5]; visit 3 → 4 already done; 3 finishes → R=[3,2,4,5]; 1 finishes → R=[**1,3,2,4,5**]. Both orders are valid because for each edge $(x,y)$, $x$ precedes $y$ — e.g., 1 before 2,3; 2 before 4; 3 before 4; 4 before 5.

6. **Topological sort vs cycles:** Run the in-degree algorithm on a graph that secretly contains a cycle. What goes wrong? How can you *detect* the cycle from the algorithm's failure mode?

   > **Answer:** Every vertex in a cycle has **at least one incoming edge from another cycle member**, so its in-degree can never reach 0 just by removing non-cycle vertices. The algorithm processes all vertices reachable from in-degree-0 sources, then **halts with cycle vertices still unplaced**. **Detection rule:** after the algorithm terminates, if `|placed vertices| < |V|`, the remaining vertices form (or feed into) a **cycle**. This is the standard linear-time DAG check — Kahn's algorithm doubles as both topological sort and cycle detection in $O(V+E)$.

7. **MST cut property:** State and prove the cut property: for any cut $(S, V \setminus S)$, the minimum-weight edge crossing the cut belongs to *some* MST. Why is the qualifier "some" important when edge weights tie?

   > **Answer:** **Cut property:** Let $(S, V \setminus S)$ be any non-trivial cut and let $e = (u, v)$ be a minimum-weight edge with $u \in S$, $v \in V \setminus S$. **Proof (exchange argument):** Take any MST $T$. If $e \in T$, done. Otherwise, adding $e$ to $T$ creates a cycle; this cycle must contain some other edge $e'$ crossing the same cut. Since $w(e) \leq w(e')$, swapping $e'$ for $e$ produces a new spanning tree $T' = T \cup \{e\} \setminus \{e'\}$ with $w(T') \leq w(T)$, so $T'$ is also an MST containing $e$. The qualifier "**some**" matters when edge weights tie: if multiple edges cross the cut at the same minimum weight, **different MSTs may include different ones** — Prim's and Kruskal's might produce distinct MSTs both of which are optimal.

8. **Prim's vs Kruskal's:** On the graph of §4.4, run Kruskal's from scratch and compare the edges selected at each step with Prim's. Where do the two algorithms make *different* choices, and do they still produce the same MST?

   > **Answer:** **Kruskal's order** (by weight): pick (C,D,2), (A,C,3), (C,E,4), skip (A,D,5) [cycle], skip (D,E,6) [cycle], pick (B,E,7). MST = {(C,D), (A,C), (C,E), (B,E)} weight 16. **Prim's from A** picked: (A,C,3), (C,D,2), (C,E,4), (E,B,7). The **selected edges are identical** — only the **order of selection differs**: Prim's picks (A,C) first because it extends from A, Kruskal's picks (C,D) first because it has lowest weight globally. The MST is unique here (no tied weights), so both algorithms reach the same tree.

9. **Union-Find:** Trace `Find` and `Union` operations during Kruskal's on the §4.6 example using union-by-rank with path compression. Draw the parent-pointer forest after each step.

   > **Answer:** Initial: each vertex its own root, all ranks 0. (1) **(C,D,2)**: `Find(C)=C`, `Find(D)=D`, ranks tie → make D's parent C, rank(C)=1. Forest: {A}, {B}, {C←D}, {E}. (2) **(A,C,3)**: `Find(A)=A` (rank 0), `Find(C)=C` (rank 1), attach A under C. Forest: {C←D, A}, {B}, {E}. (3) **(C,E,4)**: `Find(C)=C`, `Find(E)=E`, attach E under C. Forest: {C←D, A, E}, {B}. (4) **(A,D,5)**: `Find(A)`: A→C (root, path-compress A's parent to C). `Find(D)`: D→C. Same root → **skip**. (5) **(D,E,6)**: both point to C → skip. (6) **(B,E,7)**: `Find(B)=B` (rank 0), `Find(E)=C` (rank 1), attach B under C. Final forest: single tree rooted at C with children A, B, D, E.

10. **Density-based choice:** For a graph with $V = 1000$ and $E = 999$ (almost a tree) vs $V = 1000$ and $E = 400{,}000$ (dense), which MST algorithm would you prefer in each case, and why?

    > **Answer:** **Sparse case ($E = 999$): Kruskal's.** With $E \approx V$, sorting $E$ edges costs $O(E \log E) \approx 10^4$ comparisons and Union-Find adds a near-constant factor — very fast in practice and trivially parallelizable. **Dense case ($E = 400{,}000$, $E \approx V^2/2.5$): Prim's** with a binary heap or array. Prim's $O(V^2)$ array implementation beats Kruskal's $O(E \log V) \approx 4 \cdot 10^5 \cdot 10 = 4 \cdot 10^6$ on dense graphs because Prim's revisits only $V = 1000$ extractions; with a Fibonacci heap Prim's hits $O(E + V \log V)$ — asymptotically optimal for dense.
