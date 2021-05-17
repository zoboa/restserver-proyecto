const { Router } = require('express');
const { check } = require('express-validator');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require('../controllers/user');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, usuariosGet);

router.post('/', [check('correo', 'El correo es requerido o no es valido').isEmail()], usuariosPost);
router.put('/:id', usuariosPut);
router.delete('/:id', usuariosDelete);

module.exports = router;