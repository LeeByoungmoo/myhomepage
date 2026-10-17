# 🛠️ 전체 소설(6편, 130화) 및 프론트엔드 교정 완료 로그 (`FIX_LOG.md`)

- **백업 경로:** `review/backup_20261017/` (교정 전 원본 130개 파일 전체 보존)
- **검증 결과:**
  - `korean_hangul` (본문 내 한글 잔재): **0건**
  - `tag-split` (줄바꿈으로 분리된 대사 태그 오류): **0건**
  - `metric` (미국 배경 작품 내 미터법 표기): **0건**
  - 작품 간 캐릭터 이름 중복: **0건** (전원 영미권 자연스러운 이름으로 배정)
  - 프론트엔드 프로덕션 빌드 (`npm run build`): **성공 (에러 0건)**

---

## 1. 프론트엔드·UI·SEO 개선 내역
1. **[`src/components/NovelContent.jsx`](file:///H:/내%20드라이브/gemini/novel-game-site/src/components/NovelContent.jsx#L119-L125)**
   - 단일 줄바꿈(`\n`)으로 이어진 서로 다른 화자의 대사 **276건+**가 한 문단(`<p>`)으로 병합되던 버그를 해결하여, 각 줄이 독립된 `<p>` 문단으로 렌더링되도록 수정.
2. **[`src/pages/Reader.jsx`](file:///H:/내%20드라이브/gemini/novel-game-site/src/pages/Reader.jsx#L221-L223)**
   - 본문 첫 줄의 `## Episode N: 부제`와 상단 `<h1>Novel - Chapter N</h1>`이 중복 충돌하던 문제를 해결하여, 상단에는 작품 타이틀만 세련되게 표시되도록 정리.
3. **[`src/pages/Novels.jsx`](file:///H:/내%20드라이브/gemini/novel-game-site/src/pages/Novels.jsx#L12)**
   - 《Pressure》 시놉시스에 복원된 가문 성씨(`the Miller house`) 반영.
4. **[`index.html`](file:///H:/내%20드라이브/gemini/novel-game-site/index.html#L7-L15)**
   - `<title>`, `description`, `keywords`, `og:*`, `twitter:*` 메타태그에서 구 제목(*Echoes of the Grid*, *Atmospheric Pressure*) 및 잘못된 장르(*cyberpunk*, *deep space horror*)를 모두 제거하고 실제 6개 작품 타이틀과 장르로 전면 교체.

---

## 2. 작품 간 캐릭터 이름 중복 전면 해소 (총 772곳 치환, 전부 외국인 이름)

| 작품 | 기존 이름 (중복 발생) | 변경된 새 외국인 이름 | 비고 |
|---|---|---|---|
| **Pressure** (`atmospheric-pressure`) | `David` (아버지, 67회)<br>`Sarah` (어머니, 44회)<br>`Director Thorne` (11회)<br>가문 성씨 누락 | **`Robert`**<br>**`Helen`**<br>**`Director Graves`**<br>**`Miller` 가문** | *Liquidation*의 주인공 `David`, *The Day*의 `Sarah`, *Cell Division*의 `Dr. Thorne`과 완전 분리 |
| **Memories of the Blade** (`echoes-of-the-grid`) | `Julian Vance` (주인공, 228회)<br>`Dylan Vance` (아버지, 13회)<br>`Chloe` (24회)<br>`Charles` (26회) | **`Adrian Locke`**<br>**`Nolan Locke`**<br>**`Clara`**<br>**`Benedict`** | *Cell Division*의 `Julian`, *Pressure*의 `Vance` 가문, *The Day*의 `Dylan`과 완전 분리 |
| **Liquidation** (`liquidation`) | `Julian "Jules" Cross` (97회)<br>`Chloe` (95회)<br>`Arthur Lindley` (69회)<br>`Richard` (16회) | **`Lucas "Luke" Cross`**<br>**`Claire`**<br>**`Walter Lindley`**<br>**`Raymond`** | *Cell Division*의 `Julian`, `Chloe`, `Arthur Finch`, `Richard Finch`와 완전 분리 |
| **The Day the Women Died** (`the-day`) | `Director Miller` / `Miller` (13회)<br>`Chloe` (딸, 6회) | **`Mr. Callahan` / `Callahan`**<br>**`Lily`** | 한국식 직함('부장님' 직역 `Director`)까지 함께 해결 |
| **Cell Division and the Universe** (`cell-division`) | `Miller` (50회)<br>`Evelyn` (13회) | **`Keller`**<br>**`Eleanor`** | 주연진(`Arthur Finch`, `Julian Mercer`, `Chloe`, `Dr. Thorne`, `Silas`) 고유 유지 |

---

## 3. 영미권 독자 시점 기호·말투·문화·번역투 교정 내역

- **한글 잔재 완전 제거 (`echoes-of-the-grid/20.txt`):**
  - `**서진우 골동품 감정**\n*Julian Vance — Antiques Assessment*` → `**LOCKE ANTIQUES & APPRAISAL**\n*Adrian Locke — Fine Art & Historical Artifacts*`
- **분리된 대사 태그 결합 (전 작품 49건 → 0건):**
  - `"I'm not here to punish you."\nIan said.` → `"I'm not here to punish you," Ian said.` 등 마침표·줄바꿈으로 끊어진 대사 태그를 영미권 출판 표준에 맞게 결합.
- **한국식 작은따옴표 설정어·독백 정리 (전 작품 35건):**
  - `'Enforcer'`, `'Null'`, `'Water Voucher'`, `'Fake Mary'`, `'Worship of Pain'`, `'Eden'` 등 불필요한 작은따옴표 제거 및 단독 줄 작은따옴표 독백을 `*이탤릭체*`로 변환.
- **한국 생활문화·직역투·단위·설정 오류 교정 (총 80건):**
  - **《Pressure》**: 미국 단독주택 현관의 디지털 도어락(`keypad` + `*Beep-beep-beep*`)을 열쇠(`key in the front door lock` + `*Click.*`)로 수정, `"Mom... this."` → `"Mom... your face."`, `Subcutaneous bleeding` → `Broken blood vessels`, 10화 설정 오류(`sixteen years` → `nine years`) 교정.
  - **《Isolation》**: 인코딩 깨진 대시 `Rumble?` → `Rumble—`, 한국식 한숨 `"Haa..."` → `"Oh God..."` / `"Hah... hah..."`, 웹툰식 문장부호 `...!"` → `!"` 교정.
  - **《The Day》**: `hometown` → `back home`, 뉴스 앵커 직역투(`V-Viewers… passed away`, `cue sheet`, `foreign reports`)를 미국 보도 화법으로 재작성, `Building 104, Unit 802` → `Building 4, Apartment 8B`, `'kimchi stew'` → `'chicken noodle soup'`, `"Tch..."` → `"Christ..."`, `"Bwahaha!"` → `"Hah!"`, `"This son of a bitch really...!"` → `"You son of a bitch!"`, 딜런(Dylan) 외모 묘사 톤 완화.
  - **《Liquidation》**: `phytoncide fragrance`(피톤치드) → `pine-forest scent`, `premium ampoules` → `luxury serums`, `blow out my lumbar disc` → `throw out my back`, `Preston Huntington III / IV` 표기 혼선을 4대손 설정에 맞춰 `Preston Huntington IV`로 통일, 맨해튼 배경 내 미터법(`meters`, `square meters`, `kilometers`) 전량을 야드파운드법(`feet`, `square feet`, `miles`)으로 변환.
  - **《Memories of the Blade》**: `"Three hundred thousand won"` 첫 등장 시 `"—barely two hundred dollars"` 환산 문구 추가.
  - **반복 어휘(Crutch Words) 분산**: 《Liquidation》의 과도한 `grotesque/grotesquely` 중 28건(`obscene, perverse, warped, macabre, surreal, monstrous`), 《The Day》의 `bizarre` 중 12건(`uncanny, eerie, surreal, unnatural`)을 문맥에 맞게 다양화.
