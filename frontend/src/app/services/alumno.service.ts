import { inject, Injectable, signal } from "@angular/core";
import { Alumno } from "../models/alumno.js";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/internal/operators/tap";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AlumnoService {
    private apiURL = 'http://localhost:3000/api/v1/alumnos';
    private httpClient = inject(HttpClient);

    alumnos = signal<Alumno[]>([]);
    readonly alumnos$ = this.alumnos.asReadonly();

    agregarAlumno(alumno: Alumno): Observable<Alumno> {
        return this.httpClient.post<Alumno>(this.apiURL, alumno).pipe(
            tap(() => this.obtenerAlumnos().subscribe())
        );
    }

    eliminarAlumno(id: string): Observable<void> {
        const url = `${this.apiURL}/${id}`;
        return this.httpClient.delete<void>(url).pipe(
            tap(() => this.obtenerAlumnos().subscribe())
        );
    }

    actualizarAlumno(alumnoEditado: Alumno): Observable<Alumno> {
        const url = `${this.apiURL}/${alumnoEditado.id}`;
        return this.httpClient.put<Alumno>(url, alumnoEditado).pipe(
            tap(() => this.obtenerAlumnos().subscribe())
        );
    }

    asignarCarreraAlumno(alumnoId: string, carrera: string) {
        // this.alumnos.update(alumnos => alumnos.map(alumno => {
        //     if (alumno.id === alumnoId) {
        //         alumno.carrera = carrera ? { id: '', nombre: carrera } : null;
        //     }
        //     return alumno;
        // }));
    }

    obtenerAlumnos(): Observable<Alumno[]> {
        return this.httpClient.get<Alumno[]>(this.apiURL).pipe(tap(res => this.alumnos.set(res)));
    }
}