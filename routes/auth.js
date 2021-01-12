var express = require('express');
var router = express.Router();
const authController = require('../controller/auth');


router.get('/', function(req, res, next) {
  res.render('auth', { title: 'Express' });
});
router.post('/register/', function(req,res, next){
    authController.register(req,res);
});
router.post('/login/', function(req,res, next){
    authController.login(req,res);
});

module.exports = router;