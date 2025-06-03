import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  postForm: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      image: [null]
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.postForm.patchValue({ image: file });
      this.postForm.get('image')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('title', this.postForm.value.title);
    formData.append('content', this.postForm.value.content);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.postService.createPost(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
        this.toastr.success('Post created successfully!', 'Success');
      },
      error: (error) => {
        this.toastr.error('Error creating post. Please try again.', 'Error');
      }
    });
  }

  getImagePreview(): string {
    if (this.selectedFile) {
      return URL.createObjectURL(this.selectedFile);
    }
    return '';
  }
}