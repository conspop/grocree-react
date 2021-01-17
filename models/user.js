const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const Schema = mongoose.Schema;

const locationsSchema = new Schema({
  item: String,
  house: String,
  store: String
})

const staplesSchema = new Schema({
  item: String,
  minimum: String
})

const listsSchema = new Schema({
  name: String,
  items: [{
    item: String,
    house: String,
    store: String,
    sources: [{
      source: String,
      amount: String
    }],
    checked: Boolean
  }]
})

const recipesSchema = new Schema({
  name: String,
  items: [{
    item: String,
    amount: String
  }]
})

const userSchema = new Schema({
  username: {type: String, required:true, unique: true, dropDups: true},
  password: String,
  staples: [staplesSchema],
  recipes: [recipesSchema],
  lists: [listsSchema]
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb);
};

module.exports = mongoose.model('User', userSchema);