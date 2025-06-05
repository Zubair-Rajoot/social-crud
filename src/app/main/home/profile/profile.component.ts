import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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



  // uploadAvatar() {
  //   if (!this.selectedAvatar) return;

  //   const formData = new FormData();
  //   formData.append('avatar', this.selectedAvatar);

  //   this.isUploading = true;
  //   this.authService.uploadAvatar(formData).subscribe({
  //     next: (res: any) => {
  //       this.user = res.user;
  //       this.isUploading = false;
  //       this.snackBar.open('Avatar updated successfully!', 'Close', {
  //         duration: 3000
  //       });
  //     },
  //     error: (err) => {
  //       this.isUploading = false;
  //       this.snackBar.open('Error updating avatar', 'Close', {
  //         duration: 3000
  //       });
  //     }
  //   });
  // }



  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file); // "avatar" must match multer field name

    this.authService.uploadAvatar(formData).subscribe({
      next: res => console.log('Upload success:', res),
      error: err => console.error('Upload error:', err)
    });
  }





}