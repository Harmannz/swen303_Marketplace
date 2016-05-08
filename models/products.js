//var dbClient = require('./db')

exports.get = function(id, cb){
	//TODO db query goes here
	cb(null,exampleProduct);
}

exports.getAll = function(cb){
	//TODO db query goes here
	cb(null,[exampleProduct,exampleProduct,exampleProduct,exampleProduct]);
}

//example initial testing / front end
var exampleProduct = {
		productId: 7000,
		name: "Test Product",
		Description: "An amazing thing, the likes of which you have never seen",
		specification:{
			color:"pink",
			rpm: "5700",
			Mbps: "800"
		},
		tags:['tag1','tag2'],
		category: "Hard Drives",
		ratingReview: 0.8,
		price: {
			value:200,
			currency:"NZD"
		},
		borrowable: true,
		dimensions: {
			width:200,
			height:400,
			weight:400
		},
		quantity: 30,
	};