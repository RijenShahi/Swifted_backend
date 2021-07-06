const express = require('express');
const userProfileRoute = require('./route/userProfileRoute');
const database = require('./database/database')

const app = express();  
app.use(express.json());

app.use(userProfileRoute);

app.listen(90);