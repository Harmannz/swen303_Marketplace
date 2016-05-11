var express = require('express')
  , router = express.Router()
  , Utils = require('../models/utils')

router.get('/', function(req,res){
	console.log("GET /categories");
	Utils.getCategories(function(categories){
			res.json(categories);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

module.exports = router