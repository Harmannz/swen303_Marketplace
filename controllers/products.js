var express = require('express')
  , router = express.Router()
  , Product = require('../models/products')

router.get('/', function(req,res){
	console.log("GET /products");
	Product.getAll(function(products){
		res.json(products);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

router.get('/:id', function(req,res){
	var id = req.params.id;
	console.log("GET /products/" + id);

	Product.get(id,function(product){
		res.json(product);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

var processError =  function(error,res){
	console.log(error);
	//TODO analyse error send relevant code
	//alternatively can pass an error callback funtion to model
	res.sendStatus(500); 
}

module.exports = router