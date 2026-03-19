const express = require('express');
const router = express.Router({ mergeParams: true });
const watchHistory = require('../controllers/watchHistoryController');

router.get('/', watchHistory.index);
router.post('/', watchHistory.store);
router.delete('/', watchHistory.destroy);

module.exports = router;