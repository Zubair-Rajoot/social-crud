import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { PostService } from "src/app/services/post.service";



@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})



export class UpdateComponent implements OnInit {
  postForm: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;
  postId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
 
      this.postService.getPostById(this.postId).subscribe({
        next: (post) => {
          this.postForm.patchValue({
            title: post.title,
            content: post.content
          });
        },
        error: () => {
          this.snackBar.open('Failed to load post data', 'Close', { duration: 3000 });
        }
      });
    }
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

    if (this.postId) {
    
      this.postService.updatePost(this.postId, formData).subscribe({
        next: () => {
          this.router.navigate(['/profile']);
          this.toastr.success('Post updated successfully!', 'Success');
        },
        error: () => {
          this.toastr.error('Failed to update post.', 'Error');
        }
      });
    } else {
  
      this.postService.createPost(formData).subscribe({
        next: () => {
          this.router.navigate(['/profile']);
          this.toastr.success('Post created successfully!', 'Success');
        },
        error: () => {
          this.toastr.error('Error creating post. Please try again.', 'Error');
        }
      });
    }
  }

  getImagePreview(): string {
    if (this.selectedFile) {
      return URL.createObjectURL(this.selectedFile);
    }
    return '';
  }
}
