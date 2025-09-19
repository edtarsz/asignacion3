import { sequelize, Alumno, Carrera } from '../src/models/index.js';

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized.');

    const [carrera1, carrera2] = await Carrera.bulkCreate([
      { nombre: 'Ingeniería de Sistemas' },
      { nombre: 'Psicología' },
    ], { returning: true });

    await Alumno.bulkCreate([
      { nombre: 'Juan', apellidos: 'Perez', carreraId: carrera1.id },
      { nombre: 'Ana', apellidos: 'Gomez', carreraId: carrera2.id },
      { nombre: 'Luis', apellidos: 'Martinez' },
    ]);

    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedDatabase();
