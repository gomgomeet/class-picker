# setup-agents.ps1
# 이 저장소의 에이전트들을 컴퓨터 전역 폴더(~\.claude\agents)로 복사한다.
# 실행 방법: 이 저장소 폴더에서 아래 한 줄 실행
#   powershell -ExecutionPolicy Bypass -File .\setup-agents.ps1

$source = Join-Path $PSScriptRoot ".claude\agents"
$dest   = Join-Path $HOME ".claude\agents"

if (-not (Test-Path $source)) {
    Write-Host "에이전트 폴더($source)를 찾을 수 없어요. 저장소 최상위 폴더에서 실행해 주세요." -ForegroundColor Red
    exit 1
}

New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item -Path (Join-Path $source "*.md") -Destination $dest -Force

Write-Host ""
Write-Host "복사 완료! 전역 폴더($dest)에 설치된 에이전트:" -ForegroundColor Green
Get-ChildItem $dest -Filter *.md | ForEach-Object { Write-Host ("  - " + $_.BaseName) }
Write-Host ""
Write-Host "이제 이 컴퓨터의 모든 프로젝트에서 위 에이전트들을 쓸 수 있어요."
Write-Host "(에이전트가 새로 추가되거나 바뀌면 git pull 후 이 스크립트를 다시 실행하세요)"
