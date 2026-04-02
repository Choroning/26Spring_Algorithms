# Week 5 Lab — Greedy Algorithms

> **Last Modified:** 2026-04-02

> **Prerequisites**: Week 5 Lecture — greedy algorithms, greedy choice property, optimal substructure. Python 3 installed. Understanding of sorting and basic dynamic programming concepts.
>
> **Learning Objectives**:
> 1. Experimentally verify the success and failure conditions of greedy algorithms
> 2. Implement fractional knapsack using a greedy value/weight ratio strategy
> 3. Build a Huffman coding tree and analyze compression efficiency
> 4. Experience how greedy strategies are applied to real scheduling problems

---

## Table of Contents

- [1. Overview](#1-overview)
- [2. Type A — Algorithm Implementation](#2-type-a--algorithm-implementation)
  - [2.1 A-1: Coin Change](#21-a-1-coin-change)
    - [2.1.1 Problem](#211-problem)
    - [2.1.2 Greedy Code](#212-greedy-code)
    - [2.1.3 DP Comparison](#213-dp-comparison)
  - [2.2 A-2: Fractional Knapsack](#22-a-2-fractional-knapsack)
    - [2.2.1 Problem](#221-problem)
    - [2.2.2 Solution](#222-solution)
    - [2.2.3 Fractional vs 0-1 Knapsack](#223-fractional-vs-0-1-knapsack)
  - [2.3 A-3: Huffman Coding](#23-a-3-huffman-coding)
    - [2.3.1 Problem](#231-problem)
    - [2.3.2 Huffman Tree](#232-huffman-tree)
    - [2.3.3 Core Code](#233-core-code)
    - [2.3.4 Compression Results](#234-compression-results)
- [3. Type B — Web Code Analysis](#3-type-b--web-code-analysis)
  - [3.1 B-1: Meeting Room Reservation System](#31-b-1-meeting-room-reservation-system)
    - [3.1.1 Problem](#311-problem)
    - [3.1.2 Solution](#312-solution)
    - [3.1.3 Code](#313-code)
- [Summary](#summary)
- [Appendix](#appendix)

---

<br>

## 1. Overview

### Today's Goals

- Observe when the greedy approach **works** and when it **fails** through the coin change problem
- Implement **Fractional Knapsack** and understand why greedy is optimal when items can be split
- Build a **Huffman coding** tree and measure compression efficiency
- Apply **Activity Selection** (greedy by end time) to a meeting room scheduling problem

### Lab Structure

| Section | Topic | Time |
|:--------|:------|:-----|
| **A-1** | Coin Change (greedy success/failure) | 10 min |
| **A-2** | Fractional Knapsack | 10 min |
| **A-3** | Huffman Coding | 15 min |
| **B-1** | Meeting Room Reservation System | 15 min |

---

<br>

## 2. Type A — Algorithm Implementation

### 2.1 A-1: Coin Change

Observe when the greedy approach works and when it fails by comparing it with an optimal DP solution.

#### 2.1.1 Problem

**Goal**: Observe when the greedy approach works and when it fails.

**Case 1: Greedy succeeds**

```
Coins: [500, 100, 50, 10]    Amount: 1260

Greedy strategy: always pick the largest coin possible
  500 -> 500 -> 100 -> 100 -> 50 -> 10
  = 6 coins  (this IS optimal)
```

**Case 2: Greedy fails**

```
Coins: [1, 3, 4]    Amount: 6

Greedy: pick largest first
  4 -> 1 -> 1 = 3 coins

Optimal (DP):
  3 -> 3     = 2 coins  <-- fewer coins!
```

**Why does greedy fail?** The coins are not in a divisor relationship -- picking the locally best coin can block a globally better combination.

#### 2.1.2 Greedy Code

```python
def coin_change_greedy(amount, coins):
    coins_sorted = sorted(coins, reverse=True)
    result = []
    remaining = amount
    for coin in coins_sorted:
        while remaining >= coin:
            result.append(coin)
            remaining -= coin
    return result if remaining == 0 else None
```

Run: `python examples/solutions/a1_coin_change.py`

#### 2.1.3 DP Comparison

```python
def coin_change_dp(amount, coins):
    """DP solution -- always finds optimal answer."""
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    parent = [-1] * (amount + 1)
    for i in range(1, amount + 1):
        for c in coins:
            if c <= i and dp[i - c] + 1 < dp[i]:
                dp[i] = dp[i - c] + 1
                parent[i] = c
    # Backtrack to find coins used
    result = []
    cur = amount
    while cur > 0:
        result.append(parent[cur])
        cur -= parent[cur]
    return result
```

**Key takeaway:**

| Coin set | Greedy | DP | Same? |
|:---------|:-------|:---|:------|
| [500, 100, 50, 10] | Optimal | Optimal | Yes |
| [1, 3, 4] | 3 coins | **2 coins** | **No** |

Greedy works when coins have the **divisor property** (each coin divides the next larger one).

---

<br>

### 2.2 A-2: Fractional Knapsack

#### 2.2.1 Problem

**Problem**: Given items with weights and values, maximize total value in a knapsack of limited capacity. Items **can be split**.

```
Knapsack capacity: 50 kg

Item      Weight    Value    Value/kg
--------------------------------------
A         10 kg     60       6.0
B         20 kg     100      5.0
C         30 kg     120      4.0
```

**Greedy strategy**: Sort by value-per-weight ratio (descending), then fill greedily.

```
Step 1: Take all of A  (10 kg, value 60)   remaining: 40 kg
Step 2: Take all of B  (20 kg, value 100)  remaining: 20 kg
Step 3: Take 2/3 of C  (20 kg, value 80)   remaining: 0 kg
                                   Total value: 240
```

#### 2.2.2 Solution

```python
def fractional_knapsack(capacity, items):
    # Sort by value/weight ratio (descending)
    sorted_items = sorted(items, key=lambda x: x[2] / x[1], reverse=True)
    total_value = 0.0
    remaining = capacity

    for name, weight, value in sorted_items:
        if remaining <= 0:
            break
        if weight <= remaining:
            # Take the whole item
            total_value += value
            remaining -= weight
        else:
            # Take a fraction
            fraction = remaining / weight
            total_value += value * fraction
            remaining = 0

    return total_value
```

Run: `python examples/solutions/a2_fractional_knapsack.py`

#### 2.2.3 Fractional vs 0-1 Knapsack

```
                 Fractional              0-1 Knapsack
                 (can split)             (all or nothing)
              +-----------------+     +-----------------+
              | Greedy works!   |     | Greedy FAILS    |
              | O(n log n)      |     | Need DP: O(nW)  |
              +-----------------+     +-----------------+
                  value: 240              value: 220

Why the difference?
  Fractional: "How much to take?" -> continuous choice
  0-1:        "Take or skip?"     -> discrete choice
```

**Why greedy is optimal for fractional knapsack:**

- Picking the highest ratio first is always at least as good as any alternative
- If you can split items, there is no "wasted capacity" dilemma
- **Time complexity**: O(n log n) -- dominated by sorting

---

<br>

### 2.3 A-3: Huffman Coding

#### 2.3.1 Problem

**Problem**: Given character frequencies, build an optimal prefix-free binary code.

```
Text: "abracadabra"

Character frequencies:
  'a': 5    'b': 2    'r': 2    'c': 1    'd': 1
```

**Greedy strategy**: Repeatedly merge the two lowest-frequency nodes.

```
Step 1: Merge 'c'(1) + 'd'(1) = [2]
Step 2: Merge 'b'(2) + 'r'(2) = [4]
Step 3: Merge [2]   + [4]     = [6]
Step 4: Merge 'a'(5) + [6]    = [11]
```

**Key property**: Prefix-free code -- no codeword is a prefix of another, so decoding is unambiguous without delimiters.

#### 2.3.2 Huffman Tree

```
              [11]
             /    \
          (0)      (1)
          /          \
       'a'(5)       [6]
                   /    \
                (0)      (1)
                /          \
             [2]           [4]
            /   \         /   \
         (0)   (1)     (0)   (1)
         /       \     /       \
      'c'(1)  'd'(1) 'b'(2)  'r'(2)
```

**Resulting codes:**

| Char | Freq | Code | Bits |
|:-----|:-----|:-----|:-----|
| a | 5 | `0` | 1 |
| b | 2 | `110` | 3 |
| r | 2 | `111` | 3 |
| c | 1 | `100` | 3 |
| d | 1 | `101` | 3 |

High frequency = short code, low frequency = long code.

#### 2.3.3 Core Code

```python
import heapq

class HuffmanNode:
    def __init__(self, char=None, freq=0, left=None, right=None):
        self.char, self.freq = char, freq
        self.left, self.right = left, right
    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(freq_table):
    heap = [HuffmanNode(char=c, freq=f) for c, f in freq_table.items()]
    heapq.heapify(heap)
    while len(heap) > 1:
        left = heapq.heappop(heap)      # lowest freq
        right = heapq.heappop(heap)     # 2nd lowest
        merged = HuffmanNode(
            freq=left.freq + right.freq,
            left=left, right=right)
        heapq.heappush(heap, merged)
    return heapq.heappop(heap)

def generate_codes(root, prefix="", codes=None):
    if codes is None: codes = {}
    if root.char is not None:           # leaf node
        codes[root.char] = prefix or "0"
        return codes
    generate_codes(root.left, prefix + "0", codes)
    generate_codes(root.right, prefix + "1", codes)
    return codes
```

Run: `python examples/solutions/a3_huffman.py`

#### 2.3.4 Compression Results

```
Text: "abracadabra" (11 chars)

                    Bits     Bits/char
-------------------------------------
ASCII (8-bit):      88       8.000
Fixed-length (3b):  33       3.000
Huffman:            23       2.091
Entropy (lower bd): 21.2     1.927
```

**Why is Huffman greedy?**

- At each step, merge the **two least frequent** nodes
- This locally optimal choice leads to a globally optimal prefix code
- Proven optimal among all prefix-free codes

**Time complexity**: O(n log n) -- n = number of distinct characters, each heap operation is O(log n), performed n-1 times.

---

<br>

## 3. Type B — Web Code Analysis

### 3.1 B-1: Meeting Room Reservation System

#### 3.1.1 Problem

Run the Flask app:

```bash
cd examples/solutions/b1_web_scheduler
python app.py
```

**Problem**: Given a list of meeting requests with start/end times, find the **maximum number of non-overlapping meetings** that can be scheduled.

```
Meeting requests:
  A: [1, 4)    B: [3, 5)    C: [0, 6)
  D: [5, 7)    E: [3, 9)    F: [5, 9)
  G: [6, 8)    H: [8, 11)   I: [8, 12)

Timeline:
  A: |===|
  B:   |==|
  C: |======|
  D:     |==|
  E:   |======|
  F:     |====|
  G:      |==|
  H:        |===|
  I:        |====|
```

Which meetings should we select to maximize the count?

#### 3.1.2 Solution

**Greedy strategy**: Sort by **end time**, then greedily pick non-overlapping activities.

```
Sorted by end time:
  A: [1,4)  B: [3,5)  C: [0,6)  D: [5,7)  G: [6,8)
  E: [3,9)  F: [5,9)  H: [8,11)  I: [8,12)

Selection process:
  Pick A [1,4)    last_end = 4
  Skip B [3,5)    3 < 4, overlaps
  Skip C [0,6)    0 < 4, overlaps
  Pick D [5,7)    5 >= 4, OK!  last_end = 7
  Skip G [6,8)    6 < 7, overlaps
  Skip E [3,9)    3 < 7, overlaps
  Skip F [5,9)    5 < 7, overlaps
  Pick H [8,11)   8 >= 7, OK!  last_end = 11
  Skip I [8,12)   8 < 11, overlaps

Result: {A, D, H} = 3 meetings
```

#### 3.1.3 Code

```python
def activity_selection(meetings):
    """Select maximum non-overlapping meetings.

    Args: meetings = [(start, end), ...]
    Returns: list of selected meeting indices
    """
    # Sort by end time
    indexed = sorted(enumerate(meetings), key=lambda x: x[1][1])

    selected = []
    last_end = -1

    for idx, (start, end) in indexed:
        if start >= last_end:
            selected.append(idx)
            last_end = end

    return selected
```

**Why sorting by end time works:**

- Choosing the meeting that **finishes earliest** leaves the most room for future meetings
- This greedy choice property is provably optimal
- **Time complexity**: O(n log n) for sorting

---

<br>

## Summary

### What We Learned Today

- **Coin Change**: Greedy works for standard denominations but fails for arbitrary coin sets
- **Fractional Knapsack**: Greedy by value/weight ratio is optimal when items can be split
- **Huffman Coding**: Greedy merging of lowest-frequency nodes produces optimal prefix codes
- **Activity Selection**: Sorting by end time and greedily picking gives maximum non-overlapping set

### When Does Greedy Work?

```
Greedy works when:
  1. Greedy Choice Property -- a locally optimal choice
     is part of a globally optimal solution
  2. Optimal Substructure -- after making a greedy choice,
     the remaining subproblem is also optimally solvable
```

### Homework 4

See `../3_assignment/README.md` for assignment details.

### Next Week

**Week 6**: Dynamic Programming -- when greedy is not enough!

---

<br>

## Appendix

> This document is based on the slide material `W05_LAB_Greedy-Algorithms.md`.

---

<br>

## Self-Check Questions

1. Why does the greedy coin change algorithm fail for coins [1, 3, 4] with amount 6? What property must coin denominations have for greedy to always work?
2. If items cannot be split (0-1 knapsack), why does the greedy value/weight ratio strategy fail? Give a concrete example.
3. In the Huffman coding example, how close is the average bits per character to the theoretical entropy lower bound? What does this gap tell us?
4. In activity selection, what would happen if you sorted by start time instead of end time? Would the greedy algorithm still produce an optimal solution?
