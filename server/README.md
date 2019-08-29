# Sunmait blog API server

### Installation

To run server locally install nodejs version >= 8.6.0.
Also you need to have MySQL running on your local machine. MySQL server config file located in:

```sh
/API/config/default.example
```
Also you need to create a database with name "sunmait_blog_development".

Installation all dependencies:

```sh
npm run install-all
```

#### Creating tables and filling them with test data (Migrations)

There are 2 configuration files with `.json.example` extension.
rename file to `.json` and fill your db user and password (this files are in .gitignore)  

Configuration file located in:

```sh
/migrations/config.example
```

Next, to create tables you need run:

```sh
npm run migrate
```

and then for filling tables with test data run:

```sh
npm run seed
```

To undo migrate, run:

```sh
npm run migrate:undo
```

for seed run:

```sh
npm run seed:undo
```

#### Running server

To start the server run

```sh
npm start
```
