import sequelize from '../config/sequelize.js';
import AlumnoModel from './Alumno.js';
import CarreraModel from './Carrera.js';

const Alumno = AlumnoModel(sequelize);
const Carrera = CarreraModel(sequelize);

Carrera.hasMany(Alumno, {
  foreignKey: 'carreraId',
  as: 'alumnos',
});

Alumno.belongsTo(Carrera, {
  foreignKey: 'carreraId',
  as: 'carrera',
});

export { sequelize, Alumno, Carrera };
