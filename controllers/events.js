const Evento = require('../models/Evento');
let eventos = {};

eventos.getEventos = async (req, res) => {
  const eventos = await Evento.find({}).populate('user', 'name password');

  res.status(201).json({
    ok: true,
    eventos,
  });
};
eventos.crearEvento = async (req, res) => {
  console.log(req.body);

  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;

    const eventoGuradado = await evento.save();

    res.status(201).json({
      ok: true,
      evento: eventoGuradado,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'Error: Intenta mas tarde',
    });
  }
};
eventos.actualizarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'EL evento no existe con ese ID',
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene el privilegio de editar este eento',
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    /* 

    * CUANDO ACTULICES UN REGISTRO E IMPRIMAS EL RESULTADO TE MOSTRARA EL REGISTRO ANTERIRO,
    * SI QUIERES PODER VER EL NUEVO REGISTRO ENTONCES INGRESA ESTO COMO TERCER PARAMETRO -> { new: true }
    
    */
    const eventoActulizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

    res.status(404).json({
      ok: true,
      msg: eventoActulizado,
    });

    res.status(201).json({
      ok: true,
      msg: eventoId,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'Error al guardar, intenta mas tarde',
    });
  }
};
eventos.eliminarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'EL evento no existe con ese ID',
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene el privilegio para elimianar este evento',
      });
    }

    const deleteEvent = await Evento.findOneAndDelete(eventoId);

    res.status(201).json({
      ok: true,
      event: deleteEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'Error al guardar, intenta mas tarde',
    });
  }
};

module.exports = eventos;
