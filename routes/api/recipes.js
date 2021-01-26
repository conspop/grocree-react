const express = require('express');
const router = express.Router();
const recipesCtrl = require('../../controllers/recipes');

router.get('/', recipesCtrl.index);
router.get('/:recipeName', recipesCtrl.show)
router.delete('/', recipesCtrl.deleteRecipe)
router.delete('/:recipeName', recipesCtrl.deleteRecipeItem)
router.put('/', recipesCtrl.updateRecipe)
router.post('/', recipesCtrl.create)
router.post('/:recipeName', recipesCtrl.addRecipeItem)


module.exports = router;