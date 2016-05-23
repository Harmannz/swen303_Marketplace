var express = require('express')
  , router = express.Router()
  , specdb = require('../models/specifications')

router.get('/:pid', function(req,res){
	var pid = req.params.pid;
	console.log("GET /specifications/"+pid);
	specdb.getSpecs(pid, function(specs){
		res.json(specs);
	}, function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

router.post('/', function(req,res){
	var specs = req.body;
	console.log("POST /specifications/");
	specdb.addSpecs(specs, function(){
		res.sendStatus(201);
	}, function(err){
		console.log(err);
		res.sendStatus(500);
	})
})


module.exports = router