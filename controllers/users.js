var express = require('express')
  , router = express.Router()
  , Users = require('../models/users')
  , bcrypt = require('bcrypt')
  , Orders = require('../models/orders');
;

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

	Users.fromUsername(identifier,function(user){
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

/*Get all orders for a given user*/
router.get('/:userId/orders', function(req,res){
	console.log("GET /orders");
	var userId = req.params.userId;
	Orders.fromUser(userId,function(orders){
		res.json(orders);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

module.exports = router
