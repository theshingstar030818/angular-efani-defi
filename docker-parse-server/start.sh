#!/usr/bin/env bash

docker kill $(docker ps -q) && docker rm $(docker ps -a -q)

docker-compose build --no-cache parse-cloud-code

APP_NAME=EfaniGas \
APP_ID=YOUR_APP_ID \
MASTER_KEY=YOUR_MASTER_KEY \
PARSE_DASHBOARD_ALLOW_INSECURE_HTTP=1 \
SERVER_URL=http://95.217.18.84:1337/parse \
USER1=admin \
USER1_PASSWORD=pass \
docker-compose up -d

mongorestore --drop -d dev db/dev/
