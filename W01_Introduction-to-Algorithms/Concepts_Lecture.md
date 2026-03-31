# Week 1 Lecture — Introduction to Algorithms

> **Last Modified:** 2026-03-31

---

## Table of Contents

- [1. OT (Orientation)](#1-ot-orientation)
  - [1.1 Instructor](#11-instructor)
  - [1.2 Syllabus](#12-syllabus)
  - [1.3 Grading](#13-grading)
  - [1.4 Assignments](#14-assignments)
  - [1.5 Midterm & Final Exam](#15-midterm--final-exam)
  - [1.6 Class Format](#16-class-format)
  - [1.7 Textbook](#17-textbook)
  - [1.8 Course Roadmap](#18-course-roadmap)
  - [1.9 Coding Test Environment](#19-coding-test-environment)
- [2. What Is an Algorithm?](#2-what-is-an-algorithm)
  - [2.1 Why Study Algorithms?](#21-why-study-algorithms)
  - [2.2 What Do We Learn?](#22-what-do-we-learn)
  - [2.3 Definition of an Algorithm](#23-definition-of-an-algorithm)
  - [2.4 Algorithm vs Data Structure](#24-algorithm-vs-data-structure)
  - [2.5 Origin of the Word "Algorithm"](#25-origin-of-the-word-algorithm)
  - [2.6 Euclidean GCD Algorithm](#26-euclidean-gcd-algorithm)
- [3. Classical Problems](#3-classical-problems)
  - [3.1 Finding the Maximum](#31-finding-the-maximum)
  - [3.2 Finding a Specific Number (Binary Search)](#32-finding-a-specific-number-binary-search)
  - [3.3 Coin Change Problem](#33-coin-change-problem)
  - [3.4 Euler Path (One-Stroke Drawing)](#34-euler-path-one-stroke-drawing)
  - [3.5 Maze Solving](#35-maze-solving)
  - [3.6 Counterfeit Coin Problem](#36-counterfeit-coin-problem)
  - [3.7 Poisoned Wine Problem](#37-poisoned-wine-problem)
- [Summary](#summary)
- [Appendix](#appendix)

---

<br>

## 1. OT (Orientation)

### 1.1 Instructor

> *Redacted for privacy.*

### 1.2 Syllabus

- The syllabus is available on the **LMS**.
- Total **15 weeks**
  - Week 8 — **Midterm Exam**
  - Week 15 — **Final Exam**

### 1.3 Grading

| Item | Weight |
|:-----|:-------|
| Assignments | **10%** |
| Midterm Exam (Written) | **30%** |
| Final Exam — Project | **30%** |
| Final Exam — Written | **30%** |
| Attendance | 0% |

> **Key Point:** A grade will not be awarded if you miss more than **1/3** of the total class hours.

### 1.4 Assignments

**In-Class Quizzes: 5%**

- **10** quizzes → **0.5%** each
- Weeks 3, 4, 5, 6, 7, 9, 10, 11, 12, 13
- Given at the **start** of the first period (~15 min), covering **the previous week's content**
- Quiz questions **may appear on the written exams**
- **Generative AI is prohibited** — quizzes assess whether you have internalized the material

**Homework: 5%**

- **5** assignments → **1%** each
- Weeks 2, 3, 4, 5, 6

### 1.5 Midterm & Final Exam

- Midterm: **30%** — Handwritten (no digital devices), 1 hour
- Final — Written: **30%** — Handwritten, 1 hour
- Final — Project: **30%** — Team project (Weeks 9–13), refer to the project guidelines

### 1.6 Class Format

| Period | Content |
|:-------|:--------|
| **1st Period** | Quiz (~15 min) + Lecture (Part 1) |
| **2nd Period** | Lecture (Part 2) |
| **3rd Period** | Lab |

- Textbook: **Introduction to Algorithms, 3rd Edition** (CLRS)
- Quizzes cover the **previous week's** content and are given at the **start** of the 1st period

### 1.7 Textbook

![CLRS Textbook Cover](https://upload.wikimedia.org/wikipedia/en/4/41/Clrs3.jpeg)

**Primary Textbook:**
- *Introduction to Algorithms*, 3rd Edition (CLRS)
  - By Cormen, Leiserson, Rivest, Stein

**Core thinking pattern that runs through the entire course:**

```
Problem Solving <-> Divide and Conquer <-> Recursive Thinking <-> Recurrence Relations
```

> **Key Point:** CLRS is the most widely used standard textbook in the field of algorithms worldwide. The flow of "Divide and Conquer -> Recursive Thinking -> Recurrence Relations" is the thinking pattern that runs through this entire course, so keeping this connection in mind throughout the lectures will be very helpful.

> **Note:** Recursive thinking means breaking a problem into smaller versions of itself; recurrence relations are mathematical equations that describe this breakdown. These concepts will be defined formally in Weeks 3-4.

### 1.8 Course Roadmap

| Week | Topic | Week | Topic |
|:-----|:------|:-----|:------|
| **1** | Introduction to Algorithms | **9** | Graph Algorithms |
| **2** | Algorithm Analysis (Complexity) | **10** | Shortest Paths |
| **3** | Divide and Conquer (1) | **11** | Dynamic Programming (1) |
| **4** | Divide and Conquer (2) | **12** | Dynamic Programming (2) |
| **5** | Greedy Algorithms (1) | **13** | String Matching |
| **6** | Greedy Algorithms (2) | **14** | NP-Completeness |
| **7** | Sorting & Selection | **15** | *Final Exam* |
| **8** | *Midterm Exam* | | |

### 1.9 Coding Test Environment

Algorithms are the core of technical interviews and coding tests.

| Platform | URL |
|:---------|:----|
| **Baekjoon** (BOJ) | https://www.acmicpc.net/ |
| **Programmers** | https://programmers.co.kr/ |
| **LeetCode** | https://leetcode.com/ |
| **Codeforces** | https://codeforces.com/ |
| **solved.ac** | https://solved.ac/ |

**Visualization Tools** (very useful for learning):
- VisuAlgo: https://visualgo.net/
- Data Structure Visualizations: https://www.cs.usfca.edu/~galles/visualization/Algorithms.html

> **Note:** VisuAlgo is a website that shows the execution process of various algorithms (sorting, searching, graphs, etc.) through animations. When an algorithm's behavior is hard to understand, stepping through the visualization can be tremendously helpful.

---

<br>

## 2. What Is an Algorithm?

### 2.1 Why Study Algorithms?

- It is the **most important subject** in computer science
- Algorithms train you in **how to think** as a programmer
- The **thought process** behind each algorithm is more important than the algorithm itself

**Application Areas:**
- Design of all programs
- Formal representation of problems and solutions
- Analysis of program efficiency and complexity

### 2.2 What Do We Learn?

- Various algorithms for various problems
  - Greedy, Dynamic Programming, Divide and Conquer, Graph Algorithms, ...
- Systematic thinking through algorithmic problem solving
- **Formal representation** of solutions
  - Flowcharts, pseudocode
- **Efficiency and complexity analysis**
  - How execution time changes with input size

### 2.3 Definition of an Algorithm

> A **systematic description** of a procedure for solving a problem.

- Given an **input** (problem), it produces the desired **output** (result) through a **finite number of steps**.

```
┌───────┐      ┌─────────────┐      ┌────────┐
│ Input  │ ───► │  Algorithm   │ ───► │ Output │
│(Problem)│      │(Finite Steps)│      │(Result)│
└───────┘      └─────────────┘      └────────┘
```

**Requirements:**
- Input and output must be clearly specified
- The algorithm describes the process of transforming input into output
- The algorithm must be *correct*: for every valid input, it must eventually terminate and produce the correct output.

> **Note:** Each step of an algorithm must be **unambiguous**. That is, what action to take in any given situation must not be vague. An expression like "handle appropriately according to the situation" is not an algorithm.

### 2.4 Algorithm vs Data Structure

| | Data Structure | Algorithm |
|:---|:---|:---|
| **Core Question** | How to **store** information? | How to **solve** the problem? |
| **Analogy** | Parts and modules of a car | How to build a car |
| **Prerequisites** | — | Basic Programming, Data Structures |

> **Algorithm + Data Structure = Program**
>
> — Niklaus Wirth

**Example: English Dictionary**
- Unsorted words → Sequential search (slow)
- Sorted words → Binary search (fast)
- The **data structure** (whether sorted or not) determines which **algorithm** is efficient

> **Note:** Niklaus Wirth is a Swiss computer scientist who created the programming language Pascal and received the Turing Award in 1984. His book title "Algorithms + Data Structures = Programs" is a famous quote summarizing the essence of programming, emphasizing that algorithms and data structures are the two pillars of programming.

> **[Data Structures]** A data structure is a structural method for efficiently storing and accessing data. Representative examples include arrays, linked lists, stacks, queues, trees, hash tables, and graphs. The concepts learned in the Data Structures course form the foundation for the Algorithms course. For example, a "sorted array" data structure is required to apply the binary search algorithm.

### 2.5 Origin of the Word "Algorithm"

![al-Khwarizmi Monument, Madrid](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Madrid_-_Ciudad_Universitaria%2C_Monumento_a_Muhammad_al-Juarismi_%28cropped%29.jpg/250px-Madrid_-_Ciudad_Universitaria%2C_Monumento_a_Muhammad_al-Juarismi_%28cropped%29.jpg)

- The word **"algorithm"** derives from the 9th-century Persian mathematician **al-Khwarizmi**
- **Earliest known algorithm**: Euclid's GCD algorithm (~300 BCE)
- Algorithms have existed for more than **2,300 years** before computers

**Question:** Given two numbers 48 and 18, how do you find the **greatest common divisor (GCD)**?

### 2.6 Euclidean GCD Algorithm

**Idea:** Given two numbers (a, b), compute the remainder of a divided by b, and repeatedly replace (a, b) with (b, a mod b).

```python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
```

```
Example: gcd(48, 18)
  48, 18 -> 18, 12 -> 12, 6 -> 6, 0 -> return 6
```

Simple, finite, and correct — the hallmarks of a good algorithm.

> **Note:** `a % b` is the remainder of dividing a by b. This algorithm works because of the mathematical property GCD(a, b) = GCD(b, a mod b). When b becomes 0, the value of a at that point is the greatest common divisor. This algorithm converges very quickly — in the worst case, approximately log(min(a,b)) iterations are sufficient.

---

<br>

## 3. Classical Problems

Now that we understand what an algorithm is, let's explore several classical problems that illustrate fundamental algorithmic strategies. Each problem introduces a different way of thinking -- sequential scanning, divide and conquer, greedy choices, graph traversal, and information-theoretic encoding -- that will recur throughout this course.

### 3.1 Finding the Maximum

**Problem:** Among face-down number cards, find the card with the largest number.

![Playing cards](https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/AcetoFive.JPG/400px-AcetoFive.JPG)

**Approach:**
1. Look at the first card and remember its number
2. Look at the next card — if it is larger, update the remembered number
3. Repeat until all cards have been checked
4. The remembered number is the maximum

```python
def find_max(cards):
    max_val = cards[0]          # Step 1: Remember the first card
    for i in range(1, len(cards)):
        if cards[i] > max_val:  # Step 2: Compare
            max_val = cards[i]  # Update if larger
    return max_val              # Step 4: Return the maximum
```

This is **Sequential Search** — reading cards one by one in order.

> **[Data Structures]** In the code above, `cards` is an array (list), and the `for` loop iterates from index 1 to the end. As learned in Data Structures, arrays allow O(1) access by index. This algorithm visits every element once, so the time complexity is **O(n)**. This is the minimum time required to find the maximum in an unsorted array — because every element must be checked at least once.

> **Note:** We write O(n) to describe how an algorithm's running time grows with input size n. This notation will be covered rigorously in Week 2. Informally, O(n) means "roughly proportional to n" and O(log n) means "roughly proportional to log n."

### 3.2 Finding a Specific Number (Binary Search)

**Problem:** Among sorted cards, find the number **85**.

![Binary Search Visualization](https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Binary_Search_Depiction.svg/400px-Binary_Search_Depiction.svg.png)

**Sequential search** checks one by one: 15 -> 20 -> 25 -> ... -> 85. **9 comparisons** are needed.

Since the data is **sorted**, a more efficient method is possible.

**Core idea of binary search:** Compare with the **middle** element, then search only **one half**.

```
Finding 85: [15, 20, 25, 35, 45, 55, 60, 75, 85, 90]

Step 1: middle = 45  ->  85 > 45  ->  search the right half
       [55, 60, 75, 85, 90]

Step 2: middle = 75  ->  85 > 75  ->  search the right half
       [85, 90]

Step 3: middle = 85  ->  85 == 85 ->  found!
```

Only **3 comparisons** instead of 9!

> **[Data Structures]** Binary search can only be used on **sorted arrays**. As learned in Data Structures, the only way to find an element in unsorted data is sequential search (O(n)). Binary search is possible because comparing with the middle value lets you eliminate the other half at once. Since the search range halves at every step, the time complexity is **O(log_2 n)**.

**Code:**

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid              # Found!
        elif arr[mid] < target:
            left = mid + 1          # Search the right half
        else:
            right = mid - 1         # Search the left half

    return -1                       # Not found
```

**Comparison:**

| Method | Requires Sorting? | Worst Case (n items) |
|:-------|:-----------------|:---------------------|
| Sequential Search | No | n comparisons |
| Binary Search | Yes | log_2(n) comparisons |

For n = 1,000,000: sequential = 1,000,000 vs binary = ~20

> **Note:** `(left + right) // 2` computes the middle index using integer division. `left` and `right` are the indices of both ends of the current search range. It returns the index if found, and -1 if not found. In practice, binary search is used very frequently, and Python's standard library provides it via the `bisect` module.

> **Note:** The reason `left <= right` includes the equality (=) is that when the search range has narrowed to a single element (`left == right`), that element still needs to be checked. Removing the equality (`left < right`) would cause a bug where the last element is not examined, and a present value would not be found. Boundary conditions in binary search are the most common source of mistakes in coding tests.

### 3.3 Coin Change Problem

**Problem:** Give change for **730 won** using the **minimum number of coins**.

![South Korean Coins](https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Currency_South_Korea.jpg/400px-Currency_South_Korea.jpg)

**Greedy approach:** Always choose the **largest** coin that does not exceed the remaining amount.

![Greedy Coin Selection](https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Greedy_algorithm_36_cents.svg/400px-Greedy_algorithm_36_cents.svg.png)

```
Remaining amount: 730
  -> 500 won x 1  (remaining: 230)
  -> 100 won x 2  (remaining:  30)
  ->  10 won x 3  (remaining:   0)

Total coins: 1 + 2 + 3 = 6 (minimum!)
```

Notice that the 50-won coin is not used because the remaining amount (30) after using 100-won coins is less than 50. The algorithm naturally skips denominations that are too large for the remaining amount.

> **Greedy Algorithm:** A method that makes the **locally optimal choice** at each step, hoping to achieve a **globally optimal solution**.

```python
def coin_change(amount, coins=[500, 100, 50, 10]):
    result = []
    for coin in coins:                # Coins in descending order
        count = amount // coin
        if count > 0:
            result.append((coin, count))
            amount -= coin * count
    return result

# coin_change(730) -> [(500, 1), (100, 2), (10, 3)]
```

**Important question:** How can we **prove** that this greedy approach always guarantees the minimum?
- This will be rigorously covered in **Chapter 4 (Greedy Algorithms)**

> **Key Point:** The greedy algorithm does not always guarantee an optimal solution! It works well with the Korean won coin system (500, 100, 50, 10), but if the coins are [1, 3, 4] won and you need to make change for 6 won, the greedy approach selects 4+1+1 = 3 coins, while the optimal solution is 3+3 = 2 coins. For a greedy algorithm to guarantee optimality, specific conditions (greedy choice property + optimal substructure) must be satisfied.

### 3.4 Euler Path (One-Stroke Drawing)

An Euler *path* traverses every edge exactly once. If it also returns to the starting vertex, it is called an Euler *circuit* (or *cycle*). The problem here asks for an Euler circuit specifically.

**Problem:** Starting from a vertex, traverse **every edge exactly once** and return to the starting vertex. Vertices may be revisited.

![Konigsberg's 7 Bridges](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Bridges_of_Konigsberg.png/350px-Bridges_of_Konigsberg.png)

> **[Data Structures]** A graph is a core concept learned in Data Structures. It consists of a set of **vertices (nodes)** and a set of **edges** connecting them. The Euler path problem historically originates from the famous "Konigsberg bridge problem." Euler proved that for a path traversing every edge exactly once (Euler path) to exist, the number of vertices with **odd degree** must be either 0 or 2. Degree refers to the number of edges connected to a vertex.

The following graph (vertices 1-10) is used in the worked example below:

```
        1
       / \
      2   10
      |     \
      3---9--7
      |   |  |
      4   8  6
       \ /  /
        5--+
```

**Key Insight:**

At a vertex with multiple choices, which edge should be taken?

**Rule:** Only move to a neighbor if a **cycle** exists that returns to the current vertex through that neighbor. Avoid **bridges** (edges whose removal disconnects the graph). For instance, if removing edge (7,10) would leave vertex 10 completely unreachable from the rest of the graph, then (7,10) is a bridge. Crossing a bridge too early can strand you, leaving edges you can never traverse.

**Example:** At vertex 7, should you go to 6, 9, or 10?
- Vertex 6: A cycle exists via 5, 4, 3, 9, 7 -> **Safe**
- Vertex 9: A cycle exists via 3, 4, 5, 6, 7 -> **Safe**
- Vertex 10: Only leads to vertex 1 with no return cycle -> **Dead end**

**Algorithm:**
1. If only one unvisited adjacent edge remains ("bridge"), take it
2. Otherwise, move to a neighbor through which a **cycle** back to the current vertex exists

Cycle detection can be performed using **Depth-First Search (DFS)**.

The key insight is that crossing a bridge prematurely can split the graph into disconnected parts, making it impossible to traverse the remaining edges. By always choosing an edge that keeps the graph connected, you ensure all edges remain reachable.

> **[Data Structures]** DFS is a graph traversal method learned in Data Structures. It explores as far as possible along one path before backtracking. It is implemented using a stack or recursive calls. Conversely, BFS (Breadth-First Search) explores nodes level by level starting from the nearest, using a queue. DFS is used for cycle detection here because encountering an already-visited node during DFS means a cycle exists.

> **Note:** The principle of cycle detection via DFS: Starting DFS from the current node, if an **already-visited node is encountered** during traversal, a cycle exists. For example, starting from node 7 and following 6->5->4->3->9->7 confirms a cycle. Since DFS "digs as deep as possible and then backtracks," it naturally checks whether the path returns to the starting point.

### 3.5 Maze Solving

**Greek myth of Theseus:** He took a **ball of thread** into the labyrinth to find his way back.

![Longleat Hedge Maze](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Longleat-maze.jpg/300px-Longleat-maze.jpg)

![Theseus and the Minotaur](https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Kylix_Theseus_Aison_MNA_Inv11365_n1.jpg/300px-Kylix_Theseus_Aison_MNA_Inv11365_n1.jpg)

How do you **reliably** find the exit without thread or a map?

**Right-Hand Rule:**
1. Place your right hand on the wall
2. Walk forward without lifting your right hand off the wall
3. You will **always** reach the exit

No markings or thread needed — a simple and elegant algorithm.

**Why does it work?** The wall forms one connected boundary. Following the wall traverses the entire boundary, including the exit, so you will inevitably reach it.

> **Note:** The right-hand rule does not always work. It can fail when there are **independent islands (disconnected wall segments)** inside the maze. In such mazes, more sophisticated maze-solving algorithms like the Tremaux algorithm are needed. However, for simple mazes where "all walls are connected," the right-hand rule works reliably.

> **Note:** The right-hand rule is actually a **variant of DFS (Depth-First Search)** from a graph-theoretic perspective. Following the wall corresponds to traversing edges of a graph in one direction, and turning back at dead ends corresponds to DFS backtracking.

### 3.6 Counterfeit Coin Problem

**Problem:** Among n coins, **one** is counterfeit (slightly lighter). Using a **balance scale**, find the counterfeit coin with the minimum number of weighings.

![Balance Scale](https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Balance_%C3%A0_tabac_1850.JPG/350px-Balance_%C3%A0_tabac_1850.JPG)

What strategy minimizes the number of weighings for **1,024 coins**?

**Three Approaches:**

| Approach | Method | Worst Case (n coins) |
|:---------|:-------|:---------------------|
| **Approach A** | Compare one coin against each of the rest | n - 1 |
| **Approach B** | Compare coins in pairs | n / 2 |
| **Approach C** | Split the pile in half and compare both sides | log_2(n) |

**Approach A (One by One):**

Place one coin on the left, and compare the rest one by one on the right.

```
Coin 1 vs Coin 2  ->  balanced
Coin 1 vs Coin 3  ->  balanced
Coin 1 vs Coin 4  ->  balanced
  ...
Coin 1 vs Coin k  ->  lighter! (Coin k is counterfeit)
```

- **Best case:** 1 weighing (if lucky)
- **Worst case:** n - 1 weighings
- 1,024 coins: up to **1,023 weighings**

**Approach B (In Pairs):**

Group coins into pairs and compare each pair.

```
(Coin 1, Coin 2)  ->  balanced (both genuine)
(Coin 3, Coin 4)  ->  balanced (both genuine)
  ...
(Coin k, Coin k+1) -> unbalanced! (one is counterfeit)
```

- **Worst case:** n / 2 weighings
- 1,024 coins: up to **512 weighings**
- Better, but still linear

Once an unbalanced pair is found, one additional weighing against a known-genuine coin identifies which of the two is counterfeit. This means the total worst case is actually ceil(n/2) + 1 weighings.

**Approach C (Split in Half):**

Split the pile in half and place both halves on the scale. The lighter side contains the counterfeit.

```
n = 1024 coins

Step 1:   512 vs 512  ->  left is lighter
Step 2:   256 vs 256  ->  right is lighter
Step 3:   128 vs 128  ->  left is lighter
  ...
Step 10:    1 vs   1  ->  left is lighter -> found!
```

- **Always** log_2(n) weighings
- 1,024 coins: exactly **10 weighings**

This is the **Divide and Conquer** strategy — to be covered in depth in **Chapter 3**.

> **Note:** There is actually an even more efficient method! If you split into thirds instead of halves, it takes log_3(n) weighings (split coins into 3 groups, place only 2 groups on the scale, and the lighter group can be identified). But the key point here is the principle of divide and conquer: "reducing the problem size by a constant ratio at each step yields logarithmic performance."

**Comparison:**

For n = 1,024 coins:

| Approach | Worst Case | Strategy |
|:---------|:-----------|:---------|
| A (one by one) | **1,023** | Brute Force |
| B (in pairs) | **512** | Slightly smarter |
| C (split in half) | **10** | Divide and Conquer |

**Why is Approach C so good?**
- Each weighing **eliminates half** of the remaining coins
- Number of weighings = log_2(n)

> **Key Point:** The **logarithmic function** is extremely important in algorithm analysis. An intuitive way to understand log: log_2(n) is "how many times can n be divided by 2 until it becomes 1?" For example, log_2(1024) = 10 because dividing 1024 by 2 ten times yields 1. This concept appears repeatedly throughout algorithms: binary search, divide and conquer, tree height, etc.

### 3.7 Poisoned Wine Problem

**Story:** A king has several wine jars. A spy has poisoned **exactly one** jar. The poison kills after exactly **one week**, even from a single sip.

![Wine Barrels](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Oak-wine-barrel-at-toneleria-nacional-chile.jpg/350px-Oak-wine-barrel-at-toneleria-nacional-chile.jpg)

**The King's Command:**
- Find the poisoned jar within exactly **one week**
- **Minimize** the number of tasting servants

How many servants are needed for **8** jars? What about **1,000**?

**Small Case — 2 jars, 1 servant:**

| Servant tastes | If servant dies | If servant lives |
|:---------------|:---------------|:-----------------|
| Jar 1 | Jar 1 is poisoned | Jar 2 is poisoned |

1 servant can identify the poisoned jar among **2** jars.

**4 jars — Can it be done with 2 servants?**

Assign a 2-bit binary number to each jar:

| Jar | Binary | Servant A tastes? | Servant B tastes? |
|:----|:-------|:-----------------|:-----------------|
| 0 | 00 | No | No |
| 1 | 01 | No | Yes |
| 2 | 10 | Yes | No |
| 3 | 11 | Yes | Yes |

**Rule:** Servant A tastes all jars where **bit 1 = 1**. Servant B tastes all jars where **bit 0 = 1**.

> **[Discrete Mathematics]** Binary is a number system using only two digits, 0 and 1. For example, decimal 5 is 101 in binary (= 1x4 + 0x2 + 1x1). All data inside computers is represented in binary. The reason binary is key to this problem is that n-bit binary numbers can represent 2^n different states. That is, n servants (each with 2 states: alive/dead) can distinguish among 2^n jars.

**Reading the Results:**

After one week, check who died:

| A died? | B died? | Binary | Poisoned Jar |
|:--------|:--------|:-------|:-------------|
| No | No | 00 | Jar 0 |
| No | Yes | 01 | Jar 1 |
| Yes | No | 10 | Jar 2 |
| Yes | Yes | 11 | Jar 3 |

The **death pattern** directly encodes the **binary number** of the poisoned jar!

**8 jars (3 servants):**

| Jar | Binary | A tastes? | B tastes? | C tastes? |
|:----|:-------|:----------|:----------|:----------|
| 0 | 000 | No | No | No |
| 1 | 001 | No | No | Yes |
| 2 | 010 | No | Yes | No |
| 3 | 011 | No | Yes | Yes |
| 4 | 100 | Yes | No | No |
| 5 | 101 | Yes | No | Yes |
| 6 | 110 | Yes | Yes | No |
| 7 | 111 | Yes | Yes | Yes |

Each servant tastes **4** jars. If jar 7 is poisoned, **all 3 servants die** (111).

**General Solution:**

**For n jars:**
- Number of servants needed = **log_2(n)**
- Assign each jar a unique binary number (0 to n-1)
- The k-th servant tastes all jars whose k-th bit is 1
- After one week, the binary pattern of dead servants = the number of the poisoned jar

```
n = 1000 jars  ->  log_2(1000) = ~10 servants
n = 1,000,000  ->  log_2(1,000,000) = ~20 servants
```

This is the power of **binary encoding** — a fundamentally different way of thinking.

> **Note:** This problem is related to **Information Theory**. Each servant provides 1 bit of information: "alive/dead." To distinguish among n jars, log_2(n) bits of information are needed, so at least log_2(n) servants are required. In this way, logarithm can also be interpreted as "the minimum amount of information needed to distinguish."

> **Note:** When n is not exactly a power of 2, **ceil(log_2(n))** servants are needed. For example, if n=5, log_2(5) ~ 2.32, so 3 servants are needed. 3 bits (8 states) can distinguish among 5 jars. The remaining 3 states (binary 101, 110, 111) are simply unused.

> **Note:** For the 5-jar case specifically: Assign binary numbers 000-100 to jars 0-4, using 3 servants. Binary numbers 101(5), 110(6), 111(7) are unused. If only Servant A dies (100), jar 4 is poisoned; if nobody dies (000), jar 0 is poisoned. As long as $2^n$ > (number of jars), some codes remain unused but the scheme works without issues.

---

<br>

## Summary

| Problem | Algorithm / Strategy | Key Concept |
|:--------|:--------------------|:------------|
| Finding the Maximum | Scan all elements | Sequential Search — O(n) |
| Finding a Specific Value | Split sorted data in half | Binary Search — O(log n) |
| Coin Change | Choose the largest coin first | Greedy (Chapter 4) |
| Euler Path | Follow cycles, avoid bridges | Euler Circuit / DFS |
| Maze Solving | Right-hand rule (follow the wall) | Variant of DFS |
| Counterfeit Coin | Split the pile in half | Divide and Conquer (Chapter 3) — O(log n) |
| Poisoned Wine | Binary number assignment | Binary Encoding — log_2(n) servants |

**Recurring Theme:** The **log_2(n)** function appears in binary search, the counterfeit coin problem, and the poisoned wine problem. Algorithms that halve the problem size at every step achieve **logarithmic** performance.

---

<br>

## Appendix

- **Week 2:** Algorithm Analysis — Big-O notation, time complexity, asymptotic analysis
- **Homework** starts from next week
- No quiz, no homework this week (OT week)

---
