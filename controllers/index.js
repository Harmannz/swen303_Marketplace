var express = require('express')
  , router = express.Router()
  , path = require('path')
  , bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
//router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())

//products route
router.use('/api/products', require('./products'))

router.use('/api/wishlist', require('./wishlist'))

router.get('*', function(req, res) {
	res.sendFile(path.resolve('build/index.html'));
});

module.exports = router
