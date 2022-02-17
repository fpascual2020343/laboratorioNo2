const express = require('express');
const app = express();
const cors = require('cors');

// IMPORTACION RUTAS
const usuarioRoutes = require('./src/routes/usuario.routes');
const cursoRoutes = require('./src/routes/curso.routes');
const asignacionRoutes = require('./src/routes/asignacion.routes');

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/controlAlumnos
app.use('/api', usuarioRoutes, cursoRoutes, asignacionRoutes);


module.exports = app;