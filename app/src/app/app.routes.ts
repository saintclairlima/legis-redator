import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Inicio } from './modulos/inicio/inicio';
import { Editor } from './modulos/editor/editor';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'inicio',
        component: Inicio
    },
    {
        path: 'editor',
        component: Editor
    }
];
