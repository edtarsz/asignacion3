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
    return this.httpClient.post<Carrera>(this.apiURL, carrera).pipe(
      tap(() => this.obtenerCarreras().subscribe())
    );
  }

  obtenerCarreras(): Observable<Carrera[]> {
    return this.httpClient.get<Carrera[]>(this.apiURL).pipe(tap(res => this.carreras.set(res)));
  }

  eliminarCarrera(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/${id}`).pipe(
      tap(() => this.obtenerCarreras().subscribe())
    );
  }

  actualizarCarrera(carreraEditada: Carrera): Observable<Carrera> {
    return this.httpClient.put<Carrera>(`${this.apiURL}/${carreraEditada.id}`, carreraEditada).pipe(
      tap(() => this.obtenerCarreras().subscribe())
    );
  }
}
