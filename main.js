var express = require('express');
var app = express();

app.use('/src', express.static('build/src'));
app.use('/node_modules', express.static('build/node_modules'));
app.use('/assets', express.static('build/assets'));

//routes defined here
app.use(require('./controllers'));

app.listen(3000);
