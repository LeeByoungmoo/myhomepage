# Step 3 — *Isolation: Predator in the Dark* (real text — NOT on site yet)

> Source: `소설/Isolation Predator in the Dark_아무것도 보이지 않는곳/홈페이지/Part_01…Part_20.md` (≈11.7k words, 0 Hangul)
> Read: Part 1 (full), Part 12 (full)

## A. 🚨 Genre / marketing mismatch (CRITICAL)
The site markets this as **"Deep space horror"** with tags `Deep Space, Horror` and a **spaceship-corridor cover**.
Actual story: **first-person psychological death-game thriller** — a female serial killer posing as a frail middle-aged woman, trapped with 3 strangers in an ancient stone ruin **beneath a city subway line**, hunted by her architect husband who controls the game via speakers. No space at all.

| Field | Current | Recommended |
|---|---|---|
| Title | Isolation: Predator in the Dark | keep (fits) |
| Tags | Deep Space, Horror | **Psychological Thriller, Death Game** (or "Dark Thriller") |
| Synopsis | "Deep space horror." | "Four strangers wake in a sealed ruin beneath the city. One of them is a killer — and she isn't the only predator in the dark." |
| Cover | spaceship corridor | dark stone catacomb / iron bars / single light source, woman's silhouette |

## B. Format (HIGH — blocks import)
- Files are **Blogger HTML** (`<p style=…>`, gradient `<div>` headers, H1 + duplicated `<h2>` episode titles). Must be converted to plain text (`## Episode N: Title` + paragraphs) before placing in `public/novels/isolation/`.
- Title line uses `?` where an em dash was intended: `Isolation: Predator in the Dark ? Episode 12` (encoding loss) → `—`.
- Sound effects as standalone paragraphs: `Rumble?`, `Slice.` — the `?` after "Rumble" is likely a lost em dash (`Rumble—`). Check all parts for `?` replacing `—`.

## C. Korean fingerprints & translationese (MEDIUM)
| Text | Issue | Suggested |
|---|---|---|
| `"Haa... Ma'am…"` | "하아" Korean sigh romanized — EN readers don't know it | `"Oh God… ma'am…"` / remove |
| "I scattered a perfectly calculated, trembling breath into the dark." | literal (숨을 흩뿌렸다) | "I let out a trembling breath — perfectly calculated." |
| "grabbed my absolute attention" | odd collocation | "seized my attention" |
| "obvious, blatant … blatantly obvious" (P12, 2 lines apart) | repetition | keep one |
| "A weak confession of absolute terror." | odd | "Pure terror in every syllable." |
| `'master key'` in single quotes | KR convention | no quotes or *italics* |
| "the bitch who killed my daughter...!" — `...!` | `…!` combo is Korean punctuation style | `"…killed my daughter!"` |
| `'00:01'` | single quotes | `00:01` |

## D. Strengths
- Strong hook (first-person predator pretending to be prey) — this is the most "Western-marketable" premise in the library. Prioritize it for promotion once fixed.
- Dialogue is already separated per paragraph (no merged-speaker problem).

## E. Fix list
1. Convert 20 HTML parts → `public/novels/isolation/1..20.txt` (strip tags, keep `## Episode N: Title`).
2. Replace mis-encoded `?` → `—` where between words/at word end.
3. Update `Novels.jsx` tags/desc; regenerate cover.
4. Light copy-edit per table C (search-replace level).
