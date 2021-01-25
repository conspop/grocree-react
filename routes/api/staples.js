const express = require('express');
const router = express.Router();
const staplesCtrl = require('../../controllers/staples');

router.get('/', staplesCtrl.index);
router.delete('/', staplesCtrl.deleteStaple)
router.put('/', staplesCtrl.updateStaple)
router.post('/', staplesCtrl.create)

module.exports = router;