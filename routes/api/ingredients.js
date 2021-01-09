const express = require('express');
const router = express.Router();
const ingredientsCtrl = require('../../controllers/ingredients');

router.get('/', ingredientsCtrl.index);

module.exports = router;