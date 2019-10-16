#!/bin/sh
cd /frontend && npm i && ng b --prod
nginx -g"daemon off;"

