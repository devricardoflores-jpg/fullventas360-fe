import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductImageService } from '../../services/product-image.service';
import { CategoriaService } from '../../../categoria/services/categoria.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-producto-form',
  imports: [CommonModule, ReactiveFormsModule,

    FormsModule
  ],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements OnInit {
  // =========================
  // INJECTS
  // =========================

  private fb =
    inject(FormBuilder);

  private categoriaService =
    inject(CategoriaService);

  // =========================
  // INPUT / OUTPUT
  // =========================

  @Input()
  initialData: any = null;

  @Output()
  formSubmit =
    new EventEmitter<any>();

  // =========================
  // VARIABLES
  // =========================

  categories: any[] = [];

  selectedFile!: File;

  imagePreview: string = '';

  // =========================
  // FORM
  // =========================

  form = this.fb.group({

    user_id: [1],

    name: ['', Validators.required],

    description: ['', Validators.required],

    price: [0, Validators.required],

    quantity: [0, Validators.required],

    category_id: ['', Validators.required],

    image_path: [''],

    status: [1]

  });

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.loadCategories();

  }

  // =========================
  // LOAD CATEGORIES
  // =========================

  loadCategories(): void {

    this.categoriaService
      .getAll()
      .subscribe({

        next: (resp) => {

          this.categories =
            resp.data;

        }

      });

  }

  // =========================
  // EDIT DATA
  // =========================

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (
      changes['initialData']
      &&
      this.initialData
    ) {

      this.form.patchValue({

        user_id:
          this.initialData.user_id,

        name:
          this.initialData.name,

        description:
          this.initialData.description,

        price:
          this.initialData.price,

        quantity:
          this.initialData.quantity,

        category_id:
          this.initialData.category_id,

        image_path:
          this.initialData.images?.[0]
            ?.image_path || '',

        status:
          this.initialData.status

      });

      // =========================
      // IMAGE PREVIEW
      // =========================

      if (
        this.initialData.images?.length
      ) {

        this.imagePreview =
          'http://127.0.0.1:8000/' +
          this.initialData.images[0]
            .image_path;

      }

    }

  }

private location = inject(Location);
  goBack(): void {
  this.location.back();
}

  // =========================
  // FILE SELECT
  // =========================

  onFileSelected(
    event: any
  ): void {

    const file =
      event.target.files[0];

    if (file) {

      this.selectedFile = file;

      // =========================
      // PREVIEW NEW IMAGE
      // =========================

      this.imagePreview =
        URL.createObjectURL(file);

    }

  }

  // =========================
  // SUBMIT
  // =========================

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    const data = {

      ...this.form.value,

      image: this.selectedFile

    };

    this.formSubmit.emit(data);

  }

}