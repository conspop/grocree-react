const User = require('../models/user');

module.exports = {
  index,
  create,
  deleteStaple
}

async function index(req, res) {
  const {staples} = await User.findById(req.user._id)
  res.json(staples)
}

async function create(req, res) {
  const {item, minimum} = req.body
  const user = await User.findById(req.user._id)
  const {items, staples} = user
  // add item to staples
  staples.push({item, minimum})
  // if new item, add to items as well
  const isInItems = items.filter(itemsItem => itemsItem.name === item).length > 0
  if (!isInItems) {
    items.push({name: item})
  }
  await user.save()
  res.json('ok')
}

async function deleteStaple(req, res) {
  const {index} = req.body
  const user = await User.findById(req.user._id)
  user.staples.splice(index, 1)
  await user.save()
  res.json('ok')
}

