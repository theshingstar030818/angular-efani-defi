#!/usr/bin/env bash

npm run build 
scp -i /Users/tanzeel.rehman/Development/cardano/cardano -r dist/defi-pools/* root@95.217.18.84:/var/www/html/ 
