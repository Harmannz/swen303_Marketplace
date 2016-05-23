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

router.post('/:userId/update', function(req, res) {
	console.log('POST /update');
	var userId = req.params.userId;
	Users.updateDetails(userId, req.body, function(status) {
		res.json({ success: status });
	}, function(err) {
		console.log(err);
		res.sendStatus(500);
	});
})

router.get('/:userId/selling', function(req, res) {
    console.log('GET /selling');
    var userId = req.params.userId;
    Users.getSelling(userId, function(data) {
        res.json(data);
    }, function(err) {
        console.log(err);
        res.sendStatus(500);
    })
})

/*Get all orders for a given user*/
router.get('/:userId/history', function(req,res){
	console.log("GET /history");
	var userId = req.params.userId;
	Orders.historyFromUser(userId, function(results) {
		res.json(results);
	}, function(err) {
		console.log(err);
		res.sendStatus(500);
	});
})

router.get('/:userId/rented', function(req, res) {
	console.log("GET /rented");
	var userId = req.params.userId;
	Users.getRentedProducts(userId, function(results) {
		res.json(results);
	}, function(err) {
		console.log(err);
		res.sendStatus(500);
	});
})

router.get('/:userId/notifications', function(req, res) {
    console.log("GET /notifications");
    var userId = req.params.userId;
    Users.checkForNotifications(userId, function(notifications) {
        res.json(notifications);
    }, function(err) {
        console.log(err);
        res.sendStatus(500);
    })
});

module.exports = router
