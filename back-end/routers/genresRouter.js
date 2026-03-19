const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');

// Simulazione di un database di utenti
const genres = require("../arrayDiEsempio");

// Endpoint per ottenere tutti i generi

// index
router.get('/', genresController.index);

// show
router.get('/:id', genresController.show);

// store
router.post('/', genresController.store);

// update
router.put('/:id', genresController.update);

// destroy
router.delete('/:id', genresController.destroy);

module.exports = router;