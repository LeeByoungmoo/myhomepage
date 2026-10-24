# 📑 Round 2 — Phase 1 심층 리뷰 리포트
**대상:** 웹 리더기(UI/타이포그래피/렌더링) + ① *Pressure* (전 20화) + ② *Isolation: Predator in the Dark* (전 20화)

---

## 1. 🖥️ 웹 리더기 타이포그래피 & 마크다운 렌더링 심층 결함 (`src/index.css`, `src/components/NovelContent.jsx`)

1차 리뷰에서는 메타데이터(SEO)와 줄바꿈 병합 버그만 잡았으나, 실제 영미권 독자가 웹소설을 읽는 화면(`index.css` + `NovelContent.jsx`)을 코드 레벨에서 다시 뜯어본 결과 **가독성을 해치는 치명적인 문제 3가지**가 확인되었습니다.

### 🚨 [UI-1] 한국어 조판용 `text-align: justify; word-break: keep-all;`이 영문 본문에 그대로 적용됨
- **위치:** `src/index.css:L433-438` (`.novel-paragraph`)
- **문제점:** 한국어 웹소설 시절에 설정된 `text-align: justify; word-break: keep-all;`이 하이픈(`hyphens: auto`) 처리 없이 영문 소설에 적용되어 있습니다. 영문에서 하이픈 없이 양쪽 정렬(`justify`)을 강제하면 긴 영단어가 있는 줄마다 단어 사이 공백이 강물처럼 벌어지는 **"Rivers of White"** 현상이 발생합니다(특히 모바일 뷰포트에서 심각).
- **개선안:** 영미권 웹소설 표준(Royal Road, Kindle Web, Substack 등)에 맞춰 `text-align: left; word-break: normal; overflow-wrap: break-word;`로 변경해야 합니다.

### 🚨 [UI-2] 모든 영문 이탤릭체(`*...*`)가 형광 하늘색 사이버펑크 네온사인으로 빛남
- **위치:** `src/index.css:L441-448` (`.novel-emphasis`)
  ```css
  .novel-emphasis {
    font-style: italic;
    color: var(--accent-blue, #00f0ff);
    text-shadow: 0 0 10px rgba(0, 240, 255, 0.35);
  }
  ```
- **문제점:** 한국어 웹소설에서는 `*효과음*`에만 별표를 썼지만, **영문 소설에서는 주인공의 내면 독백, 단어 강세(`What *is* that?`), 회상 문장, 역사적 고유명사(`*janggi*`, `*binyeo*`)에 모두 표준 이탤릭(`*...*`)을 사용**합니다. 현재 CSS 때문에 정통 시대극(*Memories of the Blade*)이나 가족 심리극(*Pressure*)에서 주인공이 속마음을 생각할 때마다 **눈부신 형광 하늘색 네온 글로우**가 번쩍거려 몰입을 심각하게 깸.
- **개선안:** `.novel-emphasis`에서 형광 네온 색상(`#00f0ff`)과 `text-shadow`를 제거하고, 본문보다 살짝 밝고 우아한 순수 이탤릭(`color: #f0f0f8; font-style: italic;`)으로 변경해야 합니다.

### 🚨 [UI-3] 에피소드 제목(`## Episode X`) 바로 아랫줄의 구분선 `---`가 장면 전환 기호(`✦ ✦ ✦`)로 중복 렌더링됨
- **위치:** `src/components/NovelContent.jsx:L78` + `atmospheric-pressure/*.txt` (전 20화 L3), `echoes-of-the-grid/*.txt` (전 20화 L3)
- **문제점:** *Pressure*와 *Memories of the Blade*는 모든 에피소드 파일이 아래와 같이 시작합니다:
  ```markdown
  ## Episode 1: The Weight of Air

  ---
  ```
  `NovelContent.jsx`가 `---`를 무조건 `<div className="novel-scene-break"><span>✦ ✦ ✦</span></div>` (`margin: 3.5rem 0`)로 변환하기 때문에, **본문이 시작하기도 전에 소제목 바로 밑에 거대한 장면 전환 별표 `✦ ✦ ✦`가 뜬금없이 박혀서 출력**됩니다. 반면 다른 4개 소설은 소제목 밑에 `---`가 없어 작품 간 헤더 디자인도 불일치합니다.
- **개선안:** `NovelContent.jsx`에서 에피소드 제목(`#` / `##`) 직후에 나오는 첫 번째 `---`는 무시(skip)하거나, 파일 상단의 불필요한 헤더 밑줄 `---`를 제거하여 6개 작품 모두 깔끔하게 제목 바로 아래 본문이 시작되도록 통일해야 합니다.

---

## 2. 📘 작품 ① *Pressure* (`atmospheric-pressure`, 전 20화) 심층 재리뷰

### 🚨 [AP-1] 미처 변경되지 않은 한국 성씨 잔재 (`Han`, `Choi`, `Yoon`, `Park`)
- **발견 내역:**
  - 주인공 가족의 이름(`Ian`, `Emma`, `Sam`, `Robert`, `Helen`)과 배경(`suburban house`, `pancakes`, `bacon`, `Federal Pressure Control Bureau`)은 100% 미국 본토 설정인데, 가족 성씨가 1, 7, 10, 11, 14, 16, 18, 20화에서 한국 성씨 **`Han`** (`the Han house`, `Ian Han`)으로 남아 있습니다. (국문 원작에서도 미국 배경을 의식해 '밀러(Miller) 가문'으로 설정했던 부분)
  - 결정적으로 **11화(`11.txt`)**에서 도시의 다른 세 가족을 소개할 때 한국 성씨가 그대로 남아 있습니다:
    - `11.txt:L11, L32`: **`[The Choi Family - The Perfect House]`**, **`the Choi family`**
    - `11.txt:L36, L41`: **`[The Yoon Family - The Inverted House]`**, **`Tyler Yoon`**
    - `11.txt:L56, L63`: **`[The Park Family - The Normal House]`**, **`Leo Park`** (심지어 1화에서 주인공 친구로 나온 `Leo`의 성씨가 `Park`으로 되어 있음!)
- **교정안:**
  - `Han` 가문 (`the Han house` / `the Han household` / `the Han family` / `Ian Han`) → **`Miller`** (`the Miller house` / `the Miller household` / `the Miller family` / `Ian Miller`, `Novels.jsx` 소개글 포함)
  - `The Choi Family` → **`The Sterling Family`**
  - `The Yoon Family` / `Tyler Yoon` → **`The Brooks Family`** / **`Tyler Brooks`**
  - `The Park Family` / `Leo Park` → **`The Bennett Family`** / **`Leo Bennett`**

### 🚨 [AP-2] 한국어 웹소설식 불완전 단문 조각 (Sentence Fragments)
- **발견 내역:** 한국어 원문의 체언/부사구 종결 연출을 그대로 직역해 영어 문법상 불완전한 문장 조각이 단독 문단으로 떨어져 있는 구간들:
  - `1.txt:L90-91`:
    > `And at the kitchen island.`
    > `His mother, Helen, sat staring blankly into space.`
    - **교정:** 두 줄을 한 문장으로 자연스럽게 결합 (`And at the kitchen island, his mother, Helen, sat staring blankly into space.`)
  - `11.txt:L11, L36, L56`:
    - `[The Choi Family - The Perfect House]` 등 대괄호 표기가 마크다운 소제목(`###`)으로 처리되지 않아 일반 본문 문단과 똑같은 크기로 묻혀 보임 → `### The Sterling Family — The Perfect House` 등으로 소제목 서식 부여 권장.

### 🚨 [AP-3] 과잉 느낌표(`!!!`, `—!!!`) 및 만화적 효과음 표기
- **발견 내역:**
  - `3.txt:L22`: `"STOP IT!!!"` → `"STOP IT!"`
  - `5.txt:L48`: `*CLANG!!*` → `*CLANG!*`
  - `5.txt:L50`: `"Sienna!!! Get your ass out here right now!!!"` → `"Sienna! Get your ass out here right now!"`
  - `5.txt:L71`: `*VWOOOOOOOSH—!!!*` → `*Vwoooosh—!*`
  - `13.txt:L40`: `*CRASH—!!*` → `*CRASH!*`
  - 영미권 출판 소설에서는 느낌표 2~3개 연타(`!!`, `!!!`)를 아마추어 팬픽 스타일로 간주하므로 단일 느낌표(`!`)로 정제 필요.

---

## 3. 📕 작품 ② *Isolation: Predator in the Dark* (`isolation`, 전 20화) 심층 재리뷰

1차 리뷰에서는 짧은 분량(7,900단어)이라 빠르게 넘어갔으나, 실제로 1~20화를 정독한 결과 **6개 작품 중 가장 치명적인 번역투·인명 누락·문법/논리 결함**이 집중 발견되었습니다.

### 🚨 [ISO-1] 미변경 한국 인명 `Eun-ji` (은지) 7회 잔존
- **위치:** `5.txt:L11` (2회), `6.txt:L9` (2회), `14.txt:L33`, `15.txt:L5`, `16.txt:L13`
  - `"That sound... Eun-ji... That's the sound from my daughter Eun-ji's hospital room!"`
  - `"Kicking Eun-ji's corpse away like an insect..."`
- **교정안:** 1차 작업 시 하이픈(`Eun-ji`) 때문에 누락된 한국 이름입니다. 다른 5개 소설과 겹치지 않는 영미권 여자아이 이름 **`Lily`** (`Lily's hospital room`, `Lily's corpse`)로 전수 교체해야 합니다.

### 🚨 [ISO-2] 대사 따옴표 안에 지문/의성어(`"Sob..."`)가 대사로 적혀 있는 치명적 번역투
- **위치:**
  - `2.txt:L31`: `"Sob... He suddenly... He touched my scar... and said I did something to his daughter..."`
  - `3.txt:L19`: `"Sob... I'm so scared. That man suddenly tried to kill me..."`
- **문제점:** 한국어 `"흑... 그 사람이 갑자기..."`의 `"흑..."`을 영단어 `"Sob..."`으로 번역해 따옴표 안에 넣어두어, 등장인물이 입으로 **"Sob(흐느낌)"이라는 단어를 발음하는 코미디 같은 상황**이 되었습니다.
- **교정안:**
  - `2.txt:L31`: `"H-he suddenly..." I sobbed, my voice breaking. "He touched my scar... and said I did something to his daughter..."`
  - `3.txt:L19`: `"I-I'm so scared," I whimpered through fake tears. "That man suddenly tried to kill me..."`

### 🚨 [ISO-3] 설정/호칭 번역 참사: `"the first rival"`, `"literal demon"`, `"tire track scar"`
- **발견 내역:**
  1. **`"Y-You literal demon!"` (`2.txt:L33`):** 딸을 잃은 아버지가 절규하는 장면에서 미국 10대 인터넷 밈 같은 `"literal demon"`(문자 그대로의 악마)을 사용함 → `"Y-You fucking demon!"` 또는 `"You monster!"`로 교정.
  2. **`"the first rival"` / `"the rival"` (`15.txt`, `16.txt`, `17.txt`, `18.txt`, `20.txt` 총 7회):**
     - 15화에서 정체를 드러낸 남자를 지칭할 때 한국어 원문의 `'첫 번째 경쟁자'`라는 설명어를 고유 호칭처럼 직역해, 긴박한 클라이맥스 전투 장면 내내 `"The barrel of my son's gun was aimed at the first rival's head"`, `"The moment the rival flinched"`처럼 게임 유닛 부르듯 서술함.
     - **교정:** 15화 첫 인지 장면에서는 `"my old rival from fifteen years ago"`로 풀고, 이후 지문에서는 **`the man`** 또는 **`the scarred man`**으로 자연스럽게 지칭해야 합니다.
  3. **`"You... you crazy son of a bitch!"` (`17.txt:L25`):**
     - 남자가 여성 주인공(또는 총을 쏜 아들과 얽힌 상황이지만 문맥상 주인공이 시체를 방패 삼아 덮치기 직전/직후)에게 외치는 욕설인데, 남성에게 쓰는 `"son of a bitch"`로 번역되어 대명사/성별 지칭이 혼란스러움 → `"You... you crazy bitch!"` 또는 아들에게 외치는 것임을 명확히 하도록 동작 주체 수식 보강.
  4. **`"A horrific tire track scar slashed across his right eye"` (`17.txt:L11`):**
     - 자동차 바퀴에 얼굴 눈 위가 깔렸는데 타이어 트레드 무늬 흉터가 눈 위에 남았다는 물리적 모순(원문의 차량 추락 사고 흉터 오역) → `"A jagged, horrific crash scar slashed across his right eye"`로 교정.

### 🚨 [ISO-4] 1화 암흑 속 손목 흉터 인지 개연성 보완 (`1.txt:L57-63`)
- **위치:** `1.txt:L57-60`
  > `In the dark, his ragged breath drew so close it brushed my ear. His blunt fingers frantically traced the inside of my right wrist.`
  > `"This scar..."`
- **문제점:** 한 치 앞도 안 보이는 완전한 암흑 속에서 손목을 한 번 잡았다가 손끝 감각만으로 "이 흉터... 내 딸을 죽인 년!"이라고 확신하는 것은 독자에게 작위적으로 느껴집니다(4화에서 톱니 모양의 굵은 켈로이드 흉터임이 밝혀짐).
- **교정안:** 1화 L57에서 손끝에 만져지는 흉터의 독특한 입체감(`the raised, jagged ridge of keloid flesh on the inside of my right wrist`)을 명시해주면 암흑 속 촉각 인지의 개연성이 완벽해집니다.

### 🚨 [ISO-5] 문법 오류 (현수분사, 주격/목적격 관계대명사 오류, 미완성 문장) 및 미서식 효과음 12건
- **문법 오류:**
  - `15.txt:L5`: `"Kicking Eun-ji's corpse away like an insect, there was no longer a trace of desperate fatherly love on the man's face."` (현수분사: `there`가 시체를 발로 찬 주어가 됨) → `"As he kicked Lily's corpse away like an insect, every trace of desperate fatherly love vanished from the man's face."`
  - `17.txt:L15`: `"Ten years ago, my biological son, whom I had shoved off a cliff in a car with cut brakes. My own flesh and blood, whom I thought was permanently crushed..."` (첫 문장 동사 누락 + 두 번째 문장 `whom` 격 오류) → `"It was my biological son—the boy I had shoved off a cliff ten years ago in a car with cut brakes. My own flesh and blood, who I thought had been permanently crushed..."`
- **서식 없는 날것의 효과음(`Rumble—`, `Crash!`, `Beep— Beep— Beep—`, `FLASH!`, `Screeeech!`, `Grrrrr— Bam!`, `Crunch, crack!`, `Slam!`, `BANG!`, `CRASH!` 총 12곳):**
  - 별표(`*...*`) 없이 평문으로 적혀 있어 일반 서술 문단과 구분되지 않음 → 모두 `*Rumble—*`, `*Crash!*` 등 이탤릭 서식으로 통일 필요.
- **잔여 미터법 2건 (`4.txt:L15`, `17.txt:L27` `millimeter`):**
  - `a millimeter away` → `a fraction of an inch away`
  - `didn't miss the millimeter of a gap` → `didn't miss that split-second opening`
