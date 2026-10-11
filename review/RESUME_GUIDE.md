# 📑 소설 검토(Novel Review) 진행 현황 및 재개 가이드

> **작업 일시:** 2026-10-11 21:50  
> **상태:** 총 10단계 중 **Step 7 완료 (70% 진행 완료)** / 토큰 제한으로 일시 중단  
> **체크포인트 파일:** `novel-game-site/review/00_REVIEW_PLAN.md`

---

## 🚦 전체 진행 현황판

| 단계 | 검토 대상 | 결과 파일 | 진행 상태 |
|:---:|---|---|:---:|
| **Step 1** | 전 소설 자동 스캔 (한국어 잔재, 기호, 마크다운 누락) | `step01_auto_scan.md` | ✅ 완료 |
| **Step 2** | *Atmospheric Pressure* (공기의 무게) 본문 정밀 검토 | `step02_atmospheric.md` | ✅ 완료 |
| **Step 3** | *Isolation: Predator in the Dark* 본문 정밀 검토 | `step03_isolation.md` | ✅ 완료 |
| **Step 4** | *The Day the Women Died* 본문 정밀 검토 | `step04_the_day.md` | ✅ 완료 |
| **Step 5** | *Liquidation* 본문 정밀 검토 | `step05_liquidation.md` | ✅ 완료 |
| **Step 6** | *Echoes of the Grid* (실제: *Memories of the Blade*) 검토 | `step06_echoes.md` | ✅ 완료 |
| **Step 7** | *Cell Division and the Universe* 본문 정밀 검토 | `step07_cell_division.md` | ✅ 완료 |
| **Step 8** | **사이트 UI 텍스트 검토 (제목, 시놉시스, 작가 소개, 태그)** | `step08_site_ui.md` | ⬜ **[다음 시작점]** |
| **Step 9** | **소설 간 교차 이슈 (주인공 이름 중복 해소, 우선순위 매트릭스)** | `step09_cross.md` | ⬜ 대기 |
| **Step 10** | **최종 종합 리포트 및 액션 플랜 수립** | `FINAL_REPORT.md` | ⬜ 대기 |

---

## 🚨 오퍼스(Opus)가 발견한 핵심 크리티컬 이슈 TOP 4 → ✅ 전량 수정 완료 (제임스 패치 완료)

> **수정 완료 상세 리포트:** `novel-game-site/review/00_FIXES_APPLIED_BY_JAMES.md` 참고

1. **✅ [해결완료] 소설 폴더 뒤바뀜 버그 (Critical):**
   * `public/novels/atmospheric-pressure/`에 영어 번역본(*Pressure*)을 배치하고 중복 헤더 제거 완료.
   * `public/novels/isolation/`에 진짜 *Isolation: Predator in the Dark* 20개 챕터를 HTML 원본에서 파싱하여 깨끗한 마크다운으로 완벽 배치 완료.
2. **✅ [해결완료] AI 작업 메모 노출 (Critical):**
   * *Memories of the Blade* EP10 및 EP20 말미의 AI 진행 메모 및 한글 프롬프트 완전 삭제 완료.
3. **✅ [해결완료] 타이틀/내용 불일치 (Critical):**
   * 사이트 타이틀을 `Memories of the Blade`로 변경하고 태그 및 시놉시스를 역사 판타지에 맞게 전면 갱신.
   * *Isolation*, *Pressure*, *Liquidation*, *Cell Division* 시놉시스 및 작가 소개도 실제 스토리에 맞게 교정 완료.
4. **⬜ 등장인물 이름 돌려막기 (Medium - Step 9에서 검토):**
   * 주인공 'Julian' 중복 및 'Chloe' 중복 문제는 Step 9(소설 간 교차 검토)에서 최종 개명 매핑 확정 예정.

---

## 🚀 다음 세션에서 이어서 작업하는 방법

채팅창에 다음 중 하나를 입력하시면 됩니다:
1. **"소설 검토 이어서 해줘"** 또는 **`/review novel`**
2. 오퍼스가 `00_REVIEW_PLAN.md`와 `00_FIXES_APPLIED_BY_JAMES.md`를 읽고, **Step 8 (사이트 UI 텍스트 정밀 감수)**부터 즉시 시작하여 **Step 9(교차 이슈), Step 10(최종 종합 리포트)**까지 원스톱으로 마무리합니다.

