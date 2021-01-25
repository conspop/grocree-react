const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  home: String,
  store: String
})

module.exports = mongoose.model('Item', itemSchema);