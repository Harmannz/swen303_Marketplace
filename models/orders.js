var dbClient = require('./db')
   ,_ = require('lodash');

//Get all current orders
exports.fromUser = function(userId,cb,errCb){
	var query = dbClient.query('select * from orders where user_id = $1 AND status == Rented',[userId]);
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

//Get all orders current and previous
exports.historyFromUser = function(userId,cb,errCb){
	var query = "SELECT c.*, d.* FROM orders AS a INNER JOIN productinorder AS b ON a.order_id=b.order_id INNER JOIN productinstances AS c ON b.instance_id=c.instance_id INNER JOIN products AS d ON c.product_id=d.pid WHERE a.user_id=$1 AND current_status != 'Rented'";
	var query = dbClient.query(query,[userId]);
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


function updateToRented(product,cb){

	var qstring = "update productinstances set current_status = 'Rented', clocked_out = now(), due_back = now() + '"+product.rentDays+" days'::interval where instance_id in (select instance_id from productinstances where current_status = 'Available' and product_id = $1 limit $2) returning instance_id";

	var query = dbClient.query(qstring,[product.id,product.quantity]); 

	var rows = [];
	query.on('row',function(row){
		rows.push(row);
	})

	query.on('end',function(summary) {
		console.log('updateToRented done');
		cb(rows);
	})

	query.on('error',function(log) {
		console.log(log);
	})
}

function updateToReturned(instance_id,cb){

	var qstring = "UPDATE productinstances SET current_status = 'Returned', clocked_in = now() WHERE instance_id==$1";

	var query = dbClient.query(qstring,[instance_id]); 

	var rows = [];
	query.on('row',function(row){
		rows.push(row);
	})

	query.on('end',function(summary) {
		console.log('updateToRented done');
		cb(rows);
	})

	query.on('error',function(log) {
		console.log(log);
	})
}

exports.addNew = function(orderData, cb, errCb){
	
	console.log("userid: " + orderData.userid);
	var products = orderData.toRent;
	var totalQuantity = 0;
	var processedProducts = [];
	_.forEach(products,function(o){
		processedProducts.push({
			quantity: o.quantity,
			id: o.pid,
			rentDays: o.rentdays
		});
		//for checking later
		totalQuantity+=o.quantity;
	})

	//process the products
	var toUpdateCount = processedProducts.length;
	var results = [];
	//update the instances to rented , include 
	_.forEach(processedProducts,function(o){
		updateToRented(o,function(rows){
			//add all the modified product instance rows ids to the results
			_.forEach(rows, function(r){
				results.push(r.instance_id);
			});
			toUpdateCount --;

			//finished all products
			if(toUpdateCount == 0) {
				
				console.log("finished");
				_.forEach(results,function(r){
					console.log(r);
				});

				if(results.length == totalQuantity){
					console.log("Matched expected number of rows, yay");
					createOrder({
						user_id: orderData.userid,
						product_instances: results
					},function(orderId){
						if(orderId){
							//create order to productinstances
							createOrderToInstance(orderId,results,function(){
								cb(orderId);	
							})
							
						}else{
							console.log("Couldnt create order");
							errCb("couldnt create order");
						}
					})
				} else {
					console.log("Number of rows didnt match expected quantity", totalQuantity, results.length);
					errCb("Number of rows didnt match expected quantity");
				}
				
			}
		})
	})

	//


	//cb(123);
}

function createOrderToInstance(orderId,instance_ids,cb,errCb){
	var qstring = "insert into productinorder (order_id, instance_id) values ($1, $2)";

	var numInstancesToCreate = instance_ids.length;

	var queryResults = [];
	//multiple queries
	_.forEach(instance_ids,function(inst){
		var query = dbClient.query(qstring,[orderId,inst]);

		query.on('end',function(e){
			queryResults.push(e);
			numInstancesToCreate--;

			if(numInstancesToCreate == 0){
				console.log("created instances");
				cb();
			}
		})
	})
	
}


function createOrder(order,cb){
	console.log("Creating Order");
	var qstring = "insert into orders (user_id, status) values ($1,'Processing') returning order_id";

	var query = dbClient.query(qstring,[order.user_id]); 

	query.on('end',function(summary) {
		console.log('created order');
		orderId = (summary.rows.length > 0)? summary.rows[0].order_id : null;
		cb(orderId);
	})

	query.on('error',function(log) {
		console.log(log);
	})
}
