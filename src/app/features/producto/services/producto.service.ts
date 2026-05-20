import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Product } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    private apiUrl =
    `${environment.apiUrl}/api/products`;

  constructor(
    private http: HttpClient
  ) {}

  // =========================
  // HEADERS
  // =========================

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(token
        ? { Authorization: `Bearer ${token}` }
        : {})
    });
  }

  // =========================
  // GET ALL
  // =========================

  getAll(): Observable<any> {

    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  // =========================
  // GET BY ID
  // =========================

  getById(id: number): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );
  }

  // =========================
  // CREATE
  // =========================

  create(data: any): Observable<any> {

    return this.http.post(
      this.apiUrl,
      data,
      {
        headers: this.getHeaders()
      }
    );
  }

  // =========================
  // UPDATE
  // =========================

  update(
    id: number,
    data: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      data,
      {
        headers: this.getHeaders()
      }
    );
  }

  // =========================
  // DELETE
  // =========================

  delete(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );
  }
}