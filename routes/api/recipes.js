const express = require('express');
const router = express.Router();
const recipesCtrl = require('../../controllers/recipes');

router.get('/', recipesCtrl.index);
router.get('/:recipeName', recipesCtrl.show)
router.delete('/', recipesCtrl.deleteRecipe)
router.post('/', recipesCtrl.create)

module.exports = router;