import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoFormComponent } from '../../components/producto-form/producto-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductImageService } from '../../services/product-image.service';

@Component({
  selector: 'app-producto-edit',
  imports: [ProductoFormComponent],
  templateUrl: './producto-edit.component.html',
  styleUrl: './producto-edit.component.css'
})
export class ProductoEditComponent  {
  
     private productoService =
    inject(ProductoService);

  private imageService =
    inject(ProductImageService);

  private route =
    inject(ActivatedRoute);

  private router =
    inject(Router);

  product: any = null;

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.productoService
      .getById(id)
      .subscribe({

        next: (resp) => {

          this.product =
            resp.data;

        }

      });

  }

  update(data: any): void {

    // =========================
    // DATA PRODUCTO
    // =========================

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
    // UPDATE PRODUCTO
    // =========================

    this.productoService
      .update(
        this.product.id,
        productData
      )
      .subscribe({

        next: () => {

          // =========================
          // VALIDAR IMAGEN
          // =========================

          if (data.image) {

            const imageId =
              this.product.images?.[0]?.id;

            // =========================
            // UPDATE IMAGEN
            // =========================

            if (imageId) {

              this.imageService
                .update(
                  imageId,
                  data.image
                )
                .subscribe({

                  next: () => {

                    alert(
                      'Producto actualizado'
                    );

                    this.router.navigate([
                      '/productos'
                    ]);

                  }

                });

            }

            // =========================
            // CREATE IMAGEN
            // =========================

            else {

              this.imageService
                .create(
                  this.product.id,
                  data.image
                )
                .subscribe({

                  next: () => {

                    alert(
                      'Producto actualizado'
                    );

                    this.router.navigate([
                      '/productos'
                    ]);

                  }

                });

            }

          }

          // =========================
          // SIN IMAGEN
          // =========================

          else {

            alert(
              'Producto actualizado'
            );

            this.router.navigate([
              '/productos'
            ]);

          }

        }

      });

  }

}