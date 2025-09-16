import { inject, Injectable, signal } from "@angular/core";
import { Carrera } from "../models/carrera.js";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private apiURL = 'http://localhost:3000/api/v1/carreras';
  private httpClient = inject(HttpClient);

  carreras = signal<Carrera[]>([]);
  readonly carreras$ = this.carreras.asReadonly();

  agregarCarrera(carrera: Carrera): Observable<Carrera> {
    const url = this.apiURL;
    return this.httpClient.post<Carrera>(url, carrera).pipe(
      tap(() => this.obtenerCarreras().subscribe())
    );
  }

  obtenerCarreras(): Observable<Carrera[]> {
    const url = this.apiURL;
    return this.httpClient.get<Carrera[]>(url).pipe(tap(res => this.carreras.set(res)));
  }

  eliminarCarrera(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.httpClient.delete<void>(url).pipe(
      tap(() => this.obtenerCarreras().subscribe())
    );
  }

  actualizarCarrera(id: number, carreraEditada: Carrera): Observable<Carrera> {
    const url = `${this.apiURL}/${id}`;
    return this.httpClient.patch<Carrera>(url, carreraEditada).pipe(
      tap(() => this.obtenerCarreras().subscribe())
    );
  }
}
