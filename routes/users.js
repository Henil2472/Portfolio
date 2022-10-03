var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('re====e');
  res.render('index.html')
});

module.exports = router;
