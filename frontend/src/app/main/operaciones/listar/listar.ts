import { Component, inject } from '@angular/core';
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
  public interfaceService = inject(InterfaceService);
  public carreraService = inject(CarreraService);
  public alumnoService = inject(AlumnoService);
}
