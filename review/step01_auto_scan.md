# Step 1 — Automated Scan Summary (All Novels)

> Raw data: `step01_raw_scan.md` · Script: `scan.py`
> Renderer facts (`NovelContent.jsx`): supports `#`, `##`, `***`/`---`, `**bold**`, `*italic*`. Does **NOT** support `###` or `>` blockquotes → these show as raw symbols to readers.

## 🚨 CRITICAL (site is serving wrong/broken content)

| # | Novel (site id) | Problem | Evidence | Fix |
|---|---|---|---|---|
| C1 | `atmospheric-pressure` | **Entire novel is in KOREAN** (34,397 Hangul chars). English readers see Korean text. | `1.txt`: "밀러 가문의 아침은 공기의 무게를…" | Replace with English version (currently sitting in `isolation/` folder) |
| C2 | `isolation` | **Wrong novel.** Folder contains the English version of *PRESSURE* (Ian/Emma family thriller), not *Isolation: Predator in the Dark*. 0 hits for spaceship/alien/predator. | `1.txt` header: `# PRESSURE` | Copy real text from `소설/Isolation…/홈페이지/Part_01_Predator_in_the_Dark.md…` |
| C3 | `echoes-of-the-grid` | **AI writing memo published** at end of EP10 and EP20, incl. Korean prompt text and ✅ emoji. | EP10 L288-291: `> **Writing Progress Memo — SERIES MIDPOINT COMPLETE**` … `"칼의 기억 소설 이어서 써줘. EP01~10 완료됨."` | Delete memo blocks |
| C4 | `echoes-of-the-grid` | **Title/content mismatch.** Text header = "MEMORIES OF THE BLADE" (Korean historical — Joseon, Silla, Hwarang, 1592, Seoul antique shop). Site says "cyberpunk thriller set in Neo-Seoul", tags Cyberpunk/Action, cyberpunk cover. | Top words: Joseon(39), Goryeo(34), Hwarang(28) | Decide one identity: rename site entry to *Memories of the Blade* + Historical Fantasy tags + new cover |

## ⚠️ HIGH (visible to every reader)

| # | Novel | Problem | Fix |
|---|---|---|---|
| H1 | atmospheric/isolation(Pressure) | Every chapter starts with `# PRESSURE` + `## Episode N:` → reader shows "Atmospheric Pressure – Chapter 1" **and** "PRESSURE" **and** episode title (triple title). Novel has 3 names: *The Weight of Air* (source folder) / *Pressure* (text) / *Atmospheric Pressure* (site). | Pick one title; strip `# PRESSURE` line |
| H2 | echoes | Same triple-title issue (`# MEMORIES OF THE BLADE`). `###` scene headers render as raw `### *Seoul, Present Day*` (122 header lines). | Strip H1; convert `###` → `##` or italic line; add `###` support to renderer |
| H3 | liquidation / the-day | Chapter files start with a bare number line `1`, `2`… → shows as a lone "1" paragraph above the chapter title. | Remove number line; format title as `## Episode 1: …` |
| H4 | the-day | Korean/Hanja in prose: `stench of death (사취, 屍臭)` (EP13). | Delete parenthetical |
| H5 | the-day | Bold-quoted phrases `**'red armband'**`, `**'fascist hierarchy'**` (26 bold marks) — Korean webnovel emphasis style, looks amateurish in English. | Remove bold + quotes, or use italics sparingly |
| H6 | echoes | Currency in won ("Three hundred thousand won") & "chaebol" without context for EN readers. | Add context (≈ \$220) or keep with a gloss |

## 🟡 MEDIUM (polish / consistency)

| # | Problem | Where | Fix |
|---|---|---|---|
| M1 | Ellipsis mixing: `…` (Unicode) vs `...` (ASCII) in same novel | the-day (10 vs 61), echoes (1 vs 25); liquidation uses only `…` (80) | Normalize per site (recommend `…` or `...` consistently) |
| M2 | Curly vs straight quotes mixed (`“…”` and `"…"`) | the-day | Normalize |
| M3 | Single-quoted thoughts/headlines `'We are all dead.'` — Korean convention; US convention is *italics* for thoughts, double quotes for headlines | the-day (4), isolation/Pressure (5) | Convert to `*italics*` |
| M4 | Metric units in a US setting (`3.1 meters by 3.1 meters`, `two-meter-thick`) | liquidation EP1, EP8 | Use feet (≈10 ft) — or keep if deliberate (scientific/bunker spec) |
| M5 | Korean cultural leftovers: `'kimchi stew'` in a US office worker's search history | the-day EP9 | Replace (e.g. "chili", "pizza") |
| M6 | `~` used for ranges (`Level 3~4`) | atmospheric (Korean file) | Use en dash `3–4` |
| M7 | **Name recycling across novels**: Julian (cell-division, echoes, liquidation), Chloe (5 novels!), Miller (3), Thorne (2), Evelyn (2), David (2 leads), Sarah (2), Arthur (2) | site-wide | Readers browsing the library will notice. Rename secondary characters (see Step 9) |

## ✅ Clean
- No AI meta phrases ("As an AI", "Here is", "I hope this helps") in prose — the `ai_meta` hits were false positives ("there is").
- No Korean honorifics (oppa, hyung, -ssi, sunbae) in English texts.
- Very few AI-cliché words (1× "unwavering").

## Next
Step 2 → manual read of *Pressure* English text (currently in `isolation/` folder): names, dialogue, culture, prose.
