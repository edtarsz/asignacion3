import * as carreraService from "../services/carrera.service.js";

export const create = async (req, res, next) => {
  try {
    const carrera = await carreraService.createCarrera(req.body);
    res.status(201).json(carrera);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const carreras = await carreraService.getAllCarreras();
    res.status(200).json(carreras);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const carrera = await carreraService.getCarreraById(id);
    res.status(200).json(carrera);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const carrera = await carreraService.updateCarrera(id, req.body);
    res.status(200).json(carrera);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await carreraService.deleteCarrera(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
