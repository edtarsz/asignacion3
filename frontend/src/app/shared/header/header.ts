import { Component, inject } from '@angular/core';
import { InterfaceService } from '../../services/interface.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  public interfaceService = inject(InterfaceService);

  onClickEntidad(entidad: string) {
    this.interfaceService.setEntidad(entidad);
  }
}
