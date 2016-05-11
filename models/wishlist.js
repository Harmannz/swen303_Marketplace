var db = require('./db')
   , _ = require('lodash');

exports.get = function(userId,cb,errorCb){
	var rows = [];
	var query = db.query('select products.* from wishlist, users, products where userid = uid and pid = productid and uid = $1',[userId]);
	query.on('row',function(r){
		rows.push(r);
	})
	query.on('error',function(e){
		errorCb(e);
	})
	query.on('end',function(summary){
		cb(rows);
	})
}	

exports.addProduct = function(userId, productId, cb, errorCb){
	//insert if doesnt already exist
	var query = db.query('insert into wishlist (userid,productid) select $1, $2 where not exists ( select * from wishlist where userid = $1 and productid = $2)',[userId,productId]);
	
	query.on('error',function(e){
		errorCb(e);
	})

	query.on('end',function(summary){
		cb(summary.rowCount > 0);
	})
}

exports.removeProduct = function(userId, productId, cb, errorCb){
	var query = db.query('delete from wishlist where userid = $1 and productid = $2',[userId,productId]);
	query.on('error',function(err){
		errorCb(err);
	})
	query.on('end',function(data){
		cb(data);
	})
}
