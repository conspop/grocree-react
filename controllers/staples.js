const User = require('../models/user');

module.exports = {
  index
}

async function index(req, res) {
  const {staples} = await User.findById(req.user._id)
  res.json(staples)
}

