import { inject, Injectable, signal } from "@angular/core";
import { carreras } from "./data.js";
import { Carrera } from "../models/carrera.js";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private apiURL = 'http://localhost:3000/api/carreras';
  private httpClient = inject(HttpClient);

  carreras = signal<Carrera[]>(carreras);
  readonly carreras$ = this.carreras.asReadonly();

  agregarCarrera(carrera: Carrera) {
    this.httpClient.post<Carrera>(this.apiURL, carrera).subscribe({
      next: (res) => {
        alert('Carrera agregada exitosamente');
      },
      error: (err) => {
        alert('Error al agregar la carrera');
      }
    });
  }

  eliminarCarrera(id: string) {
    this.carreras.update(carreras => carreras.filter(carrera => carrera.id !== id));
  }

  actualizarCarrera(carreraEditada: Carrera) {
    this.carreras.update(carreras => carreras.map(carrera =>
      carrera.id === carreraEditada.id ? carreraEditada : carrera
    ));
  }
}
