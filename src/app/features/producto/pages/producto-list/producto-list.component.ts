import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import jsPDF from 'jspdf';

import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-producto-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css'
})
export class ProductoListComponent {
 selectedProduct: any = null;
  showPrintView = false;

  private productoService = inject(ProductoService);
  private router = inject(Router);

  apiUrl = 'http://127.0.0.1:8000/';

  products: any[] = [];
  filteredProducts: any[] = [];

  search: string = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  // =========================
  // LOAD IMAGE BASE64
  // =========================
  loadImage(url: string): Promise<string> {
    return new Promise((resolve, reject) => {

      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);

        resolve(canvas.toDataURL('image/png'));
      };

      img.onerror = reject;
      img.src = url;
    });
  }

  // =========================
  // LOAD PRODUCTS
  // =========================
  loadProducts(): void {
    this.productoService.getAll().subscribe({
      next: (resp) => {
        this.products = resp.data;
        this.filteredProducts = resp.data;
      }
    });
  }

  // =========================
  // SEARCH
  // =========================
  filterProducts(): void {
    const value = this.search.toLowerCase();

    this.filteredProducts = this.products.filter((item: any) =>
      item.name?.toLowerCase().includes(value) ||
      item.category?.name?.toLowerCase().includes(value)
    );
  }

  // =========================
  // NAVIGATION
  // =========================
  goCreate(): void {
    this.router.navigate(['/productos/create']);
  }

  edit(id: number): void {
    this.router.navigate(['/productos/edit', id]);
  }

  delete(id: number): void {
    if (!confirm('¿Eliminar producto?')) return;

    this.productoService.delete(id).subscribe({
      next: () => this.loadProducts()
    });
  }

  // =========================
  // PDF EXPORT (CORREGIDO)
  // =========================
  async exportPDF(): Promise<void> {

    const doc = new jsPDF('p', 'mm', 'a4');

    // ✔ LOGO CORRECTO
    const logoBase64 = await this.loadImage('logo.png');

    doc.addImage(logoBase64, 'PNG', 10, 5, 25, 15);

    doc.setFontSize(16);
    doc.text('REPORTE DE PRODUCTOS', 40, 15);

    doc.setFontSize(11);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 15, 25);

    autoTable(doc, {
      startY: 35,
      head: [['ID', 'Producto', 'Precio', 'Stock', 'Categoría']],
      body: this.filteredProducts.map(p => [
        p.id,
        p.name,
        `S/. ${p.price}`,
        p.quantity,
        p.category?.name ?? '-'
      ])
    });

    doc.save('reporte-productos.pdf');
  }

  // =========================
  // PRINT VIEW
  // =========================
  openPrintView(item: any): void {
  this.selectedProduct = item;
  this.showPrintView = true;
}

  closePrintView(): void {
    this.selectedProduct = null;
    this.showPrintView = false;
  }

  print(): void {
    window.print();
  }
}