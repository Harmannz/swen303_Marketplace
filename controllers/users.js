var express = require('express')
  , router = express.Router()
  , Users = require('../models/users')

/*Add a new user to the database*/
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

/*Get user based on username or email*/
router.get('/:id', function(req,res){
	console.log('GET api/users/:username or email');
	var identifier = req.params.id;
	console.log(identifier);

	Users.fromIdentifier(identifier,function(user){
		res.json(user);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

module.exports = router