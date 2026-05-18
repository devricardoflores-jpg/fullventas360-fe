

import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/pages/login/login.component';

import { LayoutComponent } from './shared/components/layout/layout.component';

import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],

    children: [

      {
        path: 'dashboard',
        component: DashboardComponent
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];