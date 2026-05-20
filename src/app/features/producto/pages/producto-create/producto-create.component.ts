import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

import { ProductoFormComponent } from '../../components/producto-form/producto-form.component';
import { ProductImageService } from '../../services/product-image.service';

@Component({
  selector: 'app-producto-create',
  imports: [ProductoFormComponent],
  templateUrl: './producto-create.component.html',
  styleUrl: './producto-create.component.css'
})
export class ProductoCreateComponent {
  private productoService =
    inject(ProductoService);

  private imageService =
    inject(ProductImageService);

  private router =
    inject(Router);

  create(data: any): void {

    const productData = {

      user_id: data.user_id,

      name: data.name,

      description: data.description,

      price: data.price,

      quantity: data.quantity,

      category_id: data.category_id,

      status: data.status

    };

    // =========================
    // GUARDAR PRODUCTO
    // =========================

    this.productoService
      .create(productData)
      .subscribe({

        next: (resp) => {

          const productId =
            resp.data.id;

          // =========================
          // SUBIR IMAGEN
          // =========================

          if (data.image) {

            this.imageService
              .create(
                productId,
                data.image
              )
              .subscribe({

                next: () => {

                  alert(
                    'Producto registrado'
                  );

                  this.router.navigate([
                    '/productos'
                  ]);
                }

              });

          } else {

            this.router.navigate([
              '/productos'
            ]);

          }

        }

      });

  }

}