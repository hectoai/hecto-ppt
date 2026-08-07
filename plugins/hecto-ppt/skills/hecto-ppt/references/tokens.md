# 토큰: 색 · 타이포 · 여백 · 도형

> `DESIGN.md`에서 생성된 파일이다. 여기를 고치지 말고 `DESIGN.md`를 고친 뒤
> `python scripts/build_skill.py`를 다시 실행할 것.

## Overview

Hecto stages itself as a Korean IT-group infrastructure brand with a quietly confident, technical voice. The slide deck brand voice is internal-report editorial — dense, precise, type-led — anchored in stark white canvas with a single signature orange accent ({colors.brand-orange}) that earns its rare appearance through restraint. The system has no marketing flair: no gradients, no photographic flourishes, no decorative shapes. The brand reads strong because of typography discipline and structural consistency, not ornament.

Pretendard anchors every surface from 110pt section-divider numerals down to 10pt page-number microcopy. The geometric, slightly humanist Hangul-Latin compatibility suits both dense content surfaces (where 13pt list-item text carries 1.3 line-height and each item is prefixed with a simple `- ` dash matching the page-subtitle convention) and the high-impact divider displays (where -2% letter-spacing tightens 72pt headlines). The chevron header — orange chapter pill + 0.33" white gap + gray context bar — is the brand's most distinctive structural signature, anchored pixel-identically across every content slide. Sections divide via two stacked elements: a 0.37"-tall orange-wash header band and a white body container. Cards are uniformly rectangular (0pt corners); the single curved form in the system is the {shape.flowChartDelay} chevron used in the header.

**Key Characteristics:**
- Stark monochrome palette — white ({colors.canvas}) and slate body ({colors.body}) — broken open by a single signature orange ({colors.brand-orange}) and one warm orange wash ({colors.brand-orange-wash})
- {typography.font-family} (Pretendard) across the entire system; no secondary display face
- Rectangular forms everywhere ({rounded.flat}); curves exist only inside the {component.chevron-header} via the {shape.flowChartDelay} primitive
- **Dash-prefixed list items** — each item leads with `- ` (U+002D hyphen + space) at 13pt body, matching the {typography.page-subtitle} convention. No ■ glyphs, no native bullet markers, no round dots — just dashes for visual restraint and consistency with the subtitle line
- 16:9 slide canvas only (13.333" × 7.500") — never 4:3, never A4
- Conservative content-page type scale (18pt header text in {component.chapter-pill} and {component.context-bar}, **16pt** page title, 14pt body, 13pt bullet text, 11pt caption); display sizes reserved for {layout.slide-cover} and {layout.slide-section-divider}
- One signature {colors.brand-orange} surface per page maximum; {colors.brand-orange-wash} may repeat as container fill
- Decorative restraint is absolute — no cropped-sun motifs, no oversized circles, no gradient washes, no abstract ornament on any slide

## Colors

### Brand & Accent
- **Brand Orange** ({colors.brand-orange}): `#FF6013`. Signature high-impact accent. Used on the {component.chapter-pill}, {component.chevron-orange}, active {component.step-card} borders, the section-divider ellipse, and table emphasis-column headers. Carries the brand's only attention-grabbing energy. ({component.kpi-tile}s carry **no** brand-orange surface — see component spec.)
- **Brand Orange Wash** ({colors.brand-orange-wash}): `#FFE7DC`. The dominant secondary surface. Used for {component.step-strip} container background, {component.section-header-band}, {component.data-table} emphasis-column fill, and quiet grouped-content backgrounds. May appear multiple times per slide.
- **Brand Orange 300** ({colors.brand-orange-300}): `#FFBB93`. Partial-bleed tint. Rare.

### Surface
- **Canvas** ({colors.canvas}): `#FFFFFF`. Primary slide background, {component.section-block} body fill, {component.step-card} fill, {component.kpi-tile} fill.
- **Context Bar** ({colors.context-bar}): `#D0CECF`. Used exclusively on the {component.chevron-header}'s gray right segment.
- **Hairline** ({colors.hairline}): `#E8E9EC`. 1pt {component.data-table} outer border, {component.kpi-tile} border, inactive {component.step-card} border (0.5pt).
- **Hairline Soft** ({colors.hairline-soft}): `#EFF0F2`. Inner table row separators.

### Text
- **Ink Strong** ({colors.ink-strong}): `#000000`. Pure black. Used on {typography.page-title}, {typography.section-header} (both numeral and title), {typography.step-title}, {typography.kpi-numeral}, table label cells, the section-divider chapter title, and emphasis text.
- **Body** ({colors.body}): `#595959`. The dominant body color. Use for {typography.body}, bullet items (marker + text), {typography.caption}, lead paragraphs. This is the workhorse — most text on a content slide is this single tone.
- **Stone** ({colors.stone}): `#838383`. {typography.micro} page numbers, footnotes, "Step N" microcopy labels.
- **Muted** ({colors.muted}): `#A6AAA9`. De-emphasized labels, source citations.
- **On Brand** ({colors.on-brand}): `#FFFFFF`. Text on orange surfaces ({component.chapter-pill} text).

### Semantic
- **Positive** ({colors.positive}): `#15B886`. Upward delta indicators (▲), positive KPI changes.
- **Negative** ({colors.negative}): `#FF0000`. Negative deltas, error markers.
- **Point Blue** ({colors.point-blue}): `#00A1FF`. Reserved for a single comparative dimension when one is genuinely needed. With charts out of scope it has **no current use site** — do not reach for it to decorate.

## Typography

### Font Family
**Pretendard** (primary, {typography.font-family}). Variable Hangul-Latin geometric sans-serif. Used across every surface, every role. The face handles 110pt section-divider numerals down to 10pt page-number microcopy from the same axis without weight mismatching across scripts.

Pretendard was chosen for its dual fluency: it scales cleanly from 110pt display sizes (where -3.5% letter-spacing creates magazine-grade tightness) down to 10pt micro labels (where the slightly humanist counters maintain Hangul legibility). The brand uses no italic variant — emphasis comes from weight (400 / 700) or color shift to {colors.brand-orange}, never from slant.

**Fallback policy:** Never substitute Pretendard with Malgun Gothic, Noto Sans KR, Apple SD Gothic Neo, or system fallback in published output. For machines without Pretendard installed, embed the OTF/TTF into the PPTX via PowerPoint > Options > Save > "Embed fonts in the file."

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| {typography.kpi-numeral} | 44pt | 700 | 1.0 | -1% | {component.kpi-tile} primary numeric value |
| {typography.step-title} | 18pt | 700 | 1.3 | 0 | {component.step-card} Korean title |
| {typography.chapter-badge} | 18pt | 700 | 1.3 | 0 | Text inside the {component.chapter-pill}, **left-aligned** |
| {typography.page-context} | 18pt | 700 | 1.3 | 0 | Text in the {component.context-bar}, left-aligned |
| {typography.page-title} | 16pt | 700 | 1.3 | 0 | Page hero title (Korean), top-left under header |
| {typography.section-header} | 16pt | 700 | 1.3 | 0 | `01.` / `02.` numbered {component.section-header-band} |
| {typography.step-label} | 16pt | 700 | 1.3 | 0 | "Step N" label inside {component.step-card} |
| {typography.kpi-unit} | 16pt | 700 | 1.3 | 0 | {component.kpi-tile} unit suffix |
| {typography.kpi-label} | 12pt | 700 | 1.3 | 0 | {component.kpi-tile} top label |
| {typography.kpi-delta} | 11pt | 700 | 1.3 | 0 | {component.kpi-tile} delta indicator |
| {typography.subsection-header} | 14pt | 700 | 1.3 | 0 | Bold lead lines above bullet groups |
| {typography.body} | 14pt | 400 | 1.5 | 0 | Primary body text, lead paragraphs, table cells |
| {typography.page-subtitle} | 14pt | 400 | 1.3 | 0 | Page subtitle prefixed with `- ` |
| {typography.bullet} | 13pt | 400 | 1.3 | 0 | List item text inside {component.section-block}, prefixed with `- ` (hyphen + space) to match the {typography.page-subtitle} dash convention. Single text run per item, no native bullet markers, no ■ glyphs. The dash matches the body text color ({colors.body}), never orange. |
| {typography.table-header} | 12pt | 700 | 1.3 | 0 | {component.data-table} header row |
| {typography.table-body} | 12pt | 400 | 1.3 | 0 | {component.data-table} body cells |
| {typography.caption} | 11pt | 400 | 1.5 | 0 | Source notes, axis labels, table units |
| {typography.cover-meta} | 11pt | 400 | 1.3 | 0 | Date row, author row on {layout.slide-cover}. Plain text, **no leading label**. |
| {typography.cover-footer} | 10pt | 400 | 1.25 | 0 | Confidential footer + `©YYYY Hecto` on {layout.slide-cover} |
| {typography.micro} | 10pt | 400 | 1.5 | 0 | {component.page-number}, footer microcopy |

### Principles
- **Tight display leading** (1.0–1.1) and aggressive negative letter-spacing on display sizes (-2% to -3.5%) create a magazine-quality typographic display on cover and divider slides.
- **Tight body leading** (1.3–1.5) keeps Korean prose dense without bloating bullet groups.
- **Weight discipline:** Regular (400) for body, Bold (700) for all headings and emphasis. SemiBold (600), ExtraBold (800), and Black (900) are not used.
- **Single typeface** strategy — never mix Pretendard with another sans-serif. No second face for English fragments.
- **Korean dash convention:** {typography.page-subtitle} leads with `-` followed by a space. The dash matches the subtitle color, never orange.
- **`charSpacing: -1` to `-3`** applies to large display text (60pt+); never to body text.
- **Dash-prefix list convention:** List items lead with `- ` (hyphen + space) typed directly into the text, identical to the {typography.page-subtitle} convention. Each item is a single text run, no `bullet` PptxGenJS option, no ■ or other marker glyphs. The dash inherits the body text color and stays consistent at 13pt across all list items.

## Layout

### Spacing System
- **Base unit**: 4pt.
- **Tokens**: {spacing.md} (16pt) · {spacing.lg} (20pt). These are the only two spacing tokens the system currently consumes. Most layout/component coordinates are expressed directly in inches (0.20", 0.40", etc.) rather than through tokens — the spacing scale earns a token only when the value is reused across multiple components. Earlier drafts included a full 8-step scale (xxs/xs/sm/md/lg/xl/xxl/xxxl); the unused 6 were removed as dead tokens.
- **Card internal padding**: {component.kpi-tile} uses {spacing.lg}; {component.section-block} body uses {spacing.md} left/top; {component.step-card} uses {spacing.md} internal.
- **Inter-grid gutter**: {spacing.lg} (20pt) for multi-column body.
- **Gap between {component.chevron-orange} end and {component.context-bar} start**: 0.33" — intentional, calibrated, do not close.

### Canvas & Container
- Slide format: 16:9 only. Reference canvas **1920 × 1080 px** = **13.333" × 7.500"**. Conversion: 144 px/inch.
- Outer safe margin: 0.40" left, 0.353" right (asymmetric — matches the {component.chevron-header} bounds); 30–40px top/bottom.
- **Canonical content frame: x=0.40" → x=12.98" (width 12.58").** This is the single horizontal frame every content element must respect. The {component.chevron-header} establishes it; {component.page-divider}, {component.page-title-pair}, lead paragraph, {component.step-strip}, paired {component.section-block}s, {component.kpi-tile} row, {component.data-table}, source caption, and {component.page-number} all align to it. **No content block extends past x=12.98" or begins before x=0.40".** Earlier drafts placed the divider at 0.35–13.00 and the step strip at 0.35–12.95, which read as content overshooting the title/header frame — the unified 0.40–12.98 frame fixes this.
- Content area: **y=1.85" to y=7.00"** (~5.15" vertical working space). Lead paragraph anchors at the top of this region; the bottom of the working space holds source citation and page number together on the y=7.10" baseline.
- {component.page-number} anchor: right edge at x=12.98" (text box at x=12.13", w=0.85", right-aligned), y=7.10".

### Grid
12-column grid within the **12.58" working width** (x=0.40" → x=12.98"). Common allocations:
- **2-col (6+6)**: Paired {component.section-block} pair (`01.` left, `02.` right) — the dominant content-page layout. Also used by {layout.slide-comparison} (head-to-head comparison with neutral `A.` / `B.` framing). Each column 6.19" wide with 0.20" gutter: **left column x=0.40" → x=6.59", right column x=6.79" → x=12.98"**. The right column starts at x=6.79", **not** x=6.59" — forgetting the 0.20" gutter is the most common 2-col bug (makes columns touch and leaves 0.20" empty on the right edge, breaking the 1:1 symmetry).
- **4-col (3+3+3+3)**: {component.step-strip} OR {layout.slide-toc} chapter grid. Step cards 2.76" wide with ~0.31" equal outer-margin/inter-card gaps (4 × 2.76 + 5 × 0.308 = 12.58). TOC columns 2.94" with ~0.27" gaps (4 × 2.94 + 3 × 0.27 = 12.57).
- **3-col**: {component.kpi-tile} row OR {layout.slide-3col} mosaic (three trends/dimensions/considerations). Three columns 4.06" wide with **0.20" gutters** (4.06 + 0.20 + 4.06 + 0.20 + 4.06 = 12.58).
- **2×2 grid**: {layout.slide-2x2-grid} four-cell layout. Each cell 6.19" × 1.85"–2.00" with 0.20" horizontal and vertical gutters.
- **Asymmetric (1.0"-numeral + 11.53"-content)**: {layout.slide-takeaways} numbered-insight stack. Index numeral column at x=0.40" w=0.95"; content column at x=1.45" w=11.53".
- **Full-width**: lead paragraph, single {component.data-table}, hero stat numeral ({layout.slide-hero-stat}), full-width {component.step-strip} — span the full 12.58" frame.

### Vertical rhythm on {layout.slide-content-standard}
Stack (top to bottom) for the standard chevron-header workhorse:

| y-position | element |
|---|---|
| 0.25" | {component.chevron-header} (height 0.59", ends at y=0.84") |
| **1.00"** | {component.page-title-pair} — Korean title (16pt Bold). **0.16" gap above** for breathing room from the chevron — do NOT use y=0.89" (the title gets magnetically pulled into the chevron's gray bar). |
| **1.36"** | {component.page-title-pair} — Korean subtitle (14pt Regular, `- ` prefix) |
| **1.74"** | {component.page-divider} (0.75pt solid {colors.body}) |
| **1.85"** | Lead paragraph (14pt {colors.body}, ~2 lines, line-height 1.5) |
| **2.85"** | **Paired {component.section-block}s** if there is no step strip — anchored 0.40"+ below the lead paragraph to maintain breathing room. Was y=2.75" in earlier drafts; pushed down by 0.10" when the page-title-pair shifted down to y=1.00" so the lead-to-section gap stays consistent. |
| **2.60"–4.17"** | {component.step-strip} if present (height 1.57") |
| **4.40"** | Paired {component.section-block}s after a step strip |
| **7.10"** | Source caption ({typography.caption} {colors.muted}), **w=11.50"** (x=0.40" → 11.90"). Shares the baseline with {component.page-number}; the narrowed width keeps the two clear of each other. Was y=6.75" in earlier drafts — the caption sat alone with an oversized gap to the slide's bottom edge, reading as a stranded line rather than a footer. |
| 7.10" | {component.page-number} |

### Whitespace Philosophy
Content slides tighten dramatically compared to cover and divider slides. {layout.slide-content-standard} stacks at: header (0.59") → page title pair (0.84" total) → solid divider → lead paragraph (~0.6") → content blocks. {layout.slide-cover} and {layout.slide-section-divider} give display typography generous breathing room — vertical rhythm at 0.5–0.7" between display lines, with 1.5"+ of upper canvas left empty above the hero text. On the cover, the date/author rows sit ~0.45" below the Korean subtitle, then the whole middle of the canvas is intentionally empty before the bottom footer row — the whitespace is the rest of the brand voice.

## Elevation & Depth

The system runs **predominantly flat**. There are no drop shadows, no glows, no atmospheric depth treatments anywhere in the deck. Depth is expressed exclusively through color and border weight.

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | No shadow, no border | {component.section-block} body, {layout.slide-cover}, {layout.slide-section-divider} text blocks |
| 1 (hairline) | 0.5–1pt {colors.hairline} border | {component.data-table} outer border, inactive {component.step-card}, {component.kpi-tile} |
| 2 (orange accent) | 2pt {colors.brand-orange} border | Active {component.step-card} |
| 3 (wash) | {colors.brand-orange-wash} fill on rectangular surface | {component.section-header-band}, {component.step-strip} container, {component.data-table} emphasis column |

### Decorative Depth
- **None.** No shadows, no internal gradients, no photographic backgrounds, no abstract decoration. Brand-tinted shadows, radial gradients, atmospheric circles — all explicitly absent from this system.
- Visual hierarchy and grouping are achieved through {colors.brand-orange-wash} surface fills and {colors.hairline} 1pt borders only.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| {rounded.flat} | 0pt | All rectangles — default. {component.chapter-pill}, {component.context-bar}, {component.section-header-band}, {component.section-block} body, {component.step-card}, {component.kpi-tile}, {component.data-table} cells, {component.step-strip} container |

### Shape Primitives
- **`rect`** — the dominant primitive. All container surfaces, all cards, all bands.
- **{shape.flowChartDelay}** — `pres.ShapeType.flowChartDelay` (OOXML "Delay" symbol). A stadium with one flat edge and one rounded edge. Used in two places only, both in the {component.chevron-header}:
  - {component.chevron-orange} — provides the curved right end of the {component.chapter-pill}
  - {component.chevron-white} — overlaid on the left edge of the {component.context-bar} to create the gray bar's curved intake
- **`ellipse`** — single use only: the 6.50" {layout.slide-section-divider} circle. No other ellipse usage anywhere in the system. (Earlier drafts also defined a 0.50" `vs-divider` ellipse for head-to-head comparison slides; that component was removed — the `A.` / `B.` neutral header framing on paired section blocks already carries the comparison semantics without an extra graphical marker.)
- **`line`** — 0.75pt solid {colors.body} for the {component.page-divider}.

### Photography & Decoration Geometry
- **No photography in the system.** No product imagery, no portraits, no illustrations, no avatars.
- **No decorative geometry.** No additional circles, no ovals, no abstract shapes outside the {shape.flowChartDelay} uses and the {layout.slide-section-divider} 6.50" ellipse.
- **No icons** in the formalized component set. If an icon is ever needed, use 1.5pt stroke line-art in {colors.ink-strong} or {colors.brand-orange} — never multi-color or filled icon sets.

