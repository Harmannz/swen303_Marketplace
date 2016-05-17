var dbClient = require('./db')
   ,Utils = require('./utils')
   ,fs = require('fs')

exports.get = function(id, cb, errorCb){
	var query = dbClient.query("select * from products where pid = $1",[id]);
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

exports.getAll = function(cb,errorCb){
	var query = dbClient.query("select * from products");
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

//Get items in category
exports.getFromCategory = function(cid, cb,errorCb){
	var query = dbClient.query("select * from products where categoryId = $1",[cid]);
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


exports.addNew = function(product, cb, errorCb){
	var queryParams = Utils.shallowObjToQuery(product);
	var query = dbClient.query("insert into products " + queryParams.string +" returning *" , queryParams.args);
	
	query.on('error',function(e){
		errorCb(e);
	})

	query.on('end',function(e){
		insertedRow = (e.rows.length > 0)? e.rows[0] : null;
		cb(insertedRow);
	})
}

exports.getFeaturedProducts = function(cb, errorCb) {
	var query = "SELECT * FROM products ORDER BY viewed LIMIT 10";
	dbClient.query(query, function(err, results) {
		if (err) {
			errorCb(err);
		}

		cb(results.rows);
	});
}

