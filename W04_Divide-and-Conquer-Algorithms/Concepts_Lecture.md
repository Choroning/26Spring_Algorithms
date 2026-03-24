# W04 Lecture — Divide and Conquer Algorithms

> **Last Modified:** 2026-03-24

---

## Table of Contents

- [1. Divide and Conquer Concepts](#1-divide-and-conquer-concepts)
  - [1.1 Divide and Conquer Paradigm](#11-divide-and-conquer-paradigm)
  - [1.2 Divide and Conquer Diagram](#12-divide-and-conquer-diagram)
  - [1.3 Divide Step](#13-divide-step)
  - [1.4 Conquer and Combine](#14-conquer-and-combine)
  - [1.5 Classification of Divide and Conquer Algorithms](#15-classification-of-divide-and-conquer-algorithms)
  - [1.6 Master Theorem — Recursion Tree Intuition](#16-master-theorem--recursion-tree-intuition)
  - [1.7 Master Theorem — Three Cases](#17-master-theorem--three-cases)
  - [1.8 Other Divide and Conquer Recurrence Patterns](#18-other-divide-and-conquer-recurrence-patterns)
- [2. Merge Sort](#2-merge-sort)
  - [2.1 Merge Sort — Overview](#21-merge-sort--overview)
  - [2.2 Merge Sort — Recurrence and Analysis](#22-merge-sort--recurrence-and-analysis)
  - [2.3 Merge Sort — Step-by-Step Example](#23-merge-sort--step-by-step-example)
- [3. Binary Search](#3-binary-search)
  - [3.1 Binary Search — Algorithm](#31-binary-search--algorithm)
  - [3.2 Binary Search — Analysis](#32-binary-search--analysis)
  - [3.3 Binary Search — Step-by-Step Example](#33-binary-search--step-by-step-example)
- [4. Quick Sort](#4-quick-sort)
  - [4.1 Quick Sort — Overview](#41-quick-sort--overview)
  - [4.2 Partition Procedure](#42-partition-procedure)
  - [4.3 Partition — Step-by-Step Example](#43-partition--step-by-step-example)
  - [4.4 Quick Sort — Analysis](#44-quick-sort--analysis)
- [5. Selection Problem](#5-selection-problem)
  - [5.1 Selection Problem — Definition](#51-selection-problem--definition)
  - [5.2 Randomized Selection](#52-randomized-selection)
  - [5.3 Selection — Example 1: 2nd Smallest Element](#53-selection--example-1-2nd-smallest-element)
  - [5.4 Selection — Example 2: 7th Smallest Element](#54-selection--example-2-7th-smallest-element)
  - [5.5 Selection — Average Time Analysis](#55-selection--average-time-analysis)
  - [5.6 Selection — Worst-Case Time Analysis](#56-selection--worst-case-time-analysis)
  - [5.7 Linear Time Selection (Median of Medians)](#57-linear-time-selection-median-of-medians)
  - [5.8 Median of Medians — Step-by-Step Example](#58-median-of-medians--step-by-step-example)
  - [5.9 Median of Medians — Why Balance Is Guaranteed](#59-median-of-medians--why-balance-is-guaranteed)
  - [5.10 Linear Selection — Time Complexity](#510-linear-selection--time-complexity)
- [6. Closest Pair Problem](#6-closest-pair-problem)
  - [6.1 Closest Pair — Problem Definition](#61-closest-pair--problem-definition)
  - [6.2 Closest Pair — Divide and Conquer Approach](#62-closest-pair--divide-and-conquer-approach)
  - [6.3 Closest Pair — Middle Strip](#63-closest-pair--middle-strip)
  - [6.4 Closest Pair — Pseudocode](#64-closest-pair--pseudocode)
  - [6.5 Closest Pair — Execution Example](#65-closest-pair--execution-example)
  - [6.6 Closest Pair — Time Complexity](#66-closest-pair--time-complexity)
- [7. When Divide and Conquer Is Inappropriate](#7-when-divide-and-conquer-is-inappropriate)
  - [7.1 D&C Failure Case — Fibonacci](#71-dc-failure-case--fibonacci)
  - [7.2 Fibonacci — Bottom-Up Solution](#72-fibonacci--bottom-up-solution)
  - [7.3 Considerations When Applying Divide and Conquer](#73-considerations-when-applying-divide-and-conquer)
- [Summary](#summary)
- [Appendix](#appendix)

---

<br>

## 1. Divide and Conquer Concepts

### 1.1 Divide and Conquer Paradigm

An algorithm that **divides** the input of a given problem and **conquers (solves)** each part.

**Three steps:**
1. **Divide** — Split the problem into smaller subproblems
2. **Conquer** — Solve each subproblem recursively
3. **Combine** — Merge the subsolutions to obtain the solution to the original problem

**Key terms:**
- **Subproblem**: A problem defined on the divided input
- **Subsolution**: The solution to a subproblem
- Subproblems are recursively divided until they can no longer be split (base case)

> **Key Idea:** The essence of divide and conquer is that "breaking a large problem into smaller ones makes each one easier." However, simply dividing is not enough — the method for **combining** subsolutions must be efficient for the overall algorithm to be efficient.

### 1.2 Divide and Conquer Diagram

```
          ┌──────────┐
          │ Problem  │
          └────┬─────┘
               ↓ Divide
       ┌───────┴───────┐
  ┌────┴────┐     ┌────┴────┐
  │Subprob 1│     │Subprob 2│
  └────┬────┘     └────┬────┘
       ↓ Conquer       ↓ Conquer
  ┌────┴────┐     ┌────┴────┐
  │Subsol 1 │     │Subsol 2 │
  └────┬────┘     └────┬────┘
       └───────┬───────┘
               ↓ Combine
          ┌────┴─────┐
          │ Solution │
          └──────────┘
```

### 1.3 Divide Step

**Example:** Dividing input of size $n$ into 2 subproblems, each of size $n/2$.

Each division halves the subproblem size:
- After 1 division: each size $= n/2$
- After 2 divisions: each size $= n/2^2$
- ...
- After $k$ divisions: each size $= n/2^k$

**When does the division stop?**
$$n/2^k = 1 \implies k = \log_2 n$$

Total number of divisions $= \log_2 n$

> **[Discrete Mathematics]** The reason $\log_2 n$ appears repeatedly is that halving a size-$n$ input $\log_2 n$ times reduces it to size 1. This is the fundamental reason why $\log n$ always appears in "halving" structures like binary search and merge sort.

### 1.4 Conquer and Combine

- Simply dividing the input is **not sufficient** to solve most problems
- The subproblems must be **conquered**: subsolutions must be obtained
- Subsolutions are **combined (merged)** to construct the solution to the larger subproblem

The method of conquering depends on the specific problem.

### 1.5 Classification of Divide and Conquer Algorithms

General recurrence form:

$$T(n) = a \cdot T(n/b) + O(f(n))$$

- $a$ = number of subproblems after division
- $n/b$ = size of each subproblem
- $f(n)$ = cost of division and combination

| $a$ | $b$ | Algorithm |
|:-----|:-----|:-----------|
| 2 | 2 | Merge Sort, Closest Pair |
| 3 | 2 | Large Integer Multiplication |
| 7 | 2 | Strassen Matrix Multiplication |

> **Key Idea:** In this recurrence, $a$, $b$, and $f(n)$ determine the time complexity of the algorithm. A larger $a$ means more subproblems and higher cost, while a larger $b$ means subproblem sizes decrease faster. $f(n)$ is the divide/combine overhead.

### 1.6 Master Theorem — Recursion Tree Intuition

For $T(n) = a \cdot T(n/b) + O(f(n))$:

**Cost at each level of the recursion tree:**

| Level | Problem Size | # Problems | Cost |
|:------|:----------|:--------|:-----|
| 0 (root) | $n$ | 1 | $f(n)$ |
| 1 | $n/b$ | $a$ | $a \cdot f(n/b)$ |
| $k$ | $n/b^k$ | $a^k$ | $a^k \cdot f(n/b^k)$ |

**Depth:** $k = \log_b n$ &nbsp; **Number of leaves:** $n^{\log_b a}$

![Master Theorem Recursion Tree](../images/ch04_p035_008.png)

> **Note:** The recursion tree is a key tool for visually understanding divide and conquer recurrences. Summing the costs from root to leaves across all levels gives the total time complexity. The Master Theorem simplifies this summation into a comparison between $f(n)$ and $n^{\log_b a}$.

### 1.7 Master Theorem — Three Cases

For $T(n) = a \cdot T(n/b) + O(f(n))$, compare $f(n)$ with $n^{\log_b a}$:

**Case 1:** $f(n) = O(n^{\log_b a - \varepsilon})$ — Leaf cost dominates
$$T(n) = \Theta(n^{\log_b a})$$

**Case 2:** $f(n) = \Theta(n^{\log_b a})$ — Balanced cost
$$T(n) = \Theta(n^{\log_b a} \log n)$$

**Case 3:** $f(n) = \Omega(n^{\log_b a + \varepsilon})$ — Combine cost dominates
$$T(n) = \Theta(f(n))$$

![Recursion Tree Example: T(n)=3T(n/4)+cn²](../images/ch04_p025_006.png)

> **Note (Case 3):** The *regularity condition* is also required: for some $c < 1$, $a \cdot f(n/b) \le c \cdot f(n)$ must hold.

> **Exam Tip:** The procedure for applying the Master Theorem is as follows:
> 1. Identify $a$, $b$, and $f(n)$ from the recurrence
> 2. Compute $n^{\log_b a}$
> 3. Compare $f(n)$ with $n^{\log_b a}$ to determine Case 1, 2, or 3
> 4. Apply the formula for the corresponding case
>
> Exam problems frequently give a recurrence and ask for the time complexity, so this procedure must be thoroughly understood.

### 1.8 Other Divide and Conquer Recurrence Patterns

| Recurrence | Description | Example |
|:--------|:------|:------|
| $T(n) = \frac{1}{n}\sum[T(i) + T(n-i)] + O(?)$ | 2 parts, unequal sizes | Quick Sort |
| $T(n) = T(n/2) + O(?)$ | 2 parts, only 1 needed, half size | Binary Search |
| $T(n) = \max\{T(i), T(n-i)\} + O(?)$ | 2 parts, only 1 needed, unequal sizes | Selection |
| $T(n) = T(n-1) + O(?)$ | Size decreases by 1 | Insertion Sort, Fibonacci |

![Unequal Partition Recursion Tree](../images/ch04_p027_007.png)

> **Key Idea:** The Master Theorem can only be directly applied to recurrences of the form $T(n) = aT(n/b) + f(n)$. For cases like Quick Sort where the partition is unequal, or Insertion Sort where the size decreases by only 1, separate analysis is required.

---

<br>

## 2. Merge Sort

### 2.1 Merge Sort — Overview

**Divide:** Split an array of $n$ elements into two halves of size $n/2$ each

**Conquer:** Recursively sort each half

**Combine:** Merge the two sorted halves into one sorted array

```
MERGE-SORT(A, p, r)
  if p < r
    q = floor((p + r) / 2)
    MERGE-SORT(A, p, q)       // Sort left half
    MERGE-SORT(A, q+1, r)     // Sort right half
    MERGE(A, p, q, r)         // Merge two halves
```

![Merge Sort Operation Tree (CLRS Figure 2.4)](../images/ch02_fig2_4_1.png)

> **[Data Structures]** The key to merge sort is the MERGE process. To merge two sorted arrays into one, repeatedly compare the first elements of each array, place the smaller one into the result array, and advance the pointer. This process takes $\Theta(n)$.

### 2.2 Merge Sort — Recurrence and Analysis

**Recurrence:**
$$T(n) = 2T(n/2) + \Theta(n)$$

- Divide: $O(1)$ — only compute the midpoint
- Conquer: $2T(n/2)$ — two recursive calls on halves
- Combine: $\Theta(n)$ — merge two sorted arrays

**Applying the Master Theorem:** $a=2, b=2, f(n)=\Theta(n)$
$$n^{\log_b a} = n^{\log_2 2} = n^1 = n$$
$$f(n) = \Theta(n) = \Theta(n^{\log_b a}) \implies \text{Case 2}$$

$$T(n) = \Theta(n \log n)$$

**Space complexity:** $O(n)$ (auxiliary array for merging)

> **Note:** Merge sort is always $\Theta(n \log n)$. Unlike quick sort, it has no worst case, which is an advantage, but the $O(n)$ extra space requirement is a disadvantage.

### 2.3 Merge Sort — Step-by-Step Example

```
Original:        [38, 27, 43, 3, 9, 82, 10]
                         ↙ Divide ↘
        [38, 27, 43, 3]      [9, 82, 10]
           ↙ Divide ↘             ↙ Divide ↘
      [38, 27]   [43, 3]    [9, 82]  [10]
         ↙↘         ↙↘        ↙↘
      [38] [27]  [43] [3]  [9] [82]
         ↘↙         ↘↙        ↘↙
      [27, 38]   [3, 43]    [9, 82]  [10]
            ↘ Merge ↙             ↘ Merge ↙
        [3, 27, 38, 43]       [9, 10, 82]
                       ↘ Merge ↙
             [3, 9, 10, 27, 38, 43, 82]
```

---

<br>

## 3. Binary Search

### 3.1 Binary Search — Algorithm

**Idea:** Repeatedly halve the search space in a **sorted** array.

```
BINARY-SEARCH(A, p, r, key)
  if p > r
    return NOT_FOUND
  mid = floor((p + r) / 2)
  if A[mid] == key
    return mid
  else if A[mid] > key
    return BINARY-SEARCH(A, p, mid-1, key)
  else
    return BINARY-SEARCH(A, mid+1, r, key)
```

**Divide and Conquer structure:**
- **Divide:** Compare key with the middle element
- **Conquer:** Recurse on only one half
- **Combine:** Trivial (return the result as is)

> **Key Idea:** Binary search is a special form of divide and conquer where only **one** of the two subproblems needs to be conquered. This is why the recurrence becomes $T(n) = T(n/2) + O(1)$, achieving the very fast time complexity of $\Theta(\log n)$.

### 3.2 Binary Search — Analysis

**Recurrence:**
$$T(n) = T(n/2) + O(1)$$

- Only **1** subproblem of size $n/2$ is needed
- $O(1)$ work at each level (1 comparison)

**Applying the Master Theorem:** $a=1, b=2, f(n)=O(1)$
$$n^{\log_b a} = n^{\log_2 1} = n^0 = 1$$
$$f(n) = O(1) = \Theta(n^{\log_b a}) \implies \text{Case 2}$$

$$T(n) = \Theta(\log n)$$

### 3.3 Binary Search — Step-by-Step Example

Searching for key = **23** in a sorted array:

```
Index: 0   1   2   3   4   5   6   7   8   9
Value: [3,  8, 11, 15, 20, 23, 29, 31, 48, 65]

Step 1: p=0, r=9, mid=4 → A[4]=20 < 23 → search right
      [                   23, 29, 31, 48, 65]
Step 2: p=5, r=9, mid=7 → A[7]=31 > 23 → search left
      [23, 29]
Step 3: p=5, r=6, mid=5 → A[5]=23 == 23 → found at index 5!
```

Found in **3 comparisons** out of 10 elements ($\lceil\log_2 10\rceil = 4$ maximum)

> **Note:** Binary search can only be used on **sorted arrays**. To apply it to unsorted data, sorting at $O(n \log n)$ is required first, so for a single search, linear search ($O(n)$) may actually be more efficient. Sorting + binary search becomes advantageous when multiple searches are performed.

---

<br>

## 4. Quick Sort

### 4.1 Quick Sort — Overview

**Divide:** Partition the array around a **pivot** element

**Conquer:** Recursively sort the two sub-arrays

**Combine:** Trivial (in-place sorting, so already sorted after partition)

```
QUICKSORT(A, p, r)
  if p < r
    q = PARTITION(A, p, r)
    QUICKSORT(A, p, q-1)    // Sort left of pivot
    QUICKSORT(A, q+1, r)    // Sort right of pivot
```

> **Key Idea:** The key difference between merge sort and quick sort: merge sort has a simple divide (split in half) and a difficult combine (merge). In contrast, quick sort has a difficult divide (pivot-based partition) and a trivial combine.

### 4.2 Partition Procedure

Select the **last element** as the pivot. Rearrange so that:
- Elements $\le$ pivot go to the left
- Elements $>$ pivot go to the right

```
PARTITION(A, p, r)
  pivot = A[r]
  i = p - 1
  for j = p to r - 1
    if A[j] <= pivot
      i = i + 1
      swap A[i] and A[j]
  swap A[i+1] and A[r]
  return i + 1
```

Returns the final index of the pivot.

![Partition Regions (CLRS Figure 7.2)](../images/ch07_partition_1.png)

![Partition Iteration Cases (CLRS Figure 7.3)](../images/ch07_partition_2.png)

> **Note:** Variable `i` tracks the "last index of elements ≤ pivot." As `j` scans the array, whenever an element ≤ pivot is found, `i` is incremented and `A[i]` and `A[j]` are swapped to include that element in the left region.

### 4.3 Partition — Step-by-Step Example

Partitioning `A = [31, 8, 48, 73, 11, 3, 20, 29, 65, 15]` with pivot = **15**:

```
pivot = A[9] = 15,  i = -1

j=0: A[0]=31 > 15         → skip              [31, 8, 48, 73, 11, 3, 20, 29, 65, 15]
j=1: A[1]=8  <= 15 → i=0  → swap(A[0],A[1]) [ 8, 31, 48, 73, 11, 3, 20, 29, 65, 15]
j=2: A[2]=48 > 15         → skip              [ 8, 31, 48, 73, 11, 3, 20, 29, 65, 15]
j=3: A[3]=73 > 15         → skip              [ 8, 31, 48, 73, 11, 3, 20, 29, 65, 15]
j=4: A[4]=11 <= 15 → i=1  → swap(A[1],A[4]) [ 8, 11, 48, 73, 31, 3, 20, 29, 65, 15]
j=5: A[5]=3  <= 15 → i=2  → swap(A[2],A[5]) [ 8, 11,  3, 73, 31, 48, 20, 29, 65, 15]
j=6: A[6]=20 > 15         → skip              [ 8, 11,  3, 73, 31, 48, 20, 29, 65, 15]
j=7: A[7]=29 > 15         → skip              [ 8, 11,  3, 73, 31, 48, 20, 29, 65, 15]
j=8: A[8]=65 > 15         → skip              [ 8, 11,  3, 73, 31, 48, 20, 29, 65, 15]

Final: swap A[i+1]=A[3] and A[r]=A[9]:
     [ 8, 11,  3, 15, 31, 48, 20, 29, 65, 73]
                   ^pivot (index 3)
```

Result: `[8, 11, 3 | 15 | 31, 48, 20, 29, 65, 73]`

### 4.4 Quick Sort — Analysis

**Best/Average case:**
- When the pivot splits the array roughly in half each time
$$T(n) = 2T(n/2) + \Theta(n) \implies T(n) = \Theta(n \log n)$$

**Worst case:**
- When the pivot is always the smallest or largest element
- Partition results in sizes 0 and $n-1$
$$T(n) = T(n-1) + \Theta(n) \implies T(n) = \Theta(n^2)$$

**Average case (formal analysis):**
$$T(n) = \frac{1}{n}\sum_{i=0}^{n-1}[T(i) + T(n-1-i)] + \Theta(n) = \Theta(n \log n)$$

**Space:** $O(\log n)$ average (recursion stack), $O(n)$ worst case

> **Exam Tip:** The worst case of quick sort occurs when selecting the last element as pivot on an already sorted (or reverse-sorted) array. To prevent this, in practice strategies such as **random pivot** and **median-of-three** are used.

---

<br>

## 5. Selection Problem

### 5.1 Selection Problem — Definition

**Problem:** Given an unsorted array $A[p \ldots r]$, find the $i$-th smallest element.

**Two algorithms:**
1. Average $\Theta(n)$ — Randomized Select
2. Worst-case $\Theta(n)$ — Median of Medians (Linear Select)

**Divide and Conquer structure:**
- **Divide:** Partition the array by pivot, check the pivot's rank
- **Conquer:** Recurse on only **one** sub-array
- **Combine:** Trivial

$$T(n) \le \max\{T(k-1),\ T(n-k)\} + \Theta(n)$$

> **Note:** The selection problem asks "can we find the $i$-th element without sorting the entire array?" Sorting takes $O(n \log n)$, but selection algorithms solve it in $O(n)$.

### 5.2 Randomized Selection

```
SELECT(A, p, r, i)
  // Find the i-th smallest element in A[p..r]
  if p == r
    return A[p]             // Only one element
  q = PARTITION(A, p, r)    // Pivot is placed at index q
  k = q - p + 1             // Pivot is the k-th smallest in A[p..r]
  if i < k
    return SELECT(A, p, q-1, i)       // Search left
  else if i == k
    return A[q]                       // Pivot is the answer
  else
    return SELECT(A, q+1, r, i-k)     // Search right
```

- **Average time:** $\Theta(n)$
- **Worst-case time:** $\Theta(n^2)$

> **Key Idea:** This algorithm is structurally similar to quick sort, but the critical difference is that it recurses on only **one** sub-array. Quick sort recurses on both sides, but selection only recurses on the side containing the desired rank, making it faster.

### 5.3 Selection — Example 1: 2nd Smallest Element

```
Input: [31, 8, 48, 73, 11, 3, 20, 29, 65, 15]   Find: i=2

Step 1: PARTITION with pivot=15
  Result: [8, 11, 3 | 15 | 31, 48, 20, 29, 65, 73]
  Pivot position k=4 (4th smallest element)

  i=2 < k=4 → search left group [8, 11, 3]

Step 2: PARTITION [8, 11, 3] with pivot=3
  Result: [3 | 8, 11]
  Pivot position k=1

  i=2 > k=1 → search right group [8, 11] for (2-1)=1st smallest

Step 3: PARTITION [8, 11] with pivot=11
  Result: [8 | 11]
  Pivot position k=2

  i=1 < k=2 → search left group [8]

Step 4: Only one element → return 8
```

### 5.4 Selection — Example 2: 7th Smallest Element

```
Input: [31, 8, 48, 73, 11, 3, 20, 29, 65, 15]   Find: i=7

Step 1: PARTITION with pivot=15
  Result: [8, 11, 3 | 15 | 31, 48, 20, 29, 65, 73]
  Left group has 3 elements, pivot is k=4

  i=7 > k=4 → search right group [31, 48, 20, 29, 65, 73]
              for (7-4)=3rd smallest element

Step 2: Recurse on [31, 48, 20, 29, 65, 73]
  Find the 3rd smallest element...
```

### 5.5 Selection — Average Time Analysis

Assuming the desired element is always in the **larger** partition (worst scenario for average):

$$T(n) \le T(3n/4) + \Theta(n)$$

Expanding:
$$T(n) \le cn + c \cdot \frac{3n}{4} + c \cdot \left(\frac{3}{4}\right)^2 n + \cdots$$
$$= cn \sum_{k=0}^{\infty}\left(\frac{3}{4}\right)^k = cn \cdot \frac{1}{1 - 3/4} = 4cn$$

$$\therefore T(n) = O(n)$$

$T(n) = \Omega(n)$ is trivial (every element must be examined), so:

$$T(n) = \Theta(n)$$

> **[Discrete Mathematics]** The infinite geometric series $\sum_{k=0}^{\infty} r^k = \frac{1}{1-r}$ ($|r| < 1$) is used here. Since $r = 3/4 < 1$, the series converges to the constant $4c$. Such geometric decrease appears very frequently in divide and conquer analysis.

### 5.6 Selection — Worst-Case Time Analysis

**Worst case:** Partition always splits into sizes 0 and $n-1$

$$T(n) = T(n-1) + \Theta(n) = \Theta(n^2)$$

Can we guarantee linear time even in the worst case?

**Yes!** Using the **Median-of-Medians** algorithm.

### 5.7 Linear Time Selection (Median of Medians)

```
LINEAR-SELECT(A, p, r, i)
  // Find the i-th smallest element in A[p..r]
  1. if |A| <= 5: sort and return the i-th element
  2. Divide elements into groups of 5 → ceil(n/5) groups
  3. Find the median of each group → m_1, m_2, ..., m_{ceil(n/5)}
  4. M = LINEAR-SELECT(medians, 1, ceil(n/5), ceil(n/10))
     // Recursively find the median of medians
  5. Partition A around M
  6. Recurse on the appropriate side
```

**Key insight:** M is **guaranteed to be a balanced pivot** — at least $3n/10$ elements are smaller than M, and at least $3n/10$ are larger.

> **Note:** The reason for grouping by 5 is that grouping by 3 yields a recurrence $T(n) = T(n/3) + T(2n/3) + \Theta(n)$, which does not achieve linear time, while 7 or more unnecessarily increases the within-group sorting cost. 5 is the smallest group size that guarantees linear time.

### 5.8 Median of Medians — Step-by-Step Example

**Step 2:** Divide 37 elements into groups of 5:

```
Group 1: [5, 1, 2, 9, 24]       Group 5: [34, 6, 20, 32, 4]
Group 2: [17, 33, 18, 16, 26]   Group 6: [35, 15, 25, 11, 8]
Group 3: [30, 13, 10, 21, 29]   Group 7: [28, 23, 27, 22, 19]
Group 4: [3, 36, 7, 37, 12]     Group 8: [31, 14]  (fewer than 5)
```

**Step 3:** Sort each group and take the median (3rd element):

```
Group 1: [1,2,5,9,24]      → median = 5
Group 2: [16,17,18,26,33]  → median = 18
Group 3: [10,13,21,29,30]  → median = 21
Group 4: [3,7,12,36,37]    → median = 12
Group 5: [4,6,20,32,34]    → median = 20
Group 6: [8,11,15,25,35]   → median = 15
Group 7: [19,22,23,27,28]  → median = 23
Group 8: [14,31]           → median = 14
```

**Step 4:** Find the median of $\{5, 18, 21, 12, 20, 15, 23, 14\}$

Recursively call LINEAR-SELECT on these 8 medians to find the 4th smallest:

$$M = 18$$

**Step 5:** Partition the entire array around $M = 18$:
- Left group ($\le 18$): elements ≤ 18
- Right group ($> 18$): elements > 18

**Step 6:** Recurse on the side containing the desired rank.

### 5.9 Median of Medians — Why Balance Is Guaranteed

- At least half of the $\lceil n/5 \rceil$ medians are $\le M$
- For each such median, at least 3 elements in its group are $\le M$
- Therefore, at least $3 \times \lceil n/10 \rceil \approx 3n/10$ elements are $\le M$
- Similarly, at least $3n/10$ elements are $\ge M$
- **Worst case:** recurse on at most $7n/10$ elements

Each column = a group of 5. White circles = medians. Shaded region = elements guaranteed to be $\ge x$.

![Median of Medians Analysis (CLRS Figure 9.1)](../images/ch09_fig9_1_1.png)

### 5.10 Linear Selection — Time Complexity

**Recurrence:**
$$T(n) = T(n/5) + T(7n/10) + \Theta(n)$$

- $T(n/5)$: finding the median of medians (Step 4)
- $T(7n/10)$: recursing on the larger partition (Step 6)
- $\Theta(n)$: grouping, finding group medians, partitioning

Since $1/5 + 7/10 = 9/10 < 1$, the total work decreases geometrically:

$$T(n) \le cn + \frac{9}{10}cn + \left(\frac{9}{10}\right)^2 cn + \cdots = cn \cdot \frac{1}{1 - 9/10} = 10cn$$

$$\therefore T(n) = O(n)$$

$T(n) = \Omega(n)$ is trivial, so: $T(n) = \Theta(n)$

> **Exam Tip:** The condition $1/5 + 7/10 = 9/10 < 1$ is the key to guaranteeing linear time. If this sum were ≥ 1, the geometric decrease would not hold and linear time would not be achieved. Exam questions may ask "why group by 5?" or "why is it linear?"

---

<br>

## 6. Closest Pair Problem

### 6.1 Closest Pair — Problem Definition

**Problem:** Given $n$ points on a 2D plane, find the pair of points that are **closest** to each other.

**Brute-force approach:**
- Compute distances for all pairs: $\binom{n}{2} = n(n-1)/2$ pairs
- Each distance computation: $O(1)$
- **Total:** $O(n^2)$

Can we do better with divide and conquer?

### 6.2 Closest Pair — Divide and Conquer Approach

**Preprocessing:** Sort all points by x-coordinate — $O(n \log n)$

**Divide:** Split point set $S$ into left half $S_L$ and right half $S_R$

**Conquer:** Recursively find closest pair $CP_L$ in $S_L$ and $CP_R$ in $S_R$

**Combine:** Let $d = \min(\text{dist}(CP_L), \text{dist}(CP_R))$
- Check the **middle strip** of width $2d$ for pairs closer than $d$
- If found, this pair is $CP_C$

**Return:** The closest among $CP_L$, $CP_R$, $CP_C$

### 6.3 Closest Pair — Middle Strip

The key insight lies in the **combine** step:

```
        ←── d ──→←── d ──→
        ┌────────┬────────┐
        │        │        │
        │   S_L  │  S_R   │
        │        │        │
        │   ·  · │ ·      │
        │     ·  │   ·    │
        │        │        │
        └────────┴────────┘
        Middle strip (width 2d)
```

- Only points within distance $d$ from the dividing line need to be checked
- Sort the points in the strip by y-coordinate
- For each point, compare only the next few points (at most **6** neighbors)
- This limits the strip check to $O(n)$ per point with a constant number of comparisons

> **Key Idea:** "Why only compare at most 6?" is the core insight of this algorithm. In a $d \times 2d$ rectangle, at most 8 points can exist with pairwise distance ≥ $d$, so for each point, comparing only the nearest 6–7 points by y-coordinate is sufficient.

### 6.4 Closest Pair — Pseudocode

```
CLOSEST-PAIR(S)
  Input: S — points sorted by x-coordinate
  Output: distance of the closest pair

  1. if |S| <= 3: compute all pairwise distances and return the minimum
  2. Split S into S_L and S_R at the median x-coordinate
  3. CP_L = CLOSEST-PAIR(S_L)
  4. CP_R = CLOSEST-PAIR(S_R)
  5. d = min(dist(CP_L), dist(CP_R))
     Find closest pair CP_C in the middle strip (within distance d from dividing line)
  6. return min(CP_L, CP_C, CP_R) (by distance)
```

### 6.5 Closest Pair — Execution Example

```
Points sorted by x: (2,·) (5,·) (10,·) (15,·) (20,·) | (25,·) (26,·) (28,·) (30,·) (37,·)
                     ←──────── S_L ────────→              ←──────── S_R ────────→

Step 1: Recurse on S_L → CP_L (distance = 10)
Step 2: Recurse on S_R → CP_R (distance = 15)
Step 3: d = min(10, 15) = 10

Step 4: Middle strip = points with x ∈ [20-10, 25+10] = [10, 35]
       Points in strip: (10,·) (15,·) (20,·) (25,·) (26,·) (28,·) (30,·)

Step 5: Sort strip by y-coordinate and check adjacent pairs
       → found CP_C (distance = 5) (example)

Step 6: return min(10, 5, 15) = 5 → CP_C is the closest pair
```

### 6.6 Closest Pair — Time Complexity

**Recurrence analysis:**

| Line | Cost |
|:-----|:-----|
| Line 1 (base case) | $O(1)$ |
| Line 2 (divide) | $O(1)$ (already sorted) |
| Lines 3–4 (recurse) | $2T(n/2)$ |
| Line 5 (strip sort + scan) | $O(n \log n)$ |
| Line 6 (return) | $O(1)$ |

$$T(n) = 2T(n/2) + O(n \log n)$$

**Master Theorem or direct analysis:**

Each of $\log n$ levels contributes $O(n \log n)$, so:

$$T(n) = O(n \log^2 n)$$

*Note: A more refined implementation (pre-sorting by y-coordinate) can improve this to $O(n \log n)$.*

> **Note:** The difference between $O(n \log^2 n)$ and $O(n \log n)$ comes down to whether the strip points are sorted each time ($O(n \log n)$) or whether y-coordinate sorting is maintained throughout the recursion.

---

<br>

## 7. When Divide and Conquer Is Inappropriate

### 7.1 D&C Failure Case — Fibonacci

**When divide and conquer is inappropriate:** When the total input size of subproblems **increases** after division.

**Fibonacci:** $F(n) = F(n-1) + F(n-2)$

```
                    F(6)
                  /     \
              F(5)      F(4)
            /    \      /    \
          F(4)   F(3)  F(3)  F(2)
         /   \   / \   / \
       F(3) F(2) ...  ...
```

- Input size: $n$
- Sum of subproblem input sizes: $(n-1) + (n-2) = 2n - 3 > n$
- $F(2)$ is computed **5 times**, $F(3)$ is computed **3 times**
- Exponential redundancy!

> **Key Idea:** The critical distinction between divide and conquer vs. dynamic programming is whether **subproblems overlap**. If subproblems don't overlap (merge sort), use divide and conquer; if they do (Fibonacci), dynamic programming is appropriate.

### 7.2 Fibonacci — Bottom-Up Solution

Instead of divide and conquer, use an **iterative bottom-up** computation:

```
FIB-NUMBER(n)
  F[0] = 0
  F[1] = 1
  for i = 2 to n
    F[i] = F[i-1] + F[i-2]
  return F[n]
```

**Time:** $\Theta(n)$ — each value is computed exactly once

**Lesson:** When subproblems overlap significantly, **Dynamic Programming** (bottom-up or memoization) is more appropriate than naive divide and conquer.

### 7.3 Considerations When Applying Divide and Conquer

**Two key considerations:**

1. **Input size growth:** If the total size of subproblems exceeds the original input size, divide and conquer leads to exponential blowup
   - Example: Fibonacci

2. **Importance of combine cost:** Simply dividing the input does not guarantee efficiency
   - The cost of combining subsolutions must be manageable
   - Many geometric problems are well-suited to divide and conquer because the combine step naturally fits the problem structure

---

<br>

## Summary

| Algorithm | Recurrence | Time Complexity |
|:---------|:-------|:-----------|
| Merge Sort | $T(n) = 2T(n/2) + \Theta(n)$ | $\Theta(n \log n)$ |
| Binary Search | $T(n) = T(n/2) + O(1)$ | $\Theta(\log n)$ |
| Quick Sort (avg) | $T(n) = 2T(n/2) + \Theta(n)$ | $\Theta(n \log n)$ |
| Quick Sort (worst) | $T(n) = T(n-1) + \Theta(n)$ | $\Theta(n^2)$ |
| Selection (avg) | $T(n) \le T(3n/4) + \Theta(n)$ | $\Theta(n)$ |
| Selection (worst, MoM) | $T(n) = T(n/5) + T(7n/10) + \Theta(n)$ | $\Theta(n)$ |
| Closest Pair | $T(n) = 2T(n/2) + O(n \log n)$ | $O(n \log^2 n)$ |

**Key Takeaways:**
- Divide and Conquer = Divide + Conquer + Combine
- The Master Theorem connects recurrences to time complexities
- If subproblem sizes grow, divide and conquer is inappropriate (use DP instead)

---

<br>

## Appendix

- **Q & A:** *[Redacted]*
