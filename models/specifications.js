var dbClient = require('./db')
   ,Utils = require('./utils')
   ,fs = require('fs')

   exports.getSpecs = function(pid, cb, errorCb){
	var query = dbClient.query("select * from specifications where product_id = $1",[pid]);
	var data = [];
	
	query.on('row',function(d){
		data.push(d);
	});

	query.on('error',function(er){
		errorCb(er);
	});

	query.on('end',function(e){
		cb(data);
	})
}

exports.getAll = function(cb,errorCb){
	var query = dbClient.query("select * from specifications");
	var data = [];
	query.on('row',function(d){
		data.push(d);
	});

	query.on('error',function(err){
		errorCb(err);
	});

	query.on('end',function(e){
		cb(data);
	})
}
