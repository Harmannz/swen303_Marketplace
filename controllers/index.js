var express = require('express')
  , router = express.Router()
  , path = require('path')

//products route
router.use('/api/products', require('./products'))
//router.use('api/products', require('./products'))

router.get('*', function(req, res) {
	res.sendFile(path.resolve('src/index.html'));
});

module.exports = router