var express = require('express');
var router = express.Router();
var controller = require('../controller/registerStudent')


/* GET student page. */
router.get('/', function(req, res) {
  res.render('registerStudent', { title: 'Express' });
});

router.post('/register/', function(req, res) {
    controller.register(req,res);
    next();
  });
module.exports = router;
