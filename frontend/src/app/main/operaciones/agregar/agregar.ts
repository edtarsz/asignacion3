import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { InterfaceService } from '../../../services/interface.service';
import { CarreraService } from '../../../services/carrera.service';
import { Carrera } from '../../../models/carrera';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Alumno } from '../../../models/alumno';
import { AlumnoService } from '../../../services/alumno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './agregar.html',
  styleUrls: ['./agregar.css']
})
export class Agregar implements OnInit {
  myForm!: FormGroup;

  private fb = inject(FormBuilder);
  public interfaceService = inject(InterfaceService)
  public carreraService = inject(CarreraService);
  public alumnoService = inject(AlumnoService);
  private router = inject(Router);

  ngOnInit() {
    this.crearFormulario();
  }

  constructor() {
    // Computed para valores derivados (mutar, llamar servicios, reconstruir formulario)
    // Effect para efecto colateral
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

  onSubmit() {
    if (this.interfaceService.entidad$() === 'Estudiante') {
      this.crearEstudiante();
    } else if (this.interfaceService.entidad$() === 'Carrera') {
      this.crearCarrera();
    }

    this.myForm.reset();
  }

  crearEstudiante() {
    const nuevoEstudiante = new Alumno(
      this.nombreEstudiante?.value || '',
      this.apellidosEstudiante?.value || '',
      new Carrera('Sin asignar')
    );
    this.alumnoService.agregarAlumno(nuevoEstudiante);
    this.alumnoService.alumnos$().forEach(alumno => {
      console.log(alumno.nombre);
    });
  }
  crearCarrera() {
    const nuevaCarrera = new Carrera(
      this.nombreCarrera?.value || ''
    );
    this.carreraService.agregarCarrera(nuevaCarrera);
  }

  get nombreEstudiante() { return this.myForm?.get('nombreEstudiante'); }
  get apellidosEstudiante() { return this.myForm?.get('apellidosEstudiante'); }
  get nombreCarrera() { return this.myForm?.get('nombreCarrera'); }
  get carreraSeleccionada() { return this.myForm?.get('carreraSeleccionada'); }
}
