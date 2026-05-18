import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

      private apiUrl =
    `${environment.apiUrl}/api/categories`;

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<any> {

    const token =
      localStorage.getItem('token');

    console.log('TOKEN CATEGORY =>', token);

    const headers = new HttpHeaders({

      Authorization:
        `Bearer ${token}`

    });

    return this.http.get(
      this.apiUrl,
      { headers }
    );

  }

}