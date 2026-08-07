# 헥토 슬라이드 덱 스킬

Claude가 헥토 브랜드 규격에 맞는 16:9 PPTX 덱을 만들도록 하는 스킬이다. 좌표와 색은
헬퍼가 고정하고, 생성 결과는 검증 스크립트가 판정한다.

**이 저장소는 생성물이다.** 원본은 사내 `hecto_ppt` 개발 저장소이고, 거기서
`python scripts/release.py`를 돌려 만든 결과를 여기에 올린다. 여기 파일을 직접
고치지 말 것.

## 설치

### Claude Code

```
/plugin marketplace add hectoai/hecto-ppt
/plugin install hecto-ppt@hectoai
```

설치 후 `/reload-plugins`를 실행하라고 나오면 그렇게 한다. 갱신은 `/plugin marketplace update`.

### Claude Desktop (Cowork)

**Customize > Plugins > Personal > "+" > Add marketplace**에 아래 주소를 넣는다.

```
https://github.com/hectoai/hecto-ppt
```

그다음 목록에서 `hecto-ppt`을 설치한다.

### Claude Desktop (zip)

Cowork를 쓰지 않거나 위 경로가 막히면 zip으로 올린다.

1. **Settings > Capabilities**에서 코드 실행을 켠다. 꺼져 있으면 스킬 메뉴가 아예 안 보인다
2. **Customize > Skills > "+" > Upload a skill**
3. `hecto-ppt.zip`을 올린다

zip은 개발 저장소의 `dist/hecto-ppt.zip`에 있다.

## 쓰는 법

설치하고 나면 "헥토 스타일로 PPT 만들어줘"처럼 말하면 된다. 스킬이 알아서 뜬다.

상시 비용은 약 195토큰이고, 스킬이 실제로 뜰 때만 2.4k가 추가로 든다. 좌표 스펙은
필요할 때만 읽으므로 대화 시작부터 들고 있지 않는다.

## 담긴 것

| 경로 | 내용 |
|---|---|
| `SKILL.md` | 레이아웃 선택 규칙과 절대 규칙 |
| `references/` | 토큰·컴포넌트·레이아웃·관례 상세 |
| `lib/hecto.js` | 좌표를 고정하는 헬퍼. 호출부가 좌표를 넘길 수 없다 |
| `scripts/verify_deck.py` | 규칙 11개 판정기. 통과 못 하면 배포하지 않는다 |
| `assets/` | 워드마크 PNG 3종 (배경색 × 컨테이너 조합당 하나) |
| `fonts/` | Pretendard Regular · Bold. 시스템에 설치해야 렌더가 맞는다 |

## 버전

0.3.1
