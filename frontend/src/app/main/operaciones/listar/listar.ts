import { Component, effect, inject, Signal } from '@angular/core';
import { InterfaceService } from '../../../services/interface.service.js';
import { AlumnoService } from '../../../services/alumno.service.js';
import { CarreraService } from '../../../services/carrera.service.js';
import { Carrera } from '../../../models/carrera.js';
import { Alumno } from '../../../models/alumno.js';

@Component({
  selector: 'app-listar',
  imports: [],
  templateUrl: './listar.html',
  styleUrl: './listar.css'
})
export class Listar {
  public interfaceService = inject(InterfaceService);
  public carreraService = inject(CarreraService);
  public alumnoService = inject(AlumnoService);

  constructor() {
    effect(() => {
      const entidadActual = this.interfaceService.entidad$();
      this.cargarDatos(entidadActual);
    });
  }

  private cargarDatos(entidad: string) {
    if (entidad === 'Estudiante') {
      this.alumnoService.obtenerAlumnos().subscribe({
        error: (err) => console.error('Error al cargar los alumnos:', err)
      });
    } else if (entidad === 'Carrera') {
      this.carreraService.obtenerCarreras().subscribe({
        error: (err) => console.error('Error al cargar las carreras:', err)
      });
    }
  }
}