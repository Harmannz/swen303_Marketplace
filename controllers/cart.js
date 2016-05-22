var express = require('express')
  , router = express.Router()
  , Orders = require('../models/orders')

//new product
router.post('/', function(req,res){
	 Orders.addNew(req.body,function(orderid){
		if(orderid){
			res.status(201).send({order_id: orderid});
		}else{
			res.sendStatus(400);
		}
	},function(err){
		res.sendStatus(400);
	});

})

module.exports = router