const Item = require('../models/item');

module.exports = {
  addItem,
  changeName
}

async function addItem(userId, itemName) {
  const existingItem = Item.find({user: userId, item: itemName})
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

async function changeName(itemId, newName) {
  const existingItem = await Item.findById(itemId)
  existingItem.name = newName
  await existingItem.save()
}

