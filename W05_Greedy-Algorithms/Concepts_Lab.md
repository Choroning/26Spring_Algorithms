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
    - [2.1.4 Extended Test Cases](#214-extended-test-cases)
  - [2.2 A-2: Fractional Knapsack](#22-a-2-fractional-knapsack)
    - [2.2.1 Problem](#221-problem)
    - [2.2.2 Solution](#222-solution)
    - [2.2.3 Extended Example](#223-extended-example)
    - [2.2.4 Fractional vs 0-1 Knapsack](#224-fractional-vs-0-1-knapsack)
  - [2.3 A-3: Huffman Coding](#23-a-3-huffman-coding)
    - [2.3.1 Problem](#231-problem)
    - [2.3.2 Huffman Tree](#232-huffman-tree)
    - [2.3.3 Core Code](#233-core-code)
    - [2.3.4 Encoding and Decoding](#234-encoding-and-decoding)
    - [2.3.5 Compression Results](#235-compression-results)
- [3. Type B — Web Code Analysis](#3-type-b--web-code-analysis)
  - [3.1 B-1: Meeting Room Reservation System](#31-b-1-meeting-room-reservation-system)
    - [3.1.1 Problem](#311-problem)
    - [3.1.2 Solution](#312-solution)
    - [3.1.3 Greedy Code](#313-greedy-code)
    - [3.1.4 Brute Force Comparison](#314-brute-force-comparison)
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

### How to Run

Skeleton files (with `TODO` comments) are in `examples/skeletons/`, and reference solutions are in `examples/solutions/`.

```bash
# Run skeleton (implement the TODOs first)
python examples/skeletons/a1_coin_change.py

# Run reference solution
python examples/solutions/a1_coin_change.py
```

No external packages are required (standard library only). Flask is needed only for B-1.

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

**Why does greedy fail?** The coins are not in a divisor relationship — picking the locally best coin can block a globally better combination.

#### 2.1.2 Greedy Code

```python
def coin_change_greedy(amount, coins):
    """Calculate change using the greedy approach.

    Algorithm: Use the largest coin as much as possible first
    Time complexity: O(k * amount/min_coin) (k = number of coin types)
    Space complexity: O(amount/min_coin) (result list)
    """
    # Sort coins in descending order (key to greedy selection)
    coins_sorted = sorted(coins, reverse=True)
    result = []
    remaining = amount
    # For each coin, use it as many times as possible
    for coin in coins_sorted:
        while remaining >= coin:
            result.append(coin)
            remaining -= coin
    # Success if remaining is 0, failure otherwise
    return result if remaining == 0 else None
```

Run: `python examples/solutions/a1_coin_change.py`

#### 2.1.3 DP Comparison

```python
def coin_change_dp(amount, coins):
    """Calculate minimum number of coins using DP (always guarantees optimal solution).

    Algorithm: dp[i] = minimum number of coins to make amount i
    Recurrence: dp[i] = min(dp[i - c] + 1) (for all coins c)
    Time complexity: O(k * amount)
    Space complexity: O(amount)
    """
    # dp[i]: minimum number of coins to make amount i (initial value: infinity)
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # Base case: amount 0 requires 0 coins
    parent = [-1] * (amount + 1)  # For backtracking: last coin used at each amount
    # Try all coins for every amount
    for i in range(1, amount + 1):
        for c in coins:
            # If coin c can be used and results in fewer coins
            if c <= i and dp[i - c] + 1 < dp[i]:
                dp[i] = dp[i - c] + 1
                parent[i] = c  # Record the coin used for backtracking
    # If the amount cannot be made
    if dp[amount] == float('inf'):
        return None
    # Backtrack: recover the coins used by following the parent array
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

#### 2.1.4 Extended Test Cases

The file `a1_coin_change_greedy.py` provides a detailed comparison across multiple coin sets:

**Success cases** (greedy = optimal):

| Label | Coins | Amount | Greedy | Optimal |
|:------|:------|:-------|:-------|:--------|
| Korean standard | [500, 100, 50, 10] | 770 | Optimal | Optimal |
| US standard | [25, 10, 5, 1] | 63 | Optimal | Optimal |

**Failure cases** (greedy > optimal):

| Label | Coins | Amount | Greedy | Optimal |
|:------|:------|:-------|:-------|:--------|
| Failure 1 | [7, 5, 1] | 10 | 7+1+1+1 = **4** coins | 5+5 = **2** coins |
| Failure 2 | [6, 4, 1] | 8 | 6+1+1 = **3** coins | 4+4 = **2** coins |
| Failure 3 | [12, 9, 1] | 18 | 12+1x6 = **7** coins | 9+9 = **2** coins |

Run: `python examples/solutions/a1_coin_change_greedy.py`

**When greedy is optimal:**
- When each coin is a multiple of smaller coins (e.g., 500, 100, 50, 10)
- In this case, the "greedy choice property" holds

**When greedy fails:**
- When the divisibility relationship between coins does not hold
- In this case, DP must be used to find the optimal solution
- Time complexity: Greedy O(k), DP O(k * amount) (k = number of coin types)

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
    """Solve the fractional knapsack problem using a greedy approach.

    Args:
        capacity: Maximum weight of the knapsack
        items: [(name, weight, value), ...] list

    Returns:
        (maximum value, list of selected items)
        Selected items: [(name, weight added, value added, ratio, was_split), ...]
    """
    # Sort by value/weight ratio in descending order
    sorted_items = sorted(items, key=lambda x: x[2] / x[1], reverse=True)
    total_value = 0.0
    remaining_capacity = capacity
    selected = []

    for name, weight, value in sorted_items:
        if remaining_capacity <= 0:
            break

        ratio = value / weight

        if weight <= remaining_capacity:
            # Can fit the entire item
            selected.append((name, weight, value, ratio, False))
            total_value += value
            remaining_capacity -= weight
        else:
            # Split the item
            fraction = remaining_capacity / weight
            partial_value = value * fraction
            selected.append((name, remaining_capacity, partial_value, ratio, True))
            total_value += partial_value
            remaining_capacity = 0

    return total_value, selected
```

Run: `python examples/solutions/a2_fractional_knapsack.py`

#### 2.2.3 Extended Example

The solution file also demonstrates a 5-item knapsack with capacity 40 kg:

```
Knapsack capacity: 40 kg

Name       Weight   Value    Ratio
------------------------------------
Jewels      5.0kg     300    60.0/kg
Gold       10.0kg     600    60.0/kg
Silver     20.0kg     500    25.0/kg
Ceramics   15.0kg     200    13.3/kg
Copper     30.0kg     400    13.3/kg
```

Greedy selection process:
1. Jewels: added full 5.0 kg (value 300, remaining 35.0 kg)
2. Gold: added full 10.0 kg (value 600, remaining 25.0 kg)
3. Silver: added full 20.0 kg (value 500, remaining 5.0 kg)
4. Ceramics: 33.3% (5.0 kg) added (value 67, remaining 0.0 kg) — **split**

**Maximum value: 1467**

#### 2.2.4 Fractional vs 0-1 Knapsack

The solution also includes a brute force 0-1 knapsack for comparison:

```python
def knapsack_01_bruteforce(capacity, items):
    """Solve the 0-1 knapsack problem using brute force (for comparison).
    Time complexity: O(2^n * n) -- checks all subsets
    """
    n = len(items)
    best_value = 0
    best_selection = []

    for mask in range(1 << n):
        total_weight = 0
        total_value = 0
        selection = []
        for i in range(n):
            if mask & (1 << i):
                name, weight, value = items[i]
                total_weight += weight
                total_value += value
                selection.append(i)
        if total_weight <= capacity and total_value > best_value:
            best_value = total_value
            best_selection = selection

    return best_value, best_selection
```

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

**Key insight**: Fractional knapsack can always achieve value >= 0-1 knapsack.

**Why greedy is optimal for fractional knapsack:**

- Prioritizing items with the highest value per unit weight maintains optimal selection for the remaining capacity
- Since items can be split, the question is not "include or not" but "how much to include"
- **Time complexity**: O(n log n) — dominated by sorting

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

**Key property**: Prefix-free code — no codeword is a prefix of another, so decoding is unambiguous without delimiters.

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
from collections import Counter

class HuffmanNode:
    """A node in the Huffman tree."""
    def __init__(self, char=None, freq=0, left=None, right=None):
        self.char, self.freq = char, freq
        self.left, self.right = left, right
    def __lt__(self, other):
        return self.freq < other.freq
    def is_leaf(self):
        return self.left is None and self.right is None

def build_frequency_table(text):
    """Calculate the character frequency of the text."""
    return dict(Counter(text).most_common())

def build_huffman_tree(freq_table):
    """Build a Huffman tree from the frequency table.
    Greedy choice: Merge the two nodes with the lowest frequency at each step.
    """
    heap = []
    for char, freq in freq_table.items():
        heapq.heappush(heap, HuffmanNode(char=char, freq=freq))

    # Handle case with only one unique character
    if len(heap) == 1:
        node = heapq.heappop(heap)
        return HuffmanNode(freq=node.freq, left=node)

    # Merge the two smallest nodes until only one remains
    while len(heap) > 1:
        left = heapq.heappop(heap)       # lowest freq
        right = heapq.heappop(heap)      # 2nd lowest
        merged = HuffmanNode(
            freq=left.freq + right.freq,
            left=left, right=right)
        heapq.heappush(heap, merged)

    return heapq.heappop(heap)

def generate_codes(root, prefix="", codes=None):
    """Traverse the Huffman tree to generate the code for each character.
    Left edge = '0', Right edge = '1'
    """
    if codes is None:
        codes = {}
    if root is None:
        return codes
    if root.is_leaf():
        codes[root.char] = prefix if prefix else "0"
        return codes
    generate_codes(root.left, prefix + "0", codes)
    generate_codes(root.right, prefix + "1", codes)
    return codes
```

Run: `python examples/solutions/a3_huffman.py`

#### 2.3.4 Encoding and Decoding

The solution also implements full encoding and decoding:

```python
def encode(text, codes):
    """Encode the text using Huffman codes."""
    return "".join(codes[char] for char in text)

def decode(encoded_text, root):
    """Decode an encoded bit string using the Huffman tree."""
    decoded = []
    current = root
    for bit in encoded_text:
        if bit == "0":
            current = current.left
        else:
            current = current.right
        if current.is_leaf():
            decoded.append(current.char)
            current = root
    return "".join(decoded)
```

**Encoding example:**

```
Text:    "abracadabra"
Encoded: "01100111010001000110011101"  (23 bits)
Decoded: "abracadabra"                (matches original: PASS)
```

**Prefix code verification**: The solution verifies that no code is a prefix of another — this ensures unambiguous decoding without delimiters.

#### 2.3.5 Compression Results

```
Text: "abracadabra" (11 chars)

                           Bits     Bits/char
----------------------------------------------
ASCII (8-bit):              88       8.000
Fixed-length (3b):          33       3.000
Huffman:                    23       2.091
Theoretical lower bound:    21       1.927
```

**Additional examples from the solution:**

| Text | Huffman bits/char | Entropy | Compression vs ASCII |
|:-----|:-----------------|:--------|:---------------------|
| "abracadabra" | 2.091 | 1.927 | 73.9% |
| "the quick brown fox..." | 4.023 | 3.944 | 49.7% |
| "aaaaaaaabbbbccdd" | 1.625 | 1.750 | 79.7% |

**Why is Huffman greedy?**

- At each step, merge the **two least frequent** nodes
- This locally optimal choice leads to a globally optimal prefix code
- Proven optimal among all prefix-free codes

**Time complexity**: O(n log n) — n = number of distinct characters, each heap operation is O(log n), performed n-1 times.

---

<br>

## 3. Type B — Web Code Analysis

### 3.1 B-1: Meeting Room Reservation System

#### 3.1.1 Problem

Install dependencies first: `pip install flask`. Then run the Flask app:

```bash
cd examples/solutions/b1_web_scheduler
python app.py
# Access: http://localhost:5000
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

#### 3.1.3 Greedy Code

```python
def greedy_schedule(meetings):
    """Select the maximum number of meetings using greedy.

    Activity Selection: Sort by end time in ascending order,
    then select meetings that do not overlap with the previously selected one.

    Time complexity: O(n log n) -- sorting dominates

    Args:
        meetings: [{"id": int, "name": str, "start": float, "end": float}, ...]

    Returns:
        List of selected meeting ids
    """
    sorted_meetings = sorted(meetings, key=lambda m: m["end"])
    selected = []
    last_end = -1

    for meeting in sorted_meetings:
        if meeting["start"] >= last_end:
            selected.append(meeting["id"])
            last_end = meeting["end"]

    return selected
```

**Why sorting by end time works:**

- Choosing the meeting that **finishes earliest** leaves the most room for future meetings
- This greedy choice property is provably optimal
- **Time complexity**: O(n log n) for sorting

#### 3.1.4 Brute Force Comparison

The web app also provides a brute force algorithm for comparison (limited to N <= 20):

```python
def bruteforce_schedule(meetings):
    """Select the maximum number of meetings using brute force.
    Checks all subsets to find the maximum number of non-overlapping meetings.
    Time complexity: O(2^n * n) -- checks all subsets
    """
    n = len(meetings)
    if n > 20:
        return None  # Prevent timeout

    def is_compatible(subset):
        sorted_sub = sorted(subset, key=lambda m: m["start"])
        for i in range(1, len(sorted_sub)):
            if sorted_sub[i]["start"] < sorted_sub[i - 1]["end"]:
                return False
        return True

    best_selection = []
    for size in range(n, 0, -1):
        for combo in combinations(meetings, size):
            if is_compatible(combo):
                return [m["id"] for m in combo]

    return best_selection
```

**Web UI features:**

- Load sample meeting data (8, 12, or 15 meetings)
- Add custom meetings with name, start time, and end time
- Visual timeline showing selected (green) and rejected (red) meetings
- Run Greedy, Brute Force, or both algorithms side-by-side
- Verify that greedy always matches the optimal brute force result

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

**Week 6**: Dynamic Programming — when greedy is not enough!

---

<br>

## Appendix

> This document is based on the slide material `W05_LAB_Greedy-Algorithms.md` and the example code in `examples/`.

---

<br>

## Self-Check Questions

1. Why does the greedy coin change algorithm fail for coins [1, 3, 4] with amount 6? What property must coin denominations have for greedy to always work?
2. If items cannot be split (0-1 knapsack), why does the greedy value/weight ratio strategy fail? Give a concrete example.
3. In the Huffman coding example, how close is the average bits per character to the theoretical entropy lower bound? What does this gap tell us?
4. In activity selection, what would happen if you sorted by start time instead of end time? Would the greedy algorithm still produce an optimal solution?
5. For coin set {12, 9, 1} with amount 18, greedy uses 7 coins while optimal uses 2. Explain why this is the worst ratio among the test cases, and what makes this coin set particularly bad for greedy.
6. The brute force knapsack and meeting scheduler both examine all subsets. Why is brute force limited to small N, and how does greedy avoid this?
