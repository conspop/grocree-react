const express = require('express');
const router = express.Router();
const listsCtrl = require('../../controllers/lists');

router.get('/', listsCtrl.index);
// router.get('/:listName', listsCtrl.show)
// router.delete('/', listsCtrl.deleteList)
// router.delete('/:listName', listsCtrl.deleteListItem)
// router.put('/', listsCtrl.updateList)
// router.put('/:listName', listsCtrl.updateListItem)
router.post('/', listsCtrl.create)
// router.post('/:listName', listsCtrl.addListItem)


module.exports = router;