const express = require('express');
const controladorAsignacion = require('../controllers/asignacion.controllers');
const md_autenticacion = require('../middlewares/auteticacion');

const api = express.Router();

api.post('/agregarAsignacion', md_autenticacion.Auth, controladorAsignacion.asignacionDeCursos);
api.get('/obtenerAsignaciones', md_autenticacion.Auth, controladorAsignacion.obtenerAsignaciones);

module.exports = api;