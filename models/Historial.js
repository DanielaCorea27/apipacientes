// models/Historial.js
const mongoose = require('mongoose');

const historialSchema = new mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    diagnostico: {
        type: String
    },
    tratamiento: {
        type: String
    },
    notas: {
        type: String
    }
});

module.exports = mongoose.model('Historial', historialSchema);