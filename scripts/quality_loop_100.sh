#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND="$ROOT_DIR/internal_apps/sys_healcare_system/backend"
for iteration in $(seq 1 100); do
  git -C "$ROOT_DIR" diff --check
  node -e "JSON.parse(require('fs').readFileSync('$BACKEND/package.json','utf8'))"
  test -s "$ROOT_DIR/.github/workflows/healthcare-backend-quality.yml"
  test -s "$ROOT_DIR/docs/vietnam-market-product-strategy-2026.md"
  test -s "$ROOT_DIR/docs/development-plan-2026.md"
  if (( iteration % 10 == 0 )); then
    echo "quality checkpoint $iteration/100"
    (cd "$BACKEND" && npm test -- --runInBand --silent >/tmp/healthcare-quality-test-$iteration.log)
    (cd "$BACKEND" && npm run build >/tmp/healthcare-quality-build-$iteration.log)
  fi
done
echo "100 quality loops completed"
