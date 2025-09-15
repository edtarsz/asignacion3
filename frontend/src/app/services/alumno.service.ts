import { inject, Injectable, signal } from "@angular/core";
import { alumnos } from "./data.js";
import { Alumno } from "../models/alumno.js";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AlumnoService {
    private apiURL = 'http://localhost:3000/api/v1/alumnos';
    private httpClient = inject(HttpClient);

    alumnos = signal<Alumno[]>(alumnos);
    readonly alumnos$ = this.alumnos.asReadonly();

    agregarAlumno(alumno: Alumno) {
        this.httpClient.post<Alumno>(this.apiURL, alumno).subscribe({
            next: (res) => {
                alert('Alumno agregado exitosamente');
            },
            error: (err) => {
                alert('Error al agregar el alumno');
            }
        });
    }

    eliminarAlumno(id: string) {
        // this.alumnos.update(alumnos => alumnos.filter(alumno => alumno.id !== id));
    }

    actualizarAlumno(alumnoEditado: Alumno) {
        this.alumnos.update(alumnos => alumnos.map(alumno =>
            alumno.id === alumnoEditado.id ? alumnoEditado : alumno
        ));
    }

    asignarCarreraAlumno(alumnoId: string, carrera: string) {
        // this.alumnos.update(alumnos => alumnos.map(alumno => {
        //     if (alumno.id === alumnoId) {
        //         alumno.carrera = carrera ? { id: '', nombre: carrera } : null;
        //     }
        //     return alumno;
        // }));
    }
}