const { response } =  require('express');

//GET
const usuariosGet = (req, res = response) => {
    
    const query = req.query;
    res.json({                
        msg: 'get API - controlador',
        query
    });
}

//PUT
const usuariosPut = (req, res = response) => {
    
    const id = req.params.id;
    
    res.json({                
        msg: 'put API - controlador',
        id
    });
}

//POST
const usuariosPost = (req, res = response) => {
    
    //const body = req.body;
    const {nombre,edad} = req.body;
    res.json({                
        msg: 'post API - controlador',
        nombre, 
        edad
    });
}

//DELETE
const usuariosDelete = (req, res = response) => {
    
    res.json({                
        msg: 'delete API - controlador'
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