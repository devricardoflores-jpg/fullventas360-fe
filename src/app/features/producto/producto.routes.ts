import { Routes } from '@angular/router';

export const PRODUCTO_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./pages/producto-list/producto-list.component')
        .then(m => m.ProductoListComponent)
  },

  {
    path: 'create',
    loadComponent: () =>
      import('./pages/producto-create/producto-create.component')
        .then(m => m.ProductoCreateComponent)
  },

  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/producto-edit/producto-edit.component')
        .then(m => m.ProductoEditComponent)
  }

];