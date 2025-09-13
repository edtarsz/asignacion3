const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('./generated/prisma');

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/carreras', async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const carrera = await prisma.carrera.create({
      data: { nombre },
    });

    res.status(201).json(carrera);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la carrera' });
  }
});

app.post('/api/alumnos', async (req, res) => {
  try {
    const { nombre, apellidos, carreraId } = req.body;
    const alumno = await prisma.alumno.create({
      data: { nombre, apellidos, carreraId },
    });
    res.status(201).json(alumno);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el alumno' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});