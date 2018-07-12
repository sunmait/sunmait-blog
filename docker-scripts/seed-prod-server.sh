#!/usr/bin/env bash

docker-compose -f ../docker-compose.seed.yml -f ../docker-compose.seed.prod.yml build
docker-compose -f ../docker-compose.seed.yml -f ../docker-compose.seed.prod.yml up --abort-on-container-exit