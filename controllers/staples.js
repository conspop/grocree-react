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
  user.staples.push({item, minimum})
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

