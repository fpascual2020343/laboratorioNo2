const express = require('express');
const controladorAsignacion = require('../controllers/asignacion.controllers');
const md_autenticacion = require('../middlewares/auteticacion');

const api = express.Router();

api.post('/agregarAsignacion', md_autenticacion.Auth, controladorAsignacion.asignacionDeCursos);

module.exports = api;