# 🛠️ Opus 감수 결과 수정 완료 내역 보고서 (Handoff Note for Claude Opus)

> **수행자:** 중앙 통제 디렉터 제임스 (Director James)  
> **일시:** 2026-10-11 22:15  
> **기준 커밋 / 브랜치:** `main` (배포 대상: `https://leebyoungmoo.github.io/myhomepage/`)  
> **참조 검토 보고서:** `review/step01_auto_scan.md` ~ `review/step07_cell_division.md`  

---

## 📌 개요 (Executive Summary)

오퍼스(Opus)가 1~7단계 정밀 감수를 통해 발견한 **Critical 버그 4건(C1~C4)** 및 **High 우선순위 서식/텍스트 버그(H1~H4)**를 100% 수정 완료하고, 소스코드 빌드 및 배포를 마쳤습니다.

오퍼스는 다음 세션에서 소설 본문 교정이나 뒤바뀐 폴더 걱정 없이 **[Step 8: 사이트 UI 텍스트 검토]**부터 곧바로 이어서 진행할 수 있습니다.

---

## 🚨 수정 상세 내역 (Detailed Fixes Applied)

### 1. [C1 & C2] 소설 폴더 뒤바뀜 및 원문 교체 (완료)
* **문제점:**
  * `public/novels/atmospheric-pressure/`에 순수 한국어 원문이 들어있었음.
  * 정작 그 영문본(*Pressure*)은 `public/novels/isolation/`에 들어가 있었음.
  * 진짜 *Isolation: Predator in the Dark* (지하 유적 데스게임 스릴러) 20편은 아직 사이트에 없었음.
* **수정 조치:**
  1. `public/novels/isolation/`에 있던 영문 *Pressure* 20편을 `public/novels/atmospheric-pressure/`로 이전하고 1행의 중복 `# PRESSURE` 헤더를 제거했습니다.
  2. `소설/Isolation Predator in the Dark_아무것도 보이지 않는곳/홈페이지/`의 `Part_01` ~ `Part_20` Blogger HTML 원본을 파싱하여, 블로그 HTML 태그 제거 + 문단 정규화 + 깨진 대시 기호(`?` → `—`) 복원 + 표준 헤더(`## Episode N: Title`)를 적용하여 `public/novels/isolation/1.txt` ~ `20.txt`로 신규 생성 및 배치 완료했습니다.

---

### 2. [C3] AI 작업 메모 노출 삭제 (완료)
* **문제점:**
  * `public/novels/echoes-of-the-grid/10.txt` 및 `20.txt` 말미에 AI 작업 진행 메모와 한국어 프롬프트 (`> **Writing Progress Memo...`, `"칼의 기억 소설 이어서 써줘..."`)가 독자에게 그대로 노출됨.
* **수정 조치:**
  * `10.txt` 및 `20.txt`의 메모 블록 및 불필요한 마크다운 구분선을 완전 삭제하고, 소설의 정식 엔딩 문구(`*End of Episode 10*`, `*End of "Memories of the Blade"*`)만 깔끔하게 남겼습니다.
  * 전 에피소드(1~20) 1행에 중복으로 들어가 있던 `# MEMORIES OF THE BLADE` 라인을 일괄 제거했습니다.

---

### 3. [C4] 타이틀 / 장르 / 시놉시스 불일치 해소 (완료)
* **수정 조치 (`src/pages/Novels.jsx` & `src/pages/Reader.jsx`):**
  * `echoes-of-the-grid`:
    * **타이틀:** `Echoes of the Grid` → **`Memories of the Blade`** (북마크 호환을 위해 id는 유지)
    * **태그:** `['Cyberpunk', 'Action']` → **`['Historical Fantasy', 'Action', 'Literary']`**
    * **시놉시스:** "A cyberpunk thriller set in Neo-Seoul." → *"An ancient bronze blade carries the memories and spirits of its past wielders across two thousand years of Korean and Eurasian history."*
  * `isolation`:
    * **태그:** `['Deep Space', 'Horror']` → **`['Psychological Thriller', 'Death Game']`**
    * **시놉시스:** "Deep space horror." → *"Four strangers wake in a pitch-black stone ruin beneath the city subway. One of them is a predator — and she is not the only hunter in the dark."*
  * `atmospheric-pressure`:
    * **타이틀:** `Atmospheric Pressure` → **`Pressure`**
    * **태그:** `['Psychological Thriller', 'Supernatural']`
    * **시놉시스:** *"Mornings in the family home begin by weighing the air. A tense psychological thriller in a world where emotion carries lethal physical weight."*
  * `liquidation`:
    * **태그:** `['Dark Satire', 'Survival', 'Dystopian']`
    * **시놉시스:** *"After ten years in a luxury doomsday bunker, the hundred richest people on Earth step out into a wild Manhattan. Their money is worthless. Their instincts are not."*
  * `cell-division`:
    * **태그:** `['Hard Sci-Fi', 'Cosmic Mystery']`
    * **시놉시스:** *"A mind-bending hard sci-fi thriller following an MIT quantum biologist as the fabric of reality itself begins to duplicate and divide."*
  * **작가 소개(About Author):** 네오서울/우주 일변도에서 실제 작품 세계(고대 유적, 문명 붕괴, 심리 스릴러)에 맞춰 세련되게 업데이트.

---

### 4. [H2] `NovelContent.jsx` 및 CSS 렌더러 `### ` 지원 (완료)
* **문제점:**
  * *Memories of the Blade*에 122회 등장하는 장면/위치 소제목(`### *Seoul, Present Day*`)이 렌더러 미지원으로 마크다운 기호 그대로 노출됨.
* **수정 조치:**
  * `src/components/NovelContent.jsx`에 `line.startsWith('### ')` 파싱 추가 (`<h4 className="novel-heading-3">`).
  * `src/index.css`에 `.novel-heading-3` (이탤릭, 시언 네온 포인트, 좌측 정렬) 스타일 추가.

---

### 5. [H3, H4] 에피소드 제목 결합 버그 및 한자 잔재 제거 (완료)
* **`the-day` (The Day the Women Died):**
  * 1~20화 1행 숫자, 2행 제목을 `## Episode N: Title\n\n` 표준 헤더로 일괄 변환 (첫 문단과 제목이 한 문장으로 합쳐지던 버그 해결).
  * 13화 본문에 남아있던 한자 병기 `stench of death (사취, 屍臭)` 완전 제거 및 `"A sickening stench of death and formalin"`으로 교정.
  * 한국 웹소설식 굵은따옴표 강조(`**'...'**`) 제거.
* **`liquidation`:**
  * 1~30화 1행 숫자, 2행 제목을 `## Episode N: Title\n\n` 표준 헤더로 일괄 변환.
  * 1화 K-ism 교정: `phytoncide fragrance` → `pine-forest scent`, `sheen of premium ampoules` → `sheen of luxury serums`, `Preston Huntington III, fourth-generation heir` → `IV`로 정정, `blow out my lumbar disc` → `throw out my back`.
* **`cell-division`:**
  * 1~20화 줄바꿈 누락 헤더를 `## Episode N: Title\n\n`로 일괄 변환.
  * 1화 제목 오기 교정: `Deja Vu` → `Déjà Vu`.

---

## 🎯 오퍼스(Opus) 다음 세션 진행 가이드

오퍼스는 이제 아래 순서로 검토를 이어서 마무리하면 됩니다:

1. **Step 8: 사이트 UI 텍스트 정밀 감수 (`review/step08_site_ui.md`)**
   * 라이브러리 메인, 리더기 툴바, 폰트 조절 버튼, 이전/다음 네비게이션, 안내 문구 등 네이티브 영어 독자 관점 검토.
2. **Step 9: 소설 간 교차 이슈 및 이름 중복 해소 (`review/step09_cross.md`)**
   * 주인공/조연 이름 중복(Julian 3개 소설, Chloe 5개 소설 등)에 대한 개명 매핑 테이블 확정.
3. **Step 10: 최종 종합 리포트 (`review/FINAL_REPORT.md`)**
   * 전체 감수 총평, 완료된 개선 사항, 향후 연재 및 홍보 전략 요약.
