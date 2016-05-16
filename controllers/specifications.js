var express = require('express')
  , router = express.Router()
  , specdb = require('../models/specifications')

router.get('/:pid', function(req,res){
	console.log("GET /specifications/"+pid);
	specdb.getSpecs(pid, function(specs){
		res.json(specs);
	}, function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

module.exports = router