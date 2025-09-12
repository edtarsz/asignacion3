import { Injectable, signal } from "@angular/core";
import { alumnos } from "./data.js";
import { Alumno } from "../models/alumno.js";

@Injectable({
    providedIn: 'root'
})
export class AlumnoService {
    alumnos = signal<Alumno[]>(alumnos);
    readonly alumnos$ = this.alumnos.asReadonly();

    agregarAlumno(alumno: Alumno) {
        this.alumnos.update(alumnos => [...alumnos, alumno]);
    }

    eliminarAlumno(id: string) {
        this.alumnos.update(alumnos => alumnos.filter(alumno => alumno.id !== id));
    }

    editarAlumno(alumnoEditado: Alumno) {
        this.alumnos.update(alumnos => alumnos.map(alumno =>
            alumno.id === alumnoEditado.id ? alumnoEditado : alumno
        ));
    }
}