import { Alumno } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

export const createAlumno = async (alumnoData) => {
  return Alumno.create(alumnoData);
};

export const getAllAlumnos = async () => {
  return Alumno.find().populate("carrera");
};

export const getAlumnoById = async (id) => {
  const alumno = await Alumno.findById(id).populate("carrera");

  if (!alumno) {
    throw new ApiError(404, "Alumno not found");
  }
  return alumno;
};

export const updateAlumno = async (id, updateData) => {
  const alumno = await Alumno.findByIdAndUpdate(id, updateData, { new: true });
  if (!alumno) {
    throw new ApiError(404, "Alumno not found");
  }
  return alumno;
};

export const deleteAlumno = async (id) => {
  const alumno = await Alumno.findByIdAndDelete(id);
  if (!alumno) {
    throw new ApiError(404, "Alumno not found");
  }
  return alumno;
};