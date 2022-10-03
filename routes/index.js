var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/Projects', function(req, res, next) {
  res.render('projects', { title: 'Express' });
});



router.get('/Services', function(req, res, next) {
  res.render('services', { title: 'Express' });
});


router.get('/About', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/Contact', function(req, res, next) {
  res.render('contact');
});


module.exports = router;
