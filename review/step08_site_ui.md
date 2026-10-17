# Step 8 — Site UI, Metadata & Reader UX Review

> Checked files: `src/pages/Novels.jsx`, `src/pages/Reader.jsx`, `src/components/NovelContent.jsx`, `index.html`
> Status note: Commit `9b71d6a` already updated `Novels.jsx` titles/tags/synopses/author bio, `Reader.jsx` titles, and added `###` support in `NovelContent.jsx`. Below are the **remaining** UI/UX and SEO issues from a native English reader's perspective.

## A. `index.html` SEO & Social Preview Mismatch (HIGH — still unfixed)
- `<title>`, `<meta name="description">`, `og:title`, `og:description`, and `twitter:description` still advertise the **old/wrong titles and genres**:
  - Mentions *"Echoes of the Grid, Atmospheric Pressure"* (renamed on site to *Memories of the Blade* and *Pressure*).
  - Claims *"deep space horror, cyberpunk thrillers"* — neither genre exists in the actual library.
- **Fix:**
  - `<title>`: `Bluemoon393 | Original Sci-Fi, Thriller & Historical Fantasy Web Novels`
  - `description` / `og:description` / `twitter:description`: `Read original serialized fiction by Bluemoon393 — including Pressure, Memories of the Blade, Isolation: Predator in the Dark, Liquidation, The Day the Women Died, and Cell Division and the Universe.`

## B. `NovelContent.jsx` — Single-Newline Dialogue Merging Bug (HIGH — still unfixed)
- Line 55: `const paragraphText = paragraphBuffer.join(' ').trim();` joins consecutive non-empty lines into a **single `<p>` paragraph**.
- Across the 6 novels there are **276+ instances** where two different characters' dialogue lines are separated by a single newline (`\n`) rather than a blank line (`\n\n`).
  - Example (`atmospheric-pressure/1.txt`):
    ```
    "Ian, you’re up? Watch your step. You'll wake Emma."
    "She’s already awake. The air is heavy."
    ```
  - On the live site, this renders on one line as:
    `"Ian, you’re up? Watch your step. You'll wake Emma." "She’s already awake. The air is heavy."` — which violates standard English typesetting (new speaker = new paragraph) and confuses readers about who is speaking.
- **Fix:** In `NovelContent.jsx`, flush each non-empty line as its own `<p>` (or flush whenever a line starts with `"` / `“` or follows a line ending with `"` / `”`). Flushing every line as its own paragraph is the cleanest, zero-regression fix because none of the `.txt` files use hard-wrapped 80-column lines.

## C. `Reader.jsx` — Duplicate Chapter Heading (MEDIUM)
- `Reader.jsx` L221 renders:
  `<h1>{novelInfo.title} - Chapter {currentChapter}</h1>`
  Directly underneath, `NovelContent` renders line 1 of the `.txt` file:
  `<h3>Episode {N}: {Subtitle}</h3>`
- Having **"Chapter 1"** and **"Episode 1: ..."** stacked together mixes terminology (*Chapter* vs *Episode*) and looks redundant.
- **Fix:** Either change `Reader.jsx` L221 to show only the novel title in smaller muted text above the Episode title, or use `Episode {currentChapter}` consistently.

## D. `Novels.jsx` — Copy & Visual Polish (MEDIUM)
1. **Synopsis of *Pressure* (`Novels.jsx` L12):**
   - Current: `"Mornings in the family home begin by weighing the air..."`
   - Better hook: `"In the Miller house, every morning begins by weighing the air. Sixteen-year-old Ian is the only powerless child in a family terrorized by his twelve-year-old sister's lethal telekinetic pressure."`
2. **Cover art vs. genre mismatch (3 books):**
   - `echoes.jpg` (*Memories of the Blade*): Still uses cyberpunk cover art for a Korean/Eurasian historical fantasy.
   - `isolation.jpg` (*Isolation: Predator in the Dark*): Still uses deep-space/sci-fi cover art for an underground stone-ruin death game.
   - `liquidation_cover.jpg` (*Liquidation*): Uses a futuristic rain-soaked enforcer cover instead of billionaires emerging from a bunker into overgrown Manhattan.
3. **Hardcoded maxWidth on synopsis (`Novels.jsx` L87):**
   - `maxWidth: '250px'` wraps 3-sentence synopses into a narrow 7-line column. Widening to `280px–300px` improves readability.
