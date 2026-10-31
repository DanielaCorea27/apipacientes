//importamos mi modelo de historial
const Historial = require('../models/Historial');

//Funcion para traer todos los historiales
exports.getHistoriales = async (req, res) => {
    try {
        const historiales = await Historial.find().populate('paciente', 'nombre telefono');
        res.json(historiales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los historiales' });
    }
};

//Funcion para crear un nuevo historial
const Paciente = require('../models/Paciente');

exports.addHistorial = async (req, res) => {
    const { paciente, fecha, diagnostico, tratamiento, notas } = req.body;
    try {
        const existe = await Paciente.findById(paciente);
        if (!existe) {
            return res.status(404).json({ message: 'El paciente no existe' });
        }
        const historial = new Historial({ paciente, fecha, diagnostico, tratamiento, notas });
        await historial.save();
        res.status(201).json(historial);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el historial', error: error.message });
    }
};

//Funcion para actualizar un historial
exports.updateHistorial = async (req, res) => {
    const { id } = req.params;
    const { paciente, fecha, diagnostico, tratamiento, notas } = req.body;
    try {
        const historial = await Historial.findByIdAndUpdate(id, { paciente, fecha, diagnostico, tratamiento, notas }, { returnDocument: 'after' });
        if (!historial) {
            return res.status(404).json({ message: 'Historial no encontrado' });
        }else{
            res.status(200).json(historial);
        }   
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el historial' });
    }
};

//Función para eliminar un historial
exports.deleteHistorial = async (req, res) => {
    const { id } = req.params;
    try {
        const historial = await Historial.findByIdAndDelete(id);
        if (!historial) {
            return res.status(404).json({ message: 'Historial no encontrado' });
        }
        res.status(200).json({ message: 'Historial eliminado' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el historial' });
    }
};

exports.getHistorialById = async (req, res) => {
    try {
        const historial = await Historial.findById(req.params.id);
        if (!historial) {
            return res.status(404).json({ message: 'Historial no encontrado' });
        }
        res.json(historial);
    } catch (error) {
        res.status(400).json({ message: 'Id inválido' });
    }
};