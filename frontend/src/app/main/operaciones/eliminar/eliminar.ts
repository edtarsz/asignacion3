import { Component } from '@angular/core';
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
  constructor(
    private fb: FormBuilder,
    public interfaceService: InterfaceService,
    public carreraService: CarreraService,
    public alumnoService: AlumnoService
  ) { }

  eliminar(id: string) {
    if (this.interfaceService.entidad$() === 'Estudiante') {
      this.alumnoService.eliminarAlumno(id);
    } else if (this.interfaceService.entidad$() === 'Carrera') {
      this.carreraService.eliminarCarrera(id);
    }
  }
}
