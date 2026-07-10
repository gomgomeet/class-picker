# 작업 일지

새 작업을 마칠 때마다 맨 위에 기록이 추가됩니다. (`/save-work` 실행 시 자동 기록)

## 2026-07-10 (금) — 이후 작업 (두 세션 통합)

> 같은 날 두 개의 세션에서 각각 작업한 내용이 합쳐졌습니다.

### 오늘 한 일
- **에이전트 10종 추가**
  - `error-doctor`: 에러 메시지를 쉬운 한국어로 진단하고 수리
  - `app-tester`: 실제 브라우저로 앱을 열어 기능 검사 (스크린샷 보고)
  - `ui-designer`: 학생 눈높이에 맞는 화면 디자인 개선
  - `deploy-helper`: GitHub Pages 배포로 학생용 접속 주소 생성
  - `time-machine`: git 기록에서 예전 버전을 찾아 안전하게 복구
  - `feature-planner`: 기능 아이디어를 PRD(요구사항 문서)로 정리 (docs/prd-*.md)
  - `privacy-checker`: 학생 개인정보 노출 위험 점검 (읽기 전용)
  - `bug-hunter`: 버그를 찾아 보고하고 작은 버그는 직접 수리
  - `perf-doctor`: 로딩이 느린 원인 진단 (진단만, 수정 안 함)
  - `permission-setup`: 다른 프로젝트에 안전한 명령 허용 목록을 설정
- **설치 스크립트 2종** — 에이전트를 컴퓨터 전체(~/.claude)에 설치해 모든 프로젝트에서 사용 가능하게 함
  - Windows(PowerShell): powershell -ExecutionPolicy Bypass -File setup-agents.ps1
  - Mac/Linux/Git Bash: bash install-agents.sh
- PowerShell 읽기 전용 명령 허용 목록 추가 (허용 확인 창 줄이기)

### 다음에 할 일
- 학교/집 컴퓨터에서 git pull 후 설치 스크립트 실행 (Windows는 setup-agents.ps1)
- (학교에서) 예전 대화에서 튜토리얼/PPT 작업물 복구 후 즉시 "저장해줘" 실행
- 사라진 튜토리얼(tutorial.md)과 발표 자료(slides.md) 다시 작성하기

## 2026-07-10 (금)

### 오늘 한 일
- 작업 자동 백업 시스템 구축
  - `/save-work` 스킬: 작업 기록(PROGRESS.md) + 커밋 + 푸시를 한 번에 실행
  - 세션 종료 시 커밋 안 된 작업을 자동으로 커밋 & 푸시하는 안전망(hook) 추가
  - 튜토리얼 작가(`tutorial-writer`), 코드 설명(`code-explainer`) 에이전트 추가
  - 자주 쓰는 git 명령은 허락 없이 자동 실행되도록 권한 설정

### 변경된 파일
- `.claude/settings.json`, `.claude/hooks/auto-backup.sh`
- `.claude/skills/save-work/SKILL.md`
- `.claude/agents/tutorial-writer.md`, `.claude/agents/code-explainer.md`
- `CLAUDE.md`, `PROGRESS.md`

### 다음에 할 일
- 학교 컴퓨터에서 이 브랜치를 받아서(`git pull`) 동일한 환경 만들기
- 사라진 튜토리얼(`tutorial.md`)과 발표 자료(`slides.md`) 다시 작성하기
