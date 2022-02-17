const asignacion = require('../models/asignacion.models');

function asignacionDeCursos(req, res){

    var parametros = req.body;
    var modeloAsignacion = new asignacion();



    if(req.user.rol == "ROL_MAESTRO"){
        return res.status(500).send({mensaje: "Los Profesores no se pueden asignar a un curso"});
    } else {

            asignacion.find({idCurso: parametros.idCurso}, (err, cursoAgregado)=>{

                if(cursoAgregado.length > 0){
                    return res.status(200).send({mensaje: "No se puede asignar al curso dos veces"});
                }else{
                    
                    modeloAsignacion.idCurso = parametros.idCurso; 
                    modeloAsignacion.idAlumno = req.user.sub;
            
                    modeloAsignacion.save((err, asignacionGuardada) => {
                        if(err) return res.status(500).send({ mensaje : 'Error en la peticion' });
                        if(!asignacionGuardada) return res.status(500).send({ mensaje: 'Error al agregar el curso' });
            
                        return res.status(200).send({ asignacion: asignacionGuardada})
                    })
                }

            })

        
    }

}

function obtenerAsignaciones (req, res){

    var nombre = req.params.idMaestro;

    asignacion.find({}, (err, cursoEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!cursoEncontrado) return res.status(500).send({ mensaje: 'Error al obtener los cursos'})

        return res.status(200).send({ curso: cursoEncontrado })
    }).populate('idAlumno idCurso', 'nombre email');

}


module.exports = {
    asignacionDeCursos,
    obtenerAsignaciones
}