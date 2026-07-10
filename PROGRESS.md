# 작업 일지

새 작업을 마칠 때마다 맨 위에 기록이 추가됩니다. (`/save-work` 실행 시 자동 기록)

<<<<<<< HEAD
## 2026-07-10 (금) — 4차

### 오늘 한 일
- `install-agents.sh` 추가: 이 저장소의 에이전트/스킬을 컴퓨터 전체(~/.claude)에 설치하는 스크립트
  - 실행하면 그 컴퓨터의 모든 프로젝트에서 에이전트를 사용 가능
  - 실행 방법: `bash install-agents.sh`

### 변경된 파일
- `install-agents.sh`

### 다음에 할 일
- 학교 컴퓨터에서 `git pull` 후 `bash install-agents.sh` 한 번 실행하기
- (학교에서) 예전 대화에서 튜토리얼/PPT 작업물 복구 후 즉시 "저장해줘" 실행

## 2026-07-10 (금) — 3차

### 오늘 한 일
- 코딩 도우미 에이전트 4종 추가
  - `deploy-helper`: GitHub Pages로 배포해서 학생용 접속 주소 만들기
  - `time-machine`: git 기록에서 예전 버전을 찾아 안전하게 복구
  - `feature-planner`: 기능 아이디어를 PRD(요구사항 문서)로 정리 (docs/prd-*.md)
  - `privacy-checker`: 학생 개인정보 노출 위험 점검 (읽기 전용)

### 변경된 파일
- `.claude/agents/deploy-helper.md`, `.claude/agents/time-machine.md`
- `.claude/agents/feature-planner.md`, `.claude/agents/privacy-checker.md`

### 다음에 할 일
- (학교에서) 예전 대화에서 튜토리얼/PPT 작업물 복구 후 즉시 "저장해줘" 실행
- 배포하고 싶어지면 "배포해줘" (deploy-helper)

## 2026-07-10 (금) — 2차

### 오늘 한 일
- 코딩 도우미 에이전트 3종 추가
  - `error-doctor`: 에러 메시지를 쉬운 한국어로 진단하고 고쳐주는 에이전트
  - `app-tester`: 앱을 실제 브라우저로 열어 기능을 검사하고 스크린샷과 함께 보고
  - `ui-designer`: 학생 눈높이에 맞게 화면 디자인을 다듬는 에이전트

### 변경된 파일
- `.claude/agents/error-doctor.md`, `.claude/agents/app-tester.md`, `.claude/agents/ui-designer.md`

### 다음에 할 일
- (학교에서) 예전 대화에서 튜토리얼/PPT 작업물 복구 후 즉시 "저장해줘" 실행
- 사라진 튜토리얼(`tutorial.md`)과 발표 자료(`slides.md`) 작업 이어가기
=======
## 2026-07-10 (금) - 5차

### 오늘 한 일
- 에이전트 설치 스크립트(`setup-agents.ps1`) 추가
  - 새 컴퓨터에서 저장소를 받은 뒤 `powershell -ExecutionPolicy Bypass -File .\setup-agents.ps1` 한 줄만 실행하면, 저장소의 에이전트 5개가 전역 폴더(`~\.claude\agents`)로 자동 복사됨
  - 에이전트가 바뀌면 `git pull` 후 스크립트를 다시 실행해서 갱신

### 변경된 파일
- `setup-agents.ps1` (새 파일)
- `PROGRESS.md`

### 다음에 할 일
- 집/학교 컴퓨터에서 브랜치 받아서 `setup-agents.ps1` 실행해보기
- 사라진 튜토리얼(`tutorial.md`)과 발표 자료(`slides.md`) 다시 작성하기

## 2026-07-10 (금) - 4차

### 오늘 한 일
- 웹앱 문제 해결용 에이전트 2개 추가
  - `perf-doctor` (성능 주치의): 로딩이 느린 원인을 진단하고 처방전 보고서를 작성 (코드 수정은 안 함, 진단만)
  - `bug-hunter` (버그 사냥꾼): 버그를 찾아 보고하고, 원인이 확실한 작은 버그는 직접 고친 뒤 검증까지 수행
- 사용법: 프로젝트에서 "왜 이렇게 느려?" / "버그 찾아줘"라고 말하면 자동으로 해당 에이전트가 동작
- 모든 프로젝트에서 쓰려면 로컬 컴퓨터에서 `~/.claude/agents/`로 복사 필요 (PowerShell: `Copy-Item .claude\agents\*.md ~\.claude\agents\`)

### 변경된 파일
- `.claude/agents/perf-doctor.md` (새 에이전트)
- `.claude/agents/bug-hunter.md` (새 에이전트)
- `PROGRESS.md`

### 다음에 할 일
- 집/학교 컴퓨터에서 `git pull` 후 에이전트 파일들을 `~/.claude/agents/`로 복사하기
- 사라진 튜토리얼(`tutorial.md`)과 발표 자료(`slides.md`) 다시 작성하기

## 2026-07-10 (금) - 3차

### 오늘 한 일
- 권한 설정 도우미 에이전트(`permission-setup`) 추가
  - 아무 프로젝트에서나 "허용 목록 설정해줘"라고 하면 그 프로젝트의 `.claude/settings.json`에 안전한 읽기 전용 명령 허용 목록을 자동으로 추가해줌
  - 안전 목록(읽기 전용 명령)과 금지 목록(위험한 명령)이 내장되어 있어서 실수로 위험한 권한을 열지 않음
- 모든 프로젝트에서 쓰려면: 로컬 컴퓨터에서 이 파일을 `~/.claude/agents/` 폴더로 복사해야 함 (PowerShell: `Copy-Item .claude\agents\permission-setup.md ~\.claude\agents\`)

### 변경된 파일
- `.claude/agents/permission-setup.md` (새 에이전트)
- `PROGRESS.md`

### 다음에 할 일
- 집/학교 컴퓨터에서 `git pull` 후 `permission-setup.md`를 `~/.claude/agents/`로 복사하기
- 사라진 튜토리얼(`tutorial.md`)과 발표 자료(`slides.md`) 다시 작성하기

## 2026-07-10 (금) - 2차

### 오늘 한 일
- 터미널에서 "Do you want to proceed?" 허용 확인 창이 자주 뜨는 문제 해결
  - Windows PowerShell의 읽기 전용 명령어들(Get-ChildItem, Get-Content, Select-String 등)을 프로젝트 허용 목록에 추가
  - 이 설정은 GitHub에 함께 올라가므로 집/학교 어느 컴퓨터에서든 동일하게 적용됨
- 주의: 이 설정은 class-picker 프로젝트 폴더 안에서만 적용됨. 다른 프로젝트(예: reading-challenge-webapp)에도 적용하려면 그 프로젝트의 `.claude/settings.json`이나 전역 설정(`~/.claude/settings.json`)에 같은 내용을 넣어야 함

### 변경된 파일
- `.claude/settings.json` (PowerShell 읽기 전용 명령 허용 목록 추가)
- `PROGRESS.md`

### 다음에 할 일
- 학교 컴퓨터에서 이 브랜치를 받아서(`git pull`) 동일한 환경 만들기
- 사라진 튜토리얼(`tutorial.md`)과 발표 자료(`slides.md`) 다시 작성하기
- 다른 프로젝트에서도 허용 창이 많이 뜨면 그 프로젝트에 같은 설정 복사하기
>>>>>>> origin/main

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
