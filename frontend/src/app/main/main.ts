import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InterfaceService } from '../services/interface.service';
import { Header } from "../shared/header/header";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, RouterLink, Header],
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
