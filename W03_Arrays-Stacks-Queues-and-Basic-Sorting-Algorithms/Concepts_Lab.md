# Week 3 Lab — Sorting Algorithm Implementation & Benchmarks

> **Last Updated:** 2026-03-21

---

## Table of Contents

- [1. Overview](#1-overview)
- [2. Type A — Algorithm Implementation](#2-type-a--algorithm-implementation)
  - [2.1 A-1: Elementary Sorting Algorithms](#21-a-1-elementary-sorting-algorithms)
    - [2.1.1 Selection Sort](#211-selection-sort)
    - [2.1.2 Bubble Sort](#212-bubble-sort)
    - [2.1.3 Insertion Sort](#213-insertion-sort)
  - [2.2 A-2: Advanced Sorting Algorithms](#22-a-2-advanced-sorting-algorithms)
    - [2.2.1 Merge Sort](#221-merge-sort)
    - [2.2.2 Quick Sort](#222-quick-sort)
    - [2.2.3 Sorting Algorithm Comparison](#223-sorting-algorithm-comparison)
  - [2.3 A-3: Benchmark](#23-a-3-benchmark)
- [3. Type B — Web Code Analysis](#3-type-b--web-code-analysis)
  - [3.1 B-1: Mini Shopping Mall Sort Comparison](#31-b-1-mini-shopping-mall-sort-comparison)
- [Summary](#summary)
- [Practice Problems (Baekjoon)](#practice-problems-baekjoon)
- [Appendix](#appendix)

---

<br>

## 1. Overview

### Today's Goals

- Implement **elementary** sorting algorithms: Selection Sort, Bubble Sort, Insertion Sort
- Implement **advanced** sorting algorithms: Merge Sort, Quick Sort
- **Benchmark** all algorithms to compare performance
- Experience sorting performance in a **web application** context

### Lab Structure

| Section | Topic | Time |
|:--------|:------|:-----|
| **A-1** | Elementary sort implementation | 10 min |
| **A-2** | Advanced sort implementation | 15 min |
| **A-3** | Full algorithm benchmark | 10 min |
| **B-1** | Mini shopping mall sort comparison | 15 min |

---

<br>

## 2. Type A — Algorithm Implementation

### 2.1 A-1: Elementary Sorting Algorithms

#### 2.1.1 Selection Sort

**Idea**: Find the minimum value and swap it to the front. Repeat.

```
[64, 34, 25, 12, 22, 11, 90]

Pass 1: Find min=11     -> [11, 34, 25, 12, 22, 64, 90]
                         ^^^^
Pass 2: Find min=12     -> [11, 12, 25, 34, 22, 64, 90]
                             ^^^^
Pass 3: Find min=22     -> [11, 12, 22, 34, 25, 64, 90]
                                 ^^^^
Pass 4: Find min=25     -> [11, 12, 22, 25, 34, 64, 90]
                                     ^^^^
Done!                     [11, 12, 22, 25, 34, 64, 90]
```

**Complexity**: O(n^2) — always scans the remaining elements.

> **Note:** The lecture explains selection sort as "find the maximum and send it to the back," while the lab uses "find the minimum and bring it to the front." Both are selection sort with the same complexity. Only the direction differs; the core principle (fixing one element per round) is the same.

**Solution:**

```python
def selection_sort(arr):
    """Selection Sort: Find minimum and swap to front. O(n^2)"""
    a = arr[:]
    n = len(a)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if a[j] < a[min_idx]:
                min_idx = j
        a[i], a[min_idx] = a[min_idx], a[i]
    return a
```

> **Note:** `arr[:]` is a **shallow copy** of the array. It sorts a copy without modifying the original array. `a[i], a[min_idx] = a[min_idx], a[i]` is Python's simultaneous assignment, swapping two values without a separate temporary variable.

#### 2.1.2 Bubble Sort

**Idea**: Repeatedly compare adjacent elements and swap if they are in the wrong order. The largest element "bubbles up" to the end.

```
[64, 34, 25, 12]

Pass 1: [34, 64, 25, 12]  swap(64,34)
         [34, 25, 64, 12]  swap(64,25)
         [34, 25, 12, 64]  swap(64,12)  <- 64 fixed
                     ^^^^
Pass 2: [25, 34, 12, 64]  swap(34,25)
         [25, 12, 34, 64]  swap(34,12)  <- 34 fixed
                 ^^^^
Pass 3: [12, 25, 34, 64]  swap(25,12)  <- 25 fixed
            ^^^^
Done!   [12, 25, 34, 64]
```

**Optimization**: If no swaps occur in a pass, the array is already sorted — early termination!

**Solution:**

```python
def bubble_sort(arr):
    """Bubble Sort: Repeatedly swap adjacent elements. O(n^2)"""
    a = arr[:]
    n = len(a)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a
```

The `swapped` flag enables early termination — best case O(n) for already sorted input.

> **Note:** The reason for `n - i - 1`: After each pass, one more element is fixed at the right end, so the last i elements need not be compared in the i-th pass. This optimization does not affect correctness but reduces unnecessary comparisons.

#### 2.1.3 Insertion Sort

**Idea**: Insert each element into its correct position within the already sorted prefix.

```
[64, 34, 25, 12, 22]

Step 1: [64 | 34, 25, 12, 22]  Insert 34 -> [34, 64 | 25, 12, 22]
Step 2: [34, 64 | 25, 12, 22]  Insert 25 -> [25, 34, 64 | 12, 22]
Step 3: [25, 34, 64 | 12, 22]  Insert 12 -> [12, 25, 34, 64 | 22]
Step 4: [12, 25, 34, 64 | 22]  Insert 22 -> [12, 22, 25, 34, 64]

        Sorted portion | Unsorted portion
```

**Best case**: O(n) for nearly sorted data — optimal for small/nearly sorted data!

**Solution:**

```python
def insertion_sort(arr):
    """Insertion Sort: Insert each element into sorted prefix. O(n^2)"""
    a = arr[:]
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return a
```

> **Note:** Line-by-line analysis:
> - `key = a[i]`: Store the element to be inserted
> - `while j >= 0 and a[j] > key`: Loop while encountering elements larger than key
> - `a[j + 1] = a[j]`: Shift the larger element one position to the right
> - `a[j + 1] = key`: Insert key into the vacant position
>
> For an already sorted array, the condition `a[j] > key` is immediately false, so the while loop does not execute, resulting in O(n).

**Run and Test:**

```bash
python examples/solutions/a1_basic_sorts.py
```

### 2.2 A-2: Advanced Sorting Algorithms

#### 2.2.1 Merge Sort

**Idea**: Split the array in half, recursively sort each half, then merge.

```
         [38, 27, 43, 3, 9, 82, 10]
                    /     \
         [38, 27, 43, 3]   [9, 82, 10]
            /     \           /     \
       [38, 27]  [43, 3]  [9, 82]  [10]
        /   \     /   \    /   \      |
      [38] [27] [43]  [3] [9] [82]  [10]
        \   /     \   /    \   /      |
       [27, 38]  [3, 43]  [9, 82]  [10]
            \     /           \     /
        [3, 27, 38, 43]   [9, 10, 82]
                    \     /
         [3, 9, 10, 27, 38, 43, 82]
```

**Complexity**: O(n log n) — always guaranteed!

> **Key Point:** Looking at the tree above, the 3 stages of divide and conquer are clear:
> - Top-down (Divide): Split the array in half (total log n levels)
> - Bottom (Base): A single element is trivially sorted
> - Bottom-up (Combine): Merge sorted subarrays

**Solution:**

```python
def merge_sort(arr):
    """Merge Sort: Divide, sort halves, merge. O(n log n)"""
    if len(arr) <= 1:
        return arr[:]
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return _merge(left, right)

def _merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

> **Note:** In the `_merge` function, the `<=` (including equality) in `left[i] <= right[j]` is important. Changing it to `<` could alter the relative order of elements with equal values, breaking **stability**. When a stable sort is needed, `<=` must be used.

#### 2.2.2 Quick Sort

**Idea**: Select a pivot, partition into smaller/equal/larger elements, then recurse.

```
pivot = 43
[38, 27, 43, 3, 9, 82, 10]

       < 43          == 43    > 43
[38, 27, 3, 9, 10]   [43]     [82]
       |                        |
  quicksort(...)          quicksort(...)
       |                        |
[3, 9, 10, 27, 38]             [82]

Result: [3, 9, 10, 27, 38] + [43] + [82]
     = [3, 9, 10, 27, 38, 43, 82]
```

**Complexity**: Average O(n log n), Worst O(n^2)

**Solution:**

```python
def quick_sort(arr):
    """Quick Sort: Partition around pivot, sort subarrays. Average O(n log n)."""
    if len(arr) <= 1:
        return arr[:]
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
```

> **Note:** This implementation differs from the in-place partition in the lecture. It uses list comprehensions for a **concise but space-consuming** version. The trade-offs:
> - **Pros**: Very short and easy to understand code. Handles elements equal to pivot separately
> - **Cons**: Creates new lists at each call, using O(n) extra space
>
> In practice, the in-place approach from the lecture is more memory-efficient, but for coding tests, this concise version is quick to implement.

> **Note:** Summary of pivot selection differences:
> - **Lecture (CLRS)**: Uses the last element as pivot, in-place Lomuto partition
> - **This code**: Uses the middle element as pivot, 3-way partition (< / == / >)
>
> Choosing the middle element as pivot makes balanced partitions more likely even on already-sorted input, helping avoid worst-case behavior. Since exams will likely use the CLRS approach, understanding both methods is important.

**Run and Test:**

```bash
python examples/solutions/a2_advanced_sorts.py
```

#### 2.2.3 Sorting Algorithm Comparison

| Algorithm | Best | Average | Worst | Stable? | In-Place? |
|:----------|:-----|:--------|:------|:--------|:----------|
| Selection | O(n^2) | O(n^2) | O(n^2) | No | Yes |
| Bubble | O(n) | O(n^2) | O(n^2) | Yes | Yes |
| Insertion | O(n) | O(n^2) | O(n^2) | Yes | Yes |
| Merge | O(n log n) | O(n log n) | O(n log n) | Yes | No |
| Quick | O(n log n) | O(n log n) | O(n^2) | No | Yes* |

*\* The list comprehension version above uses extra space.*

> **Key Point:** Key points to remember from this table:
> - Among elementary sorts, only **insertion sort** has best-case O(n) — advantageous for nearly sorted data
> - Only **merge sort** guarantees O(n log n) even in the worst case — most reliable
> - **Quick sort** has the fastest average but risks worst-case O(n^2)

### 2.3 A-3: Benchmark

**Run:**

```bash
python examples/skeletons/a3_sort_benchmark.py
```

Measure execution times at N = 100, 1,000, 10,000, 100,000:

```
Algorithm        N=100     N=1,000    N=10,000    N=100,000
-----------------------------------------------------------
Selection Sort   0.001s    0.050s     5.0s        500s
Bubble Sort      0.001s    0.080s     8.0s        800s
Insertion Sort   0.001s    0.030s     3.0s        300s
Merge Sort       0.001s    0.005s     0.05s       0.5s
Quick Sort       0.001s    0.003s     0.03s       0.3s
```

*(Approximate values — actual results may vary)*

**Question**: At what N does the O(n^2) vs O(n log n) difference become noticeable?

> **Key Point:** At N=100, all algorithms take 0.001s with no difference, but at N=10,000, O(n^2) takes several seconds while O(n log n) takes tens of milliseconds — a difference of **over 100x**. At N=100,000, O(n^2) takes minutes to tens of minutes while O(n log n) is under 1 second. This is the moment you truly feel that "algorithm choice matters."

> **Note:** At N=100,000, O(n^2) algorithms may take several minutes to over 10 minutes. The program has not frozen — it really does take that long. If time is short, you can test O(n^2) algorithms only up to N=10,000 and run only O(n log n) algorithms for N=100,000.

**Visualizing the Gap:**

```
Time (s)
  ^
  |
8 |  x                            x = Bubble Sort
  |                               o = Selection Sort
6 |                               + = Insertion Sort
  |  o                            * = Merge Sort
4 |                               # = Quick Sort
  |
2 |  +
  |
0 |  *#     *#     *#      *#
  +-----+------+------+-------> N
    100  1,000 10,000 100,000
```

O(n^2) algorithms shoot up dramatically, while O(n log n) algorithms remain nearly flat at this scale.

---

<br>

## 3. Type B — Web Code Analysis

### 3.1 B-1: Mini Shopping Mall Sort Comparison

**Setup:**

Run the Flask app:

```bash
cd examples/solutions/b1_web_sort
pip install flask
python app.py
```

Open **http://localhost:5000** in your browser.

```
+-----------------------------------------+
|  Mini Shopping Mall - Sort Demo          |
|                                         |
|  Number of products: [1,000 v]          |
|                                         |
|  [Sort with Bubble Sort]  [Sort with Quick Sort]  |
|                                         |
|  Loading time: ______ ms                |
|                                         |
|  Product list:                          |
|  1. Product A - 12,990 won              |
|  2. Product B - 24,500 won              |
|  ...                                    |
+-----------------------------------------+
```

> **Key Point:** The core of this lab is experiencing firsthand that "algorithm choice directly impacts user experience (UX)." You can directly verify the O(n^2) vs O(n log n) difference learned in theory through the web browser.

**Experiment Procedure:**

1. Click **"Sort with Bubble Sort"** — check the loading time
2. Click **"Sort with Quick Sort"** — check the loading time
3. Increase the number of products: **1,000 -> 10,000 -> 50,000**
4. Feel the difference

**Expected Results:**

| N (Products) | Bubble Sort | Quick Sort | User Experience |
|:-------------|:-----------|:-----------|:---------------|
| 1,000 | ~100 ms | ~5 ms | Both feel instant |
| 10,000 | ~10 sec | ~50 ms | Bubble is painfully slow |
| 50,000 | ~4 min | ~300 ms | Bubble is unusable |

**Discussion:**

> What would happen if a real online shopping mall used an O(n^2) sorting algorithm?

Every page load, every filter change, every "sort by price" click would make users wait and leave!

> **Note:** In real shopping malls, sorting is handled by the **database** rather than the server (SQL's `ORDER BY`). Databases leverage pre-built indexes (B-trees) to return sorted results very quickly. But the lesson of this lab remains the same — choosing the right algorithm/data structure determines service quality.

---

<br>

## Summary

| Concept | Key Takeaway |
|:--------|:-------------|
| Selection Sort | Find minimum and swap to front; always O(n^2); unstable; in-place |
| Bubble Sort | Compare and swap adjacent elements; O(n^2), best O(n) with early termination; stable; in-place |
| Insertion Sort | Insert into sorted prefix; O(n^2), best O(n); stable; in-place; optimal for nearly sorted data |
| Merge Sort | Divide -> recursive sort -> merge; **always O(n log n)** guaranteed; stable; O(n) extra space required |
| Quick Sort | Partition around pivot -> recurse; average O(n log n), worst O(n^2); unstable; list comprehension version uses extra space |
| Benchmark Takeaway | No difference at N=100, but at N=10,000, O(n^2) and O(n log n) differ by **over 100x** |
| UX and Algorithms | Algorithm choice directly impacts user experience; O(n^2) is unusable in real services |
| Stability vs In-Place | Stable sorts preserve relative order of equal keys; in-place sorts use no extra space |
| Core Lesson | Any sort works for small data, but at real data scales, O(n log n) algorithms are essential |

---

<br>

## Practice Problems (Baekjoon)

| Difficulty | Number | Title | Key Concept |
|:-----------|:-------|:------|:------------|
| Bronze II | [2750](https://boj.kr/2750) | Sort Numbers | O(n^2) elementary sort practice |
| Bronze I | [23881](https://boj.kr/23881) | Algorithm Class - Selection Sort 1 | Selection sort simulation |
| Bronze I | [23968](https://boj.kr/23968) | Algorithm Class - Bubble Sort 1 | Bubble sort simulation |
| Bronze I | [24051](https://boj.kr/24051) | Algorithm Class - Insertion Sort 1 | Insertion sort simulation |
| Silver V | [2751](https://boj.kr/2751) | Sort Numbers 2 | O(n log n) required (N=1,000,000) |
| Silver V | [24090](https://boj.kr/24090) | Algorithm Class - Quick Sort 1 | Quick sort simulation |
| Silver IV | [11399](https://boj.kr/11399) | ATM | Sorting + greedy application |
| Silver III | [24060](https://boj.kr/24060) | Algorithm Class - Merge Sort 1 | Merge sort simulation |

> **Note:** "Sort Numbers 2" (problem 2751) has N up to 1,000,000, so O(n^2) algorithms will result in time limit exceeded. You must use an O(n log n) algorithm (merge sort, quick sort, or Python's `sorted()`). The "Algorithm Class" series (23881, 23968, 24051, 24090, 24060) are problems that track intermediate states of the sorting process, making them excellent for verifying that you accurately understand each algorithm's step-by-step behavior.

---

<br>

## Appendix

- **Assignment 2** — See `../3_assignment/README.md` for assignment details.
- **Next week (Week 4)**: Advanced Divide and Conquer — merge sort tracing, k-th smallest element, closest pair of points

---
