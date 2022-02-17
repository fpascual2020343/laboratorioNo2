const curso = require('../models/curso.models');

function agregarCurso (req, res){
    var parametros = req.body;
    var modeloCurso = new curso();

    if(req.user.rol == "ROL_ALUMNO"){
        return res.status(500).send({mensaje: "No tiene los permisos para asignar un curso"});
    } else {

            if(parametros.nombre){
                modeloCurso.nombre = parametros.nombre;
                modeloCurso.idMaestro = req.user.sub;

                modeloCurso.save((err, cursoGuardado) => {
                    if(err) return res.status(500).send({ mensaje : 'Error en la peticion' });
                    if(!cursoGuardado) return res.status(500).send({ mensaje: 'Error al agregar el curso' });

                    return res.status(200).send({ curso: cursoGuardado})
                })

            }else{
                return res.status(500).send({message: "Debe ingresar los parametros obligatorios"});
            }
    }
}

function editarCurso (req, res) {

    var parametros = req.body;
    var idCurso = req.params.idCurso;


    if(req.user.rol == "ROL_ALUMNO"){
        return res.status(500).send({mensaje: "No tiene los permisos para asignar un curso"});
    } else {

        curso.findByIdAndUpdate(idCurso, parametros, {new : true}, (err, cursoEditado) => {

            if(err)return res.status(500).send({mensaje: 'Error en la petición'});
            if(!cursoEditado)return res.status(404).send({mensaje: 'Error al editar el curso'});
    
            return res.status(200).send({curso: cursoEditado});
        })
    
        
    }

}

function eliminarCurso (req, res) {
    var idCurso = req.params.idCurso;



    if(req.user.rol == "ROL_ALUMNO"){
        return res.status(500).send({mensaje: "No tiene los permisos para asignar un curso"});
    } else {

        curso.findByIdAndDelete(idCurso, (err, cursoEliminado) => {

            if(err) return res.status(500).send({mensaje: 'Error en la petición'});
            if(!cursoEliminado)return res.status(404).send({mensaje: 'Error al eliminar el curso'});
    
            return res.status(200).send({curso: cursoEliminado});
        })
        
    }
}

function obtenerCurso (req, res){

    var nombre = req.params.idMaestro;

    curso.find({}, (err, cursoEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!cursoEncontrado) return res.status(500).send({ mensaje: 'Error al obtener los cursos'})

        return res.status(200).send({ curso: cursoEncontrado })
    }).populate('idMaestro', 'nombre email');

}

module.exports = {
    agregarCurso,
    editarCurso,
    eliminarCurso,
    obtenerCurso
}