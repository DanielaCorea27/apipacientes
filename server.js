const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//servidor http
const app = express();
//configuraciones al servidor http
app.use(bodyParser.json());
app.use(cors());

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

//conexion a la base de datos
mongoose.connect('process.env.MONGODB_URI')
//mongoose.connect('mongodb://localhost:27017/sistema-clinica')
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

//Rutas de la API

//Rutas para pacientes
const pacienteRoutes = require('./routes/paciente');
app.use('/api/pacientes', pacienteRoutes);

//Rutas para citas
const citaRoutes = require('./routes/cita');
app.use('/api/citas', citaRoutes);

//Rutas para historiales
const historialRoutes = require('./routes/historial');
app.use('/api/historiales', historialRoutes);

//Rutas para autenticacion
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//configurar puerto para backend
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor backend escuchando en el puerto ${port}`);
});