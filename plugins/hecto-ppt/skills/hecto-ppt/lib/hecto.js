// 헥토 슬라이드 자료 헬퍼.
//
// 호출부는 **좌표를 넘길 수 없다.** 레이아웃 이름만 고르면 앵커는 이 파일이 정한다.
// 이전 방식(헬퍼가 x, y를 인자로 받음)에서 실제로 벌어진 일:
//   - 출처 캡션이 슬라이드마다 다른 y에 놓여 페이지 번호 대역을 침범했다
//   - 페어드 섹션 블록이 스펙 2.85 대신 2.90에 앉았고 아무도 못 잡았다
// 기본값을 두는 것으로는 부족하다. 뚫을 수 없어야 계약이다.
//
// 좌표의 근거는 전부 DESIGN.md다. 값을 바꾸려면 스펙을 먼저 고친다.

const pptxgen = require("pptxgenjs");
const path = require("path");

// ── 토큰 ──────────────────────────────────────────────────────────────
const C = {
  brandOrange: "FF6013",
  wash: "FFE7DC",
  orange300: "FFBB93",
  canvas: "FFFFFF",
  contextBar: "D0CECF",
  hairline: "E8E9EC",
  hairlineSoft: "EFF0F2",
  ink: "000000",
  body: "595959",
  stone: "838383",
  muted: "A6AAA9",
  positive: "15B886",
  negative: "FF0000",
  pointBlue: "00A1FF",
};
const F = "Pretendard";

// ── 그리드 (DESIGN.md Layout) ─────────────────────────────────────────
const CANVAS = { w: 13.333, h: 7.5 };
const FRAME = { x: 0.40, w: 12.58 };          // 콘텐츠 프레임. 우 12.98"
const COL = { w: 6.19, right: 6.79 };          // 6+6 페어드. 거터 0.20"
const SOURCE = { y: 7.10, w: 11.50 };          // 페이지 번호와 같은 baseline
const PAGENUM = { x: 12.13, y: 7.10, w: 0.85, h: 0.25 };
const FOOTER_TOP = 6.95;                       // 본문이 침범하면 안 되는 선

// 수직 리듬 (DESIGN.md Vertical rhythm 표)
const Y = {
  lead: 1.85,
  stepStrip: 2.60,
  kpiRow: 2.60,
  blocks: 2.85,          // 스텝 스트립이 없을 때 페어드 섹션 블록
  blocksAfterStrip: 4.40,
  gridTop: 2.85,
  gridBottom: 5.00,
  tableAfterKpi: 4.40,
  heroNumeral: 2.70,
  heroHeadline: 4.40,
  heroNotes: 5.00,
  takeaways: 2.05,
};

const WORDMARK = { x: 11.80, y: 0.353, w: 1.06, h: 0.38 };

function assetPath(dir, name) {
  return path.join(dir, name);
}

// ── 콘텐츠 슬라이드 ───────────────────────────────────────────────────
// 메서드를 체인으로 부른다. 다음 앵커는 슬라이드가 스스로 안다.
class ContentSlide {
  constructor(owner, slide) {
    this.owner = owner;
    this.s = slide;
    this.S = owner.S;
    this.hasStrip = false;
    this.hasKpi = false;
  }

  lead(text) {
    this.s.addText(text, {
      x: FRAME.x, y: Y.lead, w: FRAME.w, h: 0.75,
      fontFace: F, fontSize: 14, color: C.body,
      align: "left", valign: "top", lineSpacingMultiple: 1.5, margin: 0,
    });
    return this;
  }

  // 스텝 스트립. active는 그 슬라이드가 특정 단계를 파고들 때만 넘긴다.
  // 개요 슬라이드에서 임의로 켜면 "이 단계가 특별하다"는 거짓 신호가 된다.
  stepStrip(steps, { active } = {}) {
    const y = Y.stepStrip;
    const CARD = { w: 2.76, h: 0.98 };
    const gap = (FRAME.w - steps.length * CARD.w) / (steps.length + 1);
    this.s.addShape(this.S.rect, {
      x: FRAME.x, y, w: FRAME.w, h: 1.57,
      fill: { color: C.wash }, line: { type: "none" },
    });
    steps.forEach((label, i) => {
      const on = i === active;
      const cx = FRAME.x + gap + i * (CARD.w + gap);
      const cy = y + (1.57 - CARD.h) / 2;
      this.s.addShape(this.S.rect, {
        x: cx, y: cy, w: CARD.w, h: CARD.h, fill: { color: C.canvas },
        line: { color: on ? C.brandOrange : C.hairline, width: on ? 2 : 0.5 },
      });
      this.s.addText(`Step ${i + 1}`, {
        x: cx, y: cy + 0.14, w: CARD.w, h: 0.24,
        fontFace: F, fontSize: 11, bold: true,
        color: on ? C.brandOrange : C.ink, align: "center", margin: 0,
      });
      this.s.addText(label, {
        x: cx, y: cy + 0.44, w: CARD.w, h: 0.34,
        fontFace: F, fontSize: 14, bold: true, color: C.ink,
        align: "center", valign: "middle", margin: 0,
      });
    });
    this.hasStrip = true;
    return this;
  }

  // 페어드 섹션 블록. 앵커는 스텝 스트립 유무가 정한다.
  // blocks가 1개면 프레임 전체 폭을 쓴다.
  sections(blocks) {
    const y = this.hasStrip ? Y.blocksAfterStrip : Y.blocks;
    const bodyH = FOOTER_TOP - (y + 0.50);
    blocks.forEach((b, i) => {
      const full = blocks.length === 1;
      const x = full || i === 0 ? FRAME.x : COL.right;
      const w = full ? FRAME.w : COL.w;
      this.s.addShape(this.S.rect, {
        x, y, w, h: 0.37, fill: { color: C.wash }, line: { type: "none" },
      });
      this.s.addText(b.head, {
        x: x + 0.18, y, w: w - 0.30, h: 0.37,
        fontFace: F, fontSize: 16, bold: true, color: C.ink,
        align: "left", valign: "middle", margin: 0,
      });
      this.s.addText(dashRuns(b.items), {
        x: x + 0.18, y: y + 0.50, w: w - 0.36, h: bodyH,
        align: "left", valign: "top", margin: 0,
      });
    });
    return this;
  }

  // 2×2 그리드. 셀 높이 1.95", 거터 0.20" (DESIGN.md slide-2x2-grid)
  grid(cells) {
    const H = 1.95;
    cells.slice(0, 4).forEach((cell, i) => {
      const x = i % 2 === 0 ? FRAME.x : COL.right;
      const y = i < 2 ? Y.gridTop : Y.gridBottom;
      this.s.addText(cell.head, {
        x, y: y + 0.06, w: COL.w, h: 0.32,
        fontFace: F, fontSize: 14, bold: true, color: C.ink,
        align: "left", valign: "middle", margin: 0,
      });
      this.s.addShape(this.S.line, {
        x, y: y + 0.44, w: COL.w - 0.30, h: 0,
        line: { color: C.hairline, width: 0.5 },
      });
      this.s.addText(cell.desc, {
        x, y: y + 0.54, w: COL.w - 0.10, h: H - 0.60,
        fontFace: F, fontSize: 13, color: C.body,
        align: "left", valign: "top", lineSpacingMultiple: 1.35, margin: 0,
      });
    });
    return this;
  }

  // 3단 컬럼. 눈썹 번호가 페이지의 시그니처 오렌지를 소진한다.
  threeCol(cols) {
    const W = 4.06;
    cols.slice(0, 3).forEach((col, i) => {
      const x = FRAME.x + i * (W + 0.20);
      this.s.addText(col.eyebrow, {
        x, y: Y.blocks, w: W, h: 0.50,
        fontFace: F, fontSize: 32, bold: true, color: C.brandOrange,
        align: "left", valign: "top", margin: 0,
      });
      this.s.addText(col.head, {
        x, y: Y.blocks + 0.55, w: W, h: 0.40,
        fontFace: F, fontSize: 14, bold: true, color: C.ink,
        align: "left", valign: "top", margin: 0,
      });
      this.s.addShape(this.S.line, {
        x, y: Y.blocks + 1.05, w: W - 0.30, h: 0,
        line: { color: C.hairline, width: 0.5 },
      });
      this.s.addText(dashRuns(col.items), {
        x, y: Y.blocks + 1.17, w: W - 0.10, h: 1.60,
        align: "left", valign: "top", margin: 0,
      });
    });
    return this;
  }

  // KPI 3연. tone은 방향을 따른다. up / down / neutral.
  kpiRow(tiles) {
    const W = 4.06;
    const TONE = { up: C.positive, down: C.negative, neutral: C.brandOrange };
    tiles.slice(0, 3).forEach((t, i) => {
      const x = FRAME.x + i * (W + 0.20);
      const y = Y.kpiRow;
      this.s.addShape(this.S.rect, {
        x, y, w: W, h: 1.50,
        fill: { color: C.canvas }, line: { color: C.hairline, width: 0.75 },
      });
      this.s.addText(t.label, {
        x: x + 0.22, y: y + 0.16, w: W - 0.44, h: 0.28,
        fontFace: F, fontSize: 12, bold: true, color: C.body, align: "left", margin: 0,
      });
      this.s.addText([
        { text: t.value, options: { fontFace: F, fontSize: 44, bold: true, color: C.ink } },
        { text: "  " + t.unit, options: { fontFace: F, fontSize: 16, bold: true, color: C.body } },
      ], { x: x + 0.22, y: y + 0.44, w: W - 0.44, h: 0.62, align: "left", valign: "middle", margin: 0 });
      if (t.delta) {
        this.s.addText(t.delta, {
          x: x + 0.22, y: y + 1.12, w: W - 0.44, h: 0.26,
          fontFace: F, fontSize: 11, bold: true,
          color: TONE[t.tone] || C.brandOrange, align: "left", margin: 0,
        });
      }
    });
    this.hasKpi = true;
    return this;
  }

  // 데이터 표. 바깥 테두리 hairline, 안쪽 행 구분선 hairline-soft, 행 높이 0.42".
  // 강조 열은 **글자색**으로만 표시한다. 헤더 배경까지 오렌지로 채우면
  // 표 절반이 시그니처 오렌지가 되어 페이지의 오렌지 예산을 통째로 삼킨다.
  table({ header, rows, colW, emphasis, align }) {
    const y = this.hasKpi ? Y.tableAfterKpi : Y.blocks;
    const N = header.length;
    const outer = { type: "solid", pt: 0.5, color: C.hairline };
    const soft = { type: "solid", pt: 0.5, color: C.hairlineSoft };
    // 강조 열 안에서는 회색 구분선이 보이지 않는다. wash(255,231,220) 위에서
    // hairline-soft는 차이가 (16,9,22), hairline은 (23,2,16)로 둘 다 사실상 무의미하다.
    // 팔레트 안에서 실제로 보이는 것은 canvas(흰색)뿐이다. 차이 (0,24,35).
    const washRule = { type: "solid", pt: 1, color: C.canvas };
    const total = rows.length + 1;
    const edge = (r, c) => {
      const inner = c === emphasis ? washRule : soft;
      return [
        r === 0 ? outer : inner,
        c === N - 1 ? outer : inner,
        r === total - 1 ? outer : inner,
        c === 0 ? outer : inner,
      ];
    };
    // 열마다 정렬을 정하고, 헤더는 자기 열의 본문 정렬을 따른다.
    // 기본값은 라벨 열 왼쪽, 나머지 가운데. 문장형 열은 호출부가 left를 넘긴다.
    const at = (c) => (align && align[c]) || (c === 0 ? "left" : "center");

    const table = [header.map((txt, c) => ({
      text: txt,
      options: {
        fontFace: F, fontSize: 12, bold: true, align: at(c), valign: "middle",
        fill: { color: C.wash },
        color: c === emphasis ? C.brandOrange : C.ink,
        border: edge(0, c),
      },
    }))];
    rows.forEach((row, r) => table.push(row.map((txt, c) => ({
      text: txt,
      options: {
        fontFace: F, fontSize: 12, align: at(c), valign: "middle",
        bold: c === 0 || c === emphasis,
        color: c === 0 || c === emphasis ? C.ink : C.body,
        fill: { color: c === emphasis ? C.wash : C.canvas },
        border: edge(r + 1, c),
      },
    }))));
    this.s.addTable(table, {
      x: FRAME.x, y, w: FRAME.w, colW, rowH: 0.42,
      margin: [2, 7, 2, 7],   // 좌우 0.10"
    });
    return this;
  }

  // 히어로 스탯. 숫자 하나가 슬라이드를 지탱한다.
  heroStat({ value, unit, headline, notes }) {
    this.s.addText([
      { text: value, options: { fontFace: F, fontSize: 88, bold: true, color: C.ink, charSpacing: -1.5 } },
      { text: "  " + unit, options: { fontFace: F, fontSize: 36, bold: true, color: C.body } },
    ], {
      x: FRAME.x, y: Y.heroNumeral, w: FRAME.w, h: 1.40,
      align: "center", valign: "middle", lineSpacingMultiple: 1.0, margin: 0,
    });
    this.s.addText(headline, {
      x: FRAME.x, y: Y.heroHeadline, w: FRAME.w, h: 0.34,
      fontFace: F, fontSize: 14, bold: true, color: C.ink,
      align: "center", valign: "middle", margin: 0,
    });
    if (notes && notes.length) {
      this.s.addText(dashRuns(notes), {
        x: 3.17, y: Y.heroNotes, w: 7.00, h: 0.80,
        align: "center", valign: "top", margin: 0,
      });
    }
    return this;
  }

  // 핵심 정리. 항목 높이 0.90" + 간격 0.10".
  // 번호는 40pt, 제목은 14pt라 어센더 높이가 다르다. 같은 y에 두면 번호가
  // 0.12" 낮게 앉는다(300dpi 실측). 그만큼 올려야 글리프 상단이 맞는다.
  takeaways(items) {
    let y = Y.takeaways;
    items.forEach(([head, bodyText], i) => {
      this.s.addText(String(i + 1).padStart(2, "0"), {
        x: FRAME.x, y: y - 0.12, w: 0.95, h: 0.60,
        fontFace: F, fontSize: 40, bold: true, color: C.brandOrange,
        align: "right", valign: "top", margin: 0,
      });
      this.s.addText(head, {
        x: 1.45, y, w: 11.53, h: 0.32,
        fontFace: F, fontSize: 14, bold: true, color: C.ink,
        align: "left", valign: "top", margin: 0,
      });
      this.s.addText(bodyText, {
        x: 1.45, y: y + 0.26, w: 11.53, h: 0.55,
        fontFace: F, fontSize: 14, color: C.body,
        align: "left", valign: "top", lineSpacingMultiple: 1.3, margin: 0,
      });
      y += 1.00;
    });
    return this;
  }

  // 출처 캡션. y를 받지 않는다. 자리가 없으면 캡션을 옮길 게 아니라
  // 콘텐츠를 줄인다. 외부 기록이 있을 때만 부른다. `자체 분석`은 쓰지 않는다.
  source(text) {
    if (/자체\s*분석/.test(text)) {
      throw new Error("`자체 분석`은 출처로 쓰지 않는다. 외부 출처가 없으면 캡션을 생략한다.");
    }
    this.s.addText(text, {
      x: FRAME.x, y: SOURCE.y, w: SOURCE.w, h: 0.25,
      fontFace: F, fontSize: 11, color: C.muted, align: "left", margin: 0,
    });
    return this;
  }
}

function dashRuns(items) {
  return items.map((t) => ({
    text: "- " + t,
    options: {
      fontFace: F, fontSize: 13, color: C.body,
      breakLine: true, paraSpaceAfter: 4, lineSpacingMultiple: 1.3,
    },
  }));
}

// ── 자료 ────────────────────────────────────────────────────────────────
const CONFIDENTIAL =
  "Confidential and proprietary Any use of this material without\n" +
  "specific permission of Hecto is strictly prohibited";

class Presentation {
  constructor({ assetsDir } = {}) {
    this.assets = assetsDir || path.join(__dirname, "..", "assets");
    this.p = new pptxgen();
    this.p.defineLayout({ name: "HECTO", width: CANVAS.w, height: CANVAS.h });
    this.p.layout = "HECTO";
    this.S = this.p.ShapeType;   // 생성자 정적 속성이 아니라 인스턴스 속성이다
    this.pageNo = 0;
    this.closed = false;
  }

  _blank() {
    if (this.closed) throw new Error("E.O.D. 이후에는 슬라이드를 추가할 수 없다");
    const s = this.p.addSlide();
    s.background = { color: C.canvas };
    return s;
  }

  _pageNumber(slide) {
    this.pageNo += 1;
    slide.addText(String(this.pageNo), {
      x: PAGENUM.x, y: PAGENUM.y, w: PAGENUM.w, h: PAGENUM.h,
      fontFace: F, fontSize: 10, color: C.stone, align: "right", margin: 0,
    });
  }

  // 커버. 컨피덴셜 블록은 verbatim이라 인자로 받지 않는다.
  cover({ titleEn, subtitleKo, date, author, year }) {
    const s = this._blank();
    s.addImage({ path: assetPath(this.assets, "logo-orange-on-white.png"), x: 0.45, y: 0.30, w: 5.53, h: 2.00 });
    s.addText(titleEn, {
      x: 6.67, y: 0.40, w: 6.40, h: 1.80,
      fontFace: F, fontSize: 36, bold: true, color: C.ink,
      align: "left", valign: "top", charSpacing: -1, lineSpacingMultiple: 1.1, margin: 0,
    });
    s.addText(subtitleKo, {
      x: 6.67, y: 2.20, w: 6.40, h: 0.40,
      fontFace: F, fontSize: 18, bold: true, color: C.ink, align: "left", margin: 0,
    });
    s.addText(date, { x: 6.67, y: 3.10, w: 6.40, h: 0.24, fontFace: F, fontSize: 11, color: C.ink, align: "left", margin: 0 });
    s.addText(author, { x: 6.67, y: 3.34, w: 6.40, h: 0.24, fontFace: F, fontSize: 11, color: C.ink, align: "left", margin: 0 });
    s.addText(CONFIDENTIAL, {
      x: 6.67, y: 6.80, w: 5.50, h: 0.5,
      fontFace: F, fontSize: 10, color: C.ink, align: "left", lineSpacingMultiple: 1.25, margin: 0,
    });
    s.addText(`©${year} Hecto`, {
      x: 11.50, y: 6.97, w: 1.48, h: 0.24,
      fontFace: F, fontSize: 10, color: C.ink, align: "right", margin: 0,
    });
    this.pageNo = 1;   // 커버는 번호를 찍지 않지만 1페이지로 센다
    return this;
  }

  // 목차. 이 시스템에서 유일하게 워드마크를 달지 않는 레이아웃.
  toc(columns) {
    const s = this._blank();
    s.addText("CONTENTS", {
      x: 0.55, y: 0.50, w: 8.00, h: 1.00,
      fontFace: F, fontSize: 60, bold: true, color: C.ink,
      align: "left", valign: "middle", charSpacing: -1, margin: 0,
    });
    const W = 2.94, GAP = 0.27;
    columns.slice(0, 4).forEach((col, i) => {
      const x = FRAME.x + i * (W + GAP);
      s.addText(col.head, {
        x, y: 4.20, w: W, h: 0.95,
        fontFace: F, fontSize: 24, bold: true, color: C.ink,
        align: "left", valign: "top", charSpacing: -0.5, lineSpacingMultiple: 1.15, margin: 0,
      });
      s.addShape(this.S.line, {
        x, y: 5.25, w: W - 0.30, h: 0, line: { color: C.ink, width: 0.75 },
      });
      s.addText(col.items.map((t) => ({
        text: "·  " + t,
        options: { fontFace: F, fontSize: 12, color: C.body, breakLine: true, lineSpacingMultiple: 1.35 },
      })), { x, y: 5.40, w: W, h: 1.00, align: "left", valign: "top", margin: 0 });
    });
    this._pageNumber(s);
    return this;
  }

  // 섹션 디바이더. 원은 y 0.40~6.90, 중심 3.65. 세 요소를 그 중심에 맞춰 쌓는다.
  // 영문 제목은 한 줄 10자를 넘기지 않는다. 넘기면 원 안에서 줄바꿈이 깨진다.
  sectionDivider({ num, titleEn, descKo }) {
    titleEn.split("\n").forEach((line) => {
      if (line.length > 10) {
        throw new Error(`섹션 디바이더 영문 제목이 한 줄 10자를 넘는다: "${line}"`);
      }
    });
    const s = this._blank();
    s.addShape(this.S.ellipse, {
      x: 3.42, y: 0.40, w: 6.50, h: 6.50,
      fill: { color: C.brandOrange }, line: { type: "none" },
    });
    s.addText(num, {
      x: 3.42, y: 1.80, w: 6.50, h: 1.00,
      fontFace: F, fontSize: 72, bold: true, color: C.ink,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(titleEn, {
      x: 3.42, y: 2.85, w: 6.50, h: 1.90,
      fontFace: F, fontSize: 60, bold: true, color: C.ink,
      align: "center", valign: "middle", charSpacing: -1.5, lineSpacingMultiple: 1.05, margin: 0,
    });
    s.addText(descKo, {
      x: 3.42, y: 5.00, w: 6.50, h: 0.40,
      fontFace: F, fontSize: 16, bold: true, color: C.ink,
      align: "center", valign: "middle", margin: 0,
    });
    this._pageNumber(s);
    return this;
  }

  // 표준 크롬을 얹은 콘텐츠 슬라이드. 반환된 객체에 체인으로 내용을 쌓는다.
  content({ pill, context, title, subtitle }) {
    const s = this._blank();
    // z-order: context-bar → chevron-white → chapter-pill → chevron-orange → 텍스트/워드마크
    s.addShape(this.S.rect, { x: 2.95, y: 0.25, w: 10.03, h: 0.59, fill: { color: C.contextBar }, line: { type: "none" } });
    s.addShape(this.S.flowChartDelay, { x: 2.95, y: 0.25, w: 0.34, h: 0.59, fill: { color: C.canvas }, line: { type: "none" } });
    s.addShape(this.S.rect, { x: 0.40, y: 0.25, w: 2.30, h: 0.59, fill: { color: C.brandOrange }, line: { type: "none" } });
    s.addShape(this.S.flowChartDelay, { x: 2.68, y: 0.25, w: 0.43, h: 0.59, fill: { color: C.brandOrange }, line: { type: "none" } });
    s.addText(pill, { x: 0.54, y: 0.25, w: 2.16, h: 0.59, fontFace: F, fontSize: 18, bold: true, color: C.canvas, align: "left", valign: "middle", margin: 0 });
    s.addText(context, { x: 3.43, y: 0.25, w: 8.30, h: 0.59, fontFace: F, fontSize: 18, bold: true, color: C.ink, align: "left", valign: "middle", margin: 0 });
    s.addImage({ path: assetPath(this.assets, "logo-orange-on-gray.png"), ...WORDMARK });

    s.addText(title, { x: FRAME.x, y: 1.00, w: FRAME.w, h: 0.34, fontFace: F, fontSize: 16, bold: true, color: C.ink, align: "left", valign: "middle", margin: 0 });
    s.addText("- " + subtitle, { x: FRAME.x, y: 1.36, w: FRAME.w, h: 0.30, fontFace: F, fontSize: 14, color: C.ink, align: "left", valign: "middle", margin: 0 });
    s.addShape(this.S.line, { x: FRAME.x, y: 1.74, w: FRAME.w, h: 0, line: { color: C.body, width: 0.75 } });

    this._pageNumber(s);
    return new ContentSlide(this, s);
  }

  // 모든 자료는 이걸로 닫는다. 셰브론도 페이지 번호도 출처도 없다. 여백이 메시지다.
  // 워드마크는 헤더 크기 컨테이너에 들어가므로 -sm 변형을 쓴다. 커버용을 넣으면 눌린다.
  end({ mark = "E. O. D." } = {}) {
    const s = this._blank();
    s.addImage({ path: assetPath(this.assets, "logo-orange-on-white-sm.png"), ...WORDMARK });
    s.addText(mark, {
      x: FRAME.x, y: 3.00, w: 6.00, h: 1.20,
      fontFace: F, fontSize: mark === "E. O. D." ? 72 : 88, bold: true, color: C.ink,
      align: "left", valign: "middle", charSpacing: -1.5, margin: 0,
    });
    this.closed = true;
    return this;
  }

  async write(file) {
    if (!this.closed) {
      throw new Error("자료가 slide-end로 닫히지 않았다. pptx.end()를 부를 것.");
    }
    await this.p.writeFile({ fileName: file });
    return file;
  }
}

module.exports = { Presentation, COLORS: C, FONT: F };
