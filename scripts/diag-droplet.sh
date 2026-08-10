#!/bin/bash
# TEMPORARY droplet-side diagnostics for the v1.2.3 stale-deploy investigation
# (brighid, 2026-08-10).  Runs before and after deploy-production.sh; prints
# state only, changes nothing.  Remove with the diag tag once the cause of the
# green-pipeline/stale-site failure is confirmed.
set -uo pipefail

cd /opt/projects/come-sit-with-me

echo "=== DIAG: project tree ==="
ls -la

echo "=== DIAG: .env ==="
cat .env 2>/dev/null || echo "NO-DOTENV"

echo "=== DIAG: running containers ==="
docker ps --format '{{.Names}} => {{.Image}} ports={{.Ports}} up={{.Status}}'

echo "=== DIAG: local images for this repo ==="
docker image ls git.dev.xram.net/atmarx/come-sit-with-me --format '{{.Tag}} {{.ID}} created={{.CreatedAt}}'

echo "=== DIAG: resolved compose config ==="
docker compose -f docker-compose.production.yml config 2>/dev/null | grep -E 'image:|container_name:|^name:' || echo "COMPOSE-CONFIG-FAILED"

echo "=== DIAG: prod container inspect ==="
docker inspect come-sit-with-me-prod --format 'image={{.Image}} started={{.State.StartedAt}}' 2>/dev/null || echo "NO-PROD-CONTAINER"

echo "=== DIAG: content probe on 127.0.0.1:3011 ==="
wget -qO- http://127.0.0.1:3011/resources/references | grep -o 'keeps-trial-2014' | head -1 || echo "V123-MARKER-ABSENT"

echo "=== DIAG done ==="

# When invoked as "diag-droplet.sh fail-after" (the post-deploy run), exit
# nonzero on purpose: a red step is the only way this runner returns logs.
if [ "${1:-}" = "fail-after" ]; then
    echo "DIAG-COMPLETE-INTENTIONAL-FAIL"
    exit 1
fi
