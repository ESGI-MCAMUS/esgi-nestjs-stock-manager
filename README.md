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
