const { validationResult } = require('express-validator');
const { response } = require('express');

const validarCampos = (req, res = response, next) => {
  //Manejo de errores ( Asi es como obtenemos los mensajes de errores que se generan en el archivo auth.js   )
  //El isEmpty() nos indica si no hay errores, por eso usamos "!" es decir lo contrario ( si hay errores quiero que hagas esto )
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(), //Lo errores vienen aqui en mapped()
    });
  }

  next();
};

module.exports = {
  validarCampos,
};
