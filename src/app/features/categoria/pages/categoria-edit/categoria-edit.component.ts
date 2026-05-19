import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-categoria-edit',
  imports: [CommonModule,
    FormsModule,
     CommonModule,
    FormsModule,

    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,

    MatProgressSpinnerModule,
    
  ],
  templateUrl: './categoria-edit.component.html',
  styleUrl: './categoria-edit.component.css'
})
export class CategoriaEditComponent implements OnInit {

    id!: number;

  form = {
    name: '',
    description: ''
  };

  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.loadCategory();
  }

  loadCategory() {
    this.categoriaService.getById(this.id).subscribe({
      next: (res: any) => {
        this.form.name = res.data.name;
        this.form.description = res.data.description;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar categoría';
      }
    });
  }

  updateCategory() {
    this.loading = true;
    this.error = '';

    this.categoriaService.update(this.id, this.form).subscribe({
      next: (res) => {

        console.log('ACTUALIZADO:', res);
        this.loading = false;
        this.router.navigate(['/categorias']);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.error = 'Error al actualizar categoría';
      }
    });
  }
  
  
  cancel() {
  this.router.navigate(['/categorias']);
}

}
