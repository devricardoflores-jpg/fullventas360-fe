import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MenuService } from '../../../core/services/menu.service';

@Component({
  selector: 'app-sidebar',
    standalone: true,
  imports: [CommonModule,
  RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
 openMenu:any='';

  menus:any[]=[];

  user:any;

  photoUrl:string='';

  constructor(

    private menuService:MenuService

  ){}

  ngOnInit(): void {

    // USER

    const data =
    localStorage.getItem('user');

    if(data){

      this.user =
      JSON.parse(data);

      this.photoUrl =

      `${environment.apiUrl}/usuario/${this.user.photo}`;

    }

    // MENUS

    this.loadMenus();

  }

  loadMenus():void{

    this.menuService
    .getMenus()

    .subscribe({

      next:(response:any)=>{

        console.log('sidebar.',response);

        this.menus =
        response.data;

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  toggleMenu(menu:any):void{

    if(this.openMenu === menu){

      this.openMenu='';

      return;

    }

    this.openMenu=menu;

  }

}