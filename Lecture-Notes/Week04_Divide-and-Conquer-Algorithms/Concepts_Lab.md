# Week 4 Lab — Advanced Divide and Conquer

[Repository Guide](../../README.md) | [English](Concepts_Lab.md) | [한국어](Concepts_Lab.ko.md)

> **Last Updated:** 2026-10-27

> **Learning Objectives:**
> 1. Implement merge sort and trace its recursive execution tree
> 2. Implement randomized selection (k-th smallest) using the partition procedure
> 3. Implement the closest pair of points algorithm using divide and conquer
> 4. Compare naive O(n²) approaches with optimized divide and conquer solutions empirically

---

## Table of Contents

- [1. Overview](#1-overview)
  - [1.1 Lab Goals](#11-lab-goals)
  - [1.2 Lab Structure](#12-lab-structure)
- [2. Type A: Algorithm Implementation](#2-type-a-algorithm-implementation)
  - [2.1 A-1: Merge Sort Trace](#21-a-1-merge-sort-trace)
    - [2.1.1 Problem](#211-problem)
    - [2.1.2 Code](#212-code)
  - [2.2 A-2: Finding the k-th Smallest Element](#22-a-2-finding-the-k-th-smallest-element)
    - [2.2.1 Problem](#221-problem)
    - [2.2.2 How Randomized Select Works](#222-how-randomized-select-works)
    - [2.2.3 Solution](#223-solution)
    - [2.2.4 Performance Comparison](#224-performance-comparison)
  - [2.3 A-3: Closest Pair of Points](#23-a-3-closest-pair-of-points)
    - [2.3.1 Problem](#231-problem)
    - [2.3.2 Divide and Conquer Strategy](#232-divide-and-conquer-strategy)
    - [2.3.3 Solution (Core Part)](#233-solution-core-part)
    - [2.3.4 Performance Comparison](#234-performance-comparison)
- [3. Type B: Web Code Analysis](#3-type-b-web-code-analysis)
  - [3.1 B-1: Autocomplete API](#31-b-1-autocomplete-api)
    - [3.1.1 Setup](#311-setup)
    - [3.1.2 Experiment](#312-experiment)
- [4. The Divide and Conquer Pattern](#4-the-divide-and-conquer-pattern)
- [Summary](#summary)
- [Self-Check Questions](#self-check-questions)

---

<br>

## 1. Overview

### 1.1 Lab Goals

- **Trace** the recursive call tree of merge sort.
- Implement **Randomized Select** to find the k-th smallest element in average O(n).
- Solve the **closest pair of points** problem using divide and conquer.
- Compare **linear search and binary search** in an autocomplete API.

### 1.2 Lab Structure

| Section | Topic |
|:--------|:------|
| **A-1** | Merge Sort Trace |
| **A-2** | Finding the k-th Smallest Element |
| **A-3** | Closest Pair of Points |
| **B-1** | Autocomplete API Comparison |

*Table 1. Topic of each lab section*

---

<br>

## 2. Type A: Algorithm Implementation

### 2.1 A-1: Merge Sort Trace

Merge sort (covered in Week 3 Lecture and Week 4 Lecture) divides the array in half, recursively sorts each half, and merges the results. Here we trace through its execution and implement it.

#### 2.1.1 Problem

**Goal**: Visualize the call tree to understand the recursive structure of merge sort.

```text
merge_sort([38, 27, 43, 3, 9, 82, 10])
  merge_sort([38, 27, 43, 3])
    merge_sort([38, 27])
      merge_sort([38])
      merge_sort([27])
      -> merged: [27, 38]
    merge_sort([43, 3])
      merge_sort([43])
      merge_sort([3])
      -> merged: [3, 43]
    -> merged: [3, 27, 38, 43]
  merge_sort([9, 82, 10])
    merge_sort([9, 82])
      merge_sort([9])
      merge_sort([82])
      -> merged: [9, 82]
    merge_sort([10])
    -> merged: [9, 10, 82]
  -> merged: [3, 9, 10, 27, 38, 43, 82]
```

*Figure 1. Recursive call tree of merge sort on 7 elements*

Run: `python examples/a1_merge_sort_trace.py`

#### 2.1.2 Code

```python
def merge_sort_trace(arr, depth=0):
    """Merge sort that visualizes recursive calls."""
    indent = "  " * depth
    print(f"{indent}merge_sort({arr})")

    if len(arr) <= 1:
        return arr[:]

    mid = len(arr) // 2
    left = merge_sort_trace(arr[:mid], depth + 1)
    right = merge_sort_trace(arr[mid:], depth + 1)

    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j]); j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])

    print(f"{indent}  -> merged: {merged}")
    return merged
```

> **Note:** Figure 1 splits the 7 elements into 4 on the left and 3 on the right. The code above computes `mid = len(arr) // 2 = 3`, so it actually calls `merge_sort([38, 27, 43])` and `merge_sort([3, 9, 82, 10])` first, and its intermediate merge results, [27, 43], [27, 38, 43], [3, 9], [10, 82], and [3, 9, 10, 82], also differ from the figure. The final result [3, 9, 10, 27, 38, 43, 82] is the same.

**Merge trace (merging [27, 38] and [3, 43]):** Compare 27 vs 3 → take 3. Compare 27 vs 43 → take 27. Compare 38 vs 43 → take 38. Take remaining 43. Result: [3, 27, 38, 43].

**Key observation**: The `depth` parameter controls indentation, revealing the **recursion tree** structure.

---

<br>

### 2.2 A-2: Finding the k-th Smallest Element

#### 2.2.1 Problem

**Problem**: Find the k-th smallest element in an unsorted array.

```text
Array:   [7, 10, 4, 3, 20, 15, 8]
Sorted:  [3, 4, 7, 8, 10, 15, 20]

1st smallest = 3
2nd smallest = 4
3rd smallest = 7
4th smallest = 8    <-- median
```

**Two approaches:**

| Approach | Method | Complexity |
|:---------|:-------|:-----------|
| Naive | Sort then index | O(n log n) |
| **Randomized Select** | Partition like quicksort | **O(n) average** |

*Table 2. Two approaches to finding the k-th smallest element*

Why sort the entire array when you only need a single element?

#### 2.2.2 How Randomized Select Works

Randomized select is like looking for a name in a phonebook by opening to a random page and deciding whether to look left or right, rather than reading every page.

It uses the **partition** step from quicksort, but only recurses into **one side**.

```text
Find the 4th smallest in [7, 10, 4, 3, 20, 15, 8]
                             k = 3 (0-indexed)

Step 1: Random pivot = 10, partition:
        [7, 4, 3, 8]  [10]  [20, 15]
        ^-- 4 elements  ^-- index 4
        k=3 < 4, search left only

Step 2: Random pivot = 4, partition:
        [3]  [4]  [7, 8]
              ^-- index 1
        k=3 > 1, search right
        new k = 3 - 2 = 1 (within right subarray)

Step 3: Random pivot = 7, partition:
        []  [7]  [8]
             ^-- index 0
        k=1 > 0, recurse into right subarray [8].
        Single element -> return 8.
        This is the 4th smallest element overall.
```

*Figure 2. Finding the 4th smallest element with randomized select*

#### 2.2.3 Solution

If quicksort's partition step is new to you, here is the idea: choose a pivot, rearrange the array so everything smaller is on the left, the pivot is in its final position, and everything larger is on the right.

```python
import random

def partition(arr, left, right, pivot_idx):
    pivot = arr[pivot_idx]
    # Move pivot to the end so it's out of the way
    arr[pivot_idx], arr[right] = arr[right], arr[pivot_idx]
    store = left  # Boundary between "smaller" and "unsorted" regions
    for i in range(left, right):
        if arr[i] < pivot:
            # Swap current element into the "smaller" region
            arr[i], arr[store] = arr[store], arr[i]
            store += 1
    # Place pivot in its final sorted position
    arr[store], arr[right] = arr[right], arr[store]
    return store  # Return the pivot's final index

def randomized_select(arr, left, right, k):
    """Find the k-th smallest element (0-indexed)."""
    if left == right:
        return arr[left]
    pivot_idx = random.randint(left, right)
    final_pos = partition(arr, left, right, pivot_idx)
    if k == final_pos:
        return arr[k]
    elif k < final_pos:
        return randomized_select(arr, left, final_pos - 1, k)
    else:
        return randomized_select(arr, final_pos + 1, right, k)
```

> **Note:** From Step 2 on, Figure 2 recomputes k as a relative index within the subarray. The code above keeps absolute indices into the original array, so it does not change k when it recurses.

File: `examples/a2_kth_smallest.py`

#### 2.2.4 Performance Comparison

```python
def kth_smallest(arr, k):
    """Wrapper: returns the k-th smallest element (0-indexed)."""
    data = arr[:]  # work on a copy to avoid mutating the original
    return randomized_select(data, 0, len(data) - 1, k)

# Randomized select: O(n) average
result1 = kth_smallest(big_data, n // 2)

# Sort + index: O(n log n)
result2 = sorted(big_data)[n // 2 - 1]
```

> **Note:** Because k in `kth_smallest` counts from 0, `kth_smallest(big_data, n // 2)` returns the element at sorted index `n // 2`, whereas `sorted(big_data)[n // 2 - 1]` is the element at index `n // 2 - 1`. For the two methods to find the same element, compare with `sorted(big_data)[n // 2]`.

**Results at N = 1,000,000:**

```text
Method                  Time      Complexity
-----------------------------------------
Randomized Select       0.15s     O(n) average
Sort + Index            0.85s     O(n log n)
```

**Key insight**: Randomized select only processes one branch at each step, so if the problem size is approximated as halving each time, it performs O(n) + O(n/2) + O(n/4) + ... = O(2n) = O(n) work on average.

---

<br>

### 2.3 A-3: Closest Pair of Points

#### 2.3.1 Problem

**Problem**: Given n points on a 2D plane, find the two closest points.

```text
         50 |                 o (40,50)
            |
         30 |        o (12,30)
            |
         10 |        o (12,10)
            |
          4 |  o (3,4)
          3 | o (2,3)   <-- closest pair: distance = sqrt(2) ~ 1.41
          1 |     o (5,1)
            +--+--+--+--+--+--+--+--+---> x
               2  5  12       40
```

*Figure 3. Points on a 2D plane and their closest pair*

**Two approaches:**

| Approach | Complexity | Method |
|:---------|:-----------|:-------|
| Brute force | O(n²) | Check all n(n-1)/2 pairs |
| **Divide and conquer** | **O(n log n)** | Divide, solve each half, check strip |

*Table 3. Two approaches to the closest pair of points problem*

This is like finding the closest pair of people in a crowd. Splitting the crowd in half and checking near the dividing line is much faster than comparing everyone.

#### 2.3.2 Divide and Conquer Strategy

```text
1. Sort points by x-coordinate
2. Split into left and right halves at the midpoint

       LEFT   |   RIGHT
   o    o     |     o       o
      o       |        o
         o    |  o
              |
            mid_x

3. Recursively find closest pair in left  -> d_L
4. Recursively find closest pair in right -> d_R
5. d = min(d_L, d_R)

6. STRIP check: points within distance d from mid_x
   (the closest pair might span the two halves!)

        |<- d ->|<- d ->|
        |  strip region |
        |   o        o  |  <- only check these points
        |      o        |
```

*Figure 4. Divide and conquer strategy for the closest pair of points*

#### 2.3.3 Solution (Core Part)

```python
import math

def dist(p1, p2):
    """Euclidean distance between two points."""
    return math.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2)

# closest_pair_bruteforce(pts) checks all pairs in O(n^2);
# used as the base case when n <= 3.

def closest_pair_dc(points):
    """O(n log n): divide and conquer approach."""
    points_sorted = sorted(points, key=lambda p: p[0])
    return _closest_dc(points_sorted)

def _closest_dc(pts):
    n = len(pts)
    if n <= 3:
        return closest_pair_bruteforce(pts)

    mid = n // 2
    mid_x = pts[mid][0]
    left_result = _closest_dc(pts[:mid])
    right_result = _closest_dc(pts[mid:])

    d = min(left_result[0], right_result[0])
    best = left_result if left_result[0] <= right_result[0] \
                       else right_result

    # Strip check — Key fact: for any point in the strip, at most 7 other
    # points need to be checked (those within distance d in the y-direction).
    # Points in each half are at least d apart, so only a constant number
    # fit in a d x 2d rectangle. This keeps the strip check at O(n) total.
    strip = [p for p in pts if abs(p[0] - mid_x) < d]
    strip.sort(key=lambda p: p[1])
    for i in range(len(strip)):
        j = i + 1
        while j < len(strip) and strip[j][1] - strip[i][1] < d:
            dd = dist(strip[i], strip[j])
            if dd < d:
                d = dd
                best = (dd, (strip[i], strip[j]))
            j += 1
    return best
```

> **Note:** This implementation re-sorts the strip by y-coordinate in every recursive call, so the recurrence becomes $T(n) = 2T(n/2) + O(n \log n)$ and the total time is $O(n \log^2 n)$. Presorting the points by y-coordinate as well and splitting that order among the recursive calls, as in Section 33.4 of the textbook (CLRS), makes the strip check $O(n)$ and achieves $O(n \log n)$.

#### 2.3.4 Performance Comparison

Run: `examples/a3_closest_pair.py`

```text
N       Brute Force     Divide & Conquer  Speedup
----------------------------------------------
100     0.0030s         0.0020s           1.5x
1,000   0.3000s         0.0100s           30x
5,000   7.5000s         0.0600s           125x
```

*(Approximate values. Actual results may vary.)*

Brute force quickly becomes impractical, while divide and conquer scales gracefully as the input grows.

```text
Time
  ^
  |        x                     x = Brute force O(n^2)
  |                              o = Divide & conquer O(n log n)
  |    x
  |
  | x
  |
  | o  o   o    o     o
  +-------------------------> N
   100  1K  5K  10K  50K
```

*Figure 5. Execution time of brute force and divide and conquer by input size*

---

<br>

## 3. Type B: Web Code Analysis

### 3.1 B-1: Autocomplete API

#### 3.1.1 Setup

Install dependencies first with `pip install flask`. Flask is a lightweight Python web framework.

Run the Flask app.

```bash
cd examples/b1_web_autocomplete
python app.py
```

The app performs prefix search over a dictionary of **100,000 words**.

**Two endpoints:**

| Endpoint | Algorithm | Complexity |
|:---------|:----------|:-----------|
| `GET /autocomplete/linear?q=pre` | Sequential scan | O(n) |
| `GET /autocomplete/binary?q=pre` | Sorted + binary search | O(log n + k) |

*Table 4. Two endpoints of the autocomplete API*

Here, k is the number of matching results.

```text
  User input: "pre"
            |
            v
  +-------------------+      +-------------------+
  | Linear Search     |      | Binary Search     |
  | Scan all 100K     |      | Jump to "pre"     |
  | words one by one  |      | region in O(log n)|
  | O(n) per query    |      |                   |
  +-------------------+      +-------------------+
            |                          |
            v                          v
  [predict, prefix,          [predict, prefix,
   prepare, present, ...]     prepare, present, ...]
```

*Figure 6. Autocomplete processing flow of linear search and binary search*

#### 3.1.2 Experiment

**Queries to try:**

Type characters in the search box and observe the response times.

| Query | Linear Search | Binary Search |
|:------|:-------------|:-------------|
| `a` | ~50 ms | ~0.5 ms |
| `pre` | ~50 ms | ~0.3 ms |
| `algorithm` | ~50 ms | ~0.2 ms |

*Table 5. Response time of linear search and binary search by query*

**Key observations:**

- Linear search time is **constant** regardless of the query. It always scans everything.
- Binary search is **fast** for all queries. It jumps directly to the correct region.
- The difference is already noticeable with 100K words.
- In a real search engine with millions of entries, the difference becomes much larger.

**Discussion:**

Real-world autocomplete systems use more advanced data structures like **tries** and **inverted indexes**. Even so, binary search over sorted data is an excellent starting point.

---

<br>

## 4. The Divide and Conquer Pattern

All of the algorithms in this lab follow the three steps below.

```text
1. DIVIDE    -- Break the problem into smaller subproblems
2. CONQUER   -- Solve each subproblem recursively
3. COMBINE   -- Merge the subproblem solutions
```

---

<br>

## Summary

| Concept | Key Summary |
|:--------|:-------------|
| Merge Sort Trace | **Tracing** the recursive call tree of merge sort reveals the divide, conquer, and combine structure of divide and conquer. |
| Randomized Select | It uses quicksort's partition but recurses into only one side, finding the k-th smallest element in average O(n). |
| Closest Pair of Points | Brute force takes O(n²), while divide and conquer solves it in O(n log n) because each point in the strip checks only a constant number of neighbors (the implementation in this lab is O(n log² n)). |
| Linear Search vs Binary Search | In a web autocomplete API, binary search jumps directly to the matching prefix region of the sorted dictionary, so it is much faster than linear search, which scans everything each time. |
| The Divide and Conquer Pattern | It divides a problem into smaller subproblems, conquers each subproblem recursively, and combines the subproblem solutions. |

---

<br>

## Self-Check Questions

1. In your merge sort trace, how many times is the merge function called for an array of 8 elements? How does this relate to the recursion tree?

   <details>
   <summary>Answer</summary>

   For 8 elements, merge is called **7 times**, once at each internal node of the recursion tree. A merge sort of $n$ elements produces a balanced binary tree with $n$ leaves (size-1 base cases) and $n-1$ internal nodes. Each internal node corresponds to one `MERGE` invocation that combines two sorted halves. Thus $n$ leaves require $n-1$ merges, and the total work is $\Theta(n)$ per level across $\log_2 n$ levels, or $\Theta(n \log n)$.

   </details>

2. If randomized select picks a bad pivot every time, what is the worst-case time complexity? How likely is this with random pivots?

   <details>
   <summary>Answer</summary>

   If every pivot is the smallest or largest, the partition produces sizes $0$ and $n-1$, giving $T(n) = T(n-1) + \Theta(n) = \Theta(n^2)$. With **uniform random** pivot selection, the chance of choosing an extreme value at each level is $2/n$. The probability that this happens at **every** recursive call is roughly $(2/n)(2/(n-1)) \cdots \approx 2^n / n!$, which is astronomically small. The expected time is $\Theta(n)$; in practice, random pivots make the $\Theta(n^2)$ worst case vanishingly unlikely.

   </details>

3. In the closest pair benchmark, at what input size did the D&C approach first outperform the brute-force approach? Why not at smaller sizes?

   <details>
   <summary>Answer</summary>

   Per the benchmark table, D&C is already faster at **N = 100** (1.5× speedup). The gap widens to 30× at N = 1,000 and 125× at N = 5,000. At very small $n$, the **constant factors** of D&C (recursion overhead, sorting the strip by y, list slicing) dominate the asymptotic improvement. For very small $n$ (for example, $n \leq 3$), brute force's tight $O(n^2)$ loop is faster than $O(n \log^2 n)$ with bookkeeping. That is why the base case `n <= 3` falls back to brute force.

   </details>

4. What would happen to the closest pair algorithm's complexity if the strip check compared all pairs instead of limiting to 7 neighbors?

   <details>
   <summary>Answer</summary>

   In the worst case, all $n$ points could lie in the strip, for example if they cluster near the dividing line. Comparing all pairs would then cost $\Theta(n^2)$ at the top level. The recurrence becomes $T(n) = 2T(n/2) + \Theta(n^2)$, which by **Case 3** of the Master Theorem yields $T(n) = \Theta(n^2)$. That is no better than brute force. The 7-neighbor bound from the geometric packing argument reduces the strip step to $O(n)$ and preserves the overall $O(n \log^2 n)$ bound of this lab's implementation.

   </details>
