# Week 13 Lecture — NP-Completeness and Approximation Algorithms

[Repository Guide](../../README.md) | [English](Concepts_Lecture.md) | [한국어](Concepts_Lecture.ko.md)

> **Last Updated:** 2026-10-27
>
> Introduction to Algorithms, Cormen, Leiserson, Rivest, and Stein, Ch 34, 35

> **Learning Objectives:**
> 1. Distinguish **tractable** (polynomial time) from **intractable** problems, **decidable** from **undecidable** problems, and **decision** problems (Yes/No) from **optimization** problems, and explain why NP-Completeness is stated on decision problems
> 2. State the definitions of **P** and **NP**, articulate the *verify vs solve* intuition, and list several **famous NP-Complete problems** (SAT, Subset Sum, Partition, 0-1 Knapsack, Vertex Cover, Independent Set, Clique, Graph Coloring, Longest Path, Set Cover, TSP, Hamiltonian Cycle, Bin Packing, Job Scheduling)
> 3. Define **polynomial-time reduction** $A \leq_P B$ and use it to transfer hardness, and define **NP-Hard** and **NP-Complete**
> 4. Apply the **two-step recipe** (in NP + reduction from a known NP-Complete problem) to prove NP-Completeness of a new problem, and reproduce the **LONGEST-PATH is NP-Complete** proof and sketch the **3-SAT $\leq_P$ CLIQUE** reduction
> 5. Decide what to do in practice when a problem is proven NP-Complete (heuristics, approximation, special cases), and explain what an approximation algorithm guarantees in exchange for giving up optimality

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
  - [2.3 P vs NP: The Million-Dollar Question](#23-p-vs-np-the-million-dollar-question)
  - [2.4 Polynomial-Time Reduction](#24-polynomial-time-reduction)
  - [2.5 Reduction Examples](#25-reduction-examples)
  - [2.6 NP-Hard and NP-Complete: Definitions](#26-np-hard-and-np-complete-definitions)
  - [2.7 How to Prove NP-Completeness](#27-how-to-prove-np-completeness)
  - [2.8 Proof: LONGEST-PATH is NP-Complete](#28-proof-longest-path-is-np-complete)
  - [2.9 Sketch: 3-SAT $\leq_P$ CLIQUE](#29-sketch-3-sat-leq_p-clique)
  - [2.10 The Reduction Chain](#210-the-reduction-chain)
  - [2.11 Counterintuitive Boundaries](#211-counterintuitive-boundaries)
  - [2.12 What "NP-Complete" Means in Practice](#212-what-np-complete-means-in-practice)
- [3. Approximation Algorithms](#3-approximation-algorithms)
- [Summary](#summary)
- [Self-Check Questions](#self-check-questions)

---

<br>

## 1. Problem Complexity Classes

### 1.1 Why NP-Completeness Theory Matters

Suppose your boss gives you a problem that no efficient algorithm seems to crack. There are three possible answers.

- **Scenario 1:** *"I cannot find an efficient algorithm. I am not smart enough."* This answer is merely embarrassing.
- **Scenario 2:** *"I cannot find an efficient algorithm, because no such algorithm exists."* This is the strongest answer, but proving non-existence is hard.
- **Scenario 3 (NP-Complete):** *"I cannot find an efficient algorithm, but neither could thousands of brilliant people over more than 50 years for hundreds of related problems."* This answer is professionally defensible.

> **Key Point:** The whole point of NP-Completeness theory is to upgrade Scenario 1 to Scenario 3. It gives a *legitimate*, *theory-grounded* reason to stop searching for an exact polynomial-time solution and pivot to heuristics or approximations.

### 1.2 Classification of Problems

```text
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

*Figure 1. Classification of problems by decidability and time complexity*

> **Note:** **Important distinction.** Intractable is not the same as unsolvable (intractable ≠ unsolvable). Intractable problems *have* algorithms; those algorithms just do not run in polynomial time. Unsolvable problems have *no* algorithm at all. The Halting Problem is undecidable regardless of how much time is allowed.

### 1.3 Tractable Time = Polynomial Time

**Polynomial time:** for input size $n$, the running time is bounded by $O(n^k)$ for some constant $k$.

| Tractable (Polynomial) | Intractable (Super-polynomial)  |
|------------------------|---------------------------------|
| $O(\log n)$            | $O(2^n)$ (exponential)          |
| $O(n)$                 | $O(n!)$ (factorial)             |
| $O(n \log n)$          | $O(n^n)$                        |
| $O(n^2), O(n^3)$       |                                 |

*Table 1. Examples of tractable and intractable time complexities*

> **Note:** **Convention.** A problem is efficiently solvable **if and only if** a polynomial-time algorithm exists for it. This convention is the Cobham-Edmonds thesis. The boundary is deliberately coarse, but it works for theoretical purposes because the polynomial class is robust to changes in the computational model.

### 1.4 Famous NP-Complete Problems

The following problems motivate the rest of this note. Each is NP-Complete; the proofs come later, or follow by reduction from one of these.

**SAT (Boolean Satisfiability).** Given Boolean variables connected by OR ($\lor$) within clauses, the clauses connected by AND ($\land$), find an assignment satisfying every clause.

$$(\overline{w} \lor x) \land (w \lor y) \land (\overline{x} \lor \overline{y} \lor z)$$

- The formula above is satisfied by $w = T, x = T, y = F$ regardless of the value of $z$.
- $(x) \land (\overline{x})$ is **unsatisfiable**.
- SAT is the **first problem proven NP-Complete** (Cook, 1971; independently Levin, 1973).

**Subset Sum.** Given a set $S$ of integers and target $K$, does a subset of $S$ sum to exactly $K$?
- For $S = \{20, 30, 40, 80, 90\}$ and $K = 200$, the subset $\{30, 80, 90\}$ works.

**Partition.** Given $S$, can it be split into two subsets with equal sum?
- $S = \{20, 30, 40, 80, 90\}$ (total 260) splits into $\{20, 30, 80\}$ and $\{40, 90\}$ (each 130).
- Subset Sum reduces to Partition in polynomial time.

**0-1 Knapsack (decision version).** We are given a capacity $C$ and items with weights $w_i$ and values $v_i$. Is there a subset with total weight $\leq C$ and total value $\geq K$?

| Item | Weight | Value |
|------|--------|-------|
| 1    | 12 kg  | 20    |
| 2    | 8 kg   | 10    |
| 3    | 6 kg   | 15    |
| 4    | 5 kg   | 25    |

*Table 2. Weights and values of the items in the 0-1 Knapsack example*

- For $C = 20$, items $\{2, 3, 4\}$ weigh 19 and have value 50.
- **Why is it NP-Complete despite the DP?** The Week 6 DP solution runs in $O(nC)$. But $C$ can be encoded in $\log C$ bits, so the DP is *pseudo-polynomial*: polynomial in the *value* of $C$, but exponential in its *bit-length*.

**Graph problems:**

- **Vertex Cover.** Find the smallest set of vertices touching every edge.
- **Independent Set.** Find the largest set of pairwise non-adjacent vertices.
- **Clique.** Find the largest complete subgraph.
- **Graph Coloring.** Find the fewest colors such that adjacent vertices get different colors.
- **Longest Path.** Is there a simple $s \to t$ path of length $\geq K$? This problem is surprisingly NP-Complete (compare with Shortest Path, which is in P).
- **Set Cover.** Find the fewest subsets whose union equals the universe.

> **Note:** **Beautiful relationship.** In graph $G = (V, E)$, $S$ is a vertex cover **iff** $V \setminus S$ is an independent set. A clique in $G$ corresponds to an independent set in the complement graph $\overline{G}$. Many NP-Complete problems sit on opposite sides of trivial dualities like this.

**Tour-style problems:**

- **TSP.** Given a weighted complete graph, find the shortest Hamiltonian cycle.
- **Hamiltonian Cycle.** Does the graph have *any* Hamiltonian cycle? This problem reduces to TSP: give weight 1 to the edges of the original graph and a large weight to the edges not in it (Section 2.5).
- **Bin Packing.** Pack $n$ items into the fewest bins of capacity $C$.
- **Job Scheduling.** Assign $n$ jobs to $m$ identical machines to minimize the **makespan**. The makespan is the completion time of the last-finishing machine, equivalently the completion time of the last-finishing job.

### 1.5 Decision vs Optimization Problems

| Aspect                     | Decision Problem                          | Optimization Problem        |
|----------------------------|-------------------------------------------|-----------------------------|
| **Answer**                 | Yes or No                                 | The best solution           |
| **Example (TSP)**          | Is there a tour of length $\leq K$?       | What is the shortest tour length? |
| **Example (Shortest Path)**| Is there a path of length $\leq 100$?     | What is the shortest path length? |

*Table 3. Comparison of decision and optimization problems*

**Why NP-Completeness is stated on decision problems:**

- The reduction machinery is cleanest when answers are Yes/No.
- The optimization version is **at least as hard** as the decision version. If you can find the length of the shortest tour, you can trivially answer whether it is at most $K$.
- So hardness of the decision version *implies* hardness of the optimization version, but the converse does not follow cleanly. Stating hardness on the decision form is therefore the strongest, tightest claim.

---

<br>

## 2. P, NP, and NP-Completeness Theory

### 2.1 The Class P

**P** is the set of decision problems solvable by a **deterministic** algorithm in **polynomial time**.

- Given any input of size $n$, the algorithm outputs Yes or No in $O(n^k)$ time for some fixed $k$.

**Examples in P:**

- Is a graph connected? BFS or DFS answers in $O(V + E)$.
- With nonnegative edge weights, is there a shortest path from $u$ to $v$ of length $\leq K$? Dijkstra's algorithm answers in $O(V^2)$ or $O((V+E) \log V)$.
- Can we sort $n$ numbers in $\leq T$ comparisons? Merge sort sorts them in $O(n \log n)$.
- Is there a minimum spanning tree of weight $\leq K$? Kruskal's algorithm answers in $O(E \log E)$.

> **Note:** Most algorithms studied in Weeks 1-12 solve problems in **P** in polynomial time. The exception is the Week 6 0-1 Knapsack DP, which runs in pseudo-polynomial time $O(nC)$; the decision version of 0-1 Knapsack is NP-Complete (Section 1.4).

### 2.2 The Class NP

**NP** stands for **N**ondeterministic **P**olynomial time.

A decision problem is in NP if, given a **Yes certificate** (a proposed solution), we can **verify in polynomial time** whether the certificate is valid.

> **Caution:** **Common confusion.** NP does **not** stand for non-polynomial. It stands for *nondeterministic polynomial*, the class of problems solvable in polynomial time by an idealized **nondeterministic** machine. Equivalently, these are problems whose Yes-answer admits polynomial-time **verification**.

> **Note:** **What nondeterministic means here.** The historical definition imagines a machine that, at each step, guesses one of several next moves and accepts if *some* sequence of guesses leads to a Yes. This is effectively trying all certificates in parallel. This note uses the **equivalent verifier/certificate definition** throughout: given a certificate, check it in polynomial time. The two definitions describe the same class, so nondeterministic is just **historical naming** here. You can read NP as the class of polynomially verifiable problems.

> **[Theory of Computation]** Theory of Computation encodes decision problems as languages, which are sets of strings, and defines P as the class of languages accepted in polynomial time by a deterministic Turing machine and NP as the class accepted in polynomial time by a nondeterministic Turing machine. The verifier definition used in this note gives the same class as that formal definition, and the undecidability of Section 1.2 and Cook's theorem of Section 2.10 are also stated rigorously on the same Turing machine model.

**Intuitive characterization:**

- **P** is the class of problems we can **solve** quickly.
- **NP** is the class of problems we can **verify** quickly.

**Examples in NP:**

- **Hamiltonian Cycle:** the certificate is a vertex sequence. Checking that all vertices appear once and each consecutive pair is connected by an edge takes $O(V)$.
- **SAT:** the certificate is a True/False assignment. Plugging it in and checking each clause takes $O(m \cdot k)$ for $m$ clauses with $k$ literals each.
- **Subset Sum:** the certificate is a subset. Summing it and comparing to $K$ takes $O(n)$.

> **Key Point:** Showing a problem is in NP is usually easy; it is essentially a formality in NP-Completeness proofs. The hard part is showing NP-Hardness.

### 2.3 P vs NP: The Million-Dollar Question

```text
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

*Figure 2. The two possibilities P ≠ NP and P = NP*

- $P \subseteq NP$ trivially: if you can solve in polynomial time, you can verify in polynomial time by just re-running.
- Whether $P = NP$ or $P \neq NP$ is the **most famous open problem in computer science**.
- The **Clay Millennium Prize** offers one million dollars for a proof either way.
- The overwhelming consensus of researchers is $P \neq NP$, but this is *not* proven.

> **Note:** **Why anyone cares.** If $P = NP$, every problem in NP (factoring, SAT, TSP, vertex cover, and every NP-Complete problem) becomes solvable in polynomial time. Present-day cryptography loses the basis of its security. Optimal everything becomes possible: planning, scheduling, drug discovery. Plenty of researchers spend their careers trying to prove $P \neq NP$; nobody has succeeded.

### 2.4 Polynomial-Time Reduction

Polynomial-time reduction is the single most important construction in this topic.

![Figure 3. Polynomial-time reduction diagram](../../images/Week13_ch34_p05.png)

*Figure 3. Polynomial-time reduction diagram*

**Definition.** Problem $A$ **reduces to** problem $B$ (written $A \leq_P B$) if there is a function $f$ such that:

1. $f$ transforms every instance $\alpha$ of $A$ into an instance $f(\alpha) = \beta$ of $B$ **in polynomial time**.
2. $\alpha$ is a Yes-instance of $A$ **if and only if** $f(\alpha)$ is a Yes-instance of $B$.

**Consequence:** if $A \leq_P B$ and $B$ is solvable in polynomial time, then $A$ is also solvable in polynomial time. We solve $A$ by transforming its input to $B$ and asking $B$'s algorithm.

The **contrapositive** drives NP-Completeness: if $A$ is *hard* and $A \leq_P B$, then $B$ is also *hard*. Otherwise, solving $B$ efficiently would solve $A$ efficiently, a contradiction.

### 2.5 Reduction Examples

**Example 1 (number theory, toy example):**

- **Problem 1:** Is integer $x = x_1 x_2 \dots x_n$ (digit representation) divisible by 3?
- **Problem 2:** Is $x_1 + x_2 + \dots + x_n$ divisible by 3?

The two problems have identical answers for every input (the standard digit-sum divisibility rule). The transformation extracts the digits and sums them in $O(n)$. Problem 2 is trivially easy, so Problem 1 is too. That is, $\text{Problem 1} \leq_P \text{Problem 2}$.

**Example 2 (HAM-CYCLE $\leq_P$ TSP):**

- **HAM-CYCLE:** given graph $G = (V, E)$, does $G$ have a Hamiltonian cycle?
- **TSP (decision):** given weighted complete graph $G'$ and bound $K$, does $G'$ have a Hamiltonian cycle of total weight $\leq K$?

**Transformation:** take the HAM-CYCLE input $G$ and build a complete graph $G'$ on the same vertices. The edge weights are as follows.

```text
  HAM-CYCLE instance          TSP instance
  (4 vertices, 5 edges)       (complete, all 6 edges weighted)

    a --- b                    a --1-- b
    |   / |        ===>        |1\∞ /1 |1
    |  /  |                    |  \/   |
    c --- d                    c --1-- d

  Edge of G        → weight 1                Set K = |V|
  Edge NOT in G    → weight ∞ (or 2|V|)
```

*Figure 4. Transforming a HAM-CYCLE instance into a TSP instance*

- The only edge missing from $G$ in the figure is the one joining $a$ and $d$, so in $G'$ only that edge has weight ∞ (or $2|V|$) and the other five edges have weight 1.
- $G$ has a Hamiltonian cycle **iff** $G'$ has a tour of weight $\leq |V|$.
- The transformation takes $O(V^2)$, which is polynomial.

So $\text{HAM-CYCLE} \leq_P \text{TSP}$. Since HAM-CYCLE is known to be NP-Complete, this proves TSP is NP-Hard.

### 2.6 NP-Hard and NP-Complete: Definitions

**NP-Hard.** $A$ is NP-Hard if **every** problem in NP reduces to $A$:

$$\text{For every } L \in NP: \quad L \leq_P A.$$

In words, $A$ is **at least as hard as every problem in NP**. Crucially, $A$ does **not** need to be in NP itself. The Halting Problem is NP-Hard but is outside NP because it is undecidable.

![Figure 5. P, NP, NPC Venn diagram](../../images/Week13_ch34_p23.png)

*Figure 5. P, NP, NPC Venn diagram*

**NP-Complete.** $A$ is NP-Complete if it satisfies both conditions:

1. $A \in NP$ (Yes-certificates are polynomial-time verifiable), **AND**
2. $A$ is NP-Hard.

```text
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

*Figure 6. Schematic of the relationship among P, NP, NP-Complete, and NP-Hard*

- **NP-Complete = NP ∩ NP-Hard.**
- An NP-Complete problem is NP-Hard by definition, so calling it NP-Hard is also true, but less informative because it omits membership in NP.
- Generalized chess in the figure is EXPTIME-complete and therefore NP-Hard. However, since NP ≠ EXPTIME has not been proven, the claim that generalized chess lies outside NP is widely believed but not proven.

> **Note:** Figure 6 draws all of NP inside the NP-Hard box, but the two classes actually overlap only in their intersection, NP-Complete. If $P \neq NP$, no problem in P is NP-Hard.

### 2.7 How to Prove NP-Completeness

**Two-step recipe.**

**Step 1:** Show $A \in NP$.
- Describe a polynomial-time verification algorithm for a Yes-certificate of $A$.
- Usually a few lines suffice; this is the easy part.

**Step 2:** Show $A$ is NP-Hard.
- Pick a known NP-Hard (or NP-Complete) problem $C$.
- Construct a polynomial-time reduction $C \leq_P A$.
- Prove the Yes/No answers are preserved **in both directions**.

```text
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

*Figure 7. How a polynomial-time reduction preserves Yes/No answers*

By transitivity of $\leq_P$, since *every* NP problem reduces to $C$ and $C$ reduces to $A$, *every* NP problem reduces to $A$. Therefore $A$ is NP-Hard. Combined with $A \in NP$, $A$ is NP-Complete.

### 2.8 Proof: LONGEST-PATH is NP-Complete

**Definitions.**

- **HAM-PATH-2-POINTS:** given $G = (V, E)$ and vertices $s, t$, does $G$ have a Hamiltonian path from $s$ to $t$? This problem is *known to be NP-Complete*.
- **LONGEST-PATH:** given weighted $G = (V, E)$, vertices $s, t$, and constant $K$, does a simple path from $s$ to $t$ of total weight $\geq K$ exist?

**Step 1: LONGEST-PATH $\in$ NP.**
- *Certificate:* a sequence of vertices forming a path from $s$ to $t$.
- *Verification:* check that the sequence starts at $s$, ends at $t$, and repeats no vertex, check that consecutive pairs are edges in $E$, then sum the weights and confirm the sum $\geq K$.
- *Time:* $O(|V|)$.

**Step 2: HAM-PATH-2-POINTS $\leq_P$ LONGEST-PATH.**

*Transformation.* Given HAM-PATH-2-POINTS instance $G = (V, E)$ with endpoints $s, t$, do the following.
- Copy $G$ unchanged and assign **weight 1** to every edge.
- Set $K = |V| - 1$.

```text
  HAM-PATH-2-POINTS instance         LONGEST-PATH instance

  s --- a --- b                       s -1- a -1- b
  |           |          ═══>         |           |
  c --- d --- t                       c -1- d -1- t

  "Hamiltonian s→t path?"             "Simple s→t path of weight ≥ |V|-1 ?"
```

*Figure 8. Transforming a HAM-PATH-2-POINTS instance into a LONGEST-PATH instance*

**Forward direction.** A Hamiltonian $s \to t$ path visits all $|V|$ vertices and uses $|V| - 1$ edges, so in the transformed instance it has total weight $|V| - 1 = K$. So a Yes-instance of HAM-PATH becomes a Yes-instance of LONGEST-PATH.

**Reverse direction.** A simple $s \to t$ path of weight $\geq |V| - 1$ in the transformed graph has $\geq |V| - 1$ edges. A simple path has at most $|V| - 1$ edges, so it has *exactly* $|V| - 1$ edges and visits *all* $|V|$ vertices. That is, it is a Hamiltonian $s \to t$ path.

The transformation is $O(|E|)$. Therefore LONGEST-PATH is NP-Hard, and combined with Step 1, **LONGEST-PATH is NP-Complete**. $\blacksquare$

### 2.9 Sketch: 3-SAT $\leq_P$ CLIQUE

**3-SAT.** Given a CNF formula where every clause has exactly 3 literals, is there a satisfying assignment?

**CLIQUE.** Does graph $G$ contain a complete subgraph of size $k$?

**Reduction.** Given a 3-SAT instance with $m$ clauses, build a graph $G_\phi$ as follows.

- For each literal in each clause, create a vertex (three per clause, $3m$ vertices total).
- Add an edge between two vertices, except in the following cases.
  - The two vertices are in the **same clause**.
  - The two vertices are **contradictory**, like $x_i$ and $\overline{x_i}$.
- Set $k = m$ (the number of clauses).

![Figure 9. 3-SAT to CLIQUE reduction graph construction](../../images/Week13_ch34_p41.png)

*Figure 9. 3-SAT to CLIQUE reduction graph construction*

**Why it works.** A clique of size $m$ in $G_\phi$ selects one literal per clause because no two same-clause vertices are connected, and it selects them without contradictions because no $x_i / \overline{x_i}$ pair is connected. Setting every literal in the clique to True satisfies every clause. Conversely, if a satisfying assignment chooses one true literal per clause, that choice forms a clique.

The construction is polynomial. So $\text{3-SAT} \leq_P \text{CLIQUE}$, and CLIQUE is NP-Hard.

### 2.10 The Reduction Chain

The first NP-Completeness proof was the one Cook (1971) gave for **SAT** *directly* from the definition of NP. It shows that a polynomial-time nondeterministic Turing machine can be simulated by a Boolean formula.

![Figure 10. NP-Completeness reduction chain](../../images/Week13_ch34_p40.png)

*Figure 10. NP-Completeness reduction chain*

Subsequent NP-Completeness proofs reuse Cook's result by **reducing from a known NP-Complete problem**.

```text
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

*Figure 11. Reduction chain from CIRCUIT-SAT to TSP and SUBSET-SUM*

Today, **thousands** of problems are known to be NP-Complete. **If you could solve any single one of them in polynomial time, all of them would be solvable in polynomial time.** They are completely interlocked.

### 2.11 Counterintuitive Boundaries

Some problems that *look* similar have vastly different complexities.

| Problem                                              | Complexity   | Algorithm                  |
|------------------------------------------------------|--------------|----------------------------|
| **Shortest Path**                                    | P            | Dijkstra $O(V^2)$          |
| **Longest Path**                                     | NP-Complete  | no known poly-time algorithm |
| **Euler Circuit** (visit every **edge** once)        | P            | Hierholzer $O(E)$          |
| **Hamiltonian Cycle** (visit every **vertex** once)  | NP-Complete  | no known poly-time algorithm |
| **2-SAT**                                            | P            | Implication graph $O(n+m)$ |
| **3-SAT**                                            | NP-Complete  | no known poly-time algorithm |
| **2-Coloring**                                       | P            | BFS / DFS $O(V+E)$         |
| **3-Coloring**                                       | NP-Complete  | no known poly-time algorithm |

*Table 4. Pairs of similar-looking problems with different complexities*

> **Key Point:** The boundary between P and NP-Complete can be surprisingly thin. Changing a single constraint (vertices instead of edges, 3 instead of 2 literals per clause, longest instead of shortest) flips a polynomial-time problem into one for which no efficient algorithm is known. There is something deep here, and what makes a problem hard is still an active research area.

### 2.12 What "NP-Complete" Means in Practice

When your problem is proven NP-Complete, respond as follows.

1. **Stop searching for an exact polynomial-time algorithm.** Nobody has found one for any NP-Complete problem in more than 50 years, and finding one now is very unlikely.
2. **Use heuristics.** Heuristics are algorithms that find good (sometimes optimal) solutions on practical instances without quality guarantees.
3. **Use approximation algorithms.** These are polynomial-time algorithms with provable bounds on solution quality, introduced in Section 3.
4. **Use special-case solvers.** Many NP-Complete problems become polynomial on restricted inputs such as trees, planar graphs, and bounded-treewidth graphs.

> **Note:** **Leonid Levin's remark.** Leonid Levin, co-discoverer of NP-Completeness independently of Cook, remarked: "Sometimes it is useful to know that something is impossible."

---

<br>

## 3. Approximation Algorithms

NP-Complete problems appear everywhere, in routing, scheduling, packing, covering, and clustering, yet no way is known to find their optimal solutions in polynomial time. An **approximation algorithm** gives up optimality but runs in polynomial time, and unlike a heuristic it comes with a provable guarantee, the **approximation ratio**, that the value of its solution is within a fixed factor of the optimum. Week 14 covers the approximation ratio, the indirect-optimal technique for proving it, and the 2-approximation algorithms for TSP, Vertex Cover, Bin Packing, Job Scheduling, and k-Clustering.

---

<br>

## Summary

| Concept | Key Summary |
|---------|-------------|
| P | P is the class of decision problems solvable by a deterministic algorithm in polynomial time. |
| NP | NP is the class of decision problems whose Yes-certificates can be verified in polynomial time; $P \subseteq NP$ trivially, and whether $P = NP$ is the most famous open problem in computer science. |
| NP-Hard | An NP-Hard problem is one to which every problem in NP reduces in polynomial time, so it is at least as hard as every problem in NP. |
| NP-Complete | An NP-Complete problem is in NP and NP-Hard, and since solving one would crack thousands of related problems, it is the right vocabulary for legitimately declaring a problem probably hard. |
| Reduction $A \leq_P B$ | A reduction transforms instances of $A$ into instances of $B$ in polynomial time while preserving Yes/No answers. |
| NP-Completeness proof | NP-Completeness is proved by the two-step recipe of showing the problem is in NP and reducing a known NP-Complete problem to it. |
| Handling NP-Complete problems | Once a problem is proven NP-Complete, switch to heuristics, approximations, or special-case algorithms. |
| Approximation algorithm | An approximation algorithm gives up optimality in exchange for polynomial time and a provable approximation-ratio guarantee, and Week 14 covers it in detail. |
| Overall approach | If a problem cannot be solved exactly, prove it is hard, and if it is hard, approximate it and prove the quality of the approximation. |

---

<br>

## Self-Check Questions

1. **P vs NP intuition:** Explain in plain English the difference between P and NP using the words *solve* and *verify*. Why is every problem in P automatically in NP?

   <details>
   <summary>Answer</summary>

   **P** is the class of decision problems where we can produce the correct Yes/No answer from scratch in polynomial time. We can **solve** them quickly. **NP** is the class where a candidate Yes-certificate (a proposed solution) can be **verified** in polynomial time. Every problem in P is in NP because a verifier can ignore the certificate and solve the problem again. The reverse question, whether fast verification implies fast solving, is the $P = NP$ question.

   </details>

2. **Decision vs optimization:** TSP has both forms. State each clearly and explain why NP-Completeness is proved on the decision version, yet hardness still transfers to the optimization version.

   <details>
   <summary>Answer</summary>

   The **decision version** asks whether, given a weighted complete graph $G$ and bound $K$, $G$ has a tour of total weight $\leq K$. Its answer is Yes or No. The **optimization version** asks for the minimum tour weight in $G$. NP-Completeness is defined for decision problems because reductions $A \leq_P B$ must preserve Yes/No answers. **Hardness transfers** because solving the optimization problem lets us compare the minimum with $K$ and answer the decision problem. Thus the optimization version is at least as hard. If the decision version is NP-Complete, the optimization version has no polynomial-time algorithm assuming $P \neq NP$.

   </details>

3. **Reduction direction:** A student says "Hamiltonian Cycle reduces to TSP, so TSP must be easier than Hamiltonian Cycle." Is this correct or wrong, and why?

   <details>
   <summary>Answer</summary>

   **Wrong.** $A \leq_P B$ means we can solve $A$ by transforming it to $B$ and using an algorithm for $B$. Therefore, $B$ is **at least as hard as** $A$. The reduction direction also says that $A$ is no harder than $B$. Since Hamiltonian Cycle is NP-Complete and reduces to TSP, **TSP is NP-Hard**. TSP is at least as hard as Hamiltonian Cycle. The student reversed the relationship.

   </details>

4. **LONGEST-PATH proof:** Reproduce the two key directions of the LONGEST-PATH NP-Completeness proof. In particular, why does the reverse direction need the weight-1 trick?

   <details>
   <summary>Answer</summary>

   **Forward (HAM-PATH-2-POINTS → LONGEST-PATH):** suppose $G$ has a Hamiltonian path from $s$ to $t$. In the transformed graph every edge has weight 1 and $K = |V| - 1$. That path has $|V| - 1$ edges, so its total weight is $|V| - 1 = K$. Therefore it is a Yes-instance of LONGEST-PATH. **Reverse (LONGEST-PATH → HAM-PATH-2-POINTS):** a simple $s \to t$ path in the transformed graph with weight $\geq |V| - 1$ has at least $|V| - 1$ edges. A simple path visits each vertex at most once, so it has at most $|V| - 1$ edges. It therefore has exactly $|V| - 1$ edges and visits every vertex, making it a Hamiltonian path. **The weight-1 trick** equates path weight with edge count, so $K = |V| - 1$ forces every vertex to be visited. Without uniform weights, a short path with a few heavy edges could meet the threshold, and the reverse direction would fail.

   </details>

5. **Pseudo-polynomial paradox:** 0-1 Knapsack has a DP solution in $O(nC)$, yet it is NP-Complete. Resolve the apparent contradiction.

   <details>
   <summary>Answer</summary>

   In NP-Completeness theory, polynomial time means polynomial in the **bit-length of the input**, not in its numeric values. Capacity $C$ is encoded in $\log_2 C$ bits, so $O(nC) = O(n \cdot 2^{\log_2 C})$ is exponential in input bit-length. This is called **pseudo-polynomial**. The running time is polynomial in the *value* of $C$ but exponential in its *encoding length*. Small capacities (say $C \leq 10^6$) can make the DP practical, but $C \approx 2^{100}$ does not. The NP-Completeness proof constructs instances whose $C$ has a value exponentially large in the input bit-length, and NP-Completeness concerns the worst case over all input lengths.

   </details>

6. **2-SAT vs 3-SAT:** Why is 2-SAT in P but 3-SAT NP-Complete? What property changes between the two?

   <details>
   <summary>Answer</summary>

   **2-SAT** can be expressed as an implication graph: a clause $(a \lor b)$ is equivalent to $\overline{a} \implies b$ and $\overline{b} \implies a$. Building this graph and finding **strongly connected components** (the Kosaraju algorithm of Week 12) gives a polynomial-time algorithm that checks that no variable and its negation lie in the same SCC. The formula is satisfiable iff this condition holds. For **3-SAT** no corresponding technique is known. A 3-clause $(a \lor b \lor c)$ encodes a choice among three options, not a binary implication. That extra freedom is exactly the **nondeterminism** NP captures, and once each clause has $\geq 3$ literals, the problem can encode arbitrary NP computation. The boundary is razor-thin, and understanding *why* this extra freedom makes problems NP-Hard is a deep theme in complexity theory.

   </details>
