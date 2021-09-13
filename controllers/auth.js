/* 

* Nota: En el caso del ( req, res ) no tendremos los atajos, es decir si esc ribimos req. no tendremos las ayudas 
* como por ejemplo el res.render o res.json etc. 
? Para solucionar lo de arriba sigue estos pasos.
• Importa express
• Ingresa en los parametros de la funcion respectivamente -> ( req = express.request , res = express.response )
!Pudes desestrucutar lo que hicimos arriba, es lo que hice yo

//* El significado de cada uno de los status lo puedes encontrar en este enlace ->  https://www.restapitutorial.com/httpstatuscodes.html

*/

const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
const controllers = {};

controllers.crearUsuario = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya fue registrado',
      });
    }

    usuario = new Usuario(req.body);

    //Encriptar la constraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    //TODO: Generar nuestro JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      user: {
        uid: usuario.id,
        name: usuario.name,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error interno, intenta mas tarde',
    });
  }
};

controllers.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });

  try {
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese email',
      });
    }

    //Confirmar los password
    const validarPAss = bcrypt.compareSync(password, usuario.password);

    if (!validarPAss) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto',
      });
    }

    //TODO: Generar nuestro JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error interno, intenta mas tarde',
    });
  }
};

controllers.revalidarToken = async (req, res) => {
  /* 
  
  ? Aqui es donde recare la informacion que le agregamos al middleware de esta
  ? froma -> req.uid = uid.
  ? Asi como lo puedes ver abajo lo extraemos
  
  */

  const { uid, name } = req;

  //TODO: Generar nuestro JWT
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    msg: 'renew',
    token,
  });
};

module.exports = controllers;
