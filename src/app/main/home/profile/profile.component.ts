import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  posts: any[] = [];
  selectedAvatar: File | null = null;
  isLoading = false;
  isUploading = false;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading = true;
    this.authService.getProfile().subscribe({
      next: (res: any) => {
        this.user = res.user;
        this.posts = res.user.posts || [];
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

  onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];


      if (!file.type.match('image.*')) {
        this.snackBar.open('Only image files are allowed', 'Close', {
          duration: 3000
        });
        return;
      }


      if (file.size > 2 * 1024 * 1024) {
        this.snackBar.open('Image size should be less than 2MB', 'Close', {
          duration: 3000
        });
        return;
      }

      this.selectedAvatar = file;
      this.uploadAvatar(this.selectedAvatar);
    }
  }



  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file); 

    this.authService.uploadAvatar(formData).subscribe({
      next: res => console.log('Upload success:', res),
      error: err => console.error('Upload error:', err)
    });
  }


  

deletePost(postId: string) {
  if (confirm('Are you sure you want to delete this post?')) {
    this.postService.deletePost(postId).subscribe({
      next: (res) => {
        this.posts = this.posts.filter(post => post._id !== postId);
        this.snackBar.open('Post deleted successfully!', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to delete post', 'Close', { duration: 3000 });
          
      }
    });
  }
}


updatePost(postId: string) {

    this.postService.deletePost(postId).subscribe({
      next: (res) => {
        this.posts = this.posts.filter(post => post._id !== postId);
        this.snackBar.open('Post deleted successfully!', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to delete post', 'Close', { duration: 3000 });
          
      }
    });
  
}





}