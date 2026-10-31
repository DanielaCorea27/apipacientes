const express = require('express');
const {getCitas, addCita, updateCita, deleteCita, getCitaById} = require('../controllers/citasController');
const router = express.Router();

//Rutas para citas
router.get('/', getCitas);
router.post('/', addCita);
router.put('/:id', updateCita);
router.delete('/:id', deleteCita);
router.get('/:id', getCitaById);

module.exports = router;