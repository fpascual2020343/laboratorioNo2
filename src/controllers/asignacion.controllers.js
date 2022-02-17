const asignacion = require('../models/asignacion.models');

function asignacionDeCursos(req, res){

    var parametros = req.body;
    var modeloAsignacion = new asignacion();

    if(parametros.curso){

        modeloAsignacion.idCurso = req.params.sub; 
        modeloAsignacion.idAlumno = req.user.sub;

        modeloAsignacion.save((err, asignacionGuardada) => {
            if(err) return res.status(500).send({ mensaje : 'Error en la peticion' });
            if(!asignacionGuardada) return res.status(500).send({ mensaje: 'Error al agregar el curso' });

            return res.status(200).send({ asignacion: asignacionGuardada})
        })

    }else {
        
        return res.status(500).send({ mensaje : 'No se puede asignar a mas de tres cursos'});
    }

}

module.exports = {
    asignacionDeCursos
}