import { Routes } from '@angular/router';
import { ProdGuardService } from './guard/guard.service';


export const routes: Routes = [


    {

        path: '',
        title: 'Matias Parentti',
        loadComponent: () => import('./home-page/home-page.component'),

    },
    {

        path: 'proyects',
        title: 'Matias Parentti | Proyectos',
        loadComponent: () => import('./home-page/pages/proyects/proyects.component'),
        canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] }
    },
    {

        path: 'proyects-details/:id',
        title: 'Matias Parentti | Proyecto',
        loadComponent: () => import('./home-page/pages/proyects/details/details.component'),
        canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] }
    },
    {

        path: 'profile',
        title: 'Matias Parentti | Perfil',
        loadComponent: () => import('./home-page/pages/profile/profile.component'),
        canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] }
    },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    }


];
