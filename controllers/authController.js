const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

// Función para generar un token JWT
const login = async (req, res) => {
    try{
        const { nombreUsuario, contraseña } = req.body;
        const usuario = await Usuario.findOne({ nombreUsuario });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const esCoincidente = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esCoincidente) {
            return res.status(400).json({ message: 'Credenciales Inválidas' });
        }
        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, 'claveSecreta', { expiresIn: '1h' });
        res.json({ token });

    } catch (error) {
        console.log('Error en el login:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
}

const register = async (req, res) => {
    try {
        const { nombreUsuario, contraseña, rol } = req.body;
        const usuarioExistente = await Usuario.findOne({ nombreUsuario });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }
        const nuevoUsuario = new Usuario({ nombreUsuario, contraseña, rol });
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.log('Error en el registro:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
}

module.exports = { login, register };