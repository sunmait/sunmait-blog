#!/usr/bin/env bash

docker-compose -p sunmaitblog --project-directory ../../ -f ../configs/seed/docker-compose.seed.yml \
    -f ../configs/seed/docker-compose.seed.prod.yml build
docker-compose -p sunmaitblog --project-directory ../../ -f ../configs/seed/docker-compose.seed.yml \
    -f ../configs/seed/docker-compose.seed.prod.yml up