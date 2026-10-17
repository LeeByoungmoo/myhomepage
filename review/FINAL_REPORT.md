# 📘 웹소설 사이트 영미권 현지화 및 품질 종합 검수 리포트 (Final Report)

- **검수 대상:** `https://leebyoungmoo.github.io/myhomepage/` (`novel-game-site` 내 6개 작품, 총 130화 / 약 16.8만 단어)
- **검수 관점:** 영미권(미국/영국) 네이티브 독자 및 문학 편집자 기준 (기호, 조판, 대화문 호흡, 한영 번역투/K-문화 잔재, 작명, UI/SEO 일관성)
- **진행 상태:** 10단계 전 과정 완료 (`step01` ~ `step09` 세부 리포트 및 본 종합 리포트)

---

## 1. 총평 및 현재 적용 현황 요약

전체 6개 작품 중 **《Memories of the Blade》(구 Echoes of the Grid)**, **《Cell Division and the Universe》**, **《Liquidation》** 3편은 영미권 장르소설 시장에 바로 내놓아도 손색없을 만큼 문장력과 서사 밀도가 뛰어납니다. 나머지 3편(**《Pressure》**, **《Isolation》**, **《The Day the Women Died》**) 역시 강력한 훅(Hook)을 갖추고 있으나, **한국 웹소설 특유의 조판·기호 습관**과 **한국 생활문화 잔재(단지형 아파트, 도어락, 직함 등)**가 몰입을 깨는 요소로 확인되었습니다.

### ✅ 1차 긴급 패치 완료 항목 (커밋 `9b71d6a` 반영 완료)
이전 점검 직후 가장 치명적이었던 구조적 결함들은 이미 코드와 본문에 1차 반영되었습니다:
1. **폴더 오배치 해결:** 한국어 원문이 노출되던 `atmospheric-pressure`에 영문판 《Pressure》를 배치하고, 누락되었던 진짜 《Isolation: Predator in the Dark》 영문 본문(20화)을 HTML 태그 제거 후 `isolation` 폴더에 정상 이식 완료.
2. **AI 작업 메모 노출 삭제:** 《Memories of the Blade》 10화·20화 말미에 남아 있던 한글 프롬프트(`"칼의 기억 소설 이어서 써줘..."`) 및 진행 메모 블록 삭제 완료.
3. **헤더 규격 통일 및 `###` 렌더링 지원:** 전 작품 첫 줄을 `## Episode N: 부제` 형식으로 통일하고, `NovelContent.jsx`에서 `###` 소제목을 지원하도록 개선 완료.
4. **사이트 메타데이터 1차 교정:** `Novels.jsx`와 `Reader.jsx`의 잘못된 제목(`Echoes of the Grid` → `Memories of the Blade`, `Atmospheric Pressure` → `Pressure`), 장르 태그, 줄거리, 작가 소개 문구 수정 완료.
5. **《The Day the Women Died》 1차 정화:** 본문 내 한자 병기 `(사취, 屍臭)` 및 과도한 볼드 강조(`**'...'**` 26건) 제거 완료.

---

## 2. 아직 남아 있는 필수 수정 사항 (우선순위별)

### 🚨 Priority 1 (즉시 수정 권장 — 독자 체감도 최상)

| 구분 | 문제 현상 | 위치 / 건수 | 해결 방안 |
|---|---|---|---|
| **렌더링 버그** | **서로 다른 인물의 대사가 한 문단으로 합쳐져 출력됨**<br>영미권 출판 규칙상 화자가 바뀌면 반드시 문단이 분리되어야 하나, 현재 `NovelContent.jsx`가 단일 줄바꿈(`\n`)을 공백으로 합쳐버려 두 인물의 대화가 한 줄에 이어져 보임 | 전 작품 **276건+**<br>(`NovelContent.jsx` L55) | `NovelContent.jsx`에서 단일 줄바꿈도 독립 `<p>` 문단으로 분리하도록 1줄 수정 (즉시 전 작품 해결) |
| **한글 잔재** | **20화 본문 간판에 한국어 원작 주인공 이름 노출**<br>`**서진우 골동품 감정**` `*Julian Vance — Antiques Assessment*` | `echoes-of-the-grid/20.txt` | 영문 간판으로 교체하거나, 주인공 이름을 아예 `Seo Jin-woo`로 복원 |
| **SEO / 공유 태그** | **구글 검색·링크 공유 시 옛날 제목/엉터리 장르 노출**<br>`index.html`에 여전히 "Echoes of the Grid", "deep space horror, cyberpunk thrillers"로 기재됨 | `index.html` L7~15 | 실제 작품 라인업과 장르(Psychological Thriller, Dark Satire, Hard Sci-Fi, Historical Fantasy)로 메타태그 전면 교체 |

---

### ⚠️ Priority 2 (본문 디테일 교정 — 영미권 독자가 어색해하는 기호·말투·문화)

#### ① 기호 및 대화문 조판 (Punctuation & Dialogue Mechanics)
1. **대사 태그(Dialogue Tag) 줄바꿈 분리 (총 43건, 《Pressure》 30건·《Liquidation》 10건 집중):**
   - **현재:**
     ```
     "I'm not here to punish you."
     Ian said.
     ```
   - **영미권 표준:** `"I'm not here to punish you," Ian said.` (마침표 대신 쉼표로 닫고 같은 문단에서 소문자로 이어야 자연스러움)
2. **한국식 작은따옴표 강조 (`'Enforcer'`, `'Null'`, `'Water Voucher'`, `'Fake Mary'` 등 24건):**
   - 한국 웹소설에서는 고유 설정어나 강조어에 작은따옴표(`' '`)를 쓰지만, 영미권 독자에게는 **비꼬는 표현(scare quotes)**이거나 **영국식 인용부호 오류**로 보입니다.
   - **수정:** 첫 등장 시에만 `*이탤릭*` 처리하거나 대문자 고유명사(`Enforcer`, `Null`)로 따옴표 없이 표기.
3. **인코딩 손실로 깨진 줄임표·대시(`?`, `...!`):**
   - 《Isolation》 본문에서 원래 엠대시(`—`)였던 기호가 `?`로 깨진 곳(`Rumble?` → `Rumble—`)과, 한국 웹툰식 문장부호 `...!`(`daughter...!` → `daughter!`) 교정.

#### ② 한국식 생활문화·직역투(Translationese) 교정 목록
| 작품 | 현재 표현 (문제점) | 영미권 자연스러운 수정안 |
|---|---|---|
| **Pressure** | EP1 `Mornings in the family home` (원작 '밀러 가문' 성씨 누락) | `Mornings in the Miller house` |
| **Pressure** | EP1 미국 교외 주택 현관의 디지털 도어락(`keypad` + `*Beep-beep-beep.*`) | 열쇠(`key in the deadbolt`) 묘사로 변경 |
| **Pressure** | EP1 `"Mom... this."` ("엄마… 이거." 직역) / `Subcutaneous bleeding` (피하출혈) | `"Mom… what happened to your face?"` / `A dark bruise` |
| **Pressure** | EP10 `"For sixteen years, this door had been the entrance to hell"` (설정 오류: 여동생 에마는 12살, 3살에 능력 발현 = 9년) | `"For nine years..."` |
| **Isolation** | `"Haa... Ma'am..."` (한국어 한숨 '하아' 음차 — 영어권 독자는 웃음소리로 오해) | `"Oh God… ma'am…"` |
| **The Day** | EP1 `"my mom back in my hometown"` ('고향' 직역) | `"my mom back home"` |
| **The Day** | EP1 뉴스 앵커 `"V-Viewers… passed away"`, `"cue sheet"`, `"foreign reports"` (시청자 여러분/별세/큐시트/외신 직역) | `"We're getting reports… every woman on Earth has died"`, `"script"`, `"international reports"` |
| **The Day** | EP3 `"Director Miller"` ('부장님' 직역 — 미국 회사에서 상사를 직함+성으로 부르지 않음) | `"Mr. Miller"` 또는 `"his old boss, Miller"` |
| **The Day** | EP9 검색어 `'kimchi stew'`, 아파트 호수 `unit 802` | `'chili'` 또는 `'chicken soup'`, `apartment 8B` |
| **The Day** | `"Tch..."` (일본/한국 서브컬처 혀 차는 소리), `"This son of a bitch really...!"` | `"Christ."`, `"You son of a bitch!"` |
| **Liquidation** | EP1 `"phytoncide fragrance"` (피톤치드 — 한국식 웰빙 용어), `"premium ampoules"` (K-뷰티 용어) | `"pine-forest scent"`, `"luxury serums"` |
| **Liquidation** | EP1, EP8 미국 맨해튼 배경인데 미터법 사용 (`two-meter-thick`, `ten square meters`, `3.1 meters`) | 야드파운드법 병기 또는 변환 (`six-foot-thick`, `a hundred square feet`, `ten feet by ten feet`) |
| **Liquidation** | EP1 `"Preston Huntington III, fourth-generation heir"` (3세인데 4대손 모순) | `"third-generation heir"` (또는 `IV`) |
| **Liquidation** | EP12 `"blow out my lumbar disc"` ('허리 디스크 나간다' 직역) | `"throw out my back"` |
| **Memories of the Blade** | EP1 `"Three hundred thousand won"` (환율 감각 없는 독자 배려) | 첫 등장 시 `"Three hundred thousand won — barely two hundred dollars —"` 부연 |

#### ③ 과잉 반복 어휘 (Crutch Words)
- **《Liquidation》의 `grotesque / grotesquely` (총 64회, 회당 평균 2.1회):** AI 번역이 '기괴한/기형적인'을 전부 `grotesque`로 일대일 매칭한 결과입니다. 70%가량을 문맥에 맞게 `obscene`, `absurd`, `warped`, `surreal`, `perverse`로 분산하면 문장 품격이 크게 올라갑니다.
- **《The Day the Women Died》의 `bizarre` (총 27회):** `uncanny`, `eerie`, `unnatural`, `surreal`로 분산 권장.

---

### 🎨 Priority 3 (작가/대표님 의사결정 필요 항목)

1. **작품 간 캐릭터 이름 중복 해소 (AI 작명 티 지우기):**
   - 현재 6개 작품에서 **Chloe(4작품)**, **Julian(3작품)**, **David(2작품)**, **Sarah(2작품)**, **Arthur(2작품)**, **Thorne(2작품)**, **Vance(2작품)**가 겹칩니다.
   - **특히 《Memories of the Blade》 주인공 `Julian Vance`:** 서울 강남 아파트에서 자라고 국립중앙박물관을 나온 한국인 고미술 감정사인데 이름만 영미권 이름이고, 20화 간판에는 원작 이름 **서진우(`서진우 골동품 감정`)**가 그대로 남아 있습니다.
   - 👉 **추천:** 《Memories of the Blade》 주인공은 한국 이름 **`Seo Jin-woo` (진우)**로 복원하고, 나머지 작품의 겹치는 조연 이름들은 `step09_cross.md`의 대체안(Chloe→Claire/Rachel, David→Robert, Sarah→Mary 등)으로 일괄 치환하는 것을 추천합니다.
2. **표지 이미지 3종 재제작 여부:**
   - 본문과 메타데이터는 바로잡았으나, 표지 일러스트 3종(**《Memories of the Blade》** 사이버펑크풍, **《Isolation》** 우주선풍, **《Liquidation》** 미래 요원풍)은 아직 이전 장르 이미지입니다. 원하시면 실제 줄거리에 맞는 8K 실사 표지로 재제작할 수 있습니다.
3. **《The Day the Women Died》 10·12화 딜런(Dylan, 크로스드레서) 묘사 수위:**
   - 향후 레딧(Reddit) 등 영미권 커뮤니티 홍보 시 젠더/퀴어 비하로 오해받지 않도록, 인물들의 폭력성은 유지하되 제3자 서술자의 조롱조 묘사(`disastrous` 화장 등)만 담백하게 다듬는 것을 권장합니다.

---

## 3. 산출물 파일 목록 (`novel-game-site/review/`)
- [00_REVIEW_PLAN.md](file:///H:/내%20드라이브/gemini/novel-game-site/review/00_REVIEW_PLAN.md) — 10단계 체크리스트 (10/10 완료)
- [step01_auto_scan.md](file:///H:/내%20드라이브/gemini/novel-game-site/review/step01_auto_scan.md) — 전 작품 자동 스캔 요약
- [step02_atmospheric.md](file:///H:/내%20드라이브/gemini/novel-game-site/review/step02_atmospheric.md) — 《Pressure》 정밀 검수
- [step03_isolation.md](file:///H:/내%20드라이브/gemini/novel-game-site/review/step03_isolation.md) — 《Isolation》 정밀 검수
- [step04_the_day.md](file:///H:/내%20드라이브/gemini/novel-game-site/review/step04_the_day.md) — 《The Day the Women Died》 정밀 검수
- [step05_liquidation.md](file:///H:/내%20드라이브/gemini/novel-game-site/review/step05_liquidation.md) — 《Liquidation》 정밀 검수
- [step06_echoes.md](file:///H:/내%20드라이브/gemini/novel-game-site/review/step06_echoes.md) — 《Memories of the Blade》 정밀 검수
- [step07_cell_division.md](file:///H:/내%20드라이브/gemini/novel-game-site/review/step07_cell_division.md) — 《Cell Division and the Universe》 정밀 검수
- [step08_site_ui.md](file:///H:/내%20드라이브/gemini/novel-game-site/review/step08_site_ui.md) — 사이트 UI·렌더러·SEO 검수
- [step09_cross.md](file:///H:/내%20드라이브/gemini/novel-game-site/review/step09_cross.md) — 작품 간 이름 중복·클리셰 빈도·우선순위 매트릭스
- [FINAL_REPORT.md](file:///H:/내%20드라이브/gemini/novel-game-site/review/FINAL_REPORT.md) — 본 최종 종합 리포트
