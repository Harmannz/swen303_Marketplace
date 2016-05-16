var dbClient = require('./db');

exports.fromUser = function(userId,cb,errCb){
	var query = dbClient.query('select * from orders where user_id = $1',[userId]);
	var rows = [];

	query.on('row',function(row) {
		rows.push(row);
	})

	query.on('end',function(summary) {
		cb(rows);
	})

	query.on('error',function(data) {
		errCb(data);
	})
}

exports.fromId = function(orderId,cb,errCb){
	var query = dbClient.query('select products.* from productinorder, products where order_id = $1 and product_id = pid',[orderId]); 
	var rows = [];

	query.on('row',function(row) {
		rows.push(row);
	})

	query.on('end',function(summary) {
		cb(rows);
	})

	query.on('error',function(data) {
		errCb(data);
	})
}