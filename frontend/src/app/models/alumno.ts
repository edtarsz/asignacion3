import { Carrera } from "./carrera";

export class Alumno {
    _id?: string;
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

