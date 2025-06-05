import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  user: any = null;
  isLoading = false;

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  constructor(private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

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



   loadProfile() {
    this.isLoading = true;
    this.authService.getProfile().subscribe({
      next: (res: any) => {
        this.user = res.user;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Error loading profile', 'Close', {
          duration: 3000
        });
      }
    });
  }
}
