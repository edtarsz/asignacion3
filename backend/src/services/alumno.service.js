import prisma from "../config/prismaClient.js";
import ApiError from "../utils/ApiError.js";

export const createAlumno = async (alumnoData) => {
  return prisma.alumno.create({
    data: alumnoData,
  });
};

export const getAllAlumnos = async () => {
  return prisma.alumno.findMany({
    include: {
      carrera: true,
    },
  });
};

export const getAlumnoById = async (id) => {
  const alumno = await prisma.alumno.findUnique({
    where: { id: parseInt(id) },
    include: {
      carrera: true,
    },
  });

  if (!alumno) {
    throw new ApiError(404, "Alumno not found");
  }
  return alumno;
};

export const updateAlumno = async (id, updateData) => {
  await getAlumnoById(id);

  return prisma.alumno.update({
    where: { id: parseInt(id) },
    data: updateData,
  });
};

export const deleteAlumno = async (id) => {
  await getAlumnoById(id);

  return prisma.alumno.delete({
    where: { id: parseInt(id) },
  });
};
