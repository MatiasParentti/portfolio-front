import { Routes } from '@angular/router';
import { ProdGuardService } from './guard/guard.service';


export const routes: Routes = [


    {

        path: 'home',
        title: 'Matias Parentti',
        loadComponent: () => import('./home-page/home-page.component'),

    },
    {

        path: 'works',
        title: 'Proyectos',
        loadComponent: () => import('./home-page/pages/works/works.component'),
        canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] }
    },
    {

        path: 'profile',
        title: 'Perfil',
        loadComponent: () => import('./home-page/pages/profile/profile.component'),
        canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] }
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }


];