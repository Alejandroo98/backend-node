const mongoose = require('mongoose');

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log('Database connected');
  } catch (error) {
    console.log(error);
    throw new Error('Error al inicializar la DB');
  }
};

module.exports = {
  dbConection,
};

/* 
? Clase que sigue: https://www.udemy.com/course/react-cero-experto/learn/lecture/20385933#questions/13223762

*/
