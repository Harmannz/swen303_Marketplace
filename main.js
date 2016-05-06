var express = require('express');
var app = express();

app.use('/src', express.static('src'));
app.use('/node_modules', express.static('node_modules'));

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/src/index.html');
});

app.listen(3000);
