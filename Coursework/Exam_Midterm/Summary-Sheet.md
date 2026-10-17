# Midterm Summary Sheet

[Repository Guide](../../README.md) | [English](Summary-Sheet.md) | [한국어](Summary-Sheet.ko.md)

> **Last Updated:** 2026-10-18

---

## Table of Contents

- [1. Glossary](#1-glossary)
- [2. Week 1: Introduction to Algorithms](#2-week-1-introduction-to-algorithms)
- [3. Week 2: Complexity Analysis](#3-week-2-complexity-analysis)
- [4. Week 3: Data Structures and Basic Sorting](#4-week-3-data-structures-and-basic-sorting)
- [5. Week 4: Divide and Conquer](#5-week-4-divide-and-conquer)
- [6. Week 5: Greedy](#6-week-5-greedy)
- [7. Week 6: Dynamic Programming](#7-week-6-dynamic-programming)
- [8. Formula Cheat Sheet](#8-formula-cheat-sheet)
- [9. Paradigm Decision Flow](#9-paradigm-decision-flow)
- [10. Exam-Style Examples](#10-exam-style-examples)
- [11. Ten Expected Exam Questions with Model Answers](#11-ten-expected-exam-questions-with-model-answers)
- [12. Common Mistakes](#12-common-mistakes)

---

<br>

## 1. Glossary

Because the exam questions are in English, write the English term in parentheses the first time a Korean term appears in an answer.

| English | Korean | One-Line Definition |
|---|---|---|
| Algorithm | 알고리즘 | A procedure that takes input and produces output in a finite number of steps. |
| Correctness | 정확성 | The property of producing the correct output for every valid input. |
| Finiteness | 유한성 | The property of always terminating in finite time. |
| Pseudocode | 의사코드 | A way of describing an algorithm that mixes natural language with programming constructs. |
| GCD | 최대공약수 | The largest integer that divides both numbers. |
| Big-O | O-표기 | A notation for an asymptotic upper bound. |
| Big-Omega | Ω-표기 | A notation for an asymptotic lower bound. |
| Theta | Θ-표기 | Denotes a tight bound (the upper and lower bounds have the same order). |
| Recurrence Relation | 점화식 | An equation that expresses a function's value in terms of smaller inputs. |
| Master Theorem | 마스터 정리 | A theorem that solves recurrences of the form $T(n)=aT(n/b)+f(n)$ in one step. |
| Divide and Conquer | 분할 정복 | A technique that splits a problem into smaller parts, solves each, and combines the results. |
| Greedy | 그리디 | A technique that makes the locally optimal choice at each step. |
| Dynamic Programming | 동적 계획법 | A technique that solves each overlapping subproblem only once, stores the result, and reuses it. |
| Overlapping Subproblems | 중복 부분 문제 | The property that the same subproblem appears many times in the recursive call structure. |
| Optimal Substructure | 최적 부분 구조 | The property that an optimal solution is built from optimal solutions of subproblems. |
| Memoization | 메모이제이션 | A top-down DP implementation that combines recursion with a cache. |
| Tabulation | 테이블화 | A bottom-up DP implementation that fills in subproblems from the smallest with loops. |
| Stack | 스택 | A data structure in which the last element pushed comes out first (LIFO). |
| Queue | 큐 | A data structure in which the first element inserted comes out first (FIFO). |
| Heap | 힙 | A complete binary tree that maintains a parent-child priority relation. |
| Stable Sort | 안정 정렬 | A sort that preserves the relative order of elements with equal keys. |
| In-Place | 제자리 정렬 | A sort that uses only $O(1)$ extra memory. |
| Selection Sort | 선택 정렬 | A sort that finds the maximum (or minimum) at each step and moves it to the end. |
| Bubble Sort | 버블 정렬 | A sort that compares and swaps adjacent elements to push larger values toward the end. |
| Insertion Sort | 삽입 정렬 | A sort that inserts each new element into its correct position in the already sorted part. |
| Merge Sort | 병합 정렬 | A divide-and-conquer sort that halves the array, sorts each half, and merges them. |
| Quick Sort | 퀵 정렬 | A divide-and-conquer sort that partitions around a pivot and recursively sorts both sides. |
| Heap Sort | 힙 정렬 | An algorithm that builds a max-heap and sorts by repeatedly moving the root to the end. |
| Counting Sort | 계수 정렬 | A non-comparison linear-time sort that uses value counts and prefix sums. |
| Radix Sort | 기수 정렬 | A linear-time sort that repeats a stable sort digit by digit to sort the whole input. |
| Binary Search | 이진 탐색 | An algorithm that compares with the middle of a sorted array and halves the search range each time. |
| Partition | 파티션 | An operation that rearranges an array into two regions (at most and greater than) around a pivot. |
| Pivot | 피벗 | The element used as the reference for partitioning. |
| Selection Problem | 선택 문제 | The problem of finding the $i$-th smallest element in an unsorted array. |
| Median of Medians | 중앙값의 중앙값 | A pivot strategy for selection that guarantees linear time even in the worst case. |
| Closest Pair | 최근접 쌍 | The problem of finding the two points with minimum distance among $n$ points in the plane. |
| Greedy-Choice Property | 그리디 선택 속성 | The property that a locally optimal choice always leads to a globally optimal solution. |
| Fractional Knapsack | 분할 가능 배낭 | A knapsack problem in which items can be split; a greedy method gives the optimal solution. |
| 0/1 Knapsack | 0/1 배낭 | A knapsack problem in which items cannot be split; it must be solved with DP. |
| Activity Selection | 활동 선택 | The problem of finding the maximum number of non-overlapping activities one machine can perform. |
| Job Scheduling | 작업 스케줄링 | The problem of finding the minimum number of machines needed to perform all jobs. |
| Huffman Coding | 허프만 코딩 | A compression algorithm that builds an optimal prefix code from character frequencies. |
| MST | 최소 신장 트리 | A tree with minimum total weight that connects all vertices of a connected graph. |
| Kruskal | 크루스칼 알고리즘 | An MST algorithm that scans edges in ascending weight order and adds an edge if it creates no cycle. |
| Prim | 프림 알고리즘 | An MST algorithm that grows a tree step by step from a start vertex. |
| Dijkstra | 다익스트라 알고리즘 | A greedy algorithm for single-source shortest paths in graphs with nonnegative weights. |
| Edge Relaxation | 간선 완화 | An operation that updates a distance when a path through an intermediate vertex is shorter. |
| LCS | 최장 공통 부분 수열 | The problem of finding the length (or the string) of the longest common subsequence of two strings. |
| Edit Distance | 편집 거리 | The minimum number of insertions, deletions, and substitutions that turn one string into another. |
| Floyd-Warshall | 플로이드-워셜 | A DP algorithm for shortest paths between all pairs of vertices. |
| Pseudopolynomial | 의사다항시간 | A complexity that is polynomial in the numeric value but exponential in its bit length. |

*Table 1. English-Korean glossary for the midterm*

---

<br>

## 2. Week 1: Introduction to Algorithms

### Five Properties of an Algorithm
- **Correctness:** It must produce the correct output for every valid input.
- **Executability:** Each step must be mechanically executable.
- **Finiteness:** It must always terminate in finite time.
- **Efficiency:** It must use time and space appropriately.
- **Unambiguity:** Each step must be specified without ambiguity.

### Euclidean GCD
```text
gcd(a, b) = gcd(b, a mod b),  gcd(a, 0) = a
```
**Explanation:** The set of common divisors is preserved by $(a, b) \leftrightarrow (b, a \bmod b)$, so the maximum is also the same. The base case is $b = 0$, where $a$ is the answer. The worst-case complexity is $O(\log \min(a, b))$, and the worst case occurs for pairs of consecutive Fibonacci numbers.

### The $\log_2 n$ Theme (Halving)
Binary Search, the Fake Coin problem, and the Poisoned Wine problem all halve the search space at each step and achieve $\log n$ performance.

### Binary Search Caveat
```python
while left <= right:     # equality is required
    mid = (left + right) // 2
```
**Explanation:** In a sorted array, compare the key with the middle element at each step and halve the search range. If the equality in `<=` is missing, the last remaining element with `left == right` is never checked and the search fails. The complexity is $O(\log n)$.

### Euler Circuit Conditions
- **Circuit condition:** In a connected graph, every vertex must have even degree.
- **Path condition:** In a connected graph, there must be exactly 0 or 2 vertices of odd degree.
- **Caution:** Crossing a bridge (an edge whose removal disconnects the graph) too early makes it impossible to traverse all edges on the other side.

---

<br>

## 3. Week 2: Complexity Analysis

### Definitions of Asymptotic Notation
$$ O(g(n)) = \{ f : \exists c > 0, n_0 \geq 0, \forall n \geq n_0, f(n) \leq c \cdot g(n) \} $$

- **O:** An upper bound, meaning the function grows at most this fast.
- **Ω:** A lower bound, meaning the function grows at least this fast.
- **Θ:** A tight bound, meaning both the upper and lower bounds hold.

### Complexity Hierarchy
```text
O(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)
```

### Big-O Proof Recipe (Polynomials)
- For a polynomial $f = a_k n^k + \cdots + a_0$, choosing $c = |a_k| + \cdots + |a_0|$ and $n_0 = 1$ works in most cases.
- **Example:** $2n^2 - 8n + 3 = O(n^2)$ is proved with $c = 13$ and $n_0 = 1$.

### Three Ways to Solve Recurrences
1. **Iterative substitution:** Expand the recurrence step by step to find a pattern.
2. **Guess and prove by induction:** Guess the form of the solution and verify it by induction, strengthening the guess to $cn \log n - d$ if needed.
3. **Master theorem:** Solves recurrences of the form $T(n) = aT(n/b) + f(n)$ in a standard way.

### Master Theorem Quick Reference
| Case | Condition | Result |
|---|---|---|
| 1 | $f(n) = O(n^{\log_b a - \varepsilon})$ | $\Theta(n^{\log_b a})$ |
| 2 | $f(n) = \Theta(n^{\log_b a})$ | $\Theta(n^{\log_b a} \log n)$ |
| 3 | $f(n) = \Omega(n^{\log_b a + \varepsilon})$ + regularity condition | $\Theta(f(n))$ |

*Table 2. The three cases of the master theorem*

### Master Theorem Examples
| Recurrence | $a, b$ | $n^{\log_b a}$ | $f(n)$ | Case | Result |
|---|---|---|---|---|---|
| $T(n) = 2T(n/2) + n$ | 2, 2 | $n$ | $n$ | 2 | $\Theta(n \log n)$ |
| $T(n) = T(n/2) + 1$ | 1, 2 | $1$ | $1$ | 2 | $\Theta(\log n)$ |
| $T(n) = 2T(n/2) + 1$ | 2, 2 | $n$ | $1$ | 1 | $\Theta(n)$ |
| $T(n) = 4T(n/2) + n$ | 4, 2 | $n^2$ | $n$ | 1 | $\Theta(n^2)$ |
| $T(n) = 4T(n/2) + n^2$ | 4, 2 | $n^2$ | $n^2$ | 2 | $\Theta(n^2 \log n)$ |
| $T(n) = 7T(n/2) + n^2$ (Strassen) | 7, 2 | $n^{\log_2 7}$ | $n^2$ | 1 | $\Theta(n^{\log_2 7})$ |

*Table 3. Applications of the master theorem*

### When the Master Theorem Does Not Apply
- $T(n) = T(n-1) + n$ gives $\Theta(n^2)$ by iterative substitution.
- $T(n) = T(n-1) + T(n-2) + 1$ gives $\Theta(\phi^n)$ when solved with the characteristic polynomial.
- $T(n) = T(n/5) + T(7n/10) + n$ gives $\Theta(n)$ by induction and a geometric series sum.

---

<br>

## 4. Week 3: Data Structures and Basic Sorting

### Data Structure Summary
| Structure | Access Method | Main Operation Costs |
|---|---|---|
| Array / list | Index-based | Access $O(1)$, insertion and deletion in the middle $O(n)$ |
| Stack (LIFO) | push / pop | All $O(1)$ |
| Queue (FIFO) | enqueue / dequeue | All $O(1)$ |
| Heap | Priority-based | insert and extract $O(\log n)$, buildHeap $O(n)$ |

*Table 4. Access methods and main operation costs of basic data structures*

### Array Representation of a Heap (1-index)
- The children of node $i$ are $A[2i]$ and $A[2i+1]$.
- The parent of node $i$ is $A[\lfloor i/2 \rfloor]$.
- In a **Max-Heap**, every parent key is greater than or equal to its children's keys.

### Complete Sorting Comparison
| Algorithm | Worst | Average | Best | Space | Stable | In-Place |
|---|---|---|---|---|---|---|
| Selection | $\Theta(n^2)$ | $\Theta(n^2)$ | $\Theta(n^2)$ | $O(1)$ | ✗ | ✓ |
| Bubble | $\Theta(n^2)$ | $\Theta(n^2)$ | $\Theta(n)$ | $O(1)$ | ✓ | ✓ |
| Insertion | $\Theta(n^2)$ | $\Theta(n^2)$ | $\Theta(n)$ | $O(1)$ | ✓ | ✓ |
| Merge | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $O(n)$ | ✓ | ✗ |
| Quick | $\Theta(n^2)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $O(\log n)$ | ✗ | ✓ |
| Heap | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $\Theta(n \log n)$ | $O(1)$ | ✗ | ✓ |
| Counting | $\Theta(n+k)$ | $\Theta(n+k)$ | $\Theta(n+k)$ | $O(k)$ | ✓ | ✗ |
| Radix | $\Theta(d(n+k))$ | $\Theta(d(n+k))$ | $\Theta(d(n+k))$ | $O(n+k)$ | ✓ | ✗ |

*Table 5. Time, space, stability, and in-place comparison of sorting algorithms*

### Comparison-Based Lower Bound
- Every comparison-based sort needs $\Omega(n \log n)$ comparisons in the worst case.
- It is proved with the decision tree model: to distinguish $n!$ permutations, the height must be at least $\log_2(n!) = \Theta(n \log n)$.
- Counting sort and radix sort do not use comparisons, so they can bypass this lower bound.

### Sorting Selection Guide
- If stability is required, use merge sort.
- If memory is constrained and a worst-case guarantee is needed, use heap sort.
- If the fastest sort in general is needed, use quick sort with a random pivot.
- For small or nearly sorted inputs, insertion sort is advantageous.
- If the range of integer values is limited, use counting sort or radix sort.

### LSD Order of Radix Sort
- Sort digit by digit from the least significant digit (LSD) to the most significant digit (MSD).
- Each digit sort must be a stable sort (usually counting sort).
- The order from the previous digits must be preserved so that all digits end up sorted.

---

<br>

## 5. Week 4: Divide and Conquer

### Basic Pattern
```text
DivideAndConquer(P):
    if P is small enough:
        solve directly
    else:
        DIVIDE:   split P into subproblems P1, ..., Pk
        CONQUER:  solve each Pi recursively
        COMBINE:  combine the partial solutions into a solution of the original problem
```
**Explanation:** A paradigm that splits a large problem into small independent subproblems, solves them recursively, and combines the results. Because the subproblems do not overlap, each subproblem needs to be solved only once. The recurrence usually has the form $T(n) = aT(n/b) + f(n)$ and is solved with the master theorem. If the subproblems overlap, dynamic programming must be used.

### Representative Algorithms
| Algorithm | Recurrence | Complexity |
|---|---|---|
| Merge sort | $2T(n/2) + \Theta(n)$ | $\Theta(n \log n)$ |
| Binary search | $T(n/2) + O(1)$ | $\Theta(\log n)$ |
| Quick sort (average) | $2T(n/2) + \Theta(n)$ | $\Theta(n \log n)$ |
| Quick sort (worst) | $T(n-1) + \Theta(n)$ | $\Theta(n^2)$ |
| Randomized selection | $T(3n/4) + \Theta(n)$ | Average $\Theta(n)$ |
| Median of medians | $T(n/5) + T(7n/10) + \Theta(n)$ | Worst $\Theta(n)$ |
| Closest pair | $2T(n/2) + O(n \log n)$ | $O(n \log^2 n)$ |

*Table 6. Recurrences and complexities of representative divide-and-conquer algorithms*

### Randomized Selection (Quickselect)
```text
select(A, p, r, i):
    if p == r: return A[p]
    q = partition(A, p, r)
    k = q - p + 1
    if i == k:  return A[q]
    elif i < k: return select(A, p, q-1, i)
    else:       return select(A, q+1, r, i - k)
```
**Explanation:** It reuses the partition of quick sort to compute the pivot's rank $k$, decides which side contains the desired $i$, and recurses only on that one subarray. Because both sides need not be sorted, the average time is $\Theta(n)$. When going right, $i$ is adjusted to $i - k$ to account for the skipped pivot and left part.

### Median of Medians
- Group the elements in fives, find the median of each group, and recursively find the median $M$ of those medians.
- With $M$ as the pivot, at least $3n/10$ elements are at most $M$ and at least $3n/10$ are at least $M$, so the recursive size is at most $7n/10$.
- The recurrence $T(n) = T(n/5) + T(7n/10) + \Theta(n)$ converges to $\Theta(n)$ because $1/5 + 7/10 < 1$.

### Closest Pair
1. Sort the points by x-coordinate.
2. Split into left and right at the median x and recurse on each side.
3. Compute $d = \min(d_L, d_R)$.
4. Form a strip of points within $\pm d$ of the dividing line and sort it by y-coordinate.
5. Within the strip, each point needs to check at most 7 neighbors in y order.

### Partition of Quick Sort (Lomuto)
```text
partition(A, p, r):
    pivot = A[r]
    i = p - 1
    for j = p to r - 1:
        if A[j] ≤ pivot:
            i += 1
            swap A[i] ↔ A[j]
    swap A[i+1] ↔ A[r]
    return i + 1
```
**Explanation:** The last element of the array is used as the pivot. Pointer `i` marks the end of the elements at most the pivot, and `j` is the position currently being checked. If `A[j] ≤ pivot`, `i` is incremented and a swap extends the at-most region. After the loop, the pivot is moved to position $i+1$ to fix its final sorted position, and that index is returned. Elements left of the returned index are at most the pivot, and elements to the right are greater.

### Avoiding the Worst Case
- **Random pivot:** Pick a random index, swap it with the last element, and then partition.
- **Median-of-3:** Use the median of the first, middle, and last elements as the pivot.
- **Introsort:** Switch to heap sort when the recursion depth exceeds a certain level.

### When Divide and Conquer Fails
- Naive recursive Fibonacci is exponential time: $T(n) = T(n-1) + T(n-2) + 1 \to O(\phi^n)$.
- The cause is overlapping subproblems, in which the same subproblem is computed many times.
- Such problems are solved with DP.

---

<br>

## 6. Week 5: Greedy

### Paradigm
At each step, make the choice that looks best right now (local optimum), and never undo a choice already made.

### Two Conditions That Guarantee Correctness
1. **Greedy-Choice Property:** Some optimal solution always contains the greedy choice. It is usually proved by an exchange argument.
2. **Optimal Substructure:** After the greedy choice, an optimal solution of the remaining subproblem becomes part of an optimal overall solution.

### Counterexamples Where Greedy Fails
| Problem | Greedy Result | Optimal Result |
|---|---|---|
| Coins {1, 3, 4}, amount 6 | 4 + 1 + 1 = 3 coins | 3 + 3 = 2 coins |
| Coins {1, 5, 7, 10}, amount 14 | 10 + 1 + 1 + 1 + 1 = 5 coins | 7 + 7 = 2 coins |
| 0/1 knapsack (sorted by value/weight) | Fractions cannot be used even if capacity remains | Must be solved with DP |

*Table 7. Counterexamples in which greedy misses the optimal solution*

### Representative Algorithms
| Problem | Greedy Strategy | Time Complexity |
|---|---|---|
| Coin change (standard currency) | Pick the largest denomination first | $O(k)$ |
| Fractional knapsack | Descending value/weight ratio | $O(n \log n)$ |
| Activity selection (max non-overlapping) | Earliest finishing activity (EFT) | $O(n \log n)$ |
| Job scheduling (min machines) | Earliest starting job (EST) | $O(n \log n)$ |
| Huffman coding | Merge the two lowest-frequency nodes | $O(n \log n)$ |
| Kruskal MST | Edges in ascending weight + Union-Find | $O(m \log m)$ |
| Prim MST | Grow a tree from a start vertex | $O(n^2)$ or $O(m \log n)$ |
| Dijkstra | Finalize the unfinalized vertex with minimum distance | $O(n^2)$ or $O(m \log n)$ |

*Table 8. Strategies and time complexities of representative greedy algorithms*

### Activity Selection vs Job Scheduling (Easily Confused)
| Aspect | Activity Selection | Job Scheduling |
|---|---|---|
| Goal | Maximize the number of activities | Minimize the number of machines |
| Greedy criterion | EFT (earliest finish time) | EST (earliest start time) |
| Number of machines | 1 | Many |

*Table 9. Comparison of activity selection and job scheduling*

### Huffman Coding
```text
1. Build a min-heap Q from the character frequencies.
2. while |Q| ≥ 2:
     A = extract-min(Q)
     B = extract-min(Q)
     N = new node, N.freq = A.freq + B.freq
     N.left = A,  N.right = B
     insert(Q, N)
3. The 0/1 path from the root to each leaf is that character's prefix code.
```
**Explanation:** Repeatedly extract the two lowest-frequency nodes, merge them, and insert the new node back into the heap. Merged nodes sit deeper in the tree and receive longer codes, while high-frequency nodes sit shallower and receive shorter codes. The 0/1 path from the root to each leaf is exactly the prefix code. Optimality is proved by an exchange argument, and the key point is that the two lowest-frequency characters are always siblings in the tree.

### Kruskal vs Prim
| Aspect | Kruskal | Prim |
|---|---|---|
| Approach | Edge-centric | Vertex-centric |
| Data structure | Union-Find | Priority queue |
| Complexity | $O(m \log m)$ | $O(n^2)$ or $O(m \log n)$ |
| Suitable graph | Sparse graph | Dense graph |

*Table 10. Comparison of Kruskal's algorithm and Prim's algorithm*

### Dijkstra
```text
D[v] = ∞ ; D[s] = 0 ; S = {}
while S ≠ V:
    u = vertex outside S with minimum D[u]
    S += {u}
    for v in neighbors(u) \ S:
        if D[u] + w(u, v) < D[v]:
            D[v] = D[u] + w(u, v)     # edge relaxation
```
**Explanation:** It computes the shortest distance $D[v]$ from the source vertex $s$ to each vertex. In each iteration, the unfinalized vertex $u$ with minimum $D$ is added to the finalized set $S$, and edge relaxation is performed on the neighbors of $u$. Thanks to the nonnegative weight assumption, the invariant holds that the $D$ value of a vertex in $S$ never changes afterward.

**Negative edge caution:** With negative edges, an already finalized $D[u]$ may later become smaller, which breaks the greedy invariant. In that case, the Bellman-Ford algorithm ($O(VE)$) must be used.

---

<br>

## 7. Week 6: Dynamic Programming

### Two Required Conditions for DP
1. **Optimal Substructure:** An optimal overall solution contains optimal solutions of subproblems.
2. **Overlapping Subproblems:** The same subproblem appears many times in the recursive structure.

### Memoization vs Tabulation
| Aspect | Memoization (Top-Down) | Tabulation (Bottom-Up) |
|---|---|---|
| Implementation | Recursion combined with a cache | Fill a table with loops |
| Scope of computation | Only the subproblems actually needed | All subproblems |
| Overhead | Recursive call stack | Tight loop |
| Practical speed | Relatively slower | Relatively faster |

*Table 11. Comparison of memoization and tabulation*

### Six-Step DP Recipe
1. Define the subproblem precisely (for example, what `dp[i, j]` means).
2. Write the recurrence.
3. Identify the base cases.
4. Decide the order in which to fill the subproblems.
5. Confirm which cell stores the final answer.
6. If needed, reconstruct the actual solution by backtracking.

### Summary of Representative DP Problems
| Problem | Subproblem | Recurrence Summary | Time | Space |
|---|---|---|---|---|
| Fibonacci | $f[i]$ | $f[i-1] + f[i-2]$ | $O(n)$ | $O(1)$ |
| Matrix path | $c[i,j]$ | $m[i,j] + \max(c[i-1,j], c[i,j-1])$ | $O(n^2)$ | $O(n^2)$ |
| LCS | $c[i,j]$ | $+1$ on match, $\max$ on mismatch | $O(mn)$ | $O(mn)$ |
| Edit distance | $E[i,j]$ | Diagonal on match, $1 + \min$ on mismatch | $O(mn)$ | $O(mn)$ |
| 0/1 knapsack | $K[i,w]$ | $\max(K[i-1,w], v_i + K[i-1, w-w_i])$ | $O(nC)$ | $O(nC)$ |
| Coin change (minimum) | $C[j]$ | $1 + \min_{d_i \leq j} C[j - d_i]$ | $O(nk)$ | $O(n)$ |
| Floyd-Warshall | $d[i,j,k]$ | $\min(d[i,j], d[i,k] + d[k,j])$ | $O(n^3)$ | $O(n^2)$ |

*Table 12. Subproblems, recurrences, and complexities of representative DP problems*

### LCS Recurrence
```text
if X[i] == Y[j]: c[i][j] = c[i-1][j-1] + 1
else:            c[i][j] = max(c[i-1][j], c[i][j-1])
```
**Explanation:** $c[i][j]$ is the LCS length of $X[1..i]$ and $Y[1..j]$. If the last characters match, add 1 to the LCS of the subsequences with both characters removed; if they do not match, take the longer of the case without the last character of $X$ and the case without the last character of $Y$. The actual LCS string is reconstructed by backtracking.

### Edit Distance Recurrence
```text
if X[i] == Y[j]: E[i][j] = E[i-1][j-1]
else:            E[i][j] = 1 + min(E[i-1][j],       # delete
                                   E[i][j-1],       # insert
                                   E[i-1][j-1])     # replace
```
**Explanation:** $E[i][j]$ is the minimum number of operations that turn $X[1..i]$ into $Y[1..j]$. If the last characters match, take the diagonal value as is (0 operations); if they do not match, add 1 to the minimum of the three paths for deletion, insertion, and substitution. The base cases are $E[i][0] = i$ (i deletions) and $E[0][j] = j$ (j insertions).

### 0/1 Knapsack Recurrence
```text
if w[i] > w:  K[i][w] = K[i-1][w]
else:         K[i][w] = max(K[i-1][w],
                            v[i] + K[i-1][w - w[i]])
```
**Explanation:** $K[i][w]$ is the maximum value when items 1..i are considered and the capacity is $w$. For each item, compare the two choices of taking it or not. Taking it requires capacity at least $w_i$, and the value is then the maximum value achievable with items up to $i-1$ in the remaining capacity plus $v_i$. Not taking it carries over the value achievable with items up to $i-1$. Choose the larger of the two.

### Floyd-Warshall
```text
for k = 1 to n:     # k must be the outermost loop
    for i = 1 to n:
        for j = 1 to n:
            D[i][j] = min(D[i][j], D[i][k] + D[k][j])
```
**Explanation:** It gradually expands the set of allowed intermediate vertices as $\{1\} \to \{1, 2\} \to \cdots \to \{1..n\}$ and updates the shortest distance of every pair $i \to j$. The key idea is to check, for every $(i, j)$ at each stage, whether going through vertex $k$ makes the path shorter. $k$ must be the outermost loop because the update for each $k$ must be based on the results that use only $\{1..k-1\}$ as intermediate vertices. Negative edges are allowed, but there must be no negative cycle. The complexity is $\Theta(n^3)$.

---

<br>

## 8. Formula Cheat Sheet

### Recurrence Quick Reference
| Recurrence | Solution | Representative Example |
|---|---|---|
| $T(n) = T(n/2) + 1$ | $\Theta(\log n)$ | Binary search |
| $T(n) = T(n-1) + 1$ | $\Theta(n)$ | Factorial |
| $T(n) = 2T(n/2) + n$ | $\Theta(n \log n)$ | Merge sort |
| $T(n) = 2T(n/2) + 1$ | $\Theta(n)$ | - |
| $T(n) = T(n-1) + n$ | $\Theta(n^2)$ | Insertion sort, quick sort worst case |
| $T(n) = 2T(n-1) + 1$ | $\Theta(2^n)$ | Tower of Hanoi |
| $T(n) = T(n-1) + T(n-2) + 1$ | $\Theta(\phi^n)$ | Naive recursive Fibonacci |

*Table 13. Solutions and examples of representative recurrences*

### Big-O Proof Formula
For a polynomial $f(n) = \sum a_i n^i$, choosing $c = \sum |a_i|$ and $n_0 = 1$ works in most cases.

### Euclidean GCD
$$ \gcd(a, b) = \gcd(b, a \bmod b),  \gcd(a, 0) = a $$

### Comparison-Based Sorting Lower Bound
Every comparison-based sort needs $\Omega(n \log n)$ comparisons in the worst case, which is proved with the decision tree model.

---

<br>

## 9. Paradigm Decision Flow

```text
     Read the problem
             │
             ▼
        Small constraints? (n ≤ hundreds)
           ╱   ╲
        Yes     No
         │       │
         ▼       ▼
   Brute force  Splittable into independent subproblems?
                   ╱   ╲
                Yes     No
                 │       │
                 ▼       ▼
    Divide and conquer  Local optimum = global optimum?
                           ╱   ╲
                        Yes     No
                         │       │
                         ▼       ▼
                      Greedy   Overlapping subproblems +
                               optimal substructure?
                                         │
                                         ▼
                                        DP
```

*Figure 1. Paradigm decision flow based on problem properties*

**Explanation:** When given a new problem, go down from the top by answering the questions. (1) If the constraints are small, even $O(n^2)$ is acceptable, so use brute force. (2) For large inputs, check whether the subproblems are independent; if so, use divide and conquer. (3) Otherwise, check whether the greedy choice is always safe (whether it can be proved by an exchange argument). (4) Finally, if there are overlapping subproblems and optimal substructure, use DP. In practice, the rule of thumb is to try greedy first and switch to DP when a counterexample appears.

### Paradigm Comparison
| Aspect | Divide and Conquer | Greedy | Dynamic Programming |
|---|---|---|---|
| Subproblems | Independent | Not applicable | Overlapping |
| Direction | Recursive | Sequential | Bottom-up or memoization |
| Optimality guarantee | Depends on the problem | Requires the greedy property | Always |
| Typical complexity | $O(n \log n)$ | $O(n \log n)$ or $O(n)$ | $O(n^2)$ or $O(n^3)$ |
| Representative examples | Merge, quick, binary search | Dijkstra, Huffman, MST | LCS, edit distance, knapsack, FW |

*Table 14. Comparison of divide and conquer, greedy, and dynamic programming*

### Same Problem, Different Paradigms
| Problem | Greedy | DP | Divide and Conquer |
|---|---|---|---|
| Coins (standard currency) | ✓ | ✓ | - |
| Coins (arbitrary currency) | ✗ | ✓ | - |
| Fractional knapsack | ✓ | ✓ | - |
| 0/1 knapsack | ✗ | ✓ | - |
| Shortest path (weights ≥ 0) | ✓ (Dijkstra) | ✓ | - |
| Shortest path (negative allowed) | - | ✓ (FW, Bellman-Ford) | - |
| Sorting | - | - | ✓ |
| k-th element | - | - | ✓ |
| MST | ✓ | - | - |

*Table 15. Paradigms applicable to each problem*

---

<br>

## 10. Exam-Style Examples

### Example 1: Master Theorem
Find the complexity of $T(n) = 4T(n/2) + n$.
- Since $a = 4$ and $b = 2$, $n^{\log_b a} = n^2$.
- Since $f(n) = n = O(n^{2 - 1})$, this is Case 1.
- Therefore, $T(n) = \Theta(n^2)$.

### Example 2: Greedy vs DP
Compare the two for coins {1, 3, 4} and amount 6.
- **Greedy:** 4 + 1 + 1 gives 3 coins.
- **DP:** $C[6] = 1 + \min(C[5], C[3], C[2]) = 1 + \min(2, 1, 2) = 2$, so 3 + 3 gives 2 coins.
- In this example, greedy is not optimal.

### Example 3: LCS Table
Find the LCS of $X$ = "ABCB" and $Y$ = "BDCAB".

| | "" | B | D | C | A | B |
|---|---|---|---|---|---|---|
| "" | 0 | 0 | 0 | 0 | 0 | 0 |
| A | 0 | 0 | 0 | 0 | **1** | 1 |
| B | 0 | **1** | 1 | 1 | 1 | **2** |
| C | 0 | 1 | 1 | **2** | 2 | 2 |
| B | 0 | 1 | 1 | 2 | 2 | **3** |

*Table 16. LCS table for "ABCB" and "BDCAB"*

The answer is length 3, and an example LCS is "BCB".

---

<br>

## 11. Ten Expected Exam Questions with Model Answers

The same question may appear on the exam, or the answer structure may be transplanted directly to a similar question. Each answer is organized in the order of definition, need, mechanism, example and proof, and limitations and connections.

### Q1. Big-O Proof: Prove that $2n^2 + 3n + 5 = O(n^2)$.

**Answer:** By the definition of Big-O, the proof is complete once constants $c$ and $n_0$ are given. With $c = 10$ and $n_0 = 1$, for all $n \geq 1$ we have $2n^2 + 3n + 5 \leq 2n^2 + 3n^2 + 5n^2 = 10n^2 = c \cdot n^2$. Therefore, by definition, $2n^2 + 3n + 5 = O(n^2)$. This means that $f$ does not grow asymptotically faster than $g$, and the key point is that it is an upper bound that ignores constant factors. Note that this expression is also $\Theta(n^2)$, so in an actual answer it is more informative to use the tighter Θ notation whenever possible.

### Q2. Master Theorem: Find the time complexity of $T(n) = 3T(n/2) + n^2$.

**Answer:** In the standard form $T(n) = a T(n/b) + f(n)$ of the master theorem, $a = 3$ and $b = 2$, so the comparison function is $h(n) = n^{\log_2 3} \approx n^{1.585}$. Comparing $f(n) = n^2$ with $h(n)$, $n^2 = \Omega(n^{1.585 + \varepsilon})$ holds with $\varepsilon \approx 0.4$. The regularity condition $a f(n/b) \leq c f(n)$ holds as $3 (n/2)^2 = 0.75 n^2 \leq 0.75 n^2$ for $c = 0.75 < 1$, so this is Case 3. Therefore, $T(n) = \Theta(f(n)) = \Theta(n^2)$. In this case, the work at the root dominates the recursive cost, which is a structure in which the cost of each level of the recursion tree decreases geometrically.

### Q3. Lower Bound for Comparison Sorting: Using the decision tree model, explain why every comparison-based sort needs $\Omega(n \log n)$ comparisons in the worst case.

**Answer:** Any comparison-based sort can be modeled as a decision tree, where each internal node corresponds to one comparison asking whether $A[i] \leq A[j]$, and each leaf corresponds to one possible output permutation. Since there are $n!$ permutations of $n$ elements, the decision tree must have at least $n!$ leaves. A binary tree of height $h$ has at most $2^h$ leaves, so $2^h \geq n!$. Taking logarithms of both sides gives $h \geq \log_2(n!) = \Theta(n \log n)$ (by Stirling's approximation), and since the height of the tree equals the worst-case number of comparisons, $\Omega(n \log n)$ is the lower bound. This lower bound is **a limit of the comparison model itself**, and the same reasoning explains why counting sort and radix sort can achieve $O(n)$ by using information about the value range or the digits.

### Q4. Quick Sort Worst Case: Explain when quick sort becomes $\Theta(n^2)$ and how to avoid it.

**Answer:** Each call of quick sort partitions around a pivot and then processes the two regions recursively. The worst case occurs when the partition is completely unbalanced as $0 : n-1$, and the recurrence then becomes $T(n) = T(n-1) + \Theta(n) = \Theta(n^2)$. A typical worst-case input is **an already sorted array with Lomuto partitioning that uses the last element as the pivot**. There are three avoidance strategies. (1) A **random pivot** picks a random index and swaps it with the last element, lowering the probability of the worst case and giving $\Theta(n \log n)$ on average. (2) **Median-of-3** uses the median of the first, middle, and last elements as the pivot, handling already sorted input safely. (3) **Introsort** switches to heap sort when the recursion depth exceeds $2 \log n$, guaranteeing $O(n \log n)$ in the worst case, and C++ STL `std::sort` uses this method. As a tradeoff, quick sort is in-place and cache-friendly, so it is faster than merge sort on average, but the worst-case risk must always be managed.

### Q5. Why buildHeap Is $O(n)$: Explain why it is not $O(n \log n)$ even though heapify is applied to every node.

**Answer:** Intuitively, it looks like $O(n \log n)$ because an $O(\log n)$ heapify is applied to each of the $n$ nodes, but the key to the tight analysis is the observation that **leaf nodes need no heapify**. In a complete binary tree, there are about $n / 2^{h+1}$ nodes of height $h$, and the heapify cost for each such node is $O(h)$. The total cost is as follows.
$$ \sum_{h=0}^{\log n} \frac{n}{2^{h+1}} \cdot O(h) = O\left( n \sum_{h=0}^{\infty} \frac{h}{2^h} \right) = O(n \cdot 2) = O(n) $$
This is because the infinite series $\sum h / 2^h = 2$. In other words, low-height nodes (close to the leaves) make up most of the nodes and their work is nearly constant, so the depth-weighted sum converges to a linear bound. This result is used to state the overall complexity of heap sort as $O(n) + O(n \log n) = O(n \log n)$.

### Q6. Greedy Optimality Proof for Activity Selection: Prove that the greedy method that selects the earliest finishing activity (EFT) first is optimal.

**Answer:** Prove it by an exchange argument. Let the greedy solution be $G = \{g_1, g_2, \ldots, g_k\}$ and an arbitrary optimal solution be $O = \{o_1, o_2, \ldots, o_m\}$, both sorted by finish time in ascending order. Since greedy first selects the activity that **finishes earliest among all activities**, $\text{finish}(g_1) \leq \text{finish}(o_1)$ holds. Therefore, replacing $o_1$ with $g_1$ in $O$ keeps the later activities non-overlapping and does not change the size. That is, $O' = \{g_1, o_2, \ldots, o_m\}$ is also an optimal solution. Applying this argument inductively, optimality is preserved even if every element of $O$ is replaced by a greedy choice, so $|G| = |O|$. The key intuition is that choosing the activity that finishes earliest leaves the most time for later activities, and this establishes both the greedy-choice property and optimal substructure. The complexity is dominated by sorting by finish time, giving $O(n \log n)$.

### Q7. Dijkstra vs Bellman-Ford: Explain the difference between the two shortest path algorithms and when to use each.

**Answer:** Dijkstra's algorithm is a greedy algorithm that finds single-source shortest paths in graphs with nonnegative weights in $O(m \log n)$ (with a binary heap). At each step, it finalizes the unfinalized vertex $u$ with minimum $D[u]$ and relaxes the distances of its neighbors (edge relaxation), and its greedy invariant is that once $u$ is finalized, $D[u]$ never changes afterward. With negative edges, a shorter path may be found later, which breaks this invariant, so the algorithm gives wrong answers. Bellman-Ford is a DP-style algorithm that relaxes every edge $V-1$ times; its time is $O(VE)$, but it **allows negative edges** and detects a negative cycle if a distance is updated again in the $V$-th iteration. In summary, use Dijkstra if all weights are nonnegative and speed matters, and use Bellman-Ford if there are negative edges or negative cycles must be detected. If shortest paths between all pairs are needed, choose Floyd-Warshall ($O(n^3)$).

### Q8. 0/1 Knapsack: For items $(w, v) = (2, 3), (3, 4), (4, 5), (5, 6)$ and capacity $C = 5$, find the maximum value with DP and explain why greedy fails.

**Answer:** Defining the subproblem $K[i][w]$ as the maximum value when items $1..i$ are considered and the remaining capacity is $w$, the recurrence is $K[i][w] = \max(K[i-1][w],\; v_i + K[i-1][w - w_i])$. The base cases are $K[0][w] = K[i][0] = 0$. The table is as follows.

| $i \backslash w$ | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 (2,3) | 0 | 0 | 3 | 3 | 3 | 3 |
| 2 (3,4) | 0 | 0 | 3 | 4 | 4 | **7** |
| 3 (4,5) | 0 | 0 | 3 | 4 | 5 | 7 |
| 4 (5,6) | 0 | 0 | 3 | 4 | 5 | 7 |

*Table 17. DP table for the 0/1 knapsack example*

The maximum value is $K[4][5] = 7$, and the selected items are items 1 and 2 (weight $2 + 3 = 5$, value $3 + 4 = 7$). Solving greedily (in descending value/weight ratio: item 1 is 1.5, item 2 is 1.33, item 3 is 1.25, item 4 is 1.2), after taking item 1 (2, 3), item 2 (3, 4) still fits in the remaining capacity 3, so in this particular example greedy also gets 7. In general, however, the 0/1 knapsack has cases where taking a high-ratio item leaves too little capacity for the next item and misses a combination with a larger $v$ (for example, with capacity 5 and items (4, 8), (3, 5), (2, 4), greedy gets 8 and DP gets 9), because items cannot be split. In the fractional knapsack, items can be split, so greedy is always optimal, but the 0/1 knapsack guarantees optimality only with DP. The complexity is $O(nC)$, which is pseudopolynomial time.

### Q9. LCS Design: Find the LCS of $X$ = "AGCAT" and $Y$ = "GAC" with DP and explain why each case of the recurrence is valid.

**Answer:** Define the subproblem $c[i][j]$ as the LCS length of $X[1..i]$ and $Y[1..j]$. The recurrence is as follows.
$$ c[i][j] = \begin{cases} 0 & i=0 \text{ or } j=0 \\ c[i-1][j-1] + 1 & X[i] = Y[j] \\ \max(c[i-1][j],\; c[i][j-1]) & X[i] \neq Y[j] \end{cases} $$
The justification for each branch is as follows. (1) If the characters **match**, including that character in the LCS is always optimal. Using the last characters of both strings leaves the problem of adding 1 to the LCS of $X[1..i-1]$ and $Y[1..j-1]$. (2) If the characters **do not match**, at least one of $X[i]$ and $Y[j]$ is not in the LCS, so take the larger of the two cases $c[i-1][j]$ and $c[i][j-1]$. The table is as follows.

| | "" | G | A | C |
|---|---|---|---|---|
| "" | 0 | 0 | 0 | 0 |
| A | 0 | 0 | 1 | 1 |
| G | 0 | 1 | 1 | 1 |
| C | 0 | 1 | 1 | **2** |
| A | 0 | 1 | 2 | 2 |
| T | 0 | 1 | **2** | 2 |

*Table 18. LCS table for "AGCAT" and "GAC"*

The answer is $c[5][3] = 2$, and example LCSs are "GA" or "AC". Backtracking starts at $c[m][n]$, moves diagonally and records the character on a match, and otherwise moves toward the larger of $c[i-1][j]$ and $c[i][j-1]$. Both time and space complexity are $O(mn)$. LCS is used in Git diff, DNA sequence alignment, variants of edit distance, and more.

### Q10. Loop Complexity Analysis: Find the time complexity of the following function and explain the reasoning.

```python
def f(n):
    count = 0
    i = 1
    while i < n:
        for j in range(n):
            count += 1
        i *= 2
    return count
```

**Answer:** The key is to distinguish the growth patterns of the two loops. The outer `while` doubles $i$ with `i *= 2`, so it repeats about $\log_2 n$ times (exactly $\lceil \log_2 n \rceil$ times for $n > 1$) until the condition $i < n$ turns into $i \geq n$. The inner `for` increases $j$ by 1 from 0 to $n-1$, so it runs exactly $n$ times each time. Therefore, the total number of operations is $n \cdot \log_2 n = \Theta(n \log n)$. The general principle is that **a loop that changes by multiplication or division is $O(\log n)$**, as with `i *= 2` or `i /= 2`, and **a loop that changes by addition is $O(n)$**, as with `i += 1`; when they are nested, the product of the two counts is the overall complexity. For example, substituting $n = 16$, the outer loop runs 4 times with $i = 1, 2, 4, 8$ and the inner loop runs 16 times each time, so `count = 64`, which matches $n \log_2 n = 16 \cdot 4 = 64$.

---

<br>

## 12. Common Mistakes

| Mistake | How to Avoid It |
|---|---|
| Confusing O, Ω, and Θ | O is an upper bound, Ω is a lower bound, and Θ is when both bounds are tight. |
| Applying the master theorem to a non-polynomial $f(n)$ | Check the regularity condition, and if it fails, use iterative substitution or induction. |
| Claiming greedy is optimal without proof | Always look for a counterexample first, and if there is none, prove it by an exchange argument. |
| Getting the DP base cases wrong | Verify by tracing $n = 1, 2, 3$ by hand. |
| Mixing up DP table indices | State explicitly whether 0-index or 1-index is used. |
| Confusing fractional knapsack with 0/1 knapsack | Fractional is greedy, and 0/1 is DP. |
| Overlooking quick sort's $n^2$ worst case | Use a random pivot or Median-of-3. |
| Changing the order of the $k$ loop in Floyd-Warshall | $k$ must be the outermost loop. |
| Using negative edges with Dijkstra | If there are negative edges, use Bellman-Ford. |
| Getting stuck at $cn + 1 \leq cn$ in induction | Strengthen the guess to the form $cn - d$ to create slack. |
| Omitting the $O(n)$ space of merge sort | Always state that an auxiliary array is needed. |
| Dropping the equality in binary search's `left <= right` | Without the equality, the last remaining element is never checked. |
| Writing buildHeap as $O(n \log n)$ | It is actually $O(n)$, thanks to the tight analysis in which the leaf half is not processed. |
| Losing stability in counting sort with a forward traversal | Placement must be done in a reverse traversal to guarantee stability. |
| Confusing LCS with a substring | An LCS is a subsequence that need not be contiguous. |

*Table 19. Common mistakes and how to avoid them*
