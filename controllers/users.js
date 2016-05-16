var express = require('express')
  , router = express.Router()
  , Users = require('../models/users')

router.post('/', function(req,res){
	console.log('POST api/users')
	var user = req.body;
	Users.addUser(user,function(){
		res.sendStatus(201);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

module.exports = router