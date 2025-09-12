import { Component } from '@angular/core';
import { alumnos, carreras } from '../../../services/data.js';
import { Alumno } from '../../../models/alumno.js';
import { Carrera } from '../../../models/carrera.js';
import { InterfaceService } from '../../../services/interface.service.js';
import { AlumnoService } from '../../../services/alumno.service.js';
import { CarreraService } from '../../../services/carrera.service.js';

@Component({
  selector: 'app-listar',
  imports: [],
  templateUrl: './listar.html',
  styleUrl: './listar.css'
})
export class Listar {
  constructor(
    public interfaceService: InterfaceService,
    public alumnoService: AlumnoService,
    public carreraService: CarreraService
  ) { }

  eliminar() {

  }
}
