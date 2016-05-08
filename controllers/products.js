var express = require('express')
  , router = express.Router()
  , Product = require('../models/products')

router.get('/', function(req,res){
	console.log("GET /products");
	Product.getAll(function(err, products){
		if(!err){
			res.json(products);
		} else {
			processError(err,res);
		}
	})
})

router.get('/:id', function(req,res){
	var id = req.params.id;
	console.log("GET /products/" + id);

	Product.get(id,function(err, product){
		if(!err){
			res.json(product);
		} else {
			processError(err,res);
		}
	})
})

function processError(error,res){
	console.log(error);
	//TODO analyse error send relevant code
	//alternatively can pass an error callback funtion to model
	res.sendStatus(500); 
}

module.exports = router