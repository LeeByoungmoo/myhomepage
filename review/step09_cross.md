# Step 9 — Cross-Novel Consistency, Character Names & Priority Matrix

## A. Character Name Collisions Across the 6 Novels (HIGH)
When an English reader browses an author's library and sees the same names (`Chloe`, `Julian`, `David`, `Arthur`, `Sarah`, `Thorne`, `Evelyn`, `Miller`, `Vance`) repeated in almost every book, it immediately signals **AI-generated default naming**.

| Name | Where it appears (hit count) | Keep in | Rename in (Suggested Native Alternatives) |
|---|---|---|---|
| **Chloe** | *Cell Division* (57), *Liquidation* (95), *Echoes* (24), *The Day* (6), *Pressure* KR | *Cell Division* (Dr. Finch's lab assistant) | • *Liquidation* → **Claire** or **Camille** (fits billionaire circle)<br>• *Echoes* → **Clara** or **Celine**<br>• *The Day* → **Rachel** |
| **Julian** | *Echoes/Blade* (217), *Cell Division* (193), *Liquidation* ("Julian 'Jules' Cross", 11+86) | *Cell Division* (Julian Mercer, co-lead) | • *Echoes/Blade* → **Seo Jin-woo ("Jin")**! *(Note: EP20 L243 literally still has `**서진우 골동품 감정**` on his shop sign! Restoring his Korean name solves both the name collision and why a Gangnam native has an Anglo name)*<br>• *Liquidation* → **Adrian "Ace" Cross** or **Gideon Cross** |
| **David** | *Liquidation* (David Sterling, lead, 259), *Pressure* (David, father, 67) | *Liquidation* (protagonist) | • *Pressure* → **Robert** *(matches Korean original '로버트'!)* |
| **Sarah** | *Pressure* (mother, 44), *The Day* (dead wife, 23) | *The Day* (opening hook) | • *Pressure* → **Mary** or **Helen** *(Korean original used '메리' = Mary!)* |
| **Arthur** | *Liquidation* (Arthur Lindley, 69), *Cell Division* (Arthur Finch, narrator, 46) | *Cell Division* (protagonist) | • *Liquidation* → **harold Lindley** or **Walter Lindley** |
| **Vance** | *Pressure* (Vance family, 38), *Echoes/Blade* (Julian Vance) | *Pressure* | • *Echoes/Blade* → solved if renamed to **Seo Jin-woo** |
| **Thorne** | *Cell Division* (Dr. Thorne, 115), *Pressure* (Director Thorne, 11) | *Cell Division* | • *Pressure* → **Director Graves** or **Director Kaelen** |
| **Evelyn** | *Pressure* (20), *Cell Division* (13) | *Pressure* | • *Cell Division* → **Eleanor** |
| **Miller** | *Cell Division* (50), *The Day* (Director Miller, 13), *Pressure* (family surname in KR) | *Pressure* (the Miller family) | • *Cell Division* → **Kellogg** or **harper**<br>• *The Day* → **VP Henderson** |

> 💡 **Key Discovery in `echoes-of-the-grid/20.txt`:**
> In Episode 20, the protagonist puts up a new sign on his Seoul shop:
> `**서진우 골동품 감정**`
> `*Julian Vance — Antiques Assessment*`
> This proves the protagonist was originally **Seo Jin-woo (서진우)** and was mechanically find-replaced to "Julian Vance" during translation, leaving the Korean Hangul on the sign! Either change the sign to English (`**Vance Antiques & Appraisal**`) OR restore his Korean name (`Seo Jin-woo`) throughout.

---

## B. Crutch Words & Overused Adjectives Across Novels (MEDIUM)
Word-frequency scan across all 6 novels shows heavy reliance on a small cluster of melodramatic modifiers:

| Word | `liquidation` | `the-day` | `isolation` | `atmospheric` | `cell-division` | `echoes` | Note |
|---|---|---|---|---|---|---|---|
| **grotesque(ly)** | **64** | 7 | 13 | 1 | 2 | 0 | *Liquidation* uses "grotesque" more than twice per chapter. Replace ~70% with specific adjectives (*obscene, absurd, warped, macabre, surreal*). |
| **bizarre** | 7 | **27** | 4 | 3 | 3 | 0 | *The Day* overuses "bizarre" (1.4×/ep). Vary with *uncanny, eerie, surreal, unnatural*. |
| **shattered** | 20 | 9 | 7 | 8 | 11 | 7 | Stock verb for silence/glass/composure. |
| **trembling** | 22 | 11 | 7 | 13 | 7 | 4 | Classic Korean webnovel physical tell (바들바들/떨리는). |
| **suffocating** | 1 | 4 | 4 | 8 | 9 | 0 | Often paired with "silence" ("suffocating silence"). |

---

## C. Punctuation & Typography Consistency Rules (Site-Wide Standard)
Currently, novels mix conventions. Establish one house style for the entire site:
1. **Paragraph breaks:** Every dialogue turn by a new speaker MUST be its own `<p>` paragraph.
2. **Dialogue tags:** Attach tags with a comma (`"I'm not here to punish you," Ian said.`), never as a standalone sentence after a period (`"I'm not here to punish you."\nIan said.` — 43 total hits across the site).
3. **Internal thoughts:** Use `*italics*` without quotation marks (not `'single quotes'` and not `*'both'*`).
4. **In-world terms & nicknames:** Capitalize without single quotes (`Enforcer`, `Null`, `Low-Tier`, `Water Voucher`), or italicize on first introduction only. Remove Korean-style `'emphasis quotes'`.
5. **Ellipses & dashes:** Standardize on either `…` or `...` (no space before, one space after), and `—` (em dash) for interruptions. Never use `...!` or `?` where `—` was lost to encoding.

---

## D. Priority Matrix (What Has Been Fixed vs. What Remains)

| Priority | Item | Status |
|---|---|---|
| **P0 (Critical)** | Swap Korean *Pressure* out of `atmospheric-pressure/`; import real English *Isolation* into `isolation/` | ✅ Done in `9b71d6a` |
| **P0 (Critical)** | Remove leaked AI progress memos in `echoes` EP10 & EP20 | ✅ Done in `9b71d6a` |
| **P0 (Critical)** | Fix titles/tags/synopses in `Novels.jsx` & `Reader.jsx` + `###` support in `NovelContent.jsx` | ✅ Done in `9b71d6a` |
| **P1 (High)** | Fix `NovelContent.jsx` merging consecutive single-newline dialogue lines (276+ cases across all novels) | ⬜ **To Do (1-line code fix)** |
| **P1 (High)** | Remove leftover Korean Hangul `**서진우 골동품 감정**` in `echoes-of-the-grid/20.txt` | ⬜ **To Do** |
| **P1 (High)** | Fix `index.html` SEO title/meta/OG tags (still says Cyberpunk & Deep Space Horror) | ⬜ **To Do** |
| **P2 (Medium)** | Fix 43 split dialogue tags (`"..."\nHe said.` → `," he said.`) & 24 `'single-quoted terms'` | ⬜ **To Do** |
| **P2 (Medium)** | Fix novel-specific K-isms & continuity errors (EP10 "sixteen years"→"nine years", keypad, phytoncide, ampoules, lumbar disc, meters→feet, Huntington III/IV, hometown, kimchi stew, Director Miller, `Rumble?`→`Rumble—`, `Haa...`) | ⬜ **To Do** |
| **P3 (Author Decision)** | Character name de-duplication across novels (Chloe ×5, Julian ×3, David ×2, Sarah ×2, Arthur ×2) | ⬜ **Needs User Approval** |
| **P3 (Author Decision)** | Regenerate 3 mismatched cover images (*Memories of the Blade*, *Isolation*, *Liquidation*) & review Dylan sensitivity in *The Day* EP10/12 | ⬜ **Needs User Approval** |
