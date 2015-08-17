var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/u/:user', function(req, res) {
  res.send('JUST FOR YOU');
});

router.post('/post', function(req, res) {

});

router.get('/reg', function(req, res) {

});

router.post('/reg', function(req, res) {

});

router.get('/login', function(req, res) {

});

router.post('/login', function(req, res) {

});

router.get('/logout', function(req, res) {

});


module.exports = router;
