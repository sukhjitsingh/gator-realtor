const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

router.get('/logout', agentController.logout);


module.exports = router;