# Step 2 — *Pressure* / "Atmospheric Pressure" (EN text, currently in `isolation/` folder)

> Read: EP1 (full), EP10 (first 70 lines) + automated dialogue scan (`step02_dialogue_scan_raw.txt`)
> Overall: **Good base quality.** Emotional beats land, US suburban setting is mostly convincing. Issues are mostly *formatting* and *Korean-original fingerprints*.

## A. Title & identity (HIGH)
- 3 names for 1 book: *The Weight of Air* (EP1 title & source folder) / *PRESSURE* (in-text H1) / *Atmospheric Pressure* (site).
- **Recommendation:** `PRESSURE` — short, punchy, matches the in-world term ("Pressure Level"). "Atmospheric Pressure" sounds like a weather textbook to EN readers.
- The family has **no surname** in EN ("Mornings in the family home…") — the Korean original had "밀러 가문" (the Miller family). EN readers expect it. → "Mornings in the Miller house began by weighing the air."

## B. Dialogue formatting (HIGH — affects every chapter)
| Pattern | Example | Why it's wrong in English | Fix |
|---|---|---|---|
| Dialogue tag on its own line, quote ending in period | `"I'm not here to punish you."` ⏎ `Ian said.` (30 cases) | Korean webnovel layout. In English the tag is part of the sentence. | `"I'm not here to punish you," Ian said.` |
| Two speakers on consecutive lines (single newline) | `"Open the door."` ⏎ `"Don't come in! …"` | Site renderer **joins single-newline lines into one paragraph** → reads as ONE speaker saying both lines. | Blank line between speakers **or** renderer fix (treat each line as a paragraph) ← recommended, fixes all novels at once |
| Action beat as separate paragraph after dialogue | `"You're loud."` ⏎⏎ `Emma snapped, annoyance dripping…` | Breaks rhythm; looks like a script. | Merge: `"You're loud," Emma snapped.` |

## C. Korean fingerprints (MEDIUM)
| Item | Location | Fix |
|---|---|---|
| Digital door keypad + `*Beep-beep-beep.*` | EP1 | US suburban homes use keys. → "he hesitated with his key in the lock" |
| Terms in single quotes: `'Enforcer'`, `'Null'`, `'Low-Tier'`, `'Family'`, `'Subject ID'` (13) | EP1, 11, 13 | English: capitalize the term, no quotes (optionally *italic* on first use) |
| Headlines in single quotes `'First Ever Level 10 Recorded!'` | EP7 | Use italics or double quotes |
| `"Mom... this."` | EP1 | Unnatural (literal "엄마… 이거"). → `"Mom… what happened to your face?"` |
| "Subcutaneous bleeding was already forming" | EP1 | Overly clinical (피하출혈). → "A bruise was already darkening." |
| `*'Fear is just another word for respect.'*` (italic + single quotes) | EP10 | Pick one: italics only |
| "If you tarnish our family's name" (Vance father) | EP11 | 가문 concept; OK for a dynasty family, but "our name" reads more natural |

## D. Logic / continuity (MEDIUM)
- EP10: "For **sixteen years**, this door had been the entrance to hell" — Emma is 12 and her power appeared at 3 → **nine years**. (Ian's age leaked in.)
- EP1: Emma "Level 8 … less than 0.1%" while David once was "Level 6 elite" — fine, but confirm Level scale is consistent in EP7 (Level 10 "first ever").

## E. Prose (LOW)
- Webnovel-style foreshadowing closers: "No one knew yet that his prayer would be answered in the most horrifying way possible." — acceptable for serial fiction, but avoid repeating this device every episode.
- Some intensifier stacking: "absolute, suffocating fear", "demonic philosophy", "desperate, pathetic excuse". Trim one adjective per pair.

## F. Fix list (for implementation)
1. Swap folders: `isolation/*.txt` → `atmospheric-pressure/` (replace Korean). Rename site entry title → **PRESSURE**.
2. Strip line 1 `# PRESSURE` from all 20 files (site already shows title).
3. Global regex: `([.!?])"\s*\n(Ian|Emma|…|He|She) (said|whispered|…)` → `,"\u0020$2 $3` (manual review for `!`/`?`).
4. Remove single quotes around in-world terms.
5. EP1 surname + keypad; EP10 "sixteen" → "nine".
