import { Carrera } from "./carrera";

export class Alumno {
    id?: number;
    nombre: string;
    apellidos: string;
    carreraId?: number | null;
    carrera?: Carrera | null;

    constructor(nombre: string, apellidos: string, carreraId?: number | null) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.carreraId = carreraId || null;
    }
}

