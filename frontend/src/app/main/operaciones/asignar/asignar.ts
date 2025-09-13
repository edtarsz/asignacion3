import { Component, inject } from '@angular/core';
import { CarreraService } from '../../../services/carrera.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlumnoService } from '../../../services/alumno.service';

@Component({
  selector: 'app-asignar',
  imports: [ReactiveFormsModule],
  templateUrl: './asignar.html',
  styleUrl: './asignar.css'
})
export class Asignar {
  asignarForm!: FormGroup;

  private fb = inject(FormBuilder);
  public alumnoService = inject(AlumnoService);
  public carreraService = inject(CarreraService);

  ngOnInit() {
    this.asignarForm = this.fb.group({
      alumnoId: [''],
      carreraNombre: ['']
    });
  }

  onSubmit() {
    const { alumnoId, carreraNombre } = this.asignarForm.value;
    this.alumnoService.asignarCarreraAlumno(alumnoId, carreraNombre);

    this.asignarForm.reset({
      alumnoId: '',
      carreraNombre: ''
    });
  }
}
