# Simple social backend with email sending service

## Features
- One time password support
- Jwt auth tokens
- Email service for sending login codes
- All CRUD operations on tweet model
- Swagger for api documentation
## Tech Stack

**Server:** [NodeJs](https://nodejs.org/en), [Express](https://expressjs.com/de/), [Typescript](https://www.typescriptlang.org/docs/), [Prisma](https://www.prisma.io/), [Nodemailer](https://nodemailer.com/about/)

## How to get this project
- Clone this reposoitory to your computer
- Open the cloned project in you favourite editor e.g [VSCode](https://code.visualstudio.com/)
- In the project root folder run the commands stated under the Terminal Commands section of this page

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL="" `  Database

`JWT_SECRET=""` jwt signing secret

`NODE_ENV=""` Dev or Prod

`GOOGLE_APP_PASSWORD=""` google app password for sending email. e.g: https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4M_hEz4VSFF3hPYzdvSl0Sc1IAVK0O_jiohr2PZZW7Lgt6YscusU-QCAhcfDxNO-QG2OWDZMoio0Zre7vqk-SrabDlDqA

`EMAIL_SENDER=""` your email address. In this example GMAIL.

## Terminal Commands
`npm run dev` to start local server

`prisma-studio` to connect to the database and run web database ui

`npx prisma migrate dev --name 'your migration name'` for Database migrations

## FAQ

#### Is this a complete project?
No, this is still WIP and new feautres will be added requently

#### Can I change database provider?
Definitely!, using `npx prisma init --datasource-provider 'your database'`

#### What happen when prisma folder already exists when changing database provider?
You can follow this guide [Upgrading the Prisma layer](https://www.prisma.io/docs/guides/upgrade-guides/upgrade-from-prisma-1/upgrading-the-prisma-layer-postgresql)

## Authors

- [@Casneil Simpson](https://www.github.com/casneil)


## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)