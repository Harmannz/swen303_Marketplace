var express = require('express');
var app = express();

app.use('/src', express.static('src'));
app.use('/node_modules', express.static('node_modules'));

//routes defined here
app.use(require('./controllers'));

app.listen(3000);
