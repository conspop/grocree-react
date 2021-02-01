const express = require('express');
const router = express.Router();
const listsCtrl = require('../../controllers/lists');

router.get('/', listsCtrl.index);
// router.get('/:recipeName', recipesCtrl.show)
// router.delete('/', recipesCtrl.deleteRecipe)
// router.delete('/:recipeName', recipesCtrl.deleteRecipeItem)
// router.put('/', recipesCtrl.updateRecipe)
// router.put('/:recipeName', recipesCtrl.updateRecipeItem)
// router.post('/', recipesCtrl.create)
// router.post('/:recipeName', recipesCtrl.addRecipeItem)


module.exports = router;