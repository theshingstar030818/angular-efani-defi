#!/usr/bin/env bash

npm run build 
scp -r dist/defi-pools/* root@businessthor.com:/var/www/html/
