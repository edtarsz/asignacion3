import mongoose from 'mongoose';
import { Alumno, Carrera } from '../src/models/index.js';

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected for seeding.');

    await Carrera.deleteMany({});
    await Alumno.deleteMany({});
    console.log('Old data cleared.');

    const carreras = await Carrera.insertMany([
      { nombre: 'Ingeniería de Sistemas' },
      { nombre: 'Psicología' },
    ]);

    const carrera1 = carreras[0];
    const carrera2 = carreras[1];

    await Alumno.insertMany([
      { nombre: 'Juan', apellidos: 'Perez', carrera: carrera1._id },
      { nombre: 'Ana', apellidos: 'Gomez', carrera: carrera2._id },
      { nombre: 'Luis', apellidos: 'Martinez' },
    ]);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  }
};

seedDatabase();