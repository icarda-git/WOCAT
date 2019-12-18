#!/bin/sh
cd /frontend && npm run prod
nginx -g"daemon off;"

