# 5주차 실습 — 그리디 알고리즘

> **최종 수정일:** 2026-04-02

> **선수 지식**: 5주차 이론 — 그리디 알고리즘, 그리디 선택 속성, 최적 부분 구조. Python 3 설치. 정렬과 기본 동적 프로그래밍 개념에 대한 이해.
>
> **학습 목표**:
> 1. 그리디 알고리즘의 성공 및 실패 조건을 실험적으로 검증할 수 있다
> 2. 그리디 가치/무게 비율 전략을 사용하여 분할 가능 배낭 문제를 구현할 수 있다
> 3. 허프만 코딩 트리를 구축하고 압축 효율을 분석할 수 있다
> 4. 그리디 전략이 실제 스케줄링 문제에 어떻게 적용되는지 경험할 수 있다

---

## 목차

- [1. 개요](#1-개요)
- [2. Type A — 알고리즘 구현](#2-type-a--알고리즘-구현)
  - [2.1 A-1: 동전 거스름돈](#21-a-1-동전-거스름돈)
    - [2.1.1 문제](#211-문제)
    - [2.1.2 그리디 코드](#212-그리디-코드)
    - [2.1.3 DP 비교](#213-dp-비교)
    - [2.1.4 확장 테스트 케이스](#214-확장-테스트-케이스)
  - [2.2 A-2: 분할 가능 배낭 문제](#22-a-2-분할-가능-배낭-문제)
    - [2.2.1 문제](#221-문제)
    - [2.2.2 풀이](#222-풀이)
    - [2.2.3 확장 예제](#223-확장-예제)
    - [2.2.4 분할 가능 vs 0-1 배낭 문제](#224-분할-가능-vs-0-1-배낭-문제)
  - [2.3 A-3: 허프만 코딩](#23-a-3-허프만-코딩)
    - [2.3.1 문제](#231-문제)
    - [2.3.2 허프만 트리](#232-허프만-트리)
    - [2.3.3 핵심 코드](#233-핵심-코드)
    - [2.3.4 인코딩과 디코딩](#234-인코딩과-디코딩)
    - [2.3.5 압축 결과](#235-압축-결과)
- [3. Type B — 웹 코드 분석](#3-type-b--웹-코드-분석)
  - [3.1 B-1: 회의실 예약 시스템](#31-b-1-회의실-예약-시스템)
    - [3.1.1 문제](#311-문제)
    - [3.1.2 풀이](#312-풀이)
    - [3.1.3 그리디 코드](#313-그리디-코드)
    - [3.1.4 완전 탐색 비교](#314-완전-탐색-비교)
- [요약](#요약)
- [부록](#부록)

---

<br>

## 1. 개요

### 오늘의 목표

- 동전 거스름돈 문제를 통해 그리디 접근법이 **성공** 하는 경우와 **실패** 하는 경우를 관찰한다
- **분할 가능 배낭 문제** 를 구현하고 물건을 쪼갤 수 있을 때 그리디가 최적인 이유를 이해한다
- **허프만 코딩** 트리를 구축하고 압축 효율을 측정한다
- 회의실 스케줄링 문제에 **활동 선택** (종료 시각 기준 그리디)을 적용한다

### 실습 구성

| 섹션 | 주제 | 시간 |
|:-----|:-----|:-----|
| **A-1** | 동전 거스름돈 (그리디 성공/실패) | 10분 |
| **A-2** | 분할 가능 배낭 문제 | 10분 |
| **A-3** | 허프만 코딩 | 15분 |
| **B-1** | 회의실 예약 시스템 | 15분 |

### 실행 방법

스켈레톤 파일 (`TODO` 주석 포함)은 `examples/skeletons/`에, 참고 풀이는 `examples/solutions/`에 있다.

```bash
# 스켈레톤 실행 (TODO를 먼저 구현)
python examples/skeletons/a1_coin_change.py

# 참고 풀이 실행
python examples/solutions/a1_coin_change.py
```

외부 패키지가 필요 없다 (표준 라이브러리만 사용). B-1에만 Flask가 필요하다.

---

<br>

## 2. Type A — 알고리즘 구현

### 2.1 A-1: 동전 거스름돈

그리디 접근법이 최적 DP 해와 비교하여 언제 성공하고 언제 실패하는지 관찰한다.

#### 2.1.1 문제

**목표**: 그리디 접근법이 언제 성공하고 언제 실패하는지 관찰한다.

**사례 1: 그리디 성공**

```
동전: [500, 100, 50, 10]    금액: 1260

그리디 전략: 항상 가장 큰 동전을 먼저 선택
  500 -> 500 -> 100 -> 100 -> 50 -> 10
  = 6개 동전  (이것이 최적)
```

**사례 2: 그리디 실패**

```
동전: [1, 3, 4]    금액: 6

그리디: 가장 큰 것부터 선택
  4 -> 1 -> 1 = 3개 동전

최적 (DP):
  3 -> 3     = 2개 동전  <-- 더 적은 동전!
```

**왜 그리디가 실패하는가?** 동전들이 약수 관계에 있지 않아서 — 지역적으로 최선인 동전을 선택하면 전역적으로 더 나은 조합을 차단할 수 있다.

#### 2.1.2 그리디 코드

```python
def coin_change_greedy(amount, coins):
    """
    그리디 접근법으로 거스름돈을 계산한다.

    알고리즘: 가장 큰 동전을 먼저 최대한 많이 사용
    시간 복잡도: O(k * amount/min_coin) (k = 동전 종류 수)
    공간 복잡도: O(amount/min_coin) (결과 리스트)
    """
    # 동전을 내림차순으로 정렬 (그리디 선택의 핵심)
    coins_sorted = sorted(coins, reverse=True)
    result = []
    remaining = amount
    # 각 동전에 대해 가능한 한 많이 사용
    for coin in coins_sorted:
        while remaining >= coin:
            result.append(coin)
            remaining -= coin
    # 나머지가 0이면 성공, 아니면 실패
    return result if remaining == 0 else None
```

실행: `python examples/solutions/a1_coin_change.py`

#### 2.1.3 DP 비교

```python
def coin_change_dp(amount, coins):
    """
    DP로 최소 동전 수를 계산한다 (항상 최적해 보장).

    알고리즘: dp[i] = 금액 i를 만드는 최소 동전 수
    점화식: dp[i] = min(dp[i - c] + 1) (모든 동전 c에 대해)
    시간 복잡도: O(k * amount)
    공간 복잡도: O(amount)
    """
    # dp[i]: 금액 i를 만드는 최소 동전 수 (초기값: 무한대)
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # 기저 사례: 금액 0은 동전 0개 필요
    parent = [-1] * (amount + 1)  # 역추적용: 각 금액에서 마지막 사용된 동전
    # 모든 금액에 대해 모든 동전을 시도
    for i in range(1, amount + 1):
        for c in coins:
            # 동전 c를 사용할 수 있고 더 적은 동전이 되는 경우
            if c <= i and dp[i - c] + 1 < dp[i]:
                dp[i] = dp[i - c] + 1
                parent[i] = c  # 역추적을 위해 사용한 동전 기록
    # 금액을 만들 수 없는 경우
    if dp[amount] == float('inf'):
        return None
    # 역추적: parent 배열을 따라가며 사용된 동전 복원
    result = []
    cur = amount
    while cur > 0:
        result.append(parent[cur])
        cur -= parent[cur]
    return result
```

**핵심 요점:**

| 동전 집합 | 그리디 | DP | 동일? |
|:----------|:-------|:---|:------|
| [500, 100, 50, 10] | 최적 | 최적 | 예 |
| [1, 3, 4] | 3개 동전 | **2개 동전** | **아니오** |

그리디는 동전이 **약수 속성** (각 동전이 다음으로 큰 동전을 나누어 떨어뜨림)을 가질 때 작동한다.

#### 2.1.4 확장 테스트 케이스

`a1_coin_change_greedy.py` 파일은 여러 동전 집합에 대한 상세 비교를 제공한다:

**성공 사례** (그리디 = 최적):

| 레이블 | 동전 | 금액 | 그리디 | 최적 |
|:-------|:-----|:-----|:-------|:-----|
| 한국 표준 | [500, 100, 50, 10] | 770 | 최적 | 최적 |
| 미국 표준 | [25, 10, 5, 1] | 63 | 최적 | 최적 |

**실패 사례** (그리디 > 최적):

| 레이블 | 동전 | 금액 | 그리디 | 최적 |
|:-------|:-----|:-----|:-------|:-----|
| 실패 1 | [7, 5, 1] | 10 | 7+1+1+1 = **4개** | 5+5 = **2개** |
| 실패 2 | [6, 4, 1] | 8 | 6+1+1 = **3개** | 4+4 = **2개** |
| 실패 3 | [12, 9, 1] | 18 | 12+1x6 = **7개** | 9+9 = **2개** |

실행: `python examples/solutions/a1_coin_change_greedy.py`

**그리디가 최적인 경우:**
- 각 동전이 작은 동전의 배수일 때 (예: 500, 100, 50, 10)
- 이 경우 "그리디 선택 속성"이 성립한다

**그리디가 실패하는 경우:**
- 동전 사이에 약수 관계가 성립하지 않을 때
- 이 경우 DP를 사용해야 최적해를 찾을 수 있다
- 시간 복잡도: 그리디 O(k), DP O(k * amount) (k = 동전 종류 수)

---

<br>

### 2.2 A-2: 분할 가능 배낭 문제

#### 2.2.1 문제

**문제**: 무게와 가치가 주어진 물건들을 제한된 용량의 배낭에 넣어 총 가치를 최대화하라. 물건을 **쪼갤 수 있다**.

```
배낭 용량: 50kg

물건      무게     가치   가치/kg
-------------------------------
 A      10kg     60     6.0
 B      20kg    100     5.0
 C      30kg    120     4.0
```

**그리디 전략**: 무게 대비 가치 비율(내림차순)로 정렬한 후 그리디하게 채운다.

```
단계 1: A 전부 담기  (10kg, 가치 60)    남은 용량: 40kg
단계 2: B 전부 담기  (20kg, 가치 100)   남은 용량: 20kg
단계 3: C의 2/3 담기 (20kg, 가치 80)    남은 용량: 0kg
                                     총 가치: 240
```

#### 2.2.2 풀이

```python
def fractional_knapsack(capacity, items):
    """
    그리디 접근법으로 분할 가능 배낭 문제를 풀다.

    Args:
        capacity: 배낭의 최대 무게
        items: [(이름, 무게, 가치), ...] 리스트

    Returns:
        (최대 가치, 선택된 물건 리스트)
        선택된 물건: [(이름, 추가 무게, 추가 가치, 비율, 분할 여부), ...]
    """
    # 가치/무게 비율로 내림차순 정렬
    sorted_items = sorted(items, key=lambda x: x[2] / x[1], reverse=True)
    total_value = 0.0
    remaining_capacity = capacity
    selected = []

    for name, weight, value in sorted_items:
        if remaining_capacity <= 0:
            break

        ratio = value / weight

        if weight <= remaining_capacity:
            # 물건 전부 담기
            selected.append((name, weight, value, ratio, False))
            total_value += value
            remaining_capacity -= weight
        else:
            # 물건 일부만 담기
            fraction = remaining_capacity / weight
            partial_value = value * fraction
            selected.append((name, remaining_capacity, partial_value, ratio, True))
            total_value += partial_value
            remaining_capacity = 0

    return total_value, selected
```

실행: `python examples/solutions/a2_fractional_knapsack.py`

#### 2.2.3 확장 예제

솔루션 파일은 용량 40kg인 5개 물건 배낭도 시연한다:

```
배낭 용량: 40kg

 이름        무게       가치      비율
------------------------------------
Jewels      5.0kg     300    60.0/kg
Gold       10.0kg     600    60.0/kg
Silver     20.0kg     500    25.0/kg
Ceramics   15.0kg     200    13.3/kg
Copper     30.0kg     400    13.3/kg
```

그리디 선택 과정:
1. Jewels: 전부 담기 5.0 kg (가치 300, 남은 35.0kg)
2. Gold: 전부 담기 10.0 kg (가치 600, 남은 25.0kg)
3. Silver: 전부 담기 20.0 kg (가치 500, 남은 5.0kg)
4. Ceramics: 33.3% (5.0 kg) 담기 (가치 67, 남은 0.0kg) — **분할**

**최대 가치: 1467**

#### 2.2.4 분할 가능 vs 0-1 배낭 문제

솔루션에는 비교를 위한 0-1 배낭 완전 탐색도 포함되어 있다:

```python
def knapsack_01_bruteforce(capacity, items):
    """
    완전 탐색으로 0-1 배낭 문제를 해결한다.(비교용)
    시간 복잡도: O(2^n * n) - 모든 부분집합 검사
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
       분할 가능                0-1 배낭
     (쪼갤 수 있음)          (전부 아니면 포기)
+-----------------+     +-----------------+
| 그리디 성공!       |     | 그리디 실패        |
| O(n log n)      |     | DP 필요: O(nW)   |
+-----------------+     +-----------------+
           가치: 240                가치: 220

왜 차이가 나는가?
  분할 가능: "얼마나 담을까?" -> 연속적 선택
      0-1: "담을까 말까?"  -> 이산적 선택
```

**핵심 통찰**: 분할 가능 배낭은 항상 0-1 배낭 이상의 가치를 달성할 수 있다.

**분할 가능 배낭에서 그리디가 최적인 이유:**

- 단위 무게당 가치가 가장 높은 물건을 우선 선택하면 남은 용량에 대해서도 최적 선택이 유지된다
- 물건을 쪼갤 수 있으므로 문제는 "포함할까 말까"가 아니라 "얼마나 포함할까"이다
- **시간 복잡도**: O(n log n) — 정렬이 지배적

---

<br>

### 2.3 A-3: 허프만 코딩

#### 2.3.1 문제

**문제**: 문자 빈도가 주어졌을 때, 최적의 접두사 없는(prefix-free) 이진 코드를 구축하라.

```
텍스트: "abracadabra"

문자 빈도:
  'a': 5    'b': 2    'r': 2    'c': 1    'd': 1
```

**그리디 전략**: 가장 낮은 빈도의 두 노드를 반복적으로 병합한다.

```
단계 1: 'c'(1) + 'd'(1)을 병합 = [2]
단계 2: 'b'(2) + 'r'(2)를 병합 = [4]
단계 3: [2]   + [4]를 병합     = [6]
단계 4: 'a'(5) + [6]를 병합    = [11]
```

**핵심 속성**: 접두사 없는 코드 — 어떤 코드워드도 다른 코드워드의 접두사가 아니므로, 구분자 없이도 디코딩이 명확하다.

#### 2.3.2 허프만 트리

```
              [11]
             /    \
          (0)     (1)
          /         \
       'a'(5)       [6]
                   /    \
                 (0)    (1)
                /         \
             [2]          [4]
           /   \         /   \
         (0)   (1)     (0)   (1)
         /       \     /       \
      'c'(1)  'd'(1) 'b'(2)  'r'(2)
```

**결과 코드:**

| 문자 | 빈도 | 코드 | 비트 |
|:-----|:-----|:-----|:-----|
| a | 5 | `0` | 1 |
| b | 2 | `110` | 3 |
| r | 2 | `111` | 3 |
| c | 1 | `100` | 3 |
| d | 1 | `101` | 3 |

높은 빈도 = 짧은 코드, 낮은 빈도 = 긴 코드.

#### 2.3.3 핵심 코드

```python
import heapq
from collections import Counter

class HuffmanNode:
    # 허프만 트리의 노드
    def __init__(self, char=None, freq=0, left=None, right=None):
        self.char, self.freq = char, freq
        self.left, self.right = left, right
    def __lt__(self, other):
        return self.freq < other.freq
    def is_leaf(self):
        return self.left is None and self.right is None

def build_frequency_table(text):
    # 텍스트의 문자 빈도를 계산한다.
    return dict(Counter(text).most_common())

def build_huffman_tree(freq_table):
    # 빈도 테이블로 허프만 트리를 구축한다.
    # 그리디 선택: 각 단계에서 빈도가 가장 낮은 두 노드를 병합.
    heap = []
    for char, freq in freq_table.items():
        heapq.heappush(heap, HuffmanNode(char=char, freq=freq))

    # 고유 문자가 하나뿐인 경우 처리
    if len(heap) == 1:
        node = heapq.heappop(heap)
        return HuffmanNode(freq=node.freq, left=node)

    # 노드가 하나 남을 때까지 가장 작은 두 노드를 병합
    while len(heap) > 1:
        left = heapq.heappop(heap)       # 최소 빈도
        right = heapq.heappop(heap)      # 두 번째 최소
        merged = HuffmanNode(
            freq=left.freq + right.freq,
            left=left, right=right)
        heapq.heappush(heap, merged)

    return heapq.heappop(heap)

def generate_codes(root, prefix="", codes=None):
    # 허프만 트리를 순회하여 각 문자의 코드를 생성한다.
    # 왼쪽 간선 = '0', 오른쪽 간선 = '1'
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

실행: `python examples/solutions/a3_huffman.py`

#### 2.3.4 인코딩과 디코딩

솔루션에는 전체 인코딩과 디코딩도 구현되어 있다:

```python
def encode(text, codes):
    # 허프만 코드를 사용하여 텍스트를 인코딩한다.
    return "".join(codes[char] for char in text)

def decode(encoded_text, root):
    # 허프만 트리를 사용하여 인코딩된 비트 문자열을 디코딩한다.
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

**인코딩 예제:**

```
텍스트:   "abracadabra"
인코딩:   "01100111010001000110011101"  (23비트)
디코딩:   "abracadabra"                 (원본과 일치: PASS)
```

**접두사 코드 검증**: 솔루션은 어떤 코드도 다른 코드의 접두사가 아닌지 확인한다 — 이것은 구분자 없이도 명확한 디코딩을 보장한다.

#### 2.3.5 압축 결과

```
텍스트: "abracadabra" (11글자)

                  비트     비트/문자
----------------------------------------------
ASCII (8비트):      88       8.000
고정 길이 (3b):      33       3.000
허프만:              23       2.091
이론적 하한:          21       1.927
```

**솔루션의 추가 예제:**

| 텍스트 | 허프만 비트/문자 | 엔트로피 | ASCII 대비 압축률 |
|:-------|:----------------|:---------|:------------------|
| "abracadabra" | 2.091 | 1.927 | 73.9% |
| "the quick brown fox..." | 4.023 | 3.944 | 49.7% |
| "aaaaaaaabbbbccdd" | 1.625 | 1.750 | 79.7% |

**왜 허프만이 그리디인가?**

- 각 단계에서 **가장 빈도가 낮은 두 노드** 를 병합한다
- 이 지역적 최적 선택이 전역적으로 최적인 접두사 코드를 만든다
- 모든 접두사 없는 코드 중 최적임이 증명되어 있다

**시간 복잡도**: O(n log n) — n = 고유 문자 수, 각 힙 연산이 O(log n)이며, n-1번 수행된다.

---

<br>

## 3. Type B — 웹 코드 분석

### 3.1 B-1: 회의실 예약 시스템

#### 3.1.1 문제

먼저 의존성을 설치한다: `pip install flask`. 그 후 Flask 앱을 실행한다:

```bash
cd examples/solutions/b1_web_scheduler
python app.py
# 접속: http://localhost:5000
```

**문제**: 시작/종료 시각이 있는 회의 요청 목록이 주어졌을 때, 스케줄링할 수 있는 **겹치지 않는 최대 회의 수** 를 찾아라.

```
회의 요청:
  A: [1, 4)    B: [3, 5)    C: [0, 6)
  D: [5, 7)    E: [3, 9)    F: [5, 9)
  G: [6, 8)    H: [8, 11)   I: [8, 12)

타임라인:
  A: |===|
  B:   |==|
  C:|======|
  D:      |==|
  E:   |=======|
  F:      |====|
  G:       |==|
  H:          |===|
  I:          |====|
```

어떤 회의를 선택해야 수를 최대화할 수 있는가?

#### 3.1.2 풀이

**그리디 전략**: **종료 시각** 으로 정렬한 후, 겹치지 않는 활동을 그리디하게 선택한다.

```
종료 시각 기준 정렬:
  A: [1,4)  B: [3,5)  C: [0,6)  D: [5,7)  G: [6,8)
  E: [3,9)  F: [5,9)  H: [8,11)  I: [8,12)

선택 과정:
  A 선택 [1,4)    last_end = 4
  B 건너뜀 [3,5)    3 < 4, 겹침
  C 건너뜀 [0,6)    0 < 4, 겹침
  D 선택 [5,7)    5 >= 4, OK!  last_end = 7
  G 건너뜀 [6,8)    6 < 7, 겹침
  E 건너뜀 [3,9)    3 < 7, 겹침
  F 건너뜀 [5,9)    5 < 7, 겹침
  H 선택 [8,11)   8 >= 7, OK!  last_end = 11
  I 건너뜀 [8,12)   8 < 11, 겹침

결과: {A, D, H} = 3개 회의
```

#### 3.1.3 그리디 코드

```python
def greedy_schedule(meetings):
    """
    그리디를 사용하여 최대 수의 회의를 선택한다.

    활동 선택: 종료 시각 오름차순으로 정렬한 후,
    이전에 선택한 회의와 겹치지 않는 회의를 선택한다.

    시간 복잡도: O(n log n) -- 정렬이 지배적

    Args:
        meetings: [{"id": int, "name": str, "start": float, "end": float}, ...]

    Returns:
        선택된 회의 id의 리스트
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

**왜 종료 시각 기준 정렬이 작동하는가:**

- **가장 일찍 끝나는** 회의를 선택하면 이후 회의를 위한 여유가 가장 많이 남는다
- 이 그리디 선택 속성은 증명 가능하게 최적이다
- **시간 복잡도**: 정렬을 위한 O(n log n)

#### 3.1.4 완전 탐색 비교

웹 앱에서는 비교를 위한 완전 탐색 알고리즘도 제공한다 (N <= 20으로 제한):

```python
def bruteforce_schedule(meetings):
    """
    완전 탐색으로 최대 수의 회의를 선택한다.
    모든 부분집합을 검사하여 겹치지 않는 최대 회의 수를 찾는다.
    시간 복잡도: O(2^n * n) -- 모든 부분집합 검사
    """
    n = len(meetings)
    if n > 20:
        return None  # 시간 초과 방지

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

**웹 UI 기능:**

- 샘플 회의 데이터 로드 (8, 12, 15개 회의)
- 이름, 시작 시각, 종료 시각으로 사용자 정의 회의 추가
- 선택된 회의(초록)와 거부된 회의(빨강)를 보여주는 시각적 타임라인
- 그리디, 완전 탐색, 또는 두 알고리즘을 나란히 실행
- 그리디가 항상 최적 완전 탐색 결과와 일치하는지 확인

---

<br>

## 요약

### 오늘 배운 것

- **동전 거스름돈**: 그리디는 표준 화폐 단위에는 작동하지만 임의의 동전 집합에는 실패한다
- **분할 가능 배낭**: 물건을 쪼갤 수 있을 때 가치/무게 비율 기준 그리디가 최적이다
- **허프만 코딩**: 가장 낮은 빈도의 노드를 그리디하게 병합하면 최적의 접두사 코드를 만든다
- **활동 선택**: 종료 시각으로 정렬하고 그리디하게 선택하면 겹치지 않는 최대 집합을 얻는다

### 그리디는 언제 작동하는가?

```
그리디가 작동하는 조건:
  1. 그리디 선택 속성 - 지역적 최적 선택이 전역적 최적 해의 일부이다
  2. 최적 부분 구조 - 그리디 선택을 한 후, 남은 부분 문제도 최적으로 풀 수 있다
```


---

<br>

## 자가 점검 문제

1. 동전 [1, 3, 4]와 금액 6에 대해 그리디 동전 거스름돈 알고리즘이 왜 실패하는가? 그리디가 항상 작동하려면 동전 단위에 어떤 속성이 있어야 하는가?
2. 물건을 쪼갤 수 없는 경우(0-1 배낭), 그리디 가치/무게 비율 전략이 왜 실패하는가? 구체적인 예를 들어라.
3. 허프만 코딩 예제에서 문자당 평균 비트 수가 이론적 엔트로피 하한에 얼마나 가까운가? 이 차이는 무엇을 의미하는가?
4. 활동 선택에서 종료 시각이 아닌 시작 시각으로 정렬하면 어떻게 되는가? 그리디 알고리즘이 여전히 최적 해를 만들어내겠는가?
5. 동전 집합 {12, 9, 1}에서 금액 18을 만들 때, 그리디는 7개를, 최적은 2개를 사용한다. 왜 이 비율이 테스트 케이스 중 가장 나쁜지, 이 동전 집합이 그리디에 특히 불리한 이유를 설명하라.
6. 완전 탐색 배낭과 회의 스케줄러 모두 모든 부분집합을 검사한다. 왜 완전 탐색은 작은 N으로 제한되며, 그리디는 이를 어떻게 피하는가?
