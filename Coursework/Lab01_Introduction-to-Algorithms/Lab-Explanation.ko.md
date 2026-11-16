# 실습 1 해설 — 이진 탐색과 동전 거스름돈 예제 코드

[레포지토리 안내](../../README.ko.md) | [English](Lab-Explanation.md) | [한국어](Lab-Explanation.ko.md)

> **최종 수정일:** 2026-11-16

> **학습 목표:**
> 1. 반복과 재귀로 구현한 이진 탐색이 탐색 범위를 줄여 가는 과정을 실행 출력과 함께 추적할 수 있다
> 2. 두 이진 탐색 구현의 시간 복잡도는 같고 공간 복잡도는 다른 이유를 설명할 수 있다
> 3. 그리디 동전 거스름돈 코드가 동전을 고르는 순서와 실패를 판정하는 조건을 설명할 수 있다
> 4. 동전 체계에 따라 그리디의 결과가 최적이 되기도 하고 되지 않기도 함을 예로 보일 수 있다

---

## 목차

- [1. 파일 구성과 실행 방법](#1-파일-구성과-실행-방법)
- [2. 이진 탐색](#2-이진-탐색)
  - [2.1 파일 머리말과 반복 구현](#21-파일-머리말과-반복-구현)
  - [2.2 재귀 구현](#22-재귀-구현)
  - [2.3 실행부와 탐색 추적](#23-실행부와-탐색-추적)
- [3. 그리디 동전 거스름돈](#3-그리디-동전-거스름돈)
  - [3.1 파일 머리말과 coin_change_greedy](#31-파일-머리말과-coin_change_greedy)
  - [3.2 실행부와 결과](#32-실행부와-결과)
- [요약](#요약)
- [점검 문제](#점검-문제)

---

<br>

## 1. 파일 구성과 실행 방법

이 폴더의 두 파일은 1주차 실습 자료와 함께 배포된 Python 예제 코드이다. 과목이 문제를 낸 과제가 아니라 [1주차 이론](../../Lecture-Notes/Week01_Introduction-to-Algorithms/Concepts_Lecture.ko.md)의 두 고전 문제를 코드로 옮긴 시연 코드이므로, 이 문서는 정답을 숨기지 않고 코드 전체를 처음부터 끝까지 읽으며 실행 결과까지 따라간다. 줄 번호는 모두 각 파일 기준이다.

| 파일 | 줄 수 | 내용 | 관련 절 |
|:-----|:-----|:-----|:-----|
| [`Binary-Search.py`](Binary-Search.py) | 87 | 정렬된 배열에서 값을 찾는 이진 탐색의 반복 구현과 재귀 구현, 탐색 범위의 단계별 추적 출력 | [1주차 이론 2.2절](../../Lecture-Notes/Week01_Introduction-to-Algorithms/Concepts_Lecture.ko.md#22-특정-숫자-찾기-이진-탐색) |
| [`Coin-Change.py`](Coin-Change.py) | 57 | 가장 큰 동전부터 고르는 그리디 동전 거스름돈과, 그리디가 최적이 되는 동전 체계와 되지 않는 동전 체계의 비교 | [1주차 이론 2.3절](../../Lecture-Notes/Week01_Introduction-to-Algorithms/Concepts_Lecture.ko.md#23-동전-거스름돈-문제) |

*표 1. 실습 1의 예제 코드와 관련 절*

두 파일은 외부 라이브러리 없이 Python 3의 기본 기능만 쓰므로 다음과 같이 바로 실행할 수 있다.

```bash
cd Coursework/Lab01_Introduction-to-Algorithms
python3 Binary-Search.py
python3 Coin-Change.py
```

---

<br>

## 2. 이진 탐색

**이진 탐색**(binary search)은 정렬된 배열의 가운데 원소와 목표를 비교하여, 목표가 있을 수 없는 절반을 한 번에 버리는 탐색이다. 개념과 그림은 1주차 이론 2.2절에 있고, 이 절은 그 알고리즘을 두 방식으로 구현한 `Binary-Search.py`를 읽는다.

### 2.1 파일 머리말과 반복 구현

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

1\~7번 줄은 파일의 목적과 두 구현의 복잡도를 밝히는 머리말 주석과 모듈 docstring이다. `binary_search_iterative`는 오름차순으로 정렬된 리스트 `arr`에서 `target`의 인덱스를 돌려주고, 없으면 -1을 돌려준다.

- **24번 줄:** 탐색 범위를 배열 전체인 인덱스 `0`부터 `len(arr) - 1`까지로 잡는다. 범위는 양 끝을 모두 포함하는 닫힌 구간 `[left, right]`이다.
- **25번 줄:** `left <= right`는 범위에 원소가 하나 이상 남아 있다는 조건이다. 등호가 있어야 원소가 하나만 남은 경우(`left == right`)도 검사한다.
- **26번 줄:** 정수 나눗셈 `//`로 가운데 인덱스를 구한다. 원소가 짝수 개이면 가운데 두 원소 중 왼쪽을 고른다.
- **27\~32번 줄:** 가운데 값이 목표와 같으면 그 인덱스를 반환한다. 가운데 값이 목표보다 작으면 배열이 정렬되어 있으므로 목표는 오른쪽 절반에만 있을 수 있어 `left`를 `mid + 1`로 옮기고, 크면 `right`를 `mid - 1`로 옮긴다. 어느 쪽이든 이미 검사한 `mid`는 범위에서 뺀다.
- **33번 줄:** 반복문을 빠져나왔다면 범위가 비었다는 뜻이므로 목표가 배열에 없다는 표시로 -1을 반환한다.

반복할 때마다 남은 원소의 수가 절반 이하로 줄어들므로, 원소가 n개이면 반복은 최대 ⌊log₂ n⌋ + 1번 일어나고 시간 복잡도는 O(log n)이다. 쓰는 변수는 `left`, `right`, `mid` 세 개뿐이므로 추가 공간은 O(1)이다.

> **참고:** C나 Java처럼 정수의 크기가 고정된 언어에서는 `left + right`가 정수의 최댓값을 넘을 수 있어 가운데 인덱스를 `left + (right - left) / 2`로 구한다. Python의 정수는 크기 제한이 없으므로 26번 줄의 식으로도 넘침이 생기지 않는다.

### 2.2 재귀 구현

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

`binary_search_recursive`는 탐색 범위 `arr[left..right]`를 매개변수로 받아, 반복문 대신 범위를 줄인 자기 자신을 호출한다. 처음 호출할 때는 `left = 0`, `right = len(arr) - 1`을 넘긴다.

- **48\~49번 줄:** 기저 사례(base case)이다. 범위가 비었으면(`left > right`) 더 찾을 곳이 없으므로 -1을 반환한다. 반복 구현의 25번 줄 조건을 뒤집은 것과 같다.
- **50\~52번 줄:** 가운데 인덱스를 구하고, 목표와 같으면 그 인덱스를 반환한다.
- **53\~56번 줄:** 재귀 단계이다. 목표가 있을 수 있는 절반만 범위로 넘겨 다시 호출하고, 그 호출의 결과를 그대로 반환한다.

비교 횟수는 반복 구현과 같으므로 시간 복잡도는 O(log n)이다. 다만 호출마다 스택 프레임이 하나씩 쌓이고, Python은 꼬리 호출을 최적화하지 않으므로 54번 줄과 56번 줄의 호출도 스택에 남는다. 따라서 호출 깊이만큼인 O(log n)의 추가 공간을 쓴다. Python의 기본 재귀 한도는 1,000이지만 원소가 2³⁰개(약 10억 개)여도 깊이는 31 정도이므로 이진 탐색에서는 한도에 걸리지 않는다.

| 구현 | 범위를 줄이는 방법 | 종료 조건 | 시간 복잡도 | 추가 공간 |
|:-----|:-----|:-----|:-----|:-----|
| 반복 (`binary_search_iterative`) | `left`, `right` 변수를 갱신한다 | `while left <= right`가 거짓이 된다 | O(log n) | O(1) |
| 재귀 (`binary_search_recursive`) | 줄인 범위를 인자로 넘겨 다시 호출한다 | `left > right`인 기저 사례에 닿는다 | O(log n) | O(log n) (호출 스택) |

*표 2. 이진 탐색의 두 구현 비교*

### 2.3 실행부와 탐색 추적

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

59번 줄의 `if __name__ == "__main__":`은 파일을 직접 실행할 때만 아래 코드가 돌게 하여, 다른 파일에서 이 모듈을 가져다 쓸 때는 시연 코드가 실행되지 않게 한다. 60\~61번 줄은 1부터 19까지의 홀수 10개로 된 정렬된 배열과 목표 7을 정한다. 64\~69번 줄은 두 구현을 같은 입력으로 호출하여 결과가 같음을 보인다. 72\~87번 줄은 반복 구현과 같은 반복문에 출력문을 넣어, 단계마다 범위, 가운데 인덱스, 가운데 값, 다음에 버릴 절반을 출력한다.

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

범위의 크기는 10, 4, 2, 1로 줄어들고, 네 번째 비교에서 인덱스 3의 7을 찾는다. 원소가 10개이면 비교는 최대 ⌊log₂ 10⌋ + 1 = 4번이므로, 이 실행은 최악의 경우와 같은 횟수를 썼다. 앞에서부터 하나씩 비교하는 순차 탐색도 7을 찾는 데 4번이 걸리지만, 배열이 커질수록 차이가 벌어진다. 원소가 1,000,000개이면 순차 탐색은 최대 1,000,000번, 이진 탐색은 최대 20번 비교한다.

---

<br>

## 3. 그리디 동전 거스름돈

**동전 거스름돈 문제**(coin change problem)는 주어진 금액을 가장 적은 수의 동전으로 만드는 문제이다. `Coin-Change.py`는 매번 남은 금액을 넘지 않는 가장 큰 동전을 고르는 **그리디**(greedy) 방법으로 이 문제를 풀고, 그 방법이 동전 체계에 따라 최적이 되기도 하고 되지 않기도 함을 보인다. 개념은 1주차 이론 2.3절에 있고, 그리디가 최적이 되는 조건은 [5주차 이론](../../Lecture-Notes/Week05_Greedy-Algorithms/Concepts_Lecture.ko.md)에서, 언제나 최적해를 구하는 동적 프로그래밍 풀이는 [6주차 이론](../../Lecture-Notes/Week06_Dynamic-Programming/Concepts_Lecture.ko.md)에서 다룬다.

### 3.1 파일 머리말과 coin_change_greedy

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

1\~11번 줄의 머리말은 그리디가 최적해를 언제나 보장하지는 않는다는 점과 복잡도를 밝힌다. `coin_change_greedy`는 금액 `amount`와 동전의 액면가 목록 `coins`를 받아, 사용한 동전을 고른 순서대로 담은 리스트를 돌려준다.

- **26번 줄:** 동전을 큰 것부터 작은 것 순으로 정렬한 새 리스트를 만든다. 호출하는 쪽이 동전을 어떤 순서로 넘기든 가장 큰 동전부터 시도하게 하려는 것이다. 원래의 `coins`는 바뀌지 않는다.
- **27\~28번 줄:** 사용한 동전을 담을 리스트와 아직 거슬러 줄 금액을 준비한다.
- **30\~33번 줄:** 큰 동전부터 차례로, 남은 금액이 그 동전 이상인 동안 동전을 하나씩 더하고 남은 금액에서 뺀다. 한 동전을 쓸 수 있을 만큼 모두 쓴 다음에야 다음 동전으로 넘어가며, 한 번 지나간 동전은 다시 보지 않는다. 이것이 그 순간에 가장 좋아 보이는 선택을 되돌리지 않는 그리디 선택이다.
- **35\~37번 줄:** 가장 작은 동전까지 시도한 뒤에도 금액이 남았으면 정확히 거슬러 줄 수 없었다는 뜻으로 `None`을 반환하고, 남은 금액이 0이면 동전 목록을 반환한다.

정렬에 O(k log k)가 든다(k는 동전의 종류 수). 31번 줄의 조건은 동전을 하나 더할 때마다 한 번 참이 되고 동전마다 한 번 거짓이 되므로, 30\~33번 줄은 고른 동전의 수와 k에 비례하는 시간을 쓴다. 고른 동전은 최대 `amount / smallest_coin`개이므로 머리말의 시간 복잡도 O(amount / smallest_coin + k log k)와 공간 복잡도 O(amount / smallest_coin)가 나온다.

> **참고:** 1주차 이론 2.3절의 `coin_change`는 동전이 이미 내림차순으로 주어진다고 가정하고, 한 동전을 몇 개 쓸지 `amount // coin`으로 한 번에 구해 `(동전, 개수)` 쌍을 돌려준다. 이 파일의 함수는 동전을 직접 정렬하고, 같은 동전을 한 번에 하나씩 빼는 방식으로 사용한 동전을 하나하나 리스트에 담는다. 고르는 동전은 두 함수가 같다.

> **주의:** 35번 줄의 `None`은 그리디가 답을 찾지 못했다는 뜻이지, 거슬러 줄 방법이 없다는 뜻이 아니다. 동전이 4와 3이고 금액이 6이면 그리디는 4를 먼저 고른 뒤 남은 2를 만들지 못해 `None`을 반환하지만, 3 + 3으로 거슬러 줄 수 있다.

### 3.2 실행부와 결과

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

실행부는 두 경우를 비교한다. 41\~47번 줄은 원화와 같은 동전 500, 100, 50, 10으로 1,260을 거슬러 주고, 49\~57번 줄은 동전 1, 3, 4로 6을 거슬러 준다.

```text
Amount: 1260, Coins: [500, 100, 50, 10]
Greedy result: [500, 500, 100, 100, 50, 10] (6 coins)

Amount: 6, Coins: [1, 3, 4]
Greedy result: [4, 1, 1] (3 coins)
Optimal: [3, 3] (2 coins) — Greedy is NOT optimal here!
```

| 동전 체계 | 금액 | 그리디의 선택 | 그리디의 동전 수 | 최소 동전 수 |
|:-----|:-----|:-----|:-----|:-----|
| 500, 100, 50, 10 | 1,260 | 500, 500, 100, 100, 50, 10 | 6 | 6 |
| 1, 3, 4 | 6 | 4, 1, 1 | 3 | 2 (3, 3) |

*표 3. 두 동전 체계에서 그리디의 결과*

첫 번째 경우는 500을 두 번 쓰고 남은 260에서 100을 두 번, 남은 60에서 50과 10을 한 번씩 써서 동전 6개로 거슬러 주며, 이것이 최소이다. 두 번째 경우는 가장 큰 4를 먼저 고르면 남은 2를 1 두 개로 채울 수밖에 없어 동전 3개가 되지만, 4를 쓰지 않고 3을 두 번 쓰면 2개로 충분하다. 처음에 4를 고른 선택이 그 순간에는 남은 금액을 가장 많이 줄였지만 전체로는 손해였던 것이다.

> **핵심:** 그리디는 매 단계에서 지역적으로 최적인 선택을 할 뿐이므로, 그 선택들이 모여 전역 최적해가 되는지는 문제마다 따로 보여야 한다. 원화 체계에서는 그리디가 최적이지만 1, 3, 4 체계에서는 그렇지 않다. 그리디가 최적이 되는 조건(그리디 선택 성질과 최적 부분 구조)은 5주차 이론에서, 어떤 동전 체계에서도 최소 동전 수를 구하는 동적 프로그래밍 풀이는 6주차 이론에서 다룬다.

> **참고:** 42번 줄의 주석은 원화 체계에서 그리디가 최적인 이유로 각 액면가가 더 작은 액면가의 배수라는 성질을 든다. 이 성질은 그리디가 최적이 되는 충분조건이지만 필요조건은 아니다. 동전 1, 2, 5에서는 5가 2의 배수가 아니지만 그리디가 언제나 최소 개수를 고른다. 반대로 동전 1, 10, 25로 30을 거슬러 주면 25가 10의 배수가 아니고, 그리디는 25와 1 다섯 개로 동전 6개를 고르지만 최적은 10 세 개이다.

---

<br>

## 요약

| 개념 | 핵심 요약 |
|:-----|:---------|
| 이진 탐색 | 정렬된 배열의 가운데 원소와 목표를 비교하여 목표가 있을 수 없는 절반을 버리며, 원소가 n개이면 최대 ⌊log₂ n⌋ + 1번 비교한다. |
| 반복 구현 | `left`, `right`를 갱신하며 `left <= right`인 동안 반복하므로 시간 복잡도는 O(log n), 추가 공간은 O(1)이다. |
| 재귀 구현 | 줄인 범위를 인자로 넘겨 다시 호출하고 범위가 비면 -1을 반환하며, 호출 스택 때문에 추가 공간이 O(log n)이다. |
| 그리디 동전 거스름돈 | 동전을 내림차순으로 정렬한 뒤 각 동전을 쓸 수 있을 만큼 모두 쓰고, 금액이 남으면 `None`을 반환한다. |
| 그리디의 최적성 | 원화 체계 500, 100, 50, 10에서는 최적이지만 1, 3, 4 체계로 6을 만들면 3개를 골라 최적인 2개보다 많으므로, 최적성은 동전 체계마다 따로 보여야 한다. |

---

<br>

## 점검 문제

1. **추적:** 배열 `[1, 3, 5, 7, 9, 11, 13, 15, 17, 19]`에서 `binary_search_iterative`로 19를 찾을 때 각 단계의 `left`, `right`, `mid`와 비교 횟수를 쓰라.

   <details>
   <summary>정답</summary>

   1단계는 범위 [0, 9]에서 `mid = 4`, 값 9 < 19이므로 `left = 5`가 된다. 2단계는 범위 [5, 9]에서 `mid = 7`, 값 15 < 19이므로 `left = 8`이 된다. 3단계는 범위 [8, 9]에서 `mid = 8`, 값 17 < 19이므로 `left = 9`가 된다. 4단계는 범위 [9, 9]에서 `mid = 9`, 값 19로 같으므로 인덱스 9를 반환한다. 비교는 4번이며, 원소가 10개일 때의 최대 횟수 ⌊log₂ 10⌋ + 1 = 4와 같다.

   </details>

2. **공간 복잡도:** 두 이진 탐색 구현의 시간 복잡도는 같은데 추가 공간이 다른 이유는 무엇인가?

   <details>
   <summary>정답</summary>

   두 구현 모두 단계마다 범위를 절반으로 줄이므로 비교 횟수가 같고 시간 복잡도는 O(log n)이다. 반복 구현은 `left`, `right`, `mid` 변수만 다시 쓰므로 추가 공간이 O(1)이다. 재귀 구현은 범위를 줄일 때마다 새 호출의 스택 프레임이 쌓이고 Python은 꼬리 호출을 최적화하지 않으므로, 호출 깊이만큼인 O(log n)의 공간을 쓴다.

   </details>

3. **그리디의 결과:** `coin_change_greedy(6, [4, 3])`과 `coin_change_greedy(6, [1, 3, 4])`는 각각 무엇을 반환하는가? 두 결과가 그리디에 관해 보여 주는 점은 무엇인가?

   <details>
   <summary>정답</summary>

   첫 번째 호출은 4를 고른 뒤 남은 2를 4로도 3으로도 만들 수 없으므로 `None`을 반환한다. 3 + 3으로 거슬러 줄 수 있으므로, 그리디는 답이 있는데도 찾지 못할 수 있다. 두 번째 호출은 `[4, 1, 1]`을 반환하여 동전 3개를 쓰지만 최적은 `[3, 3]`의 2개이므로, 그리디가 답을 찾더라도 최적이 아닐 수 있다. 두 경우 모두 처음에 가장 큰 4를 고른 선택을 되돌리지 않기 때문에 생긴다.

   </details>
