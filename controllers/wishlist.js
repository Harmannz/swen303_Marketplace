var express = require('express')
  , router = express.Router()
  , Wishlist = require('../models/wishlist')

router.get('/:userId', function(req,res){
	var userId = req.params.userId;
	console.log("GET /wishlist/" + userId);

	Wishlist.get(userId,function(products){
		res.json(products);
	},function(err){
		res.sendStatus(500);
	})
})

router.post('/:userId/:productId', function(req,res){
	var userId = req.params.userId;
	var productId = req.params.productId;
	console.log("POST /wishlist/" + userId);

	Wishlist.addProduct(userId, productId, function(success){
		if(success) res.sendStatus(201);
		else res.sendStatus(400);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

router.delete('/:userId/:productId', function(req,res){
	var userId = req.params.userId;
	var productId = req.params.productId;
	console.log("DELETE /wishlist/" + userId);

	Wishlist.removeProduct(userId, productId, function(){
		res.sendStatus(200);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

module.exports = router