import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  user:any;

  ngOnInit(): void {

    const data = localStorage.getItem('user');

    if(data){

      this.user = JSON.parse(data);

    }

  }

}