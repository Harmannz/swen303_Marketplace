var dbClient = require('./db')
   ,Utils = require('./utils')
   ,fs = require('fs')
   ,_ = require('lodash');

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

exports.addSpecs = function(spec,cb,errCb){
	
	var product_id = spec.productId;
	var specData = [];
	_.forEach(spec.specs,function(s){
		specData.push("(" + product_id + ",'" + s.name + "','" + s.value +"')");
	})
	var items = specData.join(",");
	console.log("Adding specs",items);
	var query = dbClient.query("insert into specifications (product_id, name, value) values " + items);

	query.on('end',function(end){
		cb(end);
	});

	query.on('error',function(err){
		errCb(err);
	});
}
