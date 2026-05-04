# Week 9 Lecture — Search Trees

> **Last Modified:** 2026-05-04
>
> **Prerequisites**: Week 2: Asymptotic notation and complexity analysis (used to bound tree heights). Week 3: Binary search on sorted arrays (BST is its tree-shaped analogue). Week 4: Master Theorem and recursive complexity (used to derive traversal and search costs). Basic recursion and pointer-based data structures.
>
> **Learning Objectives**:
> 1. Define a tree recursively and derive tree traversal complexity using the Master Theorem
> 2. Implement search, insert, and delete on a Binary Search Tree (BST) and analyze average and worst case
> 3. Explain why a BST can degrade to $O(n)$ when input is sorted
> 4. State the five Red-Black Tree (RBT) properties and explain how they guarantee $O(\log n)$ height
> 5. Resolve a Double-Red violation using **Restructuring** (uncle black) or **Recoloring** (uncle red)
> 6. Motivate B-Trees from the disk I/O cost model and describe how wide, shallow nodes minimize disk reads
> 7. Execute B-Tree search, insertion (with split), and deletion (borrow/merge)
> 8. Compare BST, RBT, and B-Tree across height, operation cost, and intended use case

---

## Table of Contents

- [1. Tree Fundamentals](#1-tree-fundamentals)
  - [1.1 Recursive Definition of a Tree](#11-recursive-definition-of-a-tree)
  - [1.2 Tree Traversal Complexity](#12-tree-traversal-complexity)
- [2. Binary Search Trees (BST)](#2-binary-search-trees-bst)
  - [2.1 BST — The Idea](#21-bst--the-idea)
  - [2.2 BST Search](#22-bst-search)
  - [2.3 BST Insertion](#23-bst-insertion)
  - [2.4 BST Search/Insert — Average Case](#24-bst-searchinsert--average-case)
  - [2.5 BST Worst Case — The Problem](#25-bst-worst-case--the-problem)
  - [2.6 BST Deletion — Three Cases](#26-bst-deletion--three-cases)
  - [2.7 BST Deletion — Complexity](#27-bst-deletion--complexity)
- [3. Red-Black Trees (RBT)](#3-red-black-trees-rbt)
  - [3.1 RBT — Motivation](#31-rbt--motivation)
  - [3.2 RBT — Five Properties](#32-rbt--five-properties)
  - [3.3 Why RBT Guarantees O(log n)](#33-why-rbt-guarantees-olog-n)
  - [3.4 RBT Insertion — Overview](#34-rbt-insertion--overview)
  - [3.5 Double Red — Terminology](#35-double-red--terminology)
  - [3.6 Case 1 — Restructuring (Uncle is Black)](#36-case-1--restructuring-uncle-is-black)
  - [3.7 Case 2 — Recoloring (Uncle is Red)](#37-case-2--recoloring-uncle-is-red)
  - [3.8 RBT — Worked Example](#38-rbt--worked-example)
  - [3.9 RBT — Operation Complexities](#39-rbt--operation-complexities)
- [4. B-Trees](#4-b-trees)
  - [4.1 B-Tree — Motivation: The Disk I/O Problem](#41-b-tree--motivation-the-disk-io-problem)
  - [4.2 B-Tree — The Idea](#42-b-tree--the-idea)
  - [4.3 B-Tree — Search](#43-b-tree--search)
  - [4.4 B-Tree — Insertion (No Split)](#44-b-tree--insertion-no-split)
  - [4.5 B-Tree — Insertion (With Split)](#45-b-tree--insertion-with-split)
  - [4.6 B-Tree — Deletion Overview](#46-b-tree--deletion-overview)
  - [4.7 B-Tree — Deletion Leaf Cases](#47-b-tree--deletion-leaf-cases)
- [5. BST vs RBT vs B-Tree](#5-bst-vs-rbt-vs-b-tree)
- [Summary](#summary)
- [Self-Check Questions](#self-check-questions)

---

<br>

## 1. Tree Fundamentals

### 1.1 Recursive Definition of a Tree

A **tree** is a root node together with zero or more **subtrees** — a recursive structure.

```
            [A]                   "A tree of n nodes
           / | \                   = root + subtrees"
         /   |   \
       [B]  [C]  [D]             Each subtree is itself
       / \       / | \           a smaller tree.
     [E] [F]   [G][H][I]
```

**Key insight:** the "repetition of partial structure" lets us implement tree algorithms with **recursion**.

- Same principle as **divide and conquer**: split into subproblems (subtrees), solve each, combine
- Almost every tree algorithm in this lecture is a one-line recursion plus a base case

### 1.2 Tree Traversal Complexity

For a **balanced** binary tree with $n$ nodes, traversal visits every node exactly once:

$$T(n) = 2T(n/2) + O(1)$$

- $2T(n/2)$: traverse left and right subtrees (each $\approx n/2$ nodes)
- $O(1)$: visit the root

**Master Theorem:** $a = 2,\ b = 2,\ f(n) = O(1)$. Compare $f(n)$ with $n^{\log_b a} = n^1$.

Since $f(n) = O(n^0)$ and $0 < 1$, this is **Case 1**:

$$T(n) = \Theta(n)$$

> **Lower bound argument:** Any traversal must inspect every node at least once, so $\Omega(n)$ is unavoidable. The Master Theorem confirms $\Theta(n)$ is also achievable.

---

<br>

## 2. Binary Search Trees (BST)

### 2.1 BST — The Idea

A BST is a binary tree that maintains a **sorted order**:

$$\text{left subtree} < \text{root} < \text{right subtree}$$

```
              [15]
             /    \
          [6]      [18]
         /   \     /   \
       [3]  [7]  [17] [20]
       / \    \
     [2] [4] [13]
              /
            [9]
```

**BST property** for every node $x$:
- All keys in the **left** subtree $< x.\text{key}$
- All keys in the **right** subtree $> x.\text{key}$

> **Connection to binary search:** at each step we eliminate half of the remaining search space — the same idea that gave binary search $O(\log n)$ on a sorted array.

### 2.2 BST Search

```
TREE-SEARCH(x, k):
    if x = NIL or k = x.key:
        return x
    if k < x.key:
        return TREE-SEARCH(x.left, k)
    else:
        return TREE-SEARCH(x.right, k)
```

**Example — search for 13:**

```
              [15]          15: 13 < 15, go left
             /    \
          [6]      [18]     6: 13 > 6, go right
         /   \
       [3]  [7]             7: 13 > 7, go right
              \
             [13]  <- found
```

At each level we make **one comparison and descend one edge**, so the cost is $O(h)$ where $h$ is the tree height.

### 2.3 BST Insertion

Insert a key $k$ by walking down as if searching for it; when we reach NIL, attach the new node as a **leaf**.

```
TREE-INSERT(T, z):
    y = NIL
    x = T.root
    while x != NIL:
        y = x
        if z.key < x.key: x = x.left
        else:             x = x.right
    z.parent = y
    if y = NIL:                T.root = z       // tree was empty
    else if z.key < y.key:     y.left  = z
    else:                      y.right = z
```

Insertion follows the same path as an unsuccessful search, then links the new node as a leaf — cost $O(h)$.

### 2.4 BST Search/Insert — Average Case

If keys are inserted in **random order**, the expected height is $\Theta(\log n)$:

$$T(n) = T(n/2) + O(1)$$

**Master Theorem:** $a = 1,\ b = 2,\ f(n) = O(1) = \Theta(n^0) = \Theta(n^{\log_b a})$. **Case 2**:

$$T(n) = \Theta(\log n)$$

So expected search and insert are both $O(\log n)$ — matching binary search on a sorted array.

### 2.5 BST Worst Case — The Problem

What if keys arrive in **sorted order**?

```
Insert: 1, 2, 3, 4, 5

    [1]
      \
      [2]
        \
        [3]
          \
          [4]
            \
            [5]
```

The tree degenerates into a **linked list**:

$$T(n) = T(n-1) + O(1) \implies T(n) = O(n)$$

| Case             | Height   | Search/Insert |
|------------------|----------|---------------|
| Average (random) | $O(\log n)$ | $O(\log n)$ |
| Worst (sorted)   | $O(n)$   | $O(n)$ |

> **Key takeaway:** plain BSTs have excellent average-case behavior but **no guarantee** against worst-case degradation. This motivates the **balanced** trees in §3 and §4.

### 2.6 BST Deletion — Three Cases

Deletion is more delicate than search or insert. Let $z$ be the node to delete.

**Case 1 — no children:** simply remove $z$.

```
    [5]          [5]
   /   \   =>   /   \
 [3]   [7]    [3]   [7]
   \
   [4]  <- delete 4
```

**Case 2 — one child:** splice $z$ out by replacing it with its only child.

```
    [5]          [5]
   /   \   =>   /   \
 [3]   [7]    [4]   [7]
   \
   [4]  <- delete 3, replaced by 4
```

**Case 3 — two children:** replace $z$'s key with its **in-order successor** (the smallest key in $z$'s right subtree), then delete the successor (which has at most one child, reducing to Case 1 or 2).

```
Delete 6:
         [15]                    [15]
        /    \                  /    \
     [6]      [18]          [7]      [18]
    /   \     /   \    =>   /  \     /   \
  [3]  [7]  [17] [20]    [3] [13]  [17] [20]
  / \    \                / \  /
[2] [4] [13]            [2][4][9]
         /
       [9]

Step 1: in-order successor of 6 = 7 (smallest in right subtree)
Step 2: replace 6's key with 7
Step 3: delete original node 7 (has at most one child)
```

> **Why successor?** The in-order successor is the next larger value, so substituting it preserves the BST property: every key in the left subtree is still less, every key in the right subtree is still greater.

### 2.7 BST Deletion — Complexity

| Step                          | Cost  |
|-------------------------------|-------|
| Find node to delete           | $O(h)$ |
| Find in-order successor       | $O(h)$ |
| Perform the structural change | $O(1)$ |

**Total:** $O(h)$.

**Summary of BST operations:**

| Operation | Average     | Worst   |
|-----------|-------------|---------|
| Search    | $O(\log n)$ | $O(n)$  |
| Insert    | $O(\log n)$ | $O(n)$  |
| Delete    | $O(\log n)$ | $O(n)$  |

---

<br>

## 3. Red-Black Trees (RBT)

### 3.1 RBT — Motivation

BST worst case is $O(n)$ — can we **guarantee** $O(\log n)$?

A **Red-Black Tree** is a BST with one extra bit per node: a **color** (red or black). Carefully chosen coloring rules force the tree to stay approximately balanced:

$$h \leq 2\log_2(n+1) = O(\log n)$$

so search, insert, and delete are all **guaranteed** $O(\log n)$ in the worst case.

### 3.2 RBT — Five Properties

Every RBT must satisfy:

| # | Property |
|---|----------|
| 1 | Every node is either **red** or **black** |
| 2 | The **root** is black |
| 3 | Every **leaf (NIL)** is black |
| 4 | If a node is **red**, both its children are **black** (no two consecutive reds) |
| 5 | For every node, all paths from that node to descendant leaves contain the **same number of black nodes** |

```
            [7:B]
           /     \
       [3:R]     [18:R]
       /   \     /    \
    [1:B] [5:B] [10:B] [22:B]
                  \
                 [15:R]

B = Black, R = Red
Property 4: red 18 has black children 10, 22  ok
Property 5: every root-to-leaf path has 2 black nodes  ok
```

### 3.3 Why RBT Guarantees O(log n)

Define the **black-height** $\text{bh}(x)$ of node $x$ as the number of black nodes on any path from $x$ down to a leaf (Property 5 makes this well-defined).

- A subtree rooted at $x$ contains at least $2^{\text{bh}(x)} - 1$ internal nodes (induction on height).
- By Property 4, on any root-to-leaf path **at least half** the nodes are black, so $\text{bh}(\text{root}) \geq h/2$.

Combining:

$$n \geq 2^{h/2} - 1 \implies h \leq 2\log_2(n+1)$$

> **Geometric reading:** the longest path (alternating red-black) is at most **twice** the shortest path (all black). The tree can lean, but only by a constant factor.

### 3.4 RBT Insertion — Overview

When inserting a new key:

1. Insert as in a normal BST (the new node becomes a leaf).
2. **Color the new node red.** This preserves Property 5 (black-height unchanged).
3. The only property that can now break is **Property 4** — a red child of a red parent. This is called the **Double Red** problem. Fix it.

```
Insert 4 into:

    [7:B]              [7:B]
   /     \            /     \
 [3:B]  [18:B]  =>  [3:B]  [18:B]
                       \
                      [4:R]   <- new node, always red

No violation here — but if 4's parent had been red, we'd need to fix up.
```

### 3.5 Double Red — Terminology

When Double Red occurs, name the relevant nodes:

```
        [G]          G = grandparent
       /   \
     [P]   [U]      P = parent,  U = uncle
     /
   [N]               N = newly inserted (red), P also red
```

The fix-up branches on the **uncle's color**:

| Uncle's color | Strategy        |
|---------------|-----------------|
| **Black**     | **Restructuring** (rotation) |
| **Red**       | **Recoloring** (color flip) |

### 3.6 Case 1 — Restructuring (Uncle is Black)

When $U$ is black, locally rotate $N$, $P$, $G$:

1. **Sort** $N, P, G$ by key.
2. The **median** becomes the new local root (colored **black**); the other two become its children (colored **red**).
3. The original subtrees are reattached in the only order consistent with the BST property.

```
Before (G=7, P=3, N=5):       After restructuring:

      [7:B]                        [5:B]
     /     \                      /     \
   [3:R]  [8:B]    =>         [3:R]   [7:R]
      \                                /
     [5:R]                          [8:B]

Sorted: 3, 5, 7
Median: 5 -> new local root (black)
Others: 3, 7 -> children (red)
```

> **Why this works:** Restructuring is a **local** operation — exactly one rotation, $O(1)$ work, and the black-height of the local root is unchanged so the fix does **not** propagate upward.

### 3.7 Case 2 — Recoloring (Uncle is Red)

When $U$ is red, swap colors:

1. $P$ and $U$ become **black**.
2. $G$ becomes **red**.
3. If $G$ is the root, force it **black**. Otherwise, $G$ may now form a new Double Red with its own parent — repeat the fix-up at $G$.

```
Before:                        After recoloring:

      [7:B]                        [7:R] <- may cause
     /     \                      /     \    new Double Red
   [3:R]  [8:R]    =>         [3:B]   [8:B]
   /                           /
 [1:R]                       [1:R]

P=3 and U=8 become black; G=7 becomes red.
If 7 is the root, force it black.
If 7's parent is also red, repeat the fix-up upward.
```

> **Why this works:** Recoloring preserves Property 5 (black count on every path through $G$ is unchanged) but may push the violation up two levels at a time. It can therefore propagate at most $O(\log n)$ times before reaching the root.

### 3.8 RBT — Worked Example

Insertion sequence: 7, 3, 8, 1, 5

```
Step 1: insert 7        Step 2: insert 3       Step 3: insert 8
   [7:B]                  [7:B]                   [7:B]
                          /                       /     \
                        [3:R]                  [3:R]   [8:R]

Step 4: insert 1 -> Double Red (N=1, P=3, U=8)
Uncle 8 is RED -> Recoloring

      [7:B]                   [7:B]
     /     \       =>        /     \
   [3:R]  [8:R]           [3:B]  [8:B]
   /                       /
 [1:R]                   [1:R]

Step 5: insert 5 -> Double Red (N=5, P=3, U=8)
Now U=8 is BLACK -> Restructuring

      [7:B]            sort {N=5, P=3, G=7} = 3, 5, 7
     /     \           median 5 -> new local root (black)
   [3:B]  [8:B]
      \
     [5:R]
                          [5:B]
                         /     \
Result:               [3:R]   [7:R]
                                \
                               [8:B]
```

### 3.9 RBT — Operation Complexities

| Operation | Complexity   | Details |
|-----------|--------------|---------|
| **Search** | $O(\log n)$ | identical to BST; height is $O(\log n)$ |
| **Insert** | $O(\log n)$ | BST insert $O(\log n)$ + fix-up $O(\log n)$ |
| **Delete** | $O(\log n)$ | BST delete $O(\log n)$ + fix-up $O(\log n)$ |

The fix-up after insert/delete uses at most $O(\log n)$ recolorings and **at most 2 rotations**.

| | BST (avg)   | BST (worst) | RBT (worst) |
|-|-------------|-------------|-------------|
| Search | $O(\log n)$ | $O(n)$ | **$O(\log n)$** |
| Insert | $O(\log n)$ | $O(n)$ | **$O(\log n)$** |
| Delete | $O(\log n)$ | $O(n)$ | **$O(\log n)$** |

> **Bottom line:** RBT pays a tiny constant overhead (1 color bit, occasional rotation) in exchange for a worst-case guarantee. This is why it is the default choice for in-memory ordered maps (e.g., C++ `std::map`, Java `TreeMap`, the Linux kernel's CFS scheduler).

---

<br>

## 4. B-Trees

### 4.1 B-Tree — Motivation: The Disk I/O Problem

When data is too large for main memory, it lives on **disk**, and disk access dominates running time:

```
Access times (typical):
  CPU register     ~0.3 ns
  Main memory      ~100 ns
  SSD              ~50 us       (~500x slower than memory)
  HDD              ~5 ms        (~50,000x slower than memory)
```

A Red-Black Tree with $n = 10^9$ nodes has height $\approx 30$. On HDD that is $30 \times 5\,\text{ms} = 150\,\text{ms}$ per operation — far too slow for a database. The bottleneck is **disk reads**, not comparisons.

> "1 second of CPU $\approx$ 10 days of disk I/O" (in relative terms).

> **Cost model shift:** for in-memory structures we minimize comparisons; for disk-resident structures we minimize **the number of disk blocks read**, i.e., the **height** of the tree.

### 4.2 B-Tree — The Idea

Make each node hold **many keys** so the tree is **wide and shallow**.

```
BST (tall, narrow):         B-Tree (short, wide):

     [50]                  [20|40|60|80]
    /    \                / |  |  |  \
  [25]  [75]           [..][..][..][..][..]
 / \    / \
......                  Height ~3 for 10^9 nodes
Height ~30
```

**Design decisions:**
- One node = one **disk block** (typically 4 KB).
- A single disk read brings **hundreds of keys** into memory.
- Searching **within a node** is fast in-memory work and does not count against the disk-I/O budget.
- A B-Tree of order 1000 with height 3 stores over $10^9$ keys.

### 4.3 B-Tree — Search

```
B-TREE-SEARCH(x, k):
    i = 1
    while i <= x.n and k > x.key[i]:
        i = i + 1
    if i <= x.n and k = x.key[i]:
        return (x, i)
    if x.leaf:
        return NIL
    DISK-READ(x.child[i])
    return B-TREE-SEARCH(x.child[i], k)
```

```
Search for key 42 in a B-Tree (order 5):

  Root: [20 | 40 | 60 | 80]
         |    |    |    |
         v    v    v    v
        ...  ...  ...  ...

  42 > 40 and 42 < 60 -> follow pointer between 40 and 60

  Child: [41 | 42 | 45 | 50]
                ^
                found (1 disk read for root + 1 for child = 2 total)
```

**Each level costs one disk read.** Height 3 ⇒ at most 3 disk reads, regardless of $n$.

### 4.4 B-Tree — Insertion (No Split)

**Case 1 — target leaf has room:** insert in sorted order, done.

```
Insert 25 (max 4 keys per node):

  Root: [10 | 20 | 40 | 60]
              |
              v
  Leaf: [21 | 30 | 35]        <- has room (3 keys, max 4)

  After insert:
  Leaf: [21 | 25 | 30 | 35]   <- place 25 in sorted position
```

One search descent + one block write. No structural change.

### 4.5 B-Tree — Insertion (With Split)

**Case 2 — target leaf is full:** **split** at the median and **promote** to the parent.

```
Insert 28 (max 4 keys per node):

  Parent: [... | 20 | 40 | ...]
                  |
                  v
  Leaf: [21 | 25 | 30 | 35]    <- FULL

Step 1: insert 28, creating temporary overflow
  Temp: [21 | 25 | 28 | 30 | 35]

Step 2: split at median 28
  Left:  [21 | 25]
  Right: [30 | 35]

Step 3: promote median 28 to parent
  Parent: [... | 20 | 28 | 40 | ...]
                  |    |
                  v    v
        [21 | 25]    [30 | 35]
```

If the parent is also full, the split **propagates upward**. In the extreme case the root splits and the tree grows one level taller — this is the **only way a B-Tree gains height**, and it keeps the tree perfectly balanced.

### 4.6 B-Tree — Deletion Overview

Deletion is the most complex B-Tree operation. The cases:

**Case 1 — key is in a leaf:**
- 1.1: leaf has more than the minimum keys → just remove
- 1.2: **borrow** from a sibling that has extra keys → rotate through parent
- 1.3: **merge** with a sibling (both at minimum) → pull a key down from the parent
- 1.4: merge underflows the parent → recurse upward

**Case 2 — key is in an internal node:**
- Replace with the **in-order predecessor** (largest key in left child) or **in-order successor** (smallest in right child)
- Then delete from the leaf — reduces to Case 1

**Case 3 — internal key, all relevant nodes at minimum:**
- Merge children, pull parent key down, restructure
- May propagate splits or merges upward

### 4.7 B-Tree — Deletion Leaf Cases

**Case 1.1 — Simple removal** (node has spare keys):

```
Delete 30:  [10 | 20 | 30 | 40]  =>  [10 | 20 | 40]   ok
```

**Case 1.2 — Borrow from sibling via parent rotation:**

```
Delete 20:
  Parent: [... | 25 | ...]        Parent: [... | 30 | ...]
            |    |                           |    |
          [20] [30 | 40]   =>            [25] [40]

Borrow 30 from right sibling; 25 rotates down, 30 rotates up.
```

**Case 1.3 — Merge with sibling:**

```
Delete 20:
  Parent: [... | 25 | ...]       Parent: [... | ...]
            |    |                          |
          [20] [30]        =>         [25 | 30]

Pull 25 down, combine with sibling.
```

> **Symmetry with insertion:** insertion grows by **splitting** when full; deletion shrinks by **merging** when underflowing. Both operations preserve perfect balance and cost $O(\log_M n)$ disk reads, where $M$ is the branching factor.

---

<br>

## 5. BST vs RBT vs B-Tree

| Property | BST | Red-Black Tree | B-Tree |
|----------|-----|----------------|--------|
| **Type** | Binary | Binary (balanced) | $M$-way (balanced) |
| **Height** | $O(\log n)$ avg, $O(n)$ worst | $O(\log n)$ guaranteed | $O(\log_M n)$ guaranteed |
| **Search** | $O(\log n)$ avg, $O(n)$ worst | $O(\log n)$ | $O(\log_M n)$ |
| **Insert** | $O(\log n)$ avg, $O(n)$ worst | $O(\log n)$ | $O(\log_M n)$ |
| **Delete** | $O(\log n)$ avg, $O(n)$ worst | $O(\log n)$ | $O(\log_M n)$ |
| **Balance mechanism** | none | rotations on color violation | splits / merges on overflow |
| **Best for** | simple in-memory use | general-purpose ordered map (`std::map`) | disk-based systems (databases, file systems) |

---

<br>

## Summary

| Structure | Key Idea | Worst-Case Search/Insert/Delete |
|-----------|----------|---------------------------------|
| BST | left $<$ root $<$ right | $O(n)$ (degenerates on sorted input) |
| Red-Black Tree | 5 color rules ⇒ $h \leq 2\log_2(n+1)$ | $O(\log n)$ guaranteed |
| B-Tree (order $M$) | wide nodes = one disk block | $O(\log_M n)$ disk reads |

**Key Takeaways:**
- **Trees are recursive** — traversal is $\Theta(n)$ and many tree algorithms are one recursion plus a base case
- **BST** gives expected $O(\log n)$ but no worst-case guarantee — sorted input degenerates to a list
- **Red-Black Trees** add 1 color bit and 5 properties to bound height by $2\log_2(n+1)$; the Double-Red fix is **Restructuring** (uncle black, $O(1)$ rotation) or **Recoloring** (uncle red, may propagate)
- **B-Trees** trade in-memory comparisons for **disk reads**: wide nodes ⇒ shallow trees ⇒ height $\approx 3$ for billions of keys; used in databases (MySQL, PostgreSQL) and file systems (NTFS, ext4)
- The right structure depends on the **cost model**: RBT optimizes RAM accesses; B-Tree optimizes disk blocks

> "Balance is not given — it is enforced."
> — every self-balancing tree, ever

---

<br>

## Self-Check Questions

1. **Recursive Traversal:** Write a recurrence for in-order traversal of a balanced binary tree, and use the Master Theorem to derive its complexity. Why can no traversal beat $\Omega(n)$?
2. **BST Average vs Worst:** Insert the keys $1, 2, 3, 4, 5$ in that order into an empty BST. Draw the result and give the search cost for key $5$. Then insert the same keys in the order $3, 1, 5, 2, 4$ and compare.
3. **BST Deletion:** In a BST, delete the node with key $6$ from the tree shown in §2.6 using the in-order **predecessor** instead of the successor. Show the resulting tree.
4. **RBT Property 5:** Explain why coloring a newly inserted node **red** (rather than black) preserves Property 5. What would go wrong if we colored it black?
5. **Restructuring vs Recoloring:** For each of the following Double-Red situations, decide which strategy applies and give the resulting tree.
   (a) $G = 10\,(B),\ P = 5\,(R),\ U = 15\,(B),\ N = 7\,(R)$
   (b) $G = 10\,(B),\ P = 5\,(R),\ U = 15\,(R),\ N = 3\,(R)$
6. **RBT Height Bound:** Prove that an RBT with $n$ internal nodes has height at most $2\log_2(n+1)$, using the black-height inequality $n \geq 2^{\text{bh}(\text{root})} - 1$.
7. **B-Tree Disk I/O:** A B-Tree of order $M = 100$ stores $n = 10^8$ keys. Estimate the height. How many disk reads does a search require? Compare with a Red-Black Tree on the same data.
8. **B-Tree Insertion with Split:** Starting from an empty B-Tree of order 4 (max 3 keys per node), insert the sequence $10, 20, 30, 40, 50, 60, 70$ and draw the tree after each split.
9. **Choosing a Structure:** You are designing (a) the symbol table of a compiler, (b) the index of a 1 TB relational database, (c) an ordered map for a small embedded device with 32 KB of RAM. Which structure (BST, RBT, B-Tree) fits each, and why?
