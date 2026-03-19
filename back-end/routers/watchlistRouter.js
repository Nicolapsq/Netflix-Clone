const express = require('express');
const router = express.Router({ mergeParams: true });
const watchlist = require('../controllers/watchlistController');

router.get('/', watchlist.index);
router.post('/', watchlist.store);
router.delete('/:movieId', watchlist.destroy);

module.exports = router;