# 컴포넌트와 에셋

> `DESIGN.md`에서 생성된 파일이다. 여기를 고치지 말고 `DESIGN.md`를 고친 뒤
> `python scripts/build_skill.py`를 다시 실행할 것.

## Components

> Per the slide-deck context, there are no hover or focus states — slides are read-only output. Default and active variants only.

### Header & Page Chrome

**{component.chevron-header}** — Composite component used on {layout.slide-content-standard} only. The brand's most distinctive structural signature. Spans x=0.40" → x=12.98", y=0.25" → y=0.84" (height 0.59"). Composed of five primitives stacked in this z-order (back to front): {component.context-bar} → {component.chevron-white} → {component.chapter-pill} → {component.chevron-orange} → text and wordmark.

**The gray bar and its white-chevron overlay are deliberately positioned to overlap with the orange chevron**: the gray surface starts at x=2.95, behind where the orange chevron extends (x=2.68 → 3.11). Z-order ensures the orange chevron sits on top, so the visual effect is the orange chevron flowing directly into the gray bar with only a sliver of white between the curves (~1.6% of header width).

**{component.chapter-pill}** — Orange rectangle carrying the chapter/series label.
- Shape `rect` ({rounded.flat}), background {colors.brand-orange}, no border, position (x=0.40", y=0.25"), size (w=2.30", h=0.59").
- Text {typography.chapter-badge} in {colors.on-brand}, **left-aligned**, **anchored at x=0.54"** (= pill x 0.40" + 0.14" left inset). The 0.14" inset is **mandatory** — text flush to the pill's left edge (x=0.40") reads as crowded and breaks the symmetric micro-rhythm with the wordmark's right-side breathing room (which leaves ~0.12" from the visible logo glyph to the gray bar's right edge). PptxGenJS: place the text as a **separate text box at (x=0.54", y=0.25", w=2.16", h=0.59")**, NOT as the pill rect's internal text (which collapses the inset).
- Width 2.30" — tight to the text so the chapter and context labels read as a close-coupled pair.

**{component.chevron-orange}** — Curved right terminus of {component.chapter-pill}.
- Shape {shape.flowChartDelay}, background {colors.brand-orange}, no border, position (x=2.68", y=0.25"), size (w=0.43", h=0.59").

**{component.context-bar}** — Gray bar carrying the page or team name.
- Shape `rect` ({rounded.flat}), background {colors.context-bar}, no border, position (x=2.95", y=0.25"), size (w=10.03", h=0.59").
- **Starts behind the orange chevron's right curve** at x=2.95 — the gray bar (and its white-chevron overlay) sit *underneath* the orange chevron in z-order. The gray surface is partially occluded by the orange chevron but visible immediately after the chevron's curve ends. Visual white gap measures ~1.6% of header width.
- Ends 0.35" before the slide right edge.
- Text {typography.page-context} in {colors.ink-strong}, **left-aligned**, anchored at x=3.43" — placed to mirror the {component.chapter-pill} text's left inset.

**{component.chevron-white}** — Overlay creating the gray bar's curved left intake.
- Shape {shape.flowChartDelay}, background {colors.canvas}, no border, position (x=2.95", y=0.25"), size (w=0.34", h=0.59").

**{component.wordmark}** — Hecto logo image overlaid on the right end of {component.context-bar}.
- Image source: `logo-orange-on-gray.png` (pre-composited onto context-bar gray; see Asset Processing).
- Container position (x=11.80", y=0.353"), size (w=1.06", h=0.38").
- Visual logo size within the container: ~1.00" wide × 0.32" tall (logo occupies 94% × 83% of the container; the rest is padding).
- Vertically centered within the header band (band center y=0.545, container center y=0.543).
- **Right-side breathing room is mandatory.** The container's right edge sits at x=12.86 — leaving ~0.12" of visible gray bar (and ~0.15" from the visible logo glyph) between the wordmark and where the gray surface ends at x=12.98. This mirrors the 0.14" left inset that the chapter-pill text carries on the other end of the header, giving the whole chevron a calibrated, symmetric micro-rhythm. **Do not push the container all the way to the bar's right edge** — a flush-right wordmark feels crammed and breaks the rhythm.

**{component.page-title-pair}** — Korean page title and subtitle, sits below {component.chevron-header}.
- {typography.page-title} at (x=0.40", **y=1.00"**) in {colors.ink-strong}, left-aligned. **x=0.40" matches the {component.chapter-pill}'s left edge above** — the page title reads as a continuation of the chevron header, not a separate column.
- {typography.page-subtitle} at (x=0.40", **y=1.36"**) in {colors.ink-strong}, prefixed with `- `.
- {component.page-divider}: 0.75pt solid {colors.body} line at **y=1.74"**, **from x=0.40" to x=12.98"** — exactly matches the chevron header span above so the header, divider, and every content block below share one horizontal frame.

**Vertical breathing room above the page title is mandatory.** The chevron header's bottom edge sits at y=0.84"; the page title now starts at y=1.00" — a **0.16" gap**. Earlier drafts placed the title at y=0.89" (only 0.05" below the chevron), which read as the title being magnetically pulled into the chevron's gray bar rather than as a separate hierarchical layer. The 0.16" gap matches the breathing rhythm between the title (16pt Bold), subtitle (14pt Regular), and divider — each layer separated by roughly its own visual weight in whitespace.

**{component.page-divider}** — Solid 0.75pt line separating header chrome from content body. Always solid (never dotted), always single weight, always {colors.body}.

**{component.page-number}** — Bottom-right page number.
- Position (x=12.13", y=7.10"), w=0.85", right-aligned. The text box's right edge sits at x=12.98" — aligned with the content frame's right edge (and the chevron header span above).
- {typography.micro} in {colors.stone}.
- Format: **current page only**, as a single digit (`4`). No "N / total" pagination — the deck reads as a continuous artifact, not a counted sequence.

### Section Blocks

**{component.section-block}** — Two-part numbered section container, the dominant content-page layout primitive. Composed of {component.section-header-band} stacked on {component.section-body}.

**{component.section-header-band}** — Orange-wash header band carrying numeral + title.
- Shape `rect` ({rounded.flat}), background {colors.brand-orange-wash}, no border, height 0.37".
- Content: numeral (e.g., `01.`) + 2-space gap + title (e.g., `운영 현황`).
- Both numeral and title use {typography.section-header} in {colors.ink-strong} — the numeral does NOT shift to orange.
- Left inset 0.18–0.24", vertically centered.

**{component.section-body}** — Bullet-list or table content area below {component.section-header-band}.
- Background {colors.canvas} (no fill, no border).
- Padding: 0.18" left, 0.15" top.
- Contains {component.bullet-list} or {component.data-table}.

### Step Process

**{component.step-strip}** — Horizontal strip containing 3–5 sequential {component.step-card}s.
- Container `rect` ({rounded.flat}), background {colors.brand-orange-wash}.
- Position: **full content frame (x=0.40", w=12.58")**, height ~1.57". Right edge sits at x=12.98", matching the chevron header and page divider exactly.
- Cards distributed with equal outer margins and equal inter-card gaps (~0.31" each with 4 cards × 2.76" wide).

**Active state usage — read carefully.** By default, **all step cards render in the default (no-orange) state**. The {component.step-card-active} variant is **opt-in and contextual**, not a default decoration. Highlighting one card creates a "you are here" / "focus on this step" signal — use it only when that signal is true:

| Slide context | Active card? |
|---|---|
| Slide deep-dives into a single step (e.g., a follow-up slide expanding on Step 2's mechanics) | ✅ exactly **one** card active — the step being deep-dived |
| Step strip serves as a progress indicator across a multi-slide sequence ("you are here") | ✅ exactly **one** card active — the current slide's step |
| Slide covers **all steps equally** (overview, lists per step, comparison across steps, principles for all steps) | ❌ **all default** — no card active |
| First slide introducing the step strip / process overview | ❌ **all default** — no card active |

The most common failure mode: arbitrarily activating one card on an overview slide because the active variant exists. This sends a false "Step 2 is special here" signal that misleads the reader when the slide content actually covers all steps. **When in doubt, leave all cards default** — the orange-wash strip container already provides enough visual weight to anchor the process. The active state is reserved for genuine step-level focus.

**{component.step-card}** — Individual step within {component.step-strip}.
- Shape `rect` ({rounded.flat}), background {colors.canvas}, border 0.5pt {colors.hairline}.
- Size: w=2.76", h=0.98".
- Internal vertical layout: {typography.step-label} ("Step 1") in {colors.ink-strong}, centered top; {typography.step-title} (Korean) in {colors.ink-strong}, centered below.
- No description text — typography hierarchy alone carries the card.

**{component.step-card-active}** — Active variant. **Opt-in, contextual** — see {component.step-strip} "Active state usage" for when to apply. **Not a default decoration.**
- Border switches to 2pt {colors.brand-orange}.
- {typography.step-label} color shifts to {colors.brand-orange}.
- {typography.step-title} color and card fill unchanged.
- **Maximum one active card per step strip.** Two active cards mean two foci, which is no focus.
- The active card collectively counts as the page's signature-orange surface — competes with emphasis-column headers. If the slide already uses one of those, leave the step strip in all-default state.

### Lists

**{component.bullet-list}** — Dash-prefixed list style. Each item leads with `- ` (U+002D hyphen-minus + space) typed directly into the text, matching the {typography.page-subtitle} convention. No ■ glyphs, no round dots, no native PowerPoint bullet markers — the dash IS the marker, and it stays as quiet as the body text it precedes.

> The token name `{component.bullet-list}` is historical. The component no longer renders bullets in the traditional sense — items are dash-prefixed paragraphs. Treated as a "list" component throughout this document.

**Rendering pattern** — each list item is **one single-run paragraph** with the text `"- " + itemText`. No `bullet` PptxGenJS option, no separate marker run, no character substitution. The visual quietness comes from the dash being the same weight, size, and color as the text it leads.

| Property | Value | Notes |
|---|---|---|
| Marker | `- ` (hyphen + space) | Typed literally into the text string. Never substitute with `–` (en-dash), `—` (em-dash), `•`, `·`, or `■` |
| Marker size | 13pt | Same as body — single run, no size split |
| Marker color | {colors.body} | Inherits from the paragraph's text color |
| Body text size | {typography.bullet} **13pt** | Same as marker (single run) |
| Body text color | {colors.body} | `#595959` |
| Wrapped-line behavior | No hanging indent | Wrapped lines align with the dash, not the text. Keep items short (≤ 1 line typical, ≤ 2 lines max) to avoid awkward wraps |

**Bold lead lines** (sub-headers above a list group): {typography.subsection-header} (14pt bold) in {colors.ink-strong}, **no dash prefix** — lead lines are not list items. Stand-alone paragraph that introduces the dash group below.

**Spacing**
- Line spacing 1.3 (tight).
- Inter-paragraph spacing: 2pt before list items, 6–8pt before lead lines.
- Sub-section pattern: bold lead line → 2–3 dash items → 6–8pt gap → next sub-section's lead.

**Implementation reference (PptxGenJS)**
```js
// Each list item: one paragraph, dash typed into the text. No bullet option.
runs.push({
  text: '- ' + itemText,
  options: {
    color: COLORS.body,
    fontSize: 13,
    fontFace: 'Pretendard',
    breakLine: !isLast,
  },
});

// Bold lead line: no dash prefix.
runs.push({
  text: leadText,
  options: {
    color: COLORS.inkStrong,
    fontSize: 14,
    bold: true,
    fontFace: 'Pretendard',
    breakLine: true,
  },
});
```

**Anti-patterns:**
- Using `bullet: { code: '25A0' }` or any other native PowerPoint bullet option — this system uses typed dashes, not list markers.
- Substituting the hyphen with `–` (en-dash), `—` (em-dash), `•` (bullet), `·` (middle dot), or `■` (filled square). The convention is U+002D + space, period.
- Coloring the dash orange or any other accent — the dash matches the body text color, always.
- Indenting wrapped lines manually (e.g., via leading spaces) to fake a hanging indent. Keep items short instead.

### Data Tables

**{component.data-table}** — Compact content table.
- Outer border 0.5pt {colors.hairline}; row height 0.42".
- Inner row separators 0.5pt {colors.hairline-soft}.

**{component.data-table-header}** — Top header row.
- Fill {colors.brand-orange-wash}, text {typography.table-header} in {colors.ink-strong}, centered.

**{component.data-table-row}** — Body row.
- Fill {colors.canvas}, text {typography.table-body} in {colors.body}, centered. Label column may be left-aligned and bold ({colors.ink-strong}).

**{component.data-table-emphasis}** — Emphasis column (e.g., latest year, projected value).
- Cell fill {colors.brand-orange-wash}, cell text {typography.table-body} in {colors.ink-strong} bold.
- Header of that column: {typography.table-header} in {colors.brand-orange}.

### KPI Tiles

**{component.kpi-tile}** — Single-metric showcase, used in 3-tile rows.
- Shape `rect` ({rounded.flat}), background {colors.canvas}, border 0.75pt {colors.hairline}, height 1.50".
- **No orange accent strip.** The tile carries no signature-orange surface — orange appears only in the {component.kpi-delta} indicator (positive/negative/neutral color shift) when delta data is present. This keeps KPI tiles visually quiet and consistent with the rest of the content system, which expresses orange through wash bands (section headers, step strips) rather than left-edge strips. An earlier draft specified a 0.06" left orange strip; it was removed because a row of three tiles with vertical orange bars read as a foreign component against the wash-band pattern and pulled the eye away from the page's chosen signature surface.
- Padding {spacing.lg} (~0.25") all sides.
- Internal stack: {typography.kpi-label} top, {component.kpi-numeral-run} middle, {component.kpi-delta} bottom.

**{component.kpi-numeral-run}** — Rich-text run combining numeric value and unit.
- Numeric value: {typography.kpi-numeral} in {colors.ink-strong}.
- Unit suffix: {typography.kpi-unit} in {colors.body}, separated by two spaces.

**{component.kpi-delta}** — Bottom delta indicator.
- Format `▲ +18.4% YoY` (symbol + space + value/label).
- Color {colors.positive} for upward, {colors.negative} for downward, {colors.brand-orange} for neutral comparison labels.
- Typography {typography.kpi-delta}.

### Charts — out of scope

> **Charts are not part of this system.** The chart component set (vertical bar, horizontal bar, line, donut, stacked bar) and the {layout.slide-chart-focus} layout were removed on 2026-08-07; the removed text is preserved in `archive/design-charts.md`.
>
> **Why:** native PptxGenJS charts carry a maintenance surface out of proportion to their use. Their defaults contradict the spec (gridlines render unless explicitly disabled), their appearance drifts between PowerPoint and LibreOffice, and each of the five types needs its own axis, legend, and label recipe. The brand voice is type-led and restrained; a {component.data-table} carries the same numbers with none of that fragility.
>
> **Instead:** use a {component.data-table} for tabular data, a {component.kpi-tile} row for headline figures, {layout.slide-hero-stat} for a single dominant number, and a {component.step-strip} for a sequence. If a deck genuinely needs a chart, produce it outside this system and place it as an image — but that image is off-spec and carries no brand guarantee.

### Source Citation & Footnotes

**{component.source-citation}** — Data attribution and reference convention. Used under every table and KPI row in a production deck — bare numbers without sourcing are off-brand.

#### Inline source line (default)
- **Position:** below the cited element at `(element.x, element.y + element.h + 0.10")`. On {layout.slide-content-standard}, the page-level source footer anchors at **y=7.10", w=11.50"** per the Vertical Rhythm table — level with {component.page-number}, narrowed so the two never collide.
- **Style:** {typography.caption} (11pt) {colors.muted}, left-aligned, **no italic**.
- **Format:** `출처: [organization], [YYYY.MM]` — Korean `출처:` prefix (never English `Source:`), single space after the colon, no trailing period.
- **Multiple sources:** separated by ` · ` (space + U+00B7 middle dot + space). Order by citation order in the page narrative, never alphabetically.
  - Example: `출처: 한국은행 경제통계, 2026.03 · IDC Korea, 2026.01`
- **Self-generated data: do not cite.** A slide whose content is entirely the team's own analysis carries **no source line at all** — omit the component rather than writing `출처: 자체 분석`. The citation exists to point the reader at an external record they could go check; `자체 분석` points nowhere and adds a line of gray text for no informational gain. Cite only when there is a real external source to name.
  - Mixed slides (external data plus own interpretation) cite only the external portion: `출처: 한국은행 경제통계, 2026.03` — not `출처: 한국은행 경제통계, 2026.03 · 자체 분석`.

#### Footnote markers
- **In-text marker:** superscript Arabic numeral immediately after the annotated word/value with no space, {typography.caption} (11pt) {colors.brand-orange}. Use `¹` `²` `³` (U+00B9, U+00B2, U+00B3) for 1–3; for 4+, use Pretendard's full superscript style.
- **Footnote list:** at the page-level source footer position, format `¹ [explanation/source] · ² [explanation/source]`. Same style as the inline source line.

#### Data caveat tags
- For projected/estimated values, append `(추정)`, `(전망)`, or `(F)` in {typography.caption} (11pt) {colors.muted} inside the value or in the column header. The parenthetical tag is the only conventional caveat — never invent custom asterisk schemes.

**Anti-patterns:**
- English `Source:` prefix → use Korean `출처:`.
- Comma-separated sources (`출처: A, B, C`) → use ` · ` separator so multi-token organization names don't blur.
- Italic source text → not in this system; weight stays Regular and color carries the de-emphasis.

### Callouts — out of scope

> **{component.callout} is not part of this system.** Removed on 2026-08-07; the removed text is preserved in `archive/design-callout.md`. A statement that needs emphasis belongs in the {component.page-title-pair} subtitle or as the lead item of a {component.section-block} — the system's restraint comes from typography and structure, not from a marker attached to one sentence.

### Icons

> Icons supplement KPI tiles and step cards where a typographic label alone is ambiguous. They never replace text — they accompany it. The system is restrained: one library, one stroke style, three sizes.

**{component.icon}** — Single-tone line-art glyph.

- **Library:** **Lucide** (`lucide.dev`) as the canonical source — clean stroke geometry, MIT-licensed, exhaustive coverage. If a needed icon is absent from Lucide, fall back to **Feather Icons** (the visual ancestor of Lucide). Never mix Material Icons, Font Awesome, Heroicons, or any filled/multi-color set into the same deck.
- **Style:** outline only — round line caps, round joins. No filled glyphs, no two-tone, no gradients, no shadows.
- **Color:** {colors.ink-strong} (default), {colors.brand-orange} (when the icon emphasizes a brand-orange typographic emphasis on the same line), {colors.body} (de-emphasized — table eyebrow icons). Never {colors.point-blue} or any other semantic color outside delta indicators (where ▲ and ▼ are typographic, not iconographic).

#### Size tokens

| Token | Size | Stroke | Use |
|---|---|---|---|
| {icon.xs} | 12 × 12pt | 1.0pt | Inline with {typography.caption} |
| {icon.sm} | 16 × 16pt | 1.5pt | {component.kpi-tile} corner accent, inline with {typography.body} |
| {icon.md} | 20 × 20pt | 1.5pt | {component.step-card} center accent |
| {icon.lg} | 24 × 24pt | 1.5pt | Page-level eyebrow icon (rare, summary slides) |

#### Asset workflow
- **Source:** Lucide SVG.
- **Render to PNG:** pre-render each icon to a flat PNG at **2× the target size** (e.g., 32×32 px for {icon.sm}), single-color (apply the SVG `stroke` attribute before export). PptxGenJS does not embed SVG natively, and PNG at 2× ensures crisp rendering at 100% zoom.
- **Per-color variants:** generate separate PNGs per color (`icon-search-ink.png`, `icon-search-orange.png`, `icon-search-body.png`) rather than overlaying tints. Tint overlays are unreliable across LibreOffice/PowerPoint.
- **Background:** transparent in SVG, but per the LibreOffice alpha constraint, pre-composite onto the icon's target slide-background color before deployment (canvas-white for most placements, brand-orange-wash for icons sitting on a section header band).

**Constraints**
- One icon library per deck. Mixing visual languages is more visible than a missing icon.
- An icon never carries meaning that the surrounding text doesn't also carry. A reader in a low-resolution preview, or a reader unfamiliar with the iconography, must still understand the slide.
- No icon on {layout.slide-cover}, {layout.slide-section-divider}, or {layout.slide-toc} — those layouts are typography-led.
- No icon larger than {icon.lg} (24pt). Beyond 24pt the line-art weight breaks down at slide-projection scale.

## Asset Processing

### Hecto Wordmark

The system ships pre-composited flat-RGB PNG variants of the Hecto wordmark, **one per (background color, container) pair** — not one per background color. The white wordmark appears in two differently-proportioned containers, so it needs two paddings:

- `logo-orange-on-white.png` — for {layout.slide-cover} (white canvas, cover container)
- `logo-orange-on-white-sm.png` — for {layout.slide-end} (white canvas, header-sized container)
- `logo-orange-on-gray.png` — for {component.chevron-header} (gray {colors.context-bar} band)

Both variants carry the **same wordmark ink** — 2761 × 879 px, ink aspect **3.1411**. The wordmark itself is identical in the two files; only the background color and the surrounding padding differ.

### PNG aspect ratio is per-variant, and that is deliberate

Each PNG is padded so that **its aspect ratio equals its container's aspect ratio exactly**. That is what keeps the wordmark undistorted: PowerPoint stretches an image to fill its container, so a shared PNG ratio across two containers of different ratios would necessarily squash one of them.

| Variant | PNG | PNG aspect | Container | Container aspect | Stretch |
|---|---|---|---|---|---|
| `logo-orange-on-white.png` | 2937 × 1062 | 2.7655 | w=5.53", h=2.00" | 2.7650 | +0.02% |
| `logo-orange-on-white-sm.png` | 2937 × 1053 | 2.7892 | w=1.06", h=0.38" | 2.7895 | −0.01% |
| `logo-orange-on-gray.png` | 2937 × 1053 | 2.7892 | w=1.06", h=0.38" | 2.7895 | −0.01% |

Visual extent: 94% horizontal in all variants; 82.8% vertical on the cover variant, 83.5% on the header-sized ones. Top padding is 5% of PNG height, which is what lands the cover wordmark's visual top edge at y=0.40" — level with the title column.

Resulting visual logo sizes: cover ~5.20" × 1.66", header ~1.00" × 0.32".

> An earlier build cropped the header variant 12px shorter, on the claim that decorative descender marks would compress into an underline at header size. Measurement showed the cut removed 1.4% of the height and that what it removed was the bottom curve of the dome mark under the "o" — a glyph element, not an ornament. It left the two shipped wordmarks differing in proportion by 1.3%, which a single stated aspect ratio could not describe. Both variants now use the full ink bbox.

### Regenerating the assets

`scripts/build_logos.py` derives all variants from `assets/source/hecto-logo-hires.png`. Container sizes are constants in that script; changing a container in this spec means changing it there too, or the stretch stops being zero.

Always use the pre-composited PNG matching the target background color. Never modify the wordmark's proportions, hue, or stroke.

