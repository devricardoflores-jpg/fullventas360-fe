import { Routes } from '@angular/router';

import { CategoriaListComponent } from './pages/categoria-list/categoria-list.component';
import { CategoriaCreateComponent } from './pages/categoria-create/categoria-create.component';
import { CategoriaEditComponent } from './pages/categoria-edit/categoria-edit.component';

export const categoriaRoutes: Routes = [

  {
    path: '',
    component: CategoriaListComponent
  },

  {
    path: 'create',
    component: CategoriaCreateComponent
  },

  {
    path: 'edit/:id',
    component: CategoriaEditComponent
  }

];