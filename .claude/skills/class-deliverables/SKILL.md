---
name: class-deliverables
description: 수업·튜토리얼 과정을 결과물(PPT, 발표자 노트, 웹 미리보기, 이미지·다이어그램, 썸네일, 데모 GIF, 데모 영상 MP4)로 제작할 때 사용. "PPT 만들어줘", "데모 영상/GIF 만들어줘", "썸네일 만들어줘", "미리보기 페이지", "슬라이드 다시 빌드" 등 온보딩·교육 자료 제작 요청 전반에 적용.
---

# 수업 결과물 제작 파이프라인 스킬

수업 시나리오를 일관된 다크 테마(배경 #17171B, 코랄 #D97757)의 결과물 세트로 만든다.
모든 제작 스크립트는 **`docs/onboarding/tools/`** 에 있으며, 수정 후 재실행하면 결과물이 갱신된다.

## 사전 준비 (컨테이너가 새로 시작된 경우 1회)

```bash
apt-get install -y fonts-noto-cjk          # 한글 폰트 (이미지·영상 렌더링 필수)
pip install python-pptx pillow             # PPT 빌드
apt-get install -y libreoffice-impress poppler-utils ffmpeg   # 미리보기 렌더·영상 변환
```
- Chromium: `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (playwright는 NODE_PATH=/opt/node22/lib/node_modules 로 사용)
- 실촬영 스크린샷이 필요하면 먼저 `drive-images` 스킬로 Google Drive에서 수집

## 결과물별 제작법

### 1. 터미널 목업·다이어그램 (`tools/gen-images.js`)
- IMAGES 배열에 항목 추가/수정 → `NODE_PATH=/opt/node22/lib/node_modules node tools/gen-images.js`
- 출력: `assets/*.png`. 터미널 목업은 `term()` 헬퍼, 다이어그램은 DIAG_CSS 카드 스타일 사용.

### 2. 유튜브 썸네일 (`tools/gen-thumbs.js`)
- EPISODES 배열(제목·부제·배지·명령어) 수정 후 실행 → `assets/thumb-ep*.png` (1280×720)

### 3. 데모 GIF + 데모 영상 (`tools/record-demos.js`)
- DEMO1/DEMO2 = 스크립트 배열. 이벤트 형식:
  - `{u:'사용자 입력'}` 타이핑 애니메이션, `{l:'<html>', d:지연ms}` 응답 줄, `{p:ms}` 멈춤
- 실행하면 스크래치패드 `video/` 에 `demo*.webm` + 타이틀 카드 PNG 생성.
- 변환(ffmpeg):
  ```bash
  # GIF (PPT 백업용): 팔레트 2패스, 12fps, 폭 880
  ffmpeg -y -i demo1.webm -vf "fps=12,scale=880:-1:flags=lanczos,palettegen" pal.png
  ffmpeg -y -i demo1.webm -i pal.png -lavfi "fps=12,scale=880:-1:flags=lanczos[x];[x][1:v]paletteuse" demo1.gif
  # 영상: 카드 PNG → 2.2초 mp4 조각, 데모 webm → mp4, concat
  ffmpeg -y -loop 1 -i card.png -t 2.2 -vf "scale=1280:800,fps=25,format=yuv420p" -c:v libx264 card.mp4
  ffmpeg -y -f concat -safe 0 -i list.txt -c copy demo-video.mp4
  ```
- 저장: `assets/demo1-backup.gif`, `assets/demo2-backup.gif`, `assets/demo-video.mp4`
- 주의: playwright 내장 ffmpeg는 필터가 없으니 시스템 ffmpeg 설치 필수.

### 4. PPT (`tools/build_ppt.py` → `tools/add_notes.py`)
- 슬라이드 추가/수정 후 build_ppt.py 실행 → `claude-code-onboarding.pptx`
- **반드시 add_notes.py의 NOTES 개수를 슬라이드 수와 맞춘 뒤 이어서 실행** (발표자 노트 주입)
- 한글 폰트는 `_ea()` 헬퍼로 East-Asian 폰트 설정 유지

### 5. 웹 미리보기 (`tools/build_preview.py`)
- PPT 변경 시: pptx → PDF(soffice) → JPEG(pdftoppm) → build_preview.py 순서
  ```bash
  HOME=/tmp soffice -env:UserInstallation=file:///tmp/lo-profile --headless --convert-to pdf deck.pptx
  pdftoppm -jpeg -jpegopt quality=82 -r 96 deck.pdf slides/s
  ```
- TITLES/NOTES/SECTIONS 개수를 슬라이드 수와 동기화할 것 → `preview.html`

## 품질·마무리 규칙

1. **시각 검증**: PPT는 soffice로 PDF 변환 후 대표 슬라이드 2~3장을 Read로 확인. 이미지·GIF도 프레임 추출해 확인.
2. **PNG 무결성**: 외부에서 받은 이미지는 `file` 헤더 확인만으로 부족 — PIL `Image.open().load()` 로 전량 검증.
3. **개인정보**: 계정명·이메일·실명 노출 여부 확인, 발견 시 사용자에게 알리고 마스킹 여부 확인.
4. **문서 동기화**: `image-assets.md`(에셋 목록), `screenshots-map.md`(매핑), `README.md`(체크리스트) 갱신.
5. **커밋·푸시**: 작업 브랜치에 커밋 후 푸시, 사용자가 승인한 흐름이면 main 머지까지. 큰 결과물은 SendUserFile로 채팅에도 전달.
