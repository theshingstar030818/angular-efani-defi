#!/usr/bin/env bash

docker kill $(docker ps -q) && docker rm $(docker ps -a -q)

docker run --name my-mongo -d mongo

docker run --name my-parse-server --link my-mongo:mongo -d parse-server \
--appId YOUR_APP_ID \
--masterKey YOUR_MASTER_KEY \
--databaseURI mongodb://mongo/dev

# docker run -d -p 4040:4040 parseplatform/parse-dashboard --dev --appId YOUR_APP_ID --masterKey YOUR_MASTER_KEY --serverURL http://95.217.18.84:1337/parse