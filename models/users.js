var dbClient = require('./db')
   ,Utils = require('../models/utils')
   , _ = require('lodash')
   ,bcrypt = require('bcrypt');

const saltRounds = 10;

exports.addUser = function(data,cb,errorCb){
    data.password = bcrypt.hashSync(data.password, saltRounds);
	var queryParams = Utils.shallowObjToQuery(data);
	var query = dbClient.query("insert into users " + queryParams.string +" returning *" , queryParams.args);

	query.on('error',function(e){
		errorCb(e);
	})

	query.on('end',function(summary){
		cb(summary);
	})
}
/*Gets the last user (should only be one) who has the email or username specified */
exports.fromIdentifier = function(id,cb,errorCb){
	field = (id.indexOf(id) > -1)? 'username' : 'email';
	var query = dbClient.query("select * from users where " + field + " = $1",[id]);
	var data;

	query.on('row',function(d){
		data = d;
	});

	query.on('error',function(er){
		errorCb(er);
	});

	query.on('end',function(e){
		cb(data);
	})
}
