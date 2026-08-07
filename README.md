# hecto-tools

헥토 사내 Claude 도구 카탈로그. **이 저장소는 생성물이다.** 원본은 `hecto_ppt` 개발
저장소이고, 거기서 `python scripts/build_skill.py`를 돌려 만든 결과를 여기에 올린다.
여기 파일을 직접 고치지 말 것.

## 설치

### Claude Code

```
/plugin marketplace add https://gitlab.hectoai.co.kr/cwlee/hecto-claude-tools.git
/plugin install hecto-ppt@hecto-tools
```

설치 후 `/reload-plugins`를 실행하라고 나오면 그렇게 한다.

갱신은 `/plugin marketplace update`다. 사내 GitLab이 HTTPS만 노출해서 백그라운드 자동
갱신이 간헐적으로 실패할 수 있으니, 스펙이 바뀌었다는 공지를 받으면 수동으로 한 번
돌려주는 편이 확실하다.

### Claude Desktop

1. **Settings > Capabilities**에서 코드 실행을 켠다. 이게 꺼져 있으면 스킬 메뉴 자체가 안 보인다
2. **Customize > Skills**로 간다
3. **"+" > Upload a skill**을 누른다
4. `hecto-ppt.zip`을 올린다

zip은 개발 저장소의 `dist/hecto-ppt.zip`에 있다. 배포 담당자에게 요청하거나 직접 빌드한다.

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

0.2.0
