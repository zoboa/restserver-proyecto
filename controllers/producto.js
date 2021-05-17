const { response, request } = require('express');
const Producto = require('./../models/producto');
const usuario = require('../models/user')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
//metodo GEt
//en este metodo obtendremos los recursos
const productoGET = async(req = request, res = response) => {
        const producto = await Producto.find();
        res.json({
            msg: 'API - GET',

        })
    }
    //metodo GET
    //en este metodo crearemos los recursos
const productoPOST = async(req = request, res = response) => {
        let { rol } = req.body;
        //el usuario tendra que ser administrador
        if (rol = 'ADMIN_ROLE') {
            //validaremos los resultados
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                return res.status(400).json({
                    errors,
                });
            };
            //las siguientes funciones nos permitira crear los diferentes productos que existiran en nuestra tabla
            let { nombre, estado, usuario, precio, categoria, descripcion } = req.body;
            const producto = new Producto({ nombre, estado, usuario, precio, categoria, descripcion });
            const existeProduc = await Producto.findOne({ nombre });
            // si el producto existe nos enviara un error
            if (existeProduc) {
                return res.status(400).json({
                    msg: 'Producto ya existe'
                });
            };
            res.json({
                    msg: 'API - POST',
                    existeProduc,
                    producto,

                })
                //caso contario nos enviara un error 
        } else {
            return res.status(400).json({
                msg: 'Necesita ser Administrador'
            })
        }

    }
    //metodo PUT
    //el metodo put nos permitira actualizar nuestros productos
const productoPUT = async(req = request, res = response) => {
        const id = req.params.id;
        let {...resto } = req.body;
        const producto = await Producto.findOneAndUpdate(id, resto);
        res.json({
            msg: 'API - PUT',
            id,
            producto,

        })
    }
    //metodo DELETE
    // NOS PERMITIRA ELIMINAR NUESTRO PRODUCTO
const productoDELETE = async(req = request, res = response) => {
    const id = req.params.id;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false });
    res.json({
        msg: 'API - DELETE',
        producto,

    })
}
module.exports = {
    productoGET,
    productoPOST,
    productoPUT,
    productoDELETE,

}