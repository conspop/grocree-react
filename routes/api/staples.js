const express = require('express');
const router = express.Router();
const staplesCtrl = require('../../controllers/staples');

router.get('/', staplesCtrl.index);

module.exports = router;