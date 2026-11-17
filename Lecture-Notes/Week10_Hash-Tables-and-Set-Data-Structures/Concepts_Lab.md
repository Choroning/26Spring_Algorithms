# Week 10 Lab — Hash Tables and Applications

[Repository Guide](../../README.md) | [English](Concepts_Lab.md) | [한국어](Concepts_Lab.ko.md)

> **Last Updated:** 2026-11-18

> **Learning Objectives:**
> 1. Implement insertion, lookup, deletion, and the load factor computation of a hash table that resolves collisions by separate chaining
> 2. Implement a hash table that resolves collisions by linear probing and trace its probe sequences
> 3. Explain why a deletion that empties a slot breaks searches in open addressing, and implement deletion with tombstones
> 4. Compare separate chaining and open addressing in terms of memory, load factor, clustering, cache performance, and deletion
> 5. Compare the running times of sequential list search and hash table lookup, and explain applications of hash tables

---

## Table of Contents

- [1. Overview](#1-overview)
  - [1.1 Lab Goals](#11-lab-goals)
  - [1.2 Lab Structure](#12-lab-structure)
  - [1.3 Environment](#13-environment)
- [2. Exercise 1: Chaining Hash Table](#2-exercise-1-chaining-hash-table)
  - [2.1 Problem](#21-problem)
  - [2.2 Solution Code](#22-solution-code)
  - [2.3 Example Run](#23-example-run)
- [3. Exercise 2: Linear Probing Hash Table](#3-exercise-2-linear-probing-hash-table)
  - [3.1 Problem](#31-problem)
  - [3.2 Solution Code](#32-solution-code)
  - [3.3 Tracing Probe Sequences](#33-tracing-probe-sequences)
  - [3.4 A Full Table](#34-a-full-table)
- [4. Deletion and Tombstones in Open Addressing](#4-deletion-and-tombstones-in-open-addressing)
  - [4.1 The Problem with Emptying a Slot](#41-the-problem-with-emptying-a-slot)
  - [4.2 An Implementation with Tombstones](#42-an-implementation-with-tombstones)
- [5. Separate Chaining versus Open Addressing](#5-separate-chaining-versus-open-addressing)
  - [5.1 Six Aspects](#51-six-aspects)
  - [5.2 Probe Counts by Load Factor](#52-probe-counts-by-load-factor)
- [6. Applications of Hash Tables](#6-applications-of-hash-tables)
  - [6.1 The Character-Sum Hash Function](#61-the-character-sum-hash-function)
  - [6.2 Hash-Based Features](#62-hash-based-features)
  - [6.3 Sequential Search versus Hash Lookup](#63-sequential-search-versus-hash-lookup)
- [Summary](#summary)
- [Self-Check Questions](#self-check-questions)
- [References](#references)

---

<br>

## 1. Overview

> **Note:** The theory of hash functions, collisions, load factor, and rehashing is covered in the [Week 10 lecture](Concepts_Lecture.md). This lab implements two collision resolution methods and observes how they behave.

### 1.1 Lab Goals

- Implement a **separate chaining** hash table that resolves collisions with chains.
- Implement a **linear probing** hash table that checks the following slots one by one on a collision.
- Compare deletion, load factor, clustering, and probe counts of the two methods.
- Measure the performance difference between a lookup feature that uses a hash table and one that uses a list.

### 1.2 Lab Structure

| Part | Topic |
|:-----|:-----|
| **Exercise 1** | Chaining hash table |
| **Exercise 2** | Linear probing hash table |
| **Comparison** | Separate chaining versus open addressing, probe counts by load factor |
| **Applications** | Computing a hash function, hash-based lookup features, running times of sequential search and hash lookup |

*Table 1. Lab structure and topics*

### 1.3 Environment

All code uses only the Python 3 standard library. The reference web application that shows hash tables at work (the Hash Table Explorer) runs on FastAPI and uvicorn, and its core algorithms are covered as code in Sections 5.2 and 6.

---

<br>

## 2. Exercise 1: Chaining Hash Table

### 2.1 Problem

**Goal:** Implement a hash table that resolves collisions by **separate chaining**. Each bucket holds a list (chain) of the key-value pairs hashed to that bucket.

**Requirements:**

- `put(key, value)`: insert the key if it is absent, and update its value if it is present.
- `get(key)`: return the value for the key, or `None` if the key is absent.
- `delete(key)`: remove the key-value pair.
- `load_factor()`: return the load factor `count / size`.

```text
Table size = 7
put("apple", 3)  -> bucket[hash("apple") % 7]
put("banana", 5) -> same or different bucket?
```

Whether the two keys land in the same bucket depends on whether `hash("apple") % 7` equals `hash("banana") % 7`. If they are equal, the two pairs sit one after the other in one chain; otherwise each goes to a different chain. In either case, `get` scans only the chain of the key's single bucket.

### 2.2 Solution Code

```python
class HashTableChaining:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]   # An empty list (chain) per bucket
        self.count = 0                           # Number of stored key-value pairs

    def _hash(self, key):
        return hash(key) % self.size             # Bucket number in 0 to size-1

    def put(self, key, value):
        idx = self._hash(key)
        for i, (k, v) in enumerate(self.table[idx]):
            if k == key:
                self.table[idx][i] = (key, value)  # Same key present: update the value only
                return
        self.table[idx].append((key, value))        # New key: append to the end of the chain
        self.count += 1

    def get(self, key):
        idx = self._hash(key)
        for k, v in self.table[idx]:
            if k == key:
                return v
        return None                                 # None if not found by the end of the chain

    def delete(self, key):
        idx = self._hash(key)
        for i, (k, v) in enumerate(self.table[idx]):
            if k == key:
                self.table[idx].pop(i)              # Remove only that pair from the chain
                self.count -= 1
                return True
        return False

    def load_factor(self):
        return self.count / self.size               # Load factor = n / m
```

- **`_hash`:** The value of Python's built-in `hash()` modulo the table size serves as the bucket number.
- **`put`:** It scans the bucket's chain from the start; if it finds the same key, it replaces that pair with the new value, and if it reaches the end without finding it, it appends the pair. The chain must be scanned before inserting so that the same key is never stored twice.
- **`get`:** It scans only one bucket's chain, so its cost is proportional to the length of that chain.
- **`delete`:** Removing that pair from the chain is all it takes, so it does not affect searches for other keys. This is where it differs from open addressing in Section 4.
- **`load_factor`:** The number of stored pairs n divided by the number of buckets m, which equals the average chain length.

### 2.3 Example Run

Hash values of string keys differ from one Python process to another [1], so the run uses integer keys to make the bucket layout reproducible. The hash value of a small nonnegative integer k is k itself [2], so in a table of size 7 key k goes to bucket `k % 7`.

```python
ht = HashTableChaining(size=7)
for key, value in [(10, "A"), (3, "B"), (17, "C"), (24, "D"), (5, "E")]:
    ht.put(key, value)
for i, bucket in enumerate(ht.table):
    print(i, bucket)
print("load factor:", round(ht.load_factor(), 3))

ht.put(17, "C2")                  # Update: count stays the same
print(ht.get(17), ht.get(31))     # 31 is also bucket 3 but not in the chain
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

- 10, 3, 17, and 24 all leave remainder 3 when divided by 7, so they sit in bucket 3's chain in insertion order. Only key 5 goes to bucket 5.
- The load factor is 5 / 7 ≈ 0.714. The average chain length is 0.714, but bucket 3's chain has length 4. Even with a low load factor, a search in a bucket becomes slow when keys pile up in it.
- `put(17, "C2")` updates the existing pair, so `count` does not grow. `get(31)` compares all four elements of bucket 3's chain and then returns `None`.
- The first `delete(3)` removes the pair and returns `True`; the second call returns `False` because the key is already gone. After the deletion the load factor is 4 / 7 ≈ 0.571.

---

<br>

## 3. Exercise 2: Linear Probing Hash Table

### 3.1 Problem

**Goal:** Implement a hash table that resolves collisions by **linear probing**. Linear probing is a form of open addressing that stores every pair directly in the table array.

**Requirements:**

- `put(key, value)`: if slot `h(key)` is occupied by a different key, check `h(key)+1`, `h(key)+2`, ... in turn and store the pair in an empty slot.
- `get(key)`: follow the same probe sequence to find the key.
- Raise an exception when the table is full.

```text
Table size = 7
put("apple")  -> slot 3
put("banana") -> slot 3 occupied, try slot 4
```

### 3.2 Solution Code

```python
class HashTableProbing:
    def __init__(self, size=10):
        self.size = size
        self.keys = [None] * size       # None means an empty slot
        self.values = [None] * size
        self.count = 0

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        if self.count >= self.size:
            raise Exception("Hash table is full")
        idx = self._hash(key)
        while self.keys[idx] is not None and self.keys[idx] != key:
            idx = (idx + 1) % self.size   # Linear probing: go to the next slot
        if self.keys[idx] is None:
            self.count += 1               # An empty slot means a new key
        self.keys[idx] = key
        self.values[idx] = value

    def get(self, key):
        idx = self._hash(key)
        start = idx
        while self.keys[idx] is not None:
            if self.keys[idx] == key:
                return self.values[idx]
            idx = (idx + 1) % self.size
            if idx == start:              # Stop after one full lap
                break
        return None                       # An empty slot means the key is absent

    def load_factor(self):
        return self.count / self.size
```

- Keys and values are kept at the same index of the two arrays `keys` and `values`. There are no chains, so no per-element pointers are needed.
- The `while` condition in `put` means "keep probing while the slot is held by a different key." The loop stops at an empty slot or at a slot holding the same key, and `count` grows only for an empty slot.
- `(idx + 1) % self.size` wraps around to slot 0 after the last slot, so the probe sequence is circular.
- Since `put` first checks `count >= size`, at least one empty slot exists whenever `count < size`, and the `while` loop terminates.
- `get` stops when it meets an empty slot. When key k was inserted, it took a place in its probe sequence before reaching an empty slot, so if a search meets an empty slot, k is not in the table. This reasoning relies on the assumption that an occupied slot never becomes empty again, and Section 4 examines how this assumption conflicts with deletion.

### 3.3 Tracing Probe Sequences

Insert keys 10, 3, 17, and 5 in order into a table of size 7.

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

| Operation | Home slot `k % 7` | Slots checked | Result |
|:-----|:-----|:-----|:-----|
| `put(10)` | 3 | 3 | Stored in slot 3 |
| `put(3)` | 3 | 3, 4 | Stored in slot 4 |
| `put(17)` | 3 | 3, 4, 5 | Stored in slot 5 |
| `put(5)` | 5 | 5, 6 | Stored in slot 6 |
| `get(17)` | 3 | 3, 4, 5 | Found in slot 5 |
| `get(24)` | 3 | 3, 4, 5, 6, 0 | Absent, slot 0 empty |

*Table 2. Insertions and searches with linear probing in a table of size 7*

Key 5 has home slot 5, but key 17, which overflowed from home slot 3, already occupies slot 5, so key 5 is pushed to slot 6. This phenomenon, in which a contiguous block absorbs even keys with different hash values and keeps growing, is **primary clustering**. Because of the cluster in slots 3-6, `get(24)` concludes that the key is absent only after checking five slots.

### 3.4 A Full Table

Inserting keys 0, 1, and 2 next fills the table.

```python
for key in [0, 1, 2]:
    ht.put(key, "X")
print(ht.keys, ht.load_factor())
print(ht.get(24))                         # No empty slot, so it goes one full lap
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

- Once the load factor reaches 1.0 there is no empty slot, so `get(24)` cannot stop at an empty slot. The check that stops when the probe returns to `start` is what prevents an infinite loop.
- The load factor of open addressing cannot exceed 1. The new key 9 has no place to go, so the exception is correct.

> **Note:** **Updating an existing key.** Key 10 is already in slot 3, so `put(10, "new")` is an update that needs no new slot, yet the `put` of Section 3.2 raises an exception because it checks `count >= size` before probing. To allow updates even when the table is full, the method must first probe and change the value if it finds the same key, and check whether the table is full only when it needs an empty slot. The implementation in Section 4.2 follows this order.

---

<br>

## 4. Deletion and Tombstones in Open Addressing

### 4.1 The Problem with Emptying a Slot

In separate chaining, deletion is finished once a pair is removed from its chain, but in open addressing simply setting a slot to `None` makes keys that settled beyond that slot unreachable. Insert keys 10, 3, and 17, then empty slot 4, where key 3 was.

```python
ht = HashTableProbing(size=7)
for key, value in [(10, "A"), (3, "B"), (17, "C")]:
    ht.put(key, value)
ht.keys[4] = ht.values[4] = None     # Delete key 3 by emptying slot 4
ht.count -= 1
print(ht.keys, ht.get(17))
```

```text
[None, None, None, 10, None, 17, None]
None
```

Key 17 is still in slot 5, but `get(17)` starts at home slot 3, sees that slot 4 is empty, and concludes that the key is absent. The reasoning "meeting an empty slot means the key is absent," on which the `get` of Section 3.2 relies, has been broken by the deletion.

> **Definition:** A **tombstone** is a marker left in a deleted slot in open addressing. A search passes over a tombstone as if the slot were occupied and keeps probing, while an insertion may reuse the tombstone's slot for a new key.

### 4.2 An Implementation with Tombstones

The following implementation inherits the class of Section 3.2 and redefines `put`, `get`, and `delete` to use tombstones.

```python
DELETED = object()                    # Tombstone: a marker equal to no key

class HashTableTombstone(HashTableProbing):
    def put(self, key, value):
        idx = self._hash(key)
        first_free = None                 # Position of the first tombstone met
        for _ in range(self.size):
            k = self.keys[idx]
            if k is None:                 # Empty slot: the key is not in the table
                if first_free is None:
                    first_free = idx
                break
            if k is DELETED:
                if first_free is None:
                    first_free = idx      # Remember a reuse candidate and keep probing
            elif k == key:
                self.values[idx] = value  # Existing key: update the value only
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
                return None               # Stop the search only at an empty slot
            if k is not DELETED and k == key:
                return self.values[idx]
            idx = (idx + 1) % self.size   # Pass over tombstones and keep probing
        return None

    def delete(self, key):
        idx = self._hash(key)
        for _ in range(self.size):
            k = self.keys[idx]
            if k is None:
                return False
            if k is not DELETED and k == key:
                self.keys[idx] = DELETED  # Leave a tombstone instead of emptying the slot
                self.values[idx] = None
                self.count -= 1
                return True
            idx = (idx + 1) % self.size
        return False
```

- **`DELETED = object()`:** A freshly created object is equal only to itself, so it is a marker that cannot be confused with any key a user inserts. It is compared with `is`.
- **`get` and `delete`:** They stop only at an empty slot (`None`) and pass over tombstones. Limiting the loop to `size` iterations makes them terminate even in a table filled only with keys and tombstones and no empty slot.
- **`put`:** On meeting a tombstone, it does not write there at once; it only remembers the position and continues probing, because the same key may lie beyond the tombstone. If it finds the same key, it updates it; once it reaches an empty slot and the key is known to be absent, it stores the pair in the first tombstone met (or in that empty slot if there was none).

```python
def show(t):
    return ["T" if k is DELETED else k for k in t.keys]

ht = HashTableTombstone(size=7)
for key, value in [(10, "A"), (3, "B"), (17, "C")]:
    ht.put(key, value)
print(ht.delete(3), show(ht), ht.get(17))
ht.put(17, "C2")                      # Finds 17 beyond the tombstone and updates it
ht.put(24, "D")                       # 24 goes into the tombstone's place (slot 4)
print(show(ht), ht.get(17), ht.get(24), ht.count)
```

```text
True [None, None, None, 10, 'T', 17, None] C
[None, None, None, 10, 24, 17, None] C2 D 3
```

- Slot 4, from which key 3 was deleted, keeps the tombstone `T`, so `get(17)` passes slot 4 and finds 17 in slot 5.
- `put(17, "C2")` remembers the tombstone in slot 4 as a candidate, but finds the same key in slot 5 and updates it there.
- `put(24, "D")` checks slots 3, 4, 5, and 6, confirms that 24 is absent because slot 6 is empty, and stores it in slot 4, the first tombstone met.

> **Caution:** An insertion that writes a new key as soon as it meets a tombstone creates duplicate keys. In the state above, such a `put(17, "C2")` stores another 17 in slot 4 while the old 17 in slot 5 remains. If a later `delete(17)` removes only the 17 in slot 4, `get(17)` returns the old value in slot 5 again.

Tombstones keep searches correct, but as deletions and insertions repeat, tombstones accumulate and lengthen the probes a search makes before reaching an empty slot. Real implementations therefore rehash the table and remove all tombstones once the occupied fraction, tombstones included, exceeds a threshold.

---

<br>

## 5. Separate Chaining versus Open Addressing

### 5.1 Six Aspects

| Aspect | Separate chaining | Open addressing |
|:-----|:-----|:-----|
| Collision handling | Linked list (chain) per bucket | Probe to the next slot |
| Memory | Extra pointer per element | Compact single array |
| Load factor | Can exceed 1.0 | Cannot exceed 1.0 (1.0 when full) |
| Clustering | None | Present (primary clustering of linear probing) |
| Cache performance | Poor (pointer chasing) | Good (contiguous memory) |
| Deletion | Simple | Tombstones needed |

*Table 3. Comparison of separate chaining and open addressing*

- **Load factor:** Chains can grow without limit, so separate chaining works even with more keys than buckets. In open addressing each key occupies one slot, so the number of keys cannot exceed the number of slots, and as the load factor approaches 1 the probe count rises sharply as in Section 5.2, so the table must be rehashed before that.
- **Clustering:** In separate chaining, a long chain in one bucket does not affect searches in other buckets. In linear probing, keys with a different home slot are also absorbed into a cluster, like key 5 in Section 3.3.
- **Cache performance:** Chain nodes are scattered across memory, so following a node rarely hits the cache. Linear probing reads neighboring slots in order, so a cache line fetched once serves several slots.
- **Deletion:** As shown in Section 4, deletion in open addressing needs tombstones for searches to stay correct.

### 5.2 Probe Counts by Load Factor

Like the collision resolution comparison of the Hash Table Explorer, the same random keys are inserted into a table of each method, and the number of elements checked per search is counted. Integer keys are inserted into a table of size 1009 (a prime) up to load factors 0.25, 0.5, 0.75, and 0.9; successful searches are averaged over all stored keys and unsuccessful searches over 2,000 keys that are not stored.

```python
import random

def chain_probes(m, keys, queries):
    table = [[] for _ in range(m)]
    for k in keys:
        table[k % m].append(k)
    hit = sum(table[k % m].index(k) + 1 for k in keys) / len(keys)   # Elements compared until found
    miss = sum(len(table[q % m]) for q in queries) / len(queries)    # Compare the whole chain
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
        return n                                                     # Number of slots checked
    hit = sum(probes(k) for k in keys) / len(keys)
    miss = sum(probes(q) for q in queries) / len(queries)
    return hit, miss

random.seed(2026)
m = 1009                                      # Table size (a prime)
print(" alpha | chain hit | chain miss | probe hit | probe miss | 1/(1-alpha)")
for alpha in [0.25, 0.5, 0.75, 0.9]:
    n = int(alpha * m)
    pool = random.sample(range(10**7), n + 2000)
    keys, queries = pool[:n], pool[n:]        # queries are keys not in the table
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

- **Separate chaining:** An unsuccessful search compares one whole chain, so the average number of comparisons is almost the same as the average chain length, that is, the load factor $`\alpha`$. A successful search averages 1.43 comparisons even at load factor 0.9, growing only gently as the load factor rises.
- **Linear probing:** Up to load factor 0.5 it differs little from separate chaining, but an unsuccessful search averages 8.15 probes at 0.75 and 44.49 at 0.9, a sharp increase.
- **Last column:** The value $`1/(1-\alpha)`$ seen in Section 3.1 of the Week 10 lecture is the expected probe count under the uniform hashing assumption, in which each key's probe sequence is equally likely to be any permutation of the slots. Unsuccessful searches with linear probing exceed this value at every load factor, and the gap widens as the load factor grows, because primary clustering makes probe sequences overlap.

> **Key Point:** Linear probing is fast at low load factors because it is cache-friendly, but as the load factor approaches 1, clustering makes the probe count explode. Open addressing therefore rehashes to keep the load factor at about 0.7 or below.

---

<br>

## 6. Applications of Hash Tables

### 6.1 The Character-Sum Hash Function

The Hash Table Explorer uses a deterministic hash function that gives the same value on every run, so that it can show a fixed bucket layout on screen. An integer key maps to `k mod m`, and a string key maps to the sum of its character codes modulo `m`.

```python
def char_sum_hash(key, size):
    if isinstance(key, int):
        return key % size                       # Integer key: k mod m
    return sum(ord(c) for c in str(key)) % size # String key: sum of character codes mod m

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

This function is easy to follow by hand, but it is not a good hash function. Addition ignores order, so anagrams made of the same letters (`listen`, `silent`, `enlist`) all hash to the same value. Moreover, the character-code sums of short English words crowd into a narrow range of a few hundred to a little over 1,000, so in a larger table only the slots in that range are used. Real hash functions reflect order and spread values widely, as a polynomial hash does by multiplying each character by a weight that depends on its position.

### 6.2 Hash-Based Features

Features that must find a value directly from a key are implemented with a hash table (a Python `dict`). The following are examples by web application topic.

| Topic | Hash table feature |
|:-----|:-----|
| Shopping mall | Direct product lookup by product ID, shopping cart caching |
| Social network | Mapping user IDs to user information, session management |
| Campus map | Mapping building names to coordinates |

*Table 4. Hash table features by web application topic*

The phone book of the Hash Table Explorer is another such example: it adds, looks up, and removes contacts in a separate chaining hash table whose keys are names and whose values are phone numbers. All three examples are the Map abstract data type of Section 4.1 of the Week 10 lecture, and they share the property that order is not needed and most operations are exact lookups by key.

### 6.3 Sequential Search versus Hash Lookup

Keep n products in both a list and a hash table, and time 1,000 lookups of random product IDs in each.

```python
import random
import time

def measure(n, lookups=1000):
    products = [{"id": i, "name": f"Product {i}"} for i in range(n)]
    product_hash = {p["id"]: p for p in products}      # id -> product
    targets = [random.randrange(n) for _ in range(lookups)]

    start = time.perf_counter()
    for t in targets:                                   # Sequential list search: O(n)
        result = next((p for p in products if p["id"] == t), None)
    list_time = time.perf_counter() - start

    start = time.perf_counter()
    for t in targets:                                   # Hash table lookup: O(1) on average
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

- `time.perf_counter()` is a high-resolution clock suited to timing short intervals. The measured values vary with the computer and the moment of execution, but the growth trend is the same.
- The list search time grows about tenfold each time n grows tenfold, following O(n). A random target lies around the middle of the list on average, so each lookup compares about n/2 elements.
- Hash lookup takes about 0.4 ms for 1,000 lookups even at n = 100,000. Its slight growth with n can be attributed to memory access costs that asymptotic analysis does not count, namely the growing part of the table that does not fit in the CPU cache as the table gets larger.
- The speed gap widens as n grows. The more data a service holds, the more the choice of data structure determines its response time.

---

<br>

## Summary

| Concept | Key Summary |
|:-----|:-----|
| Separate chaining implementation | Each bucket keeps a list; the chain is scanned before insertion so that an existing key is updated, and deletion removes only that pair from the chain. |
| Linear probing implementation | If the home slot holds a different key, the following slots are checked circularly, and a search stops at an empty slot. |
| A full table | The load factor of open addressing cannot exceed 1, and when there is no empty slot a check that stops after one full lap is needed. |
| Primary clustering | In linear probing, a contiguous block grows by absorbing even keys with different home slots, lengthening searches. |
| Tombstone | Deletion in open addressing leaves a tombstone instead of emptying the slot; searches pass over it, and insertions reuse it after confirming the key is absent. |
| Comparing the two methods | Separate chaining allows load factors above 1 and simple deletion, while open addressing is compact and cache-friendly but sensitive to the load factor. |
| Probe counts | An unsuccessful search with linear probing averages more than 44 probes at load factor 0.9, far above the uniform hashing value $`1/(1-\alpha)`$. |
| Hash function quality | The character-sum hash makes all anagrams collide and crowds its values into a narrow range, so real hash functions reflect the order of characters. |
| Applications | Features that find products, users, or buildings by ID are implemented with hash tables, which at n = 100,000 are thousands of times faster than list search. |

---

<br>

## Self-Check Questions

1. Why does the `put` of separate chaining scan the whole chain before appending a new pair? Without this check, how would `get` and `delete` behave?

   <details>
   <summary>Answer</summary>

   The purpose is to change only the value when the same key already exists, so that each key is stored in the table only once. Without the check, `put(17, "C2")` after `put(17, "C")` appends another `(17, "C2")` to the same chain. `get(17)` scans the chain from the front and returns the old value `"C"` it meets first, so the update is invisible, and `delete(17)` removes only the front pair, so `get(17)` still returns `"C2"` after the deletion. `count` also exceeds the real number of keys, which distorts the load factor.

   </details>

2. If keys 4, 11, 18, and 5 are inserted in order into a linear probing table of size 7, which slot does each key occupy? How many slots does `get(25)` then check?

   <details>
   <summary>Answer</summary>

   The home slots of the four keys are 4, 4, 4, and 5. Key 4 goes to slot 4, 11 goes to slot 5 because slot 4 is occupied, and 18 passes slots 4 and 5 and goes to slot 6. Key 5's home slot 5 is already held by 11 and slot 6 is also occupied, so it wraps around and goes to slot 0. The home slot of 25 is 25 % 7 = 4, so `get(25)` checks slots 4, 5, 6, and 0, and concludes the key is absent because slot 1 is empty. It checks 5 slots. That key 5 is pushed two places from its home slot and that `get(25)` checks five slots are both consequences of primary clustering.

   </details>

3. Give an example in which a deletion that sets a slot to `None` in open addressing makes a search for another key fail, and explain how tombstones solve this problem.

   <details>
   <summary>Answer</summary>

   Inserting 10, 3, and 17 into a table of size 7 places them in slots 3, 4, and 5, since all three have home slot 3. If key 3 is deleted by emptying slot 4, `get(17)` starts at slot 3, stops at the empty slot 4, and reports that 17 is absent. When 17 was inserted, slot 4 was occupied, which is why it went on to slot 5, and that path has now been cut. With a tombstone left behind, a search passes over it as if the slot were occupied and finds 17 in slot 5. Insertions can reuse the tombstone's slot, so no space is wasted either.

   </details>

4. The `put` of Section 4.2 does not write the new key as soon as it meets a tombstone but keeps probing. Explain why.

   <details>
   <summary>Answer</summary>

   The key being inserted may already exist further along the probe sequence than the tombstone. A tombstone can appear when some other key ahead of it is deleted after that key was inserted. Writing into the first tombstone at once would create the same key in two slots; later `get` calls would return the new value in front, and a `get` after a `delete` would return the old value behind, leaving the table inconsistent. Therefore the probe continues until it reaches an empty slot, which confirms the key is absent, or finds the same key, and the pair goes into the first tombstone met only when the key is absent.

   </details>

5. In the measurements of Section 5.2, explain why the average number of comparisons for an unsuccessful search in separate chaining is almost the same as the load factor. Why do unsuccessful searches with linear probing exceed the uniform hashing value $`1/(1-\alpha)`$?

   <details>
   <summary>Answer</summary>

   An unsuccessful search compares the whole chain of the key's one bucket, so the number of comparisons is that chain's length. When keys spread evenly over the buckets, the average chain length is n/m, the load factor, so the average number of comparisons equals the load factor too. The uniform hashing assumption treats each key's probe sequence as chosen independently of the others, but in linear probing keys with different home slots probe along the same contiguous block. When occupied slots form a long cluster, a key hashing anywhere into it must check up to the end of the cluster, so the probe count is longer than with independent sequences, and the gap grows with the load factor.

   </details>

6. Explain why `listen`, `silent`, and `enlist` land in the same bucket under the character-sum hash function, and suggest a way to make the hash reflect the order of characters.

   <details>
   <summary>Answer</summary>

   Addition is commutative, so strings made of the same characters have the same sum of character codes regardless of order. The three words all consist of e, i, l, n, s, and t, whose sum is 655, so they land in the same bucket for every table size. Giving each position a different weight makes the hash reflect order. For example, a polynomial hash that starts from `h = 0` and updates `h = h * 31 + ord(c)` for each character multiplies the same character by a higher power the earlier it appears, so `listen` and `silent` get different values.

   </details>

---

<br>

## References

1. Python Software Foundation, "Data model," *The Python Language Reference*. https://docs.python.org/3/reference/datamodel.html
2. Python Software Foundation, "Built-in Types," *The Python Standard Library*. https://docs.python.org/3/library/stdtypes.html
