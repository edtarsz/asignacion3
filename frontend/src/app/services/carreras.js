import { carreras } from "../data.js";
import { preguntar } from "./global.js";

export function verCarreras() {
    carreras.forEach((carrera, indice) => {
        console.log(`Carrera: ${indice + 1} ${carrera.nombre}`);
    });
}

export function agregarCarrera(carrera) {
    carreras.push(carrera);
    console.log("Carrera agregada correctamente.");
}

export function eliminarCarrera(idTemporal) {
    const index = Number(idTemporal) - 1;
    if (isNaN(index) || index < 0 || index >= carreras.length) {
        console.log(`No se encontró la carrera con ese número.`);
        return;
    }
    const eliminada = carreras.splice(index, 1)[0];
    console.log(`Carrera ${eliminada.nombre} eliminada.`);
}

export async function actualizarCarrera() {
    verCarreras();
    const id = await preguntar("ID de la carrera a actualizar: ");
    const index = Number(id) - 1;
    if (isNaN(index) || index < 0 || index >= carreras.length) {
        console.log("Carrera no válida.");
        return;
    }
    const carrera = carreras[index];
    const nuevoNombre = await preguntar("Nuevo nombre de la carrera: ");
    if (nuevoNombre.trim()) {
        carrera.nombre = nuevoNombre;
        console.log("Carrera actualizada correctamente.");
    } else {
        console.log("No se realizaron cambios.");
    }
}