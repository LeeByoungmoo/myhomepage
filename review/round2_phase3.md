# 📑 Round 2 — Phase 3 심층 리뷰 리포트
**대상:** ⑤ *Memories of the Blade* (`echoes-of-the-grid`, 전 20화) + ⑥ *Cell Division and the Universe* (`cell-division`, 전 20화) + 교차 작품 성씨 최종 정리

---

## 1. 📓 작품 ⑤ *Memories of the Blade* (`echoes-of-the-grid`, 전 20화) 심층 재리뷰

6개 작품 중 가장 문장력이 뛰어나고 서사 스케일이 큰 작품이지만, 1~20화를 정독하며 인물 관계도와 계보를 대조한 결과 **1차 자동 치환으로 인해 발생한 치명적인 대사 모순, 지킴이(Keeper) 순번 충돌, 가계도 성씨 모순, 하단 종료 태그 중복**이 발견되었습니다.

### 🚨 [MB-1] 14화 강 노인(`Mr. Kael` / `Kang Tae-ho`)의 정체 고백 대사 모순 (`14.txt:L55-59`, `4.txt:L9`)
- **발견 내역 (`14.txt:L55-59`):**
  ```text
  "My name," Mr. Kael said, "is not Kang."

  Adrian waited.

  "My name is Kang Tae-ho. I am the twentieth keeper..."
  ```
- **문제점:** 을지로 골동품 가게 사업자등록증에 적힌 가명 `Mr. Kael`로 불리던 노인이 14화에서 본명(`Kang Tae-ho`, 강태호)을 밝히는 결정적인 장면인데, 대사가 **`"My name is not Kang... My name is Kang Tae-ho"` ("내 이름은 강 씨가 아닙니다... 내 이름은 강태호입니다")**라는 황당한 모순으로 적혀 있습니다. 또한 4화(`4.txt:L9`)에서는 주인공이 아직 노인의 본명(`Kang`)을 알기 전인데 `"The moment I walked into that shop, Kang knew what..."`이라고 부르고 있습니다.
- **교정안:**
  - `14.txt:L55`: `"My name," Mr. Kael said, "is not Kael."` ("제 본명은 카엘이 아닙니다. 제 이름은 강태호입니다.")
  - `4.txt:L9`: `Kang knew` → `Kael knew`

### 🚨 [MB-2] 지킴이(Keeper) 순번 충돌: 19대 지킴이가 한 화 안에서 두 명으로 충돌 (`14.txt:L59` vs `14.txt:L207`)
- **발견 내역:**
  - `14.txt:L59`: `"My name is Kang Tae-ho. I am the twentieth keeper... My father was the nineteenth. His father was the eighteenth."` (강태호의 아버지가 19대, 할아버지가 18대라고 진술)
  - `14.txt:L207`: `"Because your father [Nolan Locke] was the nineteenth keeper," Mr. Kael said. "And he asked me to erase him."` (주인공의 아버지 Nolan이 19대라고 진술!)
- **문제점:** 같은 14화 안에서 19대 지킴이(`the nineteenth keeper`)가 강태호의 아버지였다가 150줄 뒤에는 주인공의 아버지(Nolan)로 바뀌는 설정 충돌이 발생합니다.
- **교정안:** 16화 스토리에 따르면 할아버지(17대) → 아버지(18대)를 거쳐 1988~1993년에 주인공 아버지 Nolan이 19대(`nineteenth keeper`)로 검을 연구하다가 자기 이름을 지워달라고 부탁한 뒤 강태호(20대, `twentieth keeper`)에게 검이 돌아왔으므로, `14.txt:L59`를 `"My father was the eighteenth. His father was the seventeenth."`로 수정하면 14·16·19화의 계보가 완벽히 맞물립니다.

### 🚨 [MB-3] 16화 가계도(혈통) 성씨 모순 (`16.txt:L61`)
- **발견 내역 (`16.txt:L61`):**
  > `He [Nolan Locke] had inherited the blade from his mother in 1986 — his mother, who had received it from her father-in-law, the schoolteacher Park Jung-tae, who had carried it home from the Korean War...`
- **문제점:** Nolan의 어머니가 **시아버지(`her father-in-law`)인 박중태(`Park Jung-tae`)**에게서 검을 물려받았다면, 박중태는 Nolan의 친할아버지(부계 직계)이므로 Nolan과 Adrian의 성씨는 `Locke`가 아니라 `Park`이어야 합니다.
- **교정안:** `her father-in-law`를 **`her father`**(어머니의 친정아버지, 즉 외할아버지 박중태)로 한 단어만 수정하면, 어머니가 한국인 박중태의 딸이고 아버지가 `Locke` 성씨를 가진 가계도가 되어 주인공 이름 `Adrian Locke`와 한국전쟁 참전 용사 `Park Jung-tae`의 직계 혈통이 100% 개연성 있게 연결됩니다.

### 🚨 [MB-4] 전 20화 하단 `---` + `*End of Episode X*` + `---` 중복 렌더링
- **발견 내역:** 다른 5개 작품과 달리 *Memories of the Blade*만 모든 에피소드 파일 맨 끝에 `---`, `*End of Episode X*`, `---`가 들어 있어, 리더기 하단에 `✦ ✦ ✦` 장면 전환선이 두 번 연속 출력되고 기본 안내문(`You have reached the end of the chapter.`)과 중복됩니다.
- **교정안:** 전 20화 파일 말미의 불필요한 `---` 및 `*End of Episode X*` 줄을 깔끔하게 제거하여 6개 작품의 챕터 종료 UI를 통일합니다.

### 🚨 [MB-5] 현대/서술 파트의 잔여 미터법 8건 (`centimeters`, `meters`)
- `1.txt:L57`: `perhaps sixty centimeters long` → `perhaps two feet long`
- `1.txt:L101`: `perhaps two centimeters across` → `nearly an inch across`
- `3.txt:L17`: `perhaps four centimeters long` → `about an inch and a half long`
- `5.txt:L105`: `perhaps four meters square` → `perhaps twelve feet square`
- `5.txt:L230`: `running at fifteen meters` → `running fifty feet high`
- `10.txt:L187`: `across thirty meters of river` → `across a hundred feet of river`
- `15.txt:L27`: `across fifty meters of dirt track` → `across fifty yards of dirt track`
- `18.txt:L107`: `measured not in meters or years` → `measured not in miles or years`
- *(참고: `18.txt:L29`의 `1,100 degrees Celsius. Human blood boils at 100 degrees.`는 검의 의식이 합금 녹는점과 끓는점을 과학적 수치로 대비하는 대목이므로 그대로 유지)*

---

## 2. 📓 작품 ⑥ *Cell Division and the Universe* (`cell-division`, 전 20화) 심층 재리뷰

### 🚨 [CD-1] 비발화 동사(Non-Speech Action) 쉼표 연결 오류(Comma Splice) 5건
- **발견 내역:** 1차 자동 스크립트가 대사 뒤의 독립 문장을 발화 태그로 오인해 마침표(`."`)를 쉼표(`,"`)로 바꾼 문법 오류들:
  - `1.txt:L45`: `"Shut up and look at the data," Julian’s voice trembled` → `"Shut up and look at the data." Julian’s voice trembled`
  - `12.txt:L33`: `"Arthur," Julian’s voice was a ragged whisper beside me.` → `"Arthur." Julian’s voice was a ragged whisper beside me.`
  - `13.txt:L83`: `"We hit... a roadblock," Silas’s voice finally came through` → `"We hit... a roadblock." Silas’s voice finally came through`
  - `17.txt:L27`: `"Silas..." my voice trembled violently.` → `"Silas..." My voice trembled violently.`
  - `17.txt:L63`: `"Let go, Dr. Finch. We're out of time," Thorne frowned.` (`frowned`는 표정 동사) → `"Let go, Dr. Finch. We're out of time." Thorne frowned.`
  - *(추가: *Pressure* `1.txt:L22`의 `"Good morning," Robert forced a bright tone.`도 `"Good morning," Robert said, forcing a bright tone.`으로 함께 교정)*

### 🚨 [CD-2] 20화 수통 용량 단위(`Half a liter`) 및 14화 평문 효과음(`CRACK!`)
- `14.txt:L25`: 평문 `CRACK!` → `*CRACK!*` 이탤릭 서식 통일
- `20.txt:L7`: 미국인 전술 팀원 Thorne이 보고하는 대사 중 `"Half a liter of water left in Keller's canteen."` → `"Half a quart of water left in Keller's canteen."` (총기 구경 `nine-millimeter`, `5.56 millimeter`는 미국 군사 표준 명칭이므로 유지)

---

## 3. 🔄 교차 작품 조연 성씨 최종 보정 (`atmospheric-pressure/11.txt`)
- *Cell Division*에 등장하는 `Julian Mercer` 및 `Keller`와 겹치지 않도록, *Pressure* 11화의 세 가문명을 6개 작품 전체에서 완전히 고유한 **`The Prescott Family`**, **`The Winslow Family`** (`Tyler Winslow`), **`The Donovan Family`** (`Leo Donovan`)로 최종 확정합니다.
