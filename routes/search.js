const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const searchController = require('../controller/searchController');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET search listing. */
router.post('/', urlencodedParser,searchController.porcessSearch);

module.exports = router;
