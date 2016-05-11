var dbClient = require('./db')

exports.get = function(id, cb){
	var query = dbClient.query("select * from products where pid = $1",[id]);
	var data;
	query.on('row',function(d){
		data = d;
	});

	query.on('error',function(er){
		cb(er,null);
	});

	query.on('end',function(e){
		cb(null,data);
	})
}

exports.getAll = function(cb){
	var query = dbClient.query("select * from products");
	var data = [];
	query.on('row',function(d){
		data.push(d);
	});

	query.on('error',function(er){
		cb(er,null);
	});

	query.on('end',function(e){
		cb(null,data);
	})
}