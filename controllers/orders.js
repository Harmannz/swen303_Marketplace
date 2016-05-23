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

router.post('/:orderId/return/:instance_id', function(req,res){
	var orderId = req.params.orderId;
	var instance_id = req.params.instance_id;
	console.log("POST /orders/"+orderId+"/return/"+instance_id);
	Orders.returnProduct(orderId, instance_id,function(success){
		return res.json({success: success});
	},function(err){
		console.log(err);
	})
})

module.exports = router
