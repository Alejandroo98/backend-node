const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  /* 
   ? x-token - headers ( Asi es como lo mandamos desde el postman, y lo llamamos x-token, por convencion lo nombres primero con una x- )
  */

  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Necesitas enviar un token desde el header con el nombre x-token',
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    /* 
    ? A ver te explic que paso en estas linea de abajo.
    ? Veras aqui estamos dentro de un middleware, por lo tanto la informacion recae aqui, 
    ? ahora lo que haecmos aqui es agregarle infomracion al req, asi mas adelante
    ? en el callback que manejara esta ruta lo podemos extraer, es decri agregamos informacion al req
    */

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido',
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
