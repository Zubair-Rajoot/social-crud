import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  constructor(private router: Router) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
   
  }

  onMenuOpened() {
    document.body.classList.add('no-scroll');
  }

  onMenuClosed() {
    document.body.classList.remove('no-scroll');
  }
}
