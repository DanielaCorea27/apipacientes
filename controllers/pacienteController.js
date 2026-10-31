//importamos mi modelo de pacientes
const Paciente = require('../models/Paciente');

//Funcion para traer todos los pacientes
exports.getPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pacientes' });
    }
};

//Funcion para crear un nuevo paciente
exports.addPaciente = async (req, res) => {
    const {nombre, edad, sexo, fecha_nacimiento, direccion, telefono, email } = req.body;
    const paciente = new Paciente({ nombre, edad, sexo, fecha_nacimiento, direccion, telefono, email });
    try {
        await paciente.save();
        res.status(201).json(paciente);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el paciente' });
    }
};

//Funcion para actualizar un paciente
exports.updatePaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, edad, sexo, fecha_nacimiento, direccion, telefono, email } = req.body;
    try {
        const paciente = await Paciente.findByIdAndUpdate(id, { nombre, edad, sexo, fecha_nacimiento, direccion, telefono, email }, { returnDocument: 'after' });
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }else{
            res.status(200).json(paciente);
        }   
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el paciente' });
    }
};

//Función para eliminar un paciente
const Cita = require('../models/Cita');
const Historial = require('../models/Historial');

exports.deletePaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findByIdAndDelete(id);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        // Borrar en cascada
        await Cita.deleteMany({ paciente: id });
        await Historial.deleteMany({ paciente: id });

        res.status(200).json({ message: 'Paciente y sus datos relacionados eliminados' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el paciente', error: error.message });
    }
};
exports.getPacienteById = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.json(paciente);
    } catch (error) {
        res.status(400).json({ message: 'Id inválido' });
    }
};