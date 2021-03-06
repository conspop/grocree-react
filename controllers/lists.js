const User = require('../models/user');
const itemsHelper = require('./itemsHelper')

module.exports = {
  index,
  show,
  create,
  deleteList,
  updateList,
  // addListItem,
  // deleteListItem,
  // updateListItem
}

async function index(req, res) {
  const {lists} = await User.findById(req.user._id)
  res.json(lists)
}

async function show(req, res) {
  console.log('got here')
  const {lists} = await User.findById(req.user._id).populate('lists.items.item')
  const list = lists.find(list => list.name.toLowerCase() === req.params.listName.replace('-', ' '))
  res.json(list)
}

async function create(req, res) {
  const {newListName} = req.body
  const user = await User.findById(req.user._id)
  user.lists.push({name: newListName})
  await user.save()
  res.end()
}

async function deleteList(req, res) {
  const {index} = req.body
  const user = await User.findById(req.user._id)
  user.lists.splice(index, 1)
  await user.save()
  res.end()
}

async function updateList(req, res) {
  const {index, newName} = req.body
  const user = await User.findById(req.user._id)
  user.lists[index].name = newName
  await user.save()
  res.end()
}

// async function addRecipeItem(req, res) {
//   const {newItem, newAmount} = req.body
//   const user = await User.findById(req.user._id)
//   const recipe = user.recipes.find(recipe => recipe.name.toLowerCase() === req.params.recipeName.replace('-', ' '))
  
//   // if new item, add to items model
//   const itemObject = await itemsHelper.addItem(req.user._id, newItem)

//   // add to recipe in db
//   recipe.items.push({
//     item: itemObject._id,
//     amount: newAmount
//   })
//   await user.save()
//   res.end()
// }

// async function deleteRecipeItem(req, res) {
//   const {index} = req.body
//   const user = await User.findById(req.user._id)
//   const recipe = user.recipes.find(recipe => recipe.name.toLowerCase() === req.params.recipeName.replace('-', ' '))
//   console.log(recipe)

//   recipe.items.splice(index, 1)

//   await user.save()
//   res.end()
// }

// async function updateRecipeItem(req, res) {
//   const {index, newName, newAmount} = req.body
//   const user = await User.findById(req.user._id)
//   const recipe = user.recipes.find(recipe => recipe.name.toLowerCase() === req.params.recipeName.replace('-', ' '))
  
//   // if new name, change name in item model
//   if (newName) {
//     recipe.items[index].item = await itemsHelper.changeName(recipe.items[index].item, newName, req.user._id)
//     await user.save()
//   }
//   if (newAmount) {
//     recipe.items[index].amount = newAmount
//     await user.save()
//   }
//   res.end()
// }

