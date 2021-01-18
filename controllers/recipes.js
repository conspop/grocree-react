const User = require('../models/user');

module.exports = {
  index,
  show,
  create,
  deleteRecipe
}

async function index(req, res) {
  const {recipes} = await User.findById(req.user._id)
  res.json(recipes)
}

async function show(req, res) {
  const {recipes} = await User.findById(req.user._id)
  const recipe = recipes.find(recipe => recipe.name === req.params.recipeName.replace('-', ' '))
  res.json(recipe)
}

async function create(req, res) {
  const {item, minimum} = req.body
  const user = await User.findById(req.user._id)
  user.recipes.push({item, minimum})
  await user.save()
  res.json('ok')
}

async function deleteRecipe(req, res) {
  const {index} = req.body
  const user = await User.findById(req.user._id)
  user.recipes.splice(index, 1)
  await user.save()
  res.json('ok')
}

