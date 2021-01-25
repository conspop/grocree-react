const User = require('../models/user');
const itemsHelper = require('./itemsHelper')

module.exports = {
  index,
  create,
  deleteStaple,
  updateStaple
}

async function index(req, res) {
  const {staples} = await User.findById(req.user._id).populate('staples.item')
  res.json(staples)
}

async function create(req, res) {
  const {newStapleItem, newStapleMinimum} = req.body

  // if new item, add to items model
  const itemObject = await itemsHelper.addItem(req.user._id, newStapleItem)
  console.log(itemObject)

  // add item to staples
  const user = await User.findById(req.user._id)
  const {staples} = user
  staples.push({item: itemObject._id, minimum: newStapleMinimum})
  await user.save()
  console.log(user)
  res.end()
}

async function deleteStaple(req, res) {
  const {index} = req.body
  const user = await User.findById(req.user._id)
  user.staples.splice(index, 1)
  await user.save()
  res.json('ok')
}

async function updateStaple(req, res) {
  const {index, newName, newMinimum} = req.body
  const user = await User.findById(req.user._id)
  // if new name, change name in item model
  if (newName) {
    itemsHelper.changeName(user.staples[index].item, newName)
  }
  if (newMinimum) {
    user.staples[index].minimum = newMinimum
    await user.save()
  }
  res.end()
}

