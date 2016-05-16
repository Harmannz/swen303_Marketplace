var express = require('express')
  , router = express.Router()
  , Orders = require('../models/orders');

router.get('/:orderId', function(req,res){
	console.log("GET /orders");
	var orderId = req.params.orderId;
	Orders.fromId(orderId,function(orders){
		res.json(orders);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

module.exports = router
