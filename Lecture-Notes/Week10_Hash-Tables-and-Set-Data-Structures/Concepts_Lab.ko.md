# 10주차 실습 — 해시 테이블과 응용

[레포지토리 안내](../../README.ko.md) | [English](Concepts_Lab.md) | [한국어](Concepts_Lab.ko.md)

> **최종 수정일:** 2026-11-18

> **학습 목표:**
> 1. 분리 연쇄법으로 충돌을 해결하는 해시 테이블의 삽입, 조회, 삭제, 부하율 계산을 구현할 수 있다
> 2. 선형 조사로 충돌을 해결하는 해시 테이블을 구현하고 조사 수열을 추적할 수 있다
> 3. 개방 주소법에서 슬롯을 비우는 삭제가 탐색을 끊는 이유를 설명하고 묘비를 쓰는 삭제를 구현할 수 있다
> 4. 분리 연쇄법과 개방 주소법을 메모리, 부하율, 군집화, 캐시 성능, 삭제의 측면에서 비교할 수 있다
> 5. 리스트의 순차 탐색과 해시 테이블 조회의 실행 시간을 비교하고 해시 테이블의 응용을 설명할 수 있다

---

## 목차

- [1. 개요](#1-개요)
  - [1.1 실습 목표](#11-실습-목표)
  - [1.2 실습 구성](#12-실습-구성)
  - [1.3 실행 환경](#13-실행-환경)
- [2. 연습 1: 분리 연쇄법 해시 테이블](#2-연습-1-분리-연쇄법-해시-테이블)
  - [2.1 문제](#21-문제)
  - [2.2 풀이 코드](#22-풀이-코드)
  - [2.3 실행 예](#23-실행-예)
- [3. 연습 2: 선형 조사 해시 테이블](#3-연습-2-선형-조사-해시-테이블)
  - [3.1 문제](#31-문제)
  - [3.2 풀이 코드](#32-풀이-코드)
  - [3.3 조사 수열 추적](#33-조사-수열-추적)
  - [3.4 가득 찬 테이블](#34-가득-찬-테이블)
- [4. 개방 주소법의 삭제와 묘비](#4-개방-주소법의-삭제와-묘비)
  - [4.1 슬롯을 비우는 삭제의 문제](#41-슬롯을-비우는-삭제의-문제)
  - [4.2 묘비를 쓰는 구현](#42-묘비를-쓰는-구현)
- [5. 분리 연쇄법과 개방 주소법의 비교](#5-분리-연쇄법과-개방-주소법의-비교)
  - [5.1 여섯 가지 관점](#51-여섯-가지-관점)
  - [5.2 부하율에 따른 조사 횟수](#52-부하율에-따른-조사-횟수)
- [6. 해시 테이블의 응용](#6-해시-테이블의-응용)
  - [6.1 문자 코드 합 해시 함수](#61-문자-코드-합-해시-함수)
  - [6.2 해시 기반 기능](#62-해시-기반-기능)
  - [6.3 순차 탐색과 해시 조회의 비교](#63-순차-탐색과-해시-조회의-비교)
- [요약](#요약)
- [점검 문제](#점검-문제)
- [참고 문헌](#참고-문헌)

---

<br>

## 1. 개요

> **참고:** 해시 함수, 충돌, 부하율, 재해싱의 이론은 [10주차 이론](Concepts_Lecture.ko.md)에서 다룬다. 이 실습은 두 가지 충돌 해결 방법을 직접 구현하고 그 동작을 관찰한다.

### 1.1 실습 목표

- 충돌을 체인으로 해결하는 **분리 연쇄법(separate chaining)** 해시 테이블을 구현한다.
- 충돌이 나면 다음 슬롯을 차례로 확인하는 **선형 조사(linear probing)** 해시 테이블을 구현한다.
- 두 방법의 삭제, 부하율, 군집화, 조사 횟수를 비교한다.
- 해시 테이블을 쓰는 조회 기능과 리스트를 쓰는 조회 기능의 성능 차이를 측정한다.

### 1.2 실습 구성

| 구분 | 주제 |
|:-----|:-----|
| **연습 1** | 분리 연쇄법 해시 테이블 |
| **연습 2** | 선형 조사 해시 테이블 |
| **비교** | 분리 연쇄법과 개방 주소법의 비교, 부하율에 따른 조사 횟수 |
| **응용** | 해시 함수의 계산, 해시 기반 조회 기능, 순차 탐색과 해시 조회의 실행 시간 비교 |

*표 1. 실습 구성과 주제*

### 1.3 실행 환경

모든 코드는 Python 3의 표준 라이브러리만 사용한다. 해시 테이블의 동작을 그림으로 보여 주는 참조 웹 애플리케이션(해시 테이블 탐색기)은 FastAPI와 uvicorn으로 실행하며, 그 핵심 알고리즘은 5.2절과 6절에서 코드로 다룬다.

---

<br>

## 2. 연습 1: 분리 연쇄법 해시 테이블

### 2.1 문제

**목표:** 충돌을 **분리 연쇄법**으로 해결하는 해시 테이블을 구현한다. 각 버킷은 그 버킷으로 해시된 키-값 쌍의 리스트(체인)를 가진다.

**요구 사항:**

- `put(key, value)`: 키가 없으면 삽입하고, 있으면 값을 갱신한다.
- `get(key)`: 키에 대응하는 값을 돌려주고, 키가 없으면 `None`을 돌려준다.
- `delete(key)`: 키-값 쌍을 제거한다.
- `load_factor()`: 부하율 `count / size`를 돌려준다.

```text
테이블 크기 = 7
put("apple", 3)  -> bucket[hash("apple") % 7]
put("banana", 5) -> 같은 버킷인가, 다른 버킷인가?
```

두 키가 같은 버킷에 들어가는지는 `hash("apple") % 7`과 `hash("banana") % 7`이 같은지에 달려 있다. 같으면 두 쌍이 한 체인에 차례로 놓이고, 다르면 각자 다른 체인에 놓인다. 어느 경우든 `get`은 그 키의 버킷 하나의 체인만 훑는다.

### 2.2 풀이 코드

```python
class HashTableChaining:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]   # 버킷마다 빈 리스트(체인)
        self.count = 0                           # 저장된 키-값 쌍의 수

    def _hash(self, key):
        return hash(key) % self.size             # 0 ~ size-1의 버킷 번호

    def put(self, key, value):
        idx = self._hash(key)
        for i, (k, v) in enumerate(self.table[idx]):
            if k == key:
                self.table[idx][i] = (key, value)  # 같은 키가 있으면 값만 갱신
                return
        self.table[idx].append((key, value))        # 새 키는 체인 끝에 추가
        self.count += 1

    def get(self, key):
        idx = self._hash(key)
        for k, v in self.table[idx]:
            if k == key:
                return v
        return None                                 # 체인 끝까지 없으면 None

    def delete(self, key):
        idx = self._hash(key)
        for i, (k, v) in enumerate(self.table[idx]):
            if k == key:
                self.table[idx].pop(i)              # 체인에서 그 쌍만 제거
                self.count -= 1
                return True
        return False

    def load_factor(self):
        return self.count / self.size               # 부하율 = n / m
```

- **`_hash`:** Python 내장 `hash()`의 값을 테이블 크기로 나눈 나머지를 버킷 번호로 쓴다.
- **`put`:** 버킷의 체인을 처음부터 훑어 같은 키를 찾으면 그 자리의 쌍을 새 값으로 바꾸고, 끝까지 없으면 체인 끝에 붙인다. 같은 키가 두 번 저장되지 않도록 삽입 전에 반드시 체인을 훑어야 한다.
- **`get`:** 버킷 하나의 체인만 훑으므로 비용은 그 체인의 길이에 비례한다.
- **`delete`:** 체인에서 그 쌍만 빼면 되므로, 다른 키의 탐색에 영향을 주지 않는다. 이 점이 4절의 개방 주소법과 다르다.
- **`load_factor`:** 저장된 쌍의 수 n을 버킷 수 m으로 나눈 값이며, 체인의 평균 길이와 같다.

### 2.3 실행 예

문자열 키의 해시 값은 Python 프로세스마다 달라지므로 [1], 버킷 배치를 재현할 수 있게 정수 키로 실행한다. 음이 아닌 작은 정수 k의 해시 값은 k 자신이므로 [2], 크기 7인 테이블에서 키 k는 버킷 `k % 7`에 들어간다.

```python
ht = HashTableChaining(size=7)
for key, value in [(10, "A"), (3, "B"), (17, "C"), (24, "D"), (5, "E")]:
    ht.put(key, value)
for i, bucket in enumerate(ht.table):
    print(i, bucket)
print("load factor:", round(ht.load_factor(), 3))

ht.put(17, "C2")                  # 갱신: count는 그대로
print(ht.get(17), ht.get(31))     # 31도 버킷 3이지만 체인에 없음
print(ht.delete(3), ht.delete(3))
print(3, ht.table[3], "load factor:", round(ht.load_factor(), 3))
```

```text
0 []
1 []
2 []
3 [(10, 'A'), (3, 'B'), (17, 'C'), (24, 'D')]
4 []
5 [(5, 'E')]
6 []
load factor: 0.714
C2 None
True False
3 [(10, 'A'), (17, 'C2'), (24, 'D')] load factor: 0.571
```

- 10, 3, 17, 24는 모두 7로 나눈 나머지가 3이므로 버킷 3의 체인에 들어간 순서대로 놓인다. 키 5만 버킷 5에 들어간다.
- 부하율은 5 / 7 ≈ 0.714이다. 평균 체인 길이는 0.714이지만 버킷 3의 체인 길이는 4이다. 부하율이 낮아도 키가 한 버킷에 몰리면 그 버킷의 탐색은 느려진다.
- `put(17, "C2")`는 기존 쌍을 갱신하므로 `count`가 늘지 않는다. `get(31)`은 버킷 3의 체인 네 원소를 모두 비교한 뒤 `None`을 돌려준다.
- 첫 `delete(3)`은 쌍을 지우고 `True`를, 두 번째 호출은 이미 없으므로 `False`를 돌려준다. 삭제 뒤 부하율은 4 / 7 ≈ 0.571이다.

---

<br>

## 3. 연습 2: 선형 조사 해시 테이블

### 3.1 문제

**목표:** 충돌을 **선형 조사**로 해결하는 해시 테이블을 구현한다. 선형 조사는 개방 주소법의 한 방법으로, 모든 쌍을 테이블 배열 안에 직접 저장한다.

**요구 사항:**

- `put(key, value)`: 슬롯 `h(key)`가 다른 키로 차 있으면 `h(key)+1`, `h(key)+2`, ...를 차례로 확인하여 빈 슬롯에 넣는다.
- `get(key)`: 같은 조사 수열을 따라가며 키를 찾는다.
- 테이블이 가득 차면 예외를 발생시킨다.

```text
테이블 크기 = 7
put("apple")  -> 슬롯 3
put("banana") -> 슬롯 3이 차 있으므로 슬롯 4를 확인
```

### 3.2 풀이 코드

```python
class HashTableProbing:
    def __init__(self, size=10):
        self.size = size
        self.keys = [None] * size       # None은 빈 슬롯
        self.values = [None] * size
        self.count = 0

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        if self.count >= self.size:
            raise Exception("Hash table is full")
        idx = self._hash(key)
        while self.keys[idx] is not None and self.keys[idx] != key:
            idx = (idx + 1) % self.size   # 선형 조사: 다음 슬롯으로
        if self.keys[idx] is None:
            self.count += 1               # 빈 슬롯이면 새 키
        self.keys[idx] = key
        self.values[idx] = value

    def get(self, key):
        idx = self._hash(key)
        start = idx
        while self.keys[idx] is not None:
            if self.keys[idx] == key:
                return self.values[idx]
            idx = (idx + 1) % self.size
            if idx == start:              # 한 바퀴를 돌았으면 중단
                break
        return None                       # 빈 슬롯을 만나면 키가 없음

    def load_factor(self):
        return self.count / self.size
```

- 키와 값을 두 배열 `keys`, `values`의 같은 인덱스에 둔다. 체인이 없으므로 원소마다 포인터를 둘 필요가 없다.
- `put`의 `while` 조건은 "다른 키가 차지한 슬롯"이면 계속 조사한다는 뜻이다. 반복이 멈추는 곳은 빈 슬롯이거나 같은 키가 있는 슬롯이며, 빈 슬롯일 때만 `count`를 늘린다.
- `(idx + 1) % self.size`는 마지막 슬롯 다음에 슬롯 0으로 돌아가게 한다. 그래서 조사 수열은 원형이다.
- `put`이 처음에 `count >= size`를 확인하므로, `count < size`일 때는 빈 슬롯이 반드시 하나 이상 있어 `while`이 끝난다.
- `get`은 빈 슬롯을 만나면 멈춘다. 키 k가 삽입될 때 조사 수열에서 빈 슬롯을 만나기 전에 자리를 잡았으므로, 탐색 중에 빈 슬롯을 만났다면 k는 테이블에 없다. 이 추론은 슬롯이 한번 차면 다시 비지 않는다는 가정에 기대며, 4절에서 이 가정이 삭제와 어떻게 충돌하는지 다룬다.

### 3.3 조사 수열 추적

크기 7인 테이블에 키 10, 3, 17, 5를 차례로 넣는다.

```python
ht = HashTableProbing(size=7)
for key, value in [(10, "A"), (3, "B"), (17, "C"), (5, "D")]:
    ht.put(key, value)
print(ht.keys)
print(ht.get(17), ht.get(24))
```

```text
[None, None, None, 10, 3, 17, 5]
C None
```

| 연산 | 홈 슬롯 `k % 7` | 확인한 슬롯 | 결과 |
|:-----|:-----|:-----|:-----|
| `put(10)` | 3 | 3 | 슬롯 3에 저장 |
| `put(3)` | 3 | 3, 4 | 슬롯 4에 저장 |
| `put(17)` | 3 | 3, 4, 5 | 슬롯 5에 저장 |
| `put(5)` | 5 | 5, 6 | 슬롯 6에 저장 |
| `get(17)` | 3 | 3, 4, 5 | 슬롯 5에서 찾음 |
| `get(24)` | 3 | 3, 4, 5, 6, 0 | 슬롯 0이 비어 있어 없음 |

*표 2. 크기 7인 테이블에서 선형 조사의 삽입과 탐색*

키 5의 홈 슬롯은 5이지만, 홈 슬롯 3에서 넘친 키 17이 이미 슬롯 5를 차지하여 슬롯 6으로 밀려났다. 해시 값이 다른 키까지 연속된 블록에 흡수되어 블록이 계속 자라는 이 현상이 **일차 군집화(primary clustering)** 이다. 슬롯 3\~6의 군집 때문에 `get(24)`는 다섯 슬롯을 확인한 뒤에야 키가 없다고 판단한다.

### 3.4 가득 찬 테이블

이어서 키 0, 1, 2를 넣으면 테이블이 가득 찬다.

```python
for key in [0, 1, 2]:
    ht.put(key, "X")
print(ht.keys, ht.load_factor())
print(ht.get(24))                         # 빈 슬롯이 없으므로 한 바퀴를 돈다
for key in [9, 10]:
    try:
        ht.put(key, "new")
    except Exception as e:
        print(key, e)
```

```text
[0, 1, 2, 10, 3, 17, 5] 1.0
None
9 Hash table is full
10 Hash table is full
```

- 부하율이 1.0이 되면 빈 슬롯이 없으므로 `get(24)`는 빈 슬롯에서 멈출 수 없다. `start`로 돌아온 순간 멈추는 검사가 있어야 무한 반복을 피한다.
- 개방 주소법의 부하율은 1을 넘을 수 없다. 새 키 9는 들어갈 자리가 없으므로 예외가 맞다.

> **참고:** **기존 키의 갱신.** 키 10은 이미 슬롯 3에 있으므로 `put(10, "new")`는 새 슬롯이 필요 없는 갱신이지만, 3.2절의 `put`은 조사하기 전에 `count >= size`를 검사하므로 예외를 발생시킨다. 테이블이 가득 찬 상태에서도 갱신을 허용하려면, 먼저 조사하여 같은 키를 찾았으면 값을 바꾸고, 빈 슬롯이 필요할 때만 가득 찼는지 검사해야 한다. 4.2절의 구현이 이 순서를 따른다.

---

<br>

## 4. 개방 주소법의 삭제와 묘비

### 4.1 슬롯을 비우는 삭제의 문제

분리 연쇄법은 체인에서 쌍 하나를 빼면 삭제가 끝나지만, 개방 주소법에서 슬롯을 단순히 `None`으로 비우면 그 슬롯을 지나 자리를 잡은 키를 찾을 수 없게 된다. 키 10, 3, 17을 넣은 뒤 키 3이 있던 슬롯 4를 비워 본다.

```python
ht = HashTableProbing(size=7)
for key, value in [(10, "A"), (3, "B"), (17, "C")]:
    ht.put(key, value)
ht.keys[4] = ht.values[4] = None     # 키 3을 지우고 슬롯 4를 비움
ht.count -= 1
print(ht.keys, ht.get(17))
```

```text
[None, None, None, 10, None, 17, None]
None
```

키 17은 슬롯 5에 그대로 있지만, `get(17)`은 홈 슬롯 3에서 출발해 슬롯 4가 비어 있는 것을 보고 키가 없다고 판단한다. 3.2절의 `get`이 기댄 "빈 슬롯을 만나면 키가 없다"는 추론이 삭제 때문에 깨진 것이다.

> **용어 정의:** **묘비(tombstone)** 는 개방 주소법에서 삭제된 슬롯에 남겨 두는 표식이다. 탐색은 묘비를 차 있는 슬롯처럼 지나쳐 계속 조사하고, 삽입은 묘비 자리를 새 키에 다시 쓸 수 있다.

### 4.2 묘비를 쓰는 구현

다음은 3.2절의 클래스를 상속하여 묘비를 쓰도록 `put`, `get`, `delete`를 다시 정의한 구현이다.

```python
DELETED = object()                    # 묘비: 어떤 키와도 같지 않은 표식

class HashTableTombstone(HashTableProbing):
    def put(self, key, value):
        idx = self._hash(key)
        first_free = None                 # 처음 만난 묘비의 위치
        for _ in range(self.size):
            k = self.keys[idx]
            if k is None:                 # 빈 슬롯: 키가 테이블에 없음
                if first_free is None:
                    first_free = idx
                break
            if k is DELETED:
                if first_free is None:
                    first_free = idx      # 재사용 후보만 기억하고 계속 조사
            elif k == key:
                self.values[idx] = value  # 기존 키는 값만 갱신
                return
            idx = (idx + 1) % self.size
        if first_free is None:
            raise Exception("Hash table is full")
        self.keys[first_free] = key
        self.values[first_free] = value
        self.count += 1

    def get(self, key):
        idx = self._hash(key)
        for _ in range(self.size):
            k = self.keys[idx]
            if k is None:
                return None               # 빈 슬롯에서만 탐색을 멈춤
            if k is not DELETED and k == key:
                return self.values[idx]
            idx = (idx + 1) % self.size   # 묘비는 지나쳐 계속 조사
        return None

    def delete(self, key):
        idx = self._hash(key)
        for _ in range(self.size):
            k = self.keys[idx]
            if k is None:
                return False
            if k is not DELETED and k == key:
                self.keys[idx] = DELETED  # 슬롯을 비우지 않고 묘비를 둠
                self.values[idx] = None
                self.count -= 1
                return True
            idx = (idx + 1) % self.size
        return False
```

- **`DELETED = object()`:** 새로 만든 객체는 자기 자신과만 같으므로, 사용자가 넣는 어떤 키와도 혼동되지 않는 표식이 된다. 비교는 `is`로 한다.
- **`get`과 `delete`:** 빈 슬롯(`None`)에서만 멈추고 묘비는 지나친다. 반복을 `size`번으로 제한하여, 빈 슬롯 없이 키와 묘비로만 채워진 테이블에서도 끝나게 한다.
- **`put`:** 묘비를 만나도 바로 쓰지 않고 위치만 기억한 채 조사를 계속한다. 같은 키가 묘비 뒤에 있을 수 있기 때문이다. 같은 키를 찾으면 갱신하고, 빈 슬롯에 이르러 키가 없음이 확정되면 처음 만난 묘비(없으면 그 빈 슬롯)에 넣는다.

```python
def show(t):
    return ["T" if k is DELETED else k for k in t.keys]

ht = HashTableTombstone(size=7)
for key, value in [(10, "A"), (3, "B"), (17, "C")]:
    ht.put(key, value)
print(ht.delete(3), show(ht), ht.get(17))
ht.put(17, "C2")                      # 묘비 뒤의 17을 찾아 갱신
ht.put(24, "D")                       # 24는 묘비 자리(슬롯 4)에 들어감
print(show(ht), ht.get(17), ht.get(24), ht.count)
```

```text
True [None, None, None, 10, 'T', 17, None] C
[None, None, None, 10, 24, 17, None] C2 D 3
```

- 키 3을 지운 슬롯 4에는 묘비 `T`가 남으므로 `get(17)`은 슬롯 4를 지나 슬롯 5에서 17을 찾는다.
- `put(17, "C2")`는 슬롯 4의 묘비를 후보로 기억하지만, 슬롯 5에서 같은 키를 찾아 그 자리를 갱신한다.
- `put(24, "D")`는 슬롯 3, 4, 5, 6을 확인하고 슬롯 6이 비어 있어 24가 없음을 확인한 뒤, 처음 만난 묘비인 슬롯 4에 넣는다.

> **주의:** 묘비를 만나자마자 새 키를 쓰는 삽입은 중복 키를 만든다. 위 상태에서 그런 `put(17, "C2")`는 슬롯 4에 17을 하나 더 넣고, 슬롯 5의 옛 17은 남는다. 그 뒤에 `delete(17)`이 슬롯 4의 17만 지우면 `get(17)`이 슬롯 5의 옛 값을 다시 돌려준다.

묘비는 탐색을 올바르게 유지하지만, 삭제와 삽입이 반복되면 묘비가 쌓여 탐색이 빈 슬롯에 이르기까지의 조사 길이가 길어진다. 그래서 실제 구현은 묘비를 포함한 점유 비율이 임계치를 넘으면 테이블을 재해싱하여 묘비를 모두 없앤다.

---

<br>

## 5. 분리 연쇄법과 개방 주소법의 비교

### 5.1 여섯 가지 관점

| 관점 | 분리 연쇄법 | 개방 주소법 |
|:-----|:-----|:-----|
| 충돌 처리 | 버킷마다 연결 리스트(체인) | 다음 슬롯으로 조사 |
| 메모리 | 원소마다 포인터 추가 | 배열 하나에 압축 |
| 부하율 | 1.0을 넘을 수 있음 | 1.0을 넘을 수 없음 (가득 차면 1.0) |
| 군집화 | 없음 | 있음 (선형 조사의 일차 군집화) |
| 캐시 성능 | 나쁨 (포인터 추적) | 좋음 (연속된 메모리) |
| 삭제 | 단순 | 묘비 필요 |

*표 3. 분리 연쇄법과 개방 주소법의 비교*

- **부하율:** 체인은 얼마든지 길어질 수 있으므로 분리 연쇄법은 키 수가 버킷 수보다 많아도 동작한다. 개방 주소법은 키 하나가 슬롯 하나를 차지하므로 키 수가 슬롯 수를 넘을 수 없고, 부하율이 1에 가까워지면 5.2절처럼 조사 횟수가 급격히 늘어 그 전에 재해싱해야 한다.
- **군집화:** 분리 연쇄법에서 한 버킷의 체인이 길어져도 다른 버킷의 탐색에는 영향이 없다. 선형 조사에서는 3.3절의 키 5처럼 홈 슬롯이 다른 키도 군집에 흡수된다.
- **캐시 성능:** 체인의 노드는 메모리 여기저기에 흩어져 있어 노드를 따라갈 때마다 캐시 적중을 기대하기 어렵다. 선형 조사는 이웃한 슬롯을 차례로 읽으므로 한 번 가져온 캐시 라인을 여러 슬롯에 걸쳐 활용한다.
- **삭제:** 4절에서 본 것처럼 개방 주소법의 삭제는 묘비가 있어야 탐색이 올바르다.

### 5.2 부하율에 따른 조사 횟수

해시 테이블 탐색기의 충돌 해결 비교 기능처럼, 같은 무작위 키를 두 방법의 테이블에 넣고 탐색 한 번에 확인하는 원소 수를 센다. 크기 1009(소수)인 테이블에 정수 키를 부하율 0.25, 0.5, 0.75, 0.9만큼 넣고, 성공한 탐색은 저장된 모든 키에 대해, 실패한 탐색은 저장되지 않은 키 2,000개에 대해 평균을 낸다.

```python
import random

def chain_probes(m, keys, queries):
    table = [[] for _ in range(m)]
    for k in keys:
        table[k % m].append(k)
    hit = sum(table[k % m].index(k) + 1 for k in keys) / len(keys)   # 찾을 때까지 비교한 원소 수
    miss = sum(len(table[q % m]) for q in queries) / len(queries)    # 체인 전체를 비교
    return hit, miss

def probe_probes(m, keys, queries):
    slots = [None] * m
    for k in keys:
        i = k % m
        while slots[i] is not None:
            i = (i + 1) % m
        slots[i] = k
    def probes(x):
        i, n = x % m, 1
        while slots[i] is not None and slots[i] != x:
            i, n = (i + 1) % m, n + 1
        return n                                                     # 확인한 슬롯 수
    hit = sum(probes(k) for k in keys) / len(keys)
    miss = sum(probes(q) for q in queries) / len(queries)
    return hit, miss

random.seed(2026)
m = 1009                                      # 테이블 크기(소수)
print(" alpha | chain hit | chain miss | probe hit | probe miss | 1/(1-alpha)")
for alpha in [0.25, 0.5, 0.75, 0.9]:
    n = int(alpha * m)
    pool = random.sample(range(10**7), n + 2000)
    keys, queries = pool[:n], pool[n:]        # queries는 테이블에 없는 키
    ch, cm = chain_probes(m, keys, queries)
    ph, pm = probe_probes(m, keys, queries)
    print(f" {n/m:5.2f} | {ch:9.2f} | {cm:10.2f} | {ph:9.2f} | {pm:10.2f} | {1/(1-n/m):11.2f}")
```

```text
 alpha | chain hit | chain miss | probe hit | probe miss | 1/(1-alpha)
  0.25 |      1.09 |       0.23 |      1.10 |       1.36 |        1.33
  0.50 |      1.24 |       0.49 |      1.51 |       2.47 |        2.00
  0.75 |      1.42 |       0.77 |      2.52 |       8.15 |        3.99
  0.90 |      1.43 |       0.91 |      7.04 |      44.49 |        9.99
```

- **분리 연쇄법:** 실패한 탐색은 체인 하나를 끝까지 비교하므로 평균 비교 수가 체인의 평균 길이, 곧 부하율 $`\alpha`$와 거의 같다. 성공한 탐색도 부하율 0.9에서 평균 1.43번으로, 부하율이 커져도 완만하게 는다.
- **선형 조사:** 부하율 0.5까지는 분리 연쇄법과 큰 차이가 없지만, 0.75에서 실패한 탐색이 평균 8.15번, 0.9에서 44.49번으로 급격히 늘어난다.
- **마지막 열:** 10주차 이론의 3.1절에서 본 $`1/(1-\alpha)`$는 각 키의 조사 수열이 모든 슬롯 순열 중 하나를 고르게 따른다는 균등 해싱 가정 아래의 기대 조사 횟수이다. 선형 조사의 실패한 탐색은 모든 부하율에서 이 값보다 크고, 부하율이 높을수록 차이가 벌어진다. 일차 군집화로 조사 수열이 서로 겹치기 때문이다.

> **핵심:** 선형 조사는 부하율이 낮을 때는 캐시 친화적이어서 빠르지만, 부하율이 1에 가까워지면 군집화로 조사 횟수가 폭증한다. 그래서 개방 주소법은 부하율을 약 0.7 이하로 유지하도록 재해싱한다.

---

<br>

## 6. 해시 테이블의 응용

### 6.1 문자 코드 합 해시 함수

해시 테이블 탐색기는 버킷 배치를 화면에 고정하여 보여 주기 위해 실행할 때마다 같은 값을 내는 결정적 해시 함수를 쓴다. 정수 키는 `k mod m`, 문자열 키는 문자 코드의 합을 `m`으로 나눈 나머지이다.

```python
def char_sum_hash(key, size):
    if isinstance(key, int):
        return key % size                       # 정수 키: k mod m
    return sum(ord(c) for c in str(key)) % size # 문자열 키: 문자 코드의 합 mod m

for word in ["apple", "banana", "listen", "silent", "enlist"]:
    total = sum(ord(c) for c in word)
    print(f"{word:7s} sum={total:4d} -> {char_sum_hash(word, 11)}")
```

```text
apple   sum= 530 -> 2
banana  sum= 609 -> 4
listen  sum= 655 -> 6
silent  sum= 655 -> 6
enlist  sum= 655 -> 6
```

이 함수는 계산 과정을 손으로 따라가기 쉽지만 좋은 해시 함수는 아니다. 덧셈은 순서와 무관하므로 같은 문자로 이루어진 철자 바꾸기 단어(`listen`, `silent`, `enlist`)는 모두 같은 값으로 해시된다. 또 짧은 영어 단어의 문자 코드 합은 수백에서 1,000 남짓한 좁은 범위에 몰리므로, 테이블이 그보다 크면 그 구간의 슬롯만 쓰이게 된다. 실제 해시 함수는 문자의 위치마다 다른 가중치를 곱하는 다항식 해시처럼 순서를 반영하고 값을 넓게 퍼뜨린다.

### 6.2 해시 기반 기능

키로 값을 바로 찾아야 하는 기능은 해시 테이블(Python의 `dict`)로 구현한다. 다음은 웹 애플리케이션의 주제별 예이다.

| 주제 | 해시 테이블 기능 |
|:-----|:-----|
| 쇼핑몰 | 상품 ID로 상품을 바로 조회, 장바구니 캐싱 |
| 소셜 네트워크 | 사용자 ID와 사용자 정보의 대응, 세션 관리 |
| 캠퍼스 지도 | 건물 이름과 좌표의 대응 |

*표 4. 웹 애플리케이션 주제별 해시 테이블 기능*

해시 테이블 탐색기의 전화번호부도 같은 예로, 이름을 키, 전화번호를 값으로 하는 분리 연쇄법 해시 테이블에 연락처를 추가, 조회, 삭제한다. 세 예 모두 10주차 이론 4.1절의 Map 추상 자료형이며, 순서가 필요 없고 키로 정확히 찾는 연산이 대부분이라는 공통점이 있다.

### 6.3 순차 탐색과 해시 조회의 비교

상품 n개를 리스트와 해시 테이블에 함께 두고, 무작위 상품 ID 1,000개를 두 방식으로 조회하는 시간을 잰다.

```python
import random
import time

def measure(n, lookups=1000):
    products = [{"id": i, "name": f"Product {i}"} for i in range(n)]
    product_hash = {p["id"]: p for p in products}      # id -> 상품
    targets = [random.randrange(n) for _ in range(lookups)]

    start = time.perf_counter()
    for t in targets:                                   # 리스트 순차 탐색: O(n)
        result = next((p for p in products if p["id"] == t), None)
    list_time = time.perf_counter() - start

    start = time.perf_counter()
    for t in targets:                                   # 해시 테이블 조회: 평균 O(1)
        result = product_hash.get(t)
    hash_time = time.perf_counter() - start
    return list_time, hash_time

random.seed(10)
print("      n |  list (ms) |  hash (ms) | speedup")
for n in [1_000, 10_000, 100_000]:
    lt, ht = measure(n)
    print(f"{n:7,d} | {lt*1000:10.2f} | {ht*1000:10.3f} | {lt/ht:7,.0f}x")
```

```text
      n |  list (ms) |  hash (ms) | speedup
  1,000 |      11.34 |      0.028 |     401x
 10,000 |     101.49 |      0.072 |   1,419x
100,000 |    1087.48 |      0.405 |   2,685x
```

- `time.perf_counter()`는 짧은 구간을 재기에 알맞은 고해상도 시계이다. 측정값은 컴퓨터와 실행 시점에 따라 달라지지만 증가 경향은 같다.
- 리스트 탐색 시간은 n이 10배가 될 때마다 약 10배가 되어 O(n)을 따른다. 무작위 목표는 평균적으로 리스트의 중간쯤에 있으므로 조회 한 번에 약 n/2개를 비교한다.
- 해시 조회는 n = 100,000에서도 조회 1,000번에 0.4 ms 정도이다. n과 함께 조금 늘어나는 것은 점근 분석이 세지 않는 메모리 접근 비용, 곧 테이블이 커질수록 CPU 캐시에 들어가지 않는 부분이 늘어나는 영향으로 볼 수 있다.
- 속도 차이는 n이 클수록 커진다. 데이터가 많은 서비스일수록 자료구조의 선택이 응답 시간을 좌우한다.

---

<br>

## 요약

| 개념 | 핵심 요약 |
|:-----|:-----|
| 분리 연쇄법 구현 | 버킷마다 리스트를 두고, 삽입 전에 체인을 훑어 같은 키는 갱신하며, 삭제는 체인에서 쌍만 뺀다. |
| 선형 조사 구현 | 홈 슬롯이 다른 키로 차 있으면 다음 슬롯을 원형으로 확인하고, 탐색은 빈 슬롯을 만나면 멈춘다. |
| 가득 찬 테이블 | 개방 주소법의 부하율은 1을 넘을 수 없으며, 빈 슬롯이 없을 때는 한 바퀴를 돈 뒤 멈추는 검사가 필요하다. |
| 일차 군집화 | 선형 조사에서 연속된 블록이 홈 슬롯이 다른 키까지 흡수하며 자라 탐색 길이를 늘린다. |
| 묘비 | 개방 주소법의 삭제는 슬롯을 비우지 않고 묘비를 남겨, 탐색은 지나치고 삽입은 키가 없음을 확인한 뒤 재사용한다. |
| 두 방법의 비교 | 분리 연쇄법은 부하율이 1을 넘어도 되고 삭제가 단순하며, 개방 주소법은 메모리가 압축적이고 캐시 성능이 좋지만 부하율에 민감하다. |
| 조사 횟수 | 선형 조사의 실패한 탐색은 부하율 0.9에서 평균 44번을 넘어, 균등 해싱의 $`1/(1-\alpha)`$보다 훨씬 크다. |
| 해시 함수의 품질 | 문자 코드 합 해시는 철자 바꾸기 단어가 모두 충돌하고 값이 좁은 범위에 몰리므로, 실제 해시 함수는 문자의 순서를 반영한다. |
| 응용 | ID로 상품, 사용자, 건물을 찾는 기능은 해시 테이블로 구현하며, n = 100,000에서 리스트 탐색보다 수천 배 빠르다. |

---

<br>

## 점검 문제

1. 분리 연쇄법의 `put`이 새 쌍을 체인에 붙이기 전에 체인 전체를 훑는 이유는 무엇인가? 이 검사를 빼면 `get`과 `delete`는 어떻게 동작하는가?

   <details>
   <summary>정답</summary>

   같은 키가 이미 있으면 값만 바꾸어 한 키가 테이블에 한 번만 저장되게 하려는 것이다. 검사를 빼면 `put(17, "C")` 뒤의 `put(17, "C2")`가 같은 체인에 `(17, "C2")`를 하나 더 붙인다. `get(17)`은 체인을 앞에서부터 훑어 먼저 만난 옛 값 `"C"`를 돌려주므로 갱신이 보이지 않고, `delete(17)`도 앞의 쌍 하나만 지우므로 지운 뒤에도 `get(17)`이 `"C2"`를 돌려준다. `count`도 실제 키 수보다 커져 부하율이 틀어진다.

   </details>

2. 크기 7인 선형 조사 테이블에 키 4, 11, 18, 5를 차례로 넣으면 각 키는 어느 슬롯에 들어가는가? 그 뒤 `get(25)`는 몇 개의 슬롯을 확인하는가?

   <details>
   <summary>정답</summary>

   네 키의 홈 슬롯은 4, 4, 4, 5이다. 4는 슬롯 4, 11은 슬롯 4가 차 있어 슬롯 5, 18은 슬롯 4, 5를 지나 슬롯 6에 들어간다. 5의 홈 슬롯 5는 이미 11이 차지하고 있고 슬롯 6도 차 있으므로, 원형으로 돌아 슬롯 0에 들어간다. 25의 홈 슬롯은 25 % 7 = 4이므로 슬롯 4, 5, 6, 0을 확인하고 슬롯 1이 비어 있어 키가 없다고 판단한다. 확인한 슬롯은 5개이다. 키 5가 홈 슬롯에서 두 칸 밀려난 것과 `get(25)`가 다섯 슬롯을 확인한 것은 모두 일차 군집화의 결과이다.

   </details>

3. 개방 주소법에서 슬롯을 `None`으로 비우는 삭제가 다른 키의 탐색을 실패하게 만드는 예를 들고, 묘비가 이 문제를 어떻게 해결하는지 설명하라.

   <details>
   <summary>정답</summary>

   크기 7인 테이블에 10, 3, 17을 넣으면 세 키 모두 홈 슬롯이 3이어서 슬롯 3, 4, 5에 놓인다. 키 3을 지우며 슬롯 4를 비우면, `get(17)`은 슬롯 3에서 출발해 비어 있는 슬롯 4에서 멈추고 17이 없다고 답한다. 17이 삽입될 때는 슬롯 4가 차 있었기 때문에 슬롯 5까지 갔는데, 그 경로가 끊긴 것이다. 묘비를 남기면 탐색은 묘비를 차 있는 슬롯처럼 지나쳐 슬롯 5에서 17을 찾는다. 삽입은 묘비 자리를 재사용할 수 있으므로 공간도 낭비되지 않는다.

   </details>

4. 4.2절의 `put`은 묘비를 만나도 바로 새 키를 쓰지 않고 조사를 계속한다. 그 이유를 설명하라.

   <details>
   <summary>정답</summary>

   넣으려는 키가 그 묘비보다 뒤쪽의 조사 수열에 이미 있을 수 있기 때문이다. 묘비는 그 키가 삽입된 뒤에 앞쪽의 다른 키가 삭제되어 생길 수 있다. 첫 묘비에 바로 쓰면 같은 키가 두 슬롯에 생기고, 이후의 `get`은 앞쪽의 새 값을, `delete` 뒤의 `get`은 뒤쪽의 옛 값을 돌려주어 테이블이 일관성을 잃는다. 그래서 빈 슬롯에 이르러 키가 없음을 확인하거나 같은 키를 찾을 때까지 조사하고, 키가 없을 때만 처음 만난 묘비에 넣는다.

   </details>

5. 5.2절의 측정에서 분리 연쇄법의 실패한 탐색 평균 비교 수가 부하율과 거의 같은 이유를 설명하라. 선형 조사의 실패한 탐색이 균등 해싱의 $`1/(1-\alpha)`$보다 큰 이유는 무엇인가?

   <details>
   <summary>정답</summary>

   실패한 탐색은 키의 버킷 하나의 체인을 끝까지 비교하므로 비교 수는 그 체인의 길이이다. 키가 버킷에 고르게 퍼지면 체인의 평균 길이는 n/m, 곧 부하율이므로 평균 비교 수도 부하율과 같아진다. 균등 해싱 가정은 키마다 조사 수열이 서로 독립적으로 정해진다고 보지만, 선형 조사에서는 홈 슬롯이 다른 키도 같은 연속 블록을 따라 조사한다. 차 있는 슬롯이 긴 군집을 이루면 그 군집 어디로 해시되든 군집 끝까지 확인해야 하므로, 조사 수가 독립적인 수열의 경우보다 길어지고 부하율이 높을수록 차이가 커진다.

   </details>

6. 문자 코드 합 해시 함수에서 `listen`, `silent`, `enlist`가 같은 버킷에 들어가는 이유를 설명하고, 문자의 순서를 반영하도록 바꾸는 방법을 제시하라.

   <details>
   <summary>정답</summary>

   덧셈은 교환 법칙이 성립하므로 같은 문자들로 이루어진 문자열은 순서와 관계없이 문자 코드의 합이 같다. 세 단어는 모두 e, i, l, n, s, t로 이루어져 합이 655이고, 따라서 어떤 테이블 크기에서도 같은 버킷에 들어간다. 위치마다 다른 가중치를 주면 순서가 반영된다. 예를 들어 `h = 0`에서 시작해 문자마다 `h = h * 31 + ord(c)`로 갱신하는 다항식 해시는 같은 문자라도 앞에 놓일수록 큰 거듭제곱이 곱해지므로 `listen`과 `silent`의 값이 달라진다.

   </details>

---

<br>

## 참고 문헌

1. Python Software Foundation, "Data model," *The Python Language Reference*. https://docs.python.org/3/reference/datamodel.html
2. Python Software Foundation, "Built-in Types," *The Python Standard Library*. https://docs.python.org/3/library/stdtypes.html
