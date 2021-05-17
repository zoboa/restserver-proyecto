const { Router } = require('express');
const { check } = require('express-validator');
const { categoriaGET, categoriaPOST, categoriaPUT, categoriaDELETE } = require('../controllers/categoria');
const { validarJWT } = require('../middlewares/validar-jwt')

const catego = Router();
catego.get('/', validarJWT, categoriaGET)

catego.post('/', [check()], categoriaPOST)

catego.put('/:id', categoriaPUT)

catego.delete('/', categoriaDELETE)


module.exports = catego;