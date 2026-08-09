# 시그니처 레이아웃

> `DESIGN.md`에서 생성된 파일이다. 여기를 고치지 말고 `DESIGN.md`를 고친 뒤
> `python scripts/build_skill.py`를 다시 실행할 것.

## Signature Layouts

**{layout.slide-cover}** — Two-column cover with giant orange logo left + text column right on a white canvas.

The cover defines a **pattern, not a script.** Title, subtitle, date, and author are deck-specific values; the **only fixed boilerplate is the confidential block** at the bottom of the slide. Everything above that block is filled per deck.

- Background {colors.canvas} (white).
- **Left column**: giant {component.wordmark} from `logo-orange-on-white.png`. Container at (x=0.45", y=0.30"), size (w=5.53", h=2.00"). Visual logo size ~5.20" wide × 1.66" tall.
- **Right column** at x=6.67", w=6.40", top-aligned with the logo. The four meta slots below are all **variable per deck** — only the pattern (position, weight, no-label rule) is constant:

| Slot | Variable | Position | Type | Example |
|---|---|---|---|---|
| English display title | ✅ deck-specific | x=6.67", y=0.40", w=6.40", h=1.80" | 36pt Bold {colors.ink-strong}, 2 lines, -1 charSpacing, 1.10 line spacing | `2026 IT INDUSTRY\nBRIEFING` |
| Korean subtitle | ✅ deck-specific | x=6.67", y=2.20", w=6.40" | 18pt Bold {colors.ink-strong} | `2026 IT 산업 브리핑` |
| Date row | ✅ deck-specific | x=6.67", y=3.10", w=6.40" | {typography.cover-meta} (11pt {colors.ink-strong}), format `YYYY.MM.DD.` with trailing period. **No `DATE` label.** | `2026.05.22.` |
| Author row | ✅ deck-specific | x=6.67", y=3.34", w=6.40" | {typography.cover-meta}, format `부서명 이름`. **No `AUTHOR` label.** | `전략브랜드실 김헥토` |

  - Note the ~0.45" of breathing room between the Korean subtitle (ends around y=2.55") and the date row (y=3.10"). This gap is intentional and part of the pattern; the meta rows do not sit immediately under the subtitle.

- **Bottom row** at y=6.80": this row IS the fixed part.
  - **Confidential footer — FIXED boilerplate.** Always renders the same two-line English text, **verbatim**, regardless of deck topic, audience, or language of the rest of the deck:

    > `Confidential and proprietary Any use of this material without`
    > `specific permission of Hecto is strictly prohibited`

    Style: {typography.cover-footer} (10pt Regular {colors.ink-strong}), left-aligned at x=6.67", 2 lines, lineSpacing 1.25. Do not translate, paraphrase, abbreviate, or extend. Do not add a period. Do not add Korean. If a deck needs a different legal notice, that's a brand-team conversation, not a slide-level edit.

  - **Copyright** `©YYYY Hecto` — variable only in the year, which matches the deck's document year (so a 2026 deck shows `©2026 Hecto`). {typography.cover-footer} (10pt Regular {colors.ink-strong}), anchor x=11.50", right-aligned. **Bottom-aligned with the confidential footer's second line** — copyright baseline matches the lower line of the 2-line confidential block (anchor y ≈ 6.97", since 10pt × 1.25 lineSpacing ≈ 0.174" line height from the y=6.80" confidential top). A single-line copyright sitting at y=6.80" would float above the confidential block's bottom edge — the bottom-alignment keeps the lower edge of the slide visually level.

- No chevron header, no page number — the giant logo and editorial typography do all the work.

**{layout.slide-section-divider}** — Giant orange circle containing the chapter title.
- Background {colors.canvas}.
- Single large ellipse ({colors.brand-orange} fill, no border): width 6.50", height 6.50" (perfect circle), horizontally centered (x=3.42), positioned slightly above vertical center (y=0.40).
- Inside the circle, vertically stacked and centered:
  - Chapter number (e.g., `3.`) — 72pt Bold {colors.ink-strong}
  - English chapter title on 2 lines (e.g., `POLICY\nIMPACT`) — 60pt Bold {colors.ink-strong}, -1.5 charSpacing, 1.05 line spacing.
    - **Length constraint:** each line must keep its character count ≤ ~10. Long words wrap inside the 6.50" circle and break the layout. `INFRASTRUCTURE` (14 chars) overflows; `INFRA` (5 chars) does not. Prefer short, punchy splits: `AI / INFRA`, `SEMI / CONDUCTOR`, `BIG TECH / MOVES`, `SECURITY & / REGULATION`, `POLICY / IMPACT`.
  - Korean description — 16pt Bold {colors.ink-strong}
- {component.page-number} bottom-right.
- This is the system's most graphically-driven layout — the orange circle does all the work; no other decoration, no rules, no eyebrows.

**{layout.slide-appendix-divider}** — Marks the start of supporting material. Same orange circle as {layout.slide-section-divider}, without the chapter numeral.

Report decks carry evidence behind the argument. The appendix needs a boundary the reader recognizes, and reusing the divider circle says "still the same document" while dropping the numeral says "outside the numbered chapters."

- Background {colors.canvas}.
- Single 6.50" ellipse, {colors.brand-orange}, at (x=3.42", y=0.40") — identical to {layout.slide-section-divider}.
- **No chapter numeral.** The appendix is not chapter N+1; numbering it invites the reader to expect it in the {layout.slide-toc}.
- Inside the circle, two elements recentered on the circle's midpoint (y=3.65"):
  - `APPENDIX` at (x=3.42", **y=2.85"**, w=6.50", h=1.10"), 60pt Bold {colors.ink-strong}, -1.5 charSpacing
  - Korean description at (x=3.42", **y=4.10"**, w=6.50", h=0.40"), 16pt Bold {colors.ink-strong}
- {component.page-number} bottom-right. Appendix pages keep counting from the body; they do not restart at 1.

**Choose appendix divider when:**
- Detail that supports the argument but would slow the main narrative follows.

**Avoid when:**
- The material is part of the argument → it belongs in a numbered chapter, behind {layout.slide-section-divider}.

**{layout.slide-toc}** — Large "CONTENTS" title with bottom-anchored 4-column chapter grid.
- Background {colors.canvas}.
- Top-left: `CONTENTS` (60pt Bold {colors.ink-strong}, -1 charSpacing) at x=0.55", y=0.50".
- **No wordmark** — TOC is the one layout in the system that does not carry the Hecto logo.
- **Empty whitespace** between title and grid (about 2.7" tall) — visual rest area.
- Bottom: 4 equal columns (w=2.94", gap ~0.27") anchored at x=0.40", y=4.20" — left edge aligned with the content frame; total span 4 × 2.94 + 3 × 0.27 = 12.57" ≈ 12.58" frame width. Each column contains:
  - English chapter heading on 2 lines (e.g., `1.MARKET\nOVERVIEW`) — 24pt Bold {colors.ink-strong}, -0.5 charSpacing, 1.15 line spacing
  - Thin hairline divider (0.75pt {colors.ink-strong}, w=col-0.30)
  - 3 small-dot bullets (`·  text`) — 12pt {colors.body}, 1.35 line spacing
- **No Korean subtitle row.** The English chapter heading carries directly into the hairline divider — no Korean translation sits between them. Section-divider slides ({layout.slide-section-divider}) are where the Korean description appears for each chapter; the TOC stays English + bullet dots only.
- {component.page-number} bottom-right.

**{layout.slide-summary}** — Executive summary. One governing sentence over its supporting evidence. Sits immediately after {layout.slide-cover} or {layout.slide-toc}.

The most important slide in a report deck. It front-loads the conclusion so a reader who stops after two pages still leaves with the answer. This is the opening counterpart to {layout.slide-takeaways}, which closes.

- Background {colors.canvas}.
- Standard chrome.
- **Governing statement** at (x=0.40", **y=1.85"**, w=12.58", h=0.80"), {typography.summary-statement} (18pt Bold) {colors.ink-strong}, **max 2 lines**. One sentence. If it needs two sentences, the deck has two conclusions and the slide is doing two jobs.
- **Three supporting blocks** at **y=3.10"**, each w=4.06" with 0.20" gutter (x=0.40", x=4.66", x=8.92"). Each block is a {component.section-header-band} (wash, h=0.37") carrying a {typography.subsection-header} (14pt Bold) label, with a {component.bullet-list} beneath starting at block.y + 0.50".
- Source citation at y=7.10", w=11.50".

**Why three and not four:** the governing statement carries the argument; the blocks carry the evidence for it. Four columns at 3.00" each drop below the width where a Korean label plus a dash list stays readable, and a reader scanning for support does not hold four parallel claims at once.

**Choose summary when:**
- The deck reports a conclusion and the reader needs it before the reasoning.
- An executive will read the first two slides and skip the rest. Plan for that reader.

**Avoid when:**
- The deck is exploratory with no conclusion yet → open with {layout.slide-content-standard} framing the question instead.
- Closing recap → use {layout.slide-takeaways}.

**{layout.slide-content-standard}** — Chevron-header workhorse.
- Background {colors.canvas}.
- Standard chrome: {component.chevron-header} + {component.page-title-pair} + {component.page-number}.
- Content area populated with combinations of lead paragraph, {component.step-strip}, paired {component.section-block}s (`01./02.`), {component.kpi-tile} row, {component.data-table}.
- **Vertical rhythm:** see the table in `Layout → Vertical rhythm`. The critical anchor:
  - When a 2-line lead paragraph is followed directly by paired section blocks (no step strip), the section header band starts at **y=2.85"** (was y=2.75" before the title-pair shift; now +0.10" to preserve the lead-to-section breathing room).
  - When a step strip sits between the lead and the sections, the sections move down to **y=4.40"** (after the strip at **2.60"–4.17"**).

**{layout.slide-step-process}** — Step strip + paired sections variant.
- Standard chrome, then row 1 (full-width, ~0.7") lead paragraph → row 2 (full-width, ~1.57") {component.step-strip} with 4 cards → row 3 (6+6 columns, ~3.4") paired {component.section-block}s.

**{layout.slide-kpi-row}** — 3 KPI tiles + supporting table variant.
- Standard chrome, then lead paragraph (full-width) → 3 {component.kpi-tile}s in 4+4+4 allocation with 0.20" gutters → optional {component.data-table} below → source citation footer in {typography.caption} {colors.muted}.

**{layout.slide-table-focus}** — A {component.data-table} is the slide's content, not a supporting exhibit under something else.

With charts out of scope, the data table carries every multi-value comparison in this system. It needs a layout where it is the subject.

- Background {colors.canvas}.
- Standard chrome.
- **Optional lead paragraph** at y=1.85" saying what the table shows and what to look for.
- **Table** spanning the content frame (x=0.40", w=12.58"), anchored at **y=2.85"** when a lead paragraph is present and **y=2.60"** when it is not.
- **Row budget:** rows are 0.42" and the body must clear the footer line at y=6.95". That allows **9 rows with a lead paragraph, 10 without** — header row included. Beyond that, split across two slides or move detail to an appendix; do not shrink the row height.
- Source citation at y=7.10", w=11.50".

**Choose table focus when:**
- Three or more dimensions compared across three or more items.
- The reader will scan for a specific cell rather than read a narrative.

**Avoid when:**
- Three values with no cross-dimension comparison → {layout.slide-kpi-row}.
- One value dominates → {layout.slide-hero-stat}.
- Two items on one dimension → {layout.slide-comparison} reads better than a two-row table.

**{layout.slide-hero-stat}** — One headline number anchors the slide. The "single statistic you should remember" pattern.

- Background {colors.canvas}.
- Standard chrome: {component.chevron-header} + {component.page-title-pair} + {component.page-number}.
- **Centered hero numeral** at (centered x, **y=2.70"**), 88pt Bold {colors.ink-strong}, -1.5 charSpacing, line spacing 1.0. The numeral spans the page width visually but is anchored at slide center.
  - Unit suffix (`%`, `명`, `조원` etc.) inline in 36pt Bold {colors.body}, separated by 0.10" — visually a smaller pair to the numeral, matching the {component.kpi-numeral-run} relationship but scaled up.
- **Headline label** below the numeral at **y=4.40"**, centered, {typography.subsection-header} (14pt Bold) {colors.ink-strong}, max 1 line.
- **Optional supporting list** at **y=5.00"**, 2–3 dash items centered horizontally as a block (block width ≤ 7.0"), {typography.bullet} (13pt) {colors.body}.
- **Optional delta indicator** below the list, {typography.kpi-delta} style (`▲ +18.4% YoY`), centered.
- Source citation at y=7.10", w=11.50".

**Choose hero stat when:**
- The slide exists to deliver one headline number (market size, user count, milestone).
- The number IS the takeaway — surrounding text is supporting, not equal.

**Avoid when:**
- 2+ numbers compete for attention → use {layout.slide-kpi-row}.
- The narrative is the trend across many periods, not the absolute value → use a {component.data-table}.

**{layout.slide-comparison}** — Head-to-head comparison using paired {component.section-block}s with **neutral `A.` / `B.` framing** instead of sequential `01.` / `02.` numbering. The framing alone — paired symmetry + binary-coded headers — carries the comparison semantics; no graphical divider is needed in the gutter.

- Background {colors.canvas}.
- Standard chrome.
- **Lead paragraph** at y=1.85" framing what is being compared (1–2 lines), {typography.body} (14pt).
- **Paired section blocks** at **y=2.85"** — left section at x=0.40", w=6.19"; right section at **x=6.79"**, w=6.19" (left end 6.59" + 0.20" gutter). Section header bands use neutral framing (`A.` / `B.` or `현재` / `목표`) rather than `01.` / `02.` to signal opposition rather than sequence.
- Section bodies contain {component.bullet-list} (dash items) or {component.data-table} depending on whether the comparison is qualitative or quantitative.
- Source citation at y=7.10", w=11.50".

**No VS divider, no `vs` text marker, no gutter ellipse.** Earlier drafts placed a 0.50" orange `vs-divider` ellipse in the gutter; that component was removed because the `A.` / `B.` header framing already signals the comparison clearly, and the extra graphical marker added decoration without information. The brand voice prefers typographic framing over visual ornament — when in doubt, trust the headers and the symmetric layout to do the work.

**Choose comparison when:**
- Two options/states are being directly compared on equal footing (Option A vs B, Before vs After, Current vs Target).
- The slide's purpose is to make the reader choose or feel the contrast.

**Avoid when:**
- The two topics are sequential or thematic rather than opposed → use the standard 6+6 with `01.` / `02.` numbering, no VS.
- 3+ items to compare → use a {component.data-table} with categories as columns.

**{layout.slide-3col}** — Three parallel items (trends, considerations, dimensions). Visually distinct from the dominant 6+6 paired layout.

- Background {colors.canvas}.
- Standard chrome.
- **Lead paragraph** at y=1.85" introducing the three (1–2 lines).
- **Three columns** at **y=2.85"**, each w=4.06" with 0.20" gutter (x=0.40", x=4.66", x=8.92"). Each column contains:
  - **Numeric eyebrow** at the top: `01` / `02` / `03` in 32pt Bold {colors.brand-orange} (no period after — the eyebrow is decorative, not a list numeral). The orange budget for the page is collectively the three eyebrows, counted as one signature surface.
  - **Heading** below the eyebrow at column-y + 0.55", {typography.subsection-header} (14pt Bold) {colors.ink-strong}, max 2 lines.
  - **Hairline divider** 0.5pt {colors.hairline} below the heading, w=col − 0.30".
  - **Dash list** below the hairline, 2–3 items, {typography.bullet} (13pt) {colors.body}.
- Source citation at y=7.10", w=11.50".

**Choose 3-column when:**
- Content naturally splits into exactly three parallel items (trends, regions, time horizons).
- Each item carries roughly equal weight — no item dominates.

**Avoid when:**
- One item is clearly the headline → use {layout.slide-hero-stat} or asymmetric 6+6 with the headline left.
- Items are sequential (Step 1 → 2 → 3) → use {component.step-strip}.
- 4+ items → use {layout.slide-2x2-grid} (for 4) or {layout.slide-takeaways} (for 4–5).

**{layout.slide-2x2-grid}** — Four related items in a 2×2 grid. Distinct from 4-card step strip (which is sequential).

- Background {colors.canvas}.
- Standard chrome.
- **Lead paragraph** at y=1.85" introducing the four (1–2 lines).
- **2×2 grid** at **y=2.85"**, four cells (cell height reduced from 2.00" to 1.95" so the bottom row clears the source citation row):
  - Top-left at (x=0.40", **y=2.85"**), w=6.19", **h=1.95"**.
  - Top-right at (**x=6.79"**, **y=2.85"**), w=6.19", **h=1.95"**.
  - Bottom-left at (x=0.40", **y=5.00"**), w=6.19", **h=1.95"**.
  - Bottom-right at (**x=6.79"**, **y=5.00"**), w=6.19", **h=1.95"**.
  - 0.20" gutter horizontally and vertically. Right column x=6.79" = left column end (6.59") + 0.20" gutter. Bottom row y=5.00" = top row end (4.80") + 0.20" gutter.
- Each cell contains:
  - **Heading** at cell.x, cell.y + 0.10", {typography.subsection-header} (14pt Bold) {colors.ink-strong}.
  - **Hairline divider** below heading, 0.5pt {colors.hairline}, w=cell − 0.30".
  - **Dash list** below, 2–3 items, {typography.bullet} (13pt) {colors.body}.
- **No section header bands** — the grid is denser than paired section blocks, and orange-wash bands would crowd the layout.
- Source citation at y=7.05" (compressed because the grid extends to y=6.95").

**Choose 2×2 grid when:**
- Four parallel factors / dimensions / considerations.
- Reader scans by position (top-left = primary, bottom-right = secondary in many cultures).

**Avoid when:**
- Items are sequential → use {component.step-strip}.
- One item dominates → asymmetric layout instead.
- The grid would force two cells to be much sparser than the others — pad uneven content with explanatory dashes or split the slide.

**{layout.slide-open}** — Chrome only. The body region is left free.

Every layout system needs a sanctioned escape hatch. Without one, content that fits nothing gets forced into the nearest layout and breaks it, or gets built off-grid with no chrome at all. This layout says: the header, the title pair, the page number and the footer line still hold; arrange the middle as the content requires.

- Background {colors.canvas}.
- Standard chrome: {component.chevron-header} + {component.page-title-pair} + {component.page-divider} + {component.page-number}.
- **Free body region:** x=0.40" → 12.98", y=1.85" → 6.95". Nothing may cross those bounds.
- Everything else still applies. Palette, type scale, {rounded.flat} corners, one signature-orange surface per page, source citation at y=7.10" when external data appears.

**Choose open when:**
- Long-form prose (background, methodology, a legal note) that no columnar layout serves.
- A one-off arrangement that will not repeat in the deck.

**Avoid when:**
- The content matches any other layout, even loosely. Reach for this last, not first.
- The same off-grid arrangement appears twice. Two uses means it is a layout — specify it here instead.

**{layout.slide-takeaways}** — Numbered key insights stacked vertically, full-width. For closing summaries, executive readouts, "if you remember nothing else" pages.

- Background {colors.canvas}.
- Standard chrome.
- **Page title** typically reads `Key Takeaways`, `핵심 정리`, or chapter-specific equivalent.
- **3–5 stacked insights** starting at **y=2.05"**, each insight ~0.90" tall with 0.10" vertical gap:
  - **Index numeral** at insight.x=0.40", w=0.95", **right-aligned within the column** (PptxGenJS: `align: 'right'`): `01` / `02` / `03` / ... in 40pt Bold {colors.brand-orange}, no period, top-aligned to the headline baseline. The numeral's right edge sits flush at x=1.35" so the visual gap between number and headline text is consistently 0.10", regardless of whether the numeral is `01` (~0.55" wide) or hypothetically `10`/`11` (~0.75" wide). Left-aligned numerals create a ~0.40" trailing whitespace inside the column that reads as a visual disconnect between number and text. The numerals collectively count as the page's one signature-orange surface.
  - **Insight headline** at x=1.45", w=11.53" (insight.y baseline), {typography.subsection-header} (14pt Bold) {colors.ink-strong}, max 1 line.
  - **Supporting line** at x=1.45", insight.y + 0.32", {typography.body} (14pt) {colors.body}, max 2 lines.
- Source citation at y=7.10", w=11.50".

**Choose takeaways when:**
- Closing slide of a chapter or deck — distilling what the audience should remember.
- Reading order matters (insight 1 → 2 → 3, not parallel).

**Avoid when:**
- Insights need equal-weight parallel scanning → use {layout.slide-3col}.
- A single insight dominates → use {layout.slide-hero-stat}.

**{layout.slide-timeline}, {layout.slide-quote} — out of scope.** Both were removed on 2026-08-07; the removed text is preserved in `archive/design-timeline-quote.md`. For time-anchored sequences use a {component.step-strip} or a {component.data-table} with one row per period. For a statement that needs emphasis, lift it into the {component.page-title-pair} subtitle or make it the lead item of a {component.section-block}.

**{layout.slide-end}** — End-of-document closing slide. The deck's final page — a quiet "fin" that signals the report has concluded. The symmetric counterpart to {layout.slide-cover}: opening is loud (giant logo + editorial title), closing is quiet (small logo + one editorial mark).

- Background {colors.canvas} (white).
- **Wordmark** at the same coordinates as the {component.chevron-header} wordmark — container (x=11.80", y=0.353", w=1.06", h=0.38"). Use `logo-orange-on-white-sm.png` — white background because the closing slide has no gray context bar, and the `-sm` padding because this container is header-sized, not cover-sized. Visual logo ~1.00" × 0.32" inside the container.
- **Closing mark** at (x=0.40", y=3.00"), **72pt Bold {colors.ink-strong}**, left-aligned, -1.5 charSpacing. Default text is `E. O. D.` — three uppercase letters, period after each, single space between groups (`E` + `.` + ` ` + `O` + `.` + ` ` + `D` + `.`). For Korean-only decks, `끝.` (single syllable + period) at 88pt is an acceptable alternative.
- **No chevron header, no page title, no page number, no source citation, no other content.** The closing slide is intentionally near-empty — the generous whitespace IS the message.

**Choose end-slide when:**
- Every production deck. This is the closing convention — the symmetric counterpart to {layout.slide-cover}. A deck without an explicit closing slide ends abruptly on whatever the last content slide happens to be, which reads as unfinished.

**Avoid alternatives:**
- A "Thank You" slide → off-brand. The brand voice is internal-report editorial, not pitch-deck closer.
- Contact info / Q&A invitation → put that on a preceding slide (typically with {layout.slide-takeaways}), not on the closing mark.
- A back-cover variant that mirrors the giant-logo opening → over-designed. The closing is intentionally quieter than the opening; the deck winds down, it doesn't crescendo.
- Decorative ornament (lines, dots, flourishes) around the `E. O. D.` mark → none. The mark stands alone in whitespace.

