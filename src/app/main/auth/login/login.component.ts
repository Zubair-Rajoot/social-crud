import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router
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
        console.log('Login successful', res);
        
        localStorage.setItem('token', res.token);

        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid email or password';
      }
    });
  } else {
    this.errorMessage = 'Please fill in all required fields correctly.';
  }
}


}