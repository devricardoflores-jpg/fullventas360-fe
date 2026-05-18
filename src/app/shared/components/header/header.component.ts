import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
    standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  user:any;

  photoUrl:string='';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const data = localStorage.getItem('user');

    if(data){

      this.user = JSON.parse(data);

       
  this.photoUrl =
  `${environment.apiUrl}/usuario/${this.user.photo}`;
      }
  
    }

  

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}