import prisma from '../config/prismaClient.js';
import ApiError from '../utils/ApiError.js';

export const createCarrera = async (carreraData) => {
  return prisma.carrera.create({
    data: carreraData,
  });
};

export const getAllCarreras = async () => {
  return prisma.carrera.findMany();
};

export const getCarreraById = async (id) => {
  const carrera = await prisma.carrera.findUnique({
    where: { id: parseInt(id) },
  });
  if (!carrera) {
    throw new ApiError(404, 'Carrera not found');
  }
  return carrera;
};

export const updateCarrera = async (id, updateData) => {
  await getCarreraById(id);
  
  return prisma.carrera.update({
    where: { id: parseInt(id) },
    data: updateData,
  });
};

export const deleteCarrera = async (id) => {
  await getCarreraById(id);
  
  return prisma.carrera.delete({
    where: { id: parseInt(id) },
  });
};