import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],


    });
  }



  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (res) => {
          this.toastr.success('Login Successfully!', 'Success');

          localStorage.setItem("userId", res.userId);
          localStorage.setItem('token', res.token);

          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.toastr.error('Invalid email or password', 'Error');
          this.errorMessage = 'Invalid email or password';
        }
      });
    } else {
      this.toastr.error('Please fill in all required fields correctly.', 'Error');
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }


}