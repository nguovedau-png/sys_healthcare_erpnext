#!/usr/bin/env bash
# =============================================================================
# ERPNext Local Setup Script
# Project: sys_healthcare_erpnext
# Site:    healthcare.local
# =============================================================================
# Usage:
#   chmod +x setup.sh
#   ./setup.sh              # full setup
#   ./setup.sh --deps-only  # install dependencies only
#   ./setup.sh --site-only  # setup site only (deps already installed)
# =============================================================================

set -euo pipefail

# ─── Configuration ───────────────────────────────────────────────────────────
BENCH_DIR="$(cd "$(dirname "$0")" && pwd)"
SITE_NAME="${SITE_NAME:-healthcare.local}"
DB_NAME="${DB_NAME:-_67a0dd92a8b4a13c}"
DB_PASSWORD="${DB_PASSWORD:-Lw6y4ERGJjKm9VFC}"
DB_ROOT_PASSWORD="${DB_ROOT_PASSWORD:-}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-admin}"
FRAPPE_BRANCH="${FRAPPE_BRANCH:-version-15}"
PYTHON_VERSION_MIN="3.10"

REDIS_CACHE_PORT="${REDIS_CACHE_PORT:-13000}"
REDIS_QUEUE_PORT="${REDIS_QUEUE_PORT:-11000}"
REDIS_SOCKETIO_PORT="${REDIS_SOCKETIO_PORT:-13000}"
WEB_PORT="${WEB_PORT:-8000}"
SOCKETIO_PORT="${SOCKETIO_PORT:-9000}"

# ─── Colors ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; CYAN='\033[0;36m'; NC='\033[0m'

log()   { echo -e "${GREEN}[✓]${NC} $*"; }
warn()  { echo -e "${YELLOW}[!]${NC} $*"; }
err()   { echo -e "${RED}[✗]${NC} $*" >&2; }
info()  { echo -e "${BLUE}[i]${NC} $*"; }
step()  { echo -e "\n${CYAN}━━━ Step $1: $2 ━━━${NC}"; }

# ─── Detect Platform ─────────────────────────────────────────────────────────
OS="$(uname -s)"
IS_MACOS=false; IS_LINUX=false
[ "$OS" = "Darwin" ] && IS_MACOS=true
[ "$OS" = "Linux" ] && IS_LINUX=true

BREW_PREFIX=""
command -v brew &>/dev/null && BREW_PREFIX="$(brew --prefix)"

# ─── Mode flags ──────────────────────────────────────────────────────────────
DEPS_ONLY=false; SITE_ONLY=false
for arg in "$@"; do
    case "$arg" in
        --deps-only) DEPS_ONLY=true ;;
        --site-only) SITE_ONLY=true ;;
    esac
done

# =============================================================================
step 0 "Pre-flight checks"
# =============================================================================

command -v git &>/dev/null || { err "git not found"; exit 1; }
log "git $(git --version | awk '{print $3}')"

command -v python3 &>/dev/null || { err "python3 not found"; exit 1; }
PY_MAJOR=$(python3 -c "import sys; print(sys.version_info.major)")
PY_MINOR=$(python3 -c "import sys; print(sys.version_info.minor)")
if [ "$PY_MAJOR" -lt 3 ] || { [ "$PY_MAJOR" -eq 3 ] && [ "$PY_MINOR" -lt 10 ]; }; then
    err "Python 3.10+ required"; exit 1
fi
log "Python $PY_MAJOR.$PY_MINOR"

command -v node &>/dev/null || { err "Node.js not found"; exit 1; }
log "Node.js $(node --version)"

python3 -m pip --version &>/dev/null || { err "pip not found"; exit 1; }
log "pip OK"

# =============================================================================
step 1 "System dependencies (Redis, MariaDB, wkhtmltopdf)"
# =============================================================================

if $IS_MACOS; then
    command -v brew &>/dev/null || { err "Homebrew not found. https://brew.sh"; exit 1; }

    if ! command -v redis-server &>/dev/null; then
        info "Installing Redis..."
        HOMEBREW_NO_AUTO_UPDATE=1 brew install redis 2>&1 | tail -1
    fi
    log "Redis OK"

    MARIADB_PREFIX="$BREW_PREFIX/opt/mariadb@10.6"
    if [ ! -d "$MARIADB_PREFIX" ]; then
        info "Installing MariaDB 10.6..."
        HOMEBREW_NO_AUTO_UPDATE=1 brew install mariadb@10.6 2>&1 | tail -1
    fi
    log "MariaDB 10.6 OK"

    if ! command -v wkhtmltopdf &>/dev/null; then
        info "Installing wkhtmltopdf..."
        HOMEBREW_NO_AUTO_UPDATE=1 brew install --cask wkhtmltopdf 2>&1 | tail -1
    fi
    log "wkhtmltopdf OK"

elif $IS_LINUX; then
    sudo apt-get update -qq
    sudo apt-get install -y -qq redis-server mariadb-server mariadb-client \
        wkhtmltopdf python3-dev libffi-dev libssl-dev libjpeg-dev \
        zlib1g-dev libpng-dev libmariadb-dev pkg-config curl 2>&1 | tail -3
    log "System packages installed"
fi

# =============================================================================
step 2 "frappe-bench CLI"
# =============================================================================

if ! command -v bench &>/dev/null; then
    info "Installing frappe-bench..."
    python3 -m pip install --user frappe-bench 2>&1 | tail -2
    export PATH="$HOME/.local/bin:$PATH"
fi
command -v bench &>/dev/null || { err "bench install failed"; exit 1; }
log "bench OK"

# =============================================================================
step 3 "MariaDB configuration & startup"
# =============================================================================

if $IS_MACOS && [ -n "$BREW_PREFIX" ]; then
    MARIADB_CNF="$BREW_PREFIX/opt/mariadb@10.6/my.cnf"
    mkdir -p "$(dirname "$MARIADB_CNF")"
elif $IS_LINUX; then
    MARIADB_CNF="/etc/mysql/mariadb.conf.d/99-erpnext.cnf"
    sudo mkdir -p "$(dirname "$MARIADB_CNF")"
else
    MARIADB_CNF=""
fi

if [ -n "$MARIADB_CNF" ]; then
    if $IS_LINUX; then
        sudo tee "$MARIADB_CNF" > /dev/null <<'EOF'
[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

[mysql]
default-character-set = utf8mb4
EOF
    else
        cat > "$MARIADB_CNF" <<'EOF'
[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

[mysql]
default-character-set = utf8mb4
EOF
    fi
    log "MariaDB config written"
fi

# Start MariaDB
if $IS_MACOS; then
    if ! brew services list 2>/dev/null | grep -q "mariadb.*started"; then
        brew services start mariadb@10.6 2>/dev/null || brew services start mysql 2>/dev/null || true
        sleep 3
    fi
elif $IS_LINUX; then
    systemctl is-active --quiet mariadb || sudo systemctl start mariadb
fi
log "MariaDB running"

if [ -n "$DB_ROOT_PASSWORD" ]; then
    MARIADB_BIN=""
    if $IS_MACOS && [ -n "$BREW_PREFIX" ]; then
        for b in mariadb mysql; do
            [ -x "$BREW_PREFIX/opt/mariadb@10.6/bin/$b" ] && MARIADB_BIN="$BREW_PREFIX/opt/mariadb@10.6/bin/$b" && break
        done
    else
        command -v mariadb &>/dev/null && MARIADB_BIN="mariadb"
        [ -z "$MARIADB_BIN" ] && command -v mysql &>/dev/null && MARIADB_BIN="mysql"
    fi
    if [ -n "$MARIADB_BIN" ]; then
        "$MARIADB_BIN" -u root -p"$DB_ROOT_PASSWORD" -e "SELECT 1" &>/dev/null 2>&1 || {
            info "Setting MariaDB root password..."
            if $IS_MACOS; then
                mariadb -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '$DB_ROOT_PASSWORD';" 2>/dev/null || true
            else
                sudo mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '$DB_ROOT_PASSWORD';" 2>/dev/null || true
            fi
        }
    fi
    log "MariaDB root password set"
fi

# =============================================================================
step 4 "Redis instances"
# =============================================================================

mkdir -p "$BENCH_DIR/config" "$BENCH_DIR/logs"

cat > "$BENCH_DIR/config/redis_cache.conf" <<EOF
port $REDIS_CACHE_PORT
bind 127.0.0.1
daemonize yes
pidfile $BENCH_DIR/redis_cache.pid
logfile $BENCH_DIR/logs/redis_cache.log
save 900 1
save 300 10
save 60 10000
maxmemory 256mb
maxmemory-policy allkeys-lru
EOF

cat > "$BENCH_DIR/config/redis_queue.conf" <<EOF
port $REDIS_QUEUE_PORT
bind 127.0.0.1
daemonize yes
pidfile $BENCH_DIR/redis_queue.pid
logfile $BENCH_DIR/logs/redis_queue.log
save 900 1
save 300 10
save 60 10000
maxmemory 256mb
maxmemory-policy noeviction
EOF

for port in $REDIS_CACHE_PORT $REDIS_QUEUE_PORT; do
    lsof -ti:"$port" 2>/dev/null | xargs kill 2>/dev/null || true
done
sleep 1

redis-server "$BENCH_DIR/config/redis_cache.conf"
redis-server "$BENCH_DIR/config/redis_queue.conf"
sleep 1

redis-cli -p "$REDIS_CACHE_PORT" ping 2>/dev/null | grep -q PONG && log "Redis cache :$REDIS_CACHE_PORT OK" || warn "Redis cache issue"
redis-cli -p "$REDIS_QUEUE_PORT" ping 2>/dev/null | grep -q PONG && log "Redis queue :$REDIS_QUEUE_PORT OK" || warn "Redis queue issue"

if $DEPS_ONLY; then
    echo -e "\n${GREEN}Dependencies installed. Run without --deps-only to setup site.${NC}\n"
    exit 0
fi

# =============================================================================
step 5 "Virtual environment"
# =============================================================================

VENV_DIR="$BENCH_DIR/env"
[ ! -d "$VENV_DIR" ] && python3 -m venv "$VENV_DIR"
# shellcheck source=/dev/null
source "$VENV_DIR/bin/activate"
log "Virtualenv: $VENV_DIR"

pip install --upgrade pip setuptools wheel 2>&1 | tail -1
pip install frappe-bench 2>&1 | tail -1

# =============================================================================
step 6 "Bench init"
# =============================================================================

if [ -f "$BENCH_DIR/Procfile" ] && [ -d "$BENCH_DIR/apps/frappe" ]; then
    log "Bench already initialized"
else
    info "Initializing bench..."
    cd /
    bench init --skip-redis-config-generation --frappe-branch "$FRAPPE_BRANCH" "$BENCH_DIR" 2>&1 | tail -5
    cd "$BENCH_DIR"
fi

NODE_BIN="$(command -v node)"
if [ -n "$NODE_BIN" ] && [ -f "$BENCH_DIR/Procfile" ]; then
    if $IS_MACOS; then
        sed -i '' "s|socketio:.*|socketio: $NODE_BIN apps/frappe/socketio.js|" "$BENCH_DIR/Procfile" 2>/dev/null || true
    else
        sed -i "s|socketio:.*|socketio: $NODE_BIN apps/frappe/socketio.js|" "$BENCH_DIR/Procfile" 2>/dev/null || true
    fi
    log "Procfile updated"
fi

# =============================================================================
step 7 "common_site_config.json"
# =============================================================================

cat > "$BENCH_DIR/sites/common_site_config.json" <<EOF
{
    "background_workers": 1,
    "file_watcher_port": 6787,
    "frappe_user": "${FRAPPE_USER:-$(whoami)}",
    "gunicorn_workers": 17,
    "live_reload": true,
    "rebase_on_pull": false,
    "redis_cache": "redis://127.0.0.1:$REDIS_CACHE_PORT",
    "redis_queue": "redis://127.0.0.1:$REDIS_QUEUE_PORT",
    "redis_socketio": "redis://127.0.0.1:$REDIS_SOCKETIO_PORT",
    "restart_supervisor_on_update": false,
    "restart_systemd_on_update": false,
    "serve_default_site": true,
    "default_site": "$SITE_NAME",
    "shallow_clone": true,
    "socketio_port": $SOCKETIO_PORT,
    "use_redis_auth": false,
    "webserver_port": $WEB_PORT,
    "allow_cors": "*"
}
EOF
log "common_site_config.json written"

# =============================================================================
step 8 "Create site: $SITE_NAME"
# =============================================================================

if [ -d "$BENCH_DIR/sites/$SITE_NAME" ] && [ -f "$BENCH_DIR/sites/$SITE_NAME/site_config.json" ]; then
    log "Site $SITE_NAME already exists"
else
    info "Creating site..."

    MARIADB_ROOT_ARG=""
    [ -n "$DB_ROOT_PASSWORD" ] && MARIADB_ROOT_ARG="--mariadb-root-password $DB_ROOT_PASSWORD"

    bench new-site "$SITE_NAME" \
        $MARIADB_ROOT_ARG \
        --admin-password "$ADMIN_PASSWORD" \
        --db-name "$DB_NAME" \
        --db-type mariadb \
        2>&1 | tail -5

    log "Site created"
fi

bench use "$SITE_NAME" 2>/dev/null
log "Default site -> $SITE_NAME"

# =============================================================================
step 9 "Install apps"
# =============================================================================

for req in frappe erpnext; do
    [ -f "$BENCH_DIR/apps/$req/requirements.txt" ] && {
        info "Installing $req deps..."
        pip install -r "$BENCH_DIR/apps/$req/requirements.txt" 2>&1 | tail -2
    }
done

APPS=(
    frappe payments erpnext hrms lms webshop
    booking doppio lives lmpharma scope_app
    expense_tracker gamemarketing
)

for app in "${APPS[@]}"; do
    if [ -d "$BENCH_DIR/apps/$app" ]; then
        info "Installing $app..."
        bench --site "$SITE_NAME" install-app "$app" 2>&1 | tail -2
        log "$app done"
    else
        warn "apps/$app not found"
    fi
done

if [ -f "$BENCH_DIR/sites/apps.txt" ]; then
    while IFS= read -r app; do
        app="$(echo "$app" | tr -d '[:space:]')"
        [ -z "$app" ] && continue
        [ -d "$BENCH_DIR/apps/$app" ] || continue
        if ! bench --site "$SITE_NAME" python -c "import $app" &>/dev/null 2>&1; then
            bench --site "$SITE_NAME" install-app "$app" 2>&1 | tail -2
            log "$app done"
        fi
    done < "$BENCH_DIR/sites/apps.txt"
fi

# =============================================================================
step 10 "Post-install"
# =============================================================================

info "Clearing cache..."
bench --site "$SITE_NAME" clear-cache 2>/dev/null || true
bench --site "$SITE_NAME" clear-website-cache 2>/dev/null || true
log "Cache cleared"

info "Building assets..."
bench build --app frappe 2>&1 | tail -3 || true
log "Build complete"

# =============================================================================
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ERPNext setup complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  URL:          ${CYAN}http://localhost:$WEB_PORT${NC}"
echo -e "  Site:         ${CYAN}$SITE_NAME${NC}"
echo -e "  Admin user:   ${CYAN}Administrator${NC}"
echo -e "  Admin pass:   ${CYAN}$ADMIN_PASSWORD${NC}"
echo ""
echo -e "  ${YELLOW}Start the server:${NC}"
echo -e "    cd $BENCH_DIR && bench start"
echo ""
