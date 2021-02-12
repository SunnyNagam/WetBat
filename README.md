# Wetbat Dashboard MVP 

## 1. Start up PostgreSQL

If you don't already have postgresql you can download it from [the Postgresql website](https://www.postgresql.org/download/). They walk you through setting up and creating a postgres database. 

Once you have a database running update the following fields in `/app/config/DBconfig.js` with the appropriate values you used when setting up your database.

```
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "123",
    DB: "postgres",
```
(Don't worry about the schema, the server should automatically create the necessary tables if they don't exist in your database.)

## 2. Start Server

Ensure all the necessary packages are installed and then start the server by running:
```
    npm install
    node server.js
```


## 3. Start Frontend

In a new terminal, navigate to the main frontend directory, ensure the necessary packages are installed, and run the frontend with:

```
    cd Frontend/wetbat
    npm install
    npm start
```

Now you can visit http://localhost:3000 to view the site!