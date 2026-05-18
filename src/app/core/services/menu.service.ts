import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  environment
} from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class MenuService {

    api = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  getMenus(): Observable<any> {

    const token =
    localStorage.getItem('token');

    console.log('TOKEN =>', token);

    const headers =
    new HttpHeaders({

      Authorization:
      `Bearer ${token}`

    });

    console.log(
      'URL =>',
      `${this.api}/api/menus`
    );

    return this.http.get(

      `${this.api}/api/menus`,

      { headers }

    );

  }

}