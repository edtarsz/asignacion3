import { Component, inject, OnInit } from '@angular/core';
import { CarreraService } from '../../../services/carrera.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumno';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-asignar',
  imports: [ReactiveFormsModule],
  templateUrl: './asignar.html',
  styleUrl: './asignar.css'
})
export class Asignar implements OnInit {
  myForm!: FormGroup;

  private fb = inject(FormBuilder);
  public alumnoService = inject(AlumnoService);
  public carreraService = inject(CarreraService);

  constructor() {
    this.myForm = this.fb.group({
      alumnoId: [''],
      carreraId: ['']
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos() {
    this.alumnoService.obtenerAlumnos().subscribe({
      error: (err) => console.error('Error al cargar los alumnos:', err)
    });

    this.carreraService.obtenerCarreras().subscribe({
      error: (err) => console.error('Error al cargar las carreras:', err)
    });
  }

  onSubmit() {
    const { alumnoId, carreraId } = this.myForm.value;

    if (!alumnoId || !carreraId) {
      alert('Por favor, selecciona un alumno y una carrera.');
      return;
    }

    this.alumnoService.asignarAlumnoACarrera(alumnoId, carreraId).subscribe({
      next: (alumnoActualizado) => {
        alert(`Carrera asignada y alumno ${alumnoActualizado.nombre} actualizado!`);
      },
      error: (err) => {
        alert(`No se pudo asignar la carrera. ${err.message}`);
      }
    });

    this.myForm.reset({
      alumnoId: '',
      carreraId: ''
    });
  }
}
