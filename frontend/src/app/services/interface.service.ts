import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {
  private operacion = signal<string>('Agregar');
  readonly operacion$ = this.operacion.asReadonly();

  private entidad = signal<string>('Estudiante');
  readonly entidad$ = this.entidad.asReadonly();

  setOperacion(operacion: string) {
    this.operacion.set(operacion);
  }

  setEntidad(entidad: string) {
    this.entidad.set(entidad);
  }
}
