#!/bin/bash
# 이 저장소의 에이전트와 스킬을 내 컴퓨터 전체(~/.claude)에 설치하는 스크립트.
# 실행: bash install-agents.sh
# 설치하면 이 컴퓨터의 "모든 프로젝트"에서 에이전트를 쓸 수 있게 됩니다.

set -e
here="$(cd "$(dirname "$0")" && pwd)"

mkdir -p ~/.claude/agents ~/.claude/skills

echo "에이전트 설치 중..."
cp -v "$here"/.claude/agents/*.md ~/.claude/agents/

echo "스킬 설치 중..."
cp -rv "$here"/.claude/skills/save-work ~/.claude/skills/

echo ""
echo "✅ 설치 완료! 이 컴퓨터의 모든 프로젝트에서 아래 에이전트를 쓸 수 있어요:"
ls ~/.claude/agents/*.md | sed 's/.*\//  - /; s/\.md$//'
echo "  - /save-work 스킬"
echo ""
echo "※ 이미 열려 있는 Claude 세션에는 바로 안 보일 수 있어요. 새 세션부터 적용됩니다."
