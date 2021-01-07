var express = require('express');
var router = express.Router();
var controller = require('../controller/registerStudent')


/* GET student page. */
router.get('/', function(req, res, next) {
  res.render('registerStudent', { title: 'Express' });
});

router.post('/register/', function(req, res, next) {
    controller.register(req,res);
  });
  
module.exports = router;
