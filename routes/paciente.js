const express = require('express');
const {getPacientes, addPaciente, updatePaciente, deletePaciente, getPacienteById} = require('../controllers/pacienteController');
const router = express.Router();

//Rutas para pacientes
router.get('/', getPacientes);
router.post('/', addPaciente);
router.put('/:id', updatePaciente);
router.delete('/:id', deletePaciente);
router.get('/:id', getPacienteById);

module.exports = router;