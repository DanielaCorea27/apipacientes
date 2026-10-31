//importamos mi modelo de citas
const Cita = require('../models/Cita');

//Funcion para traer todos las citas
exports.getCitas = async (req, res) => {
    try {
        const citas = await Cita.find().populate('paciente', 'nombre telefono');
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas' });
    }
};

//Funcion para crear un nueva cita
const Paciente = require('../models/Paciente');

exports.addCita = async (req, res) => {
    const { paciente, fecha, hora, motivo } = req.body;
    try {
        const existe = await Paciente.findById(paciente);
        if (!existe) {
            return res.status(404).json({ message: 'El paciente no existe' });
        }
        const cita = new Cita({ paciente, fecha, hora, motivo });
        await cita.save();
        res.status(201).json(cita);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la cita', error: error.message });
    }
};

//Funcion para actualizar una cita
exports.updateCita = async (req, res) => {
    const { id } = req.params;
    const { paciente, fecha, hora, motivo } = req.body;
    try {
        const cita = await Cita.findByIdAndUpdate(id, { paciente, fecha, hora, motivo },{ returnDocument: 'after' });
        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }else{
            res.status(200).json(cita);
        }   
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la cita' });
    }
};

//Función para eliminar una cita
exports.deleteCita = async (req, res) => {
    const { id } = req.params;
    try {
        const cita = await Cita.findByIdAndDelete(id);
        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.status(200).json({ message: 'Cita eliminada' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar la cita' });
    }
};
exports.getCitaById = async (req, res) => {
    try {
        const cita = await Cita.findById(req.params.id);
        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json(cita);
    } catch (error) {
        res.status(400).json({ message: 'Id inválido' });
    }
};