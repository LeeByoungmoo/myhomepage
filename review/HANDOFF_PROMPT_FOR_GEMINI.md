# 🤝 HANDOFF PROMPT — 소설 사이트 리뷰 & 수정 (Opus → Gemini 인수인계)

> 아래 "복사용 프롬프트" 블록 전체를 Gemini 창에 붙여넣으면 이어서 작업합니다.
> 작성: 2026-10-17 · 진행도: 리뷰 10단계 중 7단계 완료, 수정 작업 0% (아직 아무 파일도 고치지 않음)

---

## 📋 복사용 프롬프트 (여기부터 끝까지 복사)

```
너는 영미권 웹소설 편집자 겸 프론트엔드 개발자야. 이전 에이전트(Claude Opus)가 하던 소설 사이트 리뷰/수정 작업을 이어받아.

## 0. 작업 환경
- 프로젝트: H:\내 드라이브\gemini\novel-game-site  (Vite + React, GitHub Pages 배포: https://leebyoungmoo.github.io/myhomepage/)
- 소설 본문: public\novels\<id>\1.txt ~ N.txt  (Reader가 fetch해서 NovelContent.jsx로 렌더링)
- 원본 원고: H:\내 드라이브\gemini\소설\<작품폴더>\(국문|영문|홈페이지)\
- 리뷰 결과 폴더: review\  ← 먼저 00_REVIEW_PLAN.md 와 step01~07 파일을 읽고 맥락 파악할 것
- 규칙: 파워쉘 명령은 네가 직접 run_command로 실행. 유저에게 복붙시키지 마. 
- 규칙: 파일 수정 전 반드시 백업: public\novels 전체를 review\backup_YYYYMMDD\ 로 복사 후 시작.
- 규칙: 텍스트 파일은 UTF-8(BOM 없음)로 저장. PowerShell Out-File 대신 Python으로 읽고 쓸 것 (한글 경로/인코딩 깨짐 방지).
- 규칙: 각 Phase 끝날 때마다 review\FIX_LOG.md 에 "무엇을/어느 파일/몇 건" 기록 → 토큰 끊겨도 이어갈 수 있게.

## 1. 남은 리뷰 (Step 8~10)
### Step 8 — 사이트 UI 문구 → review\step08_site_ui.md 저장
이미 확인된 문제:
- src\pages\Novels.jsx L97-100 작가 소개: "neon-drenched alleys of neo-Seoul", "cold, unforgiving vacuum of deep space" → 실제 작품에 사이버펑크/우주 배경 없음. 실제 라인업 기준으로 재작성.
- index.html <title>, meta description, og:*, twitter:* : "Cyberpunk", "deep space horror" → 실제 장르(심리 스릴러, 사회 풍자, 포스트아포칼립스, 하드SF, 역사 판타지)로 교체.
- Novels.jsx L12-17 desc/tags (아래 Phase 3 표 참고), Reader.jsx L8-14 NOVELS 제목 맵도 같이 바꿔야 함 (두 곳에 제목이 중복 정의됨).
- Reader.jsx L222: "<Title> - Chapter N" 헤더 + 본문 안 "## Episode N: ..." 가 중복 → 하나로.
### Step 9 — 공통 문제 → review\step09_cross.md
- 이름 중복: Chloe(5작품), Julian(cell-division/echoes/liquidation), Miller(3), Thorne(2), Evelyn(2), David(pressure 아버지/liquidation 주인공), Sarah(2), Arthur(2), Vance(pressure 악역 가문/echoes 주인공). 
  → cell-division이 Julian/Arthur/Chloe 우선권. 나머지 작품의 조연 이름 변경안 표로 제시 (유저 승인 후 치환).
- "grotesque/grotesquely" 사이트 전체 빈도 세서 크러치 워드 리포트.
### Step 10 — review\FINAL_REPORT.md (한국어, 우선순위 매트릭스 Critical/High/Medium/Low + 작품별 요약)

## 2. 수정 작업 (Phase 순서대로, 한 Phase 끝나면 FIX_LOG 기록)

### Phase 1 — 🚨 CRITICAL: 잘못된 콘텐츠
1. atmospheric-pressure 폴더 = 한국어 원문 → public\novels\isolation\*.txt (=Pressure 영어판)으로 교체.
2. isolation 폴더 → 진짜 원고로 교체: H:\내 드라이브\gemini\소설\Isolation Predator in the Dark_아무것도 보이지 않는곳\홈페이지\Part_01_*.md ~ Part_20_*.md
   - 이 파일들은 Blogger HTML임 → 태그 제거, <p> 단위로 문단 분리(문단 사이 빈 줄), 첫 줄은 "## Episode N: 제목".
   - 단어 사이/끝의 깨진 "?" 는 원래 em dash(—)임 (예: "Rumble?" → "Rumble—", "Dark ? Episode" → "Dark — Episode"). 의문문의 ? 는 건드리지 말 것 — 문맥 확인.
   - 순서는 1→20 (Part 번호 기준) 정렬, 1.txt~20.txt로 저장.
3. echoes-of-the-grid\10.txt 끝 "> **Writing Progress Memo ..." 블록 전체 삭제(한글 프롬프트 포함), 20.txt 끝 "> **SERIES COMPLETE** ..." 블록 삭제. 남는 고아 "---" 도 정리. "*End of Episode N*" 줄은 유지해도 됨.

### Phase 2 — HIGH: 헤더/렌더링 (스크립트 일괄)
NovelContent.jsx 규칙: 빈 줄=문단 구분, "# "→h2, "## "→h3, "***"/"---"→장면전환, **굵게**, *기울임*. "###"과 ">"는 미지원.
1. 모든 작품 1줄째 형식을 "## Episode N: 제목" + 빈 줄로 통일:
   - atmospheric-pressure(구 isolation 내용), echoes: 1줄 "# PRESSURE" / "# MEMORIES OF THE BLADE" 삭제 (2줄 ## Episode 는 유지)
   - liquidation, the-day: 1줄 숫자만 있는 줄 삭제, 2줄 제목 → "## Episode N: 제목" + 빈 줄
   - cell-division: 1줄 "Episode N: 제목" → "## Episode N: 제목" + 빈 줄
2. NovelContent.jsx 수정:
   - "### " 지원 추가 (echoes 장소 표기 122건, 예: "### *Seoul, Present Day*") → 작은 이탤릭 가운데 정렬 슬러그 스타일.
   - **한 줄 = 한 문단**으로 변경 (현재 줄바꿈 하나짜리 줄들이 공백으로 합쳐져서, 서로 다른 화자 대사가 한 문단에 붙어 보임. 예: isolation(현 Pressure) 10.txt L23-24). paragraphBuffer.join(' ') 로직을 줄 단위 flush로 바꾸면 전 작품 일괄 해결.
3. 문장부호 정규화(작품 단위로 일관되게): 곧은따옴표 " 로 통일 또는 둥근따옴표로 통일, 말줄임표 "…" 로 통일. 

### Phase 3 — HIGH: 사이트 메타데이터 (Novels.jsx + Reader.jsx 둘 다)
| id | 제목 | tags | desc |
|---|---|---|---|
| atmospheric-pressure | PRESSURE (유저 승인 필요) | Psychological, Family Thriller, Superpowers | In a world where everyone is born with crushing physical power, sixteen-year-old Ian is the only powerless one in a house ruled by his twelve-year-old sister. |
| isolation | Isolation: Predator in the Dark | Psychological Thriller, Death Game | Four strangers wake in a sealed ruin beneath the city. One of them is a killer — and she isn't the only predator in the dark. |
| the-day | The Day the Women Died | Post-Apocalyptic, Survival | One morning, every woman on Earth is dead. The men left behind must find out what they are without them. |
| liquidation | Liquidation | Satire, Survival, Sci-Fi | After ten years in a luxury doomsday bunker, the world's 100 richest people step out into a planet that no longer needs them. Their money is worthless. Their instincts are not. |
| echoes-of-the-grid | Memories of the Blade (유저 승인 필요) | Historical Fantasy, Literary, Korea | A Seoul antiques appraiser finds a bronze blade forged 2,300 years ago — and begins to remember every hand that ever held it. |
| cell-division | Cell Division and the Universe (대안 "Interphase", 유저 승인 필요) | Hard Sci-Fi, Apocalypse | The universe is about to divide like a cell — and a biologist at MIT is the first to notice. |
※ id(폴더명/URL)는 북마크 깨짐 방지를 위해 바꾸지 말 것. 표지 교체 필요 작품: isolation, liquidation, echoes (지금 표지가 장르와 안 맞음) → 유저에게 보고만.

### Phase 4 — MEDIUM: 작품별 본문 교정 (검색 후 수동 교체)
[Pressure / atmospheric-pressure]
- 대사 태그가 다음 줄에 마침표로 분리된 패턴 30건: `"I'm not here to punish you."⏎Ian said.` → `"I'm not here to punish you," Ian said.` (! ? 로 끝나는 대사는 부호 유지하고 태그만 붙임)
- 작은따옴표 용어 13건 'Enforcer' 'Null' 'Low-Tier' 'Family' 'Subject ID' → 따옴표 제거
- EP1: "Mornings in the family home" → "Mornings in the Miller house" (원작 성 '밀러'), 현관 keypad + *Beep-beep-beep.* → 열쇠로 여는 묘사, "Mom... this." → "Mom… what happened to your face?", "Subcutaneous bleeding was already forming a dark bruise" → "A dark bruise was already forming"
- EP10: "For sixteen years, this door had been the entrance to hell" → "For nine years" (Emma 12살, 3살에 능력 발현)
[The Day]
- **'…'** 볼드+작은따옴표 강조 26건 → 일반 텍스트
- EP13 "(사취, 屍臭)" 삭제
- EP1 "my mom back in my hometown" → "my mom back home", 앵커 대사 "V-Viewers…" → 자연스러운 미국 앵커 화법, "passed away" → "died", "cue sheet" → "script", "foreign reports" → "international reports", "Jason reached out out of habit" → "Out of habit, Jason reached over"
- EP9 'kimchi stew' → 'chili'
- "Director Miller"(부장님 직역) → "Mr. Miller, his old boss" 류로
- "Tch..." 삭제, "This son of a bitch really...!" → "You son of a bitch!"
- "unit 802" → "apartment 8B"
- Dylan(크로스드레서) 장면 EP10/EP12: 서술자 시점의 조롱/작은따옴표('female intonation') 제거. 내용 삭제는 하지 말고 유저에게 민감도 이슈로 보고.
[Liquidation]
- EP1 "phytoncide fragrance" → "pine-forest scent", "premium ampoules" → "luxury serums", "two-meter-thick" → "six-foot-thick", "ten square meters" → "a hundred square feet"
- EP8 "3.1 meters by 3.1 meters. Ceiling height: 3 meters." → "Ten feet by ten feet. Ceiling height: ten feet."
- EP12 "blow out my lumbar disc" → "throw out my back"
- "Preston Huntington III, fourth-generation heir" → "third-generation heir"
[Echoes / Memories of the Blade]
- EP1 "Three hundred thousand won" 뒤에 "— about two hundred dollars —" 1회 추가
- 주인공 Julian Vance(서울 출신 감정사) 이름 문제 → 유저 결정 사항으로 보고만
[Isolation]
- "Haa..." → 삭제 또는 "Oh God…", "...!" → "!", 'master key' '00:01' 작은따옴표 제거
[Cell Division]
- "Deja Vu" → "Déjà Vu", 에피소드 제목 아포스트로피 통일

### Phase 5 — 검증 & 배포
1. python review\scan.py 재실행 → korean_hangul / markdown_header 잔재 0 확인 (atmospheric-pressure의 한글이 0이 되어야 함)
2. npm run build 성공 확인 → 로컬 미리보기로 각 작품 1화/마지막화 렌더링 확인
3. 배포는 유저 승인 후 진행 (기존 배포 방식: 프로젝트의 package.json deploy 스크립트 확인)
4. FIX_LOG.md 최종 정리 + 유저에게 "유저 결정 필요 항목" 목록 보고:
   ① Pressure 제목 ② Echoes→Memories of the Blade 개명 ③ Cell Division 개명 ④ Julian Vance 이름 ⑤ 이름 중복 변경안 ⑥ 표지 3종 재제작 ⑦ Dylan 민감도 편집
```

---

## 📎 참고: 이미 저장된 리뷰 파일
- [00_REVIEW_PLAN.md](file:///H:/내%20드라이브/gemini/novel-game-site/review/00_REVIEW_PLAN.md) — 10단계 체크리스트
- step01~step07 — 작품별 상세 근거 (줄 번호, 예문 포함)
- `scan.py`, `dialogue_scan.py` — 재사용 가능한 자동 검사 스크립트
