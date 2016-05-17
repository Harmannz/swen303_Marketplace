var express = require('express')
  , router = express.Router()
  , Products = require('../models/products')

router.get('/', function(req,res){
	console.log("GET /products");
	Products.getAll(function(products){
		res.json(products);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

router.get('/featured', function(req, res) {
	console.log("GET /products/featured");
	Products.getFeaturedProducts(function(products) {
		res.json(products);
	}, function(err) {
		console.log(err);
		res.sendStatus(500);
	});
});

//Get items in category
router.get('/category/:cid', function(req,res){
	var cid = req.params.cid;
	console.log("GET /products/category/" + cid);

	Products.getFromCategory(cid,function(products){
		res.json(products);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

//Search Items in category (0 = All)
router.get('/:cid/:search', function(req,res){
	var cid = req.params.cid;
	var search = req.params.search;

	console.log("SEARCH " + cid + " : "+search)

	console.log("GET /products/category/" + cid + "/"+search);

	Products.search(search, cid,function(products){
		res.json(products);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})

router.get('/:id', function(req,res){
	var id = req.params.id;
	console.log("GET /products/" + id);

	Products.get(id,function(product){
		res.json(product);
	},function(err){
		console.log(err);
		res.sendStatus(500);
	})
})
//new product
router.post('/', function(req,res){
	Products.addNew(req.body,function(product){
		if(product){
			res.status(201).send(product);
		}else{
			res.sendStatus(400);
		}
	},function(err){
		res.sendStatus(400);
	});

})

module.exports = router;
