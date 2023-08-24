const { response, request } =  require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');



//GET
const usuariosGet = async(req = request, res = response) => {
    
   // const query = req.query;
   //const usuarios = await Usuario.find();//todos los usuarios
   const { limite = 5, desde = 0} = req.query;
   const query = { estado : true };
//    const usuarios = await Usuario.find(query)
//         .skip(Number(desde))
//         .limit(Number(limite));//limite

//     const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({   
        //resp      
        total,       
        usuarios
    });
}

//PUT -- actauilzar usuario
const usuariosPut = async(req, res = response) => {
    
    const id = req.params.id;
    const { _id, password, google, correo,... resto } = req.body;

    //TODO validar contra base de datos
    if(password){
        //Encriiptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id,resto);
     
    res.json({                
        usuario
    });
}

//POST -- crear usuario
const usuariosPost = async (req, res = response) => {
    
    
    //const body = req.body;
    const {nombre,correo,password,rol}  = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

    //Encriiptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.json({                
        
        usuario
        // nombre, 
        // edad
    });
}

//DELETE
const usuariosDelete = async (req = request, res = response) => {

    const { id } = req.params;
    //forma 1 de borrar fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);
    const uid = req.uid;
    const usuario = await Usuario.findByIdAndUpdate(id,{estado : false});
    //const usuarioAutenticado = req.usuarioAutenticado;
    
    res.json({                
        //msg: 'delete API - controlador'
        usuario,
        // uid,
        // usuarioAutenticado
    });
}

//PATCH
const usuariosPatch = (req, res = response) => {
    
    res.json({                
        msg: 'patch API - controlador'
    });
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch

}