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

    actualizarAlumno(alumnoEditado: Alumno) {
        this.alumnos.update(alumnos => alumnos.map(alumno =>
            alumno.id === alumnoEditado.id ? alumnoEditado : alumno
        ));
    }

    asignarCarreraAlumno(alumnoId: string, carrera: string) {
        this.alumnos.update(alumnos => alumnos.map(alumno => {
            if (alumno.id === alumnoId) {
                alumno.carrera = carrera ? { id: '', nombre: carrera } : null;
            }
            return alumno;
        }));
    }
}