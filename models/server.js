const express = require('express');
const cors = require('cors');
const { dbConectar } = require('../database/config')



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/usuarios'
        this.authPath = '/auth';


        //Conexion a Mongo
        this.dbConexion();
        //Middlewares

        this.middlewares();
        //Rutas
        this.routes();
    }

    async dbConexion() {
        await dbConectar();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        this.app.use(express.urlencoded({ extended: true }));
        //Permitir que el body obtenga desde json
        this.app.use(express.json());
        //Servir carpeta publica
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/user'));
        this.app.use(this.categoriasPath, require('../routes/categoria'));
        this.app.use(this.productorPath, require('../routes/producto'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;