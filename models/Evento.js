const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
  title: {
    type: String,
    required: true,
  },

  notes: {
    type: String,
  },

  start: {
    type: Date,
    required: true,
  },

  end: {
    type: Date,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'usuario',
    required: true,
  },
});

/* 

* Te explico la razon de ser de las lineas de abajo.
? Veras, lo que hacemos es modificar el json que nos devuelve una ves guardado un
? registro, es sencillo de entender, el primer parametro "toJSON" es sintaxis porpia, luego 
? el otro parametro es una funcion, esta funcion lo que hace es modificar este objecto que no 
? devuvle una ves guardado el registro, dentro del this.toObject() lo que tenemos es el schema que 
? creamos arriba y por medio de este podemos modificarlo, como ves desestructuramos y obtenemos 
? unicamente el __v, el _id y ...object ( operador spread ) que como sabes lo que significa esto es el resto de 
? campo, lo esparse.
? Y por ultimp lo que hacemos es modificar el nombre del _id por id nada mas, e ignoramos el __v, 
? y claro retornamos el nuebo objeto, cade recarcar que estos campos unicamente son modificados 
? cuando nos devuelve el nuevo registro, esto no se modifica en  la DB

*/

EventoSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('eventos', EventoSchema);
