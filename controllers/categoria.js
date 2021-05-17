const { response, request } = require('express');
const Categoria = require('./../models/categoria')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
//Metodo GET
const categoriaGET = async(req = request, res = response) => {
    const producto = await Categoria.find();
    res.json({
        msg: 'API - GET',

    })
}

const categoriaPOST = async(req = request, res = response) => {
    //validaremos los resultados
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return res.status(400).json({
            errors,
        });
    };

    let { nombre, estado, usuario } = req.body;
    const categoria = new Categoria({ nombre, estado, usuario });
    const existeCatego = await Producto.findOne({ nombre });
    if (existeCatego) {
        return res.status(400).json({
            msg: 'Producto ya existe'
        });
    };
    res.json({
        msg: 'API - POST',
        existeCatego,
        categoria,
    })
}

const categoriaPUT = async(req = request, res = response) => {
    const id = req.params.id;
    let {...resto } = req.body;
    const categoria = await Categoria.findOneAndUpdate(id, resto);
    res.json({
        msg: 'API - PUT',
        id,
        categoria,
    })
    res.json({
        msg: 'API - PUT',

    })
}

const categoriaDELETE = async(req = request, res = response) => {
    const id = req.params.id;
    const categoria = await Categoria.findByIdAndUpdate(id, nombre);
    res.json({
        msg: 'API - DELETE',
        categoria,
    })
}
module.exports = {
    categoriaGET,
    categoriaPOST,
    categoriaPUT,
    categoriaDELETE,

}