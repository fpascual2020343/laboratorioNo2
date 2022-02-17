const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asignacionSchema = new Schema({

    nombre: String,
    curso: [{
        curso1: {idCurso: {type : Schema.Types.ObjectId, ref:'Cursos'}},
        curso2: {idCurso: {type : Schema.Types.ObjectId, ref:'Cursos'}},
        curso3: {idCurso: {type : Schema.Types.ObjectId, ref:'Cursos'}}
    }],
    idAlumno: {type : Schema.Types.ObjectId, ref:'Usuarios'}
})

module.exports = mongoose.model('Asignaciones',asignacionSchema);