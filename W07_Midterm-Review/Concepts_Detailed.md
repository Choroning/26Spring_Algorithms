# Week 7 — Midterm Review (Detailed Edition)

> **Last Updated:** 2026-04-14
>
> **Exam:** Week 8 Midterm | Handwritten, 1 hour | No digital devices | Covers W01–W06 | CLRS Ch. 1–4, 6–10, 15, 16
>
> **Purpose:** The *detailed* companion to `Concepts.md`. Same scope, but every concept is unpacked with intuitions, derivations, proof sketches, step-by-step traces, and discussion of why things work the way they do. Read this when you want to *understand*, not just memorize.
>
> **How to use this document:** Read the corresponding section of `Concepts.md` first for the bird's-eye view, then come here for depth. Each section includes worked examples and "why this matters" commentary.

---

## Table of Contents

- [0. About the Midterm](#0-about-the-midterm)
- [1. Foundations (W01)](#1-foundations-w01)
- [2. Complexity Analysis (W02)](#2-complexity-analysis-w02)
- [3. Data Structures and Sorting (W03)](#3-data-structures-and-sorting-w03)
- [4. Divide and Conquer (W04)](#4-divide-and-conquer-w04)
- [5. Greedy Algorithms (W05)](#5-greedy-algorithms-w05)
- [6. Dynamic Programming (W06)](#6-dynamic-programming-w06)
- [7. Paradigm Comparison](#7-paradigm-comparison)
- [8. Formula Cheat Sheet](#8-formula-cheat-sheet)
- [9. Practice Problems (Exam-Style)](#9-practice-problems-exam-style)
- [10. Common Pitfalls](#10-common-pitfalls)
- [11. Final Checklist](#11-final-checklist)

---

## 0. About the Midterm

The midterm covers Weeks 1–6 of the algorithms course. Three hours of lectures and labs per week, roughly 18 hours of material, compressed into a single 60-minute handwritten exam. No digital devices, no lookups. You will write pseudocode, fill DP tables, trace algorithms by hand, prove asymptotic bounds, and argue about correctness.

| Week | Topic | CLRS | Single-sentence gist |
|------|-------|------|----------------------|
| 01 | Introduction | — | An algorithm is a finite, unambiguous procedure; "halving" gives logarithmic performance |
| 02 | Complexity Analysis | 1–3 | Big-O strips irrelevant detail; the Master Theorem solves divide-and-conquer recurrences |
| 03 | Data Structures, Sorting | 6–8, 10 | Comparison-based sorting has an Ω(n log n) wall; linear sorts exploit key structure |
| 04 | Divide and Conquer | 4, 9 | Split into independent pieces, recurse, combine — the engine behind `n log n` |
| 05 | Greedy | 16 | Commit to the locally best choice *if* the greedy-choice property holds |
| 06 | Dynamic Programming | 15 | Solve overlapping subproblems once and reuse the answers |

The course's recurring intellectual thread is the chain:

```
Problem Solving  ↔  Divide & Conquer  ↔  Recursive Thinking  ↔  Recurrence Relations
```

Every major algorithm you've seen sits somewhere on that chain. Internalizing it makes new algorithms feel familiar rather than arbitrary.

### 0.1 What the exam actually tests

- **Definitions and vocabulary.** You should be able to state Big-O, the Master Theorem, the greedy-choice property, and optimal substructure without notes.
- **Hand-traced executions.** Partition, merge, heapify, buildHeap, Kruskal, Prim, Dijkstra, Huffman, LCS, knapsack, Floyd-Warshall, edit distance — expect to be asked to execute at least one of these on a small instance.
- **Proofs and arguments.** Prove `f(n) = O(g(n))`, solve a recurrence, show that a greedy choice is optimal, or construct a counterexample.
- **Algorithm design.** Given a new problem, identify the paradigm (D&C / Greedy / DP) and outline the solution.

### 0.2 Strategy

1. **Read every question first** and allocate time proportionally to point values.
2. **Show your work.** Partial credit rewards correct reasoning even when the arithmetic slips.
3. **Draw tables and trees.** DP tables, recursion trees, Huffman trees, Gantt charts — visualization is faster and less error-prone than prose.
4. **Sanity-check with small inputs.** Plug in `n = 1, 2, 3` to your recurrence or DP table before trusting it.
5. **State the technique explicitly.** "By the Master Theorem Case 2" or "by exchange argument" tells the grader what you're doing and earns credit even if execution stumbles.

---

## 1. Foundations (W01)

### 1.1 What exactly is an algorithm?

An algorithm is a **systematic, finite, unambiguous procedure** that, given an input satisfying some precondition, produces an output satisfying some postcondition. Every step must be mechanically executable — no "handle appropriately" or "choose wisely."

The five properties drill deeper than the textbook three:

| Property | Meaning | Failure mode |
|----------|---------|--------------|
| **Correctness** | For every valid input, the output satisfies the spec | Produces a wrong answer or undefined behavior |
| **Executability** | Each step is mechanically doable | Depends on an oracle or uncomputable operation |
| **Finiteness** | Terminates in a finite number of steps | `while True: pass` is *not* an algorithm |
| **Efficiency** | Uses reasonable time and space | Exponential on small inputs |
| **Unambiguity** | Each step is precisely specified | "Handle it appropriately" — too vague |

> **Why unambiguity matters on exams.** In pseudocode you must write operations a reader can simulate by hand. `for i = 1 to n: A[i] = A[i] + 1` is an algorithm; `repeat until it's right` is not.

Niklaus Wirth's famous equation `Algorithms + Data Structures = Programs` captures the whole discipline: an algorithm says *what to do*, a data structure says *how information is organized*, and the two are inseparable. The same lookup problem is `O(n)` on an unsorted array and `O(log n)` on a sorted array — the algorithm changes because the data structure changes.

### 1.2 Representing an algorithm

Three representations:

1. **Natural language** — fine for intuition, too ambiguous for formal analysis.
2. **Pseudocode** — structured, language-like notation. This is what CLRS uses and what you write on exams.
3. **Flowcharts** — visual, useful for control flow, but clumsy for anything larger than a few branches.

Exam convention: CLRS-style pseudocode, 1-indexed arrays unless stated otherwise, `=` for assignment, `==` for equality testing. `↔` denotes a swap.

### 1.3 Euclidean GCD — the oldest known algorithm (~300 BCE)

**Key identity:** `gcd(a, b) = gcd(b, a mod b)`, with base case `gcd(a, 0) = a`.

**Why the identity holds.** Let `G = gcd(a, b)`. Write `a = q·b + r` where `r = a mod b`. Any common divisor of `a` and `b` also divides `r = a − q·b`. Conversely, any common divisor of `b` and `r` also divides `a = q·b + r`. So the set of common divisors of `(a, b)` equals the set of common divisors of `(b, r)`, and in particular their greatest elements agree.

```python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
```

**Trace `gcd(48, 18)`:**

| Call | a | b | a mod b |
|------|---|---|---------|
| 1 | 48 | 18 | 12 |
| 2 | 18 | 12 | 6 |
| 3 | 12 | 6 | 0 |
| 4 | 6 | 0 | — return 6 |

**Why termination is guaranteed.** Every iteration `b` strictly decreases and stays non-negative, so it must hit 0 in a finite number of steps.

**How fast?** Worst case `O(log min(a, b))` iterations. The worst case occurs on consecutive Fibonacci numbers — this is a classical result, rarely tested in detail but worth remembering: GCD "loves" Fibonacci-like pairs.

### 1.4 Classical problems and the log₂(n) theme

The introductory lecture presents seven problems precisely because they span the five algorithmic strategies you'll meet again and again: sequential scanning, binary halving, greedy choice, graph traversal, and information-theoretic encoding.

| Problem | Strategy | Worst-case analysis |
|---------|----------|----------------------|
| Finding the maximum | Sequential scan | `n − 1` comparisons, `O(n)` |
| Binary search (sorted input) | Divide and conquer | `⌈log₂(n)⌉` comparisons, `O(log n)` |
| Coin change (standard denominations) | Greedy (largest first) | `O(k)` where `k = #denominations` |
| Euler circuit / one-stroke drawing | Graph traversal, avoid bridges | Exists iff all degrees are even |
| Maze (connected walls) | Right-hand rule (DFS variant) | Always reaches the exit |
| Counterfeit coin among 1,024 | Divide pile in half | **10 weighings** |
| Poisoned wine, `n` jars | Binary encoding | **⌈log₂(n)⌉** servants |

**The log₂(n) refrain.** Three different problems in W01 — binary search, counterfeit coin, poisoned wine — all collapse from `O(n)` or `O(n/2)` down to `O(log n)` because each step cuts the unknown information **in half**. This is the same mathematical phenomenon that makes merge sort `n log n` instead of `n²`: halving × halving × ... × halving (once) until you hit 1 takes `log₂ n` rounds. Every efficient divide-and-conquer algorithm rides on this fact.

#### 1.4.1 Finding the maximum (worked trace)

```python
def find_max(cards):
    max_val = cards[0]
    for i in range(1, len(cards)):
        if cards[i] > max_val:
            max_val = cards[i]
    return max_val
```

On input `[3, 8, 2, 11, 5]`:
- Start `max = 3`.
- `i = 1`: `8 > 3` → `max = 8`.
- `i = 2`: `2 ≤ 8` → no change.
- `i = 3`: `11 > 8` → `max = 11`.
- `i = 4`: `5 ≤ 11` → no change.
- Return `11`.

Correctness by **loop invariant**: at the start of iteration `i`, `max_val` equals the maximum of `cards[0..i−1]`. This is the blueprint for induction proofs of iterative algorithms.

#### 1.4.2 Binary search (worked trace)

Search `85` in `[15, 20, 25, 35, 45, 55, 60, 75, 85, 90]`:

| Step | `left` | `right` | `mid` | `A[mid]` | Decision |
|------|--------|---------|-------|----------|----------|
| 1 | 0 | 9 | 4 | 45 | `45 < 85` → search right |
| 2 | 5 | 9 | 7 | 75 | `75 < 85` → search right |
| 3 | 8 | 9 | 8 | 85 | match → return 8 |

Three comparisons to search 10 items. For `n = 10⁶`, binary search needs at most 20 comparisons; sequential search needs up to a million.

> **Why `left <= right` (inclusive)?** When the search window narrows to a single element (`left == right`), we still need to inspect that element. Dropping the equality would introduce an off-by-one bug where the target is missed if it lands on the last position. This is the single most common coding-test pitfall for binary search.

#### 1.4.3 The Euler circuit condition

**Theorem (Euler).** A connected undirected graph has an **Euler circuit** (a closed walk using every edge exactly once) **iff every vertex has even degree**. It has an **Euler path** (not necessarily closed) iff exactly 0 or 2 vertices have odd degree.

**Intuition.** Every time your pen enters a vertex it must leave, using up edges in pairs. If a vertex has odd degree, you'll eventually enter with no edge to leave on. If 0 odd-degree vertices: the path closes. If 2: you must start at one and end at the other.

**Algorithmic rule — avoid bridges early.** A **bridge** is an edge whose removal disconnects the graph. At a vertex with multiple choices, prefer an edge that is *not* a bridge (that is, one through which you can cycle back). Crossing a bridge prematurely strands you on the wrong side with edges you'll never reach.

**Detecting a bridge / cycle back:** run DFS from the candidate neighbor; if DFS reaches the current vertex along a different edge, a cycle exists and the edge is safe.

#### 1.4.4 Counterfeit coin — three approaches

Given `n` coins, one slightly lighter, find the fake with a balance scale.

| Approach | Method | Worst case for `n = 1024` |
|----------|--------|---------------------------|
| A (one by one) | Compare coin 1 against each of 2..n | **1,023** |
| B (pairs) | Weigh pairs; when a pair is unbalanced, resolve with one more weigh | **~512** |
| C (halving) | Weigh two halves; lighter half contains the fake; recurse | **10** |

**Approach C trace for `n = 1024`:**
```
1024 → 512 → 256 → 128 → 64 → 32 → 16 → 8 → 4 → 2 → 1  (10 weighings)
```

Each weighing eliminates half the candidates → `log₂ n` weighings. This is the first divide-and-conquer analysis you meet in the course.

> **Why not three-way splits?** You *can* do better with thirds: split into 3 piles, weigh two of them, determine the lighter pile. This gives `log₃ n` weighings — asymptotically still `O(log n)`, just a different constant. The log-function is what matters, not the base.

#### 1.4.5 Poisoned wine — binary encoding

Assign jar `k` the `⌈log₂(n)⌉`-bit binary ID equal to `k`. Servant `i` drinks from every jar whose bit `i` is 1. After one week, the bit-pattern of dead servants exactly equals the binary ID of the poisoned jar.

**4 jars, 2 servants:**

| Jar | Binary | Servant A | Servant B |
|-----|--------|-----------|-----------|
| 0 | 00 | — | — |
| 1 | 01 | — | ✓ |
| 2 | 10 | ✓ | — |
| 3 | 11 | ✓ | ✓ |

If A dies and B doesn't → binary `10` → jar 2.

**Why this works.** Each servant reports 1 bit of information (alive/dead). To distinguish among `n` possibilities, you need `⌈log₂(n)⌉` bits. The algorithm pays exactly this information-theoretic minimum.

**For `n` that is not a power of 2:** use `⌈log₂(n)⌉` servants; some bit patterns go unused. Example: `n = 5` uses 3 servants (8 patterns), 3 patterns unused. That's fine — the encoding scheme still identifies which jar (if any) is poisoned.

---

## 2. Complexity Analysis (W02)

### 2.1 From exact counts to asymptotic growth

For an algorithm, define `T(n)` = number of **elementary operations** (comparisons, assignments, arithmetic, array accesses) as a function of input size `n`. In the **RAM model** each elementary op takes 1 time unit, so `T(n)` is a faithful proxy for wall-clock time up to constant factors.

Why count operations instead of seconds? Because seconds depend on hardware. Operations depend only on the algorithm. An `O(n²)` algorithm on a supercomputer eventually loses to an `O(n log n)` algorithm on your laptop — the hardware constants buy you one or two orders of magnitude at best, while the algorithmic improvement buys you arbitrarily many.

### 2.2 Four flavors of complexity analysis

| Type | Meaning | When to use |
|------|---------|-------------|
| **Worst-case** | Upper bound over all inputs of size `n` | Default — gives a guarantee |
| **Average-case** | Expected time under a probability distribution (usually uniform) | When you know the input distribution |
| **Best-case** | Fastest possible run | Rarely useful alone; good for lower bounds |
| **Amortized** | Worst-case *total* cost over a sequence of `m` operations, divided by `m` | For data structures with occasional expensive operations (dynamic arrays, splay trees) |

The commute analogy:

| Case | Home → class | What it tells you |
|------|--------------|-------------------|
| Best | 36 min (train at platform) | Lower bound |
| Worst | 40 min (just missed it) | The guarantee you can promise |
| Average | 38 min | Typical day |

**Why worst-case dominates on exams.** A guarantee is a contract. "Quick sort takes at most `c · n²` time for some `c`" is a durable statement; "it usually takes `n log n`" is a hope. Guarantees compose; hopes don't.

### 2.3 Asymptotic notation — formal definitions

| Notation | Set-theoretic definition | Plain-English meaning |
|----------|--------------------------|------------------------|
| `O(g(n))` | `{ f : ∃ c > 0, n₀ ≥ 0 s.t. ∀ n ≥ n₀, f(n) ≤ c·g(n) }` | **Upper bound**: `f` grows at most as fast as `g` |
| `Ω(g(n))` | `{ f : ∃ c > 0, n₀ ≥ 0 s.t. ∀ n ≥ n₀, f(n) ≥ c·g(n) }` | **Lower bound**: `f` grows at least as fast as `g` |
| `Θ(g(n))` | `O(g(n)) ∩ Ω(g(n))` | **Tight bound**: `f` grows exactly as fast as `g` (up to constants) |

The definitions are "for all sufficiently large `n`, we can bound `f` by a constant multiple of `g`." Constants and small `n` are irrelevant — only the *growth rate* matters.

**Reading the definition aloud.** "There exists a constant `c` and a threshold `n₀` such that for every `n ≥ n₀`, `f(n)` is at most `c · g(n)`." The `∃ c` is a promise; you are free to choose `c` as large as you need to make the inequality work.

### 2.4 Proving `f(n) = O(g(n))` — the workhorse technique

**The recipe for polynomials.** For `f(n) = aₖnᵏ + aₖ₋₁nᵏ⁻¹ + ... + a₀`, you can prove `f(n) = O(nᵏ)` with:

- `c = |aₖ| + |aₖ₋₁| + ... + |a₀|`
- `n₀ = 1`

**Why this works.** For every `n ≥ 1`, each term `|aᵢ|·nⁱ ≤ |aᵢ|·nᵏ` (since `nⁱ ≤ nᵏ` when `n ≥ 1` and `i ≤ k`). Summing, `f(n) ≤ (|aₖ| + ... + |a₀|)·nᵏ = c·nᵏ`.

**Worked proof.** Show `2n² − 8n + 3 = O(n²)`.

Take `c = |2| + |−8| + |3| = 13`, `n₀ = 1`. For all `n ≥ 1`:

`|2n² − 8n + 3| ≤ 2n² + 8n + 3 ≤ 2n² + 8n² + 3n² = 13n² = c·n²`. ∎

(We pad with absolute values to handle negative coefficients cleanly.)

**Worked proof of `Θ`.** Show `3n + 2 = Θ(n)`.

*Upper bound:* `3n + 2 ≤ 5n` for `n ≥ 1`, so `3n + 2 = O(n)`.

*Lower bound:* `3n + 2 ≥ 3n` for all `n ≥ 0`, so `3n + 2 = Ω(n)`.

With `c₁ = 3, c₂ = 5, n₀ = 1`: `3n ≤ 3n + 2 ≤ 5n` for `n ≥ 1`. So `3n + 2 = Θ(n)`. ∎

**The tightness rule.** Always report the tightest bound you can justify. `n log n + 5n = O(n²)` is technically true but useless; write `O(n log n)` or better `Θ(n log n)`. A loose bound is information loss.

### 2.5 The complexity hierarchy

```
O(1) ⊂ O(log n) ⊂ O(√n) ⊂ O(n) ⊂ O(n log n) ⊂ O(n²) ⊂ O(n³) ⊂ O(2ⁿ) ⊂ O(n!)
```

| Class | Name | Example | `n = 10⁶` on a PC |
|-------|------|---------|-------------------|
| O(1) | Constant | Array access, hash lookup | Instant |
| O(log n) | Logarithmic | Binary search | ~20 ops |
| O(√n) | Sub-linear | Primality by trial division | ~10³ ops |
| O(n) | Linear | Linear scan, counting sort | ~seconds |
| O(n log n) | Linearithmic | Merge / heap sort | Practical ceiling for large `n` |
| O(n²) | Quadratic | Bubble sort | Minutes to hours |
| O(n³) | Cubic | Floyd-Warshall, matrix multiply | Only for small `n` |
| O(2ⁿ) | Exponential | Subset enumeration, naive recursive Fibonacci | Infeasible past `n ≈ 40` |
| O(n!) | Factorial | All permutations, naive TSP | Infeasible past `n ≈ 12` |

**Sanity-check table. Sorting one billion numbers:**

| Algorithm | `n = 10³` | `n = 10⁶` | `n = 10⁹` |
|-----------|-----------|-----------|-----------|
| O(n²) on a PC | < 1 s | ~2 h | ~**300 years** |
| O(n²) on a supercomputer | < 1 s | ~1 s | ~1 week |
| O(n log n) on a PC | < 1 s | < 1 s | **~5 min** |
| O(n log n) on a supercomputer | < 1 s | < 1 s | < 1 s |

A better algorithm beats a bigger computer. Always. That is the single most important engineering lesson of the course.

**Why the log base doesn't matter in Big-O.** By change of base, `logₐ n = (logᵦ n) / (logᵦ a)`, where `1/logᵦ a` is a positive constant. Constants vanish in `O(·)`, so `log` of any base ≥ 2 is interchangeable.

### 2.6 Recurrence relations — three methods

Recursive algorithms don't yield closed-form `T(n)` directly; they yield a recurrence like `T(n) = 2T(n/2) + n`. You must **solve** the recurrence to learn the algorithm's complexity.

#### 2.6.1 Method 1 — Repeated substitution (unrolling)

Expand the recurrence level by level until you see a pattern, then substitute the base case.

**Example: merge sort.** `T(n) = 2T(n/2) + n`, `T(1) = 1`. Assume `n = 2ᵏ`.

```
T(n)   = 2T(n/2) + n
       = 2·[2T(n/4) + n/2] + n      = 4T(n/4) + 2n
       = 4·[2T(n/8) + n/4] + 2n     = 8T(n/8) + 3n
       ⋮
       = 2ᵏ·T(n/2ᵏ) + kn
       = n·T(1) + n·log₂ n          (since 2ᵏ = n ⇒ k = log₂ n)
       = n + n log n
       = Θ(n log n)
```

Every level of the recursion tree does total work `n`; there are `log₂ n` levels; the product is `n log n`. The pattern underneath is visible once you draw the tree.

**Example: factorial.** `T(n) = T(n − 1) + c`, `T(1) ≤ c`.

```
T(n) = T(n−1) + c = T(n−2) + 2c = ... = T(1) + (n−1)c ≤ c + (n−1)c = cn = O(n)
```

This unrolls into a simple arithmetic progression.

#### 2.6.2 Method 2 — Guess and verify (induction)

Guess a closed form, prove it by induction.

**Example.** Show `T(n) = 2T(n/2) + n` satisfies `T(n) = O(n log n)`.

**Guess:** `T(n) ≤ c · n log n` for some constant `c > 0`.

**Base case:** `T(2) = 2T(1) + 2 = 4`. We need `4 ≤ c · 2 · log₂ 2 = 2c`, so `c ≥ 2` works.

**Inductive step:** Assume `T(n/2) ≤ c · (n/2) · log(n/2)`. Then

```
T(n) = 2T(n/2) + n
     ≤ 2 · c(n/2) log(n/2) + n
     = cn log(n/2) + n
     = cn log n − cn log 2 + n
     = cn log n + (1 − c log 2)n
     ≤ cn log n           (when c · log 2 ≥ 1, i.e. c ≥ 1/log 2)
```

Choosing `c ≥ max(2, 1/log 2)` completes the induction. ∎

> **The classic pitfall.** You cannot "almost" finish an induction. If your inductive step yields `T(n) ≤ cn + 1`, that is **not** `≤ cn`; the proof has failed. The fix is to strengthen the guess — prove the stronger statement `T(n) ≤ cn − d` for a constant `d`. Then `T(n) ≤ 2(c(n/2) − d) + 1 = cn − 2d + 1 ≤ cn − d` when `d ≥ 1`. The extra slack absorbs the `+1`.

Induction is pedagogically demanding but gives you full rigor. Expect at least one exam question that requires you to complete an induction.

#### 2.6.3 Method 3 — Master Theorem

For recurrences of the form `T(n) = a · T(n/b) + f(n)` with `a ≥ 1, b > 1`, let `h(n) = n^(log_b a)`. Compare `f(n)` with `h(n)`:

| Case | Condition on `f(n)` | Solution |
|------|---------------------|----------|
| **Case 1** | `f(n) = O(n^(log_b a − ε))` for some `ε > 0` | `T(n) = Θ(n^(log_b a))` |
| **Case 2** | `f(n) = Θ(n^(log_b a))` | `T(n) = Θ(n^(log_b a) · log n)` |
| **Case 3** | `f(n) = Ω(n^(log_b a + ε))` for some `ε > 0`, **and** regularity `a · f(n/b) ≤ c · f(n)` for some `c < 1` and all large `n` | `T(n) = Θ(f(n))` |

**Intuition — the recursion tree.** Imagine the recursion tree for `T(n) = aT(n/b) + f(n)`. Level 0 does `f(n)` work. Level 1 has `a` subproblems, each doing `f(n/b)` work — total `a · f(n/b)`. Level `k` has `aᵏ` subproblems each doing `f(n/bᵏ)` work — total `aᵏ · f(n/bᵏ)`. The tree has depth `log_b n`, and the number of leaves is `a^(log_b n) = n^(log_b a)` — this is where the mysterious `n^(log_b a)` comes from (the total leaf cost if leaves do constant work).

- **Case 1.** The combine cost shrinks geometrically from root to leaf; **leaves dominate**. Total = `Θ(#leaves)` = `Θ(n^(log_b a))`.
- **Case 2.** Every level does the same work `Θ(n^(log_b a))`; with `log n` levels, **total = Θ(n^(log_b a) · log n)**.
- **Case 3.** The combine cost grows from leaf to root; **root dominates**. Total = `Θ(f(n))`. Regularity ensures the geometry works out.

**Worked examples — all 8 from the summary, with the comparison step shown:**

| Recurrence | `a, b, n^(log_b a)` | `f(n)` | Compare | Case | Result |
|------------|----------------------|--------|---------|------|--------|
| `T(n) = 2T(n/2) + n` | 2, 2, `n` | `n` | `f = Θ(h)` | 2 | `Θ(n log n)` — Merge Sort |
| `T(n) = T(n/2) + 1` | 1, 2, `1` | `1` | `f = Θ(h)` | 2 | `Θ(log n)` — Binary Search |
| `T(n) = 2T(n/2) + 1` | 2, 2, `n` | `1` | `f = O(n^(1−1))`... actually `1 = O(n^(1−ε))` for any `0 < ε < 1` | 1 | `Θ(n)` |
| `T(n) = 4T(n/2) + n` | 4, 2, `n²` | `n` | `n = O(n^(2−1))`, `ε = 1` | 1 | `Θ(n²)` |
| `T(n) = 4T(n/2) + n²` | 4, 2, `n²` | `n²` | `f = Θ(h)` | 2 | `Θ(n² log n)` |
| `T(n) = 2T(n/4) + n` | 2, 4, `√n` | `n` | `n = Ω(n^(0.5+0.5))`, regularity holds | 3 | `Θ(n)` |
| `T(n) = 7T(n/2) + n²` | 7, 2, `n^(log₂ 7) ≈ n^2.81` | `n²` | `n² = O(n^(2.81 − 0.81))` | 1 | `Θ(n^(log₂ 7))` — Strassen |
| `T(n) = 3T(n/4) + n²` | 3, 4, `n^(log₄ 3) ≈ n^0.79` | `n²` | `n² = Ω(n^(0.79 + 1.21))`, regularity holds (`3·(n/4)² = 3n²/16 ≤ c · n²` for `c = 3/16 < 1`) | 3 | `Θ(n²)` |

> **Exam tip.** On a handwritten exam, Case 3 requires verifying the regularity condition, which is tedious. Focus on Case 1 vs Case 2 — both just compare `f(n)` with `n^(log_b a)`.

**Recurrences the Master Theorem does NOT solve:**
- `T(n) = T(n − 1) + Θ(n)` — not `a · T(n/b)` form. Solve by substitution: `Θ(n²)`. (Quick sort worst case, insertion sort.)
- `T(n) = T(n − 1) + T(n − 2) + Θ(1)` — not in MT shape. Solve by characteristic polynomial: `Θ(φⁿ)` ≈ O(1.618ⁿ). (Naive recursive Fibonacci.)
- `T(n) = T(n/5) + T(7n/10) + Θ(n)` — unequal split. Prove `T(n) = O(n)` by induction, using `1/5 + 7/10 = 9/10 < 1` to close the argument. (Median of medians.)
- `T(n) = 2T(n/2) + n log n` — `f(n)` is not a polynomial, so Case 3 can't apply directly. Result is `Θ(n log² n)` (falls outside the basic MT but can be handled by the extended version).

---

## 3. Data Structures and Sorting (W03)

### 3.1 Five fundamental structures

| Structure | Ordering | Key operations & cost | Typical use |
|-----------|----------|-----------------------|-------------|
| **Array / List** | Indexed | Access `O(1)`; insert/delete `O(n)` | Random access, base of most algorithms |
| **Linked List** | Sequential | Access `O(n)`; insert/delete at known node `O(1)` | Dynamic sequences without contiguous memory |
| **Stack** | **LIFO** | `push`, `pop` — `O(1)` | Function call stack, bracket matching, DFS |
| **Queue** | **FIFO** | `enqueue`, `dequeue` — `O(1)` | BFS, task scheduling |
| **Heap** | Priority | `insert`, `extract-min/max` — `O(log n)`; build — `O(n)` | Priority queues, heap sort, Dijkstra, Prim, Huffman |

**Heap representation (1-indexed array).** A complete binary tree stored in an array. For a node at index `i`:
- children at `A[2i]` and `A[2i + 1]`,
- parent at `A[⌊i/2⌋]`.

Heap property (max-heap): `key(parent) ≥ key(child)` at every node. (Min-heap is the dual.) Crucially, a heap is **not** a sorted array — siblings have no ordering relative to each other.

**Why heaps are stored as arrays.** Index arithmetic replaces pointer chasing, making every operation cache-friendly and memory-compact. This is why heaps are faster in practice than naive pointer-based trees.

### 3.2 Elementary sorts — the O(n²) trio

All three share the same recursive structure `T(n) = T(n − 1) + Θ(n) = Θ(n²)` — they reduce the problem by one element per step, so total work is the triangular sum `1 + 2 + ... + (n−1) = n(n−1)/2`.

#### 3.2.1 Selection sort

Each round: find the maximum (or minimum) in the unsorted region, swap it to the end (or start), shrink the unsorted region by 1.

```
selectionSort(A[1..n]):
    for last = n downto 2:
        k = index of largest element in A[1..last]
        swap A[k] ↔ A[last]
```

**Analysis.** The inner scan does `last − 1` comparisons. Total = `(n−1) + (n−2) + ... + 1 = n(n−1)/2 = Θ(n²)`. *Independent of input order* — best = average = worst = `Θ(n²)`. The only thing that varies is the number of swaps (up to `n − 1`, zero if already sorted).

**When to use.** Almost never in practice. Good pedagogically because of the simple recursive structure.

#### 3.2.2 Bubble sort

Each round: walk left to right, swap any adjacent out-of-order pair. The largest unsorted element "bubbles" to the end.

```
bubbleSort(A[1..n]):
    for last = n downto 2:
        for i = 1 to last − 1:
            if A[i] > A[i+1]: swap A[i] ↔ A[i+1]
```

**Analysis.** Worst/average `Θ(n²)`. With a `swapped` flag, **best case on sorted input = Θ(n)**: a single pass with zero swaps terminates the algorithm. This optimization is standard in any real-world implementation.

#### 3.2.3 Insertion sort

Each round: take the next element and insert it into its correct position among the already-sorted prefix, shifting larger elements right.

```
insertionSort(A[1..n]):
    for i = 2 to n:
        key = A[i]
        j = i − 1
        while j ≥ 1 and A[j] > key:
            A[j+1] = A[j]
            j = j − 1
        A[j+1] = key
```

**Analysis.** Worst-case reversed input → `Θ(n²)`. **Best case on sorted input → Θ(n)**: each key needs only one comparison to confirm it's in place. This is why insertion sort is the standard choice for "nearly sorted" data and for small subarrays inside hybrid sorts (e.g., Python's Timsort, C++'s introsort).

**Correctness by loop invariant.** At the start of iteration `i`, `A[1..i−1]` is sorted. Base case `i = 2`: trivially true (a single element is sorted). Inductive step: after inserting `A[i]` into the correct position, `A[1..i]` is sorted. Termination at `i = n + 1`: `A[1..n]` is sorted. This is mathematical induction applied directly to an algorithm — a template you'll reuse.

### 3.3 Advanced sorts — the O(n log n) trio

These achieve `n log n` by splitting the problem roughly in half at each step: `T(n) = 2T(n/2) + Θ(n)`.

#### 3.3.1 Merge sort — guaranteed Θ(n log n), stable, O(n) space

```
mergeSort(A, p, r):
    if p < r:
        q = ⌊(p + r) / 2⌋
        mergeSort(A, p, q)
        mergeSort(A, q+1, r)
        merge(A, p, q, r)
```

**The merge step** (walk two sorted halves with two pointers, always copying the smaller front):

```
Merging [3, 8, 31, 65, 73] and [11, 15, 20, 29, 48]:
  3 < 11 → tmp = [3];
  8 < 11 → tmp = [3, 8];
  31 > 11 → tmp = [3, 8, 11];
  31 > 15 → tmp = [3, 8, 11, 15];
  ...
  Result: [3, 8, 11, 15, 20, 29, 31, 48, 65, 73]
```

Each merge does `Θ(n)` work. The recurrence solves to `Θ(n log n)` (Master Theorem Case 2, or by recursion tree).

**Always Θ(n log n)**: worst = best = average. **Stable**: equal keys keep their original relative order. **Trade-off**: `O(n)` auxiliary array for merging — merge sort is not in-place.

#### 3.3.2 Quick sort — fastest in practice, worst case Θ(n²)

```
quickSort(A, p, r):
    if p < r:
        q = PARTITION(A, p, r)
        quickSort(A, p, q − 1)
        quickSort(A, q + 1, r)

PARTITION(A, p, r):    // Lomuto partition with last-element pivot
    pivot = A[r]
    i = p − 1
    for j = p to r − 1:
        if A[j] ≤ pivot:
            i = i + 1
            swap A[i], A[j]
    swap A[i+1], A[r]
    return i + 1
```

**Partition invariant.** At every step of the loop:
- `A[p..i]` contains elements `≤ pivot`,
- `A[i+1..j−1]` contains elements `> pivot`,
- `A[j..r−1]` is unexamined,
- `A[r]` is the pivot itself.

After the loop, swap `A[i+1]` with the pivot — the pivot lands in its final sorted position, and the invariant gives us the partition.

**Worked partition:** `[31, 8, 48, 73, 11, 3, 20, 29, 65, 15]` with pivot `15`:

```
j=1: A[1]=31 > 15 → skip
j=2: A[2]=8 ≤ 15 → i=1, swap A[1]↔A[2]: [8, 31, 48, 73, 11, 3, 20, 29, 65, 15]
j=3: A[3]=48 > 15 → skip
j=4: A[4]=73 > 15 → skip
j=5: A[5]=11 ≤ 15 → i=2, swap A[2]↔A[5]: [8, 11, 48, 73, 31, 3, 20, 29, 65, 15]
j=6: A[6]=3 ≤ 15 → i=3, swap A[3]↔A[6]: [8, 11, 3, 73, 31, 48, 20, 29, 65, 15]
j=7..9: all > 15 → skip
Final swap A[4]↔A[10]: [8, 11, 3, 15, 31, 48, 20, 29, 65, 73]
Pivot at index 4.
```

**Complexity.**
- Best / average: partition splits roughly in half → `T(n) = 2T(n/2) + Θ(n) = Θ(n log n)`.
- Worst: partition splits `0 : (n−1)` on every call → `T(n) = T(n−1) + Θ(n) = Θ(n²)`. Happens on already-sorted or reverse-sorted input with a last-element pivot.

**Why the average is still Θ(n log n) even with lopsided splits.** Even a 9:1 split produces depth `log_{10/9}(n) = O(log n)`. The recursion tree stays shallow as long as the imbalance is bounded by a constant ratio — only the degenerate `0 : n−1` case blows up.

**Practical fixes.** Randomize the pivot (pick a uniform random index, swap to the last position, then partition). Expected time is `O(n log n)` regardless of input. Alternatively, the **median-of-three** heuristic chooses the median of `A[p], A[⌊(p+r)/2⌋], A[r]` as the pivot.

**Quick sort vs merge sort vs heap sort:**

| | Merge | Quick | Heap |
|--|-------|-------|------|
| Worst | Θ(n log n) | Θ(n²) | Θ(n log n) |
| Average | Θ(n log n) | Θ(n log n) | Θ(n log n) |
| Space | **O(n)** | O(log n) | **O(1)** |
| Stable | **Yes** | No | No |
| Cache-friendly | OK | **Excellent** | Poor |
| Practical speed | Good | **Fastest** | OK |

Quick sort wins in practice because of small constant factors and excellent locality. Merge sort wins when stability or guaranteed worst-case time matters. Heap sort wins when you need `O(1)` extra space *and* guaranteed worst-case time.

#### 3.3.3 Heap sort

Two phases: build a heap from the unordered array, then repeatedly extract the root.

```
heapSort(A[1..n]):
    buildHeap(A, n)
    for i = n downto 2:
        swap A[1] ↔ A[i]
        heapify(A, 1, i − 1)

buildHeap(A, n):
    for i = ⌊n/2⌋ downto 1:
        heapify(A, i, n)

heapify(A, k, n):           // sift A[k] down within A[1..n]
    left = 2k; right = 2k + 1
    smaller = k  (for min-heap; largest for max-heap)
    if left ≤ n and A[left] < A[smaller]: smaller = left
    if right ≤ n and A[right] < A[smaller]: smaller = right
    if smaller ≠ k:
        swap A[k] ↔ A[smaller]
        heapify(A, smaller, n)
```

**Why `buildHeap` is O(n), not O(n log n).** The naive analysis says `n · O(log n) = O(n log n)`. The tighter analysis: at depth `h` (where leaves are `h = 0`), heapify does `O(h)` work. Roughly `n/2^(h+1)` nodes live at depth `h`. So total work is

```
Σ_{h=0}^{log n}  (n / 2^(h+1)) · h  =  (n/2) · Σ h / 2^h  =  O(n)
```

because `Σ h/2^h` converges to a constant. Most nodes are near the leaves where heapify does almost nothing.

**Why start at `⌊n/2⌋`?** Nodes indexed `⌊n/2⌋ + 1` through `n` are leaves — they're already trivially heaps of size 1. We only need to run heapify on internal nodes, from the deepest one up to the root, so the children subtrees are heaps by the time heapify reaches their parent.

**Extraction phase.** Swap the root (min or max) with the last element, shrink the heap by 1, heapify the new root. Each extraction is `O(log n)`; `n − 1` extractions total → `O(n log n)`.

**Total:** `buildHeap (O(n)) + (n − 1) · heapify (O(log n)) = O(n log n)` guaranteed, in-place, but not stable.

### 3.4 The comparison-based Ω(n log n) lower bound

**Theorem.** Any comparison-based sorting algorithm requires `Ω(n log n)` comparisons in the worst case.

**Proof by decision tree.** Any comparison-based sort can be represented as a binary decision tree where each internal node asks "is `A[i] ≤ A[j]`?" and each leaf corresponds to a specific output permutation. Since there are `n!` possible permutations, the tree has at least `n!` leaves. A binary tree with `L` leaves has height `≥ ⌈log₂ L⌉`. So the worst-case number of comparisons is at least `log₂(n!)`. By Stirling's approximation, `log₂(n!) = Θ(n log n)`. ∎

**Consequence.** Selection, bubble, insertion, merge, quick, heap sort — none can beat `O(n log n)` as long as they only compare elements.

### 3.5 Linear-time sorts — Ω(n log n) bypassed

These don't compare elements; they exploit **structure in the keys**.

#### 3.5.1 Counting sort — O(n + k) when values are in `[1..k]`

```
countingSort(A[1..n], B[1..n], k):
    for i = 1 to k: C[i] = 0
    for j = 1 to n: C[A[j]]++            // count occurrences
    for i = 2 to k: C[i] += C[i − 1]      // prefix sum: C[i] = # of elements ≤ i
    for j = n downto 1:
        B[C[A[j]]] = A[j]
        C[A[j]]--
```

**Step 3 insight.** After the prefix sum, `C[v]` is "the last index in `B` where a `v` should go." Walking `A` right-to-left ensures that among equal keys, the later-in-`A` one lands later in `B` — preserving stability. If you walked left-to-right, equal keys would get reversed, breaking stability.

**Why stability matters.** Counting sort is often used as a *subroutine* in radix sort. Radix sort depends on the subroutine being stable — without it, earlier digits' ordering gets destroyed by later passes.

**Limitation.** You need `k = O(n)` for the total to be `Θ(n)`. If `k = n²`, counting sort is worse than comparison sorts.

#### 3.5.2 Radix sort — Θ(d(n + k)) for `d`-digit keys

```
radixSort(A[1..n], k):
    for i = 1 to d:
        stable-sort A by digit i        // typically counting sort
```

Process digits from **LSD to MSD** (least to most significant). Each pass is stable, so the ordering from earlier (less significant) passes is preserved whenever later passes tie.

**Why not MSD first?** MSD-first would sort by the most significant digit, but then within each group you'd need to recursively sort by the remaining digits — that's a different algorithm (MSD radix sort, more complex). LSD radix sort with a stable subroutine is the simple classic.

**Trace on `[0123, 2154, 0222, 0004, 0283, 1560, 1061, 2150]`:**

After sorting by the 1's digit, then 10's, then 100's, then 1000's, you get the fully sorted sequence. Each round preserves prior orderings where digits tie.

### 3.6 Complete sorting comparison

| Algorithm | Worst | Average | Best | Space | Stable? | Key takeaway |
|-----------|-------|---------|------|-------|---------|--------------|
| Selection | Θ(n²) | Θ(n²) | Θ(n²) | O(1) | No | Always same; min # swaps |
| Bubble | Θ(n²) | Θ(n²) | **Θ(n)** | O(1) | Yes | Best Θ(n) needs `swapped` flag |
| Insertion | Θ(n²) | Θ(n²) | **Θ(n)** | O(1) | Yes | Best for nearly sorted data |
| Merge | Θ(n log n) | Θ(n log n) | Θ(n log n) | O(n) | Yes | Guaranteed + stable |
| Quick | **Θ(n²)** | Θ(n log n) | Θ(n log n) | O(log n) | No | Fastest in practice |
| Heap | Θ(n log n) | Θ(n log n) | Θ(n log n) | O(1) | No | Guaranteed + in-place |
| Counting | Θ(n + k) | Θ(n + k) | Θ(n + k) | O(k) | Yes | k must be O(n) |
| Radix | Θ(d(n + k)) | Θ(d(n + k)) | Θ(d(n + k)) | O(n + k) | Yes | d constant → Θ(n) |

Commit this table to memory. It's the single most frequently tested summary in the course.

---

## 4. Divide and Conquer (W04)

### 4.1 The three-step paradigm

```
DivideAndConquer(P):
    if P is small enough: solve P directly  (base case)
    else:
        DIVIDE:   split P into subproblems P₁, ..., Pₖ
        CONQUER:  recursively solve each Pᵢ
        COMBINE:  merge the sub-solutions into a solution to P
```

**The non-negotiable assumption.** Subproblems must be **independent** — their input sizes sum to at most the original. If they overlap (same subproblem solved multiple times), you're doing exponential redundant work and should switch to DP.

The generic recurrence is `T(n) = a · T(n/b) + f(n)`. That is the exact template for the Master Theorem.

### 4.2 The D&C algorithm catalog

| Algorithm | Divide | Conquer | Combine | Recurrence | Time |
|-----------|--------|---------|---------|------------|------|
| Merge sort | split in half | sort each half | merge | `2T(n/2) + Θ(n)` | Θ(n log n) |
| Binary search | compare with middle | recurse one half | trivial | `T(n/2) + O(1)` | Θ(log n) |
| Quick sort (avg) | partition | recurse both sides | trivial | `2T(n/2) + Θ(n)` | Θ(n log n) |
| Quick sort (worst) | partition (0 : n−1) | recurse | trivial | `T(n−1) + Θ(n)` | Θ(n²) |
| Randomized Select | partition | recurse **one** side | trivial | (avg) `T(3n/4) + Θ(n)` | **Θ(n)** avg |
| Median-of-Medians Select | groups of 5, recursive median | partition + recurse | trivial | `T(n/5) + T(7n/10) + Θ(n)` | **Θ(n)** worst |
| Closest Pair | split by x-median | recurse each half | strip check | `2T(n/2) + O(n log n)` | O(n log² n) |
| Strassen's matrix multiply | 7 recursive 2×2 products | | | `7T(n/2) + Θ(n²)` | Θ(n^log₂ 7) ≈ Θ(n^2.81) |

### 4.3 The selection problem

Given an unsorted array `A` of `n` elements and an integer `i`, find the `i`-th smallest element.

**Trivial approach:** sort `A` in `O(n log n)`, return `A[i]`. Can we do better?

#### 4.3.1 Randomized Select — Θ(n) expected

```
SELECT(A, p, r, i):
    if p == r: return A[p]
    q = PARTITION(A, p, r)         // Lomuto partition, random pivot
    k = q − p + 1                   // pivot rank within A[p..r]
    if i == k: return A[q]
    else if i < k: return SELECT(A, p, q − 1, i)
    else:          return SELECT(A, q + 1, r, i − k)
```

Same partition as quick sort, but recurse on **only** the side containing rank `i`.

**Why the expected time is Θ(n).** A random pivot lands in the middle half (25th–75th percentile) with probability ≥ 1/2. Conditional on a "good" split, the recursive call is on ≤ `3n/4` elements. So on average,

```
T(n) ≤ T(3n/4) + Θ(n)
     ≤ cn + c(3n/4) + c(3/4)²n + ... = cn · 4 = O(n)
```

a geometric series. `Ω(n)` is trivial (every element must be examined), so `T(n) = Θ(n)`.

**Worst case.** If the pivot is always the min or max, `T(n) = T(n−1) + Θ(n) = Θ(n²)` — same as quick sort's worst case. Randomization almost eliminates this.

#### 4.3.2 Median of Medians — Θ(n) worst case

The classical deterministic linear-time algorithm:

```
LINEAR-SELECT(A, p, r, i):
    1. if |A[p..r]| ≤ 5: sort and return the i-th
    2. Divide elements into ⌈n/5⌉ groups of 5
    3. Find the median of each group (sort and take middle) — O(n)
    4. M = LINEAR-SELECT on the medians, finding the median-of-medians
    5. Partition A around M
    6. Recurse on the appropriate side
```

**Why groups of 5.** After step 4, at least half of the `⌈n/5⌉` group medians are `≤ M`. Each such group contributes at least 3 elements `≤ M` (the group median plus the 2 smaller in its group). So at least

```
3 · ⌈⌈n/5⌉ / 2⌉ ≈ 3n/10
```

elements are `≤ M`. By symmetry, at least `3n/10` are `≥ M`. The recursive call in step 6 therefore runs on at most `n − 3n/10 = 7n/10` elements.

**The recurrence.** `T(n) = T(n/5) + T(7n/10) + Θ(n)`. Since `1/5 + 7/10 = 9/10 < 1`, this is **linear** by the recurrence "sum of fractions < 1 ⇒ `O(n)`" rule. Prove by induction: guess `T(n) ≤ cn`, show it holds if `c` is chosen so that the constants work out.

**Why exactly 5?** Groups of 3 give `T(n) = T(n/3) + T(2n/3) + Θ(n)`, where `1/3 + 2/3 = 1` — the geometric sum diverges, not linear. Groups of 7 would work too but waste time sorting within each group. 5 is the smallest size that buys linear time.

**Practical note.** Median of medians is asymptotically optimal, but the constants are large. Randomized select wins in practice.

### 4.4 Closest Pair of Points in O(n log² n)

Given `n` points in the plane, find the pair with minimum Euclidean distance.

**Brute force:** all `C(n, 2) = n(n−1)/2` distances → `O(n²)`.

**Divide and conquer:**

1. **Preprocess:** sort points by x-coordinate — `O(n log n)`.
2. **Divide:** split into left and right halves by the median x-coordinate.
3. **Conquer:** recursively find `d_L` (closest pair in the left half) and `d_R` (closest pair in the right half).
4. **Combine:** let `d = min(d_L, d_R)`. Check the **strip** of width `2d` around the dividing line for any cross-strip pair closer than `d`.
5. **Return** the minimum of `d_L`, `d_R`, and the best strip distance.

**The strip check — the clever part.** Sort strip points by y-coordinate. For each point `P` in the strip, only points within y-distance `d` above `P` can be closer than `d`. Furthermore, in a rectangle of width `2d` and height `d` above `P`, at most 7 other points can live — so only check the next 7 y-neighbors for each point.

**Why at most 7 other points?** Subdivide the `2d × d` rectangle into 8 cells of size `(d/2) × (d/2)`. Any two points in the same cell are at distance `≤ (d/2) · √2 < d`, contradicting `d_L, d_R ≥ d`. So each cell holds at most 1 point → at most 8 points in the rectangle, meaning the point itself plus at most 7 others.

**Complexity.** Each strip check is `O(n)` per recursive call (with y-sorting `O(n log n)` per call in the basic version). Recurrence: `T(n) = 2T(n/2) + O(n log n) → T(n) = O(n log² n)`. A more careful implementation that maintains y-sorted order through the recursion achieves `O(n log n)`.

### 4.5 When D&C is the wrong tool

Classic case: Fibonacci. Naive recursion `F(n) = F(n−1) + F(n−2)` gives a recursion tree where the subproblem sizes **sum to more than the original** (`(n−1) + (n−2) = 2n − 3`), and the same subproblems are recomputed exponentially many times. Time: `Θ(φⁿ) ≈ O(1.618ⁿ)`.

**The symptom.** If subproblems overlap (share subsolutions), D&C wastes exponential time. **Fix:** DP — solve each subproblem once, store the answer, reuse.

```
fibDP(n):
    F[0] = 0; F[1] = 1
    for i = 2 to n: F[i] = F[i−1] + F[i−2]
    return F[n]
```

`Θ(n)` time, `Θ(n)` space (reducible to `O(1)` by keeping only the last two values).

---

## 5. Greedy Algorithms (W05)

### 5.1 The greedy paradigm

A greedy algorithm solves an **optimization problem** by making the **locally best** choice at each step, never reconsidering. It's simple, fast, and usually wrong — except when the problem has a special structure that makes local choices safe.

```
Greedy(C):
    S = {}                                       // partial solution
    while C ≠ ∅ and S is not a complete solution:
        x = the "best-looking" element in C
        C = C − {x}
        if S ∪ {x} is feasible:
            S = S ∪ {x}
    return S
```

### 5.2 Two conditions for correctness

1. **Greedy-choice property.** There exists an optimal solution that includes the greedy choice. Proven by the **exchange argument**: take any optimal solution that doesn't include the greedy choice, and exchange an element for the greedy choice without worsening the objective.

2. **Optimal substructure.** An optimal solution to the problem contains an optimal solution to the subproblem that remains after the greedy choice.

Both properties must be **proven** for a given problem — intuition is not enough.

### 5.3 When greedy fails — canonical counterexamples

- **Coin change `{1, 3, 4}`, amount 6.** Greedy: `4 + 1 + 1 = 3` coins. Optimal: `3 + 3 = 2`. The greedy-choice property fails.
- **Coin change `{16, 10, 5, 1}`, amount 20.** Greedy: `16 + 1 + 1 + 1 + 1 = 5`. Optimal: `10 + 10 = 2`. Greedy is locked in by the first big pick.
- **0/1 Knapsack by value/weight ratio.** Items `(w=10, v=60), (w=20, v=100), (w=30, v=120)`, capacity 50. Greedy picks item 1 (best ratio) → `60 + 100 = 160`. Optimal picks items 2+3 → `220`. Greedy can waste capacity.
- **Binary tree maximum path sum.** Greedily descending to the larger child can miss the globally best root-to-leaf path.

**Lesson.** Always try to find a counterexample before trusting a greedy algorithm. If you can't find one, try to prove the greedy-choice property.

### 5.4 The greedy algorithm catalog

| Problem | Strategy | Optimal? | Time |
|---------|----------|----------|------|
| Coin change (standard denominations) | Largest coin first | ✓ when denominations divide cleanly | O(k) |
| **Fractional knapsack** | Sort by value/weight, take greedily | ✓ always | O(n log n) |
| 0/1 knapsack | — | ✗ use DP | — |
| **Job scheduling** (min # machines) | Earliest start time | ✓ | O(n log n) + O(mn) |
| **Activity selection** (max activities on 1 machine) | **Earliest finish time** | ✓ | O(n log n) |
| **Huffman coding** | Merge two lowest-freq nodes | ✓ optimal prefix code | O(n log n) |
| **Kruskal's MST** | Cheapest edge that doesn't form a cycle | ✓ | O(m log m) |
| **Prim's MST** | Cheapest edge leaving current tree | ✓ | O(n²) array / O(m log n) heap |
| **Dijkstra's shortest paths** | Nearest unfinalized vertex, relax | ✓ with non-negative weights | O(n²) / O(m log n) |

### 5.5 Job Scheduling vs Activity Selection — the classic confusion

Students conflate these two. They are **different** problems with **different** optimal strategies.

|                 | **Job Scheduling** | **Activity Selection** |
|-----------------|---------------------|-------------------------|
| Machines | Many | **One** |
| Goal | Minimize # of machines to run **all** jobs | Maximize # of jobs that fit |
| Strategy | **Earliest start time** | **Earliest finish time** |
| Why | Balances load; leaves no machine idle prematurely | Finishing early leaves maximum room for future activities |

**Activity selection proof sketch (exchange argument).** Let `g` be the activity with the earliest finish time. Suppose an optimal solution `OPT` doesn't contain `g`. Let `a` be the activity in `OPT` with the earliest finish time. Since `g` finishes no later than `a`, we can swap `a` for `g` without invalidating any other activity in `OPT` — the remaining activities all start at or after `a`'s finish, which is `≥ g`'s finish. The swap gives a solution of the same size that does contain `g`. ∎

### 5.6 Huffman coding — optimal prefix codes

**Setup.** Characters with frequencies. Assign each character a variable-length binary code. Frequent characters get short codes; rare characters get long codes. Codes must be **prefix-free**: no code is a prefix of another (needed for unambiguous decoding).

**Algorithm.**
```
Huffman(chars, freqs):
    Q = min-priority queue of leaf nodes (one per char)
    while |Q| ≥ 2:
        A = extract-min(Q)
        B = extract-min(Q)
        N = new internal node with left=A, right=B, freq = A.freq + B.freq
        insert N into Q
    return Q[root]
```

**Worked example.** Frequencies `A:450, C:270, G:120, T:90`.

```
Step 1: Q = [T:90, G:120, C:270, A:450]
        Merge T(90) + G(120) → N1(210)

Step 2: Q = [N1:210, C:270, A:450]
        Merge N1(210) + C(270) → N2(480)

Step 3: Q = [A:450, N2:480]
        Merge A(450) + N2(480) → Root(930)
```

Tree:
```
           Root:930
           /      \
       A:450      N2:480
                  /    \
               N1:210   C:270
               /   \
            T:90   G:120
```

Codes (left = 0, right = 1): `A = 0`, `C = 10`, `T = 110`, `G = 111`.

**Compression ratio:**

| Char | Freq | Code len | Bits |
|------|------|----------|------|
| A | 450 | 1 | 450 |
| C | 270 | 2 | 540 |
| T | 90 | 3 | 270 |
| G | 120 | 3 | 360 |
| Total: 930 chars | | | **1,620 bits** |

Naive 8-bit ASCII: 930 × 8 = 7,440 bits. Huffman is 1,620 / 7,440 ≈ 22% — about a 5x compression.

**Why optimal.** Proof by exchange argument on the two least-frequent symbols: in any optimal prefix-code tree, there is an optimal solution in which the two deepest leaves are the two least-frequent symbols, and they are siblings. Merging them first is therefore safe.

### 5.7 MST algorithms

#### 5.7.1 Kruskal's algorithm — edge-centric

Sort edges by weight, add each edge unless it creates a cycle, until `n − 1` edges are added.

```
Kruskal(G):
    sort edges by weight ascending
    T = {}
    for each edge (u, v) in sorted order:
        if Find(u) ≠ Find(v):           // u and v in different components
            T = T ∪ {(u, v)}
            Union(u, v)
    return T
```

**Why it works.** The "cut property" of MSTs: for any cut of the graph, the lightest edge crossing the cut is in some MST. Kruskal always adds the lightest edge that doesn't form a cycle — this edge crosses a cut between the components of its endpoints, and must therefore be in some MST.

**Union-Find.** With union-by-rank and path compression, each `Find` and `Union` is nearly `O(1)` (technically `O(α(n))`, inverse Ackermann, which is ≤ 4 for any `n` you'll ever encounter).

**Complexity.** Dominated by sorting edges: `O(m log m) = O(m log n)` (since `m ≤ n²`, `log m = O(log n)`).

#### 5.7.2 Prim's algorithm — vertex-centric

Grow a single tree starting from an arbitrary vertex, always adding the cheapest edge that extends the tree.

```
Prim(G, start):
    D[v] = ∞ for all v; D[start] = 0
    T = ∅
    while T ≠ V:
        u = vertex ∉ T with minimum D[u]
        T = T ∪ {u}
        for each neighbor w of u with w ∉ T:
            if weight(u, w) < D[w]: D[w] = weight(u, w)
    return T (and the edges used)
```

**Why it works.** Same cut property. The edge chosen in each iteration crosses the cut between `T` and `V − T` and is the lightest such edge by construction.

**Complexity.** `O(n²)` with a linear scan for the min-distance vertex; `O(m log n)` with a binary heap (each edge triggers at most one `decrease-key`).

#### 5.7.3 When to use which?

- **Kruskal:** sparse graphs where `m` is close to `n`. Sorting `m` edges is cheap.
- **Prim:** dense graphs where `m ≈ n²`. Linear scan without sorting edges is faster.

On exam questions with small graphs, both give the same MST (edge weights typically unique), just in different orders.

### 5.8 Dijkstra's shortest paths

Find shortest distances from a source `s` to all other vertices, assuming **non-negative** edge weights.

```
Dijkstra(G, s):
    D[v] = ∞ for all v; D[s] = 0
    S = {}
    while S ≠ V:
        u = vertex ∉ S with minimum D[u]
        S = S ∪ {u}
        for each neighbor w of u with w ∉ S:
            if D[u] + weight(u, w) < D[w]:      // edge relaxation
                D[w] = D[u] + weight(u, w)
    return D
```

**Edge relaxation** is the core step: given that `u` is now finalized with correct distance `D[u]`, check whether going through `u` improves the currently-known distance to `w`.

**Greedy invariant (why it works).** When `u` is selected as the minimum-distance unfinalized vertex, `D[u]` is its true shortest distance. Proof by contradiction: any shorter path to `u` must go through some still-unfinalized vertex `y`. Then `D[y] ≥ D[u]` (since `u` was the min), so the path via `y` has length `≥ D[y] + (non-negative tail) ≥ D[u]`, contradiction. The non-negativity assumption is where this argument lives or dies.

**Why negative edges break Dijkstra.** If an edge from an unfinalized vertex `y` can have negative weight, a path `y → u` could arrive at `u` with distance `< D[u]` — but `u` has already been finalized. Use **Bellman-Ford** (`O(VE)`) for graphs with negative edges (but no negative cycles).

**Worked counterexample.** Directed edges `s→a = 4, s→b = 2, a→b = −5`.
- Finalize `s`. Relax: `D[a] = 4, D[b] = 2`.
- Pick `b` (min = 2). Finalize. No outgoing edges.
- Pick `a` (D = 4). Finalize. Try to relax `a → b`: would give `D[b] = −1`, but `b` is already finalized → update ignored.
- Dijkstra returns `D[b] = 2`. Truth: `s → a → b = −1`.

---

## 6. Dynamic Programming (W06)

### 6.1 What DP is, precisely

Dynamic programming solves problems by:

1. Breaking them into **overlapping** subproblems,
2. Solving each subproblem **once** and storing the result,
3. Building up from smaller to larger subproblems,
4. Extracting the answer from the table.

**Required properties.**

| Property | Meaning | Why DP needs it |
|----------|---------|-----------------|
| **Optimal substructure** | The optimal solution to the whole problem contains optimal solutions to its subproblems | Lets us compose bigger answers from smaller ones |
| **Overlapping subproblems** | The same subproblem is needed many times | Makes memoization pay off — without overlap, plain D&C suffices |

**"Programming" means tabulation.** Richard Bellman coined "dynamic programming" in the 1950s for mathematical optimization research; the word has nothing to do with computer programming. "Dynamic" referred to multi-stage decision problems; "programming" meant "working out a tabular plan."

### 6.2 Two DP implementation strategies

| | Memoization (top-down) | Tabulation (bottom-up) |
|--|------------------------|-------------------------|
| Style | Recursion + cache | Iteration, fill table |
| Programming effort | Often easier (add cache to natural recursion) | Needs explicit ordering of subproblems |
| Subproblems solved | Only those actually needed (lazy) | **All** subproblems in scope |
| Overhead | Recursion stack + cache lookups | Tight loops, cache-friendly memory access |
| Typical winner | When few subproblems are needed | When most subproblems are needed |

For the midterm's classical problems (Fibonacci, LCS, edit distance, knapsack, Floyd-Warshall) both approaches work; tabulation is usually cleaner to present.

### 6.3 The DP recipe — 6 steps

1. **Define the subproblem.** What does `OPT[i, j, ...]` represent? Write it as a complete English sentence.
2. **Write the recurrence.** Express `OPT` in terms of smaller subproblems. Cover every case (match/mismatch, take/leave, stay/move).
3. **Identify the base cases.** What are the trivial values? (Usually `OPT[0, ...] = 0` or `∞` or the natural boundary.)
4. **Determine the computation order.** Dependencies must be filled before the cells that need them (top-left → bottom-right for 2D tables, `k`-outermost for Floyd-Warshall).
5. **Extract the answer.** Which cell holds the final value?
6. **(Optional) Traceback.** Reconstruct the actual solution (which items, which path) by following the choices that led to each cell's value.

This recipe turns DP from "clever tricks" into a systematic procedure.

### 6.4 Classic DP problems — the full catalog

#### 6.4.1 Fibonacci (warmup)

- Subproblem: `f[i]` = `i`-th Fibonacci number.
- Recurrence: `f[i] = f[i−1] + f[i−2]`.
- Base: `f[1] = f[2] = 1`.
- Order: `i = 3, 4, ..., n`.
- Answer: `f[n]`.
- Time: `O(n)`. Space: `O(n)`, reducible to `O(1)` (keep only two previous values).

From `Θ(φⁿ)` (naive recursion) to `Θ(n)` (DP) — the canonical demonstration of DP's value.

#### 6.4.2 Matrix Path (maximum sum)

**Problem.** Given an `n × n` matrix of positive integers, find the path from `(1,1)` to `(n,n)` (moving only right or down) that maximizes the sum.

- Subproblem: `c[i, j]` = maximum sum of any path from `(1,1)` to `(i,j)`.
- Recurrence: `c[i, j] = m[i, j] + max(c[i−1, j], c[i, j−1])`.
- Base: `c[i, 0] = c[0, j] = 0`.
- Order: row by row (or column by column).
- Answer: `c[n, n]`.
- Time / space: `O(n²)`.

**Trace (4×4 example):**

```
m = | 6  7 12  5 |            c = | 0  0  0  0  0 |  (padded with zero row/col)
    | 5  3 11 18 |                | 0  6 13 25 30 |
    | 7 17  3  3 |                | 0 11 16 36 54 |
    | 8 10 14  9 |                | 0 18 35 39 57 |
                                  | 0 26 45 59 68 |

Answer: c[4, 4] = 68.
```

#### 6.4.3 Longest Common Subsequence (LCS)

**Problem.** Given strings `X` and `Y`, find the longest sequence appearing in both as a subsequence (order preserved, not necessarily contiguous).

- Subproblem: `c[i, j]` = LCS length of `X₁..ᵢ` and `Y₁..ⱼ`.
- Recurrence:
  - If `X[i] == Y[j]`: `c[i, j] = c[i−1, j−1] + 1` (extend the match).
  - Else: `c[i, j] = max(c[i−1, j], c[i, j−1])` (drop one character, try again).
- Base: `c[i, 0] = c[0, j] = 0`.
- Order: row by row.
- Answer: `c[m, n]`.
- Time / space: `O(mn)`, space reducible to `O(min(m, n))` if only the length matters.

**Worked trace — `X = "ABCB"`, `Y = "BDCAB"`:**

|     |   | B | D | C | A | B |
|-----|---|---|---|---|---|---|
|     | 0 | 0 | 0 | 0 | 0 | 0 |
| A   | 0 | 0 | 0 | 0 | **1** | 1 |
| B   | 0 | **1** | 1 | 1 | 1 | **2** |
| C   | 0 | 1 | 1 | **2** | 2 | 2 |
| B   | 0 | 1 | 1 | 2 | 2 | **3** |

LCS length = 3. One LCS: `"BCB"`.

**Traceback rules.** From `c[m, n]`:
- If `X[i] == Y[j]`: this character is in the LCS; move to `(i−1, j−1)`.
- Else: move to the larger of `c[i−1, j]` and `c[i, j−1]` (break ties either way).

#### 6.4.4 Edit Distance (Levenshtein)

**Problem.** Given strings `X` and `Y`, find the minimum number of single-character operations (insert, delete, replace) to turn `X` into `Y`.

- Subproblem: `E[i, j]` = edit distance between `X₁..ᵢ` and `Y₁..ⱼ`.
- Recurrence:
  - If `X[i] == Y[j]`: `E[i, j] = E[i−1, j−1]` (free — no operation).
  - Else: `E[i, j] = 1 + min(E[i−1, j], E[i, j−1], E[i−1, j−1])`.
    - `E[i−1, j]` + 1: delete `X[i]`.
    - `E[i, j−1]` + 1: insert `Y[j]`.
    - `E[i−1, j−1]` + 1: replace `X[i]` with `Y[j]`.
- Base: `E[i, 0] = i`, `E[0, j] = j` (delete everything, or insert everything).
- Order: row by row.
- Answer: `E[m, n]`.
- Time / space: `O(mn)`.

**Trace — "kitten" → "sitting":**

| E   | ε | s | i | t | t | i | n | g |
|-----|---|---|---|---|---|---|---|---|
| ε   | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| k   | 1 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| i   | 2 | 2 | 1 | 2 | 3 | 4 | 5 | 6 |
| t   | 3 | 3 | 2 | 1 | 2 | 3 | 4 | 5 |
| t   | 4 | 4 | 3 | 2 | 1 | 2 | 3 | 4 |
| e   | 5 | 5 | 4 | 3 | 2 | 2 | 3 | 4 |
| n   | 6 | 6 | 5 | 4 | 3 | 3 | 2 | 3 |

`E[6, 7] = 3`: three operations (replace `k → s`, replace `e → i`, insert `g`).

**Applications.** Spell checking, DNA alignment, `diff` utilities, fuzzy search.

#### 6.4.5 0/1 Knapsack

**Problem.** `n` items, each with weight `wᵢ` and value `vᵢ`. Knapsack capacity `C`. Items cannot be divided. Maximize total value.

- Subproblem: `K[i, w]` = max value using items `1..i` with capacity `w`.
- Recurrence:
  - If `wᵢ > w`: `K[i, w] = K[i−1, w]` (item doesn't fit).
  - Else: `K[i, w] = max(K[i−1, w], K[i−1, w − wᵢ] + vᵢ)` (leave or take).
- Base: `K[0, w] = 0`, `K[i, 0] = 0`.
- Order: `i = 1..n`, `w = 1..C`.
- Answer: `K[n, C]`.
- Time / space: `O(nC)`.

**Worked example.** Items `(w, v) = (2, 12), (1, 10), (3, 20), (2, 15)`, capacity `C = 5`.

| i \ w | 0 | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 (2, 12) | 0 | 0 | 12 | 12 | 12 | 12 |
| 2 (1, 10) | 0 | 10 | 12 | 22 | 22 | 22 |
| 3 (3, 20) | 0 | 10 | 12 | 22 | 30 | 32 |
| 4 (2, 15) | 0 | 10 | 15 | 25 | 30 | **37** |

`K[4, 5] = 37`. Traceback: item 4 is taken (`K[4,5] > K[3,5]` because of item 4), subtract; `K[3, 3] = 22` came from `K[2, 3]` (item 3 not taken); `K[2, 3] = 22` came from `K[1, 2] + 10` (item 2 taken); `K[1, 2] = 12` came from item 1 taken. Items `{1, 2, 4}`, weights `2+1+2 = 5`, values `12+10+15 = 37`. ✓

**Why O(nC) is "pseudo-polynomial".** The *input size* (number of bits to encode capacity `C`) is `O(log C)`. The algorithm runs in time `O(nC) = O(n · 2^(log C))` — exponential in input bit-length. 0/1 knapsack is **NP-hard** in the classical complexity sense; the DP is only polynomial when expressed in terms of the numeric value of `C`.

#### 6.4.6 Coin Change (minimum coins)

**Problem.** Denominations `d₁ > d₂ > ... > dₖ = 1`. Make amount `n` with the minimum number of coins.

- Subproblem: `C[j]` = min coins to make amount `j`.
- Recurrence: `C[j] = min_{dᵢ ≤ j} { C[j − dᵢ] + 1 }`.
- Base: `C[0] = 0`.
- Order: `j = 1..n`.
- Answer: `C[n]`.
- Time: `O(nk)`. Space: `O(n)`.

**Trace — `d = {16, 10, 5, 1}`, amount 20.**

```
C[0] = 0
C[1] = C[0] + 1 = 1
C[2] = 2
C[3] = 3
C[4] = 4
C[5] = min(C[4]+1, C[0]+1) = 1      (use a 5)
C[6] = 2
C[7] = 3
C[8] = 4
C[9] = 5
C[10] = min(..., C[0]+1) = 1         (use a 10)
...
C[16] = min(..., C[0]+1) = 1         (use a 16)
...
C[20] = min(C[19]+1, C[15]+1, C[10]+1, C[4]+1) = min(4, 3, 2, 5) = 2    (two 10s)
```

Greedy would pick `16 + 1 + 1 + 1 + 1 = 5`. DP correctly finds `10 + 10 = 2`.

#### 6.4.7 Floyd-Warshall (all-pairs shortest paths)

**Problem.** Directed weighted graph. Find shortest distance between every pair of vertices.

- Subproblem: `d[i, j, k]` = shortest distance from `i` to `j` using only intermediate vertices from `{1..k}`.
- Recurrence: `d[i, j, k] = min( d[i, j, k−1], d[i, k, k−1] + d[k, j, k−1] )`.
- Base: `d[i, j, 0] = w(i, j)` if edge exists, else `∞`; `d[i, i, 0] = 0`.
- Answer: `d[i, j, n]` for every pair.
- Time: `O(n³)`. Space: `O(n²)` (can be implemented without the `k` dimension).

```
FloydWarshall(W, n):
    D = W
    for k = 1 to n:            // ← OUTERMOST, non-negotiable
        for i = 1 to n:
            for j = 1 to n:
                D[i, j] = min(D[i, j], D[i, k] + D[k, j])
    return D
```

**Why `k` must be outermost.** The `k`-th iteration assumes `D` currently holds shortest distances using intermediates `{1..k−1}`. Only after that iteration is complete is `D` valid for intermediates `{1..k}`. Swapping the loop order destroys this invariant and gives wrong answers.

**Interpretation.** "Is going from `i` to `j` via vertex `k` shorter than the current best?" That's the question each iteration asks.

### 6.5 DP patterns and when they show up

| Pattern | Example | Recurrence form |
|---------|---------|-----------------|
| 1D DP | Fibonacci, Coin Change | `DP[i]` depends on `DP[i−1], DP[i−2], ...` |
| 2D DP on strings | LCS, Edit Distance | `DP[i, j]` depends on `DP[i−1, j], DP[i, j−1], DP[i−1, j−1]` |
| 2D DP on (item, capacity) | 0/1 Knapsack | `DP[i, w]` depends on `DP[i−1, w], DP[i−1, w−wᵢ]` |
| 2D DP on grid | Matrix Path | `DP[i, j]` depends on `DP[i−1, j], DP[i, j−1]` |
| 3D DP on (source, dest, intermediate set) | Floyd-Warshall | `DP[i, j, k]` depends on `DP[i, j, k−1], DP[i, k, k−1], DP[k, j, k−1]` |

Recognize the pattern; the recurrence writes itself.

---

## 7. Paradigm Comparison

### 7.1 D&C vs Greedy vs DP — side by side

| Aspect | Divide & Conquer | Greedy | Dynamic Programming |
|--------|-------------------|--------|---------------------|
| Approach | Split, recurse, combine | Locally-best choice at each step | Solve all subproblems, combine optimally |
| Subproblems | **Independent** (tree) | N/A (no recursion on subproblems) | **Overlapping** (DAG) |
| Correctness | Depends on problem | Only if greedy-choice property holds | Guaranteed with optimal substructure |
| Typical time | `O(n log n)` | `O(n log n)` or `O(n)` | `O(n²)` or `O(n³)` |
| Space | `O(log n)` recursion | `O(1)` to `O(n)` | `O(n)` to `O(n²)` table |
| Typical use | Sorting, search, geometric problems | Scheduling, MST, shortest paths | Sequence alignment, knapsack, chain optimization |

### 7.2 Decision flow — which paradigm for this problem?

```
Does the problem ask for an optimum (min / max / count)?
├── No  → D&C or brute force
└── Yes
    ├── Can you prove a safe greedy choice (greedy-choice property)?
    │    ├── Yes → Greedy (and prove correctness!)
    │    └── No  → proceed
    ├── Do subproblems overlap (same subproblem recurs many times)?
    │    ├── Yes → DP
    │    └── No  → D&C
```

**Practical exam strategy.** Try greedy first. If you can't prove it or find a counterexample, fall back to DP. If subproblems are independent and the problem has a natural recursive structure, use D&C.

### 7.3 The same problem, different paradigms

| Problem | Greedy | DP | D&C |
|---------|:------:|:--:|:---:|
| Coin change (standard denominations) | ✓ | ✓ (overkill) | — |
| Coin change (arbitrary denominations) | ✗ | ✓ | — |
| Fractional knapsack | ✓ | ✓ (overkill) | — |
| 0/1 knapsack | ✗ | ✓ | — |
| Shortest path (non-negative weights) | ✓ (Dijkstra) | ✓ (Bellman-Ford) | — |
| Shortest path (any weights, no neg cycles) | — | ✓ (BF, Floyd-Warshall) | — |
| All-pairs shortest paths | — | ✓ (Floyd-Warshall) | — |
| Sorting | — | — | ✓ (merge/quick) |
| i-th smallest | — | — | ✓ (Select) |
| MST | ✓ (Kruskal/Prim) | — | — |
| Fibonacci | — | ✓ | ✗ (exponential) |
| LCS | ✗ | ✓ | — |
| Edit distance | ✗ | ✓ | — |

### 7.4 A unifying view

D&C, Greedy, and DP are all ways of exploiting **optimal substructure** — the property that the solution to a problem can be built from solutions to subproblems.

- **D&C** works when subproblems are independent (no overlap).
- **Greedy** works when, additionally, a single locally-best choice can be safely committed to without lookahead.
- **DP** works when subproblems overlap but optimal substructure still holds.

Without optimal substructure, none of these paradigms apply — you're looking at brute force, backtracking, or approximation.

---

## 8. Formula Cheat Sheet

**Asymptotic notation shortcut.** For a polynomial `f(n) = aₖnᵏ + ... + a₀`:
- `f(n) = Θ(nᵏ)` — the leading term dominates.
- Proof of `O(nᵏ)`: take `c = |aₖ| + ... + |a₀|`, `n₀ = 1`.
- Proof of `Ω(nᵏ)`: take `c = |aₖ|/2` for large enough `n`.

**Master Theorem — quick reference.** `T(n) = aT(n/b) + f(n)`, `h(n) = n^(log_b a)`:

| Condition on `f(n)` | Case | Result |
|---------------------|------|--------|
| `O(h(n) / n^ε)` for some `ε > 0` | 1 | `Θ(h(n))` |
| `Θ(h(n))` | 2 | `Θ(h(n) log n)` |
| `Ω(h(n) · n^ε)` + regularity | 3 | `Θ(f(n))` |

**Recurrences to know by heart:**

| Recurrence | Solution | Example |
|------------|----------|---------|
| `T(n) = T(n/2) + Θ(1)` | `Θ(log n)` | Binary search |
| `T(n) = T(n−1) + Θ(1)` | `Θ(n)` | Factorial |
| `T(n) = 2T(n/2) + Θ(1)` | `Θ(n)` | — |
| `T(n) = 2T(n/2) + Θ(n)` | `Θ(n log n)` | Merge sort |
| `T(n) = 2T(n/2) + Θ(n log n)` | `Θ(n log² n)` | Closest pair (basic) |
| `T(n) = T(n−1) + Θ(n)` | `Θ(n²)` | Insertion sort, quick sort worst |
| `T(n) = 2T(n−1) + Θ(1)` | `Θ(2ⁿ)` | Tower of Hanoi |
| `T(n) = T(n−1) + T(n−2) + Θ(1)` | `Θ(φⁿ)` ≈ O(1.618ⁿ) | Naive Fibonacci |
| `T(n) = T(n/5) + T(7n/10) + Θ(n)` | `Θ(n)` | Median of medians |

**DP recurrences to know by heart:**
- **LCS:** `c[i,j] = c[i−1, j−1] + 1` if match else `max(c[i−1, j], c[i, j−1])`.
- **Edit Distance:** `E[i,j] = E[i−1, j−1]` if match else `1 + min(E[i−1, j], E[i, j−1], E[i−1, j−1])`.
- **0/1 Knapsack:** `K[i, w] = max(K[i−1, w], vᵢ + K[i−1, w − wᵢ])` if `wᵢ ≤ w`.
- **Matrix Path (max):** `c[i, j] = m[i, j] + max(c[i−1, j], c[i, j−1])`.
- **Coin change (min coins):** `C[j] = min_{dᵢ ≤ j} { C[j − dᵢ] + 1 }`.
- **Floyd-Warshall:** `D[i, j] = min(D[i, j], D[i, k] + D[k, j])`, `k` outermost.

**Algorithm complexity summary:**

| Algorithm | Time | Space | Notes |
|-----------|------|-------|-------|
| Binary search | O(log n) | O(1) | Sorted input required |
| Merge sort | O(n log n) | O(n) | Stable |
| Quick sort (avg) | O(n log n) | O(log n) | Fastest in practice |
| Heap sort | O(n log n) | O(1) | In-place, guaranteed |
| Counting sort | O(n + k) | O(k) | `k = O(n)` required |
| Radix sort | O(d(n + k)) | O(n + k) | LSD → MSD |
| Select (randomized) | O(n) avg | O(log n) | Quick-select |
| Select (MoM) | O(n) worst | O(n) | Deterministic linear |
| Closest pair | O(n log² n) | O(n) | D&C with strip |
| Kruskal | O(m log m) | O(n + m) | Union-Find |
| Prim (heap) | O(m log n) | O(n + m) | Priority queue |
| Dijkstra (heap) | O(m log n) | O(n + m) | Non-negative weights |
| Floyd-Warshall | O(n³) | O(n²) | All-pairs |
| LCS, Edit Distance | O(mn) | O(mn) | Strings |
| 0/1 Knapsack | O(nC) | O(nC) | Pseudo-polynomial |
| Huffman | O(n log n) | O(n) | Optimal prefix code |

---

## 9. Practice Problems (Exam-Style)

### Problem 1 — Master Theorem

**Q.** Find the complexity of `T(n) = 4T(n/2) + n`.

**Solution.** `a = 4, b = 2, f(n) = n`. `n^(log_b a) = n^(log₂ 4) = n²`. Compare `f(n) = n` with `n²`: `n = O(n^(2−1))` with `ε = 1`. **Case 1**. Answer: `T(n) = Θ(n²)`.

### Problem 2 — Big-O Proof

**Q.** Prove `5n³ + 2n² + 7 = O(n³)`.

**Solution.** Take `c = 5 + 2 + 7 = 14, n₀ = 1`. For all `n ≥ 1`:
`5n³ + 2n² + 7 ≤ 5n³ + 2n³ + 7n³ = 14n³ = c · n³`. ∎

### Problem 3 — Greedy vs DP (Coin Change)

**Q.** Coins `{1, 3, 4}`, amount 6. Compare greedy and DP solutions.

**Greedy:** `4 + 1 + 1 = 3` coins.

**DP:**

| j    | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|------|---|---|---|---|---|---|---|
| C[j] | 0 | 1 | 2 | 1 | 1 | 2 | **2** |

`C[6] = min(C[5]+1, C[3]+1, C[2]+1) = min(3, 2, 3) = 2`. Optimal: `3 + 3 = 2` coins.

**Discussion.** The greedy-choice property fails for `{1, 3, 4}`: committing to the 4 blocks the better option of two 3s. This is a canonical exam pitfall.

### Problem 4 — LCS

**Q.** Find the LCS of `X = "ABCB"` and `Y = "BDCAB"`.

|     |   | B | D | C | A | B |
|-----|---|---|---|---|---|---|
|     | 0 | 0 | 0 | 0 | 0 | 0 |
| A   | 0 | 0 | 0 | 0 | **1** | 1 |
| B   | 0 | **1** | 1 | 1 | 1 | **2** |
| C   | 0 | 1 | 1 | **2** | 2 | 2 |
| B   | 0 | 1 | 1 | 2 | 2 | **3** |

**Answer.** Length 3, LCS = `"BCB"` (one of several). Trace from `c[4, 5]` diagonally when characters match.

### Problem 5 — 0/1 Knapsack

**Q.** Items `(w, v) = (2, 12), (1, 10), (3, 20), (2, 15)`, capacity 5. Find `K[4, 5]` and the chosen items.

| i \ w | 0 | 1 | 2 | 3 | 4 | 5 |
|-------|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 (2, 12) | 0 | 0 | 12 | 12 | 12 | 12 |
| 2 (1, 10) | 0 | 10 | 12 | 22 | 22 | 22 |
| 3 (3, 20) | 0 | 10 | 12 | 22 | 30 | 32 |
| 4 (2, 15) | 0 | 10 | 15 | 25 | 30 | **37** |

**Answer.** `K[4, 5] = 37`. Traceback: items 1, 2, 4 with total weight 5 and total value 37.

### Problem 6 — Quick Sort Worst Case

**Q.** What input makes quick sort (last-element pivot) `Θ(n²)`? How does randomized pivot selection fix this?

**A.** An already-sorted (or reverse-sorted) array. Every partition call produces a `0 : (n−1)` split. The recurrence becomes `T(n) = T(n−1) + Θ(n) = Θ(n²)`.

Randomized pivot: pick a uniform random index `r'` in `[p..r]`, swap `A[r'] ↔ A[r]`, then run standard partition. The probability of repeated worst-case splits is negligible; expected time becomes `Θ(n log n)`. The guarantee is over the algorithm's randomness, not over the input.

### Problem 7 — Dijkstra with Negative Edges

**Q.** Give a small graph where Dijkstra returns an incorrect shortest distance.

**A.** Directed edges `s → a = 4, s → b = 2, a → b = −5`.

- Finalize `s`. Relax: `D[a] = 4, D[b] = 2`.
- Pick `b` (min = 2). Finalize. No outgoing edges.
- Pick `a` (D = 4). Finalize. Try to relax `a → b`: would yield `D[b] = −1`, but `b` is already finalized — update ignored.

Dijkstra returns `D[b] = 2`. True shortest distance: `s → a → b = 4 − 5 = −1`. The greedy invariant "once finalized, distance is optimal" fails the moment a negative edge can still improve an already-finalized vertex.

### Problem 8 — Activity Selection

**Q.** Activities `(s, f)`: `(1, 3), (2, 5), (4, 7), (1, 8), (5, 9), (8, 10)`. Apply earliest-finish-time.

Sorted by finish: `(1,3), (2,5), (4,7), (1,8), (5,9), (8,10)`.

- Pick `(1,3)`: `last = 3`.
- `(2,5)`: `start 2 < 3` → skip.
- `(4,7)`: `4 ≥ 3` → pick. `last = 7`.
- `(1,8)`: `1 < 7` → skip.
- `(5,9)`: `5 < 7` → skip.
- `(8,10)`: `8 ≥ 7` → pick. `last = 10`.

**Answer.** 3 activities: `{(1, 3), (4, 7), (8, 10)}`.

### Problem 9 — Merge Sort Recurrence by Substitution

**Q.** Solve `T(n) = 2T(n/2) + n`, `T(1) = 1`, without using the Master Theorem.

**A.** Assume `n = 2ᵏ`. Unroll:
```
T(n) = 2T(n/2) + n
     = 4T(n/4) + 2n
     = 2ᵏ T(n/2ᵏ) + kn
```
Set `2ᵏ = n` (so `k = log₂ n`): `T(n) = n · T(1) + n log₂ n = n + n log n = Θ(n log n)`. ∎

### Problem 10 — Huffman Coding

**Q.** Build a Huffman code for `A:5, B:9, C:12, D:13, E:16, F:45`. Compute average bits per character.

**Construction.**
```
Q = [A:5, B:9, C:12, D:13, E:16, F:45]

Merge A+B → N1:14
Q = [C:12, D:13, N1:14, E:16, F:45]

Merge C+D → N2:25
Q = [N1:14, E:16, N2:25, F:45]

Merge N1+E → N3:30
Q = [N2:25, N3:30, F:45]

Merge N2+N3 → N4:55
Q = [F:45, N4:55]

Merge F+N4 → Root:100
```

One valid code tree (left=0, right=1):
- `F = 0` (length 1)
- `C = 100` (length 3)
- `D = 101` (length 3)
- `A = 1100` (length 4)
- `B = 1101` (length 4)
- `E = 111` (length 3)

Total bits = 5·4 + 9·4 + 12·3 + 13·3 + 16·3 + 45·1 = 20 + 36 + 36 + 39 + 48 + 45 = **224**. Average = 224 / 100 = **2.24 bits/char**.

### Problem 11 — MST by Kruskal

**Q.** Apply Kruskal to edges `(A,B,4), (A,C,1), (B,C,2), (B,D,5), (C,D,3)`. Compute the MST.

Sort edges by weight: `(A,C,1), (B,C,2), (C,D,3), (A,B,4), (B,D,5)`.

- `(A,C,1)`: add. Components: `{A,C}, {B}, {D}`.
- `(B,C,2)`: add. Components: `{A,B,C}, {D}`.
- `(C,D,3)`: add. Components: `{A,B,C,D}`. **Done** (n − 1 = 3 edges).

MST weight: `1 + 2 + 3 = 6`. Edges skipped: `(A,B,4)` and `(B,D,5)` would create cycles.

### Problem 12 — Induction Proof of a Recurrence

**Q.** Prove by induction that `T(n) = T(n/2) + 1, T(1) = 1` satisfies `T(n) = O(log n)`.

**Guess:** `T(n) ≤ c log₂(n) + d` for constants `c, d` we'll fix.

*Base:* `T(1) = 1 ≤ c · 0 + d = d`, so `d ≥ 1` works.

*Inductive step:* Assume `T(n/2) ≤ c log(n/2) + d = c log n − c + d`. Then

```
T(n) = T(n/2) + 1
     ≤ c log n − c + d + 1
     ≤ c log n + d          (when c ≥ 1)
```

Choose `c = 1, d = 1`. ∎

---

## 10. Common Pitfalls

### 10.1 Notation and proofs

| Pitfall | How to avoid |
|---------|--------------|
| Confusing `O`, `Ω`, `Θ` | `O` = upper, `Ω` = lower, `Θ` = both tight. Never say "`Θ` is better than `O`." They describe different bounds. |
| Writing a loose `O` bound | Prefer `O(n log n)` to `O(n²)` when both hold; looseness is information loss. |
| Proving `O` without specifying `c, n₀` | Always write "take `c = ..., n₀ = ...`." Graders want to see the witnesses. |
| "Induction: `cn + 1 ≤ cn`?" | **No, that's not a proof.** Strengthen the guess to `cn − d`. |
| Applying Master Theorem when `f(n)` isn't a polynomial | E.g., `T(n) = 2T(n/2) + n log n` needs the extended MT or substitution. |
| Forgetting the regularity condition in Case 3 | Most exams only ask Cases 1 and 2; you can often sidestep Case 3. |

### 10.2 Sorting

| Pitfall | How to avoid |
|---------|--------------|
| "Quick sort is `O(n log n)`" (without qualifier) | Specify: average `O(n log n)`, worst `O(n²)`. |
| "Merge sort is stable but `O(1)` space" | No — merge sort needs `O(n)` auxiliary space. |
| "Counting sort works on any integer input" | Only when `k = O(n)`. For `k = n²`, counting sort is worse than comparison sorts. |
| "Radix sort can be MSD-first" | LSD-first is the simple classical version. MSD-first is different (recursive). |
| "Heap sort is stable" | No — heap sort is not stable. |
| Confusing min-heap and max-heap | Min-heap extracts min; gives descending order if used in heap sort. Max-heap gives ascending order. |
| `buildHeap` is `O(n log n)` | No — it's `O(n)` via the tighter analysis. Heapify at depth `h` costs `O(h)`, and there are many fewer deep nodes than shallow ones. |
| Comparison-based sort lower bound is `Ω(n²)` | No — it's `Ω(n log n)`, proven by decision tree. |

### 10.3 Greedy

| Pitfall | How to avoid |
|---------|--------------|
| Claiming greedy is optimal without proof | Always check with a counterexample first, then prove the greedy-choice property. |
| Confusing fractional vs 0/1 knapsack | Fractional: sort by value/weight, greedy. 0/1: DP. |
| Confusing Job Scheduling vs Activity Selection | Multiple machines → EST. Single machine → EFT. |
| Using Dijkstra with negative edges | Use Bellman-Ford. Dijkstra's greedy invariant requires non-negative weights. |
| Kruskal without Union-Find | Cycle detection becomes `O(n)` per edge — kills the complexity. |
| Prim on sparse graphs is best | Actually Kruskal is usually better for sparse; Prim shines on dense. |
| Using Dijkstra when you need all-pairs | Use Floyd-Warshall or run Dijkstra `n` times (but watch the complexity). |

### 10.4 DP

| Pitfall | How to avoid |
|---------|--------------|
| Wrong base case | Hand-trace the recurrence on `n = 0, 1, 2`. |
| Off-by-one in the DP table | Be explicit whether you're 0-indexed or 1-indexed. Include a header row/column for ε. |
| Wrong loop order in Floyd-Warshall | `k` **must** be outermost. The other two can be in any order. |
| Using `O(mn)` space when `O(min(m,n))` suffices | For LCS length only, you need only two rows at a time. Saves memory on large inputs. |
| Confusing "overlapping subproblems" with "sharing input" | Overlapping means the *same* subproblem is computed multiple times in naive recursion. |
| "0/1 knapsack is polynomial" | It's *pseudo*-polynomial — polynomial in capacity value, not in input bit-length. NP-hard in the classical sense. |

### 10.5 D&C

| Pitfall | How to avoid |
|---------|--------------|
| Applying D&C when subproblems overlap | Use DP instead. |
| Forgetting the base case in pseudocode | Always state "if `n ≤ some_threshold`, solve directly." |
| Closing pair strip check: comparing all pairs | Only compare each point to the next 7 neighbors by y-coord. |
| Median of medians with groups of 3 | Doesn't give linear time. Use groups of 5. |
| "Randomized Select is always `O(n)`" | It's `O(n)` **expected**. Worst case is still `O(n²)`. |

---

## 11. Final Checklist

Before you walk into the exam, you should be able to answer "yes" to every one of these.

**Foundations (W01):**
- [ ] State the four properties of an algorithm.
- [ ] Trace Euclidean GCD by hand.
- [ ] Apply binary search to an explicit array.
- [ ] State the Euler circuit/path conditions on vertex degrees.
- [ ] Explain why the counterfeit-coin and poisoned-wine problems use `log₂(n)`.

**Complexity (W02):**
- [ ] Count elementary operations in given pseudocode.
- [ ] Prove `f(n) = O(g(n))` by finding explicit `c, n₀`.
- [ ] Prove a matching `Ω(g(n))` bound to get `Θ`.
- [ ] Solve `T(n) = 2T(n/2) + n` by substitution.
- [ ] Apply the Master Theorem Cases 1 and 2 fluently.
- [ ] Identify recurrences the Master Theorem doesn't handle.
- [ ] Complete an induction proof with the `cn − d` strengthening trick.

**Sorting (W03):**
- [ ] Reproduce the full sorting comparison table.
- [ ] Trace partition on a small array.
- [ ] Explain why quick sort is `Θ(n²)` on sorted input and how randomization fixes it.
- [ ] Explain why comparison-based sorting is `Ω(n log n)`.
- [ ] Explain why `buildHeap` is `O(n)`, not `O(n log n)`.
- [ ] State when counting/radix sort are applicable.

**D&C (W04):**
- [ ] State the three steps (divide/conquer/combine).
- [ ] Explain what distinguishes D&C from DP (independent vs overlapping subproblems).
- [ ] Trace the closest-pair strip check on a small example.
- [ ] Explain why Median of Medians uses groups of 5 specifically.

**Greedy (W05):**
- [ ] State the greedy-choice property and optimal substructure.
- [ ] Give a counterexample where greedy coin change fails.
- [ ] Distinguish Job Scheduling (EST) from Activity Selection (EFT).
- [ ] Execute Kruskal and Prim on a small graph.
- [ ] Execute Dijkstra on a small graph with non-negative weights.
- [ ] Build a Huffman tree for given frequencies.
- [ ] Give a negative-edge counterexample where Dijkstra fails.

**DP (W06):**
- [ ] State the two required properties (optimal substructure, overlapping subproblems).
- [ ] Execute the 6-step DP recipe on a new problem.
- [ ] Fill the LCS, Edit Distance, and 0/1 Knapsack tables by hand.
- [ ] Trace back the LCS and the knapsack item set.
- [ ] Explain why Floyd-Warshall puts `k` as the outermost loop.
- [ ] Explain what "pseudo-polynomial" means for 0/1 knapsack.

**Paradigm synthesis:**
- [ ] Given a new problem, decide D&C / Greedy / DP (with reasons).
- [ ] For problems that admit multiple paradigms, state each solution's complexity.

> **If every box is ticked, you are as prepared as you can be. Go do well.** 🎯

---

*Detailed edition v1 — 2026-04-14*
