import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlumnoService } from '../../../services/alumno.service';
import { CarreraService } from '../../../services/carrera.service';
import { InterfaceService } from '../../../services/interface.service';

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

  constructor() { }

  eliminar(id: string) {
    if (this.interfaceService.entidad$() === 'Estudiante') {
      this.alumnoService.eliminarAlumno(id);
    } else if (this.interfaceService.entidad$() === 'Carrera') {
      // this.carreraService.eliminarCarrera(id);
    }
  }
}
