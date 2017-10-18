const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next) {
  response.render('index', {title: 'Homepage'})
});

module.exports = router;
