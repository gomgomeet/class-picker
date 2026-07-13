---
name: drive-images
description: 온보딩 PPT·튜토리얼 등 자료에 이미지가 필요할 때, 새로 만들기 전에 사용자의 Google Drive 스크린샷 폴더를 먼저 검색해 실촬영 이미지를 내려받아 활용한다. "이미지 찾아줘", "스크린샷 반영해줘", 슬라이드/문서에 그림이 필요한 모든 작업에서 사용.
---

# Google Drive 이미지 검색·활용 스킬

자료(PPT, 튜토리얼, 문서)에 이미지가 필요하면 **가공 이미지를 새로 만들기 전에** 사용자의 Google Drive에서 실촬영 스크린샷을 먼저 찾는다. 실물 화면이 목업보다 항상 우선이다.

## 기본 폴더

- 바이브코딩 수업 스크린샷 폴더: `2026-07-10`
  - 폴더 ID: `1kKTCbhS-qlTBdcnrF5z2k-VA3BpuaYea`
  - URL: https://drive.google.com/drive/folders/1kKTCbhS-qlTBdcnrF5z2k-VA3BpuaYea
- 사용자가 새 폴더를 올렸을 수 있으니, 기본 폴더에 없으면 `list_recent_files`와 `title contains` 검색으로 최근 업로드 폴더/이미지를 확인한다.

## 검색 절차

1. `ToolSearch "select:mcp__Google_Drive__search_files,mcp__Google_Drive__list_recent_files,mcp__Google_Drive__download_file_content"` 로 도구 로드.
2. 폴더 내용 조회: `search_files` 쿼리 `parentId = '1kKTCbhS-qlTBdcnrF5z2k-VA3BpuaYea'` (+`excludeContentSnippets: false` 로 두면 스니펫으로 이미지 내용을 미리 파악 가능).
3. 스니펫·파일명으로 필요한 이미지를 고른다. 스니펫에는 화면 속 텍스트가 담겨 있어 내용 판별에 충분한 경우가 많다.

## 다운로드 절차 (중요 — 컨텍스트 절약)

- **curl/직접 URL 다운로드는 불가**: 이 환경의 프록시가 `drive.google.com`, `googleusercontent.com`, `googleapis.com` 을 모두 차단한다(CONNECT 403). 반드시 MCP `download_file_content` 를 쓴다.
- `download_file_content` 결과(base64)는 크기가 크면 하네스가 자동으로 디스크의 JSON 파일로 저장(spill)한다. 그 경우 결과에 표시된 파일 경로에서 `jq -r '..the base64 field..' | base64 -d > 대상.png` 로 직접 디코드하면 base64가 컨텍스트에 들어오지 않는다.
- **여러 장(4장 이상) 받을 때는 파일당/묶음당 서브에이전트(Agent 도구)에 위임**해서 메인 컨텍스트를 보호한다. 에이전트에게 fileId → 저장 파일명 매핑과 위 디코드 요령을 알려주고, 보고에는 base64를 절대 포함하지 말라고 지시한다.
- 저장 위치: `docs/onboarding/assets/screenshots/`, 파일명은 `shot-NN-간단설명.png` (NN은 시간순 번호).

## 다운로드 후 반드시 할 일

1. **검수**: 핵심 이미지는 Read로 열어 내용 확인.
2. **개인정보 점검**: 계정명·이메일·2FA 화면·개인 파일명·학생 실명이 보이면 사용자에게 알리고, 공개 저장소 커밋 전에 마스킹 여부를 확인한다.
3. **목록 갱신**: `docs/onboarding/image-assets.md` 에 새 이미지의 용도(슬라이드 번호/에피소드)를 기록한다.
4. 자료(PPT·대본)에 반영했으면 커밋 메시지에 어떤 화면을 어디에 썼는지 남긴다.
