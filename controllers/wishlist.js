var express = require('express')
  , router = express.Router()
  , Wishlist = require('../models/wishlist')

router.get('/:userId', function(req,res){
	var userId = req.params.userId;
	console.log("GET /wishlist/" + userId);

	Wishlist.get(userId,function(err, products){
		if(!err){
			res.json(products);
		}else{
			processError(err,res);
		}
	})
})

router.put('/:userId', function(req,res){
	var userId = req.params.userId;
	var products = req.body;
	console.log("POST /wishlist/" + userId);
	console.log(products);

	Wishlist.addProducts(userId, products, function(err){
		if(!err){
			res.sendStatus(201);
		}else{
			processError(err,res);
		}
	})
})

function processError(error,res){
	console.log(error);
	//TODO analyse error send relevant code
	//alternatively can pass an error callback function to model
	res.sendStatus(500); 
}


module.exports = router