import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-categoria-create',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,

     CommonModule,
    FormsModule,

    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,

    MatProgressSpinnerModule 

  ],
  templateUrl: './categoria-create.component.html',
  styleUrl: './categoria-create.component.css'
})
export class CategoriaCreateComponent {
    form = {
    name: '',
    description: ''
  };

  
  loading = false;
  error = '';

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  createCategory() {
    this.loading = true;
    this.error = '';

    this.categoriaService.create(this.form).subscribe({
      next: (res) => {
        console.log('CREADO:', res);
        this.loading = false;
        this.router.navigate(['/categorias']);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.error = 'Error al crear categoría';
      }
    });
  }

  cancel() {
  this.router.navigate(['/categorias']);
}
}
