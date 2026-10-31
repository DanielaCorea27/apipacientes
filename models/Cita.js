// models/Cita.js
const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    motivo: {
        type: String
    }
});

module.exports = mongoose.model('Cita', citaSchema);