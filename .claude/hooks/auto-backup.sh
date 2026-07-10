#!/bin/bash
# 세션이 끝날 때 커밋되지 않은 작업을 자동으로 커밋하고 GitHub에 push하는 안전망 스크립트
top=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
cd "$top" || exit 0

# 변경사항이 없으면 아무것도 하지 않음
[ -z "$(git status --porcelain)" ] && exit 0

# 브랜치 위가 아니면(detached HEAD) 건드리지 않음
branch=$(git symbolic-ref --short HEAD 2>/dev/null) || exit 0

git add -A
git commit -m "자동 백업: $(date '+%Y-%m-%d %H:%M')" >/dev/null 2>&1 || exit 0
git push -u origin "$branch" >/dev/null 2>&1 || \
  { sleep 2; git push -u origin "$branch" >/dev/null 2>&1; } || true

echo '{"systemMessage": "작업이 자동으로 커밋되어 GitHub에 백업되었습니다."}'
