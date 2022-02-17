const express = require('express');
const controladorUsuario =require('../controllers/usuario.controllers');

const md_autenticacion = require('../middlewares/auteticacion');

//RUTAS
const api = express.Router();

api.post('/registrarMaestroDefault', controladorUsuario.registrarMaestroDefault);
api.post('/registarMaestro', controladorUsuario.registrarMaestro);
api.post('/registarAlumno', controladorUsuario.registrarAlumno);
api.post('/login', controladorUsuario.Login);
api.put('/editarUsuario/:idUsuario', md_autenticacion.Auth, controladorUsuario.editarUsuario);
api.delete('/elimnarUsuario/:idUsuario', md_autenticacion.Auth, controladorUsuario.eliminarUsuario);

module.exports = api;