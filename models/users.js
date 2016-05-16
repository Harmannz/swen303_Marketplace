var dbClient = require('./db')
   ,Utils = require('../models/utils')
   , _ = require('lodash');

exports.addUser = function(data,cb,errorCb){
	var queryParams = Utils.shallowObjToQuery(data);
	var query = dbClient.query("insert into users " + queryParams.string +" returning *" , queryParams.args);
	
	query.on('error',function(e){
		errorCb(e);
	})

	query.on('end',function(summary){
		cb(summary);
	})
}