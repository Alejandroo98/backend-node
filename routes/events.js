/* 

* Rutas de usuarios / Events
? localhost/api/events   
(
 Nota: Para poder acceder a cualquera de estas rutas
 primero tienes que poner el path de arriba, luego si el path de alguna de las 
 rutas especificado en este archivo
)

*/

const { Router } = require('express');
const router = Router();
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

/* 
! TIP
* Te explicare lo que hacemos con -> router.use( validarToken ) 
? Es bien senvillo, esto es un middleware y como sabes esto lo pondemos en cada ruta dependiendo
? de si la quieres ahí o no, lo hariamos de esta forma -> router.get('/', validarJWT, getEventos);
? Ahora, imagina que toooodas las rutas necesitan de estse middleware, bueno lo puedes hacer de esta forma
? sin tener que agregar este middleware a cada ruta.
? asi -> router.use(validarJWT); Funciona de igual manera.
? Si quieres que una ruta no pase por este middleware entones pone esta linea ( router.use(validarJWT); ) de es ruta

*/

router.use(validarJWT);

router.get('/', getEventos);

router.post(
  '/',

  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es oblogatorio').custom(isDate),
    validarCampos,
  ],

  crearEvento
);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;
