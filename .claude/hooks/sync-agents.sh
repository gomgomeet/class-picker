#!/bin/bash
# 프로젝트의 에이전트/스킬을 개인 폴더(~/.claude)로 동기화하는 스크립트.
# 세션 시작 시, 그리고 에이전트 파일이 새로 저장될 때 자동 실행된다.
top=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
[ -d "$top/.claude/agents" ] || exit 0

mkdir -p ~/.claude/agents ~/.claude/skills
cp "$top"/.claude/agents/*.md ~/.claude/agents/ 2>/dev/null || true
if [ -d "$top/.claude/skills" ]; then
  cp -r "$top"/.claude/skills/* ~/.claude/skills/ 2>/dev/null || true
fi
exit 0
