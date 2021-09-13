/* 

* Rutas de usuarios / Auth
? localhost/api/auth    
(
 Nota: Para poder acceder a cualquera de estas rutas
 primero tienes que poner el path de arriba, luego si el path de alguna de las 
 rutas especificado en este archivo
)

***********
*VALIDACIONES
 Aqui usamos express-validator y pasamos el check como un midellware,
 el primer parametro es el nombre de nuestro input, luego el mensaje  y por ultimo la condicion
 check("nombre", "mensaje").condicion()

*/

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/renew', validarJWT, revalidarToken);

//Para poder enviar mas de un midellware lo hacemos entre corchetes
router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'EL password debe de ser de almenos 6 caracters').isLength({ min: 6 }),
    validarCampos,
  ],

  crearUsuario
);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'EL password debe de ser de almenos 6 caracters').isLength({ min: 6 }),
    validarCampos,
  ],
  loginUsuario
);

module.exports = router;
