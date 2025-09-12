import { Carrera } from "./carrera";

export class Alumno {
    id: string;
    nombre: string;
    apellidos: string;
    carrera: Carrera | null = null;

    constructor(nombre: string, apellidos: string, carrera?: Carrera) {
        this.id = crypto.randomUUID()
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.carrera = carrera || null;
    }

    asignarCarrera(carrera: Carrera) {
        this.carrera = carrera
    }

    desasignarCarrera() {
        this.carrera = null
    }
}

