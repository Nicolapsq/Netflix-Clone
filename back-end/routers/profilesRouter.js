const express = require('express');
const router = express.Router({ mergeParams: true });
const profilesController = require('../controllers/profilesController');

// Simulazione di un database di utenti
// const profile = require("../arrayDiEsempio");

// Endpoint per ottenere tutti i profili

// index
router.get('/', profilesController.index);

// show
router.get('/:id', profilesController.show);

// store
router.post('/', profilesController.store);

// update
router.put('/:id', profilesController.update);

// modify
router.patch('/:id', profilesController.modify);

// destroy
router.delete('/:id', profilesController.destroy);

module.exports = router;