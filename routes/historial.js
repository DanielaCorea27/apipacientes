const express = require('express');
const {getHistoriales, addHistorial, updateHistorial, deleteHistorial, getHistorialById} = require('../controllers/historialController');
const router = express.Router();

//Rutas para historiales
router.get('/', getHistoriales);
router.post('/', addHistorial);
router.put('/:id', updateHistorial);
router.delete('/:id', deleteHistorial);
router.get('/:id', getHistorialById);

module.exports = router;