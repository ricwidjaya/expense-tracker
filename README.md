# 廣志の私帳 Expense Tracker

## _Track daily expenses with category and receipt_

![](2022-01-10-17-33-00.png)
![](2022-01-10-17-32-21.png)

"廣志の私帳 Expense Tracker" is a web app built with Express.js and Node.js with MongoDB that allows you to track expense information.

## Features

- User can register and login as user, through email, Facebook and Google OAuth2.0.
- User can view, create, edit, delete expenses.
- Users can select category for specific group of expenses.
- User can view and upload receipt along with each expense.
- User can create new category of expense.

## Getting Start

### Environment Setup

1. [Node.js](https://nodejs.org/en/) v16 LTS
2. [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) v4.2.17

### Installing

1. Open your terminal and clone the project to local.

```
git clone https://github.com/ricwidjaya/expense-tracker.git
```

2. Change directory to the project

```
cd expense-tracker
```

3. Install all packages/dependencies

```
npm install
```

4. Install nodemon package for dev mode

```
npm install -g nodemon
```

5. Run the data seeder to create initial data by using below npm script, if successful, `MongoDB Connected` will show in the terminal. (It will show twice, once for creating categories, once for creating records data.)

```
npm run seed

```

6. For a fully functional project experience, please reference the `.env.example` document to know what environment variables you'll need. You'll need the following API services:

- [Google OAuth2.0 Login](https://console.cloud.google.com/)
- [Facebook Login](https://developers.facebook.com/)

7. Run the server on localhost using below npm script, if successful, `Server Started` will show in the terminal.

```
npm run dev
```

## Contributor

> [Richard Widjaya](https://github.com/ricwidjaya)
