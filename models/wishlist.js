//	dbClient = require('./db');
var _ = require('lodash');

exports.get = function(userId,cb){
	//TODO db query goes here
	cb(null,exampleWishlist);
}

exports.addProducts = function(userId, products, cb){
	//TODO replace with db call
	exampleWishlist.productIds = _.union(exampleWishlist.productIds,products);

	cb(null);
}

//example data

var exampleWishlist = {
		userId : 10,
		productIds: [7000,472,4892]
	};