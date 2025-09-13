import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Agregar } from './main/operaciones/agregar/agregar';
import { Listar } from './main/operaciones/listar/listar';
import { Eliminar } from './main/operaciones/eliminar/eliminar';
import { Actualizar } from './main/operaciones/actualizar/actualizar';
import { Asignar } from './main/operaciones/asignar/asignar';

export const routes: Routes = [
    {
        path: 'index',
        component: Main,
        children: [
            {
                path: 'agregar',
                component: Agregar
            },
            {
                path: 'eliminar',
                component: Eliminar
            },
            {
                path: 'actualizar',
                component: Actualizar
            },
            {
                path: 'asignar',
                component: Asignar
            },
            {
                path: 'listar',
                component: Listar
            },
            {
                path: '',
                redirectTo: 'agregar',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/index/agregar',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/index/agregar'
    }
];