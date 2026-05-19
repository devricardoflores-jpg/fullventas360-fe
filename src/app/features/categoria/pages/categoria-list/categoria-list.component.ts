
import { CategoriaService } from '../../services/categoria.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';


import { Component, OnInit, OnDestroy } from '@angular/core';

import 'datatables.net';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [
   CommonModule,
  FormsModule,

  MatTableModule,   
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule
  ],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent implements OnInit {
  categorias: any[] = [];

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  dataSource = new MatTableDataSource<any>();

  constructor(
    private categoriaService: CategoriaService,
   private router: Router
  ) {}

  ngOnInit(): void {
   this.getAll();
  }
/*
  loadCategorias(): void {
    this.categoriaService.getAll().subscribe({
      next: (resp) => {
        this.categorias = resp.data;

        // aquí habilitas la tabla material
        this.dataSource.data = this.categorias;
      },
      error: (err) => console.error(err)
    });
  }*/

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

editar(id: number) {
  this.router.navigate(['/categorias/edit', id]);
}


  crear() {
  this.router.navigate(['/categorias/create']);
}


eliminar(id: number) {

  const confirmacion = confirm('¿Deseas eliminar esta categoría?');

  if (!confirmacion) {
    return;
  }

  this.categoriaService.delete(id).subscribe({
    next: (res) => {
      console.log('ELIMINADO:', res);

      // 🔥 recargar lista
      this.getAll();
    },
    error: (err) => {
      console.error(err);
      alert('Error al eliminar categoría');
    }
  });
}

getAll() {
  this.categoriaService.getAll().subscribe({
    next: (res: any) => {
      this.dataSource.data = res.data; // ajusta según tu API
    },
    error: (err) => {
      console.error(err);
    }
  });
}

}