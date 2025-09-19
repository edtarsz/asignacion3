import { Carrera } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

export const createCarrera = async (carreraData) => {
  return Carrera.create(carreraData);
};

export const getAllCarreras = async () => {
  return Carrera.findAll();
};

export const getCarreraById = async (id) => {
  const carrera = await Carrera.findByPk(id);
  if (!carrera) {
    throw new ApiError(404, "Carrera not found");
  }
  return carrera;
};

export const updateCarrera = async (id, updateData) => {
  const carrera = await getCarreraById(id);
  return carrera.update(updateData);
};

export const deleteCarrera = async (id) => {
  const carrera = await getCarreraById(id);
  return carrera.destroy();
};
