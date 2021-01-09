const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/games');

router.get('/getstandings', gamesCtrl.getStandings);

router.post('/add', gamesCtrl.addGame);

module.exports = router;