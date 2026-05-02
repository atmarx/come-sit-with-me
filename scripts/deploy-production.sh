#!/bin/bash
# Run on xdroplet04 by the Woodpecker deploy-production step.
# rsync drops compose + caddy files into _staged/, then this script
# promotes them, pulls the image, brings up the stack, and reloads Caddy.
set -euo pipefail

cd /opt/projects/come-sit-with-me
mkdir -p caddy

mv _staged/docker-compose.production.yml ./docker-compose.production.yml
mv _staged/come-sit-with-me.caddy ./caddy/come-sit-with-me.caddy

docker compose -f docker-compose.production.yml pull
docker compose -f docker-compose.production.yml up -d --remove-orphans

cp caddy/come-sit-with-me.caddy /opt/caddy-stack/sites/
docker exec caddy caddy reload --config /etc/caddy/Caddyfile

docker image prune -f
echo "Production deployment complete"
