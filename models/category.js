var dbClient = require('./db')

exports.get = function(cid, cb, errorCb){
	var query = dbClient.query("SELECT * FROM categories WHERE cid = $1", [cid]);
	query.on('row',function(d){
		data = d;
	});

	query.on('error',function(err){
		errorCb(err);
	});

	query.on('end',function(e){
		cb(data);
	})

}
