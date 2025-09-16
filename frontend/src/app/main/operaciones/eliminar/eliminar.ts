import { Component, effect, inject, Signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlumnoService } from '../../../services/alumno.service';
import { CarreraService } from '../../../services/carrera.service';
import { InterfaceService } from '../../../services/interface.service';
import { Alumno } from '../../../models/alumno';
import { Carrera } from '../../../models/carrera';

@Component({
  selector: 'app-eliminar',
  imports: [],
  templateUrl: './eliminar.html',
  styleUrl: './eliminar.css'
})
export class Eliminar {
  private fb = inject(FormBuilder);
  public interfaceService = inject(InterfaceService);
  public carreraService = inject(CarreraService);
  public alumnoService = inject(AlumnoService);

  public carreras: Signal<Carrera[]> = this.carreraService.carreras$;
  public alumnos: Signal<Alumno[]> = this.alumnoService.alumnos$;

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

  eliminar(id: number) {
    if (this.interfaceService.entidad$() === 'Estudiante') {
      this.alumnoService.eliminarAlumno(id).subscribe({
        next: () => {
          alert('Alumno eliminado correctamente.');
        },
        error: (err) => {
          console.error('Error al eliminar el alumno:', err);
          alert('Error al eliminar el alumno. Por favor, inténtalo de nuevo.');
        }
      });
    } else if (this.interfaceService.entidad$() === 'Carrera') {
      this.carreraService.eliminarCarrera(id).subscribe({
        next: () => {
          alert('Carrera eliminada correctamente.');
        },
        error: (err) => {
          console.error('Error al eliminar la carrera:', err);
          alert('Error al eliminar la carrera. Por favor, inténtalo de nuevo.');
        }
      });
    }
  }
}
