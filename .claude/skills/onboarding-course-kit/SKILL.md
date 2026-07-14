---
name: onboarding-course-kit
description: "어떤 도구·수업을 처음 쓰는 사람에게 가르치는 온보딩 자료 세트(PRD → 커리큘럼 → PPT+발표자노트 → 웹 미리보기 → 이미지·다이어그램 → 썸네일 → 데모 GIF·영상 → 튜토리얼 대본)를 처음부터 끝까지 만들 때 사용하는 총괄 워크플로. \"온보딩 자료 만들어줘\", \"OO 사용법 PPT랑 튜토리얼 영상 만들어줘\", \"교육 자료 제작\" 같은 요청에서 이 스킬로 전체 순서를 잡는다."
---

# 온보딩 자료 제작 총괄 워크플로

"처음 쓰는 사람에게 도구/수업을 가르치는 자료 한 세트"를 만드는 전체 과정을 정의한다.
이 스킬은 **오케스트레이터**다 — 각 결과물의 실제 제작법은 `class-deliverables`,
실촬영 이미지 수집은 `drive-images` 스킬을 호출해 수행한다.

산출물은 모두 `docs/onboarding/` 아래에 두고, 작업 브랜치에 커밋 후 승인된 흐름이면 main까지 머지한다.

## 스킬 3계층

| 계층 | 스킬 | 역할 |
|---|---|---|
| 총괄 | **onboarding-course-kit** (이 문서) | 요청 → 완성까지의 순서·판단 기준 |
| 제작 | `class-deliverables` | PPT·GIF·영상·썸네일·미리보기 실제 빌드 방법 |
| 수집 | `drive-images` | Google Drive에서 실촬영 스크린샷 검색·다운로드 |

## 표준 순서

### 0. 스코프 확정
- 대상(입문/현업/비개발), 배포 채널(사내/공개), 예제 프로젝트를 먼저 정한다.
- 결정이 필요하면 AskUserQuestion. 애매하면 합리적 기본값으로 진행하고 명시.

### 1. PRD (`docs/onboarding/<주제>-prd.md`)
- 배경·목표·대상·기능 범위(기초/중급/고급 3단계 커리큘럼)·산출물·성공지표·일정·리스크·열린 질문.
- 이 PRD가 이후 모든 산출물의 목차이자 단일 출처가 된다.

### 2. 이미지 확보
- **먼저 `drive-images`** 로 실제 수업/실습 스크린샷이 있는지 확인·수집 (실물 우선).
- 없는 개념도·터미널 목업은 `class-deliverables` 의 `gen-images.js` 로 생성.
- 받은 이미지는 PIL로 무결성 검증, 개인정보(계정·이메일·실명) 점검.

### 3. PPT + 발표자 노트
- `class-deliverables` 의 `build_ppt.py` → `add_notes.py` 순으로 빌드.
- 슬라이드마다 [한 줄 정의 → 화면 → 언제 쓰는지], 데모 슬라이드엔 실제 화면·GIF 삽입.

### 4. 데모 GIF·영상
- `class-deliverables` 의 `record-demos.js` 로 타이핑 애니메이션 녹화 → ffmpeg로 GIF/MP4.
- GIF는 PPT 데모 슬라이드에 삽입(발표 백업, 슬라이드쇼에서 자동 재생).

### 5. 튜토리얼 대본 (`tutorial-scripts.md`)
- 에피소드별 [타임코드 | 촬영 지시 | 내레이션]. PPT와 같은 커리큘럼·같은 예제 사용.
- 각 스크린샷·GIF의 사용처를 `screenshots-map.md` 에 매핑.

### 6. 웹 미리보기 (`preview.html`)
- `class-deliverables` 의 `build_preview.py` 로 PPT 전체를 노트와 함께 브라우저에서 넘겨보는 단일 HTML 생성.

### 7. 정리·전달
- `README.md`(인덱스·남은작업 체크리스트), `image-assets.md`, `screenshots-map.md` 동기화.
- 커밋 → 푸시 → (승인 흐름이면) main 머지. 큰 결과물은 SendUserFile로 채팅 전달, 미리보기는 render로.
- 자리 비운 사용자에겐 완료 시 PushNotification.

## 문서 세트 (docs/onboarding/)

```
<주제>-prd.md              기획
README.md                  인덱스 + 남은 작업
claude-code-onboarding.pptx  PPT(발표자 노트 포함)
preview.html               웹 미리보기
tutorial-scripts.md        영상 대본 EP1~N
image-assets.md            생성 이미지 목록
screenshots-map.md         실촬영 ↔ 자료 매핑
assets/                    생성 이미지·썸네일·데모 GIF·영상
assets/screenshots/        실촬영 스크린샷
tools/                     모든 제작 스크립트 (재실행으로 갱신)
```

## 품질 게이트 (매번 확인)

1. **시각 검증** — PPT는 soffice→PDF→이미지로 대표 슬라이드 Read 확인. GIF/영상은 프레임 추출 확인.
2. **개수 동기화** — 슬라이드 수 = add_notes NOTES 수 = preview TITLES/NOTES 수.
3. **이미지 무결성** — 외부 이미지는 PIL `Image.open().load()` 전량 검증 (헤더 확인만으론 부족).
4. **개인정보** — 계정·이메일·실명·2FA·토큰 노출 점검, 공개 배포 시 마스킹.
5. **일관성** — PPT·영상·데모가 같은 커리큘럼과 같은 예제 프로젝트를 공유.
6. **기록** — 커밋 메시지에 무엇을 어디에 반영했는지 남김.

## 재현 메모 (이 저장소에서 실제로 만든 결과물)

클로드 코드 온보딩: PRD 1 + PPT 38장(발표자 노트·캡처·데모 GIF 포함) + 데모 영상 54초 +
백업 GIF 2 + 생성 이미지 20 + 실촬영 32 + 대본 EP1~8 + 웹 미리보기. 전 과정이 위 순서를 따랐다.
