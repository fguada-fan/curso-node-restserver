const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');

const Usuario = new require('../models/usuario');




const login = async(req, resp = response ) => {
    
    const { correo, password } = req.body;
    
    try {

        //Verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return resp.status(400).json({
                msg : 'Usuario / Password no son correctos - correo '
            })

        }
        //Si el usuario esta activo en BD
        if(!usuario.estado){
            return resp.status(400).json({
                msg : 'Usuario / Password no son correctos - estado : false '
            })

        }
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if(!validPassword){
            return resp.status(400).json({
                msg : 'Usuario / Password no son correctos - password '
            })
        }
        //Generar el JWT
        const token = await generarJWT (usuario.id);



        resp.json({
            msg : 'Login Ok',
            usuario,
            token
            
        })

        
    } catch (error) {
        console.log(error)
        return resp.status(500).json('Algo salió mal')
    }
    
    

}

module.exports = {
    login
}