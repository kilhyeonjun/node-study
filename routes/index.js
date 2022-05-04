const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/client', function(req, res, next) {
  res.render('client');
});

router.get('/sketcher', function(req, res, next) {
  res.render('sketcher');
});

module.exports = router;
