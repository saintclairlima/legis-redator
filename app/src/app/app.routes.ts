import { Routes } from '@angular/router';
import { autenticadoGuard } from './guards/autenticado.guard';
import { loginGuard } from './guards/login.guard';
import { Login } from './login/login';
import { Editor } from './modulos/editor/editor';
import { Inicio } from './modulos/inicio/inicio';
import { PaginaErro } from './pagina-erro/pagina-erro';

export const routes: Routes = [
    {
        path: '',
        component: Login,
        canActivate: [loginGuard]
    },
    {
        path: 'login',
        component: Login,
        canActivate: [loginGuard]
    },
    {
        path: 'inicio',
        component: Inicio,
        canActivate: [autenticadoGuard]
    },
    {
        path: 'editor/:id',
        component: Editor,
        canActivate: [autenticadoGuard]
    },
    {
        path: 'pagina-erro',
        component: PaginaErro,
        canActivate: [autenticadoGuard]
    },
    {
        path: '**',
        redirectTo: 'pagina-erro'
    }
];
