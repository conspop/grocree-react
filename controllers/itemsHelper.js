const { findByIdAndDelete, findById } = require('../models/item');
const Item = require('../models/item');

module.exports = {
  addItem,
  changeName,
}

async function addItem(userId, itemName) {
  console.log(userId)
  console.log(itemName)
  const existingItem = await Item.find({user: userId, name: itemName})
  console.log(existingItem[0])
  if (existingItem[0]) {
    return existingItem[0]
  } else {
    const newItem = new Item({
      user: userId,
      name: itemName
      })
      await newItem.save()
      return newItem
  }
}

async function changeName(itemId, newName, userId) {
  const oldItem = await Item.findById(itemId)
  // check if new name already exists
  const isExistingName = await Item.find({name: newName})
  if (isExistingName.length > 0) {
    // if existing name, pass id of existing item
    return isExistingName[0]._id
  } else {
    // if new name doesn't exist, create and pass new item id
    const newItem = new Item({name: newName})
    newItem.user = userId
    newItem.home = oldItem.home
    newItem.store = oldItem.store
    await newItem.save()
    return newItem._id
  }
}

