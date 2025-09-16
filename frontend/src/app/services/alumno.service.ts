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
        const url = this.apiURL;
        return this.httpClient.post<Alumno>(url, alumno).pipe(
            tap(() => this.obtenerAlumnos().subscribe())
        );
    }

    eliminarAlumno(id: number): Observable<void> {
        const url = `${this.apiURL}/${id}`;
        return this.httpClient.delete<void>(url).pipe(
            tap(() => this.obtenerAlumnos().subscribe())
        );
    }

    actualizarAlumno(id: number, alumnoEditado: Alumno): Observable<Alumno> {
        const url = `${this.apiURL}/${id}`;
        return this.httpClient.patch<Alumno>(url, alumnoEditado).pipe(
            tap(() => this.obtenerAlumnos().subscribe())
        );
    }

    obtenerAlumnos(): Observable<Alumno[]> {
        const url = this.apiURL;
        return this.httpClient.get<Alumno[]>(url).pipe(tap(res => this.alumnos.set(res)));
    }

    obtenerAlumnoPorId(id: number): Observable<Alumno> {
        const url = `${this.apiURL}/${id}`;
        return this.httpClient.get<Alumno>(url).pipe();
    }

    asignarAlumnoACarrera(alumnoId: number, carreraId: number): Observable<Alumno> {
        const url = `${this.apiURL}/${alumnoId}`;

        // Se usan las llaves porque se tiene que especificar el nombre del campo a actualizar
        return this.httpClient.patch<Alumno>(url, { carreraId }).pipe(
            tap(() => this.obtenerAlumnos().subscribe())
        );
    }
}