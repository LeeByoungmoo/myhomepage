# 📑 Round 2 — Phase 2 심층 리뷰 리포트
**대상:** ③ *The Day the Women Died* (`the-day`, 전 20화) + ④ *Liquidation* (`liquidation`, 전 30화) + 교차 작품 성씨 충돌 보정

---

## 1. 📙 작품 ③ *The Day the Women Died* (`the-day`, 전 20화) 심층 재리뷰

1차 리뷰에서는 일부 어휘(`bizarre`)와 이름만 교체했으나, 1~20화 본문을 처음부터 정밀 독해한 결과 **한자 병기 잔존, 한국 고유 메신저/주거 문화 잔재, 동 번호 설정 충돌, 한영 색채어 오역** 등 결정적인 문제점들이 발견되었습니다.

### 🚨 [TD-1] 영문 본문 내 한자(Hanja) 병기 4건 잔존
- **발견 내역:** 1차 스캔에서 한글(`가-힣`)만 검사하여 한국어 원문의 한자 병기가 영문 본문에 그대로 남아 있었습니다.
  - `13.txt:L56`: `was the perfect purgatory (煉獄).` → `was the perfect purgatory.`
  - `15.txt:L23`: `This perfect lack of pain (無痛) and lack of blood (無血) was irrefutable evidence` → `This complete absence of pain and blood was irrefutable evidence`
  - `20.txt:L37`: `who lost the mirror called the 'other' (他者), and tore` → `who had lost the mirror known as the 'other,' tearing`

### 🚨 [TD-2] 한국어 청록 미분화 어휘 오역: `"blue sprouts"` (파란 새싹)
- **위치:** `20.txt:L35`
  > `and from the stump of the broken cherry tree, blue sprouts of new life quietly poked their heads out.`
- **문제점:** 한국어 관용 표현인 '파란(푸른) 새싹'을 직역해 영어로 **`blue sprouts`**(실제 파란색 새싹)라고 오역했습니다. 영미권 독자에게는 초현실적 돌연변이나 곰팡이처럼 읽힙니다.
- **교정안:** `fresh green sprouts of new life`로 교정.

### 🚨 [TD-3] 한국 메신저 `KakaoTalk`, 한국어 맞춤법 개념 `spacing habits`, 콩글리시 `the mart`
- **발견 내역:**
  1. **`KakaoTalk` & `spacing habits` (`9.txt:L7, L19`):**
     - 미국인 부부(`Jason` & `Sarah`, 911 신고)인데 10년간 주고받은 메신저가 **`KakaoTalk chat histories`**로 되어 있고, 한국어 특유의 띄어쓰기 습관을 직역한 **`Even her spacing habits and affectionate tone`**이 남아 있습니다.
     - **교정:** `KakaoTalk chat histories` → `text message threads`, `spacing habits` → `typing quirks and punctuation habits`.
  2. **`Swallowing dry saliva` & `a short lead time passed. Text was output to the screen.` (`9.txt:L13, L17`):**
     - 한국어 '마른침을 삼키며'와 회사원 용어 '리드 타임' 및 수동태 직역.
     - **교정:** `Jason swallowed hard and typed.` / `He hit Enter. After a brief pause, a reply appeared on the screen.`
  3. **콩글리시 `the mart` 8회 (`3.txt`, `4.txt`, `5.txt`, `12.txt`):**
     - 영미권에서는 대형 마트를 일반명사 `the mart`로 부르지 않음 (`the supermarket` 또는 `the grocery store`로 전수 교정).

### 🚨 [TD-4] 아파트 동 번호 설정 충돌 (`building 104` vs `Building 4`)
- **발견 내역:**
  - `5.txt:L40`과 `20.txt:L15`에서는 주인공의 집 주소가 **`Building 4, Apartment 8B`**로 되어 있는데,
  - `2.txt:L31`, `5.txt:L5`, `10.txt:L3`, `12.txt:L3`, `16.txt:L3`, `17.txt:L34`, `20.txt:L33`에서는 한국 대단지 아파트 표기인 **`building 104`** (104동)로 되어 있어 **한 작품(심지어 5화 같은 에피소드) 안에서 집 주소가 충돌**합니다.
- **교정안:** 모든 `building 104`를 **`Building 4`**로 통일하고, `12.txt:L3`의 시제 이탈 조각 문장(`The penthouse of building 104, where the king of the camp resides.`)을 과거시제 완전 문장으로 교정.

### 🚨 [TD-5] 잔여 미터법 1건 (`13.txt:L15`) 및 구두점(직선/곡선 따옴표, `…`) 혼용
- `13.txt:L15`: `these damn cells don't divide a single millimeter.` → `these damn cells haven't divided a single micron.` (세포 분열 단위이므로 `micron`이 과학적·자연스러움)
- 본문 내 혼재된 유니코드 말줄임표(`…`) 및 곡선/직선 따옴표 불일치 정제.

---

## 2. 📗 작품 ④ *Liquidation* (`liquidation`, 전 30화) 심층 재리뷰

### 🚨 [LQ-1] 에피소드 8 제목과 본문 간 단위 불일치 + 잔여 미터법 16건 (`liter`, `milliliters`, `gram`, `Celsius`)
- **발견 내역:**
  1. **8화 제목 불일치 (`8.txt:L1`):**
     - 본문(L5~L59)은 이미 `one hundred square feet` / `hundred-square-foot cell`로 변환되었으나, 정작 **L1 에피소드 제목만 `## Episode 8: Memories of a Ten-Square-Meter Cell: Who Wrote the Rules`로 방치**되어 제목과 본문이 서로 다른 단위를 말하고 있습니다.
     - **교정:** `## Episode 8: Memories of a Hundred-Square-Foot Cell: Who Wrote the Rules`
  2. **물 배급 단위 `liter` / `liters` / `milliliters` 14건 (`5.txt`, `11.txt`, `14.txt`, `15.txt`, `16.txt`, `17.txt`, `18.txt`, `19.txt`):**
     - 월스트리트 억만장자들이 물 배급권과 파생상품을 거래하는 핵심 에피소드에서 `one liter`, `thirty liters`, `three hundred milliliters` 등 미터법 부피 단위가 그대로 쓰이고 있습니다.
     - **교정:**
       - `one liter` / `the liter` → `one quart` / `the quart`
       - `three liters` / `ten liters` / `thirty liters` / `dozens of liters` → `three quarts` / `ten quarts` / `thirty quarts` / `dozens of quarts`
       - `three hundred milliliters` → `ten ounces` (`negative three hundred milliliters` → `negative ten ounces`)
       - `one hundred milliliters` → `three ounces`
  3. **기타 미터법 2건 (`28.txt:L58`, `30.txt:L54`):**
     - `28.txt:L58`: `devoid of a single gram of emotion` → `devoid of a single ounce of emotion`
     - `30.txt:L54`: `at eight hundred degrees Celsius` → `at fifteen hundred degrees Fahrenheit`

### 🚨 [LQ-2] 서식 없는 대문자 효과음 34건 & 과잉 느낌표(`!!!`)
- **발견 내역:** 6화~30화에 등장하는 34개의 독립 효과음 줄(`Szzzt—FWASH!`, `CRACK—!`, `WHIIIIIIIRR—BANG!`, `KRAAAAAAASH—!!!`, `THWOCK—ZZZZZT!`, `BEEP—!` 등)이 `*...*` 이탤릭 서식 없이 평문으로 들어가 있어 일반 문단과 섞여 보입니다.
- **교정안:** 34개 독립 효과음 줄에 `*...*` 이탤릭 서식을 부여하고, `!!!`를 단일 `!`로 정제.

### 🚨 [LQ-3] 현수분사(Dangling Participle) 및 반복 상투어 정제
- `8.txt:L3`: `Shutting out the reeking stench and the abrasive bite of the wind, a sealed chamber deep in his memory stirred to life` (`a sealed chamber`가 분사구문의 주어가 되는 문법 오류) → `As he shut out the reeking stench and the abrasive bite of the wind, a sealed chamber deep in his memory stirred to life`
- `13.txt:L23` & `15.txt:L13`: 두 화 연속 거의 똑같은 문장 반복 (`Nathaniel shook his head with graceful finality.` / `Nathaniel shook his head with elegant finality.`) → 15화를 `Nathaniel offered a thin, pitiless smile and refused.`로 변주.

---

## 3. 🔄 교차 작품 인명(Cross-Novel Name) 완전 무결성 보정
- Phase 1에서 *Pressure* 11화의 조연 가문명에 사용한 `Sterling`, `Bennett`이 *Liquidation*의 주인공 성씨(`David Sterling`, `Claire Bennett`)와 겹치고, *Isolation*의 죽은 딸 이름 `Lily`가 *The Day the Women Died*의 `Lily`와 겹치는 것을 전수 대조로 확인했습니다.
- **즉시 보정:**
  - *Pressure* `11.txt`: `Sterling` → **`Mercer`**, `Bennett` → **`Keller`**
  - *Isolation* `5, 6, 14, 15, 16.txt`: `Lily` → **`Hannah`**
  - 이로써 6개 작품 전체에서 단 하나의 조연 이름/성씨도 겹치지 않게 됩니다.
