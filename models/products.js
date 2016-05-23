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

exports.getQuantity = function(id, cb, errorCb){
	var query = dbClient.query("select * from productinstances where product_id = $1",[id]);
	var data = [];

	query.on('row',function(d){
		data.push(d);
	});

	query.on('error',function(er){
		errorCb(er);
	});

	query.on('end',function(e){
		cb(data.length);
	})
}

exports.getInstances = function(id, cb, errorCb){
	var query = dbClient.query("select * from productinstances where product_id = $1",[id]);
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

exports.getAvailableInstances = function(id, cb, errorCb){
	var query = dbClient.query("select * from productinstances where product_id = $1 and current_status = 'Available'",[id]);
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

exports.search = function(str, cid, cb, errorCb){
	//cid: 0 = search all
	var searchWords = str.toLowerCase().split(' ');
	//Build query
	var queryStr = "select * from products WHERE ";


	if(cid!=0){
		queryStr += "categoryId = "+cid+" AND ";
	}

	//Search name
	queryStr += "((LOWER(name) LIKE '%"+searchWords[0]+"%'";
	for(i = 1; i < searchWords.length; i++){
		queryStr += " AND LOWER(name) LIKE '%"+searchWords[i]+"%'";
	}
	queryStr+=')';

	//Search description

	queryStr += "OR (LOWER(description) LIKE '%"+searchWords[0]+"%'";
	for(i = 1; i < searchWords.length; i++){
		queryStr += " AND LOWER(description) LIKE '%"+searchWords[i]+"%'";
	}
	queryStr+="))";

	//Execute query
	var query = dbClient.query(queryStr);
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
	var query = dbClient.query("SELECT p.*, (SELECT COUNT(*) AS maxQuantity FROM productinstances WHERE product_id=p.pid AND current_status='Available') FROM products AS p WHERE categoryId = $1",[cid]);

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
	console.log(product);
	var quantity = product.quantity;
	delete product.quantity;

	var queryParams = Utils.shallowObjToQuery(product);
	var query = dbClient.query("insert into products " + queryParams.string +" returning pid" , queryParams.args);

	query.on('error',function(e){
		console.log(e);
		errorCb(e);
	})

	query.on('end',function(e){
		//get the id
		var insertedRowId = (e.rows.length > 0)? e.rows[0].pid : null;

		console.log(e);
		if(insertedRowId){
			var query = "insert into productinstances (product_id, current_status, rating) values ";
			var values = [];
			for(var i =0; i != quantity; i++){
				values.push(("(" + insertedRowId + ", 'Available' , 5)"));
			}
			query += values.join(',');
			console.log("productinstances: " , query);
			dbClient.query( query, function(err, results) {
				if (err) {
					console.log(err);
					errorCb(err);
				}else{
					cb(insertedRowId);
				}
			});
		} else {
			cb(null);
		}
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

exports.setSold = function(instance_id, cb, errorCb) {
    var query = "UPDATE productinstances SET current_status='Sold' WHERE instance_id=$1";
    dbClient.query(query, [instance_id], function(err, results) {
        if (err) {
            errorCb(err);
        }

        cb(true);
    });
};
