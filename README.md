# ESGI Stock Manager

Project for the ESGI's course "NestJS & TypeScript". This project is a stock manager for companies. It allows to manage suppliers, products and orders.

## 📥 Installation

```bash
$ yarn
```

## 🚀 Running the app

You can either run the app in your terminal or in a docker container.

### 🖥️ Using the terminal

```bash
# development
$ yarn start:dev

# production mode
$ yarn start:prod
```

### 🐳 Using Docker

Fill correctly the `.env` file:

```
MYSQL_HOST="localhost"
MYSQL_DATABASE="database"
MYSQL_USER="root"
MYSQL_PASSWORD="root"
MYSQL_ROOT_PASSWORD="root"
MYSQL_PORT="3306"
APP_PORT="3000"
JWT_SECRET="jwt-dev-key"
NODE_ENV="development"
SENTRY_DSN="https://1c5a2cbfbacf4587bd769579257308bc@o4504878636204032.ingest.sentry.io/4504878643675136"
```

```bash
# build the image
$ docker build -t nestjs .

# run the container
$ docker compose up -d
```

## 🗃️ Seeding the database

First, you need to fill the `/config/config.json` file with your database credentials. Use the `config-example.json` file as a template.

Then, you can run the following command to seed the database:

```bash
$ yarn db:seed
```

If you want to reset the data in the database, you can run the following command:

```bash
$ yarn db:reset
```

## 🙋‍♂️ Test users and passwords

| Email                | Password | Role     |
| -------------------- | -------- | -------- |
| user@example.com     | user     | USER     |
| supplier@example.com | supplier | SUPPLIER |
| admin@example.com    | admin    | ADMIN    |

## 🪲 Known issue

If you have an error with Bcrypt when you try to start the container, you can try to run the following command:

```bash
docker compose exec nestjs npm rebuild bcrypt --build-from-source
```
