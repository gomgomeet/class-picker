# 클로드 코드 온보딩 자료

클로드 코드를 처음 사용하는 사람을 위한 온보딩 PPT와 튜토리얼 영상 시리즈 제작 자료입니다.
기획 배경과 요구사항은 [`../claude-code-onboarding-prd.md`](../claude-code-onboarding-prd.md) 를 참고하세요.

## 파일 안내

| 파일 | 설명 |
|---|---|
| [`claude-code-onboarding.pptx`](claude-code-onboarding.pptx) | 온보딩 PPT 37장 (발표자 노트 포함, 16:9 다크 테마) |
| [`preview.html`](preview.html) | PPT 전체를 브라우저에서 넘겨보는 미리보기 (발표자 노트 표시, ← → 키 지원) |
| [`tutorial-scripts.md`](tutorial-scripts.md) | 튜토리얼 영상 EP1~EP8 대본 (타임코드 · 촬영 지시 · 내레이션) |
| [`image-assets.md`](image-assets.md) | 이미지 에셋 목록과 촬영·제작 가이드 |
| [`screenshots-map.md`](screenshots-map.md) | 실촬영 스크린샷 32장 ↔ 자료 매핑표 |
| [`assets/`](assets/) | 제작 이미지 20종 (터미널 목업 6 · 다이어그램 6 · 썸네일 8) |
| [`assets/screenshots/`](assets/screenshots/) | 실제 수업 스크린샷 32장 (Google Drive에서 수집) |

## 커리큘럼 요약

- **Level 1 시작하기** (첫 30분): 설치 · 첫 대화 · 코드베이스 질문 · 파일 수정 · 슬래시 커맨드
- **Level 2 업무에 붙이기** (1~2시간): CLAUDE.md · Plan Mode · 권한 모드 · Git/PR · 이미지 활용
- **Level 3 확장하기** (필요할 때): 커스텀 커맨드·스킬 · 서브에이전트 · MCP · Hooks · 멀티 플랫폼

영상은 EP1~EP5가 필수 코스, EP6~EP8이 선택 코스이며 PPT와 같은 커리큘럼·같은 예제(class-picker)를 사용합니다.

## 데모 영상·GIF

- `assets/demo-video.mp4` — 데모 ①(기능 추가)·②(Plan Mode→PR)를 타이틀 카드와 함께 엮은 54초 영상
- `assets/demo1-backup.gif` / `demo2-backup.gif` — PPT 라이브 데모 실패 대비 백업 GIF
- 제작·수정 방법: `tools/record-demos.js` + `.claude/skills/class-deliverables` 스킬 참조

## 남은 작업

- [x] 실촬영 스크린샷 확보 — 수업 캡처 32장 수집 완료 (`screenshots-map.md`)
- [x] PPT 데모 슬라이드에 실제 앱 화면 반영, 배포 슬라이드 신설 (총 38장)
- [x] 데모 GIF 2종 + 데모 영상 제작 (애니메이션 방식, `tools/record-demos.js`)
- [ ] 영상 EP1~EP8 내레이션 녹음·편집 (촬영 소스는 `screenshots-map.md` 참조)
- [ ] 배포 채널 결정에 따른 표지·리소스 슬라이드 문구 조정 (사내용 vs 공개용)
- [ ] 공개 배포 시 `shot-31/32`(Vercel 계정명) 블러 처리
