var express = require('express');
var router = express.Router();
var controller = require('../controller/registerStudent')
/* GET student list page. */
router.get('/', function(req, res, next) {
  controller.getStudents(req,res)
});

module.exports = router;
