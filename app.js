const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || "8000";
const usersRoute = require('./routes/index.js');

const app = express();

app.use(express.json());
app.use('/', usersRoute);
app.use(express.urlencoded({ extended: false }));

const dbURI = process.env.DB_URI;

mongoose
    .connect(dbURI)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use('/', (req,res) => {
     res.send('Hello from express!!')
});

module.exports = app;

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});