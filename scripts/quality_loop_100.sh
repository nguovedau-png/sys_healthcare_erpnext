#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND="$ROOT_DIR/external_apps/backend"
LOG_DIR="${QUALITY_LOG_DIR:-/tmp/healthcare-quality-loop}"
mkdir -p "$LOG_DIR"

for iteration in $(seq 1 100); do
  git -C "$ROOT_DIR" diff --check
  node -e "JSON.parse(require('fs').readFileSync('$BACKEND/package.json','utf8'))"
  test -s "$ROOT_DIR/.github/workflows/healthcare-backend-quality.yml"
  test -s "$ROOT_DIR/docs/improved-product-scope-2026.md"
  test -s "$ROOT_DIR/docs/development-plan-vietnam-outpatient-2026.md"

  # Every tenth pass is substantive: typecheck, schema validation, tests and build.
  if (( iteration % 10 == 0 )); then
    echo "quality checkpoint $iteration/100"
    (cd "$BACKEND" && DATABASE_URL="${DATABASE_URL:-postgresql://quality:quality@localhost:5432/quality}" npm run typecheck >"$LOG_DIR/typecheck-$iteration.log")
    (cd "$BACKEND" && DATABASE_URL="${DATABASE_URL:-postgresql://quality:quality@localhost:5432/quality}" npm run prisma:validate >"$LOG_DIR/prisma-$iteration.log")
    (cd "$BACKEND" && npm test -- --runInBand --silent >"$LOG_DIR/test-$iteration.log")
    (cd "$BACKEND" && npm run build >"$LOG_DIR/build-$iteration.log")
  fi
done

echo "100 quality loops completed"
