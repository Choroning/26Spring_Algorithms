# Week 3 Lecture — Arrays, Stacks, Queues, and Basic Sorting Algorithms

> **Last Updated:** 2026-03-21

---

## Table of Contents

- [1. Basic Data Structures and Elementary Sorting](#1-basic-data-structures-and-elementary-sorting)
  - [1.1 Learning Objectives](#11-learning-objectives)
  - [1.2 Linked List](#12-linked-list)
  - [1.3 Stack](#13-stack)
  - [1.4 Queue](#14-queue)
  - [1.5 Heap](#15-heap)
  - [1.6 Sorting Algorithms — Bird's-Eye View](#16-sorting-algorithms--birds-eye-view)
- [2. Elementary Sorting — O(n^2)](#2-elementary-sorting--on²)
  - [2.1 Selection Sort — Idea](#21-selection-sort--idea)
  - [2.2 Selection Sort — Pseudocode](#22-selection-sort--pseudocode)
  - [2.3 Selection Sort — Step-by-Step Example](#23-selection-sort--step-by-step-example)
  - [2.4 Bubble Sort — Idea](#24-bubble-sort--idea)
  - [2.5 Bubble Sort — Pseudocode](#25-bubble-sort--pseudocode)
  - [2.6 Bubble Sort — Step-by-Step Example](#26-bubble-sort--step-by-step-example)
  - [2.7 Insertion Sort — Idea](#27-insertion-sort--idea)
  - [2.8 Insertion Sort — Pseudocode](#28-insertion-sort--pseudocode)
  - [2.9 Insertion Sort — Inductive Proof of Correctness](#29-insertion-sort--inductive-proof-of-correctness)
  - [2.10 Recursive Structure of Elementary Sorts](#210-recursive-structure-of-elementary-sorts)
- [3. Advanced Sorting — O(n log n)](#3-advanced-sorting--on-log-n)
  - [3.1 Merge Sort — Idea](#31-merge-sort--idea)
  - [3.2 Merge Sort — Pseudocode](#32-merge-sort--pseudocode)
  - [3.3 Merge Sort — Merge Process Example](#33-merge-sort--merge-process-example)
  - [3.4 Merge Sort — Complexity Analysis](#34-merge-sort--complexity-analysis)
  - [3.5 Quick Sort — Idea](#35-quick-sort--idea)
  - [3.6 Quick Sort — Pseudocode](#36-quick-sort--pseudocode)
  - [3.7 Quick Sort — Partition Example](#37-quick-sort--partition-example)
  - [3.8 Quick Sort — Complexity Analysis](#38-quick-sort--complexity-analysis)
  - [3.9 Quick Sort — Why the Average Is O(n log n)](#39-quick-sort--why-the-average-is-on-log-n)
  - [3.10 Heap Sort — Heap Review](#310-heap-sort--heap-review)
  - [3.11 Heap Sort — Algorithm](#311-heap-sort--algorithm)
  - [3.12 Heap Sort — buildHeap and heapify](#312-heap-sort--buildheap-and-heapify)
  - [3.13 Heap Sort — buildHeap Example](#313-heap-sort--buildheap-example)
  - [3.14 Heap Sort — Sorting Phase](#314-heap-sort--sorting-phase)
  - [3.15 Heap Sort — Complexity](#315-heap-sort--complexity)
- [4. Linear-Time Sorting — O(n)](#4-linear-time-sorting--on)
  - [4.1 Lower Bound for Comparison-Based Sorting](#41-lower-bound-for-comparison-based-sorting)
  - [4.2 Radix Sort](#42-radix-sort)
  - [4.3 Radix Sort — Example](#43-radix-sort--example)
  - [4.4 Counting Sort](#44-counting-sort)
  - [4.5 Counting Sort — Example](#45-counting-sort--example)
  - [4.6 Complexity Comparison — All Sorting Algorithms](#46-complexity-comparison--all-sorting-algorithms)
- [Summary](#summary)
- [Appendix](#appendix)

---

<br>

## 1. Basic Data Structures and Elementary Sorting

### 1.1 Learning Objectives

- Review basic data structures: lists, stacks, queues, heaps
- Understand elementary sorting algorithms and O(n^2) behavior
- Understand advanced sorting algorithms and O(n log n) behavior
- Understand linear-time sorting and the conditions that make it possible
- Identify the **recursive (inductive) structure** of sorting algorithms
- Compare sorting algorithm complexities

### 1.2 Linked List

- A sequence of **nodes**, each containing data and a pointer to the next node.

```
┌──────┬───┐    ┌──────┬───┐    ┌──────┬───┐
│ data │  ─┼───►│ data │  ─┼───►│ data │ / │
└──────┴───┘    └──────┴───┘    └──────┴───┘
```

```c
typedef int element;

typedef struct ListNode {
    element data;
    struct ListNode *link;
} ListNode;
```

> **Note:** In Python, linked lists are implemented using classes:
> ```python
> class ListNode:
>     def __init__(self, data, next=None):
>         self.data = data
>         self.next = next  # Reference to the next node
> ```
> C's pointer (`*link`) corresponds to Python's object reference (`self.next`).

- Operations: insertion, deletion, search — all O(n) in the worst case
- Visualization: [https://visualgo.net/en/list](https://visualgo.net/en/list)

> **[Data Structures]** The key differences between linked lists and arrays:
> - **Array**: Stored contiguously in memory, index access O(1), insertion/deletion O(n) (must shift elements)
> - **Linked List**: Stored scattered in memory, access O(n) (must traverse from the beginning), insertion/deletion O(1) (only change pointers)
>
> In the code above, `link` is the pointer to the next node, and the last node's link is NULL (`/`).

### 1.3 Stack

- **LIFO** (Last In, First Out)
- `push()`: Add an element to the top
- `pop()`: Remove an element from the top

```
         ┌─────┐
   top → │  C  │
         ├─────┤
         │  B  │
         ├─────┤
bottom → │  A  │
         └─────┘
```

- Applications: function call stack, expression evaluation, backtracking
- Visualization: [https://visualgo.net/en/list](https://visualgo.net/en/list)

> **[Data Structures]** Stacks are used when "the most recent item must be processed first." Representative applications include:
> - **Function call stack**: As seen with GCD recursion in Week 2, nested function calls are managed via a stack
> - **Parenthesis matching**: In `({[]})`, push opening brackets and pop when a closing bracket appears to check for matching
> - **Undo**: Web browser back navigation is also stack-based

### 1.4 Queue

- **FIFO** (First In, First Out)
- `enqueue()`: Add an element to the rear
- `dequeue()`: Remove an element from the front

```
  dequeue ◄── [ A | B | C | D ] ◄── enqueue
              front        rear
```

- Applications: BFS, scheduling, buffering
- Visualization: [https://visualgo.net/en/list](https://visualgo.net/en/list)

> **[Data Structures]** Queues are used when "the first arrived must be processed first."
> - **BFS (Breadth-First Search)**: Uses a queue to explore the nearest nodes first in a graph
> - **Printer queue**: Documents are printed in the order they were requested
> - **OS process scheduling**: Distributes CPU time fairly
>
> Remember that stacks (LIFO) and queues (FIFO) are opposite concepts.

### 1.5 Heap

- A **complete binary tree** satisfying the heap property.
  - **Max Heap**: key(parent) >= key(child)
  - **Min Heap**: key(parent) <= key(child)
- Heaps are stored in an **array** (no pointers needed).
  - Children of A[i]: **A[2i]**, **A[2i+1]**
  - Parent of A[i]: **A[floor(i/2)]**
- Applications: priority queue, heap sort
- Visualization: [visualgo.net/en/heap](https://visualgo.net/en/heap)

![Heap: Tree and Array Representation](../images/ch06_p002_001.png)

> **[Data Structures]** Reviewing complete binary trees and heaps from Data Structures:
> - **Complete binary tree**: All levels except the last are completely filled, and the last level is filled from left to right
> - **Storing a heap in an array**: Place the root at index 1, then node i's left child is 2i, right child is 2i+1, and parent is floor(i/2). This allows traversing the tree using only array index calculations — no pointers needed, making it very efficient.
> - **Priority queue**: The key application of heaps. The largest (Max Heap) or smallest (Min Heap) element can be extracted in O(log n).

### 1.6 Sorting Algorithms — Bird's-Eye View

- Most sorting algorithms fall between **O(n^2)** and **O(n log n)**.
- If the input has special properties, **O(n)** sorting is also possible.

| Category | Algorithms | Complexity |
|:---------|:-----------|:-----------|
| Elementary | Selection, Bubble, Insertion | O(n^2) |
| Advanced | Merge, Quick, Heap | O(n log n) |
| Linear-Time | Radix, Counting | O(n) |

> Two perspectives on understanding algorithms:
> - **Flow-based**: Follow the execution steps one by one
> - **Relational**: Observe how each step transforms the state (deeper understanding)

> **Key Point:** Sorting algorithms are a core topic in algorithms courses because (1) they are the most frequently used operation in practice, (2) they encompass core concepts like divide and conquer, recursion, and complexity analysis, and (3) there is the theoretically important result of the lower bound for comparison-based sorting (Omega(n log n)).

---

<br>

## 2. Elementary Sorting — O(n^2)

### 2.1 Selection Sort — Idea

In each iteration:
1. Find the **minimum** (or maximum) value in the unsorted portion
2. **Swap** it with the leftmost element of the unsorted portion
3. **Exclude** that element (it is now in its final position)
4. Repeat until one element remains

```text
[15, 11, 29, 20, 65, 3, 73, 48, 31, 8]    Find minimum (3)
[3 | 11, 29, 20, 65, 15, 73, 48, 31, 8]   Swap 3↔15, exclude 3
[3, 8 | 29, 20, 65, 15, 73, 48, 31, 11]   Find min(8), swap 8↔11, exclude
  ...
[3, 8, 11, 15, 20, 29, 31, 48, 65, 73]    Sorting complete!
```

- Each round **selects** the minimum (or maximum) value.

### 2.2 Selection Sort — Pseudocode

```
selectionSort(A[], n)          ▷ Sort A[1...n]
{
    for last ← n downto 2 {                           ── ①
        Find the largest element A[k] in A[1...last]; ── ②
        A[k] ↔ A[last];   ▷ Swap A[k] and A[last]       ── ③
    }
}
```

**Complexity Analysis:**
- Loop ① executes **n - 1** times
- Finding the maximum ②: requires n-1, n-2, ..., 2, 1 comparisons
- Swap ③ is constant time

$$T(n) = (n-1) + (n-2) + \cdots + 2 + 1 = \frac{n(n-1)}{2} = \Theta(n^2)$$

- **Worst case**: Theta(n^2) | **Average case**: Theta(n^2)

> **Key Point:** The key characteristic of selection sort is that regardless of the input state (already sorted, reversed, random), it is **always Theta(n^2)**. Best/average/worst are all the same. The number of comparisons is always n(n-1)/2, and only the number of swaps varies (up to n-1, or 0 if already sorted).

> **Note:** The lecture explains selection sort as "find the maximum and send it to the back," while the lab uses "find the minimum and bring it to the front." Both are selection sort with the same complexity. Only the direction differs; the core principle (fixing one element per round) is the same.

### 2.3 Selection Sort — Step-by-Step Example

| Step | Array State | Action |
|:-----|:-----------|:-------|
| 0 | `[15, 11, 29, 20, 65, 3, 73, 48, 31, 8]` | Initial array |
| 1 | `[15, 11, 29, 20, 65, 3, \|8\|, 48, 31 \| 73]` | max=73, swap 73↔8 |
| 2 | `[15, 11, 29, 20, \|31\|, 3, 8, 48 \| 65, 73]` | max=65, swap 65↔31 |
| 3 | `[15, 11, 29, 20, 31, 3, 8 \| 48, 65, 73]` | max=48, no swap needed |
| 4 | `[15, 11, 29, 20, \|8\|, 3 \| 31, 48, 65, 73]` | max=31, swap 31↔8 |
| 5 | `[15, 11, \|3\|, 20, 8 \| 29, 31, 48, 65, 73]` | max=29, swap 29↔3 |
| 6 | `[15, 11, 3, \|8\| \| 20, 29, 31, 48, 65, 73]` | max=20, swap 20↔8 |
| 7 | `[\|8\|, 11, 3 \| 15, 20, 29, 31, 48, 65, 73]` | max=15, swap 15↔8 |
| 8 | `[8, \|3\| \| 11, 15, 20, 29, 31, 48, 65, 73]` | max=11, swap 11↔3 |
| 9 | `[3, 8, 11, 15, 20, 29, 31, 48, 65, 73]` | Sorting complete! |

> Animation: [https://visualgo.net/en/sorting](https://visualgo.net/en/sorting)

### 2.4 Bubble Sort — Idea

In each iteration:
1. Start from the left and compare **adjacent pairs**
2. **Swap** if they are in the wrong order
3. The largest element **"bubbles up"** to the rightmost position
4. Exclude the rightmost element and repeat

```text
[15, 65, 29, 20, 11, 8, 73, 48, 31, 3]    Compare adjacent pairs
[15, 29, 20, 11, 8, 65, 48, 31, 3, |73|]  73 bubbles to end, excluded
[15, 20, 11, 8, 29, 48, 31, 3, |65, 73|]  65 bubbles up, excluded
  ...
[3, 8, 11, 15, 20, 29, 31, 48, 65, 73]    Sorting complete!
```

- Each round, the **maximum** bubbles up to the end.

> **Note:** "Bubble sort" gets its name from how the largest element rises to the top (right) like a bubble rising in water.

### 2.5 Bubble Sort — Pseudocode

```
bubbleSort(A[], n)             ▷ Sort A[1...n]
{
    for last ← n downto 2                            ── ①
        for i ← 1 to last-1                          ── ②
            if (A[i] > A[i+1]) then A[i] ↔ A[i+1];   ── ③
}
```

**Complexity Analysis:**
- Loop ① executes **n - 1** times
- Loop ② executes n-1, n-2, ..., 2, 1 times respectively
- Swap ③ is constant time

$$T(n) = (n-1) + (n-2) + \cdots + 2 + 1 = \frac{n(n-1)}{2} = \Theta(n^2)$$

- **Worst case**: Theta(n^2) | **Average case**: Theta(n^2)

> **Note:** Bubble sort has a useful optimization. If **no swaps occur** during an entire pass, the array is already sorted and can terminate immediately. With this optimization, the **best case (already sorted input) becomes Theta(n)**. The `swapped` flag in the lab's Python code is precisely this optimization.

### 2.6 Bubble Sort — Step-by-Step Example

| Pass | Array After Pass | Bubbled Element |
|:-----|:----------------|:----------------|
| 0 | `[15, 65, 29, 20, 11, 8, 73, 48, 31, 3]` | (initial) |
| 1 | `[15, 29, 20, 11, 8, 65, 48, 31, 3, \|73\|]` | 73 |
| 2 | `[15, 20, 11, 8, 29, 48, 31, 3, \|65, 73\|]` | 65 |
| 3 | `[15, 11, 8, 20, 29, 31, 3, \|48, 65, 73\|]` | 48 |
| ... | ... | ... |
| 9 | `[3, 8, 11, 15, 20, 29, 31, 48, 65, 73]` | Complete |

> Within each pass, adjacent elements are compared left to right and swapped if out of order.

> Animation: [https://visualgo.net/en/sorting](https://visualgo.net/en/sorting)

### 2.7 Insertion Sort — Idea

In each iteration:
1. Take the next element (**key**) from the unsorted portion
2. **Shift** larger elements in the sorted portion to the right
3. **Insert** the element at the correct position

```text
[29]  10  14  37  13           29 is trivially sorted
[10, 29]  14  37  13           Insert 10: shift 29, place 10
[10, 14, 29]  37  13           Insert 14: shift 29, place 14
[10, 14, 29, 37]  13           Insert 37: already in place
[10, 13, 14, 29, 37]           Insert 13: shift 37,29,14, place 13
```

- Each element is inserted into the already **sorted** subarray.

> **Note:** Insertion sort is identical to how you sort cards in your hand during a card game. When you receive a new card, you insert it into the correct position among the already-sorted cards. This intuitive approach is precisely insertion sort.

### 2.8 Insertion Sort — Pseudocode

```
insertionSort(A[], n)          ▷ Sort A[1...n]
{
    for i ← 2 to n                                      ── ①
        Insert A[i] into its proper place in A[1...i];  ── ②
}
```

**Complexity Analysis:**
- Loop ① executes **n - 1** times
- Insertion ② requires at most i - 1 comparisons

| Case | Comparisons | Complexity |
|:-----|:-----------|:-----------|
| **Worst** (reverse sorted) | 1 + 2 + ... + (n-1) | Theta(n^2) |
| **Average** | 1/2 (1 + 2 + ... + (n-1)) | Theta(n^2) |
| **Best** (already sorted) | 1 + 1 + ... + 1 | **Theta(n)** |

> Insertion sort is the **fastest** among elementary sorts for nearly sorted data.

> **Key Point:** The reason insertion sort is Theta(n) in the best case: when already sorted, inserting each element requires only **1 comparison** (comparing with the element directly in front confirms it is already in the correct position). Total n-1 times x 1 comparison = Theta(n). This is why insertion sort is frequently used in practice for **nearly sorted, small-scale data**. Python's Timsort also uses insertion sort internally for small segments.

### 2.9 Insertion Sort — Inductive Proof of Correctness

**Loop Invariant**: At the start of the i-th iteration, subarray A[1...i-1] is sorted.

- **Base case** (n = 1): A single element A[1] is trivially sorted.
- **Inductive step**: If A[1...k] is sorted (P(k) holds), inserting A[k+1] at the correct position yields sorted A[1...k+1] (P(k+1) holds).
- **Conclusion**: After the n-th iteration, the entire array A[1...n] is sorted.

> This is exactly the same as applying **mathematical induction** (learned in high school) to algorithms.

> **Exam Tip:** A **loop invariant** is a key tool for proving algorithm correctness. It is "a condition that remains true at every iteration of the loop." Its structure is identical to mathematical induction:
> - Base case = true before the loop starts
> - Inductive step = still true after one iteration
> - Conclusion = the desired property holds after the loop terminates
>
> When exam questions ask for correctness proofs, using loop invariants is the standard approach.

### 2.10 Recursive Structure of Elementary Sorts

All three elementary sorts share the **same recursive structure**:

```
T(n) = T(n-1) + Theta(n)
```

| Algorithm | Recursive Form | "Work Per Level" |
|:----------|:--------------|:-----------------|
| **Insertion Sort** | Sort A[1...n-1], then insert A[n] | insert(n) = Theta(n) |
| **Selection Sort** | Find max and swap, then sort A[1...n-1] | maxSwap(n) = Theta(n) |
| **Bubble Sort** | Bubble max to end, then sort A[1...n-1] | bubble(n) = Theta(n) |

```
insertionSort(A, n) {       selectionSort(A, n) {       bubbleSort(A, n) {
  if (n == 1) return;         if (n == 1) return;         if (n == 1) return;
  insertionSort(A, n-1);      maxSwap(A, n);              bubble(A, n);
  insert(A, n);               selectionSort(A, n-1);      bubbleSort(A, n-1);
}                           }                           }
```

> Key difference: Insertion sort does work **after** the recursive call, while selection/bubble sort do work **before** the recursive call.

> **Key Point:** This recursive structure is very important! All three algorithms follow the same recurrence $T(n) = T(n-1) + \Theta(n)$, which solves to $T(n) = \Theta(n) + \Theta(n-1) + ... + \Theta(1) = \Theta(n^2)$. The fundamental cause of O(n^2) is the structure where **the problem size decreases by only 1 at each step**. O(n log n) algorithms (merge, quick) split the problem **in half**, giving $T(n) = 2T(n/2) + \Theta(n)$, which is much faster.

---

<br>

## 3. Advanced Sorting — O(n log n)

### 3.1 Merge Sort — Idea

**Divide and Conquer**:
1. **Divide**: Split the array into two halves
2. **Conquer**: Recursively sort each half
3. **Combine**: Merge the two sorted halves

```text
[31, 3, 65, 73, 8, 11, 20, 29, 48, 15]     Original

[31, 3, 65, 73, 8] | [11, 20, 29, 48, 15]  ① Divide

[3, 8, 31, 65, 73] | [11, 15, 20, 29, 48]  ②③ Sort each half

[3, 8, 11, 15, 20, 29, 31, 48, 65, 73]     ④ Merge
```

### 3.2 Merge Sort — Pseudocode

```
mergeSort(A[], p, r)             ▷ Sort A[p...r]
{
    if (p < r) then {
        q ← floor((p + r) / 2);  ▷ Midpoint
        mergeSort(A, p, q);      ▷ Sort left half
        mergeSort(A, q+1, r);    ▷ Sort right half
        merge(A, p, q, r);       ▷ Merge the two sorted halves
    }
}
```

```
merge(A[], p, q, r)              ▷ Merge A[p...q] and A[q+1...r]
{
    i ← p; j ← q+1; t ← 1;
    while (i ≤ q and j ≤ r) {
        if (A[i] ≤ A[j])
            tmp[t++] ← A[i++];
        else
            tmp[t++] ← A[j++];
    }
    Copy remaining elements to tmp[];  ▷ Copy remaining elements to tmp[]
    Copy tmp[] back to A[p...r];       ▷ Copy tmp[] back to A[p...r]
}
```

> **Key Point:** The core of the merge function is combining two **already sorted** arrays. It compares elements from the front of both arrays and places the smaller one into the result array. Since both sides are sorted, this process completes in O(n). This merge is precisely the "Combine" step.

### 3.3 Merge Sort — Merge Process Example

Merging `[3, 8, 31, 65, 73]` and `[11, 15, 20, 29, 48]`:

```
 i                      j                       tmp
[3, 8, 31, 65, 73]     [11, 15, 20, 29, 48]     []

Step 1: 3 < 11  → tmp = [3],         advance i
Step 2: 8 < 11  → tmp = [3, 8],      advance i
Step 3: 31 > 11 → tmp = [3, 8, 11],  advance j
Step 4: 31 > 15 → tmp = [3, 8, 11, 15],  advance j
Step 5: 31 > 20 → tmp = [3, 8, 11, 15, 20],  advance j
Step 6: 31 > 29 → tmp = [3, 8, 11, 15, 20, 29],  advance j
Step 7: 31 < 48 → tmp = [3, 8, 11, 15, 20, 29, 31],  advance i
Step 8: 65 > 48 → tmp = [3, 8, 11, 15, 20, 29, 31, 48],  advance j
Step 9-10: Copy remaining [65, 73]

Result: [3, 8, 11, 15, 20, 29, 31, 48, 65, 73]
```

### 3.4 Merge Sort — Complexity Analysis

**Recurrence**:

$$T(n) = 2T\left(\frac{n}{2}\right) + \Theta(n)$$

**Recursion Tree**: Total work at each level is Theta(n), and there are log_2(n) levels.

```
Level 0:         n            → n work
Level 1:     n/2   n/2        → n work
Level 2:   n/4 n/4 n/4 n/4    → n work
  ...
Level h:   1  1  1  ...  1    → n work

h = log₂n levels  →  Total: n × log₂n
```

$$T(n) = \Theta(n \log n)$$

> Merge sort is **always** Theta(n log n) — worst, average, and best cases are all the same.
> Trade-off: **O(n) extra space** is needed for the temporary array.

> **Note:** Applying the Master Theorem from Week 2 to this recurrence: a=2, b=2, f(n)=n, so $n^{\log_2 2} = n$, and $f(n) = \Theta(n^{\log_b a})$, giving **Case 2**. Therefore $T(n) = \Theta(n \log n)$. Whether solved by repeated substitution or the Master Theorem, the result is the same.

### 3.5 Quick Sort — Idea

1. Select a **pivot** element (e.g., the last element)
2. **Partition**: Rearrange elements so those smaller than the pivot go left, larger ones go right
3. The pivot is now in its **final sorted position**
4. Recursively sort the left and right subarrays

```text
[31, 8, 48, 73, 11, 3, 20, 29, 65, 15]    pivot = 15

[8, 11, 3, |15|, 31, 48, 20, 29, 65, 73]  After partition

[3, 8, 11, |15|, 20, 29, 31, 48, 65, 73]  Left & right recursively sorted
```

> **Key Point:** The key difference between merge sort and quick sort:
> - **Merge sort**: Divide first (division is simple), do work when combining (merge is complex)
> - **Quick sort**: Do work when dividing (partition is complex), combining is unnecessary (already in-place)
>
> In other words, merge sort's core is "combine" while quick sort's core is "divide."

### 3.6 Quick Sort — Pseudocode

```
quickSort(A[], p, r)             ▷ Sort A[p...r]
{
    if (p < r) then {
        q ← partition(A, p, r);  ▷ Partition around pivot
        quickSort(A, p, q-1);    ▷ Sort left subarray
        quickSort(A, q+1, r);    ▷ Sort right subarray
    }
}
```

```
partition(A[], p, r)
{
    pivot ← A[r];                ▷ Choose last element as pivot
    i ← p - 1;
    for j ← p to r-1 {
        if (A[j] ≤ pivot) {
            i ← i + 1;
            A[i] ↔ A[j];
        }
    }
    A[i+1] ↔ A[r];               ▷ Place pivot in its final position
    return i + 1;
}
```

> `i` marks the boundary: all elements at index `i` or below are <= pivot.
> `j` scans the array from left to right.

![Partition Invariant](../images/ch07_p004_002.png)

> **Note:** An intuitive way to understand the partition function: `i` points to "the end of the region <= pivot," and `j` points to "the start of the unexamined region." When A[j] <= pivot, i is incremented to expand the <= pivot region, and A[j] is swapped into that position. At the end, placing the pivot at position i+1 ensures everything to its left is <= pivot and everything to its right is > pivot.

> **Note:** The reason `i = p - 1` for initialization: i tracks "the last index of the <= pivot region." Initially, no elements have been identified as <= pivot, so the end of the region is placed **just before** the array start (p-1). When the first element with A[j] <= pivot is found, i increases to p, finally pointing to a valid index.

### 3.7 Quick Sort — Partition Example

Partitioning `[31, 8, 48, 73, 11, 3, 20, 29, 65, 15]` with pivot = 15:

```
pivot = A[10] = 15,  i = 0

j=1: A[1]=31 > 15   → skip
j=2: A[2]=8  ≤ 15   → i=1, swap A[1]↔A[2]
j=3: A[3]=48 > 15   → skip
j=4: A[4]=73 > 15   → skip
j=5: A[5]=11 ≤ 15   → i=2, swap A[2]↔A[5]
j=6: A[6]=3  ≤ 15   → i=3, swap A[3]↔A[6]
j=7~9: > 15         → skip

Final: swap A[4]↔A[10]
→ [8, 11, 3, |15|, 31, 48, 20, 29, 65, 73]
```

![PARTITION Step-by-Step (CLRS)](../images/ch07_p003_001.png)

> Animation: [visualgo.net/en/sorting](https://visualgo.net/en/sorting)

### 3.8 Quick Sort — Complexity Analysis

**Recurrence**: T(n) = T(i - 1) + T(n - i) + Theta(n), where i is the pivot's final position.

| Case | Partition Balance | Recurrence | Complexity |
|:-----|:-----------------|:-----------|:-----------|
| **Worst** | 0 : n-1 (sorted input) | T(n) = T(n-1) + Theta(n) | **Theta(n^2)** |
| **Best** | n/2 : n/2 (perfect split) | T(n) = 2T(n/2) + Theta(n) | **Theta(n log n)** |
| **Average** | Random split | See below | **Theta(n log n)** |

**Worst case** — input is already sorted, pivot is always the minimum or maximum:

```
T(n) = T(0) + T(n-1) + Theta(n) = T(n-1) + Theta(n)
     = Theta(n) + Theta(n-1) + ... + Theta(1) = Theta(n^2)
```

![Quick Sort Worst vs Best](../images/ch07_p008_006.png)

> **Note:** Practical techniques to avoid quick sort's worst-case O(n^2):
> 1. **Randomized Pivot**: Choosing the pivot randomly makes the probability of worst-case occurrence extremely low
> 2. **Median-of-Three**: Choose the median of the first/middle/last elements as the pivot
> 3. **Introsort**: Switch to heap sort when recursion depth becomes too deep (this is how C++ STL's `std::sort` works)

### 3.9 Quick Sort — Why the Average Is O(n log n)

**Key Insight**: Even with a partition ratio that is **any constant ratio** (1:9, 1:99), the depth remains O(log n).

- Longest path: n -> 9n/10 -> (9/10)^2 n -> ... -> 1
- Depth = log_{10/9}(n) = O(log n)
- Total work at each level is still O(n)

![1/10 : 9/10 Recursion Tree](../images/ch07_p007_004.png)

**Average Analysis Proof** (using induction):
- Assume T(i) <= c * i * log(i) for all i < n
- Average over all possible pivot positions: T(n) = (1/n) * sum_{i=0}^{n-1} [T(i) + T(n-i-1)] + Theta(n)
- Using integral approximation: T(n) <= c * n * log(n)
- Therefore T(n) = **O(n log n)** (average)

> **Note:** Why an unbalanced split like 1:9 is acceptable: even when the problem size shrinks by 9/10 each time, solving $n \times (9/10)^k = 1$ gives $k = \log_{10/9}(n)$, which is $O(\log n)$ (only the base differs). What truly causes problems is when an **extreme imbalance** like 0:(n-1) repeats every time.

### 3.10 Heap Sort — Heap Review

**Heap**: A complete binary tree with the heap property, stored in an array.

```
   Min Heap Example      Max Heap Example
       3                 9
      / \               / \
     6   4             7   8
    / \   \           / \   \
   8   9   7         3   6   4
```

**Array Representation** (1-indexed):
- Children of A[i]: **A[2i]** and **A[2i + 1]**
- Parent of A[i]: **A[floor(i/2)]**
- Sibling of A[i]: **A[i-1]** (when i is odd)

![MAX-HEAPIFY Operation](../images/ch06_p005_002.png)

### 3.11 Heap Sort — Algorithm

```
heapSort(A[], n)              ▷ Sort A[1...n]
{
    buildHeap(A, n);          ▷ Build a min heap (or max heap)
    for i ← n downto 2 {
        A[1] ↔ A[i];          ▷ Swap root (min/max) with last element
        heapify(A, 1, i-1);   ▷ Restore heap property
    }
}
```

**Two Key Subroutines:**
1. `buildHeap`: Transforms an arbitrary array into a heap — **O(n)**
2. `heapify`: Fixes the heap property at a single node — **O(log n)**

> **Worst case**: O(n log n) — guaranteed, unlike quick sort!

> **Note:** How heap sort works: (1) Turn the entire array into a heap (buildHeap), (2) Move the heap's root (min or max) to the end of the array, (3) Reduce the heap size by 1 and restore the heap property (heapify). Repeating this sorts the array.

### 3.12 Heap Sort — buildHeap and heapify

```
buildHeap(A[], n)
{
    for i ← floor(n/2) downto 1      ▷ Start from the last internal node
        heapify(A, i, n);
}
```

```
heapify(A[], k, n)                   ▷ Fix heap rooted at A[k]
{                                    ▷ Subtrees of A[k] are already heaps
    left ← 2k;  right ← 2k + 1;
    if (right ≤ n) then {            ▷ Two children
        if (A[left] < A[right])
            smaller ← left;
        else smaller ← right;
    }
    else if (left ≤ n) then          ▷ Only left child exists
        smaller ← left;
    else return;                     ▷ Leaf node

    if (A[smaller] < A[k]) then {    ▷ Heap property violated
        A[k] ↔ A[smaller];
        heapify(A, smaller, n);      ▷ Recurse downward
    }
}
```

> **Note:** The reason buildHeap is O(n) is not intuitive. The rationale for why it is O(n) rather than O(n log n): leaf nodes (half of all nodes) require no heapify, height-1 nodes only go down 1 level, height-2 nodes only go down 2 levels. The total sum is $\sum_{h=0}^{\log n} \frac{n}{2^{h+1}} \cdot h$, and this series sums to O(n). For a mathematically rigorous proof, see CLRS Section 6.3.

> **Note:** The reason for starting at `floor(n/2)`: Nodes from index floor(n/2)+1 through n are all **leaf nodes** (nodes with no children). Leaf nodes are trivially heaps of size 1, so heapify is unnecessary. Therefore, applying heapify in reverse order from the last internal node floor(n/2) down to root (1) propagates the heap property from bottom to top.

### 3.13 Heap Sort — buildHeap Example

Building a min heap from `A = [7, 9, 4, 8, 6, 3]`:

```
(a) Start          (b) heapify(3)   (c) heapify(2)
     7                 7                7
    / \               / \              / \
   9   4             9   3            6   3
  / \   \           / \   \          / \   \
 8   6   3         8   6   4        8   9   4

(d) heapify(1)   (e) Final Heap
     3                 3
    / \               / \
   6   4             6   4
  / \   \           / \   \
 8   9   7         8   9   7
```

> buildHeap processes nodes **bottom-up** (from floor(n/2) to 1).

![BUILD-MAX-HEAP (CLRS)](../images/ch06_p008_003.png)

### 3.14 Heap Sort — Sorting Phase

After buildHeap, repeatedly extract the minimum:

```
(a) [3,6,4,8,9,7]  Swap A[1]↔A[6], heapify → [4,6,7,8,9,|3]
(b) [4,6,7,8,9,|3] Swap A[1]↔A[5], heapify → [6,8,7,9,|4,3]
(c) [6,8,7,9,|4,3] Swap A[1]↔A[4], heapify → [7,8,9,|6,4,3]
(d) [7,8,9,|6,4,3] Swap A[1]↔A[3], heapify → [8,9,|7,6,4,3]
(e) [8,9,|7,6,4,3] Swap A[1]↔A[2] → Done!

Result (descending): [9, 8, 7, 6, 4, 3]
```

> Min heap → **descending** order.
> Max heap → **ascending** order.

![HEAPSORT Sorting Phase (CLRS)](../images/ch06_p011_004.png)

### 3.15 Heap Sort — Complexity

```
heapSort(A[], n)
{
    buildHeap(A, n);          → O(n)  [tighter analysis] or O(n log n)
    for i ← n downto 2 {      → n - 1 iterations
        A[1] ↔ A[i];          → O(1)
        heapify(A, 1, i-1);   → O(log n)
    }
}
```

| Phase | Complexity |
|:------|:-----------|
| buildHeap | O(n) |
| Sorting loop | (n-1) x O(log n) = **O(n log n)** |
| **Total** | **O(n log n)** |

> Heap sort is **O(n log n) even in the worst case** — no degenerate inputs like quick sort!
> It is **in-place** (unlike merge sort, no extra array is needed).

> **Exam Tip:** Comparison of the three O(n log n) sorts:
>
> | | Merge Sort | Quick Sort | Heap Sort |
> |:---|:---|:---|:---|
> | Worst | O(n log n) | **O(n^2)** | O(n log n) |
> | Extra space | **O(n)** | O(log n) | O(1) |
> | Practical speed | Fast | **Fastest** | Average |
> | Stability | **Stable** | Unstable | Unstable |
>
> The reason quick sort is most commonly used in practice despite its worst-case O(n^2) is its excellent cache efficiency and small constant factors.

---

<br>

## 4. Linear-Time Sorting — O(n)

### 4.1 Lower Bound for Comparison-Based Sorting

**Theorem**: Any comparison-based sorting algorithm requires at least **Omega(n log n)** comparisons in the worst case.

> This means selection, bubble, insertion, merge, quick, and heap sort **cannot be faster than** O(n log n) as long as they use only comparisons.

**However**: If elements have **special properties**, comparisons can be bypassed entirely.

| Algorithm | Condition | Complexity |
|:----------|:---------|:-----------|
| **Radix Sort** | Elements have at most k digits (k = constant) | Theta(n) |
| **Counting Sort** | Element values range in [-O(n), O(n)] | Theta(n) |

> **Key Point:** This lower bound theorem is proven using the **decision tree** model. A comparison-based sort asks "A[i] <= A[j]?" (yes/no) at each step. Since there are n! possible orderings of n elements, at least log_2(n!) comparisons are needed to distinguish them all. By Stirling's approximation, log_2(n!) = Theta(n log n). That is, **sorting using only comparisons can never be faster than O(n log n)**.

> **Note:** Understanding the decision tree concretely: Consider sorting n=3 elements [a, b, c]. There are 3! = 6 possible orderings. Each comparison ("a <= b?") is an internal node of the tree, and each leaf is one permutation (sorting result). The minimum height of a binary tree with 6 leaves is ceil(log_2 6) = 3, so at least 3 comparisons are needed. In general, the height of a binary tree with n! leaves is at least log_2(n!) = Theta(n log n).

### 4.2 Radix Sort

Sort by each digit position, from the **least significant digit (LSD)** to the **most significant digit (MSD)**, using a **stable sort**.

```
radixSort(A[], n, k)           ▷ Elements have at most k digits
{
    for i ← 1 to k
        Stable-sort A[1...n] on the i-th digit;
                               ▷ Stable sort on the i-th digit
}
```

**Stable Sort**: A sort that preserves the **original relative order** of elements with equal keys.

> **Note:** Why stability is important in radix sort: After sorting by the 1's digit, when sorting by the 10's digit, elements with the same 10's digit must already be ordered by their 1's digit. If the sort is not stable, this order breaks and the final result becomes incorrect.

### 4.3 Radix Sort — Example

Sort: `[0123, 2154, 0222, 0004, 0283, 1560, 1061, 2150]`

```
 Original        1st digit      2nd digit      3rd digit      4th digit
 0123         1560         0004         0004         0004
 2154         2150         0222         1061         0123
 0222         1061         0123         0123         0222
 0004         0222         2150         2150         0283
 0283         0123         2154         2154         1061
 1560         0283         1560         0222         1560
 1061         2154         1061         0283         2150
 2150         0004         0283         1560         2154
```

- Each column shows the result of applying a **stable sort** on the highlighted digit
- After processing all k = 4 digits, the array is fully sorted

$$T(n) = k \cdot \Theta(n) = \Theta(n) \quad \text{(when }k\text{ is constant)}$$

### 4.4 Counting Sort

Used when element values are within a range: all values in `{1, 2, ..., k}` (k = O(n)).

```
countingSort(A[], B[], n)        ▷ A[1...n]: input, B[1...n]: output
{
    for i ← 1 to k
        C[i] ← 0;                ▷ Initialize counts

    for j ← 1 to n
        C[A[j]]++;               ▷ Count occurrences

    // C[i] now holds the number of elements equal to i

    for i ← 2 to k
        C[i] ← C[i] + C[i-1];    ▷ Cumulative sum

    // C[i] now holds the number of elements ≤ i

    for j ← n downto 1 {
        B[C[A[j]]] ← A[j];       ▷ Place element
        C[A[j]]--;               ▷ Decrement count
    }
}
```

> **Key Point:** The core idea of counting sort: (1) Count how many times each value appears, (2) Compute the cumulative sum, which directly tells "where this value should go in the result array," (3) Traverse the original array from back to front, placing each element in its position (traversing from back to front ensures stability). Since no comparisons are made, the Omega(n log n) lower bound is bypassed.

> **Note:** Why traversing from back to front ensures stability: The cumulative sum C[v] points to "the last position where a value v should go." By traversing from back to front, among elements with the same value, **the one later in the original** is placed first at the later position in the result array, and C[v] decrements to leave earlier positions for the rest. Traversing from front to back would reverse the relative order. Since radix sort depends on counting sort's stability, this traversal direction is very important.

### 4.5 Counting Sort — Example

Sort `A = [3, 1, 2, 1, 1, 4, 2, 3, 1, 2]` with k = 4:

```
Step 1: Count occurrences               Step 2: Cumulative sum
C = [4, 3, 2, 1]                  C = [4, 7, 9, 10]
     1  2  3  4                        1  2  3  4

     ↑                                 ↑
     1 appears 4 times, 2 three times,    Elements ≤ 1: 4
     3 two times, 4 one time              Elements ≤ 2: 7
                                          Elements ≤ 3: 9
                                          Elements ≤ 4: 10

Step 3: Place elements (right to left for stability)
j=10: A[10]=2, C[2]=7 → B[7]=2, C[2]=6
j=9:  A[9]=1,  C[1]=4 → B[4]=1, C[1]=3
j=8:  A[8]=3,  C[3]=9 → B[9]=3, C[3]=8
  ...

B = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4]     ← Sorting complete!
```

$$T(n) = \Theta(n + k) = \Theta(n) \quad \text{(when }k = O(n)\text{)}$$

### 4.6 Complexity Comparison — All Sorting Algorithms

| Algorithm | Worst | Average | Best | Space | Stable? |
|:----------|:------|:--------|:-----|:------|:--------|
| **Selection Sort** | Theta(n^2) | Theta(n^2) | Theta(n^2) | O(1) | No |
| **Bubble Sort** | Theta(n^2) | Theta(n^2) | Theta(n) | O(1) | Yes |
| **Insertion Sort** | Theta(n^2) | Theta(n^2) | **Theta(n)** | O(1) | Yes |
| **Merge Sort** | Theta(n log n) | Theta(n log n) | Theta(n log n) | **O(n)** | Yes |
| **Quick Sort** | **Theta(n^2)** | Theta(n log n) | Theta(n log n) | O(log n) | No |
| **Heap Sort** | Theta(n log n) | Theta(n log n) | Theta(n log n) | O(1) | No |
| **Counting Sort** | Theta(n + k) | Theta(n + k) | Theta(n + k) | O(k) | Yes |
| **Radix Sort** | Theta(nk) | Theta(nk) | Theta(nk) | O(n + k) | Yes |

> Lower bound for comparison-based sorting: **Omega(n log n)**
> Linear-time sorts bypass this by exploiting input structure rather than comparisons.

> **Exam Tip:** This table is a key summary frequently tested on exams. What to memorize:
> - Always O(n^2): Selection sort
> - Best-case O(n) among elementary sorts: Bubble (with optimization), Insertion
> - Always O(n log n): Merge, Heap
> - Worst-case O(n^2) among advanced sorts: Quick (but average is the fastest)
> - Requires O(n) extra space: Merge
> - In-place: Selection, Bubble, Insertion, Heap
> - Stable: Bubble, Insertion, Merge, Counting, Radix

---

<br>

## Summary

| Concept | Key Takeaway |
|:--------|:-------------|
| Data Structures | Lists, Stacks (LIFO), Queues (FIFO), Heaps (complete binary trees) — understand the core operations and applications of each |
| Sorting Algorithm Categories | Elementary O(n^2), Advanced O(n log n), Linear O(n) — three groups |
| Selection Sort | Find max each round and swap; always Theta(n^2) (best/average/worst identical) |
| Bubble Sort | Compare and swap adjacent pairs, bubble max to end; Theta(n^2), best Theta(n) with optimization |
| Insertion Sort | Insert into sorted prefix; best **Theta(n)** (optimal for nearly sorted data) |
| Recursive Structure of Elementary Sorts | All three follow $T(n) = T(n-1) + \Theta(n) = \Theta(n^2)$; the cause is the problem size decreasing by only 1 |
| Merge Sort | Divide and conquer; always Theta(n log n); O(n) extra space; stable |
| Quick Sort | Partition around pivot; average Theta(n log n), worst Theta(n^2); fastest in practice |
| Heap Sort | buildHeap O(n) + sort O(n log n); O(n log n) guaranteed even in worst case; in-place |
| Comparison-Based Lower Bound | Comparison-based sorting has a lower bound of **Omega(n log n)** (proven via decision tree model) |
| Radix Sort | Stable sort per digit; Theta(n) when k is constant |
| Counting Sort | Theta(n) when value range is O(n); uses no comparisons |
| Sorting Algorithm Comparison | See table below |

**Comprehensive Sorting Algorithm Comparison:**

| Algorithm | Worst | Average | Best | Space | Stable? | Note |
|:----------|:------|:--------|:-----|:------|:--------|:-----|
| Selection Sort | Theta(n^2) | Theta(n^2) | Theta(n^2) | O(1) | No | Always same complexity |
| Bubble Sort | Theta(n^2) | Theta(n^2) | Theta(n) | O(1) | Yes | Best Theta(n) with optimization |
| Insertion Sort | Theta(n^2) | Theta(n^2) | Theta(n) | O(1) | Yes | Optimal for nearly sorted data |
| Merge Sort | Theta(n log n) | Theta(n log n) | Theta(n log n) | O(n) | Yes | Stable and always guaranteed |
| Quick Sort | Theta(n^2) | Theta(n log n) | Theta(n log n) | O(log n) | No | Fastest in practice |
| Heap Sort | Theta(n log n) | Theta(n log n) | Theta(n log n) | O(1) | No | In-place, worst-case guaranteed |
| Counting Sort | Theta(n+k) | Theta(n+k) | Theta(n+k) | O(k) | Yes | Requires limited value range |
| Radix Sort | Theta(nk) | Theta(nk) | Theta(nk) | O(n+k) | Yes | Theta(n) when digit count k is constant |

---

<br>

## Appendix

- **Next week**: More advanced algorithm paradigms

**Contact:** *[Redacted]*

---
