const express = require('express');
const router = express.Router();
const staplesCtrl = require('../../controllers/staples');

router.get('/', staplesCtrl.index);

router.post('/', staplesCtrl.create)

module.exports = router;