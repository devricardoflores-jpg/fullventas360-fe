import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductImageService {
  private apiUrl =
    `${environment.apiUrl}/api/product-images`;

  constructor(
    private http: HttpClient
  ) {}

  private getHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('token');

    return new HttpHeaders({

      Authorization:
        `Bearer ${token}`

    });
  }

  create(
    productId: number,
    file: File
  ): Observable<any> {

    const formData =
      new FormData();

    formData.append(
      'product_id',
      productId.toString()
    );

    formData.append(
      'image',
      file
    );

    return this.http.post(
      this.apiUrl,
      formData,
      {
        headers: this.getHeaders()
      }
    );
  }

  update(
  imageId: number,
  file: File
): Observable<any> {

  const formData =
    new FormData();

  formData.append(
    'image',
    file
  );

  return this.http.post(

    `${this.apiUrl}/${imageId}?_method=PUT`,

    formData,

    {
      headers: this.getHeaders()
    }

  );
}

}