import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InterfaceService } from '../services/interface.service';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {
  constructor(public interfaceService: InterfaceService) { }

  onClickOperacion(operacion: string) {
    this.interfaceService.setOperacion(operacion);
  }

  onClickEntidad(entidad: string) {
    this.interfaceService.setEntidad(entidad);
  }
}
