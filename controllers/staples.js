const User = require('../models/user');

module.exports = {
  index,
  create
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

