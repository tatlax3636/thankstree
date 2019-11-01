var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('../public/index.html');
});

router.get('/about', function(req, res, next){
  res.sendFile('../public/about.html')
})

module.exports = router;
