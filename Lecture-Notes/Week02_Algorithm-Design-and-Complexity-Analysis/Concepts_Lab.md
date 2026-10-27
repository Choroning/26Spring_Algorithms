# Week 2 Lab — Complexity Analysis Practice

[Repository Guide](../../README.md) | [English](Concepts_Lab.md) | [한국어](Concepts_Lab.ko.md)

> **Last Updated:** 2026-10-27

> **Learning Objectives:**
> 1. Build a reusable timer utility to measure algorithm execution time
> 2. Implement and compare O(n²) and O(n) solutions for the duplicate-finding problem
> 3. Visualize complexity growth curves and identify algorithm classes from empirical data
> 4. Explain how algorithm choice affects real-world web API response times

---

## Table of Contents

- [1. Overview](#1-overview)
  - [1.1 Lab Goals](#11-lab-goals)
- [2. Type A: Algorithm Implementation](#2-type-a-algorithm-implementation)
  - [2.1 A-1: Timer Utility](#21-a-1-timer-utility)
  - [2.2 A-2: Finding Duplicates, from O(n²) to O(n)](#22-a-2-finding-duplicates-from-on²-to-on)
  - [2.3 A-3: Execution Time Graph](#23-a-3-execution-time-graph)
- [3. Type B: Web Code Analysis](#3-type-b-web-code-analysis)
  - [3.1 B-1: Product Search API Comparison](#31-b-1-product-search-api-comparison)
- [4. Connection to the Week 3 Lab](#4-connection-to-the-week-3-lab)
- [Summary](#summary)
- [Self-Check Questions](#self-check-questions)

---

<br>

## 1. Overview

### 1.1 Lab Goals

- Build a **timer utility** to measure execution time.
- Compare **O(n²) and O(n)** approaches for finding duplicates.
- Visualize complexity curves with **matplotlib**.
- Compare **linear search and binary search** in a web API context.
- This lab builds on time complexity and Big-O notation from the Week 2 lecture and requires Python 3. The web API section optionally requires Flask (`pip install flask`).

**Lab Structure:**

| Section | Topic |
|:--------|:------|
| **A-1** | Timer Utility |
| **A-2** | Finding Duplicates: O(n²) → O(n) |
| **A-3** | Execution Time Graph |
| **B-1** | Web Search API Comparison |

*Table 1. Topic of each lab section*

---

<br>

## 2. Type A: Algorithm Implementation

### 2.1 A-1: Timer Utility

**Problem**

**Goal:** Write a reusable function that measures the execution time of other functions.

**Requirements:**

- It must accept any function and its arguments.
- It runs the function multiple times (default: 3) and computes the average.
- It returns both the average elapsed time and the function's result.
- It uses `time.perf_counter()` for high-resolution timing.

```text
 measure_time(func, *args, repeat=3)
       |
       v
  Execute func(*args) 3 times
       |
       v
  Return (average_time, result)
```

*Figure 1. Execution flow of measure_time*

> **Note:** `time.perf_counter()` is the most precise time measurement function in Python. It has higher resolution than `time.time()`, enabling accurate measurement of even very short execution times. The reason for running multiple times is to reduce **measurement noise** caused by OS scheduling, cache effects, etc.

**Solution**

```python
import time

def measure_time(func, *args, repeat=3):
    """Execute func(*args) multiple times and return average time (seconds)."""
    times = []
    for _ in range(repeat):
        start = time.perf_counter()
        result = func(*args)
        end = time.perf_counter()
        times.append(end - start)
    avg = sum(times) / len(times)
    return avg, result
```

> **Caution:** If func sorts the array **in-place**, the second run receives an already-sorted array, which can distort the measurement. In such cases, you should copy the data (`data[:]`) at each iteration and pass the fresh copy for accurate benchmarking.

```python
# Wrong: data gets modified, second run is different
# Right: use data[:] to make a fresh copy each time
data_copy = data[:]
```

**Usage:**

```python
import random

def sum_list(lst):
    """Simple O(n) function that sums all elements."""
    total = 0
    for x in lst:
        total += x
    return total

for n in [1_000, 10_000, 100_000, 1_000_000]:
    data = [random.randint(1, 100) for _ in range(n)]
    elapsed, _ = measure_time(sum_list, data)
    print(f"N={n:>10,}: {elapsed:.6f} sec")
```

> **Note:** `*args` is Python's variable arguments. This technique allows calling `measure_time(my_func, arg1, arg2)` to pass any function along with its arguments. `_` is a convention for an unused variable.

### 2.2 A-2: Finding Duplicates, from O(n²) to O(n)

**Problem**

Determine whether an integer array contains duplicates.

Imagine checking for duplicate names in a classroom. The brute-force way is to compare every student with every other student, which is tedious. The smart way is to call out each name and raise your hand if it has been called before, which needs one pass with instant lookup.

**Two Approaches:**

```text
Approach 1: Brute Force O(n^2)            Approach 2: Hash Set O(n)
+----------------------------+          +----------------------------+
| for i in range(n):         |          | seen = set()               |
|   for j in range(i+1, n):  |          | for x in arr:              |
|     if arr[i] == arr[j]:   |          |   if x in seen:            |
|       return True          |          |     return True            |
|                            |          |   seen.add(x)              |
+----------------------------+          +----------------------------+
  Compare all pairs                       Single pass, O(1) lookup
```

*Figure 2. Comparison of the brute-force and hash-set approaches*

**Tasks:**

- Implement both approaches.
- Compare execution times at N = 100, 1000, 10000, 50000.
- Calculate the speedup ratio.

**Brute Force O(n²)**

```python
def has_duplicate_bruteforce(arr):
    """O(n^2): Compare all pairs."""
    n = len(arr)
    for i in range(n):
        for j in range(i + 1, n):
            if arr[i] == arr[j]:
                return True
    return False
```

**Number of Comparisons:**

```text
N = 5:   arr = [3, 1, 4, 1, 5]

  i=0: compare (0,1) (0,2) (0,3) (0,4)    4 comparisons
  i=1: compare (1,2) (1,3) (1,4)          3 comparisons
  i=2: compare (2,3) (2,4)                2 comparisons
  i=3: compare (3,4)                      1 comparison
                                    Total: 10 = n(n-1)/2
```

> **Note:** This double-loop pattern is very common in data structures and algorithms. The key is that $j$ starts at $i+1$. This prevents redundant comparison of both (i, j) and (j, i). The comparison count $\frac{n(n-1)}{2}$ equals $\binom{n}{2}$ (the number of ways to choose 2 items from n) in combinatorics.

**Hash Set O(n)**

```python
def has_duplicate_hashset(arr):
    """O(n): Using a set."""
    seen = set()
    for x in arr:
        if x in seen:
            return True
        seen.add(x)
    return False
```

**How It Works:**

```text
arr = [3, 1, 4, 1, 5]

Step 1: x=3  seen={}        → add 3    seen={3}
Step 2: x=1  seen={3}       → add 1    seen={3,1}
Step 3: x=4  seen={3,1}     → add 4    seen={3,1,4}
Step 4: x=1  seen={3,1,4}   → 1 found! Return True
```

It finishes in just **4 steps** instead of 10 comparisons.

> **Note:** **Analogy.** Think of a set like a guest list at a party. When a new guest arrives, you can instantly check whether their name is already on the list, without scanning every name one by one. Python's `set` works similarly using a technique called hashing.

> **[Data Structures]** A **hash table** stores each key at the array position given by its hash value, so insertion and lookup take O(1) time on average; with many hash collisions the worst case can degrade to O(n), but in practice it almost always runs in O(1) (Week 10 covers hash tables in detail). Python's `set` is internally implemented as a hash table, so **insertion (add) and lookup (in) are O(1) on average**, and replacing the O(n) search of an array with this lookup reduces the whole duplicate check from O(n²) to O(n).

**Benchmark Results**

Measuring the execution times of the two functions at N = 100, 1000, 10000, 50000 gives results like the following.

```text
         N |        O(n^2) |         O(n) |   Speedup
----------------------------------------------------
       100 |     0.000150 |     0.000005 |     30.0x
     1,000 |     0.015000 |     0.000050 |    300.0x
    10,000 |     1.500000 |     0.000500 |  3,000.0x
    50,000 |    37.500000 |     0.002500 | 15,000.0x
```

(These are approximate values; actual results may vary.)

**Key Insight:** Speedup increases proportionally with N.

When N doubles, O(n²) becomes about 4x slower, but O(n) becomes only about 2x slower.

> **Key Point:** The mathematical basis for this result is that Speedup ≈ O(n²) / O(n) is proportional to n²/n = **n**. That is, as N grows, the speedup also increases linearly. Taking the proportionality constant as 1 predicts about 50,000x at N=50,000; the measured value (15,000x) is smaller because of constant factors, but it grows in proportion to N in the same way. In the table, too, the speedup grows 10x whenever N grows 10x. This is the process of confirming with real data that algorithm choice matters.

> **Note:** The actual benchmark speedup may differ from the theoretical value (~n) for the following reasons. (1) Hash table constant overhead is non-negligible for small N, (2) CPU cache effects can make array traversal faster than expected, and (3) Python's `set` is implemented in C, so its constant factor is much smaller than a Python double loop. The theoretical complexity and measured values agree in trend but differ in exact multipliers.

### 2.3 A-3: Execution Time Graph

Use matplotlib to plot the growth rate of the execution time for each complexity class.

> **Note:** `matplotlib` is Python's representative data visualization library. If not installed, use `pip install matplotlib`.

```text
Time
 ^
 |                                        .  O(n^2)
 |                                    .
 |                                .
 |                           .
 |                      .            ....... O(n log n)
 |                .          ........
 |           .        .......
 |       .     .......
 |    . ........ . . . . . . . . . . . . .   O(n)
 | .....
 |.......................................... O(1)
 +-----------------------------------------> N
```

*Figure 3. Running-time growth curves of O(1), O(n), O(n log n), and O(n²)*

O(n log n) is the complexity of efficient sorting algorithms like merge sort (Week 3). It appears here for reference so you can see where it falls between O(n) and O(n²).

**What to Observe:**

- O(1) is flat; it is constant regardless of input size.
- O(n) grows linearly; if N doubles, time doubles.
- O(n log n) grows slightly faster than linear.
- O(n²) grows dramatically and quickly becomes impractical.

> **Key Point:** Seeing this graph firsthand makes the difference in complexity tangible. The particularly notable point is the **gap between O(n) and O(n²)**. At small N, the difference is negligible, but as N grows, the gap accelerates. This is why asymptotic analysis matters. For small inputs, even a slow algorithm is fine, but as data grows, the algorithm's complexity makes a decisive difference.

---

<br>

## 3. Type B: Web Code Analysis

Section 2 measured and visualized algorithm performance in isolation. This section examines how these differences play out in a real-world scenario: a web API serving product search queries.

### 3.1 B-1: Product Search API Comparison

**Setup**

Run the Flask app to compare search strategies in a web context.

Install Flask first (`pip install flask`). Once the server is running (typically at `http://127.0.0.1:5000`), test with your browser or `curl http://127.0.0.1:5000/search/linear?q=abc`.

**Two Endpoints:**

| Endpoint | Algorithm | Complexity |
|:---------|:----------|:-----------|
| `GET /search/linear?q=name` | Linear Search | O(n) |
| `GET /search/binary?q=name` | Binary Search | O(log n) |

*Table 2. Linear-search and binary-search endpoints*

```text
 Client                          Server
    |                            |
    |  GET /search/linear?q=abc  |
    |--------------------------->|  Scan all N products...
    |<---------------------------|  Found! (slow)
    |                            |
    |  GET /search/binary?q=abc  |
    |--------------------------->|  Binary search on sorted list...
    |<---------------------------|  Found! (fast)
```

*Figure 4. Request and response flow of the two search endpoints*

> **Note:** Binary search works by repeatedly halving the search space. It compares the target with the middle element, then searches only the left or right half. This halving process takes at most about log₂(n) steps. Week 4 covers it in detail.

> **Note:** Flask is Python's lightweight web framework. It is used here to **experience how algorithm choice affects response time in a real web service**. The `?q=name` in the GET request is a query parameter that passes the product name to search for. Linear search checks all products from beginning to end, while binary search halves the search space at each step on sorted data.

**Measuring the Difference**

Test with increasing data sizes.

| N (Products) | Linear O(n) | Binary O(log n) | Ratio |
|:-------------|:------------|:----------------|:------|
| 100 | ~0.1 ms | ~0.01 ms | ~10x |
| 10,000 | ~10 ms | ~0.02 ms | ~500x |
| 1,000,000 | ~1,000 ms | ~0.03 ms | ~33,000x |

*Table 3. Response times of linear and binary search by number of products*

(These are approximate values; actual results may vary by hardware.)

**Discussion Question:**

How does the difference between the two approaches change as the data grows?

Linear search time grows proportionally with N, while binary search time grows logarithmically. With 1 million products, linear search takes about 1 second per query, which is an unacceptable level for a real web service.

> **Note:** The implications for real services are as follows. Web services typically aim for responses within 200ms. With 1 million products, the situation is as follows.
> - With linear search (1,000ms), the user perceives the service as slow and leaves.
> - With binary search (0.03ms), the user receives an instant response.
>
> This is why databases create **indexes**. An index is essentially a data structure that keeps data in sorted order to enable fast search such as binary search (in practice, more sophisticated structures like B-trees are used).

> **Note:** Binary search only works on **sorted data**. You might wonder whether the sorting cost (O(n log n)) is a problem. Once sorted, every subsequent search is O(log n), so for services with frequent searches, the sorting cost is more than offset. This is why databases build indexes in advance.

---

<br>

## 4. Connection to the Week 3 Lab

The **Week 3 Lab** implements and benchmarks sorting algorithms.

---

<br>

## Summary

| Concept | Key Summary |
|:--------|:-------------|
| Timer Utility | It measures time with high resolution using `time.perf_counter()`, and running multiple iterations and averaging reduces measurement noise. |
| O(n²) and O(n) Duplicate Finding | Brute force (double loop) is O(n²) and the hash set is O(n), and since the speedup is proportional to n, the gap grows linearly with N. |
| Role of Hash Tables | Because `set` insertion and lookup are O(1) on average, they are the key to optimizing O(n²) to O(n). |
| Complexity Visualization | Graphing the O(1), O(n), O(n log n), and O(n²) curves makes asymptotic differences intuitively clear. |
| Linear and Binary Search (Web API) | Linear search O(n) response time grows proportionally with data size, while binary search O(log n) grows logarithmically and offers an overwhelming advantage at scale. |
| DB Indexes and Sorting | Binary search requires sorted data, but after sorting once (O(n log n)) each search is O(log n), so the sorting cost is offset in services with frequent lookups. |
| Core Lesson | Algorithm complexity is not just theory; especially as data grows, it directly impacts user experience. |

---

<br>

## Self-Check Questions

1. Why does the hash-set approach for finding duplicates run in O(n) while the brute-force approach runs in O(n²)?

   <details>
   <summary>Answer</summary>

   Brute force compares **every pair** `(i, j)` with `j > i`, performing `n(n-1)/2 = Θ(n²)` comparisons. The hash-set approach makes a **single pass** over the array (`n` iterations), and on each iteration performs an **O(1)-average** `in` check and `add` against a hash table. Total work: `n × O(1) = O(n)`. The asymptotic speedup comes from replacing an O(n) array lookup with an O(1) hash lookup. That is the fundamental role of `set` in this problem.

   </details>

2. In your benchmark results, at what input size did the O(n²) approach become noticeably slower? How does this relate to the theoretical analysis?

   <details>
   <summary>Answer</summary>

   The gap becomes clearly visible around **N = 10,000**, where the brute-force version takes about 1.5 seconds while the hash-set version finishes in under a millisecond, a roughly **3,000×** speedup. This matches the theoretical prediction that the speedup is proportional to `O(n²)/O(n)`, that is, to `n`, so the ratio grows **linearly** with N. At N = 1,000 the speedup is about 300×; at N = 50,000 it reaches about 15,000×. The trend agrees with theory; the exact multiplier differs due to constant factors (C-implemented `set`, CPU cache effects).

   </details>

3. Why is it important to use `data[:]` (a copy) when benchmarking in-place algorithms?

   <details>
   <summary>Answer</summary>

   Many algorithms, sorting in particular, **mutate** their input. On the second run the array is already sorted, so the function does much less work and the measurement is **distorted** (often dramatically faster than a true first run). Passing `data[:]` makes a **fresh copy** each iteration, so every run starts from the same unsorted state. This isolates the algorithm's cost from accidental state reuse, giving a fair average across the `repeat` runs.

   </details>

4. In the Web API exercise, what was the response time difference between linear search and binary search at N=100,000? Why?

   <details>
   <summary>Answer</summary>

   Linear search takes about **100 ms** and binary search about **0.025 ms**, a difference of about **4,000×**. Linear search is `O(n)`, scanning all 100,000 products, while binary search is `O(log n)`, taking only `log₂(100,000) ≈ 17` comparisons on the sorted list. The practical implication: at this scale, linear search already approaches the boundary of acceptable web latency, while binary search remains instant. This is precisely why databases build **indexes**, to enable logarithmic-time lookups on large tables.

   </details>
