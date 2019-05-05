const express = require('express');
const app = express();

//Middlewares

app.use ( express.static('build') )
module.exports = app
