# Groupomania

Hi, here are the frontend (Vue.js web app) & the backend (Node.js Express API) of the Groupomania project, functioning with a MySQL database.
Once the github repo cloned on your computer, you will need to launch the app.
Good to know that `Node` and `npm` have to be installed locally on your machine.

## Frontend (web app)

In your terminal, go to the `frontend` directory.
First, enter `npm install` in your console.
Then, enter `npm run serve`.
The Vue.js web application should run on `localhost` on the `8080` port by default.
Vue.js logs everything in the `console`, refer to it to be sure that the app is running and where.

## Backend (API)

Go to the `backend` directory.
Rename the `.env_sample` file to `.env`.

### Database

This application uses a MySQL database.
It could be local or on the cloud, make sure to create all the tables needed (cf. `database-config.sql`).
Don't forget to write your connection key in the `.env` file.

### Server

In your terminal, go to the `backend` directory.
First, enter `npm install` in your console.
Then, enter `npm start`.
The API should run on `localhost` on the `3000` port by default.
Messages will be log in the `console`, one of them will assure you that the server is running and where (on which port), another one will assure you that the server is connected to the database.
Errors will also be displayed in the `console` (e.g. database connection key missing).
