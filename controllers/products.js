var express = require('express')
  , router = express.Router()
  , Product = require('../models/products')

router.get('/', function(req,res){
	console.log("GET /products");
	Product.getAll(function(err, products){
		res.json(products);
	})
})

router.get('/:id', function(req,res){
	var id = req.params.id;
	console.log("GET /products/" + id);

	Product.get(id,function(err, product){
		res.json(product);
	})
})


module.exports = router