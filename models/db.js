var pg = require('pg').native;
var connectionString = process.env.DATABASE_URL;
var client = new pg.Client(connectionString);
client.connect();

module.exports =  client;