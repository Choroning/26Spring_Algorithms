# W04 실습 — 고급 분할 정복

> **최종 수정일:** 2026-03-26

---

## 목차

- [1. 개요](#1-개요)
- [2. Type A — 알고리즘 구현](#2-type-a--알고리즘-구현)
  - [2.1 A-1: 병합 정렬 추적](#21-a-1-병합-정렬-추적)
    - [2.1.1 문제](#211-문제)
    - [2.1.2 코드](#212-코드)
  - [2.2 A-2: k번째로 작은 원소 찾기](#22-a-2-k번째로-작은-원소-찾기)
    - [2.2.1 문제](#221-문제)
    - [2.2.2 랜덤 선택의 동작 원리](#222-랜덤-선택의-동작-원리)
    - [2.2.3 풀이](#223-풀이)
    - [2.2.4 성능 비교](#224-성능-비교)
  - [2.3 A-3: 최근접 점 쌍](#23-a-3-최근접-점-쌍)
    - [2.3.1 문제](#231-문제)
    - [2.3.2 분할 정복 전략](#232-분할-정복-전략)
    - [2.3.3 풀이 (핵심 부분)](#233-풀이-핵심-부분)
    - [2.3.4 성능 비교](#234-성능-비교)
- [3. Type B — 웹 코드 분석](#3-type-b--웹-코드-분석)
  - [3.1 B-1: 자동완성 API](#31-b-1-자동완성-api)
    - [3.1.1 설정](#311-설정)
    - [3.1.2 실험](#312-실험)
- [요약](#요약)
- [부록](#부록)

---

<br>

## 1. 개요

### 오늘의 목표

- 병합 정렬의 재귀 호출 트리를 **추적**한다
- **랜덤 선택(Randomized Select)** 을 구현하여 평균 O(n)에 k번째로 작은 원소를 찾는다
- 분할 정복을 이용해 **최근접 점 쌍** 문제를 해결한다
- 자동완성 API에서 **선형 탐색과 이진 탐색**을 비교한다

### 실습 구성

| 섹션 | 주제 | 시간 |
|:-----|:-----|:-----|
| **A-1** | 병합 정렬 추적 | 10분 |
| **A-2** | k번째로 작은 원소 찾기 | 15분 |
| **A-3** | 최근접 점 쌍 | 10분 |
| **B-1** | 자동완성 API 비교 | 15분 |

---

<br>

## 2. Type A — 알고리즘 구현

### 2.1 A-1: 병합 정렬 추적

병합 정렬(강의에서 다룸)은 배열을 반으로 나누고, 각 절반을 재귀적으로 정렬한 후, 결과를 병합한다. 여기서는 실행 과정을 추적하고 구현한다.

#### 2.1.1 문제

**목표**: 호출 트리를 시각화하여 병합 정렬의 재귀 구조를 이해한다.

```
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

실행: `python examples/a1_merge_sort_trace.py`

#### 2.1.2 코드

```python
def merge_sort_trace(arr, depth=0):
    """재귀 호출을 시각화하는 병합 정렬."""
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

**병합 추적:** [27, 38]과 [3, 43]을 병합: 27 vs 3 비교 → 3을 취함. 27 vs 43 비교 → 27을 취함. 38 vs 43 비교 → 38을 취함. 나머지 43을 취함. 결과: [3, 27, 38, 43].

**핵심 관찰**: `depth` 매개변수가 들여쓰기를 제어하여 **재귀 트리** 구조를 드러낸다.

---

<br>

### 2.2 A-2: k번째로 작은 원소 찾기

#### 2.2.1 문제

**문제**: 정렬되지 않은 배열에서 k번째로 작은 원소를 찾아라.

```
배열:   [7, 10, 4, 3, 20, 15, 8]
정렬:   [3, 4, 7, 8, 10, 15, 20]

1번째로 작은 원소 = 3
2번째로 작은 원소 = 4
3번째로 작은 원소 = 7
4번째로 작은 원소 = 8    <-- 중앙값
```

**두 가지 접근법:**

| 접근법 | 방법 | 복잡도 |
|:-------|:-----|:-------|
| 단순 | 정렬 후 인덱싱 | O(n log n) |
| **랜덤 선택** | 퀵 정렬처럼 분할 | **O(n) 평균** |

하나의 원소만 필요한데 왜 전체 배열을 정렬해야 하는가?

#### 2.2.2 랜덤 선택의 동작 원리

전화번호부에서 이름을 찾을 때, 모든 페이지를 읽는 대신 임의의 페이지를 펼쳐서 왼쪽 또는 오른쪽 중 어디를 볼지 결정하는 것과 같다.

퀵 정렬의 **분할(partition)** 단계를 사용하되, **한쪽**으로만 재귀한다.

```
[7, 10, 4, 3, 20, 15, 8]에서 4번째로 작은 원소 찾기
                             k = 3 (0-인덱스)

단계 1: 랜덤 피벗 = 10, 분할:
        [7, 4, 3, 8]  [10]  [20, 15]
        ^-- 4개 원소    ^-- 인덱스 4
        k=3 < 4, 왼쪽만 탐색

단계 2: 랜덤 피벗 = 4, 분할:
        [3]  [4]  [7, 8]
              ^-- 인덱스 1
        k=3 > 1, 오른쪽 탐색
        새로운 k = 3 - 2 = 1 (오른쪽 부분 배열에서)

단계 3: 랜덤 피벗 = 7, 분할:
        []  [7]  [8]
             ^-- 인덱스 0
        k=1 > 0, 오른쪽 부분 배열 [8]로 재귀.
        원소가 하나뿐 -> 8을 반환.
        이것이 전체에서 4번째로 작은 원소이다.
```

#### 2.2.3 풀이

퀵 정렬의 분할(partition) 단계를 처음 보는 경우를 위한 설명: 피벗을 하나 선택하고, 피벗보다 작은 원소는 왼쪽에, 피벗은 최종 위치에, 피벗보다 큰 원소는 오른쪽에 오도록 배열을 재배치한다.

```python
import random

def partition(arr, left, right, pivot_idx):
    pivot = arr[pivot_idx]
    # 피벗을 맨 끝으로 이동하여 방해되지 않게 한다
    arr[pivot_idx], arr[right] = arr[right], arr[pivot_idx]
    store = left  # "작은 원소" 영역과 "미정렬" 영역의 경계
    for i in range(left, right):
        if arr[i] < pivot:
            # 현재 원소를 "작은 원소" 영역으로 교환
            arr[i], arr[store] = arr[store], arr[i]
            store += 1
    # 피벗을 최종 정렬 위치에 배치
    arr[store], arr[right] = arr[right], arr[store]
    return store  # 피벗의 최종 인덱스를 반환

def randomized_select(arr, left, right, k):
    """k번째로 작은 원소를 찾는다 (0-인덱스)."""
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

파일: `examples/a2_kth_smallest.py`

#### 2.2.4 성능 비교

```python
def kth_smallest(arr, k):
    """래퍼: k번째로 작은 원소를 반환한다 (0-인덱스)."""
    data = arr[:]  # 원본 변경을 방지하기 위해 복사본으로 작업
    return randomized_select(data, 0, len(data) - 1, k)

# 랜덤 선택: O(n) 평균
result1 = kth_smallest(big_data, n // 2)

# 정렬 + 인덱싱: O(n log n)
result2 = sorted(big_data)[n // 2 - 1]
```

**N = 1,000,000에서의 결과:**

```
방법                  시간      복잡도
-----------------------------------------
랜덤 선택            0.15s     O(n) 평균
정렬 + 인덱싱        0.85s     O(n log n)
```

**핵심 통찰**: 랜덤 선택은 각 단계에서 한쪽 분기만 처리하므로, 평균적으로 O(n) + O(n/2) + O(n/4) + ... = O(2n) = O(n) 작업을 수행한다.

---

<br>

### 2.3 A-3: 최근접 점 쌍

#### 2.3.1 문제

**문제**: 2차원 평면 위의 n개의 점이 주어졌을 때, 가장 가까운 두 점을 찾아라.

```
         50 |          o (12,30)
            |                        o (40,50)
         30 |
            |
         10 |          o (12,10)
            |
          4 |  o (3,4)
          3 | o (2,3)     <-- 최근접 쌍: 거리 = sqrt(2) ~ 1.41
          1 |     o (5,1)
            +--+--+--+--+--+--+--+--+---> x
               2  5  12       40
```

**두 가지 접근법:**

| 접근법 | 복잡도 | 방법 |
|:-------|:-------|:-----|
| 완전 탐색 | O(n²) | n(n-1)/2개의 모든 쌍을 검사 |
| **분할 정복** | **O(n log n)** | 분할하고, 각 절반을 풀고, 띠(strip)를 검사 |

군중 속에서 가장 가까이 서 있는 두 사람을 찾는 것과 같다 -- 군중을 반으로 나누고 경계선 근처를 확인하는 것이 모든 사람을 일일이 비교하는 것보다 훨씬 빠르다.

#### 2.3.2 분할 정복 전략

```
1. 점들을 x좌표로 정렬
2. 중간점에서 왼쪽과 오른쪽 절반으로 분할

   왼쪽(LEFT)    |  오른쪽(RIGHT)
   o    o        |     o       o
      o          |        o
         o       |  o
                 |
                mid_x

3. 왼쪽에서 최근접 쌍을 재귀적으로 찾기  -> d_L
4. 오른쪽에서 최근접 쌍을 재귀적으로 찾기 -> d_R
5. d = min(d_L, d_R)

6. 띠(STRIP) 검사: mid_x로부터 거리 d 이내의 점들
   (최근접 쌍이 두 절반에 걸쳐 있을 수 있다!)

        |<- d ->|<- d ->|
        |  strip 영역   |
        |   o        o   |  <- 이 점들만 검사
        |      o         |
```

#### 2.3.3 풀이 (핵심 부분)

```python
import math

def dist(p1, p2):
    """두 점 사이의 유클리드 거리."""
    return math.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2)

# closest_pair_bruteforce(pts)는 모든 쌍을 O(n^2)으로 검사한다;
# n <= 3일 때 기저 사례로 사용된다.

def closest_pair_dc(points):
    """O(n log n): 분할 정복 접근."""
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

    # 띠(strip) 검사 — 핵심 사실: 띠 안의 각 점에 대해 최대 7개의
    # 다른 점만 검사하면 된다 (y 방향으로 거리 d 이내인 점들).
    # 각 절반의 점들은 최소 d만큼 떨어져 있으므로, d x 2d 직사각형 안에
    # 상수 개의 점만 들어갈 수 있다. 따라서 띠 검사는 총 O(n)이다.
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

#### 2.3.4 성능 비교

실행: `examples/a3_closest_pair.py`

```
N       완전 탐색        분할 정복       속도 향상
----------------------------------------------
100     0.0030s         0.0020s       1.5배
1,000   0.3000s         0.0100s       30배
5,000   7.5000s         0.0600s       125배
```

*(근사값 — 실행 결과는 다를 수 있음)*

완전 탐색은 금방 비실용적이 되지만, 분할 정복은 우아하게 확장된다.

```
시간
  ^
  | x                            x = 완전 탐색 O(n²)
  |                              o = 분할 정복 O(n log n)
  |   x
  |
  |      x
  |
  | o  o   o    o     o
  +-------------------------> N
   100  1K  5K  10K  50K
```

---

<br>

## 3. Type B — 웹 코드 분석

### 3.1 B-1: 자동완성 API

#### 3.1.1 설정

먼저 의존성을 설치한다: `pip install flask`. Flask는 경량 Python 웹 프레임워크이다.

Flask 앱 실행:

```bash
cd examples/b1_web_autocomplete
python app.py
```

**100,000개 단어** 사전에 대한 접두사 검색.

**두 엔드포인트:**

| 엔드포인트 | 알고리즘 | 복잡도 |
|:-----------|:---------|:-------|
| `GET /autocomplete/linear?q=pre` | 순차 탐색 | O(n) |
| `GET /autocomplete/binary?q=pre` | 정렬 + 이진 탐색 | O(log n + k) |

```
  사용자 입력: "pre"
       |
       v
  +-------------------+      +-------------------+
  | 선형 탐색          |      | 이진 탐색          |
  | 100K개 단어를      |      | O(log n)으로       |
  | 하나씩 스캔        |      | "pre" 영역으로     |
  | 쿼리당 O(n)        |      | 바로 점프          |
  +-------------------+      +-------------------+
       |                           |
       v                           v
  [predict, prefix,          [predict, prefix,
   prepare, present, ...]     prepare, present, ...]
```

*k = 매칭 결과 수*

#### 3.1.2 실험

**다음 쿼리를 시도해보자:**

검색창에 문자를 입력하고 응답 시간을 관찰한다:

| 쿼리 | 선형 탐색 | 이진 탐색 |
|:------|:----------|:----------|
| `a` | ~50 ms | ~0.5 ms |
| `pre` | ~50 ms | ~0.3 ms |
| `algorithm` | ~50 ms | ~0.2 ms |

**핵심 관찰:**

- 선형 탐색 시간은 쿼리에 관계없이 **일정**하다 — 항상 전체를 스캔한다
- 이진 탐색은 모든 쿼리에서 **빠르다** — 올바른 영역으로 바로 점프한다
- 100K개 단어에서도 이미 차이가 눈에 띈다
- 수백만 개의 항목이 있는 실제 검색 엔진을 상상해보라!

**토론:**

> 실제 자동완성 시스템은 **트라이(trie)** 와 **역인덱스(inverted index)** 같은 더 고급 자료구조를 사용한다 — 하지만 정렬된 데이터에 대한 이진 탐색은 훌륭한 출발점이다.

---

<br>

## 요약

### 오늘 배운 것

- 분할 정복을 이해하기 위해 병합 정렬의 재귀 호출 트리를 **추적**했다
- **랜덤 선택** 을 구현했다 — 평균 O(n)에 k번째로 작은 원소 찾기
- **최근접 점 쌍** 문제를 해결했다: 완전 탐색 O(n²) vs 분할 정복 O(n log n)
- 웹 자동완성 API에서 **선형 탐색 vs 이진 탐색**을 비교했다

### 분할 정복 패턴

```
1. 분할(DIVIDE)   -- 문제를 더 작은 부분 문제로 쪼갠다
2. 정복(CONQUER)  -- 각 부분 문제를 재귀적으로 해결한다
3. 결합(COMBINE)  -- 부분 문제의 해를 합친다
```

### 과제 3

과제 내용은 `../3_assignment/README.md`를 참고한다.

### 다음 주

**5주차**: 새로운 주제 — 계속 연습하자!

---

<br>

## 부록

> 이 문서는 슬라이드 자료 `W04_LB_Advanced-Divide-and-Conquer.md`를 바탕으로 작성되었다.
