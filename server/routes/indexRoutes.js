const express = require('express');

router = express.Router();

indexController = require('../controllers/indexController');

router.get('/api/transaction/:id', indexController.getScriptsUtxos);

module.exports = router;