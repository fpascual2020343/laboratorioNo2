const usuarios = require('../models/usuario.models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')

function registrarMaestroDefault(req, res) {

    var modeloUsuario = new usuarios();

        usuarios.find({email: "erickBran@kinal.edu.gt"}, (err, existente) => {


            if ( existente.length > 0 ){ 
                return res.status(500).send({ mensaje: "Este maestro ya est creado" })
            } else {

                modeloUsuario.nombre = 'Erick';
                modeloUsuario.email = 'erickBran@kinal.edu.gt';
                modeloUsuario.rol = 'ROL_MAESTRO';
            
                bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {

                    modeloUsuario.password = passwordEncriptada;
    
                    modeloUsuario.save((err, usuarioGuardado)=>{
    
                        if(err) return res.status(500).send({ mensaje : 'Error en la peticion' });
                        if(!usuarioGuardado) return res.status(500).send({ mensaje: 'Error al guardar el Maestro' });
    
                        return res.status(200).send({ usuarios: usuarioGuardado});
                    })
                })
                }

        })

}

function registrarMaestro(req, res) {
    var parametros = req.body;
    var modeloUsuario = new usuarios();

    if(parametros.nombre && parametros.email
        && parametros.password) {
            usuarios.find({ email : parametros.email }, (err, usuarioEncontrados) => {
                if ( usuarioEncontrados.length > 0 ){ 
                    return res.status(500).send({ mensaje: "Este correo ya se encuentra utilizado" })
                } else {
                    modeloUsuario.nombre = parametros.nombre;
                    modeloUsuario.email = parametros.email;
                    modeloUsuario.password = parametros.password;
                    modeloUsuario.rol = 'ROL_MAESTRO';

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        modeloUsuario.password = passwordEncriptada;

                        modeloUsuario.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500).send({ mensaje : 'Error en la peticion' })
                            if(!usuarioGuardado) return res.status(500).send({ mensaje: 'Error al guardar el Usuario' })
    
                            return res.status(200).send({ usuarios: usuarioGuardado})
                        })
                    })                    
                }
            })
    } else {
        return res.status(404)
            .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }

}

function registrarAlumno(req, res) {
    var parametros = req.body;
    var modeloUsuario = new usuarios();

    if(parametros.nombre && parametros.email
        && parametros.password) {
            usuarios.find({ email : parametros.email }, (err, usuarioEncontrados) => {
                if ( usuarioEncontrados.length > 0 ){ 
                    return res.status(500).send({ mensaje: "Este correo ya se encuentra utilizado" })
                } else {
                    modeloUsuario.nombre = parametros.nombre;
                    modeloUsuario.email = parametros.email;
                    modeloUsuario.password = parametros.password;
                    modeloUsuario.rol = 'ROL_ALUMNO';

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        modeloUsuario.password = passwordEncriptada;

                        modeloUsuario.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500).send({ mensaje : 'Error en la peticion' })
                            if(!usuarioGuardado) return res.status(500).send({ mensaje: 'Error al guardar el Usuario' })
    
                            return res.status(200).send({ usuarios: usuarioGuardado})
                        })
                    })                    
                }
            })
    } else {
        return res.status(404)
            .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }

}


function Login(req, res) {
    var parametros = req.body;
    // BUSCAMOS EL CORREO
    usuarios.findOne({ email : parametros.email }, (err, usuarioEncontrado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if (usuarioEncontrado){
            // COMPARAMOS CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword) => {//TRUE OR FALSE
                    if (verificacionPassword) {
                        return res.status(200)
                            .send({token: jwt.crearToken(usuarioEncontrado)})
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'La contrasena no coincide.'})
                    }
                })
        } else {
            return res.status(500)
                .send({ mensaje: 'El correo, no se ha podido identificar'})
        }
    })
}

function editarUsuario(req, res) {

    var idUser = req.params.idUsuario;
    var parametros = req.body;

    //Borrar la propiedad de password y el rol en el body
    delete parametros.rol;
    delete parametros.password;

    if(req.user.sub !== idUser) {

        return res.status(500).send({ mensaje: "No tiene los permisos para editar este usuario"});
    
    }
    
    usuarios.findByIdAndUpdate(req.user.sub, parametros, {new: true}, (err, usuarioEditado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!usuarioEditado) return res.status(500).send({ mensaje: "Error al editar el Usuario"});

        return res.status(200).send({usuario: usuarioEditado});

    })

}

function eliminarUsuario(req, res) {

    var idUser = req.params.idUsuario;

    if(req.user.sub !== idUser) {

        return res.status(500).send({ mensaje: "No tiene los permisos para eliminar este usuario"});
    
    }
    
    usuarios.findByIdAndDelete(req.user.sub, (err, usuarioEliminado)=>{

        if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
        if(!usuarioEliminado) return res.status(500).send({ mensaje: "Error al eliminar el Usuario"});

        return res.status(200).send({usuario: usuarioEliminado});

    })



}


module.exports = {
    registrarMaestroDefault,
    registrarMaestro,
    registrarAlumno,
    Login,
    editarUsuario,
    eliminarUsuario
}