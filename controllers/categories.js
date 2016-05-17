var express = require('express')
  , router = express.Router()
  , Utils = require('../models/utils')
  , CategoryDB = require('../models/category')

router.get('/', function(req,res){
	console.log("GET /categories");
	Utils.getCategories(function(categories){
		res.json(categories);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

router.get('/:cid', function(req,res){
	var cid = req.params.cid;
	console.log("GET /categories/" + cid);
	CategoryDB.get(cid, function(categories){
		res.json(categories);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

module.exports = router