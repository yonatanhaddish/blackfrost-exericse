const express = require('express');

router = express.Router();

indexController = require('../controllers/indexController');

router.get('/api/transaction/:id', indexController.transactionIdUtxos);
router.get('/api/account/:id', indexController.accountInfo);
router.get('/api/address/:id', indexController.getScriptUtxo);
router.get('/api/test/:id', indexController.getInfoTest);


module.exports = router;