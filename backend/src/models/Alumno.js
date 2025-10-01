import mongoose from 'mongoose';

const alumnoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  carrera: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrera',
  },
});

const Alumno = mongoose.model('Alumno', alumnoSchema);

export default Alumno;