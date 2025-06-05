import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  user: any = null;
  isLoading = false;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadProfile();
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe({
      next: (res) => {
        console.log('API Response:', res);
        this.posts = res.posts || [];
      },
      error: (err) => {
        console.error('Error loading posts:', err);
      }
    });
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