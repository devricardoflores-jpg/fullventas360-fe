import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 api = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient
  ) {}

  login(data:any): Observable<any>{

    return this.http.post<any>(

      `${this.api}/login`,
      data

    ).pipe(

      tap((response:any)=>{

        localStorage.setItem(
          'token',
          response.token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );

      })

    );

  }

  isAuthenticated(): boolean {

    return !!localStorage.getItem('token');

  }

  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

  }

  getToken(): string | null {

    return localStorage.getItem('token');

  }

}
