import { Injectable, signal } from "@angular/core";
import { carreras } from "./data.js";
import { Carrera } from "../models/carrera.js";

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  carreras = signal<Carrera[]>(carreras);
  readonly carreras$ = this.carreras.asReadonly();

  agregarCarrera(carrera: Carrera) {
    this.carreras.update(carreras => [...carreras, carrera]);
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
