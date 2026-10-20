# Step 11 — Opus Re-audit of Gemini's Fixes (2026-10-18)

> Resume rule: Check the "Next steps" checklist at the bottom and continue from the first ⬜ item.

## A. Gemini regressions found & fixed (✅ local, not yet deployed)
| # | Problem | Count | Fix |
|---|---|---|---|
| 1 | `grotesque` → mostly `obscene` (meaning changed: "obscene peace", "obscene vibration") | 27 | Reverted to original, then 23 hand-picked contextual replacements |
| 2 | `bizarre` → all `uncanny` | 12 | Reverted, then 12 hand-picked replacements |
| 3 | Article errors from #1/#2 ("a obscene", "a uncanny") | 12 | Fixed by the revert |
| 4 | Dialogue-tag merge script produced `..,"` | 4 | → `..."` |
| 5 | Tag merge attached another person's action to the line → speaker changed (cell-division/2, echoes/3, liquidation/3) | 3 | Split back into separate paragraphs |
| 6 | Capital `She` after a comma (`," She whispered`) | 3 | → lowercase |
| 7 | *Pressure* surname: text says **Han** throughout, but Gemini added **Miller** to EP1 and the synopsis | 2 | → Han |
| 8 | Leftover metric units in *Liquidation* (Gemini's log claimed 0) | 14 | → feet/pounds/acres |
| 9 | Reader page lost its `<h1>` | 1 | Restored (same look) |

Verification: residual check 0 issues; `npm run build` passes.

## B. Decision needed — *Memories of the Blade* historical characters have Western names
The EN translation replaced the Korean names from the original. EN readers will notice this immediately in a Korean historical setting (e.g. "Sergeant **Park James**", "**Kim Benedict**", Joseon court lady "**Clara**").

| Current EN | Era / role | Korean original (국문) |
|---|---|---|
| Adrian Locke | present-day protagonist | 서진우 Seo Jin-woo |
| Nolan Locke | protagonist's father | 서동혁 Seo Dong-hyuk |
| Sophie | present-day researcher | 수현 Su-hyun |
| Mr. Kael | old shopkeeper | 강태호 Kang Tae-ho (likely) |
| Darius | Gojoseon smith, 300 BCE | 달솔 Dalsol |
| Seraphina | Silla Hwarang, 8th c. | 설랑 Seol-rang |
| Bastian Fox | Goryeo pirate king | 장보산 Jang Bo-san |
| Wyatt | Goryeo celadon potter, 1157 | 유기 Yu-gi |
| Ethan | Goryeo naval officer, 1380 | 이방 Lee Bang |
| Jane | Joseon scholar under Sejong, 1443 | 정인 Jeong-in |
| Clara | Joseon court lady, 1504 | 채홍 Chae-hong |
| Parker | 1636 villager | 박만 Park Man |
| Marcus "Nameless" | 18th-c. wanderer | 무명 Mumyeong (= "Nameless") |
| Kim Benedict | 1882 blacksmith | 철수 Kim Cheol-su |
| Kim Owen | 1923 independence fighter | 김영호 Kim Young-ho |
| Sgt. Park James | 1950 Korean War | 박정태 Park Jung-tae |

Already correct (keep): Asa, Narses, Yeonhwa, Hyecho, Kuro, Genji, Gwak Jae-yeong, Tanaka, So-so.

## Next steps
- ✅ 11-1 Save checkpoint + local commit
- ⬜ 11-2 Deploy A fixes (push) — user OK needed
- ⬜ 11-3 User decision on B (restore historical names / also present-day?)
- ⬜ 11-4 Apply B (one name group at a time, commit after each)
- ⬜ 11-5 Update FIX_LOG.md / FINAL_REPORT.md
