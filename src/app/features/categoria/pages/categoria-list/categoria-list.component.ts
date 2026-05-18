
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';

import { DataTablesModule } from 'angular-datatables';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import 'datatables.net';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [
  CommonModule,
    FormsModule,

    DataTablesModule,
MatToolbarModule,
    MatIconModule,

    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent implements OnInit {
    categorias: Categoria[] = [];

dtOptions: any = {};

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      responsive: true,

      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',

        paginate: {
          first: 'Primero',
          last: 'Último',
          next: '→',
          previous: '←'
        }
      }
    };

    this.loadCategorias();
  }

  loadCategorias(): void {

    this.categoriaService
      .getAll()
      .subscribe({

        next: (resp) => {

          this.categorias = resp.data;

          this.dtTrigger.next(null);
        },

        error: (err) => {
          console.error('Error categorías:', err);
        }

      });
  }

  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();

  }
}