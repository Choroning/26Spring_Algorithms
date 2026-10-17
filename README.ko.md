# [2026학년도 봄학기] 알고리즘

![Last Commit](https://img.shields.io/github/last-commit/Choroning/26Spring_Algorithms)
![Languages](https://img.shields.io/github/languages/top/Choroning/26Spring_Algorithms)

이 레포지토리는 알고리즘 과목의 이중 언어 강의 노트와 수업 결과물을 정리한 아카이브입니다.

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

이 레포지토리에는 CLRS를 기반으로 알고리즘의 설계, 분석, 구현을 다루는 알고리즘 과목의 이중 언어 강의 노트와 코드가 담겨 있습니다.

- `Lecture-Notes/`에는 주차마다 이론 강의를 정리한 강의 노트(`Concepts_Lecture`)가 있고, 1~6주차에는 실습 세션을 정리한 실습 노트(`Concepts_Lab`)가 함께 있습니다.
- 강의자료가 주차별로 배포되어 단원을 주차 번호(`Week##`)로 나눴으며, 단원 순서는 CLRS 기반 전체 커리큘럼의 주차 순서를 따릅니다. 복습 주차인 7주차와 중간고사 주차인 8주차는 단원이 없습니다.
- 모든 강의 노트와 실습 노트는 영어 파일(`.md`)과 한국어 파일(`.ko.md`)이 같은 구성으로 짝을 이룹니다.
- `Coursework/`에는 2~6주차 과제 다섯 개의 풀이(웹 앱 코드와 상세한 설명 보고서 `Assignment-Report.pdf`), 1주차 실습 코드, 중간고사 대비 자료, 팀 단위 텀 프로젝트가 있습니다.

> **🤖 AI 에이전트 활용**
> 이 과목은 AI 에이전트 사용을 권장합니다. 과제에서는 생성형 AI 도구를 쓸 수 있지만, 퀴즈에서는 생성형 AI 사용이 금지됩니다.
> 수업 전반에 걸쳐 [Claude Code](https://claude.ai/download)와 [Gemini CLI](https://github.com/google-gemini/gemini-cli)를 코딩 어시스턴트로 활용했고, 강의 노트의 정리와 번역, 레포지토리 구조 정리에도 Claude Code를 활용했습니다.

<br><a name="course-information"></a>
## 📚 강의 정보

- **학기:** 2026학년도 봄학기 (3월 - 6월)
- **소속:** 고려대학교(세종)

|학수번호      |강의명    |이수구분|교수자|개설학과|
|:----------:|:-------|:----:|:------:|:----------------|
|`DCSS309-00`|알고리즘|전공필수|이웅기 교수|컴퓨터소프트웨어학과|

### 과목 개요

알고리즘의 설계, 분석, 구현을 다룬다. 알고리즘의 정확성과 시간 복잡도, 공간 복잡도 분석을 배우고, 분할 정복, 탐욕법, 동적 프로그래밍, 그래프 알고리즘 같은 핵심 설계 패러다임을 학습한다. 교수자와 연구실, 수업 일정과 형식, 평가, 수업 운영 규정, 주차별 계획 및 진도, 참고 자료는 [강의 정보 문서](Course-Information.ko.md)에 정리했다.

<br><a name="prerequisites"></a>
## ✅ 사전 요구사항

- 자료구조와 기본 프로그래밍을 이해하고 있어야 합니다.
- Python 인터프리터가 설치되어 있어야 합니다.
- 커맨드 라인 도구 사용에 익숙해야 합니다.

- **💻 개발 환경**

| 도구 | 회사 |  운영체제  | 비고 |
|:-----|:-------:|:----:|:------|
|Visual Studio Code|Microsoft|macOS|    |

<br><a name="repository-structure"></a>
## 🗂 레포지토리 구조

```plaintext
26Spring_Algorithms
├── Lecture-Notes               주차별 강의 노트와 실습 노트
├── Coursework                  과제, 실습 코드, 중간고사 대비 자료, 팀 단위 텀 프로젝트
├── images                      강의 노트의 그림
├── Course-Information.ko.md    수업 운영 정보
├── Course-Information.md
├── LICENSE                     문서 라이선스 (CC BY-NC-SA 4.0)
├── LICENSE-CODE                코드 라이선스 (PolyForm Noncommercial 1.0.0)
├── README.ko.md
└── README.md
```

단원 목록은 [`Lecture-Notes` 색인](Lecture-Notes/README.ko.md)에, 과제와 실습 코드, 중간고사 대비 자료, 텀 프로젝트는 [`Coursework` 색인](Coursework/README.ko.md)에 있습니다.

<br><a name="license"></a>
## 🤝 라이선스

이 레포지토리의 문서(강의 노트, 해설, 요약지)는 [CC BY-NC-SA 4.0](LICENSE), 코드는 [PolyForm Noncommercial 1.0.0](LICENSE-CODE)에 따라 배포됩니다. 강의자료와 교재에서 가져온 그림과 예제 코드, 강의가 배포한 과제 원본과 템플릿 코드는 원저작자에게 권리가 있으며 이 라이선스의 대상이 아닙니다.

---
