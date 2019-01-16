# Sunmait blog project

## Installation

To run project locally, you need to start client and server. The following instructions for this described in [client/README.md](https://github.com/sunmait/sunmait-blog/blob/master/client/README.md) and [server/README.md](https://github.com/sunmait/sunmait-blog/blob/master/server/README.md).

## Run project in the Docker

Prerequisites:
  - Docker CE
  - docker-compose

All necessary scripts are in docker-scripts folder. Here is example of usage for development configuration:
  1. For the first time run **build-dev-server.sh** to build server.
  2. Run MySQL container with **run-dev-database.sh** script.
  3. In another terminal run **seed-dev-server.sh** script to apply migrations and seed database.
  4. Run **run-dev-server.sh** every time you want to start server.
  
  All these rules are applicable to production environment, just use prod files instead of dev. Adminer ([look more](https://www.adminer.org/en/)) is running alongside the server.
  
MySQL development Configuration:


    username: root
    password: password
    database: sunmait_blog_development
    host: devdb
    port: 3307
  
  
MySQL production Configuration:

    username: root
    password: password
    database: sunmait_blog
    host: proddb
    port: 3306

Server is running on 5000. Adminer is running on 8080. To connect from adminer use `host:port` pair in server field.

Sunmait Technologies   
https://sunmait.com
