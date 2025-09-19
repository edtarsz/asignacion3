import { Alumno, Carrera } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

export const createAlumno = async (alumnoData) => {
  return Alumno.create(alumnoData);
};

export const getAllAlumnos = async () => {
  return Alumno.findAll({
    include: [
      {
        model: Carrera,
        as: "carrera",
      },
    ],
  });
};

export const getAlumnoById = async (id) => {
  const alumno = await Alumno.findByPk(id, {
    include: [
      {
        model: Carrera,
        as: "carrera",
      },
    ],
  });

  if (!alumno) {
    throw new ApiError(404, "Alumno not found");
  }
  return alumno;
};

export const updateAlumno = async (id, updateData) => {
  const alumno = await getAlumnoById(id);
  return alumno.update(updateData);
};

export const deleteAlumno = async (id) => {
  const alumno = await getAlumnoById(id);
  return alumno.destroy();
};
