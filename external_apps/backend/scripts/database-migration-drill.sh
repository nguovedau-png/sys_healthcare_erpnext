#!/usr/bin/env bash
set -euo pipefail

# Run only from an operator-controlled staging environment. Do not place URLs or
# credentials in this repository; provide them through the environment or secret manager.
: "${DATABASE_URL:?DATABASE_URL is required}"
: "${RESTORE_DATABASE_URL:?RESTORE_DATABASE_URL is required}"
: "${CONFIRM_RESTORE:?Set CONFIRM_RESTORE=YES to allow the restore target to be overwritten}"

if [[ "$CONFIRM_RESTORE" != "YES" ]]; then
  echo "Refusing to restore: set CONFIRM_RESTORE=YES only for an approved disposable/staging target." >&2
  exit 2
fi

for command in pg_dump pg_restore psql; do
  if ! command -v "$command" >/dev/null 2>&1; then
    echo "Required command not found: $command" >&2
    exit 127
  fi
done

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="${BACKUP_DIR:-${ROOT_DIR}/.drill-backups}"
mkdir -p "$BACKUP_DIR"
BACKUP_FILE="${BACKUP_DIR}/healthcare-$(date -u +%Y%m%dT%H%M%SZ).dump"
cleanup() {
  rm -f "$BACKUP_FILE"
}
trap cleanup EXIT

cd "$ROOT_DIR"
export DATABASE_URL
pnpm exec prisma migrate deploy

pg_dump --format=custom --no-owner --file "$BACKUP_FILE" "$DATABASE_URL"

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 <<'SQL'
SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'SyncOperation';
SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ConsentRecord';
SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'QueueTicket';
SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'PaymentEvent';
SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'PaymentRefund';
SQL

pg_restore --clean --if-exists --no-owner --dbname "$RESTORE_DATABASE_URL" "$BACKUP_FILE"

psql "$RESTORE_DATABASE_URL" -v ON_ERROR_STOP=1 <<'SQL'
SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'SyncOperation';
SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ConsentRecord';
SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'QueueTicket';
SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'PaymentEvent';
SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'PaymentRefund';
SQL

echo "Migration and restore drill completed successfully. Backup artifact was removed on exit."
