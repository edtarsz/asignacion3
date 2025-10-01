import mongoose from 'mongoose';

const carreraSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

const Carrera = mongoose.model('Carrera', carreraSchema);

export default Carrera;