# HW1 과제 안내문 — 미니 쇼핑몰 상품 검색

[레포지토리 안내](../../../README.ko.md) | [English](Assignment.md) | [한국어](Assignment.ko.md)

> **최종 수정일:** 2026-11-16

알고리즘 2주차 가정 과제(Week 02 Assignment)이다. 주제는 알고리즘 복잡도 분석이며, 사용자가 상품을 검색할 수 있는 미니 쇼핑몰 웹 앱을 만들어 시간 복잡도가 서로 다른 검색 방법의 성능을 비교한다. [2주차 이론](../../../Lecture-Notes/Week02_Algorithm-Design-and-Complexity-Analysis/Concepts_Lecture.ko.md)의 내용과 이어진다.

- **배점:** 전체 성적의 1%
- **제출 기한:** 다음 이론 수업 전의 월요일 23:59
- **제출 방법:** LMS에 소스 코드(`.zip`)와 보고서(`.pdf`)를 제출한다

> **주의:** 마감 직전에는 LMS에 문제가 생길 수 있으므로 늦어도 **일요일**까지 제출한다. 시스템 오류로 늦게 제출한 경우는 **인정하지 않으며**, 기한을 지킬 책임은 학생에게 있다.

---

<br>

## 문제. 미니 쇼핑몰 상품 검색 웹 앱

사용자가 상품을 검색할 수 있는 **미니 쇼핑몰** 웹 앱을 만든다. 서로 다른 세 가지 검색 방법을 구현하여 성능을 비교한 다음, **Locust**로 실제 사용자 부하에서 알고리즘의 선택이 서비스에 어떤 영향을 주는지 확인한다.

- **백엔드:** Python (FastAPI 또는 Flask)
- **프런트엔드:** HTML, CSS, JavaScript
- **부하 테스트:** Locust

### 1. 상품 데이터와 검색 알고리즘

상품 목록(id, 이름, 분류, 가격을 가진 1,000개 이상의 상품)을 불러오고 다음 **세 가지 검색 방법**을 구현한다.

| 검색 방법 | 동작 방식 | 복잡도 |
|:-----|:-----|:-----|
| ID 조회 | `dict[product_id]` | O(1) |
| 이름 검색 | 모든 상품을 차례로 훑는다 | O(n) |
| 중복 탐지 | 이름이 같은 상품을 찾는다 (중첩 반복문) | O(n²) |

*표 1. 구현할 세 가지 검색 방법*

### 2. 웹 인터페이스

- 이름이나 ID로 상품을 검색하는 **검색창**을 둔다.
- 중복된 상품 이름을 찾는 **"Find Duplicates"** 버튼을 둔다.
- 결과는 이름, 가격, 분류를 담은 **상품 카드 목록**으로 보여 준다.
- 검색할 때마다 **실행 시간**(ms)을 보여 준다.

### 3. API 엔드포인트

| 메서드 | 엔드포인트 | 설명 |
|:-----|:-----|:-----|
| `GET` | `/search/id?id=123` | 상품 ID로 O(1) 조회 |
| `GET` | `/search/name?q=keyword` | 이름으로 O(n) 선형 검색 |
| `GET` | `/search/duplicates` | O(n²) 중복 탐지 |
| `GET` | `/` | 프런트엔드 페이지 제공 |

*표 2. 구현할 API 엔드포인트*

### 4. Locust 부하 테스트

동시 사용자가 각 검색 엔드포인트를 호출하는 상황을 흉내 내는 `locustfile.py`를 작성한다.

```python
from locust import HttpUser, task

class ShopUser(HttpUser):
    @task
    def search_by_id(self):
        self.client.get("/search/id?id=42")

    @task
    def search_by_name(self):
        self.client.get("/search/name?q=laptop")

    @task
    def find_duplicates(self):
        self.client.get("/search/duplicates")
```

실행 명령은 `locust -f locustfile.py --host=http://localhost:8000`이다.

### 5. 부하 테스트에서 관찰할 점

`http://localhost:8089`에서 Locust 웹 UI를 연다.

- **10명**의 사용자로 시작하여 **50명**까지 늘린다.
- 엔드포인트마다 **응답 시간**과 **처리량**을 관찰한다.

동시 사용자가 늘어나면 다음과 같은 변화가 나타난다.

- O(1) ID 조회는 빠르고 안정적인 상태를 유지한다.
- O(n) 이름 검색은 조금 느려진다.
- **O(n²) 중복 탐지는 응답 시간이 급증하고 요청이 대기열에 쌓인다.**

> **핵심:** 실제 웹 서비스에서 알고리즘의 선택이 중요한 이유가 여기에 있다.

---

<br>

## 제출물

### 1. 소스 코드 (`.zip`)

```text
week02_assignment/
├── app.py              # 백엔드 (FastAPI 또는 Flask)
├── locustfile.py       # Locust 부하 테스트
├── static/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── requirements.txt    # locust 포함
```

*그림 1. 제출할 소스 코드의 디렉토리 구성*

### 2. 보고서 (`.pdf`만, 최대 2쪽, 글자 크기 11pt 이상)

- 쇼핑몰 검색 결과의 **화면 캡처**
- **Locust 결과:** 동시 사용자 10명, 30명, 50명에서의 응답 시간 차트
- **분석:** 부하가 걸리면 O(n²)의 성능이 왜 떨어지는가? Big-O 및 실제 서비스에 미치는 영향과 연결하여 설명한다.

---

<br>

## 평가 기준

| 항목 | 비율 |
|:-----|-----:|
| 웹 앱이 실행되고 올바르게 동작한다 | 20% |
| 알고리즘 요구사항을 모두 구현한다 | 40% |
| 보고서 (최대 2쪽, 글자 크기 11 이상) | 40% |

*표 3. 평가 항목과 비율*

> **주의:** 과제 내용은 **필기시험**에 출제될 수 있다. 과제 결과와 시험 성적 사이에 큰 차이가 있으면 **감점**될 수 있다.

기한 전에 LMS에 제출한다.

---

<br>

과제를 직접 해결해 본 뒤 [과제 해설](../Assignment-Explanation.ko.md)에서 풀이와 결과를, [코드 총정리](../Code-Walkthrough.ko.md)에서 작성한 코드 전체를 볼 수 있다.
