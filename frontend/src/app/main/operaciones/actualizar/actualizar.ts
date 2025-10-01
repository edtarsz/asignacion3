import { Component, effect, inject, Signal } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Carrera } from '../../../models/carrera';
import { AlumnoService } from '../../../services/alumno.service';
import { CarreraService } from '../../../services/carrera.service';
import { InterfaceService } from '../../../services/interface.service';
import { Router } from '@angular/router';
import { Alumno } from '../../../models/alumno';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './actualizar.html',
  styleUrl: './actualizar.css'
})
export class Actualizar {
  private fb = inject(FormBuilder);
  myForm: FormGroup = this.fb.group({});

  public interfaceService = inject(InterfaceService);
  public carreraService = inject(CarreraService);
  public alumnoService = inject(AlumnoService);
  private router = inject(Router);

  public alumnos: Signal<Alumno[]> = this.alumnoService.alumnos$;
  public carreras: Signal<Carrera[]> = this.carreraService.carreras$;

  constructor() {
    effect(() => {
      const entidadActual = this.interfaceService.entidad$();
      this.crearFormulario(entidadActual);
    });
  }

  private crearFormulario(entidad: string) {
    if (entidad === 'Estudiante') {
      this.formularioEstudiante();
    } else if (entidad === 'Carrera') {
      this.formularioCarrera();
    } else {
      this.myForm = this.fb.group({});
    }
  }

  private formularioEstudiante() {
    this.myForm = this.fb.group({
      estudianteId: [''],
      nombreEstudiante: [''],
      apellidosEstudiante: [''],
      carreraId: ['']
    });

    this.myForm.get('estudianteId')?.valueChanges.subscribe(idSeleccionado => {
      if (!idSeleccionado) {
        this.myForm.patchValue({ nombreEstudiante: '', apellidosEstudiante: '', carreraId: '' }, { emitEvent: false });
        return;
      }
      const estudiante = this.alumnos().find(a => a._id === idSeleccionado);
      if (estudiante) {
        this.myForm.patchValue({
          nombreEstudiante: estudiante.nombre,
          apellidosEstudiante: estudiante.apellidos,
          carreraId: estudiante.carrera ? (typeof estudiante.carrera === 'string' ? estudiante.carrera : (estudiante.carrera as Carrera)._id) : ''
        }, { emitEvent: false });
      }
    });

    this.alumnoService.obtenerAlumnos().subscribe({ error: (err) => console.error('Error al cargar alumnos:', err) });
    this.carreraService.obtenerCarreras().subscribe({ error: (err) => console.error('Error al cargar carreras:', err) });
  }

  private formularioCarrera() {
    this.myForm = this.fb.group({
      carreraId: [''],
      nombreCarrera: ['']
    });

    this.myForm.get('carreraId')?.valueChanges.subscribe(idSeleccionado => {
      if (!idSeleccionado) {
        this.myForm.patchValue({ nombreCarrera: '' }, { emitEvent: false });
        return;
      }
      const carrera = this.carreras().find(c => c._id === idSeleccionado);
      if (carrera) {
        this.myForm.patchValue({ nombreCarrera: carrera.nombre }, { emitEvent: false });
      }
    });

    this.carreraService.obtenerCarreras().subscribe({ error: (err) => console.error('Error al cargar carreras:', err) });
  }

  actualizarEstudiante() {
    const formValue = this.myForm.value;
    if (!formValue.estudianteId) {
      alert('Por favor, selecciona un estudiante para actualizar.');
      return;
    }

    const payload: Partial<Alumno> = {
      nombre: formValue.nombreEstudiante,
      apellidos: formValue.apellidosEstudiante,
      carrera: formValue.carreraId ? formValue.carreraId : null
    };

    this.alumnoService.actualizarAlumno(formValue.estudianteId, payload as Alumno).subscribe({
      next: (res) => alert(`Estudiante '${res.nombre}' actualizado exitosamente.`),
      error: (err) => alert('Error al actualizar: ' + (err.error?.message || err.message)),
      complete: () => {
        this.router.navigate(['/index/listar']);
        this.interfaceService.setOperacion('Listar');
      }
    });
  }

  actualizarCarrera() {
    const formValue = this.myForm.value;
    if (!formValue.carreraId) {
      alert('Por favor, selecciona una carrera para actualizar.');
      return;
    }

    const payload = { nombre: formValue.nombreCarrera };

    this.carreraService.actualizarCarrera(formValue.carreraId, payload).subscribe({
      next: (res) => alert(`Carrera '${res.nombre}' actualizada exitosamente.`),
      error: (err) => alert('Error al actualizar: ' + (err.error?.message || err.message)),
      complete: () => {
        this.router.navigate(['/index/listar']);
        this.interfaceService.setOperacion('Listar');
      }
    });
  }

  onSubmit() {
    if (this.interfaceService.entidad$() === 'Estudiante') {
      this.actualizarEstudiante();
    } else if (this.interfaceService.entidad$() === 'Carrera') {
      this.actualizarCarrera();
    }
  }
}