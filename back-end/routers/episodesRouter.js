const express = require('express');
const router = express.Router({ mergeParams: true });
const episodesController = require('../controllers/episodesController');

// Endpoint per ottenere tutti gli episodi

// index
router.get('/', episodesController.index);

// show
router.get('/:episode', episodesController.show);

// store
router.post('/', episodesController.store);

// update
router.put('/:episode', episodesController.update);

// modify
router.patch('/:episode', episodesController.modify);

// destroy
router.delete('/:episode', episodesController.destroy);

module.exports = router;