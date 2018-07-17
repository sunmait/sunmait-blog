#!/usr/bin/env bash

docker-compose -f ../docker-compose.seed.yml -f ../docker-compose.seed.dev.yml build
docker-compose -f ../docker-compose.seed.yml -f ../docker-compose.seed.dev.yml up