# 관례: 해야 할 것 · 하지 말 것 · 렌더링 · 알려진 공백

> `DESIGN.md`에서 생성된 파일이다. 여기를 고치지 말고 `DESIGN.md`를 고친 뒤
> `python scripts/build_skill.py`를 다시 실행할 것.

## Do's and Don'ts

### Do
- Use {colors.ink-strong} (black) on page titles, section numerals, step card titles, KPI numerals, and table label cells — never substitute with {colors.body}.
- Use {colors.body} (`#595959`) as the dominant body color — most text on a content page is this single tone.
- Reserve {colors.brand-orange} for one signature surface per page. The {component.chapter-pill} is **chrome** (always present, doesn't count). The page's one content-level orange surface is any **one** of: an active {component.step-card} border · section-divider numerals · the {layout.slide-section-divider} 6.50" ellipse · a {component.data-table} emphasis-column header. Never general buttons. ({component.kpi-tile}s carry **no** orange surface — orange appears only inside the {component.kpi-delta} text.)
- Use {colors.brand-orange-wash} freely as container/strip/band fill — it may repeat multiple times per slide.
- **Cite external data.** Tables and KPI numerals sourced from outside the team require a {component.source-citation} line. Korean `출처:` prefix, ` · ` separator for multiple sources, no italic, no English `Source:`. Data the team produced itself carries **no** source line — see `Components → Source Citation & Footnotes`.
- **One icon library per deck.** Lucide is canonical; Feather is the only acceptable fallback. Outline only, 1.5pt stroke, single-tone — no Material Icons, no Font Awesome, no filled glyphs, no multi-color sets. See `Components → Icons`.
- **Preserve the {component.chevron-header} overlap** — gray bar starts at x=2.95, orange chevron extends to x=3.11. The orange sits on top via z-order so only a ~1.6% sliver of white remains. Never give them a positive gap.
- **Align every content element to the canonical content frame x=0.40" → x=12.98" (width 12.58").** Page-divider, page-title-pair, lead paragraph, step-strip, paired section-blocks, KPI row, data-table, source caption, and page-number all share this single frame. The chevron header above sets it; nothing below extends past it on either side.
- End {component.context-bar} 0.35" before the slide right edge (NOT flush). The {component.wordmark} container ends at x=12.86, leaving ~0.12" of visible bar between the logo and where the gray surface ends at x=12.98 — this right-side breathing room mirrors the chapter-pill's left text inset.
- **Render list items with a typed `- ` (hyphen + space) prefix** at 13pt {colors.body}, matching the {typography.page-subtitle} convention. Single text run per item, no `bullet` PptxGenJS option. The dash stays the same color/weight/size as the body text — restraint over ornament.
- **On the cover, write date and author rows as plain text** with no `DATE` / `AUTHOR` prefix label — date in `YYYY.MM.DD.` format, author in `부서명 이름` format. These values are deck-specific.
- **On the cover, render the confidential footer as fixed boilerplate** — the two-line English text is the same on every deck, regardless of topic or audience. Update the `©YYYY Hecto` year to match the deck's document year.
- Default to {typography.page-title} (16pt) and {typography.body} (14pt). Resist inflating to 24pt+ on content pages.
- **Use the pre-composited PNG variants** (`logo-orange-on-white.png`, `logo-orange-on-gray.png`) — one per background color. See Asset Processing.
- Pair {component.section-block}s 6+6 with `01.` / `02.` {component.section-header-band}s when the content has comparative structure.
- Anchor {component.page-number} to (x=12.13", y=7.10", w=0.85") on every {layout.slide-content-standard} so the text box's right edge sits at x=12.98" — aligned with the content frame. Format as a **single current-page digit** (`4`), not as `N / total`.

### Don't
- Don't substitute Pretendard with Malgun Gothic, Noto Sans KR, Apple SD Gothic Neo, or system fallback in published output.
- Don't use alpha-channel logo PNGs directly — LibreOffice ignores alpha and renders a rectangular block. Always use the pre-composited flat-RGB variant for the target background.
- **Don't introduce a positive gap between {component.chevron-orange} and {component.context-bar}** — they overlap by design. Gray bar starts at x=2.95, behind the orange chevron's right curve.
- **Don't place the {component.chapter-pill} text flush against the pill's left edge (x=0.40").** The text must sit at **x=0.54"** (= 0.40" + 0.14" left inset). A flush-left chapter label reads as crowded and breaks the symmetric micro-rhythm with the wordmark's right-side breathing room. Implement as a separate text box at (x=0.54", y=0.25"), not as the pill rect's internal text — PptxGenJS internal text often collapses the inset to zero.
- **Don't anchor the {component.page-title-pair} title at y=0.89".** The chevron header ends at y=0.84", leaving only a 0.05" gap before the title — visually the title looks magnetically attached to the gray bar, not as its own hierarchical layer. Use **y=1.00"** for the title (0.16" gap from chevron), **y=1.36"** for the subtitle, **y=1.74"** for the divider, **y=1.85"** for the lead paragraph. The 0.16" chevron-to-title breathing room is non-negotiable.
- **Don't let content blocks overshoot the canonical content frame (x=0.40" → x=12.98").** A step-strip at x=0.35"–12.95", a divider at x=0.35"–13.00", or a section-block extending to x=13.00" all read as content overflowing the title/header column above. Pull them in. The frame is set by the chevron header; everything below obeys.
- **Don't add a left-edge orange accent strip to {component.kpi-tile}.** The previous spec called for a 0.06" orange strip; it was removed. KPI tiles are quiet — hairline border + delta indicator color only. A row of three vertical orange bars breaks visual unity with the wash-band system used everywhere else.
- Don't extend {component.context-bar} to the slide right edge (flush) — it must end ~0.35" before the edge.
- Don't push the {component.wordmark} container flush against the gray bar's right edge (x=12.98). The container right edge belongs at x=12.86, with the ~0.12" of remaining gray bar acting as right-side padding. A flush-right logo feels crammed and breaks the header's left-right symmetry.
- **Don't use ■, ●, •, ·, or any other marker glyph for list items.** The Hecto list convention is a typed `- ` (hyphen + space) prefix at body color, matching the {typography.page-subtitle}. Marker glyphs add visual weight the system has already chosen to do without.
- **Don't use the PptxGenJS `bullet` option on list items.** This system uses typed dashes, not native PowerPoint bullet markers. Native bullets would re-introduce the same visual heaviness the dash convention removes.
- **Don't substitute the hyphen with en-dash (`–`), em-dash (`—`), or any decorative variant.** The marker is exactly U+002D (hyphen-minus) followed by a single space — same as the page-subtitle.
- **Don't add `DATE` / `AUTHOR` (or any other) leading label to the cover meta rows.** Plain values only — the editorial voice is established by the title and subtitle; the meta rows are quiet.
- **Don't translate, paraphrase, or extend the cover's confidential footer.** It is fixed English boilerplate (`Confidential and proprietary Any use of this material without / specific permission of Hecto is strictly prohibited`). Date/author/title above it change per deck; the confidential block does not.
- **Don't hard-code the example values from this spec onto a real deck.** Title, subtitle, date, author on the cover are illustrative — every deck fills its own. Only the confidential block and the layout positions are constant.
- **Don't write a section-divider English title where any single line exceeds ~10 characters.** Long words like `INFRASTRUCTURE` will wrap inside the circle. Use shorter splits (`AI / INFRA`).
- **Don't start the section-header band at y=2.65" or earlier** under a 2-line lead paragraph on slides without a step strip — it collides with the prose. Use **y=2.85"** (this anchor was y=2.75" in earlier drafts; it shifted to 2.85" when the page-title-pair moved down by 0.10").
- Don't add an English title above the Korean title on content pages — production decks are Korean-only above {component.page-divider}.
- Don't use dotted dividers — production uses solid {component.page-divider}.
- Don't add corner radii to any component — every container is {rounded.flat} (0pt). The curves in the system come from the {shape.flowChartDelay} primitive (chevron header) and the section-divider `ellipse`, never from `rectRadius`.
- Don't use pill-shaped buttons inside content — the pill shape is reserved for the {component.chapter-pill} only.
- Don't add decorative shapes to {layout.slide-cover} or anywhere else. The single 6.50" orange `ellipse` on {layout.slide-section-divider} is the system's only large decorative form, and it is restricted to that one layout.
- Don't fill more than one {colors.brand-orange} signature surface per page. The wash is generous; the saturated orange is rationed.
- Don't make the section numeral ({typography.section-header} in `01.`) orange — production renders it in the same {colors.ink-strong} as the title.
- Don't render at 4:3, A4, or square. 16:9 only.
- Don't inflate content-page type past 18pt. Display sizes (60pt+) are for {layout.slide-cover}, {layout.slide-section-divider}, and {layout.slide-toc} only.
- **Don't add charts.** Charts are out of scope (see `Components → Charts — out of scope`). Numeric content goes into a {component.data-table}, a {component.kpi-tile} row, or {layout.slide-hero-stat}. A pasted chart image is off-spec and carries no brand guarantee.
- **Don't leave externally-sourced numbers uncited.** Any table or KPI numeral drawn from outside the team needs a {component.source-citation} line. A deck full of uncited external statistics reads as marketing, not reporting. The inverse is also a defect: don't manufacture a `출처: 자체 분석` line just to fill the footer slot when the analysis is your own.
- **Don't write source citations in English (`Source:`) or in italic.** Korean `출처:` prefix, Regular weight, `#A6AAA9` muted color, ` · ` separator for multiple sources. Anything else is off-brand.
- **Don't mix icon libraries.** Lucide is canonical. Adding a Material Icon or Font Awesome glyph next to a Lucide icon is more visible than the missing icon ever would have been.
- **Don't render icons in filled / multi-color / gradient styles.** Outline only, single-tone, 1.5pt stroke. Filled glyphs read as off-brand the same way pill-shaped buttons do.
- **Don't arbitrarily activate one {component.step-card} as a default decoration.** The active variant (2pt orange border + orange label) is a semantic signal meaning "this step is the slide's focus" or "you are here in the process." On overview slides covering all steps equally, leave **all cards in the default state** — there is no "currently selected" step. Activating Step 2 on an overview slide misleads the reader into thinking Step 2 is somehow distinguished from the others. See {component.step-strip} "Active state usage" for the full rule.

## Rendering Behavior

> Hecto is a PPTX-output system, not a web system. "Responsive behavior" in the marketing-web sense does not apply. The relevant axis is **rendering environment** — how the same `.pptx` file appears under different consumers.

### Canvas
- 16:9 only at 13.333" × 7.500". Never crop, never letterbox, never 4:3.

### Renderer Differences

| Environment | Behavior |
|---|---|
| PowerPoint (Pretendard installed) | Reference renderer. All measurements and tokens in this spec target this output. The pre-composited {component.wordmark} PNGs render correctly. |
| PowerPoint (no Pretendard) | Falls back to system Hangul font — typically Malgun Gothic. Letter-spacing and weight balance degrade visibly. **Embed Pretendard OTF/TTF in the PPTX** via Options > Save > "Embed fonts in the file" to prevent this. |
| LibreOffice / headless conversion | Used for preview pipelines. **Ignores PNG alpha channels** — alpha-PNG logos render as opaque rectangles. Always use the pre-composited flat-RGB variants ({colors.canvas} for cover, {colors.context-bar} for header). {shape.flowChartDelay} renders correctly. Pretendard must be installed system-wide (e.g., `~/.fonts/` or `/usr/share/fonts/`) for accurate preview. |
| Google Slides | Imports PPTX but does not honor embedded fonts. Falls back to web fonts; Pretendard is not in the Google Fonts catalog. Consider exporting to PDF for high-fidelity sharing instead. |

### Font Embedding
Always embed Pretendard into the PPTX when distributing externally. PowerPoint > Options > Save > "Embed fonts in the file" → "Embed all characters" (larger file but reliable). For headless rendering, install Pretendard system-wide before invoking `soffice --headless --convert-to pdf`.

### Animation & Transition
Not specified in this system. Default to **Fade only**, 200ms ease-in-out. Disable Push, Cube, Page Curl, and other showy transitions.

## Iteration Guide

1. **Build the {component.chevron-header} first.** It anchors every {layout.slide-content-standard} and must be pixel-identical across the deck. Implement once as a helper function (`addChevronHeader(slide, pillText, contextText)`) and reuse — varying only the {typography.chapter-badge} text and {typography.page-context} text per slide.
2. **Pixel-verify chevron anchor coordinates** on every slide: {component.chapter-pill} at (x=0.40", y=0.25", w=2.30") with text box at **x=0.54"** (0.14" inset); {component.chevron-orange} at (x=2.68", y=0.25", w=0.43"); {component.context-bar} at (x=2.95", y=0.25", w=10.03") with text box at **x=3.43"** (mirror inset); {component.chevron-white} at (x=2.95", y=0.25", w=0.34"); **{component.wordmark} at (x=11.80", y=0.353", w=1.06", h=0.38")** — note the container right edge stops at x=12.86, leaving ~0.12" of bar before the bar's right edge (x=12.98). Mind the z-order: context-bar → chevron-white → chapter-pill → chevron-orange → text/wordmark. Misalignment by 4–8px is the most common defect; flush-right wordmark placement is the second; **flush-left chapter-pill text (forgetting the 0.14" inset) is the third — text must be a separate text box, not the pill rect's internal text, or the inset collapses to zero.**
3. **Build the list renderer as a dash-prefix helper** (`buildSectionRuns(items)`). Each item is one paragraph with text `"- " + itemText` at 13pt {colors.body}, no `bullet` option, breakLine between items. Lead lines stay paragraph-typed at 14pt bold with no dash prefix. Get this right once and every section block on every slide inherits the same quiet, page-subtitle-matching marker.
4. **Pick the layout from the content's natural shape, not from default habit.** The paired {component.section-block} layout (`01.` / `02.`) is the dominant pattern when content is two parallel topics — but a single headline number wants {layout.slide-hero-stat}, a tabular data exhibit wants a {component.data-table}, three parallel items want {layout.slide-3col}, four factors want {layout.slide-2x2-grid}, an opposition wants {layout.slide-comparison}, a closing summary wants {layout.slide-takeaways}. Variety serves the reader; repeating the same paired layout 4 slides in a row reads as a template, not a report.
5. **Reference tokens directly** ({colors.brand-orange-wash}, {colors.body}, {component.chapter-pill}) — never paraphrase as "the light orange" or "the gray body color." Tokens are the contract.
6. **Resist visual escalation.** Real Hecto decks are quiet: white canvas, 14pt body, modest section bands, zero decoration. The brand reads professional precisely because it doesn't shout.
7. **When adding a new color**, confirm it fits the 4-color working set ({colors.brand-orange} / {colors.brand-orange-wash} / {colors.body} / {colors.canvas}). If it doesn't, the deck shouldn't use it. Semantic colors ({colors.positive}, {colors.negative}) are the only exception, used only for delta indicators.
8. **When adding a new shape**, confirm it is one of: `rect` ({rounded.flat}), {shape.flowChartDelay} (chevron only), `ellipse` (section-divider 6.50" only), or `line` (page-divider, footnote rule). No stars, hexagons, blobs, organic curves, or additional ovals.
9. **For the cover slide**, treat the layout as a pattern with one fixed island: the bottom confidential block. Title, subtitle, date (`YYYY.MM.DD.`), and author (`부서명 이름`) are filled per deck — never invent a `DATE: ` / `AUTHOR: ` label scheme. The confidential 2-line English block is verbatim boilerplate; only the `©YYYY` year follows the deck. If the cover feels underdressed without labels, fix it with whitespace and weight, not by adding a label. **Every deck closes with {layout.slide-end}** — the quiet `E. O. D.` counterpart that signals the report has concluded.
10. **For section dividers**, check the English title length before committing. If `STR_LENGTH(line) > 10`, either shorten the word or split the title differently. Don't let the renderer wrap — the wrap is unrecoverable.
11. **Logo rendering must work in both PowerPoint and LibreOffice.** Always use pre-composited flat-RGB PNGs. Alpha-channel PNGs render correctly in PowerPoint but as opaque rectangles in LibreOffice's PDF pipeline — never deploy them.
12. **Don't reach for a chart.** Charts are out of scope. When numbers need to be shown, the answer is a {component.data-table}, a {component.kpi-tile} row, or {layout.slide-hero-stat}.

## Known Gaps

- Sub-brand wordmark lockups (Hecto Innovation, Financial, Healthcare, Data, Media) have separate horizontal/vertical variants. They are not bundled with this spec — request them from the brand team for sub-brand-specific decks.
- Korean number formatting (1만 vs. 10,000) is not standardized. Default to the source data's convention and stay consistent within a single table.
- Dark-mode token values (inverted canvas, surface, body) are not defined; the brand has not shipped a dark-mode palette for slide decks.
- Form input components (text fields, dropdowns, checkboxes) are not defined; this system targets read-only slide output, not interactive surfaces.
