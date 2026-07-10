# 작업 일지

새 작업을 마칠 때마다 맨 위에 기록이 추가됩니다. (`/save-work` 실행 시 자동 기록)

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
