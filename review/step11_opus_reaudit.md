# Step 11 — Opus Re-audit & Final Historical Name Restoration (Completed)

## A. Regressions from Automated Pass — Found & Fixed (✅ Deployed)
| # | Problem | Count | Fix |
|---|---|---|---|
| 1 | `grotesque` → mostly `obscene` (meaning changed: "obscene peace", "obscene vibration") | 27 | Reverted to original, then 23 hand-picked contextual replacements |
| 2 | `bizarre` → all `uncanny` | 12 | Reverted, then 12 hand-picked replacements |
| 3 | Article errors from #1/#2 ("a obscene", "a uncanny") | 12 | Fixed by the revert |
| 4 | Dialogue-tag merge script produced `..,"` | 4 | → `..."` |
| 5 | Tag merge attached another person's action to the line → speaker changed (cell-division/2, echoes/3, liquidation/3) | 3 | Split back into separate paragraphs |
| 6 | Capital `She` after a comma (`," She whispered`) | 3 | → lowercase |
| 7 | *Pressure* surname: text says **Han** throughout, but `Miller` was added to EP1 and the synopsis | 2 | → **Han** (`Mornings in the Han house`) |
| 8 | Leftover metric units in *Liquidation* | 14 | → feet/pounds/acres |
| 9 | Reader page lost its `<h1>` | 1 | Restored semantic `<h1>` (same styling) |

## B. *Memories of the Blade* — Historical Korean Character Names Restored (✅ Deployed)
Per user decision: present-day characters keep their foreign names (`Adrian Locke`, `Nolan Locke`, `Sophie`, `Mr. Kael`), while all historical Korean era characters are restored to their authentic Korean original names:

| Era / Role | Previous Western Name | Restored Original Name (국문) | Occurrences |
|---|---|---|---|
| Gojoseon smith, 300 BCE | Darius | **Dalsol** (달솔) | 58 |
| Silla Hwarang, 8th c. | Seraphina | **Seol-rang** (설랑) | 42 |
| Goryeo maritime king | Bastian Fox / Bastian | **Jang Bo-san** / **Bo-san** (장보산) | 40 |
| Goryeo celadon potter, 1157 | Wyatt | **Yu-gi** (유기) | 17 |
| Goryeo naval officer, 1380 | Ethan | **Lee Bang** (이방) | 26 |
| Joseon scholar under Sejong, 1443 | Jane | **Jeong-in** (정인) | 20 |
| Joseon court lady, 1504 | Clara | **Chae-hong** (채홍) | 24 |
| 1636 Namhansanseong villager | Parker | **Park Man** (박만) | 27 |
| 18th-c. Joseon wanderer | Marcus | **Mumyeong** (무명) | 30 |
| 18th-c. Joseon *gisaeng* singer | Willow | **Wolhyang** (월향) | 17 |
| 1882 late-Joseon blacksmith | Kim Benedict / Benedict | **Kim Cheol-su** / **Cheol-su** (김철수) | 26 |
| 1923 Manchuria independence fighter | Kim Owen / Owen | **Kim Young-ho** / **Young-ho** (김영호) | 21 |
| 1950 Korean War NCO | Sgt. Park James / James | **Sgt. Park Jung-tae** / **Jung-tae** (박정태) | 20 |

## Checklist
- ✅ 11-1 Save checkpoint + local commit (`18cc192`)
- ✅ 11-2 User decision on deployment & historical names
- ✅ 11-3 Restore Group A (ancient–Goryeo) & commit (`8d6cdbd`)
- ✅ 11-4 Restore Group B (Joseon–1950 + Wolhyang) & commit
- ✅ 11-5 Update reports & push all commits to GitHub Pages (`origin/main`)
