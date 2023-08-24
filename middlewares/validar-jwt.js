const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) =>{

    const token = req.header('x-token');

       
    
    if(!token){
        return res.status(401).json({
            msg : 'No hay token en la petición'
        });
    }

    //validacion de jwt
    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Leer el modelo para obtener el usuario atenticado
        const usuario  = await Usuario.findById(uid);
        //req.usuarioAutenticado = usuario;
        //req.uid = uid;

        if(!usuario){
            return res.status(401).json({
                msg : 'Token no válido - usuario no existe en BD'
            })
        }

        //Verificar que le estado del usuario no sea false
        if (!usuario.estado) {
            return res.status(401).json({
                msg : 'Token no válido - usuario con estado: false'
            })
        }


        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg : 'Token no válido'
        });
        
    }   

}

module.exports = {
    validarJWT
}