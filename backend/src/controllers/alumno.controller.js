import * as alumnoService from "../services/alumno.service.js";

export const create = async (req, res, next) => {
  try {
    const alumno = await alumnoService.createAlumno(req.body);
    res.status(201).json(alumno);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const alumnos = await alumnoService.getAllAlumnos();
    res.status(200).json(alumnos);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const alumno = await alumnoService.getAlumnoById(id);
    res.status(200).json(alumno);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const alumno = await alumnoService.updateAlumno(id, req.body);
    res.status(200).json(alumno);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await alumnoService.deleteAlumno(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
