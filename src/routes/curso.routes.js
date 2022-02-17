const express = require('express');
const controladorCurso = require('../controllers/curso.controllers');
const md_autenticacion = require('../middlewares/auteticacion');

const api = express.Router();

api.post('/agregarCurso', md_autenticacion.Auth, controladorCurso.agregarCurso);
api.put('/editarCurso/:idCurso', md_autenticacion.Auth, controladorCurso.editarCurso);
api.delete('/eliminarCurso/:idCurso', md_autenticacion.Auth, controladorCurso.eliminarCurso);
api.get('/listaCurso', md_autenticacion.Auth, controladorCurso.obtenerCurso);
module.exports = api;