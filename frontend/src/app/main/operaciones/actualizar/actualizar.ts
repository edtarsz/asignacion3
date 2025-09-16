import { Component, effect, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Alumno } from '../../../models/alumno';
import { Carrera } from '../../../models/carrera';
import { AlumnoService } from '../../../services/alumno.service';
import { CarreraService } from '../../../services/carrera.service';
import { InterfaceService } from '../../../services/interface.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './actualizar.html',
  styleUrl: './actualizar.css'
})
export class Actualizar {
  myForm!: FormGroup;
  selectedEstudianteId: string | null = null;
  selectedCarreraNombre: string | null = null;

  private fb = inject(FormBuilder);
  public interfaceService = inject(InterfaceService);
  public carreraService = inject(CarreraService);
  public alumnoService = inject(AlumnoService);
  private router = inject(Router);

  ngOnInit() {
    this.crearFormulario();
  }

  constructor() {
    effect(() => {
      this.interfaceService.entidad$();
      this.crearFormulario();
    });
  }

  private crearFormulario() {
    if (this.interfaceService.entidad$() === 'Estudiante') {
      this.myForm = this.fb.group({
        nombreEstudiante: [''],
        apellidosEstudiante: [''],
        carreraSeleccionada: ['']
      });
    } else if (this.interfaceService.entidad$() === 'Carrera') {
      this.myForm = this.fb.group({
        nombreCarrera: ['']
      });
    }
  }

  // onEstudianteChange(event: Event) {
  //   const selectElement = event.target as HTMLSelectElement;
  //   const estudianteId = selectElement.value;
  //   this.selectedEstudianteId = estudianteId;

  //   if (estudianteId) {
  //     const estudiante = this.alumnoService.alumnos$().find(e => e.id === estudianteId);
  //     if (estudiante) {
  //       this.myForm.patchValue({
  //         nombreEstudiante: estudiante.nombre,
  //         apellidosEstudiante: estudiante.apellidos,
  //         carreraSeleccionada: estudiante.carrera?.nombre || ''
  //       });
  //     }
  //   } else {
  //     this.myForm.reset();
  //   }
  // }

  onCarreraChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const carreraNombre = selectElement.value;
    this.selectedCarreraNombre = carreraNombre;

    if (carreraNombre) {
      const carrera = this.carreraService.carreras$().find(c => c.nombre === carreraNombre);
      if (carrera) {
        this.myForm.patchValue({
          nombreCarrera: carrera.nombre
        });
      }
    } else {
      this.myForm.reset();
    }
  }

  onSubmit() {
    if (this.interfaceService.entidad$() === 'Estudiante' && this.selectedEstudianteId) {
      // this.actualizarEstudiante();
    } else if (this.interfaceService.entidad$() === 'Carrera' && this.selectedCarreraNombre) {
      this.actualizarCarrera();
    }

    this.myForm.reset();
    this.selectedEstudianteId = null;
    this.selectedCarreraNombre = null;
    this.router.navigate(['/index/listar']);
    this.interfaceService.setOperacion('Listar');
  }

  // actualizarEstudiante() {
  //   const estudiante = this.alumnoService.alumnos$().find(e => e.id === this.selectedEstudianteId);
  //   if (!estudiante) {
  //     return;
  //   }

  //   const carreraSeleccionadaNombre = this.carreraSeleccionada?.value;
  //   const nuevaCarrera = new Carrera(carreraSeleccionadaNombre);
  //   const estudianteActualizado = new Alumno(
  //     this.nombreEstudiante?.value || estudiante.nombre,
  //     this.apellidosEstudiante?.value || estudiante.apellidos,
  //     nuevaCarrera
  //   );
  //   estudianteActualizado.id = estudiante.id;

  //   this.alumnoService.actualizarAlumno(estudianteActualizado);
  // }

  actualizarCarrera() {
    const carrera = this.carreraService.carreras$().find(c => c.nombre === this.selectedCarreraNombre);
    if (!carrera) {
      return;
    }

    const nuevaCarrera = new Carrera(this.nombreCarrera?.value || carrera.nombre);
    nuevaCarrera.id = carrera.id;

    // this.carreraService.actualizarCarrera(nuevaCarrera);
  }

  get nombreEstudiante() { return this.myForm?.get('nombreEstudiante'); }
  get apellidosEstudiante() { return this.myForm?.get('apellidosEstudiante'); }
  get nombreCarrera() { return this.myForm?.get('nombreCarrera'); }
  get carreraSeleccionada() { return this.myForm?.get('carreraSeleccionada'); }
}
