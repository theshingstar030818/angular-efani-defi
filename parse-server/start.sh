#!/usr/bin/env bash

docker kill $(docker ps -q) && docker rm $(docker ps -a -q)

fuser -k 27017/tcp
fuser -k 1337/tcp
fuser -k 4040/tcp

mongodb-runner start

parse-server --appId YOUR_APP_ID \
--masterKey YOUR_MASTER_KEY \
--databaseURI mongodb://localhost/dev & 

parse-dashboard --dev --appId YOUR_APP_ID \
--masterKey YOUR_MASTER_KEY \
--serverURL "http://95.217.18.84:1337/parse" \
--appName EfaniGas &

mongorestore --drop -d dev db/dev/ 



