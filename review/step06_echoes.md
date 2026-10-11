# Step 6 — *Echoes of the Grid* → actually *Memories of the Blade* (20 eps, ~57k words)

> Read: EP1 (lines 1–45), EP20 opening + scan data (EP10/EP20 memo, `###` headers)
> Overall: **Native-level English prose — the most literary text on the site.** Problems are almost entirely *packaging* (wrong title/genre/cover), two AI memo leaks, and one naming decision.

## A. 🚨 Identity mismatch (CRITICAL)
| Field | Site now | Reality |
|---|---|---|
| Title | Echoes of the Grid | **Memories of the Blade** (in-text H1 on all 20 eps) |
| Desc | "A cyberpunk thriller set in Neo-Seoul." | A Seoul antiques appraiser finds a bronze blade forged 2,300 years ago by **Darius**; the story moves between present-day Seoul and the blade's past wielders — Persia, Silla Hwarang, the 1592 Imjin War, 1636 Manchu invasion, late Joseon, 1923 Manchuria… |
| Tags | Cyberpunk, Action | **Historical Fantasy, Literary, Korea** |
| Cover | neon cyberpunk | ancient bronze blade on an antique-shop shelf / layered historical eras |

→ Rename the site entry (and folder id, e.g. `memories-of-the-blade`, keeping a redirect or keeping the old id to avoid broken links/bookmarks).

## B. 🚨 AI artifacts published (CRITICAL)
- **EP10 end (L288–291):** `> **Writing Progress Memo — SERIES MIDPOINT COMPLETE**` / `EP01–EP10: ✅ COMPLETE` / `To resume: "칼의 기억 소설 이어서 써줘. EP01~10 완료됨. EP11부터."`
- **EP20 end:** `> **SERIES COMPLETE** > - EP01–EP20: ✅ ALL COMPLETE > - Total: 20 episodes…`
- These render as raw `>` text. Delete both blocks (and the preceding `---` if orphaned).

## C. Formatting (HIGH)
- `# MEMORIES OF THE BLADE` H1 on every episode → remove (site header already shows the title).
- **122 `###` scene-location headers** (`### *Seoul, Present Day*`, `### *The Nakdong River Basin, 1592 CE*`) → renderer doesn't support `###` → readers see `### *Seoul, Present Day*` literally. Fix either:
  - (a) renderer: add `###` → styled italic location slug ← **recommended** (they're a nice device), or
  - (b) text: convert to `*Seoul, Present Day*` on its own line.
- `**Alcove One: Darius.**` bold run-in heads in EP18 — fine (renderer supports `**`).

## D. Names & culture (MEDIUM)
| Item | Issue | Suggestion |
|---|---|---|
| Protagonist **Julian Vance**, raised in a Gangnam apartment, ex-National Museum (Seoul) | A Korean-raised appraiser with an Anglo name is unexplained → EN readers will assume an error. Also "Julian" is reused in 3 novels; "Vance" is the antagonist family in *Pressure*. | Give a Korean name (e.g. **Han Jun-seo**, "Jun") or one line of backstory (Korean-American, mother's surname, adopted, etc.). |
| "Three hundred thousand **won**" | Unknown value to EN readers | "Three hundred thousand won — about two hundred dollars —" (once) |
| "**chaebol** family" | Known to K-drama fans, not general readers | keep, add light gloss on first use ("one of the chaebol families that ran half the country") |
| *janggi* in italics ✅ | Correct handling of foreign terms — use this as the house style for other novels |  |
| Other names: Sophie, Kael, Seraphina, Narses, Bastian, Marcus, Ethan, Charles, **Chloe**, Owen, Jane, **James** | Many Western names among historical Korean/Persian/Byzantine eras is fine where era-appropriate (Narses = Byzantine). Check Chloe/James/Ethan contexts for era plausibility. |  |

## E. Prose (LOW)
- Long chapters (avg ~2,850 words vs ~600–1,300 in other novels) — fine for web, but consider splitting into 40 parts for mobile readers.
- 1× "unwavering" — negligible.

## F. Fix list
1. Delete memo blocks (EP10, EP20).
2. Remove H1 line; handle `###` (renderer).
3. Rename site entry → *Memories of the Blade*, new tags/desc, new cover.
4. Decide protagonist name (author decision).
5. Won gloss (EP1).
