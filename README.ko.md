# [2026학년도 봄학기] 알고리즘

![Last Commit](https://img.shields.io/github/last-commit/Choroning/26Spring_Algorithms)
![Languages](https://img.shields.io/github/languages/top/Choroning/26Spring_Algorithms)

이 레포지토리는 대학 강의 및 과제를 위해 작성된 Python 예제 및 실습 코드를 체계적으로 정리하고 보관합니다.

*작성자: 박철원 (고려대학교(세종), 컴퓨터소프트웨어학과) - 2026년 기준 3학년*
<br><br>

## 📑 목차

- [레포지토리 소개](#about-this-repository)
- [강의 정보](#course-information)
- [사전 요구사항](#prerequisites)
- [레포지토리 구조](#repository-structure)
- [라이선스](#license)

---


<br><a name="about-this-repository"></a>
## 📝 레포지토리 소개

이 레포지토리에는 대학 수준의 알고리즘 과목을 위해 작성된 이중 언어 학습 자료와 코드가 포함되어 있습니다:

- 매 강의 및 실습 세션별 이중 언어 개념 정리 노트 (한국어 `.ko.md` + 영어 `.md`)
- 상세한 설명 문서를 포함한 과제 솔루션
- CLRS 기반 전체 커리큘럼을 다루는 주차별 디렉토리 구조

> **🤖 AI 에이전트 활용**
> 본 과목은 AI 에이전트 사용을 권장합니다.
> 수업 전반에 걸쳐 [Claude Code](https://claude.ai/download)와 [Gemini CLI](https://github.com/google-gemini/gemini-cli)를 코딩 어시스턴트로 활용하였습니다.

<br><a name="course-information"></a>
## 📚 강의 정보

- **학기:** 2026학년도 봄학기 (3월 - 6월)
- **소속:** 고려대학교(세종)

|학수번호      |강의명    |이수구분|교수자|개설학과|
|:----------:|:-------|:----:|:------:|:----------------|
|`DCSS309-00`|알고리즘|전공필수|이웅기 교수|컴퓨터소프트웨어학과|

### 과목 개요

알고리즘의 설계, 분석, 구현을 다룬다. 알고리즘의 정확성, 시간·공간 복잡도 분석과 분할 정복, 탐욕법, 동적 프로그래밍, 그래프 알고리즘 등 핵심 설계 패러다임을 학습한다.

### 교수자 및 연구실

- **교수자:** 이웅기 교수, 컴퓨터소프트웨어학과
- **연구실:** [LEAP Lab](https://codingchild2424.github.io/lab-website/) — 교육 분야 생성형 AI, 교수학적 정렬, 대규모 언어 모델, 지식 추적 연구

### 수업 일정 및 형식

- **학점:** 3학점
- **수업 시간:** 화요일 8–9교시, 목요일 7교시
- **강의실:** 과학기술2관 310호
- **주간 형식:** 1교시 퀴즈 및 이론 강의(전반부), 2교시 이론 강의(후반부), 3교시 실습

### 평가

| 항목 | 비율 |
|:-----|-----:|
| 과제 (퀴즈 5%, 가정 과제 5%) | 10% |
| 중간고사 (필기) | 30% |
| 기말고사 (프로젝트) | 30% |
| 기말고사 (필기) | 30% |
| 출석 | 0% |

- 퀴즈는 3–7주차와 9–13주차 1교시 시작 시 실시하며, 지난주 내용을 다루고 필기시험에 출제될 수 있다. 퀴즈에서는 생성형 AI 사용이 금지된다.
- 가정 과제는 2–6주차에 총 5회 실시한다.
- 과제에서는 생성형 AI 도구를 사용할 수 있으며, 자신의 추론과 설계 선택을 명확히 설명해야 한다.
- 필기시험은 손글씨로 1시간 동안 진행한다. 기말 프로젝트는 9–13주차 팀 프로젝트이다.
- 전체 수업 시수의 3분의 1을 초과해 결석하면 성적이 부여되지 않는다.

### 주차별 계획

| 주차 | 주제 | 주차 | 주제 |
|:----:|:-----|:----:|:-----|
| 1 | 알고리즘 소개 | 9 | 탐색 트리 |
| 2 | 알고리즘 설계 및 복잡도 분석 | 10 | 해시 테이블 및 집합 자료구조 |
| 3 | 배열, 스택, 큐, 기본 정렬 알고리즘 | 11 | 그래프 알고리즘 I |
| 4 | 분할 정복 알고리즘 | 12 | 그래프 알고리즘 II |
| 5 | 탐욕 알고리즘 | 13 | NP-완전 문제 및 근사 알고리즘 |
| 6 | 동적 프로그래밍 | 14 | 기말고사 (프로젝트) |
| 7 | 복습 및 문제 풀이 | 15 | 기말고사 (필기) |
| 8 | 중간고사 | 16 | 자율학습 주간 |

### 학습 자료

- **코딩 연습:** [백준](https://www.acmicpc.net/), [프로그래머스](https://programmers.co.kr/), [LeetCode](https://leetcode.com/), [Codeforces](https://codeforces.com/), [solved.ac](https://solved.ac/)
- **알고리즘 시각화:** [VisuAlgo](https://visualgo.net/) 및 [자료구조 시각화](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)

- **📖 참고 자료**

| 유형 | 내용 |
|:----:|:---------|
|교재|Introduction to Algorithms 3판(CLRS)|
|강의자료|[교수자 제공 Markdown 노트 및 슬라이드 (GitHub)](https://github.com/codingchild2424/2026-lecture-algorithm)|

<br><a name="prerequisites"></a>
## ✅ 사전 요구사항

- 자료구조 및 기본 프로그래밍에 대한 이해
- Python 인터프리터 설치
- 커맨드 라인 툴 사용에 익숙함

- **💻 개발 환경**

| 도구 | 회사 |  운영체제  | 비고 |
|:-----|:-------:|:----:|:------|
|Visual Studio Code|Microsoft|macOS|    |

<br><a name="repository-structure"></a>
## 🗂 레포지토리 구조

```plaintext
26Spring_Algorithms
├── W01_Introduction-to-Algorithms
│   ├── Lab-Materials
│   │   ├── Binary-Search.py
│   │   └── Coin-Change.py
│   ├── Concepts_Lab.ko.md
│   ├── Concepts_Lab.md
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W02_Algorithm-Design-and-Complexity-Analysis
│   ├── Assignment
│   │   ├── static
│   │   │   ├── app.js
│   │   │   ├── index.html
│   │   │   └── style.css
│   │   ├── app.py
│   │   ├── locustfile.py
│   │   └── requirements.txt
│   ├── Assignment-Report.pdf
│   ├── Concepts_Lab.ko.md
│   ├── Concepts_Lab.md
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W03_Arrays-Stacks-Queues-and-Basic-Sorting-Algorithms
│   ├── Assignment
│   │   ├── static
│   │   │   ├── app.js
│   │   │   ├── index.html
│   │   │   └── style.css
│   │   ├── app.py
│   │   └── requirements.txt
│   ├── Assignment-Report.pdf
│   ├── Concepts_Lab.ko.md
│   ├── Concepts_Lab.md
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W04_Divide-and-Conquer-Algorithms
│   ├── Assignment
│   │   ├── static
│   │   │   ├── app.js
│   │   │   ├── index.html
│   │   │   └── style.css
│   │   ├── app.py
│   │   └── requirements.txt
│   ├── Assignment-Report.pdf
│   ├── Concepts_Lab.ko.md
│   ├── Concepts_Lab.md
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W05_Greedy-Algorithms
│   ├── Assignment
│   │   ├── static
│   │   │   ├── app.js
│   │   │   ├── index.html
│   │   │   └── style.css
│   │   ├── app.py
│   │   └── requirements.txt
│   ├── Assignment-Report.pdf
│   ├── Concepts_Lab.ko.md
│   ├── Concepts_Lab.md
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W06_Dynamic-Programming
│   ├── Assignment
│   │   ├── static
│   │   │   ├── app.js
│   │   │   ├── index.html
│   │   │   └── style.css
│   │   ├── app.py
│   │   └── requirements.txt
│   ├── Assignment-Report.pdf
│   ├── Concepts_Lab.ko.md
│   ├── Concepts_Lab.md
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W07_Midterm-Review
│   ├── Concepts.ko.md
│   ├── Concepts.md
│   ├── Concepts_Detailed.ko.md
│   └── Concepts_Detailed.md
├── W09_Search-Trees
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W10_Hash-Tables-and-Set-Data-Structures
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W11_Graph-Algorithms-I
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W12_Graph-Algorithms-II
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W13_NP-Completeness-and-Approximation-Algorithms
│   ├── Concepts_Lecture.ko.md
│   └── Concepts_Lecture.md
├── W14_Approximation-Algorithms
├── Preparation
│   ├── AL-Mid_SummarySheet.ko.md.pdf
│   ├── AL-Mid_Total.ko.md.pdf
│   ├── Mid_SummarySheet.ko.md
│   └── Mid_Total.ko.md
├── images
│   └── (강의 도표 이미지)
├── LICENSE
├── README.ko.md
└── README.md
```

<br><a name="license"></a>
## 🤝 라이선스

이 레포지토리는 [MIT License](LICENSE) 하에 배포됩니다.

---
