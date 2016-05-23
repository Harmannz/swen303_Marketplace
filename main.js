var express = require('express');
var app = express();
var port = process.env.PORT || 3000;


app.use('/src', express.static('build/src'));
app.use('/node_modules', express.static('build/node_modules'));
app.use('/assets', express.static('build/assets'));
app.use('/uploads', express.static('uploads'));

//routes defined here
app.use(require('./controllers'));

// Start the server listening
var server = app.listen(port, function() {
	var port = server.address().port;
	console.log('Server listening on port %s.', port);
});