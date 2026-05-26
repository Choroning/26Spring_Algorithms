# Week 13 Lecture — NP-Completeness & Approximation Algorithms

> **Last Updated:** 2026-05-26
>
> Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms (CLRS) Ch 34 (NP-Completeness), Ch 35 (Approximation Algorithms)

> **Prerequisites**: Week 2: Asymptotic notation — the entire P/NP distinction lives on the line "polynomial vs super-polynomial." Week 5: Greedy algorithms — approximation algorithms in §6–§10 are greedy with a *proof of approximation ratio* bolted on. Week 6: Dynamic programming — to understand why the DP for 0-1 Knapsack is *pseudo-polynomial* (and therefore does not contradict NP-Completeness). Week 11: Graphs and MST — TSP approximation uses MST directly as a subroutine. Week 12: Shortest path — used as a comparison ("Shortest Path is in P, Longest Path is NP-Complete"). Basic discrete-math vocabulary: set, decision problem, certificate.
>
> **Learning Objectives**:
> 1. Distinguish **tractable** (polynomial time) from **intractable** problems, and **decidable** from **undecidable**
> 2. State the definitions of **P** and **NP** and articulate the *verify vs solve* intuition
> 3. List several **famous NP-Complete problems** (SAT, Subset Sum, Partition, 0-1 Knapsack, Vertex Cover, Independent Set, Clique, Graph Coloring, Longest Path, Set Cover, TSP, Hamiltonian Cycle, Bin Packing, Job Scheduling)
4. Distinguish **decision** problems (Yes/No) from **optimization** problems and explain why NP-Completeness is stated on decision problems
5. Define **polynomial-time reduction** $A \leq_P B$ and use it to transfer hardness
6. Define **NP-Hard** and **NP-Complete** and apply the **two-step recipe** (in NP + reduction from known NP-C) to prove NP-Completeness of a new problem
7. Reproduce the **LONGEST-PATH is NP-Complete** proof and sketch the **3-SAT $\leq_P$ CLIQUE** reduction
8. Decide what to do in practice when a problem is proven NP-Complete (heuristics, approximation, special cases)
9. Define **approximation ratio** and the **indirect-optimal** technique for proving it
10. Execute and analyze the **2-approximations** for TSP (MST-based), **Vertex Cover** (maximal-matching), **Bin Packing** (FF/NF/BF/WF), **Job Scheduling** (earliest-finishing-machine), and **k-Clustering** (farthest-first traversal)

---

## Table of Contents

- [1. Problem Complexity Classes](#1-problem-complexity-classes)
  - [1.1 Why NP-Completeness Theory Matters](#11-why-np-completeness-theory-matters)
  - [1.2 Classification of Problems](#12-classification-of-problems)
  - [1.3 Tractable Time = Polynomial Time](#13-tractable-time--polynomial-time)
  - [1.4 Famous NP-Complete Problems](#14-famous-np-complete-problems)
  - [1.5 Decision vs Optimization Problems](#15-decision-vs-optimization-problems)
- [2. P, NP, and NP-Completeness Theory](#2-p-np-and-np-completeness-theory)
  - [2.1 The Class P](#21-the-class-p)
  - [2.2 The Class NP](#22-the-class-np)
  - [2.3 P vs NP — The Million-Dollar Question](#23-p-vs-np--the-million-dollar-question)
  - [2.4 Polynomial-Time Reduction](#24-polynomial-time-reduction)
  - [2.5 Reduction Examples](#25-reduction-examples)
  - [2.6 NP-Hard and NP-Complete — Definitions](#26-np-hard-and-np-complete--definitions)
  - [2.7 How to Prove NP-Completeness](#27-how-to-prove-np-completeness)
  - [2.8 Proof — LONGEST-PATH is NP-Complete](#28-proof--longest-path-is-np-complete)
  - [2.9 Sketch — 3-SAT $\leq_P$ CLIQUE](#29-sketch--3-sat-leq_p-clique)
  - [2.10 The Reduction Chain](#210-the-reduction-chain)
  - [2.11 Counterintuitive Boundaries](#211-counterintuitive-boundaries)
  - [2.12 What "NP-Complete" Means in Practice](#212-what-np-complete-means-in-practice)
- [3. Approximation Algorithms — Foundations](#3-approximation-algorithms--foundations)
  - [3.1 Why Approximation?](#31-why-approximation)
  - [3.2 Approximation Ratio](#32-approximation-ratio)
  - [3.3 The Indirect-Optimal Technique](#33-the-indirect-optimal-technique)
- [4. TSP — MST-Based 2-Approximation](#4-tsp--mst-based-2-approximation)
  - [4.1 Problem and Metric Assumptions](#41-problem-and-metric-assumptions)
  - [4.2 Algorithm](#42-algorithm)
  - [4.3 Worked Example](#43-worked-example)
  - [4.4 Approximation Ratio Proof](#44-approximation-ratio-proof)
  - [4.5 Complexity](#45-complexity)
- [5. Vertex Cover — Maximal-Matching 2-Approximation](#5-vertex-cover--maximal-matching-2-approximation)
  - [5.1 Problem](#51-problem)
  - [5.2 Algorithm](#52-algorithm)
  - [5.3 Worked Example and Proof](#53-worked-example-and-proof)
- [6. Bin Packing — Four Greedy Heuristics](#6-bin-packing--four-greedy-heuristics)
  - [6.1 Problem](#61-problem)
  - [6.2 First Fit / Next Fit / Best Fit / Worst Fit](#62-first-fit--next-fit--best-fit--worst-fit)
  - [6.3 Worked Example](#63-worked-example)
  - [6.4 Approximation Ratio Proofs](#64-approximation-ratio-proofs)
- [7. Job Scheduling — Earliest-Finishing-Machine 2-Approximation](#7-job-scheduling--earliest-finishing-machine-2-approximation)
  - [7.1 Problem](#71-problem)
  - [7.2 Algorithm and Worked Example](#72-algorithm-and-worked-example)
  - [7.3 Approximation Ratio Proof](#73-approximation-ratio-proof)
- [8. k-Clustering — Farthest-First 2-Approximation](#8-k-clustering--farthest-first-2-approximation)
  - [8.1 Problem](#81-problem)
  - [8.2 Algorithm and Worked Example](#82-algorithm-and-worked-example)
  - [8.3 Approximation Ratio Proof](#83-approximation-ratio-proof)
  - [8.4 Practical Considerations](#84-practical-considerations)
- [9. Approximation Algorithms — Summary Table](#9-approximation-algorithms--summary-table)
- [Summary](#summary)
- [Self-Check Questions](#self-check-questions)

---

<br>

## 1. Problem Complexity Classes

### 1.1 Why NP-Completeness Theory Matters

Your boss gives you a problem that no efficient algorithm seems to crack. You have three possible answers:

- **Scenario 1:** *"I can't find an efficient algorithm. I'm not smart enough."* → embarrassing.
- **Scenario 2:** *"I can't find an efficient algorithm, because no such algorithm exists."* → strongest, but proving non-existence is hard.
- **Scenario 3 (NP-Complete):** *"I can't find an efficient algorithm, but neither could thousands of brilliant people over 50+ years for hundreds of related problems."* → professionally defensible.

> **The whole point of NP-Completeness theory** is to upgrade Scenario 1 to Scenario 3. It gives you a *legitimate*, *theory-grounded* reason to stop searching for an exact polynomial-time solution and pivot to heuristics or approximations.

### 1.2 Classification of Problems

```
┌──────────────────────────────────────────────────────────┐
│                   ALL PROBLEMS                            │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Solvable (Decidable)                                │ │
│  │                                                     │ │
│  │  ┌───────────────────────────────────────────────┐  │ │
│  │  │  Tractable: polynomial time                   │  │ │
│  │  │  - Shortest Path, MST, Sorting, ...           │  │ │
│  │  │  - Time: O(n^k) for some constant k           │  │ │
│  │  └───────────────────────────────────────────────┘  │ │
│  │  ┌───────────────────────────────────────────────┐  │ │
│  │  │  Intractable: no known polynomial algorithm   │  │ │
│  │  │  *** NP-Complete problems live here ***        │  │ │
│  │  │  - SAT, TSP, Vertex Cover, Clique, ...        │  │ │
│  │  │  - Best known: O(2^n), O(n!), etc.            │  │ │
│  │  └───────────────────────────────────────────────┘  │ │
│  │  ┌───────────────────────────────────────────────┐  │ │
│  │  │  Super-exponential: e.g., Presburger arith.   │  │ │
│  │  └───────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  Unsolvable (Undecidable)                            │ │
│  │  - Halting Problem, Hilbert's 10th Problem, ...      │ │
│  └─────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

> **Important distinction:** "intractable" ≠ "unsolvable." Intractable problems *have* algorithms, those algorithms just don't run in polynomial time. Unsolvable problems have *no* algorithm at all — the Halting Problem is undecidable regardless of how much time you allow.

### 1.3 Tractable Time = Polynomial Time

**Polynomial time** — input size $n$, running time bounded by $O(n^k)$ for some constant $k$.

| Tractable (Polynomial) | Intractable (Super-polynomial)  |
|------------------------|---------------------------------|
| $O(\log n)$            | $O(2^n)$ — exponential          |
| $O(n)$                 | $O(n!)$ — factorial             |
| $O(n \log n)$          | $O(n^n)$                        |
| $O(n^2), O(n^3)$       |                                 |

> **Convention:** a problem is "efficiently solvable" **if and only if** a polynomial-time algorithm exists for it. This is the Cobham–Edmonds thesis — a deliberately coarse line, but the right one for theoretical purposes, because the polynomial class is robust to changes in the computational model.

### 1.4 Famous NP-Complete Problems

A small zoo to motivate the rest of the lecture. (Each is NP-Complete — proofs come later, or are by reduction from one of these.)

**SAT (Boolean Satisfiability).** Given Boolean variables connected by OR ($\lor$) within clauses, the clauses connected by AND ($\land$), find an assignment satisfying every clause.

$$(\overline{w} \lor x) \land (w \lor y) \land (\overline{x} \lor \overline{y} \lor z)$$

- Satisfiable: $w = T, x = T, y = F, z$ anything.
- $(x) \land (\overline{x})$ is **unsatisfiable**.
- **First problem proven NP-Complete** (Cook, 1971; independently Levin, 1973).

**Subset Sum.** Given a set $S$ of integers and target $K$, does a subset of $S$ sum to exactly $K$?
- $S = \{20, 30, 40, 80, 90\}$, $K = 200$ → $\{30, 80, 90\}$.

**Partition.** Given $S$, can it be split into two subsets with equal sum?
- $S = \{20, 30, 40, 80, 90\}$ (total 260) → $\{20, 30, 80\}$ and $\{40, 90\}$ (each 130).
- Subset Sum reduces to Partition in polynomial time.

**0-1 Knapsack (decision version).** Capacity $C$, items with weights $w_i$ and values $v_i$. Is there a subset with total weight $\leq C$ and total value $\geq K$?

| Item | Weight | Value |
|------|--------|-------|
| 1    | 12 kg  | 20    |
| 2    | 8 kg   | 10    |
| 3    | 6 kg   | 15    |
| 4    | 5 kg   | 25    |

- For $C = 20$: items $\{2, 3, 4\}$ — weight 19, value 50.
- **Why NP-Complete?** The Week 6 DP solution runs in $O(nC)$; but $C$ can be encoded in $\log C$ bits, so the DP is *pseudo-polynomial* — polynomial in the *value* of $C$, exponential in the *bit-length* of $C$.

**Graph problems:**

- **Vertex Cover.** Smallest set of vertices touching every edge.
- **Independent Set.** Largest set of pairwise non-adjacent vertices.
- **Clique.** Largest complete subgraph.
- **Graph Coloring.** Fewest colours so adjacent vertices differ.
- **Longest Path.** A simple $s \to t$ path of length $\geq K$? — surprisingly NP-Complete (compare Shortest Path in P).
- **Set Cover.** Fewest subsets whose union equals the universe.

> **Beautiful relationship:** in graph $G = (V, E)$, $S$ is a vertex cover **iff** $V \setminus S$ is an independent set. A clique in $G$ corresponds to an independent set in the complement graph $\overline{G}$. Many NP-Complete problems sit on opposite sides of trivial dualities like this.

**Tour-style problems:**

- **TSP.** Given a weighted complete graph, find the shortest Hamiltonian cycle.
- **Hamiltonian Cycle.** Does the graph have *any* Hamiltonian cycle? — TSP reduces to it by setting all edge weights to 1.
- **Bin Packing.** Pack $n$ items into the fewest bins of capacity $C$.
- **Job Scheduling.** Assign $n$ jobs to $m$ identical machines to minimize makespan.

### 1.5 Decision vs Optimization Problems

| Aspect                     | Decision Problem                          | Optimization Problem        |
|----------------------------|-------------------------------------------|-----------------------------|
| **Answer**                 | Yes or No                                 | The best solution           |
| **Example (TSP)**          | "Is there a tour of length $\leq K$?"     | "What is the shortest tour?"|
| **Example (Shortest Path)**| "Is there a path of length $\leq 100$?"   | "What is the shortest path length?" |

**Why NP-Completeness is stated on decision problems:**

- The reduction machinery is cleanest when answers are Yes/No.
- The optimization version is **at least as hard** as the decision version — if you can solve "what is the shortest tour?" then you can answer "is it $\leq K$?" trivially.
- So hardness of the decision version *implies* hardness of the optimization version, but not vice versa cleanly. Stating hardness on the decision form is the strongest, tightest claim.

---

<br>

## 2. P, NP, and NP-Completeness Theory

### 2.1 The Class P

**P** = the set of decision problems solvable by a **deterministic** algorithm in **polynomial time**.

- Given any input of size $n$, the algorithm outputs Yes or No in $O(n^k)$ for some fixed $k$.

**Examples in P:**

- Is a graph connected? — BFS / DFS, $O(V + E)$.
- Is there a shortest path from $u$ to $v$ of length $\leq K$? — Dijkstra, $O(V^2)$ or $O((V+E) \log V)$.
- Can we sort $n$ numbers in $\leq T$ comparisons? — merge sort, $O(n \log n)$.
- Is there a minimum spanning tree of weight $\leq K$? — Kruskal, $O(E \log E)$.

> Every algorithm we have studied this semester solves a problem in **P**. That includes the entire 1–12 week catalogue.

### 2.2 The Class NP

**NP** = **N**ondeterministic **P**olynomial time.

A decision problem is in NP if, given a **"Yes" certificate** (a proposed solution), we can **verify** in polynomial time whether the certificate is valid.

> **Important — common confusion:** NP does **not** stand for "non-polynomial." It stands for *nondeterministic polynomial*, the class of problems solvable in polynomial time by an idealized **nondeterministic** machine — equivalently, problems whose Yes-answer admits a polynomial-time **verification**.

**Intuitive characterization:**

- **P** = problems we can **solve** quickly.
- **NP** = problems we can **verify** quickly.

**Examples in NP:**

- **Hamiltonian Cycle:** certificate = a vertex sequence; verification = check all vertices appear once + each consecutive pair is connected by an edge → $O(V)$.
- **SAT:** certificate = a True/False assignment; verification = plug it in and check each clause → $O(m \cdot k)$ for $m$ clauses, $k$ literals each.
- **Subset Sum:** certificate = a subset; verification = sum and compare to $K$ → $O(n)$.

> **Showing a problem is in NP is usually easy** — it is essentially a formality in NP-Completeness proofs. The hard part is showing NP-Hardness.

### 2.3 P vs NP — The Million-Dollar Question

```
  Possibility (a): P ≠ NP                Possibility (b): P = NP
       (strongly believed)                    (would be shocking)

  ┌──────────────────────┐                ┌──────────────────────┐
  │         NP           │                │                      │
  │   ┌──────────────┐   │                │       P = NP         │
  │   │      P       │   │                │                      │
  │   └──────────────┘   │                │  Everything in NP    │
  │                      │                │  becomes solvable    │
  └──────────────────────┘                │  in polynomial time  │
                                          └──────────────────────┘
```

- $P \subseteq NP$ trivially (if you can solve in poly time, you can verify in poly time by just re-running).
- Whether $P = NP$ or $P \neq NP$ is the **most famous open problem in CS**.
- **Clay Millennium Prize**: $1{,}000{,}000$ for a proof either way.
- The overwhelming consensus of researchers is $P \neq NP$ — but it is *not* known.

> **Why anyone cares:** if $P = NP$, every problem in this lecture (factoring, SAT, TSP, vertex cover, every NP-Complete problem ever) becomes practically solvable. Cryptography as we know it collapses. Optimal everything: planning, scheduling, drug discovery. Plenty of researchers spend their careers trying to prove $P \neq NP$; nobody has succeeded.

### 2.4 Polynomial-Time Reduction

The single most important construction in this lecture.

**Definition.** Problem $A$ **reduces to** problem $B$ (written $A \leq_P B$) if there is a function $f$ such that:

1. $f$ transforms every instance $\alpha$ of $A$ into an instance $f(\alpha) = \beta$ of $B$ **in polynomial time**, and
2. $\alpha$ is a Yes-instance of $A$ **if and only if** $f(\alpha)$ is a Yes-instance of $B$.

**Consequence:** if $A \leq_P B$ and $B$ is solvable in polynomial time, then $A$ is also solvable in polynomial time (solve $A$ by transforming to $B$ and asking $B$'s algorithm).

The **contrapositive** is the engine of NP-Completeness: if $A$ is *hard* and $A \leq_P B$, then $B$ is also *hard* — solving $B$ efficiently would solve $A$ efficiently, contradiction.

### 2.5 Reduction Examples

**Example 1 — Number Theory (toy):**

- **Problem 1:** Is integer $x = x_1 x_2 \dots x_n$ (digit representation) divisible by 3?
- **Problem 2:** Is $x_1 + x_2 + \dots + x_n$ divisible by 3?

Identical answers for every input (the standard digit-sum divisibility rule). Transformation: extract digits and sum → $O(n)$. Problem 2 is trivially easy, so Problem 1 is too. $\text{Problem 1} \leq_P \text{Problem 2}$.

**Example 2 — HAM-CYCLE $\leq_P$ TSP:**

- **HAM-CYCLE:** given graph $G = (V, E)$, does $G$ have a Hamiltonian cycle?
- **TSP (decision):** given weighted complete graph $G'$ and bound $K$, does $G'$ have a Hamiltonian cycle of total weight $\leq K$?

**Transformation:** take the HAM-CYCLE input $G$ and build a complete graph $G'$ on the same vertices. Edge weights:

```
  HAM-CYCLE instance          TSP instance
  (4 vertices, 5 edges)       (complete, all 6 edges weighted)

    a --- b                    a --1-- b
    |   / |        ===>        |1\  /1 |1
    |  /  |                    |  \/   |
    c --- d                    c -1/∞- d

  Edge of G        → weight 1                Set K = |V|
  Edge NOT in G    → weight ∞ (or 2|V|)
```

- $G$ has a Hamiltonian cycle **iff** $G'$ has a tour of weight $\leq |V|$.
- Transformation: $O(V^2)$ — polynomial.

So $\text{HAM-CYCLE} \leq_P \text{TSP}$. Since HAM-CYCLE is known to be NP-Complete, this proves TSP is NP-Hard.

### 2.6 NP-Hard and NP-Complete — Definitions

**NP-Hard.** $A$ is NP-Hard if **every** problem in NP reduces to $A$:

$$\text{For every } L \in NP: \quad L \leq_P A.$$

In words, $A$ is **at least as hard as every problem in NP**. Crucially, $A$ does **not** need to be in NP itself — the Halting Problem is NP-Hard but is outside NP (it is undecidable).

**NP-Complete.** $A$ is NP-Complete if:

1. $A \in NP$ (Yes-certificates are polynomial-time verifiable), **AND**
2. $A$ is NP-Hard.

```
  ┌──────────────────────────────────────────────┐
  │                  NP-Hard                      │
  │                                               │
  │       ┌───────────────────────────────┐       │
  │       │            NP                 │       │
  │       │                               │       │
  │       │    ┌───────────────────┐      │       │
  │       │    │        P          │      │       │
  │       │    └───────────────────┘      │       │
  │       │                               │       │
  │       │          NP-Complete           │       │
  │       │        (SAT, TSP, Clique,      │       │
  │       │      Vertex Cover, 3-SAT, …)   │       │
  │       └───────────────────────────────┘       │
  │                                               │
  │   NP-Hard but NOT in NP:                      │
  │   (Halting Problem, Generalized Chess, …)     │
  └──────────────────────────────────────────────┘

  * The P subset is shown assuming P ≠ NP (widely believed).
```

- **NP-Complete = NP ∩ NP-Hard.**
- An NP-Complete problem is *in* NP, so calling it NP-Hard is also true (but less informative).

### 2.7 How to Prove NP-Completeness

**Two-step recipe.**

**Step 1** — Show $A \in NP$:
- Describe a polynomial-time verification algorithm for a Yes-certificate of $A$.
- Usually a few lines; this is the easy part.

**Step 2** — Show $A$ is NP-Hard:
- Pick a known NP-Hard (or NP-Complete) problem $C$.
- Construct a polynomial-time reduction $C \leq_P A$.
- Prove the Yes/No answers are preserved **in both directions**.

```
  Polynomial-time reduction
    α (instance of C) ────f────> β = f(α) (instance of A)
                                         │
                                  algorithm for A
                                         │
                                         ▼
       Yes  ◄────────────────────────► Yes
       No   ◄────────────────────────► No

  "If A could be solved in polynomial time,
   then C could also be solved in polynomial time."
```

By transitivity of $\leq_P$, since *every* NP problem reduces to $C$ and $C$ reduces to $A$, *every* NP problem reduces to $A$. Therefore $A$ is NP-Hard. Combined with $A \in NP$, $A$ is NP-Complete.

### 2.8 Proof — LONGEST-PATH is NP-Complete

**Definitions.**

- **HAM-PATH-2-POINTS:** given $G = (V, E)$ and vertices $s, t$, does $G$ have a Hamiltonian path from $s$ to $t$? — *known to be NP-Complete*.
- **LONGEST-PATH:** given weighted $G = (V, E)$, vertices $s, t$, and constant $K$, does a simple path from $s$ to $t$ of total weight $\geq K$ exist?

**Step 1 — LONGEST-PATH $\in$ NP.**
- *Certificate:* a sequence of vertices forming a path from $s$ to $t$.
- *Verification:* check that consecutive pairs are edges in $E$, sum the weights, confirm the sum $\geq K$.
- *Time:* $O(|V|)$.

**Step 2 — HAM-PATH-2-POINTS $\leq_P$ LONGEST-PATH.**

*Transformation.* Given HAM-PATH-2-POINTS instance $G = (V, E)$ with endpoints $s, t$:
- Copy $G$ unchanged; assign **weight 1** to every edge.
- Set $K = |V| - 1$.

```
  HAM-PATH-2-POINTS instance         LONGEST-PATH instance

  s --- a --- b                       s -1- a -1- b
  |           |          ═══>         |           |
  c --- d --- t                       c -1- d -1- t

  "Hamiltonian s→t path?"             "Simple s→t path of weight ≥ |V|-1 ?"
```

**Forward direction.** A Hamiltonian $s \to t$ path visits all $|V|$ vertices, uses $|V| - 1$ edges, and (in the transformed instance) has total weight $|V| - 1 = K$. So Yes-instance of HAM-PATH → Yes-instance of LONGEST-PATH.

**Reverse direction.** A simple $s \to t$ path of weight $\geq |V| - 1$ in the transformed graph has $\geq |V| - 1$ edges. A simple path has at most $|V| - 1$ edges, so it has *exactly* $|V| - 1$ edges and visits *all* $|V|$ vertices — i.e., a Hamiltonian $s \to t$ path.

The transformation is $O(|E|)$. Therefore $\text{LONGEST-PATH}$ is NP-Hard. Combined with Step 1, **LONGEST-PATH is NP-Complete**. $\blacksquare$

### 2.9 Sketch — 3-SAT $\leq_P$ CLIQUE

**3-SAT.** Given a CNF formula where every clause has exactly 3 literals, is there a satisfying assignment?

**CLIQUE.** Does graph $G$ contain a complete subgraph of size $k$?

**Reduction.** Given a 3-SAT instance with $m$ clauses, build a graph $G_\phi$:

- For each literal in each clause, create a vertex (so $3m$ vertices total — three per clause).
- Add edge between two vertices unless:
  - they are in the **same clause**, OR
  - they are **contradictory** (e.g., $x_i$ and $\overline{x_i}$).
- Set $k = m$ (the number of clauses).

**Why it works.** A clique of size $m$ in $G_\phi$ selects one literal per clause (since no two same-clause vertices are connected) without contradictions (since no $x_i / \overline{x_i}$ pair is connected). Set every literal in the clique to True — every clause is satisfied. Conversely, a satisfying assignment chooses one true literal per clause, and any such choice forms a clique.

The construction is polynomial. So $\text{3-SAT} \leq_P \text{CLIQUE}$, and CLIQUE is NP-Hard.

### 2.10 The Reduction Chain

The first NP-Complete proof was for **SAT** by Cook (1971), proved *directly* from the definition of NP (showing a polynomial-time nondeterministic Turing machine can be simulated by a Boolean formula).

Every subsequent NP-Completeness proof reuses Cook's result by **reducing from a known NP-Complete problem**:

```
  CIRCUIT-SAT
      ↓ (reduction)
     SAT
      ↓
   3-CNF-SAT
   /       \
 CLIQUE   SUBSET-SUM
   ↓
 VERTEX-COVER
   ↓
 HAM-CYCLE
   ↓
  TSP
```

Today, **thousands** of problems are known to be NP-Complete. **If you could solve any single one of them in polynomial time, all of them would be solvable in polynomial time** — they are completely interlocked.

### 2.11 Counterintuitive Boundaries

Some problems that *look* similar have vastly different complexities:

| Problem                                              | Complexity   | Algorithm                  |
|------------------------------------------------------|--------------|----------------------------|
| **Shortest Path**                                    | P            | Dijkstra $O(V^2)$          |
| **Longest Path**                                     | NP-Complete  | none in poly time          |
| **Euler Circuit** (visit every **edge** once)        | P            | Hierholzer $O(E)$          |
| **Hamiltonian Cycle** (visit every **vertex** once)  | NP-Complete  | none in poly time          |
| **2-SAT**                                            | P            | Implication graph $O(n+m)$ |
| **3-SAT**                                            | NP-Complete  | none in poly time          |
| **2-Coloring**                                       | P            | BFS / DFS $O(V+E)$         |
| **3-Coloring**                                       | NP-Complete  | none in poly time          |

> **The boundary between P and NP-Complete can be surprisingly thin** — adding a single constraint (vertices instead of edges, 3 instead of 2 literals per clause, longest instead of shortest) flips a polynomial-time problem into one we have no efficient algorithm for. There is something deep here, and "what makes a problem hard?" is still an active research area.

### 2.12 What "NP-Complete" Means in Practice

When your problem is proven NP-Complete:

1. **Stop searching for an exact polynomial-time algorithm.** Nobody has found one for any NP-Complete problem in 50+ years. You won't, either.
2. **Use heuristics.** Algorithms that find good (often optimal) solutions on practical instances without quality guarantees.
3. **Use approximation algorithms.** Polynomial-time algorithms with provable bounds on solution quality — the topic of §3 onward.
4. **Use special-case solvers.** Many NP-Complete problems become polynomial on restricted inputs — trees, planar graphs, bounded-treewidth graphs, etc.

> *"Sometimes it is useful to know that something is impossible."*
> — **Leonid Levin**, co-discoverer of NP-Completeness (independently of Cook).

---

<br>

## 3. Approximation Algorithms — Foundations

### 3.1 Why Approximation?

NP-Complete problems appear *everywhere* — routing, scheduling, packing, covering, clustering. We can't find optimal solutions in polynomial time, so to deal with them we **give up one** of the following three desires:

1. Finding a solution **in polynomial time**.
2. Finding a solution **for all inputs**.
3. Finding the **optimal** solution.

**Approximation algorithms give up (3)** — they find a near-optimal solution in polynomial time, with a **provable quality guarantee**. (Heuristics also give up (3) but without provable guarantees; randomized algorithms sometimes give up (2) probabilistically; exponential-time exact algorithms give up (1).)

### 3.2 Approximation Ratio

An approximation algorithm comes with an **approximation ratio**:

$$
\rho = \frac{\text{value of approximate solution}}{\text{value of optimal solution}}
$$

(For maximization, the ratio is inverted; we always state it so $\rho \geq 1$.)

- $\rho$ close to $1.0$ = high quality.
- $\rho = 2.0$ = solution within a factor of 2 of optimal — "2-approximation."
- **The catch:** computing $\rho$ requires knowing the optimal value, which is what we cannot compute! This forces a clever workaround.

### 3.3 The Indirect-Optimal Technique

The way around the chicken-and-egg problem: use an **easily computable bound** on the optimal solution and prove the approximation ratio against the bound.

**For minimization problems:**
- Find a computable value $L$ such that $\text{OPT} \geq L$ (lower bound on OPT).
- Show $\text{APX} \leq c \cdot L$.
- Then $\text{APX} \leq c \cdot \text{OPT}$, giving approximation ratio $c$.

**For maximization problems:**
- Find a computable value $U$ such that $\text{OPT} \leq U$ (upper bound on OPT).
- Show $\text{APX} \geq U / c$.
- Then $\text{APX} \geq \text{OPT} / c$.

> **Why this works:** we *bypass* OPT entirely. We never compute it. We just sandwich it between a computable bound and the algorithm's output. Every 2-approximation proof in this lecture follows this template.

---

<br>

## 4. TSP — MST-Based 2-Approximation

### 4.1 Problem and Metric Assumptions

**Traveling Salesman Problem (TSP).** A salesperson starts in a city, visits every other city exactly once, and returns to the starting city. **Goal:** minimize total travel distance.

We assume **Metric TSP**:

- **Symmetry:** $d(A, B) = d(B, A)$.
- **Triangle inequality:** $d(A, B) \leq d(A, C) + d(C, B)$.

Both hold for Euclidean distances and many real-world cost models. Without the triangle inequality, TSP cannot be approximated within any constant factor unless $P = NP$ — the metric assumption is what makes a 2-approximation possible.

### 4.2 Algorithm

The plan: borrow MST (Week 11), then traverse it.

**Approx_MST_TSP**(input: $n$ cities with pairwise distances)

```
1. Compute the MST of the input graph using Kruskal's or Prim's.
2. Starting from any city, perform a DFS traversal of the MST,
   recording the order in which vertices are visited.
   (Each tree edge is traversed twice — once forward, once back.)
3. Remove duplicate cities from the visit order, keeping the first
   occurrence of each city; append the starting city at the end.
4. Return the resulting tour.
```

Step 3 is the **shortcutting** step — when the DFS would revisit a vertex, we "skip" to the next unseen one directly. The triangle inequality guarantees this shortcut is no longer than the path it replaces.

### 4.3 Worked Example

Consider 8 cities $A, B, C, D, E, F, G, H$ and an MST.

**Step 1 — Build MST.** Apply Kruskal / Prim → tree edges connecting all 8.

**Step 2 — DFS traversal** (starting at $A$):

$$
A \to G \to E \to G \to D \to H \to C \to H \to D \to F \to B \to F \to D \to G \to A
$$

Total length = $2M$ where $M$ = total MST weight (each of the $n - 1$ tree edges is used twice).

**Step 3 — Remove duplicates** via shortcut:

$$
A \to G \to E \to \cancel{G} \to D \to H \to C \to \cancel{H} \to \cancel{D} \to F \to B \to \cancel{F} \to \cancel{D} \to \cancel{G} \to A
$$

**Final tour:** $A \to G \to E \to D \to H \to C \to F \to B \to A$.

By the triangle inequality, the resulting tour length $\leq 2M$.

### 4.4 Approximation Ratio Proof

**Claim:** Approx_MST_TSP has approximation ratio $< 2.0$.

Let $M$ = total weight of MST, $\text{OPT}$ = optimal TSP tour length, $\text{APX}$ = our approximate tour length.

**Step 1.** $\text{OPT} > M$.

*Why:* the optimal tour visits every vertex and returns to the start. Remove any one edge from the tour — what remains is a spanning tree (it touches every vertex, is connected, has $|V| - 1$ edges). Since $M$ is the *minimum* spanning tree weight, $M \leq (\text{tour minus one edge}) < \text{OPT}$.

**Step 2.** $\text{APX} \leq 2M$.

*Why:* the DFS traversal has length exactly $2M$. Each shortcut in Step 3 replaces a sub-path "$x \to y \to z$" (in the traversal) with the direct edge "$x \to z$"; the triangle inequality gives $d(x, z) \leq d(x, y) + d(y, z)$, so shortcuts can only *decrease* length.

**Combining:** $\text{APX} \leq 2M < 2 \cdot \text{OPT}$, hence

$$
\frac{\text{APX}}{\text{OPT}} < 2.0. \qquad \blacksquare
$$

### 4.5 Complexity

| Step | Operation                  | Complexity   |
|------|----------------------------|--------------|
| 1    | Build MST (Kruskal's)      | $O(m \log m)$ |
| 1    | Build MST (Prim's)         | $O(n^2)$      |
| 2    | DFS traversal              | $O(n)$        |
| 3    | Remove duplicates          | $O(n)$        |

**Overall:** dominated by MST construction → $O(n^2)$ with Prim or $O(m \log m)$ with Kruskal.

---

<br>

## 5. Vertex Cover — Maximal-Matching 2-Approximation

### 5.1 Problem

**Vertex Cover** of $G = (V, E)$: a subset $S \subseteq V$ such that every edge has at least one endpoint in $S$. **Goal:** find a minimum-size vertex cover.

**Real-world analogy:** place the fewest CCTV cameras at intersections so that every corridor (edge) is monitored.

### 5.2 Algorithm

**Key insight:** instead of an expensive set-cover-style reduction, build a **maximal matching** and take all endpoints.

- **Matching:** a set of edges with no shared endpoints.
- **Maximal matching:** a matching to which no more edges can be added (greedy stopping point) — not the same as **maximum** matching (largest possible).
- A maximal matching is found *greedily* in polynomial time.

**Approx_Matching_VC**(input: graph $G = (V, E)$)

```
1. Find a maximal matching M in G:
   - M ← ∅
   - For each edge (u, v) in E:
       If neither u nor v is already endpoint of an edge in M,
       add (u, v) to M.
2. Return the set of all endpoints of edges in M.
```

### 5.3 Worked Example and Proof

```
Given graph with 9 vertices:
   1 --- 2 --- 3
   |   / |   / |
   4 --- 5 --- 6
   |   / |   / |
   7 --- 8 --- 9
```

A greedy maximal matching $M$ might pick 6 edges. The algorithm returns all $2 \cdot 6 = 12$ endpoints. If the optimal vertex cover happens to be size 7, the ratio is $12 / 7 \approx 1.71$ — well within the guaranteed $2.0$.

**Approximation Ratio Proof.**

**Claim:** Approx_Matching_VC has approximation ratio $\leq 2.0$.

Let $|M|$ = number of edges in the maximal matching, $\text{OPT}$ = size of the optimal vertex cover.

**Step 1.** $\text{OPT} \geq |M|$.

*Why:* every vertex cover must include at least one endpoint of each matching edge (else that edge is uncovered). Since matching edges share no endpoints, *distinct* vertices are needed for distinct matching edges — at least $|M|$ vertices total.

**Step 2.** $\text{APX} = 2|M|$.

*Why:* the algorithm returns both endpoints of every matching edge — exactly $2|M|$ vertices, all distinct (matching edges share no endpoints).

**Combining:**
$$
\frac{\text{APX}}{\text{OPT}} = \frac{2|M|}{\text{OPT}} \leq \frac{2|M|}{|M|} = 2.0. \qquad \blacksquare
$$

**Complexity.** For each edge we check whether its endpoints are already used → $O(n)$ per edge × $m$ edges → **$O(nm)$**.

---

<br>

## 6. Bin Packing — Four Greedy Heuristics

### 6.1 Problem

Given $n$ items with sizes $s_1, s_2, \dots, s_n$ (each $\leq C$) and bins of capacity $C$, pack all items into the **fewest** bins.

Applications: memory allocation, container loading, disk partitioning, virtual machine packing.

### 6.2 First Fit / Next Fit / Best Fit / Worst Fit

| Method | Strategy |
|--------|----------|
| **First Fit (FF)** | Place each item in the **first bin** that has enough room. |
| **Next Fit (NF)**  | Check **only the most recently used bin**; if it doesn't fit, open a new bin. |
| **Best Fit (BF)**  | Place each item in the bin where it fits with the **least remaining space**. |
| **Worst Fit (WF)** | Place each item in the bin with the **most remaining space**. |

In every method, if no existing bin fits the item, open a new bin.

```
Approx_BinPacking(items s_1, …, s_n, capacity C):
    B = 0
    for i = 1 to n:
        if some existing bin has enough room (per chosen strategy):
            place item i there
        else:
            open a new bin, place item i, B = B + 1
    return B
```

### 6.3 Worked Example

$C = 10$, items $= [7, 5, 6, 4, 2, 3, 7, 5]$.

| Method      | Bin contents                          | Bins used |
|-------------|---------------------------------------|-----------|
| First Fit   | {7,3}, {5,4}, {6,2}, {7}, {5}         | 5         |
| Next Fit    | {7}, {5}, {6,4}, {2,3}, {7}, {5}      | 6         |
| Best Fit    | {7,3}, {5,4}, {6,2}, {7}, {5}         | 5         |
| Worst Fit   | {7,2}, {5,4}, {6,3}, {7}, {5}         | 5         |
| **Optimal** | {7,3}, {5,5}, {6,4}, {7,2}            | **4**     |

### 6.4 Approximation Ratio Proofs

**Claim:** First Fit / Best Fit / Worst Fit all achieve $\rho \leq 2.0$.

**Key observation.** At most **one bin** can be less than half full at the end. *Why:* if two bins were each $<C/2$, their contents would fit together into a single bin — contradicting the greedy "fill the bin as much as possible" strategy of FF/BF/WF.

**Proof.** Let $\text{OPT}'$ = bins used by algorithm, $\text{OPT}$ = optimal. At least $\text{OPT}' - 1$ bins are *more than* half full:

$$
\sum s_i > (\text{OPT}' - 1) \cdot \frac{C}{2}
$$

Trivially, the optimal uses at least $\sum s_i / C$ bins (just by volume), so $\text{OPT} \geq \sum s_i / C$. Combining:

$$
\text{OPT} \geq \frac{\sum s_i}{C} > \frac{\text{OPT}' - 1}{2}
\implies 2 \cdot \text{OPT} > \text{OPT}' - 1
\implies 2 \cdot \text{OPT} \geq \text{OPT}'.
\qquad \blacksquare
$$

**Claim:** Next Fit also achieves $\rho \leq 2.0$, via a slightly different argument.

**Key observation.** For any two *consecutive* bins under Next Fit, the sum of their contents must exceed $C$. *Why:* if the second bin's contents had fit in the first, Next Fit would not have opened the second.

**Proof.** Group consecutive bins into pairs: (bin 1, bin 2), (bin 3, bin 4), ... There are at least $\lceil \text{OPT}' / 2 \rceil$ such pairs, each pair holding more than $C$:

$$
\sum s_i > \frac{\text{OPT}'}{2} \cdot C
\implies \text{OPT} \geq \frac{\sum s_i}{C} > \frac{\text{OPT}'}{2}
\implies 2 \cdot \text{OPT} > \text{OPT}'.
\qquad \blacksquare
$$

**Complexity:**

| Method | Per-item work | Total |
|--------|---------------|-------|
| First Fit  | Scan all bins, $O(n)$ | $O(n^2)$ |
| Best Fit   | Scan all bins, $O(n)$ | $O(n^2)$ |
| Worst Fit  | Scan all bins, $O(n)$ | $O(n^2)$ |
| Next Fit   | Check one bin, $O(1)$ | $O(n)$   |

> **In practice**, sorting items in *decreasing* size first (First Fit Decreasing, Best Fit Decreasing) yields tighter ratios near $11/9$ asymptotically — a deeper analysis beyond this lecture.

---

<br>

## 7. Job Scheduling — Earliest-Finishing-Machine 2-Approximation

### 7.1 Problem

- $n$ jobs with processing times $t_1, t_2, \dots, t_n$.
- $m$ identical machines $M_1, \dots, M_m$.
- Each job runs on exactly one machine without interruption; each machine processes one job at a time.

**Goal:** assign jobs to machines to **minimize the makespan** — the completion time of the last finishing job.

### 7.2 Algorithm and Worked Example

**Algorithm.** When a new job arrives, assign it to the machine that will be free the **earliest**:

```
Approx_JobScheduling(times t_1, …, t_n, m machines):
    for j = 1 to m:
        L[j] = 0                       // current finishing time of machine j
    for i = 1 to n:
        min = 1
        for j = 2 to m:
            if L[j] < L[min]:
                min = j
        assign job i to machine M_min
        L[min] = L[min] + t_i
    return max(L[1], …, L[m])
```

**Worked example.** Jobs $t = [5, 2, 4, 3, 4, 7, 9, 2, 4, 1]$, $m = 4$ machines.

| Job | $t_i$ | Assigned to | Loads after          |
|-----|-------|-------------|----------------------|
| 1   | 5     | M1          | [5, 0, 0, 0]         |
| 2   | 2     | M2          | [5, 2, 0, 0]         |
| 3   | 4     | M3          | [5, 2, 4, 0]         |
| 4   | 3     | M4          | [5, 2, 4, 3]         |
| 5   | 4     | M2          | [5, 6, 4, 3]         |
| 6   | 7     | M4          | [5, 6, 4, 10]        |
| 7   | 9     | M3          | [5, 6, 13, 10]       |
| 8   | 2     | M1          | [7, 6, 13, 10]       |
| 9   | 4     | M2          | [7, 10, 13, 10]      |
| 10  | 1     | M1          | [8, 10, 13, 10]      |

**Makespan (APX) = 13.**

### 7.3 Approximation Ratio Proof

**Claim:** Approx_JobScheduling has approximation ratio $\leq 2.0$.

Let the **last** job assigned (in time order, equivalently the job that determines the makespan) be job $i$, starting at time $T$. Then $\text{APX} = T + t_i$.

**Two lower bounds on OPT:**

1. **Volume bound:** $\text{OPT} \geq \frac{\sum_j t_j}{m}$ — even with perfect load balancing, some machine must run at least the average.
2. **Per-job bound:** $\text{OPT} \geq t_i$ — any schedule must process job $i$ on some machine, taking $t_i$.

**Proof.** Job $i$ was placed on the machine that finished earliest at the time of placement, so $T \leq$ (average finishing time of all machines just before placing $i$) $\leq$ (average over all jobs except $i$, since $i$ was not yet placed):

$$
T \leq \frac{\sum_{j \neq i} t_j}{m} \leq \frac{\sum_j t_j}{m} \leq \text{OPT}.
$$

Combining with $t_i \leq \text{OPT}$:

$$
\text{APX} = T + t_i \leq \text{OPT} + \text{OPT} = 2 \cdot \text{OPT}. \qquad \blacksquare
$$

**Complexity:** for each of $n$ jobs we scan $m$ machine loads to find the minimum → **$O(nm)$**.

> **In practice**, a **Longest Processing Time First (LPT)** variant — sort jobs in decreasing order of $t_i$ before applying the same greedy assignment — achieves a $4/3$ approximation ratio and behaves much better empirically.

---

<br>

## 8. k-Clustering — Farthest-First 2-Approximation

### 8.1 Problem

**k-Clustering Problem.** Given $n$ points in a 2D plane (or any metric space) and an integer $k$, partition the points into **$k$ groups**, each with a designated **center** point. **Goal:** minimize the **maximum cluster diameter** — the diameter of the largest cluster.

Applications: recommendation systems, data mining, VLSI design, parallel processing, web search, pattern recognition, gene analysis, social network analysis.

### 8.2 Algorithm and Worked Example

**Farthest-First Traversal (greedy).** Pick centers one at a time, each time choosing the point **farthest** from all centers chosen so far.

```
Approx_k_Clusters(points x_0, …, x_{n-1}, k > 1):
    C[1] = x_r                            // random first center
    for j = 2 to k:
        for each non-center point x_i:
            D[i] = min distance from x_i to any existing center
        C[j] = the point x_i with the largest D[i]
    Assign each non-center point to its nearest center
    return centers C and cluster assignments
```

**Intuition:** spreading the centers far apart ensures every cluster covers a small area.

**Worked example, $k = 4$.**

- **Step 1:** pick arbitrary $C_1$.
- **Step 2:** compute $D[i]$ for all non-center points; the farthest from $C_1$ becomes $C_2$.
- **Step 3:** for each remaining point, $D[i] = \min(d(x_i, C_1), d(x_i, C_2))$. The point with the largest $D[i]$ becomes $C_3$. (Example: $D[3] = 20$ is the largest → $C_3 = x_3$.)
- **Step 4:** recompute $D[i] = \min(d(x_i, C_1), d(x_i, C_2), d(x_i, C_3))$; the largest defines $C_4$.
- **Step 5:** assign each non-center point to its nearest center.

### 8.3 Approximation Ratio Proof

**Claim:** Approx_k_Clusters has approximation ratio $\leq 2.0$.

**Setup.** After choosing $k$ centers, imagine selecting a **hypothetical $(k+1)$-th center** $C_{k+1}$ using the same farthest-first rule. Let $d$ = distance from $C_{k+1}$ to its nearest already-chosen center.

**Step 1 — $\text{OPT} \geq d$.** We now have $k + 1$ points that must be divided into $k$ optimal groups. By the **pigeonhole principle**, at least one optimal group contains at least two of these $k+1$ "centers". The diameter of *that* group is at least the distance between the two centers it contains, which is at least $d$ (by farthest-first, the smallest such pairwise distance among the $k+1$ centers is $d$). So $\text{OPT} \geq d$.

**Step 2 — $\text{APX} \leq 2d$.** $C_{k+1}$ is the point farthest from any chosen center, so **every** other point is within distance $d$ of its nearest center. Each cluster therefore has radius $\leq d$, and diameter $\leq 2d$.

**Combining:**
$$
2 \cdot \text{OPT} \geq 2d \geq \text{APX}
\implies \frac{\text{APX}}{\text{OPT}} \leq 2.0. \qquad \blacksquare
$$

**Complexity.** Inner loop computes $D[i]$ for $n$ points and $k$ centers → $O(kn)$. Outer loop runs $k - 1$ times → $(k-1) \cdot O(kn) = O(k^2 n)$. Final assignment $O(kn)$. **Total: $O(k^2 n)$.**

### 8.4 Practical Considerations

- **Random first center:** results vary; run multiple times and take the best.
- **Outlier sensitivity:** noisy points distort center selection; preprocess to remove outliers.
- **Heritage:** this is closely related to the **k-center problem**; the algorithm itself is sometimes called **Gonzalez's algorithm** (1985). It inspired the **k-means++** initialization used in modern k-means clustering.

---

<br>

## 9. Approximation Algorithms — Summary Table

| Problem               | Indirect Optimal Bound                              | Ratio    | Time          |
|-----------------------|------------------------------------------------------|----------|---------------|
| **TSP** (Metric)      | $M$ = MST weight ($\text{OPT} > M$)                  | $< 2.0$  | $O(n^2)$ or $O(m \log m)$ |
| **Vertex Cover**      | $|M|$ = maximal-matching size ($\text{OPT} \geq |M|$) | $\leq 2.0$ | $O(nm)$        |
| **Bin Packing (FF/BF/WF)** | $\sum s_i / C$ ($\text{OPT} \geq \sum s_i / C$) | $\leq 2.0$ | $O(n^2)$       |
| **Bin Packing (NF)**  | $\sum s_i / C$                                       | $\leq 2.0$ | $O(n)$         |
| **Job Scheduling**    | $\sum t_i / m$ and $\max t_i$                        | $\leq 2.0$ | $O(nm)$        |
| **k-Clustering**      | Virtual $(k+1)$-th center distance $d$               | $\leq 2.0$ | $O(k^2 n)$     |

All five problems achieve **2-approximation** — solutions at most twice the optimal.

---

<br>

## Summary

| Concept                   | Definition                                                                  |
|---------------------------|------------------------------------------------------------------------------|
| **P**                     | Decision problems solvable in polynomial time                                |
| **NP**                    | Decision problems whose Yes-certificates can be verified in polynomial time  |
| **NP-Hard**               | At least as hard as every problem in NP                                      |
| **NP-Complete**           | In NP **and** NP-Hard                                                        |
| **Reduction** $A \leq_P B$| Transform $A$ to $B$ in poly time, preserving Yes/No                         |
| **Approximation ratio**   | $\text{APX} / \text{OPT}$, proven via an indirect bound on OPT               |

**Key takeaways:**

1. $P \subseteq NP$ trivially. Whether $P = NP$ is the most famous open problem in CS.
2. NP-Completeness is the right vocabulary for *legitimately* declaring a problem "probably hard" — any solution would crack thousands of related problems.
3. **Two-step recipe for NP-Completeness proofs:** (a) show problem is in NP; (b) reduce a known NP-Complete problem to it.
4. Once a problem is NP-Complete, switch to **heuristics**, **approximations**, or **special-case algorithms**.
5. **Approximation ratio** is the gold standard for measuring quality, and the **indirect-optimal technique** is the universal proof template — every 2-approximation proof in this lecture sandwiches OPT between a computable bound and the algorithm's output.
6. All five canonical approximation algorithms (TSP / Vertex Cover / Bin Packing / Job Scheduling / Clustering) achieve **factor-2 guarantees** with simple greedy strategies and clean proofs.

> "If you can't solve it exactly, prove it's hard. If it's hard, approximate it — and prove the approximation."

**Next week:** Approximation Algorithms continued — more refined approximation strategies and PTAS / FPTAS frameworks.

---

<br>

## Self-Check Questions

1. **P vs NP intuition:** Explain in plain English the difference between "P" and "NP" using the words *solve* and *verify*. Why is every problem in P automatically in NP?

   > **Answer:** **P** is the class of decision problems where we can produce the correct Yes/No answer from scratch in polynomial time — we can **solve** them quickly. **NP** is the class where, given a candidate Yes-certificate (a proposed solution), we can **verify** its validity in polynomial time. Every problem in P is in NP because the trivial verifier *ignores the certificate and just re-solves the problem*: if you have a polynomial-time solver, you have a (very lazy) polynomial-time verifier. The reverse inclusion — does fast verification imply fast solving? — is the $P = NP$ question.

2. **Decision vs optimization:** TSP has both forms. State each clearly and explain why NP-Completeness is proved on the decision version, yet hardness still transfers to the optimization version.

   > **Answer:** **Decision version:** "Given weighted complete graph $G$ and bound $K$, does $G$ have a tour of total weight $\leq K$?" — Yes/No. **Optimization version:** "What is the minimum tour weight in $G$?" — a number. NP-Completeness is defined on decision problems because the reduction machinery $A \leq_P B$ requires Yes/No preservation. **Hardness transfers** because solving the optimization version solves the decision version trivially (compute the minimum, compare to $K$) — so the optimization version is *at least as hard* as the decision version. If the decision version is NP-Complete (no polynomial-time algorithm assuming $P \neq NP$), then neither is the optimization version.

3. **Reduction direction:** A student says "Hamiltonian Cycle reduces to TSP, so TSP must be easier than Hamiltonian Cycle." Correct or wrong, and why?

   > **Answer:** **Wrong.** $A \leq_P B$ means $A$ can be solved by transforming to $B$ and using $B$'s algorithm — therefore $B$ is **at least as hard as** $A$. The direction of $\leq_P$ is the same as "no harder than" — *A* is no harder than *B*, equivalently *B* is at least as hard as *A*. Since Hamiltonian Cycle is NP-Complete and reduces to TSP, **TSP is also NP-Hard** (at least as hard as Hamiltonian Cycle). The student inverted the intuition.

4. **LONGEST-PATH proof:** Reproduce the two key directions of the LONGEST-PATH NP-Completeness proof. In particular, why does the reverse direction need the weight-1 trick?

   > **Answer:** **Forward (HAM-PATH-2-POINTS → LONGEST-PATH):** if $G$ has a Hamiltonian path from $s$ to $t$, then in the transformed graph (every edge weight 1, $K = |V| - 1$) that same path has $|V| - 1$ edges of weight 1 = total weight $|V| - 1 \geq K$ — Yes-instance of LONGEST-PATH. **Reverse (LONGEST-PATH → HAM-PATH-2-POINTS):** a simple $s \to t$ path in the transformed graph of weight $\geq |V| - 1$ has $\geq |V| - 1$ edges. A *simple* path can have at most $|V| - 1$ edges (it visits each vertex at most once). So it has *exactly* $|V| - 1$ edges and visits all $|V|$ vertices — a Hamiltonian path. **The weight-1 trick** is what links "path length" (a weight sum) to "number of edges" (a count), so $K = |V| - 1$ forces *every* vertex to be visited. Without uniform weights, the reverse direction would fail — a long path could just be a heavy short path.

5. **Pseudo-polynomial paradox:** 0-1 Knapsack has a DP solution in $O(nC)$, yet is NP-Complete. Resolve the apparent contradiction.

   > **Answer:** "Polynomial time" in NP-Completeness theory means polynomial in the **bit-length of the input**, not polynomial in the numerical values. The capacity $C$ is encoded in $\log_2 C$ bits in the input, so $O(nC)$ is exponential in the input bit-length: $O(n \cdot 2^{\log_2 C})$. This is called **pseudo-polynomial** — polynomial in the *value* of $C$, exponential in the *encoding* of $C$. Real-world instances with small $C$ (say $C \leq 10^6$) are solvable fast by the DP, but instances with $C \approx 2^{100}$ are not — and the NP-Completeness proof works by constructing instances with exponentially large $C$. NP-Completeness is about the worst case over all input bit-lengths.

6. **2-SAT vs 3-SAT:** Why is 2-SAT in P but 3-SAT NP-Complete? What property changes between the two?

   > **Answer:** **2-SAT** can be expressed as an implication graph: a clause $(a \lor b)$ is equivalent to $\overline{a} \implies b$ and $\overline{b} \implies a$. Building this graph and finding **strongly connected components** (Week 12, Kosaraju!) gives a poly-time algorithm — the formula is satisfiable iff no variable and its negation lie in the same SCC. **3-SAT** has no such reduction: a 3-clause $(a \lor b \lor c)$ encodes a *choice* with three options, not a binary implication. That extra degree of freedom is exactly the **nondeterminism** that NP captures — once each clause has $\geq 3$ literals, the problem becomes capable of encoding arbitrary NP computation. The boundary is razor-thin, and identifying *why* extra freedom makes problems NP-Hard is a deep theme in complexity theory.

7. **Approximation ratio via indirect optimal:** State why the proof "$\text{APX} \leq 2 \cdot \text{OPT}$" never directly compares APX with OPT, and how the indirect bound $L$ acts as a substitute.

   > **Answer:** OPT is what we cannot compute — the whole point of approximation is to *avoid* computing it. So the proof sandwiches OPT between two quantities we *can* control: (1) a polynomial-time computable bound $L$ that we can prove satisfies $L \leq \text{OPT}$ (for minimization); and (2) the algorithm's output APX, for which we can prove $\text{APX} \leq c \cdot L$. Combining gives $\text{APX} \leq c \cdot L \leq c \cdot \text{OPT}$ — without ever computing OPT. The indirect bound $L$ is the workhorse: every 2-approximation proof in §4–§8 plugs in a different choice of $L$ (MST weight, matching size, volume bound, average load, virtual $(k+1)$-th center distance).

8. **TSP triangle inequality:** Where exactly in the Approx_MST_TSP proof do we use the triangle inequality? What goes wrong without it?

   > **Answer:** The triangle inequality is used in **Step 2 of the algorithm** (shortcutting) and in **Step 2 of the proof** ($\text{APX} \leq 2M$). When we replace a sub-path "$x \to y \to z$" in the DFS traversal with the direct edge "$x \to z$", we need $d(x, z) \leq d(x, y) + d(y, z)$ — otherwise the shortcut might be *longer* than the path it replaces, and the $\text{APX} \leq 2M$ bound fails. **Without triangle inequality:** General TSP cannot be approximated within any constant factor unless $P = NP$ — you can construct instances where the gap between MST-shortcut and optimal is arbitrarily bad. Metric TSP is the "nice" case where the triangle inequality makes the shortcut safe.

9. **Vertex Cover ratio is tight:** Show that the maximal-matching algorithm can actually return a vertex cover *exactly* twice the size of the optimum (so the 2-bound cannot be improved by this algorithm).

   > **Answer:** Consider a graph that is just $k$ disjoint edges — a perfect matching of size $k$ with no shared vertices. The optimal vertex cover picks one endpoint per edge → size $k$. The algorithm picks all $k$ edges as the maximal matching → returns $2k$ endpoints. Ratio = $2k / k = 2.0$ **exactly**. So the 2-approximation is tight: no improvement to this algorithm gets below 2. To beat 2 for vertex cover would require a fundamentally different approach (and indeed, achieving a $(2 - \epsilon)$-approximation for any constant $\epsilon > 0$ is conjectured to be NP-Hard under the Unique Games Conjecture).

10. **Bin Packing First Fit Decreasing (FFD):** Why does sorting items in decreasing size *before* applying First Fit yield a better ratio in practice? Give the intuition; no proof needed.

    > **Answer:** First Fit on a random order can pack small items into bins early, leaving no room for the large items later — forcing them into their own near-empty bins. Sorting **decreasing first** places the large items first, where bins have lots of room, then fills the residual gaps with the small items — exactly the role small items are good at. Asymptotically, FFD achieves $11/9 \cdot \text{OPT} + O(1)$ instead of FF's $1.7 \cdot \text{OPT}$. The intuition generalizes: in many greedy approximations, **processing the "lumpy" items first** lets the small items act as filler, dramatically improving packing efficiency.

11. **Job Scheduling LPT improvement:** Sketch why scheduling jobs in **longest processing time first** order achieves a $4/3$ approximation instead of $2$.

    > **Answer:** With LPT, by the time we get to the "last" job that determines the makespan, that job has processing time $\leq t_n$ where $t_n$ is the *smallest* job time. The previous proof bounded $T + t_i$ by $\text{OPT} + \text{OPT}$, treating $t_i$ as possibly the largest job. But with LPT, $t_i$ (the job that triggers the makespan) is *small* — at most $\text{OPT}/3$ if at least 3 jobs total exceed $\text{OPT}/3$ would have to be placed earlier, contradiction. Detailed case analysis gives $\text{APX} \leq (4/3) \cdot \text{OPT}$. Conceptually: putting large jobs first lets the small jobs serve as load-balancing slack at the end, where mismatches matter less.

12. **k-Clustering pigeonhole:** Spell out the pigeonhole step in the $\text{OPT} \geq d$ argument with $k = 3$ and 4 hypothetical centers.

    > **Answer:** We have $k = 3$ chosen centers $C_1, C_2, C_3$ plus a hypothetical $C_4$ — total 4 "centers". The optimal solution partitions all points into 3 clusters. By **pigeonhole**, distributing 4 items into 3 bins forces at least one bin to contain $\geq 2$ items — i.e., some optimal cluster contains at least 2 of $\{C_1, C_2, C_3, C_4\}$. The diameter of that cluster is at least the distance between the two centers it contains, which by farthest-first construction is $\geq d$ (the smallest pairwise distance among the four). Therefore the maximum cluster diameter $\geq d$, and $\text{OPT} \geq d$.
