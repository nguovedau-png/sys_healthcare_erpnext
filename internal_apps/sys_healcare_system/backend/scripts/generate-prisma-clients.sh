#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

mapfile -t schemas < <(find apps -type f -path '*/prisma/schema.prisma' | sort)
if ((${#schemas[@]} == 0)); then
  echo "No Prisma schemas found under apps/" >&2
  exit 1
fi

for schema in "${schemas[@]}"; do
  echo "Generating Prisma client: ${schema}"
  npx prisma generate --schema="$schema"
done
