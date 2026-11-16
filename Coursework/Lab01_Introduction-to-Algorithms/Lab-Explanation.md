# Lab 1 Explanation — Binary Search and Coin Change Example Code

[Repository Guide](../../README.md) | [English](Lab-Explanation.md) | [한국어](Lab-Explanation.ko.md)

> **Last Updated:** 2026-11-16

> **Learning Objectives:**
> 1. Trace, together with the program output, how the iterative and recursive binary searches narrow the search range
> 2. Explain why the two binary search implementations have the same time complexity but different space complexity
> 3. Explain the order in which the greedy coin change code picks coins and the condition under which it reports failure
> 4. Show with examples that the greedy result is optimal for some coin systems and not for others

---

## Table of Contents

- [1. Files and How to Run Them](#1-files-and-how-to-run-them)
- [2. Binary Search](#2-binary-search)
  - [2.1 File Header and the Iterative Implementation](#21-file-header-and-the-iterative-implementation)
  - [2.2 The Recursive Implementation](#22-the-recursive-implementation)
  - [2.3 Main Block and Search Trace](#23-main-block-and-search-trace)
- [3. Greedy Coin Change](#3-greedy-coin-change)
  - [3.1 File Header and coin_change_greedy](#31-file-header-and-coin_change_greedy)
  - [3.2 Main Block and Results](#32-main-block-and-results)
- [Summary](#summary)
- [Self-Check Questions](#self-check-questions)

---

<br>

## 1. Files and How to Run Them

The two files in this folder are Python example code distributed with the week 1 lab materials. They are not an assignment the course posed but demonstration code that turns two classic problems of the [Week 1 Lecture](../../Lecture-Notes/Week01_Introduction-to-Algorithms/Concepts_Lecture.md) into code, so this document hides no answers and reads the whole code from top to bottom, following it through to the program output. All line numbers refer to each file.

| File | Lines | Contents | Related section |
|:-----|:-----|:-----|:-----|
| [`Binary-Search.py`](Binary-Search.py) | 87 | Iterative and recursive implementations of binary search for a value in a sorted array, with a step-by-step trace of the search range | [Week 1 Lecture, Section 2.2](../../Lecture-Notes/Week01_Introduction-to-Algorithms/Concepts_Lecture.md#22-finding-a-specific-number-binary-search) |
| [`Coin-Change.py`](Coin-Change.py) | 57 | Greedy coin change that picks the largest coin first, comparing a coin system where greedy is optimal with one where it is not | [Week 1 Lecture, Section 2.3](../../Lecture-Notes/Week01_Introduction-to-Algorithms/Concepts_Lecture.md#23-coin-change-problem) |

*Table 1. The Lab 1 example code and related sections*

Both files use only built-in Python 3 features with no external libraries, so they run directly as follows.

```bash
cd Coursework/Lab01_Introduction-to-Algorithms
python3 Binary-Search.py
python3 Coin-Change.py
```

---

<br>

## 2. Binary Search

**Binary search** compares the target with the middle element of a sorted array and discards, in one step, the half in which the target cannot lie. The concept and figures are in Section 2.2 of the Week 1 Lecture, and this section reads `Binary-Search.py`, which implements that algorithm in two ways.

### 2.1 File Header and the Iterative Implementation

```python
# === Binary Search ===
# An algorithm to efficiently find a specific value in a sorted array
# Compares two implementations: iterative and recursive approaches.
#
# Time complexity: O(log n) — the search range is halved at each step
# Space complexity: Iterative O(1), Recursive O(log n) (call stack)
"""Binary Search - Iterative and Recursive implementations."""


def binary_search_iterative(arr, target):
    """
    Iterative binary search: returns the index of target in sorted array arr.
    Returns -1 if not found.

    Algorithm:
      1. Set the left and right boundaries of the search range
      2. Compare the middle value (mid) with target
      3. If target is larger, narrow to the right half; if smaller, narrow to the left half
      4. If the range becomes invalid (left > right), the search fails

    Time complexity: O(log n)
    Space complexity: O(1) — no additional memory used
    """
    left, right = 0, len(arr) - 1  # Initialize search range: entire array
    while left <= right:  # Repeat while the search range is valid
        mid = (left + right) // 2  # Calculate middle index (integer division)
        if arr[mid] == target:  # If middle value matches target, search succeeds
            return mid
        elif arr[mid] < target:  # If middle value is less than target, search right half
            left = mid + 1
        else:  # If middle value is greater than target, search left half
            right = mid - 1
    return -1  # Search range exhausted -> target is not in the array
```

Lines 1-7 are the header comment and module docstring, which state the purpose of the file and the complexity of the two implementations. `binary_search_iterative` returns the index of `target` in the ascending sorted list `arr`, or -1 if it is absent.

- **Line 24:** Sets the search range to the whole array, from index `0` to `len(arr) - 1`. The range is the closed interval `[left, right]`, which includes both ends.
- **Line 25:** `left <= right` is the condition that at least one element remains in the range. The equality is needed so that the case with a single element left (`left == right`) is also checked.
- **Line 26:** Computes the middle index with integer division `//`. With an even number of elements, it picks the left one of the two middle elements.
- **Lines 27-32:** If the middle value equals the target, the index is returned. If the middle value is smaller than the target, the target can only be in the right half because the array is sorted, so `left` moves to `mid + 1`; if it is larger, `right` moves to `mid - 1`. Either way, the already checked `mid` leaves the range.
- **Line 33:** Leaving the loop means the range is empty, so -1 is returned to signal that the target is not in the array.

Each iteration leaves at most half of the remaining elements, so with n elements the loop runs at most ⌊log₂ n⌋ + 1 times and the time complexity is O(log n). Only the three variables `left`, `right`, and `mid` are used, so the extra space is O(1).

> **Note:** In languages with fixed-size integers such as C and Java, `left + right` can exceed the maximum integer, so the middle index is computed as `left + (right - left) / 2`. Python integers have no size limit, so the expression on line 26 does not overflow.

### 2.2 The Recursive Implementation

```python
def binary_search_recursive(arr, target, left, right):
    """
    Recursive binary search: returns the index of target in sorted array arr[left..right].
    Returns -1 if not found.

    Algorithm:
      - Base case: if left > right, the search fails
      - Recursive step: compare middle value and recursively call on the appropriate half

    Time complexity: O(log n)
    Space complexity: O(log n) — recursive call stack depth
    """
    if left > right:  # Base case: search range is empty, search fails
        return -1
    mid = (left + right) // 2  # Calculate middle index
    if arr[mid] == target:  # If middle value is target, search succeeds
        return mid
    elif arr[mid] < target:  # Target is in the right half
        return binary_search_recursive(arr, target, mid + 1, right)
    else:  # Target is in the left half
        return binary_search_recursive(arr, target, left, mid - 1)
```

`binary_search_recursive` takes the search range `arr[left..right]` as parameters and, instead of a loop, calls itself with a narrowed range. The first call passes `left = 0` and `right = len(arr) - 1`.

- **Lines 48-49:** The base case. If the range is empty (`left > right`), there is nowhere left to look, so -1 is returned. This is the negation of the loop condition on line 25 of the iterative version.
- **Lines 50-52:** Computes the middle index and returns it if the middle value equals the target.
- **Lines 53-56:** The recursive step. It calls itself again with only the half that can contain the target and returns that call's result unchanged.

The number of comparisons equals that of the iterative version, so the time complexity is O(log n). However, each call pushes a stack frame, and Python does not optimize tail calls, so the calls on lines 54 and 56 also stay on the stack. The extra space is therefore O(log n), the depth of the calls. Python's default recursion limit is 1,000, but even with 2³⁰ elements (about one billion) the depth is about 31, so binary search never reaches the limit.

| Implementation | How the range shrinks | Termination | Time complexity | Extra space |
|:-----|:-----|:-----|:-----|:-----|
| Iterative (`binary_search_iterative`) | Updates the variables `left` and `right` | `while left <= right` becomes false | O(log n) | O(1) |
| Recursive (`binary_search_recursive`) | Passes the narrowed range as arguments to a new call | Reaches the base case `left > right` | O(log n) | O(log n) (call stack) |

*Table 2. Comparison of the two binary search implementations*

### 2.3 Main Block and Search Trace

```python
if __name__ == "__main__":
    data = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]  # Sorted test array
    target = 7  # Value to search for

    # Run iterative binary search
    idx = binary_search_iterative(data, target)
    print(f"Iterative: {target} found at index {idx}")

    # Run recursive binary search
    idx = binary_search_recursive(data, target, 0, len(data) - 1)
    print(f"Recursive: {target} found at index {idx}")

    # Step-by-step trace: visualize how binary search narrows the range
    print(f"\n--- Binary Search Trace for target={target} ---")
    left, right = 0, len(data) - 1
    step = 1
    while left <= right:
        mid = (left + right) // 2
        print(f"Step {step}: range=[{left},{right}], mid={mid}, arr[mid]={data[mid]}")
        if data[mid] == target:
            print(f"  -> Found at index {mid}!")
            break
        elif data[mid] < target:
            print(f"  -> {data[mid]} < {target}, search right half")
            left = mid + 1  # Narrow range to right half
        else:
            print(f"  -> {data[mid]} > {target}, search left half")
            right = mid - 1  # Narrow range to left half
        step += 1
```

`if __name__ == "__main__":` on line 59 runs the code below only when the file is executed directly, so the demonstration does not run when another file imports this module. Lines 60-61 set a sorted array of the ten odd numbers from 1 to 19 and the target 7. Lines 64-69 call both implementations on the same input to show that they agree. Lines 72-87 repeat the loop of the iterative version with print statements, printing at each step the range, the middle index, the middle value, and the half to be discarded next.

```text
Iterative: 7 found at index 3
Recursive: 7 found at index 3

--- Binary Search Trace for target=7 ---
Step 1: range=[0,9], mid=4, arr[mid]=9
  -> 9 > 7, search left half
Step 2: range=[0,3], mid=1, arr[mid]=3
  -> 3 < 7, search right half
Step 3: range=[2,3], mid=2, arr[mid]=5
  -> 5 < 7, search right half
Step 4: range=[3,3], mid=3, arr[mid]=7
  -> Found at index 3!
```

The range size shrinks as 10, 4, 2, 1, and the fourth comparison finds 7 at index 3. With 10 elements at most ⌊log₂ 10⌋ + 1 = 4 comparisons are needed, so this run used the worst-case number. A sequential search that compares from the front also needs 4 comparisons to find 7, but the gap widens as the array grows. With 1,000,000 elements, sequential search makes up to 1,000,000 comparisons and binary search at most 20.

---

<br>

## 3. Greedy Coin Change

The **coin change problem** asks for the fewest coins that make a given amount. `Coin-Change.py` solves it with the **greedy** method that always picks the largest coin not exceeding the remaining amount, and shows that this method is optimal for some coin systems and not for others. The concept is in Section 2.3 of the Week 1 Lecture; the conditions under which greedy is optimal are covered in the [Week 5 Lecture](../../Lecture-Notes/Week05_Greedy-Algorithms/Concepts_Lecture.md), and the dynamic programming solution that always finds the optimum in the [Week 6 Lecture](../../Lecture-Notes/Week06_Dynamic-Programming/Concepts_Lecture.md).

### 3.1 File Header and coin_change_greedy

```python
# === Coin Change Problem — Greedy Approach ===
# A greedy algorithm that always uses the largest coin first when making change
#
# Note: The greedy algorithm does NOT always guarantee an optimal solution!
# - Optimal for standard currency denominations (e.g., 500, 100, 50, 10)
# - May not be optimal for non-standard denominations (e.g., 1, 3, 4)
#   -> Use dynamic programming (DP) when an optimal solution is required.
#
# Time complexity: O(amount / smallest_coin + k log k), k = number of coin types
# Space complexity: O(amount / smallest_coin) — size of the result list
"""Coin Change - Greedy approach demonstration."""


def coin_change_greedy(amount, coins):
    """
    Greedy coin change algorithm: always selects the largest available coin first.
    Returns the list of coins used.

    Algorithm:
      1. Sort coins in descending order (largest coin first)
      2. For each coin, use it as many times as possible
      3. If remaining amount reaches 0, success; otherwise, failure (return None)

    Note: The greedy approach does NOT always guarantee the optimal solution (minimum number of coins)!
    """
    coins_sorted = sorted(coins, reverse=True)  # Sort coins from largest to smallest
    result = []  # List to store coins used
    remaining = amount  # Remaining amount to make change for

    for coin in coins_sorted:  # Try each coin starting from the largest
        while remaining >= coin:  # Repeat while the current coin can be used
            result.append(coin)  # Record coin usage
            remaining -= coin  # Subtract from remaining amount

    if remaining > 0:  # Cannot make exact change
        return None  # Cannot make exact change
    return result
```

The header on lines 1-11 states that greedy does not always guarantee an optimal solution and gives the complexity. `coin_change_greedy` takes an amount `amount` and a list of denominations `coins`, and returns a list of the coins used, in the order they were picked.

- **Line 26:** Makes a new list of the coins sorted from largest to smallest, so that the largest coin is tried first no matter in which order the caller passes the coins. The original `coins` is unchanged.
- **Lines 27-28:** Prepare the list of used coins and the amount still to be returned.
- **Lines 30-33:** From the largest coin down, while the remaining amount is at least that coin, add one coin and subtract it from the remaining amount. A coin is used as many times as possible before moving to the next one, and a coin once passed is never revisited. This is the greedy choice: a choice that looks best at the moment and is never undone.
- **Lines 35-37:** If an amount is still left after trying the smallest coin, exact change was impossible and `None` is returned; if the remaining amount is 0, the list of coins is returned.

Sorting costs O(k log k), where k is the number of coin types. The condition on line 31 is true once for every coin added and false once per coin type, so lines 30-33 take time proportional to the number of picked coins plus k. At most `amount / smallest_coin` coins are picked, which gives the header's time complexity O(amount / smallest_coin + k log k) and space complexity O(amount / smallest_coin).

> **Note:** `coin_change` in Section 2.3 of the Week 1 Lecture assumes that the coins are already given in descending order, computes how many of each coin to use at once with `amount // coin`, and returns `(coin, count)` pairs. The function in this file sorts the coins itself and subtracts the same coin one at a time, putting every used coin into the list. Both functions pick the same coins.

> **Caution:** The `None` on line 35 means that greedy failed to find an answer, not that no way of making change exists. With coins 4 and 3 and the amount 6, greedy picks 4 first, cannot make the remaining 2, and returns `None`, yet 3 + 3 makes change.

### 3.2 Main Block and Results

```python
if __name__ == "__main__":
    # Case 1: Greedy is optimal (standard currency denominations)
    # 500, 100, 50, 10 — larger denominations are multiples of smaller ones -> greedy is optimal
    coins1 = [500, 100, 50, 10]
    amount1 = 1260
    result1 = coin_change_greedy(amount1, coins1)
    print(f"Amount: {amount1}, Coins: {coins1}")
    print(f"Greedy result: {result1} ({len(result1)} coins)\n")

    # Case 2: Greedy fails (non-standard coins)
    # 6 = 4+1+1 (greedy: 3 coins) vs 6 = 3+3 (optimal: 2 coins)
    # Greedy selects the largest coin (4) first, missing the optimal solution
    coins2 = [1, 3, 4]
    amount2 = 6
    result2 = coin_change_greedy(amount2, coins2)
    print(f"Amount: {amount2}, Coins: {coins2}")
    print(f"Greedy result: {result2} ({len(result2)} coins)")
    print(f"Optimal: [3, 3] (2 coins) — Greedy is NOT optimal here!")
```

The main block compares two cases. Lines 41-47 make change for 1,260 with the won-like coins 500, 100, 50, and 10, and lines 49-57 make change for 6 with the coins 1, 3, and 4.

```text
Amount: 1260, Coins: [500, 100, 50, 10]
Greedy result: [500, 500, 100, 100, 50, 10] (6 coins)

Amount: 6, Coins: [1, 3, 4]
Greedy result: [4, 1, 1] (3 coins)
Optimal: [3, 3] (2 coins) — Greedy is NOT optimal here!
```

| Coin system | Amount | Greedy picks | Greedy coin count | Minimum coin count |
|:-----|:-----|:-----|:-----|:-----|
| 500, 100, 50, 10 | 1,260 | 500, 500, 100, 100, 50, 10 | 6 | 6 |
| 1, 3, 4 | 6 | 4, 1, 1 | 3 | 2 (3, 3) |

*Table 3. Greedy results for the two coin systems*

The first case uses 500 twice, then 100 twice for the remaining 260, then 50 and 10 once each for the remaining 60, making change with 6 coins, which is the minimum. In the second case, picking the largest coin 4 first leaves 2, which can only be filled with two 1s, giving 3 coins, whereas using 3 twice without 4 needs only 2. The first choice of 4 reduced the remaining amount the most at that moment but was a loss overall.

> **Key Point:** Greedy only makes the locally optimal choice at each step, so whether those choices add up to a global optimum must be shown separately for each problem. Greedy is optimal for the won system but not for the 1, 3, 4 system. The conditions under which greedy is optimal (the greedy choice property and optimal substructure) are covered in the Week 5 Lecture, and the dynamic programming solution that finds the minimum number of coins for any coin system in the Week 6 Lecture.

> **Note:** The comment on line 42 gives, as the reason greedy is optimal for the won system, the property that each denomination is a multiple of the smaller denominations. This property is a sufficient condition for greedy to be optimal but not a necessary one. With coins 1, 2, and 5, greedy always picks the minimum number of coins even though 5 is not a multiple of 2. Conversely, making change for 30 with coins 1, 10, and 25, where 25 is not a multiple of 10, greedy picks 25 and five 1s for 6 coins while the optimum is three 10s.

---

<br>

## Summary

| Concept | Key Summary |
|:-----|:---------|
| Binary search | Compares the target with the middle element of a sorted array and discards the half where the target cannot be, making at most ⌊log₂ n⌋ + 1 comparisons for n elements. |
| Iterative implementation | Updates `left` and `right` and loops while `left <= right`, so the time complexity is O(log n) and the extra space is O(1). |
| Recursive implementation | Calls itself with the narrowed range as arguments and returns -1 when the range is empty, using O(log n) extra space for the call stack. |
| Greedy coin change | Sorts the coins in descending order, uses each coin as many times as possible, and returns `None` if an amount remains. |
| Optimality of greedy | It is optimal for the won system 500, 100, 50, 10, but making 6 with the 1, 3, 4 system it picks 3 coins, more than the optimal 2, so optimality must be shown for each coin system. |

---

<br>

## Self-Check Questions

1. **Trace:** When `binary_search_iterative` searches for 19 in the array `[1, 3, 5, 7, 9, 11, 13, 15, 17, 19]`, write `left`, `right`, and `mid` at each step and the number of comparisons.

   <details>
   <summary>Answer</summary>

   Step 1 has the range [0, 9] and `mid = 4`; the value 9 < 19, so `left = 5`. Step 2 has the range [5, 9] and `mid = 7`; the value 15 < 19, so `left = 8`. Step 3 has the range [8, 9] and `mid = 8`; the value 17 < 19, so `left = 9`. Step 4 has the range [9, 9] and `mid = 9`; the value 19 matches, so index 9 is returned. There are 4 comparisons, equal to the maximum ⌊log₂ 10⌋ + 1 = 4 for 10 elements.

   </details>

2. **Space complexity:** Why do the two binary search implementations have the same time complexity but different extra space?

   <details>
   <summary>Answer</summary>

   Both implementations halve the range at each step, so they make the same number of comparisons and the time complexity is O(log n). The iterative version only reuses the variables `left`, `right`, and `mid`, so its extra space is O(1). The recursive version pushes a stack frame for each new call as the range shrinks, and Python does not optimize tail calls, so it uses O(log n) space, the depth of the calls.

   </details>

3. **Greedy results:** What do `coin_change_greedy(6, [4, 3])` and `coin_change_greedy(6, [1, 3, 4])` return? What do the two results show about greedy?

   <details>
   <summary>Answer</summary>

   The first call picks 4 and then cannot make the remaining 2 with either 4 or 3, so it returns `None`. Since 3 + 3 makes change, greedy can fail to find an answer even when one exists. The second call returns `[4, 1, 1]`, using 3 coins, while the optimum is `[3, 3]` with 2 coins, so even when greedy finds an answer it may not be optimal. Both happen because the first choice of the largest coin 4 is never undone.

   </details>
