const express = require('express');
const cors = require('cors');


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routers();
    }

    middlewares(){

        //CORS
        this.app.use(cors());
        //Lectura y parseo del body 
        this.app.use( express.json());
        //Directorio público
        this.app.use(express.static('public'));
    }
   

    routers(){

        this.app.use(this.usuariosPath, require('../routers/usuarios'));

    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto', this.port)
        });

    }

}


module.exports = Server;