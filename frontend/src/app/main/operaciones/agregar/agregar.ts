import { Component, computed, effect, inject, OnInit, Signal } from '@angular/core';
import { InterfaceService } from '../../../services/interface.service';
import { CarreraService } from '../../../services/carrera.service';
import { Carrera } from '../../../models/carrera';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Alumno } from '../../../models/alumno';
import { AlumnoService } from '../../../services/alumno.service';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './agregar.html',
  styleUrls: ['./agregar.css']
})
export class Agregar {
  myForm!: FormGroup;

  private fb = inject(FormBuilder);
  public interfaceService = inject(InterfaceService)
  public carreraService = inject(CarreraService);
  public alumnoService = inject(AlumnoService);

  // Computed para valores derivados (mutar, llamar servicios, reconstruir formulario)
  // public carreras = computed(() => this.carreraService.carreras$());

  // Si no transformas los datos, es mejor usar Signal directamente
  // public carreras: Signal<Carrera[]> = this.carreraService.carreras$;

  constructor() {
    // Computed para valores derivados
    // Effect para efectos secundarios
    // Cada que se cambia de entidad se reconstruye el formulario
    effect(() => {
      const entidadActual = this.interfaceService.entidad$();
      this.crearFormulario(entidadActual);

      if (entidadActual === 'Estudiante') {
        this.carreraService.obtenerCarreras().subscribe({
          error: (err) => console.error('Error al cargar las carreras:', err)
        });
      }
    });
  }

  private crearFormulario(entidad: string) {
    if (entidad === 'Estudiante') {
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

  onSubmit() {
    if (this.interfaceService.entidad$() === 'Estudiante') {
      this.crearEstudiante();
    } else if (this.interfaceService.entidad$() === 'Carrera') {
      this.crearCarrera();
    }
  }

  crearEstudiante() {
    const nuevoEstudiante = this.buildAlumno();

    this.alumnoService.agregarAlumno(nuevoEstudiante).subscribe({
      next: (valor) => {
        alert(`Estudiante ${valor.nombre} agregado exitosamente`);
      },
      error: (err) => {
        alert('Error al agregar el estudiante: ' + err.message);
      },
      complete: () => {
        this.crearFormulario(this.interfaceService.entidad$());
      }
    });
  }

  buildAlumno(): Alumno {
    const formValue = this.myForm.value;

    // el + en el payload es para convertir string a number
    const payload = {
      nombre: formValue.nombreEstudiante || '',
      apellidos: formValue.apellidosEstudiante || '',
      carreraId: formValue.carreraSeleccionada ? +formValue.carreraSeleccionada : null
    }

    // Nombres coincidan con el servidor express
    return new Alumno(
      payload.nombre,
      payload.apellidos,
      payload.carreraId
    );
  }

  crearCarrera() {
    const nuevaCarrera = this.buildCarrera();

    this.carreraService.agregarCarrera(nuevaCarrera).subscribe({
      next: (valor) => {
        alert(`Carrera ${valor.nombre} agregada exitosamente`);
      },
      error: (err) => {
        alert('Error al agregar la carrera: ' + err.message);
      },
      complete: () => {
        this.crearFormulario(this.interfaceService.entidad$());
      }
    });
  }

  buildCarrera(): Carrera {
    const formValue = this.myForm.value;
    return new Carrera(
      formValue.nombreCarrera || ''
    );
  }
}
