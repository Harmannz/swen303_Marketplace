var express = require('express')
  , router = express.Router()
  , Users = require('../models/users')
  , bcrypt = require('bcrypt');

/*Add a new user to the database*/
router.post('/', function(req,res){
	console.log('POST api/users')
	var user = req.body;
	Users.addUser(user,function(result){
        var user = result.rows[0];
        delete user.password;
		res.status(201).json(user);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

/*Get user based on username or email*/
router.post('/:id', function(req,res){
    var password = req.body.password;
	console.log('GET api/users/:username or email');
	var identifier = req.params.id;
	console.log(identifier);

	Users.fromIdentifier(identifier,function(user){
        var passwordValid = bcrypt.compareSync(password, user.password);
        if (passwordValid) {
            delete user.password;
            res.json(user);
        } else {
            res.sendStatus(400);
        }
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

module.exports = router
