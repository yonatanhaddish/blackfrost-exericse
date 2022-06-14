const express = require('express');

router = express.Router();

indexController = require('../controllers/indexController');

router.get('/', indexController.getScriptsUtxos);

module.exports = router;