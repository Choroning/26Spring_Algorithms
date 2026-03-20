# Week 2 Lab — Complexity Analysis Practice

> **Last Updated:** 2026-03-17

---

## Table of Contents

- [1. Overview](#1-overview)
  - [1.1 Today's Goals](#11-todays-goals)
- [2. Type A — Algorithm Implementation](#2-type-a--algorithm-implementation)
  - [2.1 A-1: Timer Utility](#21-a-1-timer-utility)
  - [2.2 A-2: Finding Duplicates — O(n^2) -> O(n)](#22-a-2-finding-duplicates--on²--on)
  - [2.3 A-3: Execution Time Graph](#23-a-3-execution-time-graph)
- [3. Type B — Web Code Analysis](#3-type-b--web-code-analysis)
  - [3.1 B-1: Product Search API Comparison](#31-b-1-product-search-api-comparison)
- [Summary](#summary)
- [Appendix](#appendix)

---

<br>

## 1. Overview

### 1.1 Today's Goals

- Build a **timer utility** to measure execution time
- Compare **O(n^2) vs O(n)** approaches for finding duplicates
- Visualize complexity curves with **matplotlib**
- Compare **linear search vs binary search** in a web API context

**Lab Structure:**

| Section | Topic | Time |
|:--------|:------|:-----|
| **A-1** | Timer Utility | 10 min |
| **A-2** | Finding Duplicates: O(n^2) -> O(n) | 15 min |
| **A-3** | Execution Time Graph | 10 min |
| **B-1** | Web Search API Comparison | 15 min |

---

<br>

## 2. Type A — Algorithm Implementation

### 2.1 A-1: Timer Utility

**Problem**

**Goal**: Write a reusable function that measures the execution time of other functions.

**Requirements:**

- Must accept any function and its arguments
- Run the function multiple times (default: 3) and compute the average
- Return both the average elapsed time and the function's result
- Use `time.perf_counter()` for high-resolution timing

```
 measure_time(func, *args, repeat=3)
       |
       v
  Execute func(*args) 3 times
       |
       v
  Return (average_time, result)
```

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

> **Note:** Caution: if func modifies the array **in-place**, the second run receives an already-sorted array, which can distort the measurement. In such cases, you should copy the data (`data[:]`) at each iteration and pass the fresh copy for accurate benchmarking.

**Usage:**

```python
for n in [1_000, 10_000, 100_000, 1_000_000]:
    data = [random.randint(1, 100) for _ in range(n)]
    elapsed, _ = measure_time(sum_list, data)
    print(f"N={n:>10,}: {elapsed:.6f} sec")
```

File: `examples/a1_timer_util.py`

> **Note:** `*args` is Python's variable arguments. This technique allows calling `measure_time(my_func, arg1, arg2)` to pass any function along with its arguments. `_` is a convention for "unused variable."

### 2.2 A-2: Finding Duplicates — O(n^2) -> O(n)

**Problem**

**Problem**: Determine whether an integer array contains duplicates.

**Two Approaches:**

```
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

**Tasks:**

- Implement both approaches
- Compare execution times at N = 100, 1000, 10000, 50000
- Calculate the speedup ratio

**Brute Force O(n^2)**

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

```
N = 5:   arr = [3, 1, 4, 1, 5]

  i=0: compare (0,1) (0,2) (0,3) (0,4)    4 comparisons
  i=1: compare (1,2) (1,3) (1,4)          3 comparisons
  i=2: compare (2,3) (2,4)                2 comparisons
  i=3: compare (3,4)                      1 comparison
                                    Total: 10 = n(n-1)/2
```

> **Note:** This double-loop pattern is very common in data structures/algorithms. The key is that $j = i+1$ — this prevents redundant comparison of both (i, j) and (j, i). The comparison count $\frac{n(n-1)}{2}$ equals $_nC_2$ (the number of ways to choose 2 items from n) in combinatorics.

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

```
arr = [3, 1, 4, 1, 5]

Step 1: x=3  seen={}        → add 3    seen={3}
Step 2: x=1  seen={3}       → add 1    seen={3,1}
Step 3: x=4  seen={3,1}     → add 4    seen={3,1,4}
Step 4: x=1  seen={3,1,4}   → 1 found! Return True
```

Completed in just **4 steps** instead of 10 comparisons!

> **[Data Structures]** Python's `set` is internally implemented as a **hash table**. As learned in Data Structures, a hash table converts keys via a hash function and stores them at specific positions in an array. Thanks to this, **insertion (add) and lookup (in) are O(1) on average**. This is the key to reducing O(n^2) to O(n) — finding a specific value in an array is O(n), but in a hash table it is O(1). In the worst case (many hash collisions), it can degrade to O(n), but in practice it is almost always O(1).

**Benchmark Results**

After running `examples/a2_find_duplicate.py`:

```
         N |        O(n^2) |         O(n) |   Speedup
----------------------------------------------------
       100 |     0.000150 |     0.000005 |     30.0x
     1,000 |     0.015000 |     0.000050 |    300.0x
    10,000 |     1.500000 |     0.000500 |  3,000.0x
    50,000 |    37.500000 |     0.002500 | 15,000.0x
```

*(Approximate values — actual results may vary)*

**Key Insight**: Speedup increases proportionally with N!

When N doubles, O(n^2) becomes ~4x slower, but O(n) becomes only ~2x slower.

> **Key Point:** The mathematical basis for this result: Speedup ~ O(n^2) / O(n) = n^2/n = **n**. That is, as N grows, the speedup also increases linearly! For N=50,000, the theoretical prediction is approximately 50,000x faster, and the measured value (15,000x) shows a similar trend. This is the process of confirming with real data that "algorithm choice matters."

> **Note:** Reasons the actual benchmark speedup may differ from the theoretical value (~n): (1) Hash table constant overhead is non-negligible for small N, (2) CPU cache effects can make array traversal faster than expected, and (3) Python's `set` is implemented in C, so its constant factor is much smaller than a Python double loop. The theoretical complexity and measured values agree in "trend" but differ in exact multipliers.

### 2.3 A-3: Execution Time Graph

Run `examples/a3_complexity_plot.py` to visualize growth rates:

```bash
python examples/a3_complexity_plot.py
```

> **Note:** `matplotlib` is Python's representative data visualization library. If not installed, use `pip install matplotlib`.

```
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

**What to Observe:**

- O(1) is flat — constant regardless of input size
- O(n) grows linearly — if N doubles, time doubles
- O(n log n) grows slightly faster than linear
- O(n^2) grows dramatically — quickly becomes impractical

> **Key Point:** Seeing this graph firsthand makes "the difference in complexity" truly tangible. The particularly notable point is the **gap between O(n) and O(n^2)**. At small N, the difference is negligible, but as N grows, the gap accelerates. This is why asymptotic analysis matters — for small inputs, even a slow algorithm is fine, but as data grows, the algorithm's complexity makes a decisive difference.

---

<br>

## 3. Type B — Web Code Analysis

### 3.1 B-1: Product Search API Comparison

**Setup**

Run the Flask app to compare search strategies in a web context:

```bash
cd examples/b1_web_search_api
pip install flask
python app.py
```

**Two Endpoints:**

| Endpoint | Algorithm | Complexity |
|:---------|:----------|:-----------|
| `GET /search/linear?q=name` | Linear Search | O(n) |
| `GET /search/binary?q=name` | Binary Search | O(log n) |

```
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

> **Note:** Flask is Python's lightweight web framework. It is used here to **experience how algorithm choice affects response time in a real web service**. The `?q=name` in the GET request is a query parameter that passes the product name to search for. Linear search checks all products from beginning to end, while binary search halves the search space at each step on sorted data.

**Measuring the Difference**

Test with increasing data sizes:

| N (Products) | Linear O(n) | Binary O(log n) | Ratio |
|:-------------|:------------|:----------------|:------|
| 100 | ~0.1 ms | ~0.01 ms | ~10x |
| 10,000 | ~10 ms | ~0.02 ms | ~500x |
| 1,000,000 | ~1,000 ms | ~0.03 ms | ~33,000x |

**Discussion Question:**

> How does the difference between the two approaches change as the data grows?

**Answer:** Linear search time grows proportionally with N, while binary search time grows logarithmically. With 1 million products, linear search takes ~1 second per query — an unacceptable level for a real web service!

> **Note:** The implications for real services: Web services typically aim for responses within 200ms. With 1 million products:
> - Linear search (1,000ms): The user perceives it as "slow" and leaves
> - Binary search (0.03ms): The user receives an "instant" response
>
> This is why databases create **indexes**. An index is essentially "a data structure that keeps data in sorted order to enable binary search" (in practice, more sophisticated structures like B-trees are used).

> **Note:** Binary search only works on **sorted data**. You might wonder, "what about the sorting cost (O(n log n))?" Once sorted, every subsequent search is O(log n), so for services with frequent searches, the sorting cost is more than offset. This is why databases build indexes in advance.

---

<br>

## Summary

| Concept | Key Takeaway |
|:--------|:-------------|
| Timer Utility | High-resolution timing with `time.perf_counter()`; running multiple iterations and averaging reduces measurement noise |
| O(n^2) vs O(n) Duplicate Finding | Brute force (double loop) is O(n^2), hash set is O(n); Speedup ~ n, so the gap grows linearly with N |
| Role of Hash Tables | `set` insertion/lookup is O(1) on average, making it the key to O(n^2) -> O(n) optimization |
| Complexity Visualization | Graphing O(1), O(n), O(n log n), O(n^2) curves makes asymptotic differences intuitively clear |
| Linear vs Binary Search (Web API) | Linear search O(n) response time grows proportionally with data size; binary search O(log n) grows logarithmically, offering overwhelming advantage at scale |
| DB Indexes and Sorting | Binary search requires sorted data; sorting once (O(n log n)) is offset by O(log n) per search in services with frequent lookups |
| Core Lesson | Algorithm complexity is not just theory — especially as data grows, it directly impacts user experience |

---

<br>

## Appendix

- **Assignment 1**: See `../3_assignment/README.md` for assignment details
- **Next week**: **Week 3** — Sorting Algorithm Implementation & Benchmarks

---
