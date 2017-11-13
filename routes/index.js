const express = require('express');
const bodyParser = require('body-parser');
const models = require('../models');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const searchController = require('../controllers/searchController');


/* GET home page. */
router.get('/', searchController.famousSearch);

module.exports = router;
