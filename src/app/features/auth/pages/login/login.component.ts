import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [  CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
      private authService: AuthService
  ){

    this.formLogin = this.fb.group({

      usuario:[
        '',
        Validators.required
      ],

      password:[
        '',
        Validators.required
      ]

    });

  }

login(): void {

  if(this.formLogin.invalid){

    this.formLogin.markAllAsTouched();

    return;

  }

  const body = {

    email: this.formLogin.value.usuario,

    password: this.formLogin.value.password

  };

  this.authService.login(body)

  .subscribe({

  next:(response:any)=>{

  console.log(response);

  // TOKEN

  localStorage.setItem(

    'token',

    response.token

  );

  // USER

  localStorage.setItem(

    'user',

    JSON.stringify(response.user)

  );

  // REDIRECT

  this.router.navigate([
    '/dashboard'
  ]);

},

    error:(error)=>{

      console.log(error);

      alert('Usuario o contraseña incorrectos');

    }

  });


}

}