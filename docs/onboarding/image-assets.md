# 온보딩 자료 이미지 에셋 목록

PPT와 튜토리얼 영상에 필요한 이미지를 정리한 문서입니다.
**A. 제작 완료(12종)** 는 `docs/onboarding/assets/` 에 포함되어 있고, **B. 실촬영 필요(10종)** 는 촬영 가이드와 함께 아래에 정리했습니다.

## A. 제작 완료 — 목업·다이어그램 (assets/ 폴더)

터미널 목업은 실제 UI를 본뜬 **연출 이미지**입니다 (개인정보 걱정 없이 배포 가능).

| # | 파일 | 종류 | 내용 | 사용처 |
|---|---|---|---|---|
| 1 | `cover-terminal.png` | 터미널 목업 | claude 실행 직후 웰컴 화면 + 첫 요청 입력 | PPT 표지 · EP1 썸네일 배경 |
| 2 | `term-install.png` | 터미널 목업 | npm 설치 → claude 실행 → 로그인 완료 흐름 | PPT 6 · EP1 |
| 3 | `term-codebase-question.png` | 터미널 목업 | "프로젝트 구조 설명해줘" 질문과 응답 (Read/Glob 도구 사용 표시) | PPT 11 · EP2 |
| 4 | `term-diff-approval.png` | 터미널 목업 | 파일 수정 diff + Yes/No 승인 프롬프트 | PPT 9 · EP1 · EP3 |
| 5 | `term-slash-commands.png` | 터미널 목업 | `/` 입력 시 뜨는 슬래시 커맨드 자동완성 메뉴 | PPT 13 · EP1 |
| 6 | `term-plan-mode.png` | 터미널 목업 | Plan Mode에서 계획 제시 + 진행 확인 프롬프트 | PPT 19 · EP3 |
| 7 | `diagram-agent-vs-autocomplete.png` | 다이어그램 | 자동완성 vs 에이전트 비교 (계획→탐색→수정→검증→커밋) | PPT 4 · EP1 인트로 |
| 8 | `diagram-levels-roadmap.png` | 다이어그램 | Level 1·2·3 학습 로드맵 계단형 카드 | PPT 2 · 전 영상 인트로 |
| 9 | `diagram-claude-md.png` | 다이어그램 | CLAUDE.md 내용 예시 + 자동 로드 + 3계층 구조 | PPT 18 · EP2 |
| 10 | `diagram-git-workflow.png` | 다이어그램 | 한 문장 요청 → 브랜치→수정→검증→커밋→PR 흐름 | PPT 21 · EP4 |
| 11 | `diagram-mcp.png` | 다이어그램 | Claude Code 허브 + Slack/Notion/GitHub/DB/Figma/API 연결 | PPT 29 · EP7 |
| 12 | `diagram-ecosystem.png` | 다이어그램 | CLI · IDE · 웹/모바일 · GitHub Actions 4개 환경 | PPT 31 · EP8 |

재생성 방법: 스크립트는 세션 스크래치패드의 `gen-images.js` (Playwright + Chromium). 내용 수정 후 다시 실행하면 됩니다.

## B. 실촬영 필요 — 실제 화면·녹화

| # | 파일(안) | 종류 | 내용 | 사용처 |
|---|---|---|---|---|
| 13 | `demo1-backup.gif` | 화면 녹화 | 라이브 데모 ① 전체 (구조 질문 → 결과 표시 기능 추가 → 브라우저 확인) | PPT 15 백업 · EP1/EP5 본편 |
| 14 | `demo2-backup.gif` | 화면 녹화 | 라이브 데모 ② 전체 (Plan Mode → 중복 방지 구현 → PR 생성) | PPT 24 백업 · EP4 본편 |
| 15 | `real-init-claude-md.png` | 스크린샷 | `/init` 실행 후 실제 생성된 CLAUDE.md 파일 | EP2 |
| 16 | `real-rewind-menu.png` | 스크린샷 | Esc Esc 눌렀을 때 나오는 체크포인트 목록 실화면 | EP3 |
| 17 | `real-pr-page.png` | 스크린샷 | Claude가 생성한 실제 GitHub PR (제목·설명 포함) | PPT 21 보강 · EP4 |
| 18 | `real-ide-extension.png` | 스크린샷 | VS Code 확장에서 diff 나란히 보는 화면 | EP8 |
| 19 | `real-web-session.png` | 스크린샷 | claude.ai/code 클라우드 세션 실행 화면 | EP8 |
| 20 | `real-gh-mention.png` | 스크린샷 | PR 코멘트에서 @claude 멘션 → 자동 응답 커밋 | EP8 |
| 21 | `real-mcp-add.gif` | 화면 녹화 | `claude mcp add`로 서버 등록 → 도구 사용되는 순간 | EP7 |
| 22 | `thumb-ep1~ep8.png` | 썸네일 8종 | 각 에피소드 유튜브 썸네일 (터미널 목업 배경 + 큰 한글 타이틀) | 영상 업로드용 |

## C. 촬영·녹화 가이드

**터미널 세팅 (모든 녹화 공통)**
- 다크 테마, 폰트 18pt 이상 (모바일 시청 기준), 창 크기 1280×800 고정
- 프롬프트 단순화 (긴 경로·git 브랜치 표시 제거), 알림 끄기
- 예제 프로젝트는 `class-picker` 로 통일 — PPT 목업과 같은 시나리오 유지

**개인정보 마스킹 체크리스트**
- 로그인 이메일 → 데모 계정 사용 또는 후편집 블러
- `.env`·API 키·토큰이 화면에 뜨지 않는지 리허설로 확인
- GitHub 스크린샷은 데모용 저장소에서 촬영

**도구 추천**
- 화면 녹화: OBS Studio (1080p/60fps) 또는 macOS 내장 녹화
- 터미널만 가볍게: asciinema → agg 로 GIF 변환
- GIF 최적화: gifski (데모 백업 GIF는 15fps면 충분)

**연출 팁**
- 타이핑은 실제로 치고, 편집에서 1.5~2배속 (완전 순간이동은 따라하기 어려움)
- Claude 응답 대기 구간은 4배속 + "생각 중" 자막
- 승인 프롬프트에서는 배속 없이 2초 멈춤 — 시청자가 선택지를 읽을 시간
