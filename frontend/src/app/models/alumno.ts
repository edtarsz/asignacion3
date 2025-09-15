import { Carrera } from "./carrera";

export class Alumno {
    id?: number;
    nombre: string;
    apellidos: string;
    carreraId?: number | null;

    constructor(nombre: string, apellidos: string, carreraId?: number | null) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.carreraId = carreraId || null;
    }

    asignarCarrera(carrera: Carrera) {
        this.carreraId = carrera.id;
    }

    desasignarCarrera() {
        this.carreraId = null;
    }
}

