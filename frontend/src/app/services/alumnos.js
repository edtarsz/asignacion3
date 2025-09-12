import { alumnos } from "../data.js";
import { carreras } from "../data.js";
import { preguntar } from "./global.js";
import { verCarreras } from "./carreras.js"

export function verAlumnos() {
    alumnos.forEach((alumno, indice) => {
        const carreraNombre = alumno.carreraId
            ? carreras[alumno.carreraId - 1]?.nombre || "N/A"
            : "N/A";
        console.log(`Alumno: ${indice + 1} ${alumno.nombre} | Carrera: ${carreraNombre}`);
    });
}

export function agregarAlumno(alumno) {
    alumnos.push(alumno);
    console.log("Alumno agregado correctamente.");
}

export function eliminarAlumno(idTemporal) {
    const index = Number(idTemporal) - 1;
    if (isNaN(index) || index < 0 || index >= alumnos.length) {
        console.log(`No se encontró el alumno con ese número.`);
        return;
    }
    const eliminado = alumnos.splice(index, 1)[0];
    console.log(`Alumno ${eliminado.nombre} eliminado.`);
}

export async function actualizarAlumno() {
    verAlumnos();
    const id = await preguntar("ID del alumno a actualizar: ");
    const index = Number(id) - 1;

    if (isNaN(index) || index < 0 || index >= alumnos.length) {
        console.log("Alumno no válido.");
        return;
    }

    const alumno = alumnos[index];

    // actualizar nombre
    const nuevoNombre = await preguntar("Nuevo nombre (enter para no actualizar): ");
    if (nuevoNombre.trim()) {
        alumno.nombre = nuevoNombre;
    }

    // Asignar o actualizar carrera usando métodos de la clase Alumno
    verCarreras();
    const carreraId = await preguntar("Número de la carrera a asignar (enter para no actualizar, 0 para desasignar): ");
    if (carreraId.trim()) {
        const carreraIndex = Number(carreraId) - 1;
        if (carreraId === "0") {
            alumno.desasignarCarrera();
        } else if (!isNaN(carreraIndex) && carreraIndex >= 0 && carreraIndex < carreras.length) {
            alumno.asignarCarrera(carreraIndex + 1); // se guarda el índice temporal +1
        } else {
            console.log("Carrera no válida, no se asignó.");
        }
    }

    console.log("Alumno actualizado correctamente.");
}