const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const searchController = require('../controllers/searchController');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET search listing. */
router.post('/', urlencodedParser, searchController.porcessSearch);

module.exports = router;
